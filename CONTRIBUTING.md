# Contributing to Ubuntu Pools

Ubuntu Pools is a governance-native, trust-centric system. Contributions must increase **correctness, auditability, and enforceable governance**.

## Non-Negotiable Principles

1. **Truth over convenience**
   - The system of record is the database event log and ledger, not UI state.

2. **Append-only discipline**
   - Events and ledger entries are immutable.
   - No edits, deletes, or “fixing history”.

3. **Governance is enforced, not displayed**
   - Constitutions are execution constraints, not decorative text.

4. **Non-custodial posture**
   - Ubuntu Pools records intent/consent/authorization; it must not custody funds.

## Board-Directed Phasing (No Phase Skipping)

Development follows the Board directive strictly:

- **Phase 1:** Ledger + Event Foundations (immutable, append-only, double-entry)
- **Phase 2:** Non-custodial enforcement (architecture + UX + agreements)
- **Phase 3:** Governance enforcement (quorum, approvals, constraints)
- **Phase 4:** Trust as permissions (gating, decay, penalties)
- **Phase 5:** Audit, compliance, accountability (review cadence, incident discipline)

Pull requests that introduce Phase 2–5 behaviors before the official phase start will be rejected.

## How to Contribute

### 1) Create an Issue First
Before writing code, open an issue describing:
- The risk/problem addressed
- The affected modules
- The expected system-of-record changes (events, ledger, constraints)

### 2) Branch Naming
Use:
- `feat/<short-description>`
- `fix/<short-description>`
- `chore/<short-description>`
- `docs/<short-description>`

### 3) Commit Message Standard
Use:
- `feat: ...`
- `fix: ...`
- `chore: ...`
- `docs: ...`
- `refactor: ...`

### 4) PR Requirements (Minimum)
Every PR must include:

- **What changed** (plain language)
- **Why it changed** (risk reduction / enforcement)
- **Event impacts** (new event types, payload schema changes)
- **Ledger impacts** (accounts, journal rules, posting function changes)
- **Backward compatibility** (migrations, data integrity)
- **Test notes** (how you validated behavior)

If it touches governance or finance logic, it must include:
- Deterministic validation rules
- Failure-mode behavior (what happens when constraints fail)

## Coding Standards

### Security
- No secrets committed
- No “admin bypass” in client code
- Avoid client-side “authority”; enforce critical rules server-side (SQL/RPC)

### Data Integrity
- Prefer DB constraints to UI validation
- All monetary values are integer minor units where possible (e.g., cents)

### Events
- Every state change emits an event
- Events must be attributable (actor, timestamp, entity ids)
- Events must remain readable to auditors

## Governance & Compliance Contacts (Interim)

Per governance charter (`GOVERNANCE.md`):
- Interim Lead Technical Executive: **Mihle Majokweni**
- Interim Lead Compliance Officer: **Mihle Majokweni**
- Interim Lead Governance Officer: **Mila Mafuya**

## Code of Conduct (Short Form)

Ubuntu Pools is built for dignity, transparency, and collective accountability.
Be respectful, argue with evidence, and prefer clarity over ego.
Harassment, deception, and attempts to introduce backdoors are not tolerated.
