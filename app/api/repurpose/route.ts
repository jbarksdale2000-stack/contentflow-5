import { getOpenAI } from '../../../lib/openai';
import { z } from 'zod';

export const runtime = 'nodejs';

const Body = z.object({
  input: z.string().min(10),
  tone: z.enum(['casual','professional','excited']).default('casual')
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const { input, tone } = Body.parse(json);

    const openai = getOpenAI();
    if (!openai) {
      // Mock output if no API key
      return Response.json({
        outputs: {
          linkedin: `LinkedIn (${tone}): ${input.slice(0,120)}…`,
          twitter: `X (${tone}): ${input.slice(0,220)} #contentflow`,
          instagram: `IG (${tone}): ${input.slice(0,180)} #contentflow`,
          youtube: `YouTube Description (${tone}): ${input.slice(0,380)}…`
        }
      });
    }

    const prompt = `You are ContentFlow. Repurpose the user input for 4 platforms in ${tone} tone.
Return JSON with keys: linkedin, twitter, instagram, youtube. Focus on clarity, hooks, and platform best practices.

INPUT:
${input}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a world-class content repurposing assistant.'},
        { role: 'user', content: prompt }
      ],
      temperature: 0.7
    });

    const raw = completion.choices[0]?.message?.content || '';
    // naive JSON extraction
    const start = raw.indexOf('{');
    const end = raw.lastIndexOf('}');
    let outputs: any = {};
    try {
      outputs = JSON.parse(raw.slice(start, end+1));
    } catch {
      outputs = {
        linkedin: raw.slice(0, 400),
        twitter: raw.slice(0, 240),
        instagram: raw.slice(0, 400),
        youtube: raw.slice(0, 600),
      };
    }

    return Response.json({ outputs });
  } catch (err: any) {
    return Response.json({ error: err.message || 'Failed to repurpose' }, { status: 400 });
  }
}
