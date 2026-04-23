'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FRAMEWORKS, CATEGORY_META } from '@/lib/frameworks';
import type { FrameworkCategory, FrameworkItem } from '@/lib/frameworks';

interface FrameworksFilterProps {
  locale: string;
}

const CATEGORIES: FrameworkCategory[] = ['academic', 'industry', 'operational', 'latam'];

export default function FrameworksFilter({ locale }: FrameworksFilterProps) {
  const [activeCategory, setActiveCategory] = useState<FrameworkCategory | 'all'>('all');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const isEs = locale === 'es';

  // Press "/" to focus search
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto-expand and scroll to a framework if the URL has a hash anchor
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const fw = FRAMEWORKS.find((f) => f.id === hash);
      if (fw) {
        setExpanded(hash);
        // Give the DOM time to render the expanded card
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, []);

  const filtered = FRAMEWORKS.filter((f) => {
    if (activeCategory !== 'all' && f.category !== activeCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      const title = (isEs ? f.titleEs : f.title).toLowerCase();
      const summary = (isEs ? f.summaryEs : f.summary).toLowerCase();
      const when = (isEs ? f.whenEs : f.when).toLowerCase();
      return title.includes(q) || summary.includes(q) || when.includes(q);
    }
    return true;
  });

  return (
    <div>
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        <TabButton
          active={activeCategory === 'all'}
          onClick={() => setActiveCategory('all')}
        >
          {isEs ? 'Todos' : 'All'}{' '}
          <span className="ml-1 text-xs opacity-70">({FRAMEWORKS.length})</span>
        </TabButton>
        {CATEGORIES.map((cat) => {
          const meta = CATEGORY_META[cat];
          const count = FRAMEWORKS.filter((f) => f.category === cat).length;
          return (
            <TabButton
              key={cat}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            >
              {meta.icon} {isEs ? meta.labelEs : meta.label}{' '}
              <span className="ml-1 text-xs opacity-70">({count})</span>
            </TabButton>
          );
        })}
      </div>

      {/* Category description strip */}
      {activeCategory !== 'all' && (
        <div className="mb-6 bg-navy-50 border border-navy-200 rounded-lg px-4 py-3">
          <p className="text-sm text-navy-700">
            {isEs
              ? CATEGORY_META[activeCategory].descriptionEs
              : CATEGORY_META[activeCategory].description}
          </p>
        </div>
      )}

      {/* Search input */}
      <div className="relative mb-6">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          width="16" height="16" fill="none" viewBox="0 0 24 24"
          stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        <input
          ref={searchInputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={isEs ? 'Buscar marcos… (/)' : 'Search frameworks… (/)'}
          className="w-full pl-9 pr-9 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-navy-300 placeholder-gray-400"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Result count + expand-all toggle */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-gray-500">
          {isEs
            ? `Mostrando ${filtered.length} de ${FRAMEWORKS.length} marcos`
            : `Showing ${filtered.length} of ${FRAMEWORKS.length} frameworks`}
        </p>
        <div className="flex items-center gap-3">
          {(searchQuery || activeCategory !== 'all') && (
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="text-xs text-navy-600 hover:underline"
            >
              {isEs ? 'Limpiar filtros' : 'Clear filters'}
            </button>
          )}
          {expanded && (
            <button
              onClick={() => setExpanded(null)}
              className="text-xs text-gray-400 hover:text-navy-600 transition-colors"
            >
              {isEs ? 'Colapsar' : 'Collapse'}
            </button>
          )}
        </div>
      </div>

      {/* Framework cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-sm font-medium">
            {isEs ? 'Ningún marco coincide con tu búsqueda.' : 'No frameworks match your search.'}
          </p>
          <button
            onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
            className="mt-3 text-xs text-navy-600 hover:underline"
          >
            {isEs ? 'Limpiar filtros' : 'Clear filters'}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((fw) => (
            <FrameworkCard
              key={fw.id}
              fw={fw}
              locale={locale}
              isExpanded={expanded === fw.id}
              onToggle={() => setExpanded(expanded === fw.id ? null : fw.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        active
          ? 'bg-navy-500 text-white shadow-sm'
          : 'bg-white border border-gray-200 text-gray-600 hover:border-navy-300 hover:text-navy-700'
      }`}
    >
      {children}
    </button>
  );
}

const CATEGORY_ACCENT: Record<FrameworkCategory, string> = {
  academic: 'border-l-purple-500',
  industry: 'border-l-blue-500',
  operational: 'border-l-navy-500',
  latam: 'border-l-green-600',
};

const CATEGORY_BADGE: Record<FrameworkCategory, string> = {
  academic: 'bg-purple-50 text-purple-700 border-purple-200',
  industry: 'bg-blue-50 text-blue-700 border-blue-200',
  operational: 'bg-navy-50 text-navy-700 border-navy-200',
  latam: 'bg-green-50 text-green-700 border-green-200',
};

function FrameworkCard({
  fw,
  locale,
  isExpanded,
  onToggle,
}: {
  fw: FrameworkItem;
  locale: string;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const isEs = locale === 'es';
  const catMeta = CATEGORY_META[fw.category];
  const accentClass = CATEGORY_ACCENT[fw.category];
  const badgeClass = CATEGORY_BADGE[fw.category];

  return (
    <div
      id={fw.id}
      className={`bg-white border border-gray-200 rounded-xl border-l-4 ${accentClass} overflow-hidden transition-shadow hover:shadow-md`}
    >
      {/* Header row — always visible */}
      <button
        onClick={onToggle}
        className="w-full text-left px-5 py-4 flex items-start justify-between gap-4"
      >
        <div className="flex items-start gap-3 min-w-0">
          <span className="text-xl flex-shrink-0 mt-0.5">{fw.icon}</span>
          <div className="min-w-0">
            {/* Category badge + origin */}
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${badgeClass}`}>
                {isEs ? catMeta.labelEs : catMeta.label}
              </span>
              <span className="text-xs text-gray-400">{fw.origin}</span>
            </div>
            <h3 className="text-sm font-bold text-navy-700 leading-snug">
              {isEs ? fw.titleEs : fw.title}
            </h3>
            {/* "When to use" — visible in collapsed state */}
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              <span className="font-medium text-gray-600">
                {isEs ? 'Cuándo usar: ' : 'When to use: '}
              </span>
              {isEs ? fw.whenEs : fw.when}
            </p>
          </div>
        </div>
        {/* Expand toggle */}
        <span className="text-gray-400 text-lg flex-shrink-0 mt-0.5 select-none">
          {isExpanded ? '−' : '+'}
        </span>
      </button>

      {/* Expanded body */}
      {isExpanded && (
        <div className="px-5 pb-5">
          <div className="pl-8">
            {/* Summary */}
            <p className="text-sm text-gray-700 leading-relaxed mb-5 border-t border-gray-100 pt-4">
              {isEs ? fw.summaryEs : fw.summary}
            </p>

            {/* Principles / steps */}
            <div className="space-y-3 mb-5">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                {isEs ? 'Principios Clave' : 'Key Principles'}
              </p>
              {fw.principles.map((p, i) => (
                <div
                  key={i}
                  className="border border-gray-100 rounded-lg p-3 bg-gray-50"
                >
                  <p className="text-xs font-bold text-navy-700 mb-1">
                    {isEs ? p.labelEs : p.label}
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {isEs ? p.detailEs : p.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* Related cases + external link + deep-dive link */}
            <div className="flex flex-wrap items-center gap-3">
              {fw.usedInCases && fw.usedInCases.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-gray-400 font-medium">
                    {isEs ? 'Casos relacionados:' : 'Related cases:'}
                  </span>
                  {fw.usedInCases.map((caseId) => {
                    const urlId = caseId.replace(/^case-/, '');
                    return (
                      <Link
                        key={caseId}
                        href={`/${locale}/cases/${urlId}`}
                        className="text-xs bg-navy-50 text-navy-600 border border-navy-200 px-2 py-0.5 rounded hover:bg-navy-100 transition-colors font-medium"
                      >
                        {urlId.toUpperCase()}
                      </Link>
                    );
                  })}
                </div>
              )}
              <div className="flex items-center gap-3 ml-auto">
                {fw.externalRef && (
                  <a
                    href={fw.externalRef}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline"
                  >
                    {isEs ? 'Fuente oficial →' : 'Official source →'}
                  </a>
                )}
                <Link
                  href={`/${locale}/frameworks/${fw.id}`}
                  className="text-xs font-semibold text-navy-600 hover:text-navy-900 border border-navy-200 rounded px-2.5 py-1 hover:bg-navy-50 transition-colors"
                >
                  {isEs ? 'Ver detalle →' : 'Deep dive →'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
