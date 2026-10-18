# CYBERRECOVER AI — Supabase setup

## What this change provides
- Supabase Auth client wiring with persisted sessions.
- A database schema for profiles and case records.
- Row Level Security (RLS) policies that restrict every profile/case operation to the signed-in owner.
- A fail-closed app gate: the workspace should not be treated as authenticated until a Supabase project is configured and a valid session exists.

## Setup
1. Create a Supabase project.
2. In Project Settings → API, copy the project URL and the publishable/anon key.
3. Add them to your deployment's environment variables as `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. For local development, use an untracked `.env.local` based on `.env.example`.
4. In the Supabase SQL Editor, review and run `supabase/schema.sql`.
5. Enable email confirmation and configure password recovery URLs for your actual deployment domain.
6. Run the GitHub Actions checks and manually verify two separate test users cannot read, update, or delete each other's case records.

## Important boundaries
- The anon/publishable key is intended for browser use; RLS is the security boundary.
- Never put a Supabase service-role key or other secret in Vite variables or frontend code.
- The current schema isolates records by individual owner. It does not yet implement shared organizations, staff/client assignment, admin escalation, or audited cross-user access.
- Existing prototype records remain in browser memory and are not migrated to Supabase.
- This does not configure firewall, cloud, threat-intelligence, website/app-blocking, backup, or Android integrations.
- Do not store sensitive investigation evidence or real client data until deployment settings and cross-user isolation tests have been completed.
