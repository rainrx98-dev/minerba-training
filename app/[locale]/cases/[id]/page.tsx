import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getCaseById, getRelatedCases, getAllCases, CRISIS_TYPE_LABELS, CRISIS_TYPE_LABELS_ES, SECTOR_LABELS, SECTOR_LABELS_ES } from '@/lib/cases';
import { getFrameworkById } from '@/lib/frameworks';
import { GLOSSARY } from '@/lib/glossary';
import { CATEGORY_META } from '@/lib/glossary';
import { INDUSTRY_ICONS, INDUSTRY_LABELS, INDUSTRY_LABELS_ES } from '@/lib/case-types';
import { LEARNING_PATHS } from '@/lib/learning-paths';
import PRRatingBadge from '@/components/PRRatingBadge';
import CaseCard from '@/components/CaseCard';

export async function generateMetadata({
  params: { locale, id },
}: {
  params: { locale: string; id: string };
}): Promise<Metadata> {
  const c = getCaseById(id);
  if (!c) return {};
  return {
    title: `${c.company} — ${c.title}`,
    description: c.summary.slice(0, 160),
  };
}

export async function generateStaticParams() {
  const cases = getAllCases();
  const locales = ['en', 'es'];
  return locales.flatMap((locale) =>
    cases.map((c) => ({ locale, id: c.id }))
  );
}

