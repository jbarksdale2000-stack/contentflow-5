'use client'
export default function StripeButton({ action }: { action: 'checkout' | 'portal' }) {
  const onClick = async () => {
    const res = await fetch(`/api/billing/${action}`, { method: 'POST' });
    const json = await res.json();
    if (json.url) window.location.href = json.url;
    else alert(json.error || 'Missing Stripe configuration. Add STRIPE_SECRET_KEY and (for checkout) STRIPE_PRICE_ID in Vercel.');
  };
  return <button className="btn" onClick={onClick}>{action === 'checkout' ? 'Subscribe' : 'Manage Billing'}</button>
}
