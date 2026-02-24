# Ubuntu Pools

## Overview
A community-prosperity platform tailored for the South African diaspora and local savings circles (Stokvels), emphasizing the philosophy of Ubuntu. Built with React, TypeScript, Vite, and Tailwind CSS (via CDN).

## Project Architecture
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS (CDN), inline styles
- **Routing**: React Router DOM (HashRouter)
- **Charts**: Recharts
- **Icons**: Lucide React
- **AI**: Google GenAI (@google/genai)
- **Backend**: Supabase (optional, for persistence)

## Project Structure
- `/` - Root contains entry files (index.html, index.tsx, App.tsx, vite.config.ts)
- `/components/` - Reusable React components
- `/pages/` - Page-level components
- `/contexts/` - React context providers
- `/services/` - Service modules (Supabase client)
- `/audit/` - Audit trail and event store
- `/auth/` - Security manager
- `/compliance/` - Compliance and operating model
- `/ledger/` - Accounting/posting engine
- `/reporting/` - Export bundle
- `/docs/` - Documentation (compliance, legal, security)

## Development
- Dev server: `npm run dev` (port 5000, host 0.0.0.0)
- Build: `npm run build` (outputs to `dist/`)
- Deployment: Static site (dist directory)

## Recent Changes
- 2026-02-17: Initial Replit setup, removed importmap from index.html (conflicts with Vite), created index.css, installed @supabase/supabase-js, configured deployment
