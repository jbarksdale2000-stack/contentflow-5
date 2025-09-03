import Stripe from 'stripe';
export const runtime = 'nodejs';

export async function POST() {
  const key = process.env.STRIPE_SECRET_KEY;
  const price = process.env.STRIPE_PRICE_ID; // e.g. price_123
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  if (!key || !price) {
    return Response.json({ error: 'Missing STRIPE_SECRET_KEY or STRIPE_PRICE_ID.' }, { status: 400 });
  }

  const stripe = new Stripe(key, { apiVersion: '2024-06-20' });
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price, quantity: 1 }],
    success_url: `${appUrl}/?success=1`,
    cancel_url: `${appUrl}/public/pricing?canceled=1`,
  });

  return Response.json({ url: session.url });
}
