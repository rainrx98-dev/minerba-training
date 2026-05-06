import Anthropic from '@anthropic-ai/sdk';
import { NextRequest } from 'next/server';
import { buildSystemPrompt } from '@/lib/quiz-prompts';

const anthropic = new Anthropic();

// --- DEMO MODE RESPONSES (used when no API key is configured) ---
const DEMO_RESPONSES: Record<string, string | string[]> = {
  default: [
    `Good instinct to act quickly. In a real crisis, the **first two hours are critical** — this is when the narrative gets set, with or without you.\n\n**Evaluating your response:** You've identified the need for a spokesperson and holding statement — that aligns with the Minerba 72-Hour Protocol. However, one gap: Who is speaking to the *community* most affected, not just the press?\n\n**Next decision:** Your CEO wants to issue a statement immediately. He's drafted: *"We deeply regret this incident and are fully committed to remediation."* Your media advisor says it's too vague. The community liaison says it's not enough. A journalist from Reuters is calling in 20 minutes.\n\nHow do you advise the CEO?`,
    `Solid thinking on the media side. But consider this: in Latin American energy markets, **government ministries must be briefed before the press conference** — not after. If the Environment Minister hears about this from CNN rather than from you, you've lost a critical ally and potentially your operating license.\n\n**New development:** An indigenous community leader has just posted a video on social media claiming the contamination has reached the local river. It's been shared 2,000 times in 90 minutes. Your communications team says it's unverified.\n\nDo you respond to the social media content directly, and if so, how?`,
    `You're navigating this reasonably well. Let me push you on one strategic gap: **independent monitoring**.\n\nEvery case in this casebook — Exxon, BP, Chevron Ecuador — shows that company-controlled data is automatically suspect. The community won't trust your numbers. The press won't trust your numbers. Regulators will question your numbers.\n\nWhat's your plan for establishing a credible, independent source of environmental data that the public will actually believe?\n\n**Final question before we debrief:** The CEO is asking whether to accept a live television interview tomorrow morning. What do you advise, and why?`,
  ],
  debrief: `## Session Debrief

**Overall Performance: ★★★☆☆**
You demonstrated solid instincts on speed and stakeholder management, with room to develop your Latin America-specific adaptations.

---

### Score by Dimension

| Dimension | Score | Note |
|---|---|---|
| Speed & Decisiveness | ★★★★☆ | Correctly prioritized immediate action |
| Empathy & Stakeholder Awareness | ★★★☆☆ | Community stakeholders needed more attention |
| Transparency & Honesty | ★★★☆☆ | Good intent, but data independence gap |
| Media & Messaging Strategy | ★★★★☆ | Strong instincts on spokesperson control |
| Latin America Adaptation | ★★☆☆☆ | Government briefing sequence and WhatsApp channels not addressed |

---

### Two Things You Did Well
1. **Recognized the spokesperson problem early** — consolidating messaging is exactly right. Fragmented voices are what destroyed Exxon in 1989.
2. **Understood the CEO's symbolic role** — advising on CEO visibility shows awareness of executive communications as a strategic function.

### Two Things to Improve
1. **Government relations must come before press** — In LatAm energy markets, the Environment Ministry, the regional governor, and the community liaison all need to be briefed *before* you face the press. This is the most common gap in market-entry crisis planning.
2. **Independent monitoring is a non-negotiable** — Your own data will always be suspected. Engage a local university, NGO, or international body as the public source of environmental figures. This is what the 72-Hour Protocol prescribes for hours 24–48.

---

### What Actually Happened in the Real Case
The company waited too long, issued contradictory statements, and never established independent monitoring. The result was a prolonged media crisis that destroyed the brand's credibility and triggered regulatory action that cost multiples more than immediate transparent response would have.

---

### Framework to Review
**The 72-Hour Protocol** — specifically the 24–48 hour window on independent monitoring and the Latin America adaptation requiring government ministry briefings before press conferences. Review it on the Home page under Minerba Frameworks.`,
};

function classifyResponse(text: string): 'gibberish' | 'vague' | 'ok' {
  const trimmed = text.trim();
  if (!trimmed || trimmed.length < 10) return 'gibberish';

  // Count real English/Spanish words (3+ chars, mostly alphabetic)
  const tokens = trimmed.split(/\s+/);
  const realWords = tokens.filter((w) => /^[a-zA-ZáéíóúñüÁÉÍÓÚÑÜ]{3,}$/.test(w));
  const realWordRatio = realWords.length / Math.max(tokens.length, 1);

  // If fewer than 40% of tokens are real words → gibberish
  if (realWordRatio < 0.4 || realWords.length < 3) return 'gibberish';

  // If the answer is very short and uses only filler phrases → vague
  const vaguePatterns = /^(i (would|will|can|should)|we (should|will|need|must)|gather|assess|investigate|look into|monitor|wait|see what|think about|consider|analyze|review|get more)/i;
  if (realWords.length < 20 && vaguePatterns.test(trimmed)) return 'vague';

  return 'ok';
}

