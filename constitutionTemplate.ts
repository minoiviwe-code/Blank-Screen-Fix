
export interface ClauseMapping {
  module: string;
  eventType: string;
  permissionBoundary: string;
}

export interface EnhancedConstitutionClause {
  id: string;
  title: string;
  content: string;
  mapping: ClauseMapping;
}

export interface EnhancedTemplate {
  name: string;
  version: string;
  clauses: EnhancedConstitutionClause[];
}

export const SOUTH_AFRICAN_STOKVEL_TEMPLATE: EnhancedTemplate = {
  name: "Ubuntu Pools Community Constitution",
  version: "2025.2",
  clauses: [
    {
      id: "c1",
      title: "1. Name and Objective",
      content: "The pool shall be governed by the philosophy of Ubuntu and the South African Stokvel Act of 1990. The objective is collective prosperity through mutual financial assistance.",
      mapping: {
        module: "pages/CreatePool.tsx",
        eventType: "POOL_CREATED",
        permissionBoundary: "schema.sql: pools table RLS"
      }
    },
    {
      id: "c2",
      title: "2. Membership and Contributions",
      content: "Membership is voluntary. Each member agrees to contribute the specified amount. Failure to pay within the grace period violates the trust of the collective.",
      mapping: {
        module: "services/api.ts",
        eventType: "CONTRIBUTION_INTENT_RECORDED",
        permissionBoundary: "schema.sql: member_signatures unique constraint"
      }
    },
    {
      id: "c4",
      title: "4. Defaults and Penalties",
      content: "Late payments attract a 10% administration fee. Persistent default results in suspension from the collective and potential reporting to community elders or legal channels.",
      mapping: {
        module: "services/api.ts: calculatePenalty",
        eventType: "LEDGER_ENTRY_RECORDED",
        permissionBoundary: "ledger/postingEngine.ts"
      }
    },
    {
      id: "c5",
      title: "5. Security & Authentication",
      content: "Members and Administrators must utilize multi-factor authentication (MFA) for all governance actions and pool modifications to prevent unauthorized access.",
      mapping: {
        module: "auth/securityManager.ts",
        eventType: "AUTH_VERIFIED",
        permissionBoundary: "UP-SEC-002: MANDATORY_2FA"
      }
    }
  ]
};

export const FAMILY_WEALTH_TEMPLATE: EnhancedTemplate = {
  name: "Generational Wealth Accord (GWA)",
  version: "1.0.4-PROD",
  clauses: [
    {
      id: "f1",
      title: "1. Succession & Lineage Integrity",
      content: "In the event of a member's permanent incapacity or transition, their 'Ubuntu Score' and accumulated pool equity shall be transferred to a designated family beneficiary. This transfer is governed by the lineage verification protocol to ensure continuity of communal wealth.",
      mapping: {
        module: "pages/Dashboard.tsx",
        eventType: "PROFILE_UPDATED",
        permissionBoundary: "trust_metrics table RLS"
      }
    },
    {
      id: "f2",
      title: "2. Emergency Crisis Liquidity",
      content: "A 20% portion of the aggregate pool reserve is designated as a 'Lineage Safety Net'. Access to these funds for medical or essential bereavement needs requires a 75% consensus vote from verified pool elders/signatories.",
      mapping: {
        module: "services/api.ts: requestUbuntuAdvance",
        eventType: "APPROVAL_GRANTED",
        permissionBoundary: "RESTRICTED_ACTIONS: PAYOUT_TRIGGERED"
      }
    },
    {
      id: "f3",
      title: "3. Non-Custodial Acknowledgment",
      content: "All parties recognize that the platform facilitates governance and intent recordation only. Beneficial ownership remains at all times with the contributing kinsmen, insulated from platform operational risk.",
      mapping: {
        module: "compliance/nonCustodialGuard.ts",
        eventType: "SECURITY_GATED_EVENT",
        permissionBoundary: "PROHIBITED_ACTIONS"
      }
    },
    {
      id: "f4",
      title: "4. MFA Governance Lock",
      content: "All lineage transfers and emergency liquidations require a valid Step-Up 2FA verification from the verified Head of Lineage.",
      mapping: {
        module: "auth/securityManager.ts",
        eventType: "STEP_UP_VERIFIED",
        permissionBoundary: "UP-SEC-002: PRIVILEGED_ROLE"
      }
    }
  ]
};

export const SME_BULK_BUYING_TEMPLATE: EnhancedTemplate = {
  name: "Business Resilience Accord (BRA)",
  version: "2.1.0-ENTERPRISE",
  clauses: [
    {
      id: "s1",
      title: "1. Wholesale Negotiation Mandate",
      content: "This circle is authorized to negotiate collective procurement discounts with verified national wholesalers. The platform's AI Architect is empowered to present aggregated buying power as a single negotiating block.",
      mapping: {
        module: "services/ai.ts: generateWholesaleProposal",
        eventType: "PROPOSAL_CREATED",
        permissionBoundary: "ADMIN_ACTION: PARTNERSHIP_PROPOSAL"
      }
    },
    {
      id: "s2",
      title: "2. Operational Liquidity (The Bridge)",
      content: "Members maintaining an Ubuntu Score > 850 for six consecutive cycles may access 'Stock Advances'. These are short-term liquidity bridges funded by the collective reserve to prevent inventory stock-outs during high-demand periods.",
      mapping: {
        module: "services/api.ts: requestUbuntuAdvance",
        eventType: "SETTLEMENT_INITIATED",
        permissionBoundary: "GOVERNANCE_VOTE_CAST"
      }
    },
    {
      id: "s3",
      title: "3. Dispute Resolution & Mediation",
      content: "All commercial disputes between members regarding bulk-buy allocations shall be mediated by the Ubuntu AI Mediator (Lindiwe) before escalation to formal arbitration. AI mediation logs serve as primary evidence in any subsequent legal proceedings.",
      mapping: {
        module: "services/ai.ts: generateMediationAdvice",
        eventType: "ADMIN_ACTION",
        permissionBoundary: "MEMBER_MEDIATION"
      }
    }
  ]
};
