// Minimal Stripe webhook that safely handles missing config
import Stripe from 'stripe';
export const runtime = 'nodejs';

export async function POST(request: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!key || !secret) {
    return new Response('Stripe not configured', { status: 200 });
  }
  const stripe = new Stripe(key, { apiVersion: '2024-06-20' });

  const sig = request.headers.get('stripe-signature');
  const body = await request.text();
  let event;
  try {
    event = stripe.webhooks.constructEvent(Buffer.from(body), sig as string, secret);
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed':
      // TODO: mark user as pro in Supabase
      break;
    case 'invoice.payment_succeeded':
      // TODO: mark subscription active
      break;
  }
  return new Response('ok');
}