function getDemoResponse(messageCount: number, isDebrief: boolean, locale: string, lastUserMessage: string): string {
  const isEs = locale === 'es';
  const demoNote = isEs
    ? '\n\n---\n*⚠ Modo demo — agrega tu clave de Anthropic en `.env.local` para evaluaciones de IA en tiempo real.*'
    : '\n\n---\n*⚠ Demo mode — add your Anthropic API key to `.env.local` for real-time AI evaluation.*';

  if (isDebrief) {
    return isEs
      ? `## Informe de la Sesión\n\n**Rendimiento General: ★★★☆☆**\n\nEsta es una respuesta de demostración. Para obtener evaluaciones de IA en tiempo real y escenarios de crisis dinámicos, agregue su clave de API de Anthropic en \`.env.local\`.\n\nConecte su clave en \`console.anthropic.com\` — el costo estimado es de $3–10/mes para el equipo de Minerba.`
      : DEMO_RESPONSES.debrief as string;
  }

  const quality = classifyResponse(lastUserMessage);

  if (quality === 'gibberish') {
    const msg = isEs
      ? `✗ DEFICIENTE — Esa respuesta no constituye una recomendación de comunicaciones de crisis.\n\nEso no es una respuesta coherente. En una sala de crisis real, enviar texto incoherente cuando el CEO está esperando orientación terminaría con tu contrato de inmediato.\n\n**Intenta de nuevo.** Responde a la pregunta inicial con al menos: (1) quién habla públicamente y cuándo, (2) si el CEO debe estar físicamente presente, y (3) si emites un comunicado antes de tener todos los hechos.`
      : `✗ POOR — That response does not constitute a crisis communications recommendation.\n\nIncoherent text is not an answer. In a real crisis room, submitting gibberish while a CEO waits for guidance ends your engagement immediately.\n\n**Try again.** Address the opening question with at least: (1) who speaks publicly and when, (2) whether the CEO needs to be physically on-site, and (3) whether you issue a statement before you have full facts.`;
    return msg + demoNote;
  }

  if (quality === 'vague') {
    const msg = isEs
      ? `⚠ PARCIAL — Reconoces la urgencia, pero tu recomendación es demasiado vaga para actuar.\n\n"Recopilar información" y "evaluar la situación" no son decisiones de comunicación de crisis — son retrasos. La pregunta no es *si* actuar; es *cómo actuar ahora mismo*.\n\nSé específico: ¿quién es el único portavoz? ¿Cuál es el comunicado provisional? ¿Va el CEO al sitio o no?`
      : `⚠ PARTIAL — You've recognized the urgency but your recommendation is too vague to act on.\n\n"Gather information" and "assess the situation" are not crisis communications decisions — they are delays. The question is not *whether* to act; it's *how to act right now*.\n\nBe specific: who is the single spokesperson, what is the holding statement, does the CEO go on-site or not?`;
    return msg + demoNote;
  }

  // Reasonable answer → return scripted escalation
  const responses = DEMO_RESPONSES.default as string[];
  const index = Math.min(Math.floor((messageCount - 1) / 2), responses.length - 1);
  return responses[index] + demoNote;
}

export async function POST(req: NextRequest) {
  try {
    const { messages, caseId, isDebrief, locale, personaId } = await req.json();

    // DEMO MODE: If no API key, return evaluated responses
    if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'sk-ant-api03-your-key-here') {
      const lastUserMsg: string = [...messages].reverse().find((m: { role: string; content: string }) => m.role === 'user')?.content ?? '';
      const demoText = getDemoResponse(messages.length, isDebrief ?? false, locale ?? 'en', lastUserMsg);
      const encoder = new TextEncoder();
      const readable = new ReadableStream({
        async start(controller) {
          // Simulate streaming by chunking the response
          const words = demoText.split(' ');
          for (let i = 0; i < words.length; i += 3) {
            const chunk = words.slice(i, i + 3).join(' ') + ' ';
            controller.enqueue(encoder.encode(chunk));
            await new Promise((r) => setTimeout(r, 20));
          }
          controller.close();
        },
      });
      return new Response(readable, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-cache' },
      });
    }

    const systemPrompt = buildSystemPrompt(caseId, isDebrief ?? false, personaId, locale);

    // Filter out any [DEBRIEF REQUEST] user messages for the actual API call
    const apiMessages = messages
      .filter((m: { role: string; content: string }) => m.content !== '[DEBRIEF REQUEST]')
      .slice(-10); // Keep last 10 messages to manage context

    const stream = await anthropic.messages.stream({
      model: 'claude-opus-4-6',
      max_tokens: isDebrief ? 1500 : 800,
      system: systemPrompt,
      messages: apiMessages,
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (
              chunk.type === 'content_block_delta' &&
              chunk.delta.type === 'text_delta'
            ) {
              controller.enqueue(encoder.encode(chunk.delta.text));
            }
          }
        } catch (err) {
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'X-Accel-Buffering': 'no',
      },
    });
  } catch (error: unknown) {
    console.error('Chat API error:', error);
    const message =
      error instanceof Error ? error.message : 'Internal server error';
    return new Response(message, { status: 500 });
  }
}
