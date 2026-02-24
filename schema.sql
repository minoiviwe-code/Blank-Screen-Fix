
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table (Core Identity)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Pools Table (The Circles)
CREATE TABLE IF NOT EXISTS pools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  contribution_amount NUMERIC NOT NULL,
  members TEXT[] DEFAULT '{}', -- Array of member emails
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Trust Metrics (Reputation Data)
CREATE TABLE IF NOT EXISTS trust_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  score INTEGER CHECK (score >= 0 AND score <= 1000),
  on_time_rate NUMERIC(5,2),
  defaults_count INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Pool Constitutions (Legal Accords)
CREATE TABLE IF NOT EXISTS pool_constitutions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pool_id UUID REFERENCES pools(id) ON DELETE CASCADE,
  constitution_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Member Signatures (Governance Participation)
CREATE TABLE IF NOT EXISTS member_signatures (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pool_id UUID REFERENCES pools(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  constitution_id UUID REFERENCES pool_constitutions(id) ON DELETE CASCADE,
  ip_address INET,
  signed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  full_legal_name VARCHAR(255) NOT NULL,
  UNIQUE(pool_id, user_id)
);

-- 6. Audit & Event Logs (Existing)
CREATE TABLE IF NOT EXISTS event_log (
  event_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  actor_user_id UUID NOT NULL,
  pool_id UUID NOT NULL,
  event_type TEXT NOT NULL,
  schema_version INTEGER NOT NULL DEFAULT 1,
  payload JSONB NOT NULL,
  prev_hash TEXT,
  event_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS audit_log (
  audit_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  actor_user_id UUID NOT NULL,
  action TEXT NOT NULL,
  target_type TEXT,
  target_id TEXT,
  metadata JSONB,
  prev_hash TEXT,
  audit_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ledger_entries (
  entry_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  journal_id UUID NOT NULL,
  event_id UUID REFERENCES event_log(event_id),
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  pool_id UUID NOT NULL,
  account_code TEXT NOT NULL,
  debit_amount NUMERIC(20,2) NOT NULL DEFAULT 0,
  credit_amount NUMERIC(20,2) NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'ZAR',
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indices
CREATE INDEX IF NOT EXISTS idx_event_log_pool ON event_log(pool_id, occurred_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_log_actor ON audit_log(actor_user_id, occurred_at DESC);
CREATE INDEX IF NOT EXISTS idx_ledger_pool ON ledger_entries(pool_id, occurred_at DESC);
CREATE INDEX IF NOT EXISTS idx_signatures_user ON member_signatures(user_id);

-- Immutability Triggers
CREATE OR REPLACE FUNCTION prevent_immutability_violation()
RETURNS TRIGGER AS $$
BEGIN
  RAISE EXCEPTION 'Table is append-only. Updates/deletes prohibited by Ubuntu Compliance Gate.';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER immutable_event_log BEFORE UPDATE OR DELETE ON event_log FOR EACH ROW EXECUTE FUNCTION prevent_immutability_violation();
CREATE TRIGGER immutable_audit_log BEFORE UPDATE OR DELETE ON audit_log FOR EACH ROW EXECUTE FUNCTION prevent_immutability_violation();
CREATE TRIGGER immutable_ledger BEFORE UPDATE OR DELETE ON ledger_entries FOR EACH ROW EXECUTE FUNCTION prevent_immutability_violation();

-- Row Level Security (RLS) Enablement
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE pools ENABLE ROW LEVEL SECURITY;
ALTER TABLE trust_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE pool_constitutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE member_signatures ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE ledger_entries ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own profile" ON users FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Members can view their pools" ON pools FOR SELECT TO authenticated USING (auth.jwt() ->> 'email' = ANY(members));
CREATE POLICY "Users can view own metrics" ON trust_metrics FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Members can read constitutions" ON pool_constitutions FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM pools WHERE pools.id = pool_constitutions.pool_id AND auth.jwt() ->> 'email' = ANY(pools.members)));
CREATE POLICY "Users can view own signatures" ON member_signatures FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Authenticated read event_log" ON event_log FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated read audit_log" ON audit_log FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated read ledger" ON ledger_entries FOR SELECT TO authenticated USING (true);

-- Fix for linter: function_search_path_mutable
CREATE OR REPLACE FUNCTION validate_trust_scores(member_emails TEXT[])
RETURNS TABLE(email TEXT, score INTEGER) 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT u.email, t.score
  FROM users u
  JOIN trust_metrics t ON u.id = t.user_id
  WHERE u.email = ANY(member_emails);
END;
$$;
