'use client'
import { useState } from 'react';
import { createClient } from '../../../lib/supabase';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: (process.env.NEXT_PUBLIC_APP_URL || '') + '/public/signin' } });
      if (error) throw error;
      setSent(true);
    } catch (err: any) {
      alert(err.message || 'Sign-in requires a Supabase project & SMTP. Add NEXT_PUBLIC_SUPABASE_URL / ANON_KEY in Vercel.');
    }
  };

  return (
    <main className="container">
      <h1>Sign in</h1>
      {sent ? <p>Check your email for a magic link.</p> : (
        <form onSubmit={onSubmit}>
          <input placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
          <button className="btn" type="submit">Send Magic Link</button>
        </form>
      )}
    </main>
  );
}
