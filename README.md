# Ubuntu Pools - Community Prosperity Platform

A decentralized governance and savings platform for the South African diaspora.

## Netlify Deployment (Recommended)

To deploy to Netlify, follow these steps:

1. **Connect Repository**: Link your GitHub repository to a new Netlify site.
2. **Environment Variables**: Add the following in **Site settings > Environment variables**:
   - `GEMINI_API_KEY`: Your Google AI Studio API key.
   - `VITE_SUPABASE_URL`: Your Supabase Project URL.
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase Anon Public Key.
3. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`

## Local Development

```bash
npm install
npm run dev
```

Ensure you have a `.env` file with `GEMINI_API_KEY`, `VITE_SUPABASE_URL`, and `VITE_SUPABASE_ANON_KEY`.

## Core Features
- **Lindiwe AI**: Real-time voice support using Gemini 2.5 Flash Native Audio.
- **Ubuntu Shield**: Automated protection against missed contributions.
- **Ubuntu Score**: Non-custodial trust reputation engine.
- **Diaspora Remittance**: Multi-currency support (ZAR, USD, GBP, EUR).

## Architecture
- **Frontend**: React 19, Tailwind CSS, Recharts.
- **Backend**: Supabase (PostgreSQL, RLS).
- **Intelligence**: Google Gemini API (Flash/Pro/Native Audio).
- **Deployment**: Vite-optimized with legacy `process.env` mapping.

---
*Umuntu Ngumuntu Ngabantu*
---

## Legal, Risk & Governance

- License: MIT (see `LICENSE`)
- Non-custodial / risk notice: see `DISCLAIMER.md`
- Project governance & stewardship: see `GOVERNANCE.md`

**Deployment classification (until further Board authorization):** Governed Pilot Platform — No Custody — No Real Funds.

## Legal, Governance & Security

- License: see `LICENSE` (MIT)
- Non-custodial & risk notice: see `DISCLAIMER.md`
- Project governance & stewardship: see `GOVERNANCE.md`
- Trademark / naming rules: see `TRADEMARK.md`
- Contribution rules (Board-directed phasing): see `CONTRIBUTING.md`
- Security & vulnerability reporting: see `SECURITY.md`

### Deployment classification (current)

**Governed Pilot Platform — No Custody — No Real Funds**

Until the Board authorizes later phases, Ubuntu Pools must be deployed and represented only as a non-custodial pilot coordination and governance system.
