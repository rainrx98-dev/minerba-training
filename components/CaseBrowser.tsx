'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import CaseCard from './CaseCard';
import type { Case } from '@/lib/case-types';
import { CRISIS_TYPE_LABELS_ES } from '@/lib/case-types';

type SortKey = 'default' | 'year-desc' | 'year-asc' | 'rating-worst' | 'rating-best';

const PR_RATING_WEIGHT: Record<string, number> = {
  failed: 0,
  mixed: 1,
  effective: 2,
};

interface CaseBrowserProps {
  cases: Case[];
  locale: string;
  initialIndustry?: string;
}

const INDUSTRY_OPTIONS = [
  { value: 'all', label: 'All Industries' },
  { value: 'energy', label: '⛽ Energy & Oil' },
  { value: 'mining', label: '⛏ Mining' },
  { value: 'healthcare', label: '🏥 Healthcare' },
] as const;

const REGION_OPTIONS = [
  { value: 'all', label: 'All Regions' },
  { value: 'global', label: 'Global' },
  { value: 'latin-america', label: 'Latin America' },
] as const;

const CRISIS_TYPE_OPTIONS = [
  { value: 'all', label: 'All Types' },
  { value: 'environmental-disaster', label: 'Environmental Disaster' },
  { value: 'fraud', label: 'Fraud / Governance' },
  { value: 'corruption', label: 'Corruption' },
  { value: 'ngo-pressure', label: 'NGO / Activist Pressure' },
  { value: 'human-rights', label: 'Human Rights' },
  { value: 'indigenous-rights', label: 'Indigenous Rights' },
  { value: 'product-safety', label: 'Product Safety' },
] as const;

const RATING_OPTIONS = [
  { value: 'all', label: 'All Ratings' },
  { value: 'failed', label: 'Failed' },
  { value: 'mixed', label: 'Mixed' },
  { value: 'effective', label: 'Effective ✓' },
] as const;

// Spanish translations for "All types" option (crisis types use CRISIS_TYPE_LABELS_ES from case-types)
const CRISIS_ALL_ES = 'Todos los tipos';

