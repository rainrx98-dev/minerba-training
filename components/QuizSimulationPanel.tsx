'use client';

import { useState } from 'react';
import PersonaSelector from '@/components/PersonaSelector';
import ChatInterface from '@/components/ChatInterface';
import type { Persona } from '@/lib/personas';

interface QuizSimulationPanelProps {
  caseId: string;
  caseTitle: string;
  defaultOpener: string;   // opener text for facilitator (non-persona) mode
  locale: string;
}

type SimState =
  | { mode: 'selecting' }
  | { mode: 'persona'; persona: Persona }
  | { mode: 'facilitator' };

export default function QuizSimulationPanel({
  caseId,
  caseTitle,
  defaultOpener,
  locale,
}: QuizSimulationPanelProps) {
  const [sim, setSim] = useState<SimState>({ mode: 'selecting' });
  const isEs = locale === 'es';

  /* ── Persona chat ─────────────────────────────────────────── */
  if (sim.mode === 'persona') {
    const { persona } = sim;
    const opener = isEs ? persona.openerLineEs : persona.openerLine;
    return (
      <ChatInterface
        key={persona.id}
        caseId={caseId}
        opener={opener}
        locale={locale}
        persona={persona}
        onReset={() => setSim({ mode: 'selecting' })}
      />
    );
  }

  /* ── Facilitator chat (persona skipped) ───────────────────── */
  if (sim.mode === 'facilitator') {
    return (
      <ChatInterface
        key="facilitator"
        caseId={caseId}
        opener={defaultOpener}
        locale={locale}
        onReset={() => setSim({ mode: 'selecting' })}
      />
    );
  }

  /* ── Persona selection screen ─────────────────────────────── */
  return (
    <div className="flex flex-col h-full">
      {/* Header strip */}
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center gap-2 shrink-0">
        <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          {isEs ? 'Elige tu perspectiva' : 'Choose your perspective'}
        </span>
        <span className="ml-auto text-xs text-gray-400">
          {isEs ? 'Antes de iniciar la simulación' : 'Before starting the simulation'}
        </span>
      </div>

      {/* Scrollable persona cards */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <PersonaSelector
          onSelect={(persona) => setSim({ mode: 'persona', persona })}
          locale={locale}
          caseTitle={caseTitle}
        />
      </div>

      {/* Skip-to-facilitator escape hatch */}
      <div className="shrink-0 px-4 py-3 border-t border-gray-100 bg-white text-center">
        <button
          onClick={() => setSim({ mode: 'facilitator' })}
          className="text-xs text-gray-400 hover:text-navy-600 transition-colors underline underline-offset-2"
        >
          {isEs
            ? '↓ Continuar en modo facilitador (sin perspectiva)'
            : '↓ Skip — continue in facilitator mode (no persona)'}
        </button>
      </div>
    </div>
  );
}
