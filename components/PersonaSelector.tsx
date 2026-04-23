'use client';

import Link from 'next/link';
import { PERSONAS, type Persona } from '@/lib/personas';

interface PersonaSelectorProps {
  onSelect: (persona: Persona) => void;
  locale: string;
  caseTitle: string;
}

const DIFFICULTY_COLORS = {
  Challenging:      'text-amber-600 bg-amber-50 border-amber-200',
  'Very Challenging': 'text-orange-600 bg-orange-50 border-orange-200',
  Expert:           'text-red-600 bg-red-50 border-red-200',
};

export default function PersonaSelector({ onSelect, locale, caseTitle }: PersonaSelectorProps) {
  const isEs = locale === 'es';

  return (
    <div className="flex flex-col h-full bg-white overflow-y-auto">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 px-5 py-4 shrink-0">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-navy-500" />
          <span className="text-xs font-bold text-navy-600 uppercase tracking-wide">
            {isEs ? 'Elige tu perspectiva' : 'Choose your perspective'}
          </span>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed">
          {isEs
            ? `Estás asesorando a una empresa en crisis. Elige con qué parte interesada vas a comunicarte — el sistema de IA adoptará ese rol.`
            : `You're advising a company in crisis. Choose which stakeholder you'll communicate with — the AI will play that role.`}
        </p>
        <p className="text-xs text-navy-500 font-medium mt-1.5 italic">
          {caseTitle}
        </p>
        <Link
          href={`/${locale}/personas`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-[10px] text-navy-400 hover:text-navy-600 underline underline-offset-2 mt-1 transition-colors"
        >
          {isEs ? '🎭 Conocer a los adversarios →' : '🎭 Know your adversaries →'}
        </Link>
      </div>

      {/* Persona cards */}
      <div className="flex-1 p-4 space-y-3">
        {PERSONAS.map((persona) => {
          const diffKey = persona.difficulty;
          const diffLabel = isEs ? persona.difficultyEs : persona.difficulty;
          const diffColor = DIFFICULTY_COLORS[diffKey];

          return (
            <button
              key={persona.id}
              onClick={() => onSelect(persona)}
              className={`
                w-full text-left border-2 rounded-xl p-4 transition-all duration-150
                hover:shadow-md hover:scale-[1.01] active:scale-[0.99]
                ${persona.colorClass} bg-white hover:${persona.bgClass}
                group
              `}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-2xl flex-shrink-0">{persona.icon}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`font-bold text-sm ${persona.textClass}`}>
                        {isEs ? persona.nameEs : persona.name}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${diffColor}`}>
                        {diffLabel}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {isEs ? persona.roleEs : persona.role}
                    </p>
                  </div>
                </div>
                <span className={`text-lg opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ${persona.textClass}`}>
                  →
                </span>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed mt-2.5 line-clamp-2">
                {isEs ? persona.descriptionEs : persona.description}
              </p>

              <div className="mt-2.5 pt-2.5 border-t border-gray-100">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">
                  {isEs ? 'Su agenda' : 'Their agenda'}
                </p>
                <p className="text-xs text-gray-500 italic leading-relaxed">
                  {isEs ? persona.agendaEs : persona.agenda}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer hint */}
      <div className="shrink-0 px-4 pb-4 pt-2">
        <p className="text-xs text-center text-gray-400">
          {isEs
            ? 'Cada sesión puede ejecutarse con una perspectiva diferente para practicar la adaptación de mensajes.'
            : 'Each session can be run with a different perspective to practice message adaptation.'}
        </p>
      </div>
    </div>
  );
}
