import StripeButton from '@/components/StripeButton';

export default function Home() {
  return (
    <main className="container">
      <div className="hero">
        <div style={{opacity:.7, fontSize:14, letterSpacing:1}}>CONTENTFLOW</div>
        <h1 style={{fontSize:36, margin:0, lineHeight:1.1}}>Turn one idea into many posts — automatically.</h1>
        <p style={{maxWidth:720, opacity:.85}}>
          Paste one draft, get platform-ready versions for LinkedIn, X, IG, and YouTube.
          Built for remote workers and students.
        </p>
        <div className="btns">
          <a className="btn" href="/projects">Open Projects</a>
          <a className="btn ghost" href="/public/pricing">See Pricing</a>
          <StripeButton action="checkout" />
        </div>
        <div className="notice">
          Works even without API keys (mock output). Add keys later for real AI + billing.
        </div>
      </div>
    </main>
  );
}
