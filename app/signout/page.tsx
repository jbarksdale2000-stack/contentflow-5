'use client'
import { createClient } from '@/lib/supabase';
import { useEffect } from 'react';

export default function SignOut() {
  useEffect(() => {
    createClient().auth.signOut().finally(() => {
      window.location.href = '/';
    });
  }, []);
  return <main className="container"><p>Signing you out…</p></main>;
}
