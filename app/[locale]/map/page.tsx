import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { getAllCases } from '@/lib/cases';
import { getCoordinatesForCase } from '@/lib/case-coordinates';
import WorldMap from '@/components/WorldMap';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: locale === 'es' ? 'Mapa de Crisis' : 'Crisis Map',
    description:
      locale === 'es'
        ? 'Explora geográficamente dónde ocurrieron las crisis.'
        : 'Explore geographically where the crises happened.',
  };
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }];
}

const PR_COLORS: Record<string, string> = {
  failed: '#ef4444',
  mixed: '#f59e0b',
  effective: '#22c55e',
};

export default async function MapPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const isEs = locale === 'es';

  const allCases = getAllCases();

  const mapCases = allCases
    .map((c) => {
      const coord = getCoordinatesForCase(c.slug);
      return coord ? { caseItem: c, coord } : null;
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const failedCount    = mapCases.filter((m) => m.caseItem.pr_rating === 'failed').length;
  const mixedCount     = mapCases.filter((m) => m.caseItem.pr_rating === 'mixed').length;
  const effectiveCount = mapCases.filter((m) => m.caseItem.pr_rating === 'effective').length;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero header ──────────────────────────────────────────────────────── */}
      <div className="relative bg-navy-700 text-white overflow-hidden">
        {/* Blob decorations */}
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-navy-600 opacity-40 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-56 h-56 rounded-full bg-navy-800 opacity-30 blur-2xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

            {/* Left: title block */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-crisis-red animate-pulse" />
                <span className="text-xs font-bold text-navy-300 uppercase tracking-widest">
                  {isEs ? 'Mapa global · MINERBA' : 'Global map · MINERBA'}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-3">
                {isEs ? 'Mapa Mundial de Crisis' : 'Global Crisis Map'}
              </h1>
              <p className="text-navy-300 text-sm max-w-lg leading-relaxed">
                {isEs
                  ? 'Explora dónde ocurrieron las crisis. Haz clic en cualquier marcador para ver el caso e iniciar una simulación.'
                  : 'Explore where crises unfolded. Click any marker to view the full case and launch a simulation.'}
              </p>
            </div>

            {/* Right: stats + legend */}
            <div className="flex flex-wrap gap-3 shrink-0">
              <LegendPill
                color="#ef4444"
                label={isEs ? 'Fallido' : 'Failed'}
                count={failedCount}
              />
              <LegendPill
                color="#f59e0b"
                label={isEs ? 'Mixto' : 'Mixed'}
                count={mixedCount}
              />
              <LegendPill
                color="#22c55e"
                label={isEs ? 'Efectivo' : 'Effective'}
                count={effectiveCount}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Seamless join */}
      <div className="bg-white border-t border-gray-100">

        {/* ── Map ──────────────────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-md">
            <WorldMap cases={mapCases} locale={locale} />
          </div>
          <p className="text-[11px] text-center text-gray-400 mt-3">
            {isEs
              ? 'Scroll o usa +/− para ampliar · Arrastra para mover · Clic en un marcador para ver el caso'
              : 'Scroll or use +/− to zoom · Drag to pan · Click a marker to open the case panel'}
          </p>
        </div>

        {/* ── Case list ──────────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-navy-700">
              {isEs
                ? `${mapCases.length} casos en el mapa`
                : `${mapCases.length} cases on the map`}
            </h2>
            <Link
              href={`/${locale}/cases`}
              className="text-xs font-semibold text-navy-500 hover:text-navy-700 transition-colors"
            >
              {isEs ? 'Ver todos los casos →' : 'Browse all cases →'}
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {mapCases.map(({ caseItem, coord }) => {
              const color = PR_COLORS[caseItem.pr_rating];
              const location = isEs ? coord.locationEs : coord.location;
              return (
                <Link
                  key={caseItem.id}
                  href={`/${locale}/cases/${caseItem.id}`}
                  className="group flex gap-3 bg-white border border-gray-200 rounded-xl p-4 hover:border-navy-300 hover:shadow-md transition-all duration-200"
                >
                  {/* Left accent bar */}
                  <div
                    className="w-1 rounded-full flex-shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                      {caseItem.id.replace('case-', '')} · {caseItem.year}
                    </p>
                    <p className="text-sm font-bold text-navy-700 leading-snug group-hover:text-navy-500 transition-colors">
                      {caseItem.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">📍 {location}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{caseItem.company}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

function LegendPill({
  color,
  label,
  count,
}: {
  color: string;
  label: string;
  count: number;
}) {
  return (
    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl px-3.5 py-2">
      <span
        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
        style={{ backgroundColor: color }}
      />
      <span className="text-sm font-semibold text-white">{label}</span>
      <span className="text-sm font-black text-white/60 tabular-nums">{count}</span>
    </div>
  );
}