export default async function CaseDetailPage({
  params: { locale, id },
}: {
  params: { locale: string; id: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('case');
  const tf = await getTranslations('cases');
  const caseItem = getCaseById(id);

  if (!caseItem) notFound();

  const relatedCases = getRelatedCases(caseItem, 3);
  const isEs = locale === 'es';

  // Prev / next case navigation
  const allCasesOrdered = getAllCases();
  const currentIdx = allCasesOrdered.findIndex((c) => c.id === caseItem.id);
  const prevCase = currentIdx > 0 ? allCasesOrdered[currentIdx - 1] : null;
  const nextCase = currentIdx < allCasesOrdered.length - 1 ? allCasesOrdered[currentIdx + 1] : null;

  // Glossary terms that reference this case
  const relatedTerms = GLOSSARY.filter((term) =>
    term.relatedCaseIds.includes(caseItem.id)
  ).slice(0, 5);

  // Learning paths that include this case
  const caseInPaths = LEARNING_PATHS.filter((p) => p.caseIds.includes(caseItem.id));

  // For each path, compute position + next case for the "Continue learning" strip
  const pathContinuations = caseInPaths
    .map((lp) => {
      const idx = lp.caseIds.indexOf(caseItem.id);
      const nextPathCaseId =
        idx >= 0 && idx < lp.caseIds.length - 1 ? lp.caseIds[idx + 1] : null;
      const nextPathCase = nextPathCaseId ? getCaseById(nextPathCaseId) : null;
      return {
        path: lp,
        position: idx + 1, // 1-based
        total: lp.caseIds.length,
        nextCase: nextPathCase,
        isLastInPath: idx === lp.caseIds.length - 1,
      };
    })
    .filter((c) => c.position > 0);
  const crisisLabels = isEs ? CRISIS_TYPE_LABELS_ES : CRISIS_TYPE_LABELS;
  const sectorLabels = isEs ? SECTOR_LABELS_ES : SECTOR_LABELS;
  const industryId = caseItem.industry ?? 'energy';
  const industryIcon = INDUSTRY_ICONS[industryId];
  const industryLabel = isEs ? INDUSTRY_LABELS_ES[industryId] : INDUSTRY_LABELS[industryId];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-6 font-medium uppercase tracking-wide flex-wrap">
        <Link href={`/${locale}`} className="hover:text-navy-700 transition-colors">MINERBA</Link>
        <span>›</span>
        <Link href={`/${locale}/cases`} className="hover:text-navy-700 transition-colors">
          {locale === 'es' ? 'Casos' : 'Cases'}
        </Link>
        <span>›</span>
        <Link href={`/${locale}/industry/${industryId}`} className="hover:text-navy-700 transition-colors flex items-center gap-1">
          <span>{industryIcon}</span>
          <span>{industryLabel}</span>
        </Link>
        <span>›</span>
        <span className="text-navy-700">{caseItem.company}</span>
      </div>

      <div className="flex gap-8 items-start">
        {/* Main content */}
        <article className="flex-1 min-w-0">
          {/* Case header */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <div className="flex items-start gap-3 mb-3">
              <span className="bg-navy-700 text-white text-sm font-bold px-2.5 py-1 rounded">
                {caseItem.id}
              </span>
              {caseItem.latam_relevant && (
                <span className="bg-gold text-white text-xs font-semibold px-2 py-1 rounded">
                  {locale === 'es' ? 'Relevante LATAM' : 'LATAM Relevant'}
                </span>
              )}
              <PRRatingBadge rating={caseItem.pr_rating} locale={locale} />
            </div>
            <h1 className="text-2xl font-bold text-navy-700 mb-1">{caseItem.title}</h1>
            <p className="text-gray-500 text-sm mb-4">
              {caseItem.company} · {caseItem.country} · {caseItem.year}
            </p>
            <p className="text-gray-600 leading-relaxed">{caseItem.summary}</p>

            {/* Quiz CTA */}
            <div className="mt-5 pt-5 border-t border-gray-100 flex items-center justify-between gap-4">
              <p className="text-sm text-gray-500">{t('simulateCta')}</p>
              <Link
                href={`/${locale}/quiz/${caseItem.id}`}
                className="flex-shrink-0 bg-navy-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-navy-800 transition-colors"
              >
                {t('startSimulation')}
              </Link>
            </div>
          </div>

          {/* Case content */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8">
            <div className="case-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{caseItem.content}</ReactMarkdown>
            </div>
          </div>

          {/* Mobile: Frameworks + Related Cases (shown below content on small screens) */}
          <div className="lg:hidden mt-6 space-y-4">
            {caseItem.frameworks.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-xs font-bold text-navy-700 uppercase tracking-wider mb-3">
                  {locale === 'es' ? 'Marcos Relevantes' : 'Relevant Frameworks'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {caseItem.frameworks.map((fid) => {
                    const fw = getFrameworkById(fid);
                    if (!fw) return null;
                    return (
                      <Link
                        key={fid}
                        href={`/${locale}/frameworks/${fw.id}`}
                        className="flex items-center gap-2 p-2 rounded border border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-base leading-none flex-shrink-0">{fw.icon}</span>
                        <span className="text-xs font-medium text-navy-700 leading-snug">
                          {locale === 'es' ? fw.titleEs : fw.title}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {relatedCases.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-xs font-bold text-navy-700 uppercase tracking-wider mb-3">
                  {t('relatedCases')}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {relatedCases.map((rc) => (
                    <Link
                      key={rc.id}
                      href={`/${locale}/cases/${rc.id}`}
                      className="block p-2.5 rounded border border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-xs font-bold text-navy-700 bg-navy-50 px-1.5 py-0.5 rounded">
                          {rc.id}
                        </span>
                        <PRRatingBadge rating={rc.pr_rating} size="sm" locale={locale} />
                      </div>
                      <p className="text-xs font-medium text-gray-700 leading-snug">{rc.title}</p>
                      <p className="text-xs text-gray-400">{rc.company} · {rc.year}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <Link
              href={`/${locale}/cases`}
              className="block text-center text-sm font-medium text-navy-700 hover:text-navy-800 py-2"
            >
              ← {t('backToCases')}
            </Link>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0 sticky top-24 space-y-4">
          {/* Metadata */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="text-xs font-bold text-navy-700 uppercase tracking-wider mb-4">
              {locale === 'es' ? 'Detalles del Caso' : 'Case Details'}
            </h3>
            <MetaRow label={t('company')} value={caseItem.company} />
            <MetaRow label={t('year')} value={String(caseItem.year)} />
            <MetaRow label={t('country')} value={caseItem.country} />
            <MetaRow
              label={t('region')}
              value={caseItem.region === 'latin-america'
                ? (locale === 'es' ? 'América Latina' : 'Latin America')
                : 'Global'}
            />
            {/* Industry link */}
            <div className="mb-3">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1.5">
                {locale === 'es' ? 'Industria' : 'Industry'}
              </p>
              <Link
                href={`/${locale}/industry/${industryId}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-600 bg-navy-50 border border-navy-200 px-2.5 py-1 rounded hover:bg-navy-100 transition-colors"
              >
                <span>{industryIcon}</span>
                <span>{industryLabel}</span>
                <span className="text-navy-400">→</span>
              </Link>
            </div>
            <div className="mb-3">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1.5">
                {t('prRating')}
              </p>
              <PRRatingBadge rating={caseItem.pr_rating} size="sm" locale={locale} />
            </div>
            <div className="mb-3">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1.5">
                {t('crisisType')}
              </p>
              <div className="flex flex-wrap gap-1">
                {caseItem.crisis_type.map((ct) => (
                  <span key={ct} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                    {crisisLabels[ct] ?? ct}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1.5">
                {t('sector')}
              </p>
              <div className="flex flex-wrap gap-1">
                {caseItem.sector.map((s) => (
                  <span key={s} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                    {sectorLabels[s] ?? s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quiz CTA box */}
          <div className="bg-navy-700 rounded-lg p-4 text-white">
            <p className="text-xs font-bold uppercase tracking-wider text-navy-200 mb-2">
              {t('testKnowledge')}
            </p>
            <p className="text-xs text-navy-300 mb-3 leading-relaxed">
              {locale === 'es'
                ? 'Ponga a prueba sus decisiones en una simulación de crisis en vivo.'
                : 'Test your decision-making in a live crisis simulation.'}
            </p>
            <Link
              href={`/${locale}/quiz/${caseItem.id}`}
              className="block text-center text-xs font-bold bg-white text-navy-700 py-2.5 rounded hover:bg-navy-50 transition-colors"
            >
              {locale === 'es' ? 'Iniciar Simulación →' : 'Start Simulation →'}
            </Link>
          </div>

          {/* Relevant frameworks */}
          {caseItem.frameworks.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-xs font-bold text-navy-700 uppercase tracking-wider mb-3">
                {locale === 'es' ? 'Marcos Relevantes' : 'Relevant Frameworks'}
              </h3>
              <div className="space-y-2">
                {caseItem.frameworks.map((fid) => {
                  const fw = getFrameworkById(fid);
                  if (!fw) return null;
                  return (
                    <Link
                      key={fid}
                      href={`/${locale}/frameworks/${fw.id}`}
                      className="block p-2 rounded border border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-sm leading-none">{fw.icon}</span>
                        <span className="text-xs font-semibold text-navy-700 leading-snug">
                          {locale === 'es' ? fw.titleEs : fw.title}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 leading-snug">
                        {locale === 'es' ? fw.whenEs : fw.when}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Key Concepts (Glossary) */}
          {relatedTerms.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-xs font-bold text-navy-700 uppercase tracking-wider mb-3">
                {isEs ? 'Conceptos Clave' : 'Key Concepts'}
              </h3>
              <div className="space-y-1.5">
                {relatedTerms.map((term) => {
                  const catMeta = CATEGORY_META[term.category];
                  return (
                    <Link
                      key={term.id}
                      href={`/${locale}/glossary#${term.id}`}
                      className="flex items-center gap-2 px-2.5 py-2 rounded border border-gray-100 hover:bg-gray-50 hover:border-navy-200 transition-colors"
                    >
                      <span className="text-sm flex-shrink-0">{catMeta.icon}</span>
                      <span className="text-xs font-medium text-navy-700 leading-snug">
                        {isEs ? term.termEs : term.term}
                      </span>
                    </Link>
                  );
                })}
              </div>
              <Link
                href={`/${locale}/glossary`}
                className="block text-xs text-gray-400 hover:text-navy-600 mt-2 text-right transition-colors"
              >
                {isEs ? 'Ver glosario completo →' : 'Full glossary →'}
              </Link>
            </div>
          )}

          {/* Related cases */}
          {relatedCases.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-xs font-bold text-navy-700 uppercase tracking-wider mb-3">
                {t('relatedCases')}
              </h3>
              <div className="space-y-3">
                {relatedCases.map((rc) => (
                  <Link
                    key={rc.id}
                    href={`/${locale}/cases/${rc.id}`}
                    className="block p-2.5 rounded border border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-xs font-bold text-navy-700 bg-navy-50 px-1.5 py-0.5 rounded">
                        {rc.id}
                      </span>
                      <PRRatingBadge rating={rc.pr_rating} size="sm" locale={locale} />
                    </div>
                    <p className="text-xs font-medium text-gray-700 leading-snug">{rc.title}</p>
                    <p className="text-xs text-gray-400">{rc.company} · {rc.year}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Learning paths that include this case */}
          {caseInPaths.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-xs font-bold text-navy-700 uppercase tracking-wider mb-3">
                🎓 {isEs ? 'Rutas de Aprendizaje' : 'Learning Paths'}
              </h3>
              <p className="text-xs text-gray-400 mb-2">
                {isEs ? 'Este caso aparece en:' : 'This case appears in:'}
              </p>
              <div className="space-y-2">
                {caseInPaths.map((lp) => (
                  <Link
                    key={lp.id}
                    href={`/${locale}/learning/${lp.id}`}
                    className="flex items-center gap-2 p-2 rounded border border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-base flex-shrink-0">{lp.icon}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-navy-700 leading-snug truncate">
                        {isEs ? lp.titleEs : lp.title}
                      </p>
                      <p className="text-xs text-gray-400">
                        {lp.caseIds.length} {isEs ? 'casos' : 'cases'} · {lp.estimatedHours}h
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <Link
            href={`/${locale}/cases`}
            className="block text-center text-sm font-medium text-navy-700 hover:text-navy-800 py-2"
          >
            ← {t('backToCases')}
          </Link>
        </aside>
      </div>

      {/* Continue in learning path */}
      {pathContinuations.length > 0 && (
        <div className="mt-8 bg-navy-700 rounded-2xl p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-navy-300 mb-4">
            🎓 {isEs ? 'Continuar en la Ruta de Aprendizaje' : 'Continue in Learning Path'}
          </p>
          <div className={`grid gap-4 ${pathContinuations.length > 1 ? 'sm:grid-cols-2' : ''}`}>
            {pathContinuations.map(({ path, position, total, nextCase, isLastInPath }) => (
              <div key={path.id} className="bg-navy-600/60 rounded-xl p-4 border border-navy-500">
                {/* Path header */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl flex-shrink-0">{path.icon}</span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white leading-snug truncate">
                      {isEs ? path.titleEs : path.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <p className="text-xs text-navy-300">
                        {isEs ? `Paso ${position} de ${total}` : `Step ${position} of ${total}`}
                      </p>
                      {/* Progress dots */}
                      <div className="flex gap-0.5">
                        {Array.from({ length: total }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full ${
                              i < position ? 'bg-gold' : 'bg-navy-400'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {isLastInPath ? (
                  <div className="bg-green-900/40 border border-green-600/30 rounded-lg p-3">
                    <p className="text-sm font-semibold text-green-300 mb-1">
                      {isEs ? '✓ Completaste esta ruta' : '✓ Path complete'}
                    </p>
                    <p className="text-xs text-navy-300 mb-2">
                      {isEs
                        ? 'Has leído el último caso de esta ruta.'
                        : "You've reached the final case in this path."}
                    </p>
                    <Link
                      href={`/${locale}/learning/${path.id}`}
                      className="text-xs font-semibold text-green-300 hover:text-green-100 transition-colors"
                    >
                      {isEs ? '→ Ver resumen de la ruta' : '→ View path summary'}
                    </Link>
                  </div>
                ) : nextCase ? (
                  <Link
                    href={`/${locale}/cases/${nextCase.id}`}
                    className="group flex items-center justify-between gap-3 bg-navy-500 hover:bg-navy-400 rounded-lg p-3 transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="text-[10px] text-navy-300 font-semibold uppercase tracking-wide mb-0.5">
                        {isEs ? `Siguiente → Paso ${position + 1}` : `Up next → Step ${position + 1}`}
                      </p>
                      <p className="text-sm font-bold text-white leading-snug line-clamp-2">
                        {nextCase.title}
                      </p>
                      <p className="text-xs text-navy-300 mt-0.5">
                        {nextCase.company} · {nextCase.year}
                      </p>
                    </div>
                    <div className="flex flex-col items-center gap-1 flex-shrink-0">
                      <span className="text-xs font-black text-white bg-navy-700 px-2 py-1 rounded">
                        {nextCase.id}
                      </span>
                      <span className="text-navy-300 group-hover:text-white transition-colors text-lg">→</span>
                    </div>
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Prev / Next navigation */}
      {(prevCase || nextCase) && (
        <div className="mt-10 pt-6 border-t border-gray-200 grid grid-cols-2 gap-4">
          <div>
            {prevCase && (
              <Link
                href={`/${locale}/cases/${prevCase.id}`}
                className="group flex items-start gap-3 p-4 rounded-lg border border-gray-200 bg-white hover:border-navy-300 hover:shadow-sm transition-all"
              >
                <span className="text-gray-400 group-hover:text-navy-500 transition-colors mt-0.5 shrink-0">←</span>
                <div className="min-w-0">
                  <p className="text-xs text-gray-400 mb-0.5 uppercase tracking-wide font-medium">
                    {isEs ? 'Caso anterior' : 'Previous case'}
                  </p>
                  <p className="text-sm font-semibold text-navy-700 group-hover:text-navy-500 leading-snug truncate transition-colors">
                    {prevCase.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{prevCase.company} · {prevCase.year}</p>
                </div>
              </Link>
            )}
          </div>
          <div className="flex justify-end">
            {nextCase && (
              <Link
                href={`/${locale}/cases/${nextCase.id}`}
                className="group flex items-start gap-3 p-4 rounded-lg border border-gray-200 bg-white hover:border-navy-300 hover:shadow-sm transition-all text-right w-full"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-400 mb-0.5 uppercase tracking-wide font-medium">
                    {isEs ? 'Siguiente caso' : 'Next case'}
                  </p>
                  <p className="text-sm font-semibold text-navy-700 group-hover:text-navy-500 leading-snug truncate transition-colors">
                    {nextCase.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{nextCase.company} · {nextCase.year}</p>
                </div>
                <span className="text-gray-400 group-hover:text-navy-500 transition-colors mt-0.5 shrink-0">→</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-3">
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{label}</p>
      <p className="text-xs text-gray-700 mt-0.5 font-medium">{value}</p>
    </div>
  );
}
