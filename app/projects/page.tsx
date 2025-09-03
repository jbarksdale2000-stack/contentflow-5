'use client'
import { useState } from 'react';

type OutputKey = 'linkedin' | 'twitter' | 'instagram' | 'youtube';

export default function ProjectsPage() {
  const [input, setInput] = useState('');
  const [tone, setTone] = useState<'casual'|'professional'|'excited'>('casual');
  const [outputs, setOutputs] = useState<Partial<Record<OutputKey,string>>>({});
  const [loading, setLoading] = useState(false);

  const run = async () => {
    setLoading(true);
    setOutputs({});
    const res = await fetch('/api/repurpose', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input, tone })
    });
    const json = await res.json();
    setOutputs(json.outputs || {});
    setLoading(false);
  };

  const copy = async (key: OutputKey) => {
    if (outputs[key]) await navigator.clipboard.writeText(outputs[key]!);
    alert('Copied!');
  }

  return (
    <main className="container">
      <h1>Projects</h1>
      <p>Paste your idea or rough draft. We’ll repurpose it for each platform.</p>

      <textarea placeholder="Paste your content here..." value={input} onChange={e=>setInput(e.target.value)} />

      <div style={{display:'flex', gap:12, alignItems:'center', margin:'8px 0'}}>
        <label> Tone: </label>
        <select value={tone} onChange={(e)=>setTone(e.target.value as any)}>
          <option value="casual">Casual</option>
          <option value="professional">Professional</option>
          <option value="excited">Excited</option>
        </select>
        <button className="btn" onClick={run} disabled={!input || loading}>{loading ? 'Generating…' : 'Generate'}</button>
      </div>

      <div className="grid">
        <div className="card">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <h3>LinkedIn</h3><span className="copy" onClick={()=>copy('linkedin')}>copy</span>
          </div>
          <pre style={{whiteSpace:'pre-wrap'}}>{outputs.linkedin || '—'}</pre>
        </div>
        <div className="card">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <h3>Twitter/X</h3><span className="copy" onClick={()=>copy('twitter')}>copy</span>
          </div>
          <pre style={{whiteSpace:'pre-wrap'}}>{outputs.twitter || '—'}</pre>
        </div>
        <div className="card">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <h3>Instagram</h3><span className="copy" onClick={()=>copy('instagram')}>copy</span>
          </div>
          <pre style={{whiteSpace:'pre-wrap'}}>{outputs.instagram || '—'}</pre>
        </div>
        <div className="card">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <h3>YouTube Description</h3><span className="copy" onClick={()=>copy('youtube')}>copy</span>
          </div>
          <pre style={{whiteSpace:'pre-wrap'}}>{outputs.youtube || '—'}</pre>
        </div>
      </div>
    </main>
  );
}
