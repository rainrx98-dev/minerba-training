import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { getAllCases } from '@/lib/cases';
import { CRISIS_TYPE_LABELS, CRISIS_TYPE_LABELS_ES } from '@/lib/cases';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: locale === 'es' ? 'Estadísticas del Dataset' : 'Dataset Statistics',
    description:
      locale === 'es'
        ? 'Análisis cuantitativo de los 38 casos MINERBA: distribución por industria, tipo de crisis, calificación PR y relevancia LATAM.'
        : 'Quantitative analysis of all 38 MINERBA crisis cases: industry breakdown, crisis type frequency, PR rating distribution, and LATAM relevance.',
  };
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }];
}

export default async function StatsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const isEs = locale === 'es';
  const allCases = getAllCases();
  const total = allCases.length;

  // ── PR Rating ──────────────────────────────────────────────────────────────
  const failedCases = allCases.filter((c) => c.pr_rating === 'failed');
  const mixedCases = allCases.filter((c) => c.pr_rating === 'mixed');
  const effectiveCases = allCases.filter((c) => c.pr_rating === 'effective');

  // ── Industry ──────────────────────────────────────────────────────────────
  const energyCases = allCases.filter((c) => c.industry === 'energy' || !c.industry);
  const miningCases = allCases.filter((c) => c.industry === 'mining');
  const healthcareCases = allCases.filter((c) => c.industry === 'healthcare');

  // ── Region ────────────────────────────────────────────────────────────────
  const globalCases = allCases.filter((c) => c.region === 'global');
  const latamCases = allCases.filter((c) => c.region === 'latin-america');
  const latamRelevant = allCases.filter((c) => c.latam_relevant);

  // ── Crisis Type frequency ─────────────────────────────────────────────────
  const crisisTypeCounts: Record<string, number> = {};
  allCases.forEach((c) => {
    c.crisis_type.forEach((ct) => {
      crisisTypeCounts[ct] = (crisisTypeCounts[ct] || 0) + 1;
    });
  });
  const sortedTypes = Object.entries(crisisTypeCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 9);
  const maxTypeCount = sortedTypes[0]?.[1] ?? 1;

  // ── Year distribution ─────────────────────────────────────────────────────
  const yearCounts: Record<number, number> = {};
  allCases.forEach((c) => {
    yearCounts[c.year] = (yearCounts[c.year] || 0) + 1;
  });
  const yearEntries = Object.entries(yearCounts)
    .sort((a, b) => Number(a[0]) - Number(b[0]));
  const maxYearCount = Math.max(...Object.values(yearCounts));

  // Group by decade for a cleaner chart
  const decadeCounts: Record<string, number> = {
    '1984–1989': 0,
    '1990–1999': 0,
    '2000–2009': 0,
    '2010–2019': 0,
    '2020–2024': 0,
  };
  allCases.forEach((c) => {
    if (c.year <= 1989) decadeCounts['1984–1989']++;
    else if (c.year <= 1999) decadeCounts['1990–1999']++;
    else if (c.year <= 2009) decadeCounts['2000–2009']++;
    else if (c.year <= 2019) decadeCounts['2010–2019']++;
    else decadeCounts['2020–2024']++;
  });
  const maxDecadeCount = Math.max(...Object.values(decadeCounts));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page header */}
      <div className="bg-navy-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <span className="text-xs font-bold text-navy-300 uppercase tracking-widest mb-2 block">
            {isEs ? 'Análisis del Dataset' : 'Dataset Analysis'}
          </span>
          <h1 className="text-3xl font-bold text-white leading-tight mb-2">
            {isEs ? 'Estadísticas MINERBA' : 'MINERBA Statistics'}
          </h1>
          <p className="text-navy-300 text-sm max-w-2xl leading-relaxed">
            {isEs
              ? `Análisis cuantitativo de los ${total} casos de crisis — distribución por industria, tipo, calificación PR y relevancia LATAM.`
              : `Quantitative analysis of all ${total} crisis cases — broken down by industry, crisis type, PR rating, and Latin American relevance.`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

        {/* ── Top stat row ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard
            value={total}
            label={isEs ? 'Casos totales' : 'Total cases'}
            sub={isEs ? '3 sectores · 1984–2024' : '3 sectors · 1984–2024'}
            color="navy"
          />
          <StatCard
            value={latamRelevant.length}
            label={isEs ? 'LATAM relevantes' : 'LATAM relevant'}
            sub={`${Math.round((latamRelevant.length / total) * 100)}% ${isEs ? 'del total' : 'of dataset'}`}
            color="green"
          />
          <StatCard
            value={failedCases.length}
            label={isEs ? 'Respuestas fallidas' : 'Failed responses'}
            sub={`${Math.round((failedCases.length / total) * 100)}% ${isEs ? 'del total' : 'of dataset'}`}
            color="red"
          />
          <StatCard
            value={effectiveCases.length}
            label={isEs ? 'Respuestas efectivas' : 'Effective responses'}
            sub={`${Math.round((effectiveCases.length / total) * 100)}% ${isEs ? 'del total' : 'of dataset'}`}
            color="gold"
          />
        </div>

        {/* ── PR Rating + Industry ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* PR Rating Distribution */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-5">
              {isEs ? 'Distribución de Calificación PR' : 'PR Rating Distribution'}
            </h2>
            <div className="space-y-4">
              {[
                { label: isEs ? 'Fallida' : 'Failed', count: failedCases.length, color: 'bg-red-500', text: 'text-red-600', href: `/${locale}/cases` },
                { label: isEs ? 'Mixta' : 'Mixed', count: mixedCases.length, color: 'bg-amber-400', text: 'text-amber-600', href: `/${locale}/cases` },
                { label: isEs ? 'Efectiva' : 'Effective', count: effectiveCases.length, color: 'bg-green-500', text: 'text-green-700', href: `/${locale}/cases` },
              ].map(({ label, count, color, text }) => (
                <div key={label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-semibold text-gray-700">{label}</span>
                    <span className={`text-sm font-bold ${text}`}>
                      {count} <span className="text-gray-400 font-normal text-xs">({Math.round((count / total) * 100)}%)</span>
                    </span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${color} transition-all`}
                      style={{ width: `${(count / total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-5">
              {isEs
                ? 'La mayoría de los casos (47%) presentan respuestas fallidas — la base para las lecciones de MINERBA.'
                : 'The majority of cases (47%) show failed responses — the foundation of MINERBA\'s lessons.'}
            </p>
          </div>

          {/* Industry Breakdown */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-5">
              {isEs ? 'Distribución por Industria' : 'Industry Breakdown'}
            </h2>
            <div className="space-y-4">
              {[
                {
                  icon: '⛽',
                  label: isEs ? 'Energía y Petróleo' : 'Energy & Oil',
                  count: energyCases.length,
                  color: 'bg-blue-500',
                  href: `/${locale}/cases?industry=energy`,
                },
                {
                  icon: '⛏',
                  label: isEs ? 'Minería' : 'Mining',
                  count: miningCases.length,
                  color: 'bg-amber-500',
                  href: `/${locale}/cases?industry=mining`,
                },
                {
                  icon: '🏥',
                  label: isEs ? 'Salud' : 'Healthcare',
                  count: healthcareCases.length,
                  color: 'bg-green-500',
                  href: `/${locale}/cases?industry=healthcare`,
                },
              ].map(({ icon, label, count, color, href }) => (
                <div key={label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{icon}</span>
                      <Link href={href} className="text-sm font-semibold text-gray-700 hover:text-navy-600 hover:underline transition-colors">
                        {label}
                      </Link>
                    </div>
                    <span className="text-sm font-bold text-gray-600">
                      {count} <span className="text-gray-400 font-normal text-xs">({Math.round((count / total) * 100)}%)</span>
                    </span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${color}`}
                      style={{ width: `${(count / total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-gray-100 grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-xl font-black text-navy-700">{globalCases.length}</div>
                <div className="text-xs text-gray-500 mt-0.5">{isEs ? 'Casos globales' : 'Global cases'}</div>
              </div>
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <div className="text-xl font-black text-green-700">{latamCases.length}</div>
                <div className="text-xs text-gray-500 mt-0.5">{isEs ? 'Casos LATAM' : 'LATAM cases'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Crisis Type Frequency ────────────────────────────────────────── */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">
            {isEs ? 'Frecuencia por Tipo de Crisis' : 'Crisis Type Frequency'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
            {sortedTypes.map(([type, count]) => {
              const label = (isEs ? CRISIS_TYPE_LABELS_ES : CRISIS_TYPE_LABELS)[type] ?? type;
              const pct = Math.round((count / maxTypeCount) * 100);
              return (
                <div key={type}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-gray-700 truncate pr-2">{label}</span>
                    <span className="text-xs font-bold text-navy-600 shrink-0">{count}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-navy-400 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-gray-400 mt-5">
            {isEs
              ? 'Los casos pueden tener múltiples tipos de crisis. Los totales reflejan frecuencia de co-ocurrencia.'
              : 'Cases may have multiple crisis types. Totals reflect co-occurrence frequency.'}
          </p>
        </div>

        {/* ── Decade Distribution ──────────────────────────────────────────── */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">
            {isEs ? 'Distribución Temporal' : 'Temporal Distribution'}
          </h2>
          <div className="flex items-end gap-3 h-36">
            {Object.entries(decadeCounts).map(([decade, count]) => {
              const heightPct = maxDecadeCount > 0 ? Math.round((count / maxDecadeCount) * 100) : 0;
              return (
                <div key={decade} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs font-bold text-navy-600">{count}</span>
                  <div className="w-full bg-gray-100 rounded-t-md overflow-hidden flex flex-col justify-end" style={{ height: '80px' }}>
                    <div
                      className="w-full bg-navy-500 rounded-t-md transition-all"
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 text-center leading-tight">{decade}</span>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-gray-400 mt-4">
            {isEs
              ? 'La concentración de casos post-2000 refleja mayor escrutinio mediático y regulatorio, no mayor frecuencia de crisis.'
              : 'The concentration of post-2000 cases reflects greater media and regulatory scrutiny, not an increase in crisis frequency.'}
          </p>
        </div>

        {/* ── LATAM Relevance ──────────────────────────────────────────────── */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest">
              {isEs ? 'Relevancia LATAM' : 'LATAM Relevance'}
            </h2>
            <span className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full">
              🌎 {latamRelevant.length}/{total} {isEs ? 'casos' : 'cases'}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <LatamCard
              value={latamCases.length}
              label={isEs ? 'Casos ambientados en LATAM' : 'Cases set in LATAM'}
              sub={isEs ? 'Regiones: Brasil, Ecuador, Perú, Argentina, México' : 'Regions: Brazil, Ecuador, Peru, Argentina, Mexico'}
              icon="📍"
            />
            <LatamCard
              value={latamRelevant.length}
              label={isEs ? 'Con lecciones LATAM directas' : 'With direct LATAM lessons'}
              sub={isEs ? 'Patrones transferibles al sector energético de LATAM' : 'Transferable patterns for the LATAM energy sector'}
              icon="🎯"
            />
            <LatamCard
              value={allCases.filter((c) => c.crisis_type.includes('indigenous-rights')).length}
              label={isEs ? 'Con derechos indígenas' : 'Involving indigenous rights'}
              sub={isEs ? 'FPIC · Consulta previa · ILO 169' : 'FPIC · Consulta previa · ILO 169'}
              icon="⚖️"
            />
          </div>
        </div>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-3 pb-4">
          <Link
            href={`/${locale}/cases`}
            className="inline-flex items-center gap-2 bg-navy-500 text-white font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-navy-600 transition-colors"
          >
            {isEs ? '→ Explorar los 38 casos' : '→ Browse all 38 cases'}
          </Link>
          <Link
            href={`/${locale}/map`}
            className="inline-flex items-center gap-2 border border-gray-300 text-gray-600 font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-white transition-colors"
          >
            {isEs ? '🗺 Ver en el mapa' : '🗺 View on map'}
          </Link>
          <Link
            href={`/${locale}/glossary`}
            className="inline-flex items-center gap-2 border border-gray-300 text-gray-600 font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-white transition-colors"
          >
            {isEs ? '📖 Glosario de términos' : '📖 Glossary of terms'}
          </Link>
        </div>

      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StatCard({
  value,
  label,
  sub,
  color,
}: {
  value: number;
  label: string;
  sub: string;
  color: 'navy' | 'green' | 'red' | 'gold';
}) {
  const colorMap = {
    navy: 'bg-navy-700 text-white',
    green: 'bg-green-600 text-white',
    red: 'bg-red-500 text-white',
    gold: 'bg-amber-500 text-white',
  };
  return (
    <div className={`rounded-2xl p-5 shadow-sm ${colorMap[color]}`}>
      <div className="text-4xl font-black leading-none mb-1">{value}</div>
      <div className="text-sm font-bold opacity-90 mb-0.5">{label}</div>
      <div className="text-xs opacity-70">{sub}</div>
    </div>
  );
}

function LatamCard({
  value,
  label,
  sub,
  icon,
}: {
  value: number;
  label: string;
  sub: string;
  icon: string;
}) {
  return (
    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{icon}</span>
        <span className="text-2xl font-black text-green-700">{value}</span>
      </div>
      <p className="text-xs font-bold text-green-800 mb-1">{label}</p>
      <p className="text-xs text-green-700 leading-relaxed">{sub}</p>
    </div>
  );
}
