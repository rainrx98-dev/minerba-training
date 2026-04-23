'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { GLOSSARY, CATEGORY_META } from '@/lib/glossary';
import type { GlossaryCategory } from '@/lib/glossary';

const ALL_CATEGORIES: GlossaryCategory[] = ['strategic', 'operational', 'legal', 'latam'];

export default function GlossaryBrowser({ locale }: { locale: string }) {
  const isEs = locale === 'es';
  const [activeCategory, setActiveCategory] = useState<GlossaryCategory | 'all'>('all');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  // Press "/" to focus search
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  // Auto-expand on URL hash
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const term = GLOSSARY.find((t) => t.id === hash);
      if (term) {
        setExpanded(hash);
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, []);

  const filtered = GLOSSARY.filter((t) => {
    if (activeCategory !== 'all' && t.category !== activeCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      const term = (isEs ? t.termEs : t.term).toLowerCase();
      const def = (isEs ? t.definitionEs : t.definition).toLowerCase();
      return term.includes(q) || def.includes(q);
    }
    return true;
  });

  return (
    <div>
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <TabButton active={activeCategory === 'all'} onClick={() => setActiveCategory('all')}>
          {isEs ? 'Todos' : 'All'}{' '}
          <span className="ml-1 text-xs opacity-60">({GLOSSARY.length})</span>
        </TabButton>
        {ALL_CATEGORIES.map((cat) => {
          const meta = CATEGORY_META[cat];
          const count = GLOSSARY.filter((t) => t.category === cat).length;
          return (
            <TabButton
              key={cat}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            >
              {meta.icon} {isEs ? meta.labelEs : meta.label}{' '}
              <span className="ml-1 text-xs opacity-60">({count})</span>
            </TabButton>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          width="16"
          height="16"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        <input
          ref={searchRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={isEs ? 'Buscar términos… (/)' : 'Search terms… (/)'}
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

      {/* Result count + clear */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          {isEs
            ? `Mostrando ${filtered.length} de ${GLOSSARY.length} términos`
            : `Showing ${filtered.length} of ${GLOSSARY.length} terms`}
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
              {isEs ? 'Colapsar' : 'Collapse all'}
            </button>
          )}
        </div>
      </div>

      {/* Terms */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-sm font-medium">
            {isEs ? 'Ningún término coincide.' : 'No terms match your search.'}
          </p>
          <button
            onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
            className="mt-3 text-xs text-navy-600 hover:underline"
          >
            {isEs ? 'Limpiar filtros' : 'Clear filters'}
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((term) => {
            const catMeta = CATEGORY_META[term.category];
            const isOpen = expanded === term.id;

            return (
              <div
                key={term.id}
                id={term.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Header row */}
                <button
                  onClick={() => setExpanded(isOpen ? null : term.id)}
                  className="w-full text-left px-6 py-4 flex items-start justify-between gap-4"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${catMeta.color}`}>
                        {catMeta.icon} {isEs ? catMeta.labelEs : catMeta.label}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-navy-700 leading-snug">
                      {isEs ? term.termEs : term.term}
                    </h3>
                    {!isOpen && (
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">
                        {isEs ? term.definitionEs : term.definition}
                      </p>
                    )}
                  </div>
                  <span className="text-gray-400 text-lg flex-shrink-0 mt-0.5 select-none">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {/* Expanded body */}
                {isOpen && (
                  <div className="px-6 pb-6 border-t border-gray-100">
                    <div className="pt-4 space-y-4">
                      {/* Full definition */}
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {isEs ? term.definitionEs : term.definition}
                      </p>

                      {/* Why it matters */}
                      <div className="bg-navy-50 border border-navy-100 rounded-lg p-4">
                        <p className="text-xs font-bold text-navy-600 uppercase tracking-wide mb-1.5">
                          {isEs ? 'Por qué importa' : 'Why it matters'}
                        </p>
                        <p className="text-xs text-navy-800 leading-relaxed">
                          {isEs ? term.whyItMattersEs : term.whyItMatters}
                        </p>
                      </div>

                      {/* Deep dive link */}
                      <div className="flex justify-end">
                        <Link
                          href={`/${locale}/glossary/${term.id}`}
                          className="text-xs font-semibold text-navy-600 hover:text-navy-900 border border-navy-200 rounded px-2.5 py-1 hover:bg-navy-50 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {isEs ? 'Ver artículo completo →' : 'Full article →'}
                        </Link>
                      </div>

                      {/* Related cases + see also */}
                      <div className="flex flex-wrap items-start gap-5">
                        {term.relatedCaseIds.length > 0 && (
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                              {isEs ? 'Casos:' : 'Cases:'}
                            </span>
                            {term.relatedCaseIds.map((cid) => (
                              <Link
                                key={cid}
                                href={`/${locale}/cases/${cid.toLowerCase()}`}
                                className="text-xs bg-navy-50 text-navy-600 border border-navy-200 px-2 py-0.5 rounded hover:bg-navy-100 transition-colors font-medium"
                              >
                                {cid}
                              </Link>
                            ))}
                          </div>
                        )}
                        {term.seeAlso && term.seeAlso.length > 0 && (
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                              {isEs ? 'Ver también:' : 'See also:'}
                            </span>
                            {term.seeAlso.map((sid) => {
                              const linked = GLOSSARY.find((t) => t.id === sid);
                              if (!linked) return null;
                              return (
                                <Link
                                  key={sid}
                                  href={`/${locale}/glossary/${sid}`}
                                  className="text-xs text-blue-600 hover:underline font-medium"
                                >
                                  {isEs ? linked.termEs : linked.term}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Footer CTA */}
      <div className="mt-10 pt-6 border-t border-gray-200 flex flex-wrap gap-3">
        <Link
          href={`/${locale}/frameworks`}
          className="text-sm font-semibold text-navy-600 border border-navy-300 px-4 py-2 rounded-lg hover:bg-navy-50 transition-colors"
        >
          {isEs ? '→ Ver marcos de referencia' : '→ View frameworks library'}
        </Link>
        <Link
          href={`/${locale}/cases`}
          className="text-sm font-semibold text-gray-500 border border-gray-200 px-4 py-2 rounded-lg hover:bg-white transition-colors"
        >
          {isEs ? '→ Explorar casos' : '→ Browse cases'}
        </Link>
        <Link
          href={`/${locale}/stats`}
          className="text-sm font-semibold text-gray-500 border border-gray-200 px-4 py-2 rounded-lg hover:bg-white transition-colors"
        >
          {isEs ? '→ Ver estadísticas' : '→ Dataset stats'}
        </Link>
      </div>
    </div>
  );
}

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