export default function CaseBrowser({ cases, locale, initialIndustry }: CaseBrowserProps) {
  const t = useTranslations('cases');
  const [industryFilter, setIndustryFilter] = useState(initialIndustry || 'all');
  const [regionFilter, setRegionFilter] = useState('all');
  const [crisisTypeFilter, setCrisisTypeFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [latamOnly, setLatamOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('default');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Press "/" to focus search (global keyboard shortcut)
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

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = cases.filter((c) => {
      if (industryFilter !== 'all' && c.industry !== industryFilter) return false;
      if (regionFilter !== 'all' && c.region !== regionFilter) return false;
      if (crisisTypeFilter !== 'all' && !c.crisis_type.includes(crisisTypeFilter)) return false;
      if (ratingFilter !== 'all' && c.pr_rating !== ratingFilter) return false;
      if (latamOnly && !c.latam_relevant) return false;
      if (q && !(
        c.title.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q)
      )) return false;
      return true;
    });

    // Apply sort
    const sorted = [...list];
    if (sortKey === 'year-desc') sorted.sort((a, b) => b.year - a.year);
    else if (sortKey === 'year-asc') sorted.sort((a, b) => a.year - b.year);
    else if (sortKey === 'rating-worst') sorted.sort((a, b) => PR_RATING_WEIGHT[a.pr_rating] - PR_RATING_WEIGHT[b.pr_rating]);
    else if (sortKey === 'rating-best') sorted.sort((a, b) => PR_RATING_WEIGHT[b.pr_rating] - PR_RATING_WEIGHT[a.pr_rating]);

    return sorted;
  }, [cases, industryFilter, regionFilter, crisisTypeFilter, ratingFilter, latamOnly, searchQuery, sortKey]);

  const hasActiveFilters =
    industryFilter !== 'all' || regionFilter !== 'all' || crisisTypeFilter !== 'all' ||
    ratingFilter !== 'all' || latamOnly || searchQuery.trim() !== '';

  function clearFilters() {
    setIndustryFilter('all');
    setRegionFilter('all');
    setCrisisTypeFilter('all');
    setRatingFilter('all');
    setLatamOnly(false);
    setSearchQuery('');
    setSortKey('default');
  }

  const isEs = locale === 'es';

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar filters */}
      <aside className="lg:w-56 shrink-0">
        <div className="bg-white border border-gray-200 rounded-lg p-4 sticky top-24">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-navy-700 uppercase tracking-wider">
              {isEs ? 'Filtros' : 'Filters'}
            </h3>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-gold hover:text-gold-dark underline"
              >
                {t('filters.clearFilters')}
              </button>
            )}
          </div>

          {/* LATAM toggle */}
          <div className="mb-5">
            <button
              onClick={() => setLatamOnly(!latamOnly)}
              className={`w-full flex items-center gap-2 text-left text-xs px-2.5 py-2 rounded border transition-colors ${
                latamOnly
                  ? 'bg-gold text-white border-gold font-semibold'
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="text-base leading-none">🌎</span>
              <span>{isEs ? 'Solo relevantes para LATAM' : 'LATAM Relevant Only'}</span>
            </button>
          </div>

          {/* Industry */}
          <FilterGroup
            label={isEs ? 'Industria' : 'Industry'}
            options={INDUSTRY_OPTIONS.map((o) => ({
              value: o.value,
              label: isEs && o.value === 'energy' ? '⛽ Energía & Petróleo'
                : isEs && o.value === 'mining' ? '⛏ Minería'
                : isEs && o.value === 'healthcare' ? '🏥 Salud'
                : isEs && o.value === 'all' ? 'Todas las industrias'
                : o.label,
            }))}
            value={industryFilter}
            onChange={setIndustryFilter}
          />

          {/* Region */}
          <FilterGroup
            label={t('filters.region')}
            options={REGION_OPTIONS.map((o) => ({
              value: o.value,
              label: isEs && o.value === 'all' ? 'Todas las regiones'
                : isEs && o.value === 'latin-america' ? 'América Latina'
                : o.label,
            }))}
            value={regionFilter}
            onChange={setRegionFilter}
          />

          {/* Crisis Type */}
          <FilterGroup
            label={t('filters.crisisType')}
            options={CRISIS_TYPE_OPTIONS.map((o) => ({
              value: o.value,
              label: isEs
                ? (o.value === 'all' ? CRISIS_ALL_ES : (CRISIS_TYPE_LABELS_ES[o.value] ?? o.label))
                : o.label,
            }))}
            value={crisisTypeFilter}
            onChange={setCrisisTypeFilter}
          />

          {/* PR Rating */}
          <FilterGroup
            label={t('filters.prRating')}
            options={RATING_OPTIONS.map((o) => ({
              value: o.value,
              label: isEs && o.value === 'all' ? 'Todas las calificaciones'
                : isEs && o.value === 'failed' ? 'Fallida'
                : isEs && o.value === 'mixed' ? 'Mixta'
                : isEs && o.value === 'effective' ? 'Efectiva ✓'
                : o.label,
            }))}
            value={ratingFilter}
            onChange={setRatingFilter}
          />
        </div>
      </aside>

      {/* Case grid */}
      <div className="flex-1">
        {/* Search */}
        <div className="mb-5">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isEs ? 'Buscar por empresa, título o país… (/)' : 'Search by company, title, or country… (/)'}
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
        </div>

        <div className="flex items-center justify-between mb-4 gap-3">
          <p className="text-sm text-gray-500">
            {t('resultsCount', { count: filtered.length })}
          </p>
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-navy-300"
          >
            <option value="default">{isEs ? 'Orden por defecto' : 'Default order'}</option>
            <option value="year-desc">{isEs ? 'Más recientes primero' : 'Newest first'}</option>
            <option value="year-asc">{isEs ? 'Más antiguos primero' : 'Oldest first'}</option>
            <option value="rating-worst">{isEs ? 'Peor desempeño primero' : 'Worst outcome first'}</option>
            <option value="rating-best">{isEs ? 'Mejor desempeño primero' : 'Best outcome first'}</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">—</p>
            <p className="text-sm">
              {isEs ? 'Ningún caso coincide con estos filtros.' : 'No cases match these filters.'}
            </p>
            <button onClick={clearFilters} className="mt-3 text-xs text-navy-500 underline hover:text-navy-700">
              {isEs ? 'Limpiar filtros' : 'Clear filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((c) => (
              <CaseCard
                key={c.id}
                caseItem={c}
                locale={locale}
                readLabel={t('readCase')}
                quizLabel={t('startQuiz')}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mb-5">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{label}</p>
      <div className="flex flex-col gap-1">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`text-left text-xs px-2.5 py-1.5 rounded transition-colors ${
              value === opt.value
                ? 'bg-navy-500 text-white font-semibold'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
