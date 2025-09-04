'use client'
// correct (go up to repo root, then into lib/)
import { createClient } from '../../lib/supabase-client';
import { useEffect } from 'react';

export default function SignOut() {
  useEffect(() => {
    createClient().auth.signOut().finally(() => {
      window.location.href = '/';
    });
  }, []);
  return <main className="container"><p>Signing you out…</p></main>;
}
