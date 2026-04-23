'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FRAMEWORKS } from '@/lib/frameworks';
import { GLOSSARY, CATEGORY_META } from '@/lib/glossary';
import { LEARNING_PATHS } from '@/lib/learning-paths';
import PRRatingBadge from '@/components/PRRatingBadge';
import type { Case } from '@/lib/case-types';
import type { FrameworkItem } from '@/lib/frameworks';
import type { GlossaryTerm } from '@/lib/glossary';
import type { LearningPath } from '@/lib/learning-paths';

type ResultKind = 'case' | 'framework' | 'glossary' | 'path';

interface SearchResult {
  kind: ResultKind;
  id: string;
  title: string;
  subtitle: string;
  href: string;
  score: number;
  snippet: string;
  data: Case | FrameworkItem | GlossaryTerm | LearningPath;
}

function scoreMatch(text: string, query: string): number {
  if (!text || !query) return 0;
  const t = text.toLowerCase();
  const q = query.toLowerCase().trim();
  if (!q) return 0;
  if (t === q) return 10;
  if (t.startsWith(q)) return 7;
  if (t.includes(q)) return 4;
  const words = q.split(/\s+/);
  const matches = words.filter((w) => w.length > 2 && t.includes(w)).length;
  return matches > 0 ? matches * 2 : 0;
}

function extractSnippet(raw: string, query: string): string {
  if (!raw) return '';
  const q = query.toLowerCase();
  const lower = raw.toLowerCase();
  const idx = lower.indexOf(q);
  if (idx >= 0) {
    const start = Math.max(0, idx - 60);
    const end = Math.min(raw.length, idx + query.length + 100);
    return (start > 0 ? '…' : '') + raw.slice(start, end) + (end < raw.length ? '…' : '');
  }
  return raw.slice(0, 160) + (raw.length > 160 ? '…' : '');
}

const KIND_ICON: Record<ResultKind, string> = { case: '📂', framework: '🛡', glossary: '📖', path: '🎓' };
const KIND_COLOR: Record<ResultKind, string> = {
  case:      'bg-navy-50 text-navy-700 border-navy-200',
  framework: 'bg-purple-50 text-purple-700 border-purple-200',
  glossary:  'bg-green-50 text-green-700 border-green-200',
  path:      'bg-amber-50 text-amber-700 border-amber-200',
};

function kindLabel(kind: ResultKind, isEs: boolean) {
  const labels: Record<ResultKind, [string, string]> = {
    case:      ['Case Study', 'Caso de Estudio'],
    framework: ['Framework', 'Marco'],
    glossary:  ['Glossary', 'Glosario'],
    path:      ['Learning Path', 'Ruta de Aprendizaje'],
  };
  return isEs ? labels[kind][1] : labels[kind][0];
}

const POPULAR_SEARCHES = ['Petrobras', 'BP', 'FPIC', 'indigenous', '72 hours', 'Tylenol', 'Brumadinho', 'social license'];

interface Props {
  locale: string;
  cases: Case[];
}

