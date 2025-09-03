import Stripe from 'stripe';
export const runtime = 'nodejs';

export async function POST() {
  const key = process.env.STRIPE_SECRET_KEY;
  const customerId = process.env.STRIPE_CUSTOMER_ID; // optional demo
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  if (!key || !customerId) {
    return Response.json({ error: 'Missing STRIPE_SECRET_KEY or STRIPE_CUSTOMER_ID.' }, { status: 400 });
  }

  const stripe = new Stripe(key, { apiVersion: '2024-06-20' });
  const portal = await stripe.billingPortal.sessions.create({ customer: customerId, return_url: appUrl });
  return Response.json({ url: portal.url });
}
