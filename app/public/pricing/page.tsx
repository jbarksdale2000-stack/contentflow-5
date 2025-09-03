import StripeButton from '../../../components/StripeButton';

export default function PricingPage() {
  return (
    <main className="container">
      <h1>Pricing</h1>
      <div className="card">
        <h3>Starter</h3>
        <p>Free. Manual export.</p>
      </div>
      <div className="card">
        <h3>Pro</h3>
        <p>$9/mo. Unlimited repurposing & scheduling.</p>
        <StripeButton action="checkout" />
      </div>
    </main>
  );
}
