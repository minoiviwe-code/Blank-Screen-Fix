# Security Policy

Ubuntu Pools is an open-source project with a strong emphasis on governance, auditability, and non-custodial safety.

## Supported Versions

Security fixes will be prioritized for:
- The current `main` branch
- The most recent tagged release (when releases begin)

Until tagged releases exist, treat the project as **pilot / experimental**.

## Reporting a Vulnerability

If you discover a security vulnerability, do **not** open a public issue with exploit details.

Instead:
1. Create a GitHub issue with the title: **“SECURITY: Vulnerability Report (Private Details Requested)”**
2. In the issue body, include:
   - A high-level description (no step-by-step exploit)
   - Affected files/modules
   - Impact severity (data integrity, authorization, privacy, etc.)
   - Suggested remediation (if you have one)

A maintainer will respond requesting private details and reproduction steps.

## What We Treat as Security-Critical

- Authorization logic (roles, approvals, quorums)
- Ledger posting and balance derivation
- Event immutability and hash chaining
- Any integration points with external payment rails
- Secret handling (Supabase keys, CI variables)

## Safe Development Rules

- Do not add client-side “admin” bypasses.
- Do not store sensitive secrets in the repository.
- Enforce critical rules server-side with database constraints and RPC functions.
- Preserve append-only discipline for audit and financial records.

## Non-Custodial Reminder

Ubuntu Pools must remain non-custodial unless and until the governance process explicitly authorizes a regulated custody model.
Any change that could be interpreted as custody must be treated as a security and compliance risk.

## Disclosure Philosophy

We prefer responsible disclosure: fix first, then document publicly after a patch is available.