export default function SearchClient({ locale, cases }: Props) {
  const isEs = locale === 'es';
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams?.get('q') ?? '');
  const [activeKind, setActiveKind] = useState<ResultKind | 'all'>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = useMemo<SearchResult[]>(() => {
    const q = query.trim();
    if (!q) return [];
    const out: SearchResult[] = [];

    // ── Cases ──────────────────────────────────────────────────────────────
    for (const c of cases) {
      const titleScore  = scoreMatch(c.company, q) * 3 + scoreMatch(c.title, q) * 2;
      const bodyScore   = scoreMatch([c.summary, c.country, ...c.crisis_type].join(' '), q);
      const score = titleScore + bodyScore;
      if (score > 0) {
        out.push({
          kind: 'case', id: c.id,
          title: c.company,
          subtitle: `${c.title} · ${c.year} · ${c.country}`,
          href: `/${locale}/cases/${c.id}`,
          score,
          snippet: extractSnippet(c.summary, q),
          data: c,
        });
      }
    }

    // ── Frameworks ─────────────────────────────────────────────────────────
    for (const fw of FRAMEWORKS) {
      const label   = isEs ? fw.titleEs : fw.title;
      const body    = isEs ? fw.summaryEs : fw.summary;
      const score   = scoreMatch(label, q) * 3 + scoreMatch([fw.id, body].join(' '), q);
      if (score > 0) {
        out.push({
          kind: 'framework', id: fw.id,
          title: label,
          subtitle: `${isEs ? 'Marco' : 'Framework'} · ${isEs ? fw.originEs : fw.origin}`,
          href: `/${locale}/frameworks/${fw.id}`,
          score,
          snippet: extractSnippet(body, q),
          data: fw,
        });
      }
    }

    // ── Glossary ───────────────────────────────────────────────────────────
    for (const term of GLOSSARY) {
      const label   = isEs ? term.termEs : term.term;
      const def     = isEs ? term.definitionEs : term.definition;
      const score   = scoreMatch(label, q) * 3 + scoreMatch(def, q);
      if (score > 0) {
        const catMeta = CATEGORY_META[term.category];
        out.push({
          kind: 'glossary', id: term.id,
          title: label,
          subtitle: `${isEs ? catMeta.labelEs : catMeta.label} · ${isEs ? 'Glosario' : 'Glossary'}`,
          href: `/${locale}/glossary/${term.id}`,
          score,
          snippet: extractSnippet(def, q),
          data: term,
        });
      }
    }

    // ── Learning paths ─────────────────────────────────────────────────────
    for (const path of LEARNING_PATHS) {
      const label  = isEs ? path.titleEs : path.title;
      const desc   = isEs ? path.descriptionEs : path.description;
      const score  = scoreMatch(label, q) * 3 + scoreMatch(desc, q);
      if (score > 0) {
        out.push({
          kind: 'path', id: path.id,
          title: label,
          subtitle: `${isEs ? 'Ruta' : 'Path'} · ${path.caseIds.length} ${isEs ? 'casos' : 'cases'} · ${path.difficulty}`,
          href: `/${locale}/learning/${path.id}`,
          score,
          snippet: extractSnippet(desc, q),
          data: path,
        });
      }
    }

    return out.sort((a, b) => b.score - a.score);
  }, [query, isEs, cases, locale]);

  const filtered = activeKind === 'all' ? results : results.filter((r) => r.kind === activeKind);
  const counts: Record<ResultKind, number> = {
    case:      results.filter((r) => r.kind === 'case').length,
    framework: results.filter((r) => r.kind === 'framework').length,
    glossary:  results.filter((r) => r.kind === 'glossary').length,
    path:      results.filter((r) => r.kind === 'path').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero / search bar ─────────────────────────────────────────────────── */}
      <div className="bg-navy-700">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-xs font-bold text-navy-300 uppercase tracking-widest mb-3">
            {isEs ? 'Búsqueda Global' : 'Global Search'}
          </p>
          <h1 className="text-2xl font-bold text-white mb-6">
            {isEs ? 'Buscar en toda la plataforma' : 'Search the entire platform'}
          </h1>

          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setActiveKind('all'); }}
              placeholder={isEs
                ? 'Buscar casos, marcos, términos, rutas...'
                : 'Search cases, frameworks, terms, paths...'}
              className="w-full pl-12 pr-12 py-4 text-base border-0 rounded-xl bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-gold text-gray-800 placeholder-gray-400"
            />
            {query && (
              <button onClick={() => { setQuery(''); setActiveKind('all'); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {!query && (
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-xs text-navy-400 self-center font-medium mr-1">
                {isEs ? 'Populares:' : 'Popular:'}
              </span>
              {POPULAR_SEARCHES.map((s) => (
                <button key={s} onClick={() => setQuery(s)}
                  className="text-xs font-medium text-navy-200 border border-navy-500 rounded-full px-3 py-1 hover:bg-navy-600 transition-colors">
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {query.trim() ? (
          <>
            {/* Kind filter tabs */}
            <div className="flex flex-wrap gap-2 mb-5">
              <FilterTab active={activeKind === 'all'} onClick={() => setActiveKind('all')}>
                {isEs ? 'Todo' : 'All'} ({results.length})
              </FilterTab>
              {(['case', 'framework', 'glossary', 'path'] as ResultKind[]).map((k) =>
                counts[k] > 0 ? (
                  <FilterTab key={k} active={activeKind === k} onClick={() => setActiveKind(k)}>
                    {KIND_ICON[k]} {kindLabel(k, isEs)} ({counts[k]})
                  </FilterTab>
                ) : null
              )}
            </div>

            <p className="text-sm text-gray-500 mb-5">
              {filtered.length === 0
                ? (isEs ? 'Sin resultados.' : 'No results found.')
                : isEs
                  ? `${filtered.length} resultado${filtered.length !== 1 ? 's' : ''} para "${query}"`
                  : `${filtered.length} result${filtered.length !== 1 ? 's' : ''} for "${query}"`}
            </p>

            <div className="space-y-3">
              {filtered.map((r) => (
                <Link
                  key={`${r.kind}-${r.id}`}
                  href={r.href}
                  className="flex items-start gap-4 bg-white border border-gray-200 rounded-xl p-5 hover:border-navy-300 hover:shadow-md transition-all group"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full border ${KIND_COLOR[r.kind]}`}>
                      {KIND_ICON[r.kind]} {kindLabel(r.kind, isEs)}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <h3 className="text-sm font-bold text-navy-700 group-hover:text-navy-500 transition-colors leading-snug">
                        {r.title}
                      </h3>
                      {r.kind === 'case' && (
                        <PRRatingBadge rating={(r.data as Case).pr_rating} size="sm" locale={locale} />
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{r.subtitle}</p>
                    {r.snippet && (
                      <p className="text-xs text-gray-400 leading-relaxed mt-1.5 line-clamp-2">
                        {r.snippet}
                      </p>
                    )}
                  </div>
                  <span className="text-gray-300 group-hover:text-navy-500 transition-colors text-lg flex-shrink-0 self-center">→</span>
                </Link>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-14">
                <div className="text-4xl mb-4">🔍</div>
                <p className="text-gray-500 font-medium mb-2">
                  {isEs ? `Sin resultados para "${query}"` : `No results for "${query}"`}
                </p>
                <p className="text-sm text-gray-400 mb-6">
                  {isEs ? 'Intenta un término diferente.' : 'Try a different search term.'}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {[
                    { href: `/${locale}/cases`,     en: 'Browse cases',     es: 'Explorar casos' },
                    { href: `/${locale}/frameworks`, en: 'All frameworks',   es: 'Todos los marcos' },
                    { href: `/${locale}/glossary`,   en: 'Glossary',         es: 'Glosario' },
                    { href: `/${locale}/learning`,   en: 'Learning paths',   es: 'Rutas de aprendizaje' },
                  ].map((l) => (
                    <Link key={l.href} href={l.href}
                      className="text-sm font-semibold text-navy-600 border border-navy-300 px-4 py-2 rounded-lg hover:bg-navy-50 transition-colors">
                      {isEs ? l.es : l.en} →
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          /* Empty state — catalogue links */
          <div className="space-y-4">
            <p className="text-sm text-gray-400 mb-2">
              {isEs ? 'Explora por sección:' : 'Browse by section:'}
            </p>
            {[
              { href: `/${locale}/cases`,     icon: '📂', en: 'Case Studies',      es: 'Casos de Estudio',       sub_en: `${cases.length} crises across energy, mining & healthcare`, sub_es: `${cases.length} crisis en energía, minería y salud` },
              { href: `/${locale}/frameworks`, icon: '🛡', en: 'Frameworks',        es: 'Marcos de Referencia',   sub_en: `${FRAMEWORKS.length} crisis communication frameworks`,      sub_es: `${FRAMEWORKS.length} marcos de comunicación de crisis` },
              { href: `/${locale}/glossary`,   icon: '📖', en: 'Glossary',          es: 'Glosario',               sub_en: `${GLOSSARY.length} essential terms`,                        sub_es: `${GLOSSARY.length} términos esenciales` },
              { href: `/${locale}/learning`,   icon: '🎓', en: 'Learning Paths',    es: 'Rutas de Aprendizaje',   sub_en: `${LEARNING_PATHS.length} curated case sequences`,           sub_es: `${LEARNING_PATHS.length} secuencias curadas de casos` },
              { href: `/${locale}/personas`,   icon: '🎭', en: 'Simulation Personas', es: 'Adversarios de Simulación', sub_en: '5 AI stakeholder profiles', sub_es: '5 perfiles de partes interesadas IA' },
            ].map((item) => (
              <Link key={item.href} href={item.href}
                className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl px-5 py-4 hover:border-navy-300 hover:shadow-md transition-all group">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold text-navy-700 group-hover:text-navy-500 transition-colors">
                    {isEs ? item.es : item.en}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">{isEs ? item.sub_es : item.sub_en}</p>
                </div>
                <span className="text-gray-300 group-hover:text-navy-500 transition-colors text-lg flex-shrink-0">→</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterTab({ active, onClick, children }: {
  active: boolean; onClick: () => void; children: React.ReactNode;
}) {
  return (
    <button onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
        active
          ? 'bg-navy-700 text-white'
          : 'bg-white border border-gray-200 text-gray-600 hover:border-navy-300 hover:text-navy-700'
      }`}>
      {children}
    </button>
  );
}
