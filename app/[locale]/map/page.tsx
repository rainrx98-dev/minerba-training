import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { getAllCases } from '@/lib/cases';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return {
    title: locale === 'es' ? 'Mapa de Crisis' : 'Crisis Map',
    description: locale === 'es'
      ? 'Explora geográficamente dónde ocurrieron las crisis.'
      : 'Explore geographically where the crises happened.',
  };
}
import { getCoordinatesForCase } from '@/lib/case-coordinates';
import WorldMap from '@/components/WorldMap';
import PRRatingBadge from '@/components/PRRatingBadge';

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }];
}

export default async function MapPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const isEs = locale === 'es';

  const allCases = getAllCases();

  // Build list of cases that have coordinates
  const mapCases = allCases
    .map((c) => {
      const coord = getCoordinatesForCase(c.slug);
      return coord ? { caseItem: c, coord } : null;
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  // Stats
  const failedCount = mapCases.filter((m) => m.caseItem.pr_rating === 'failed').length;
  const mixedCount = mapCases.filter((m) => m.caseItem.pr_rating === 'mixed').length;
  const effectiveCount = mapCases.filter((m) => m.caseItem.pr_rating === 'effective').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page header */}
      <div className="bg-navy-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-navy-300 uppercase tracking-widest mb-2 block">
                {isEs ? 'Casos en el Mapa' : 'Cases on the Map'}
              </span>
              <h1 className="text-3xl font-bold text-white leading-tight">
                {isEs ? 'Mapa Mundial de Crisis' : 'Global Crisis Map'}
              </h1>
              <p className="text-navy-300 text-sm mt-2 max-w-xl leading-relaxed">
                {isEs
                  ? 'Explora dónde ocurrieron las crisis. Haz clic en cualquier marcador para ver el caso completo e iniciar una simulación.'
                  : 'Explore where the crises happened. Click any marker to view the full case and launch a simulation.'}
              </p>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <LegendItem color="#ef4444" label={isEs ? 'Fallido' : 'Failed'} count={failedCount} />
              <LegendItem color="#f59e0b" label={isEs ? 'Mixto' : 'Mixed'} count={mixedCount} />
              <LegendItem color="#22c55e" label={isEs ? 'Efectivo' : 'Effective'} count={effectiveCount} />
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <WorldMap cases={mapCases} locale={locale} />
        </div>

        {/* Tip */}
        <p className="text-xs text-center text-gray-400 mt-3">
          {isEs
            ? 'Usa scroll o los botones +/− para ampliar · Arrastra para mover el mapa · Clic en un marcador para ir al caso'
            : 'Scroll or use +/− buttons to zoom · Drag to pan · Click a marker to go to the case'}
        </p>
      </div>

      {/* Case list below map */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-lg font-bold text-navy-700 mb-5">
          {isEs ? `${mapCases.length} casos en el mapa` : `${mapCases.length} cases on the map`}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mapCases.map(({ caseItem, coord }) => (
            <Link
              key={caseItem.id}
              href={`/${locale}/cases/${caseItem.id}`}
              className="group flex gap-3 bg-white border border-gray-200 rounded-lg p-4 hover:border-navy-300 hover:shadow-sm transition-all"
            >
              {/* Color dot */}
              <span
                className="mt-1 w-3 h-3 rounded-full flex-shrink-0"
                style={{
                  backgroundColor:
                    caseItem.pr_rating === 'failed'
                      ? '#ef4444'
                      : caseItem.pr_rating === 'mixed'
                        ? '#f59e0b'
                        : '#22c55e',
                }}
              />
              <div className="min-w-0">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-0.5">
                  {caseItem.id.replace('case-', '').toUpperCase()} · {caseItem.year}
                </p>
                <p className="text-sm font-bold text-navy-700 leading-snug group-hover:text-navy-500 transition-colors">
                  {caseItem.title}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  📍 {isEs ? coord.locationEs : coord.location}
                </p>
                <div className="mt-2">
                  <PRRatingBadge rating={caseItem.pr_rating} size="sm" locale={locale} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function LegendItem({
  color,
  label,
  count,
}: {
  color: string;
  label: string;
  count: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-sm text-navy-200">
        {label}
        <span className="text-navy-400 ml-1.5">({count})</span>
      </span>
    </div>
  );
}
