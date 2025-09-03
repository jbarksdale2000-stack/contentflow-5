# ContentFlow — MVP (Feature + Billing + Optional DB)

Deploy-ready Next.js 14 app with:
- Landing page (`/`)
- **Projects** page (`/projects`) to repurpose content (uses OpenAI, or mock if key is missing)
- Supabase auth helpers wired (`lib/supabase.ts`) — optional
- Stripe **Checkout**, **Portal**, and **Webhook** routes (safe if envs missing)
- Clean structure, compiles even with no env vars

## Env vars (Vercel → Settings → Environment Variables)
Optional at first; add as you go.
- `OPENAI_API_KEY`
- `NEXT_PUBLIC_APP_URL` (e.g., https://yourapp.vercel.app)
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_PRICE_ID`
- `STRIPE_CUSTOMER_ID` (for portal demo)
- `STRIPE_WEBHOOK_SECRET` (after adding a webhook endpoint in Stripe)

## Supabase schema (optional)
Run `supabase.sql` in your Supabase SQL editor to create basic tables for projects and outputs.

## File tree
(see repository)

## Deploy
1. Push this folder to the repo root (so `app/` is top-level).
2. Import into Vercel (Root Directory blank) → Deploy.
3. Open `/projects` and try generating — works even without keys.
4. Add keys later to enable real AI + billing + DB.
