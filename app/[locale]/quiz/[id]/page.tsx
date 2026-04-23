import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getCaseById, getAllCases, CRISIS_TYPE_LABELS, CRISIS_TYPE_LABELS_ES } from '@/lib/cases';
import { quizScenarios } from '@/lib/quiz-prompts';
import { getFrameworkById } from '@/lib/frameworks';
import PRRatingBadge from '@/components/PRRatingBadge';
import QuizSimulationPanel from '@/components/QuizSimulationPanel';

export async function generateMetadata({
  params: { locale, id },
}: {
  params: { locale: string; id: string };
}): Promise<Metadata> {
  const c = getCaseById(id);
  if (!c) return {};
  return {
    title: locale === 'es'
      ? `Simulación: ${c.company}`
      : `Simulation: ${c.company}`,
    description: locale === 'es'
      ? `Simulación de crisis de comunicaciones: ${c.title}`
      : `Crisis communications simulation: ${c.title}`,
  };
}

export async function generateStaticParams() {
  const cases = getAllCases();
  const locales = ['en', 'es'];
  return locales.flatMap((locale) =>
    cases.map((c) => ({ locale, id: c.id }))
  );
}

export default async function QuizPage({
  params: { locale, id },
}: {
  params: { locale: string; id: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('quiz');
  const caseItem = getCaseById(id);

  if (!caseItem) notFound();

  const scenario = quizScenarios[id];
  if (!scenario) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Back link */}
      <Link
        href={`/${locale}/cases/${caseItem.id}`}
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-navy-700 mb-4 transition-colors"
      >
        ← {t('backToCase')}
      </Link>

      {/* Page heading */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-navy-700 mb-1">{t('title')}</h1>
          <p className="text-sm text-gray-500">{t('instructions')}</p>
        </div>
      </div>

      {/* Mobile context strip (hidden on desktop) */}
      <div className="lg:hidden mb-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="bg-navy-700 text-white text-xs font-bold px-2 py-0.5 rounded">{caseItem.id}</span>
              <PRRatingBadge rating={caseItem.pr_rating} size="sm" locale={locale} />
            </div>
            <p className="text-xs font-semibold text-navy-700 leading-snug">{caseItem.title}</p>
            <p className="text-xs text-gray-500 mt-0.5">{caseItem.company} · {caseItem.year}</p>
          </div>
        </div>
        <p className="text-xs text-amber-800 mt-2 leading-relaxed border-t border-amber-200 pt-2">
          {scenario.contextSummary}
        </p>
      </div>

      {/* Two-panel layout */}
      <div
        className="flex gap-5 items-start"
        style={{ height: 'calc(100vh - 280px)', minHeight: '520px' }}
      >
        {/* Left: Case context panel */}
        <div className="hidden lg:flex flex-col w-72 shrink-0 gap-4">
          {/* Case metadata */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-navy-500 px-4 py-3">
              <p className="text-xs font-bold text-navy-200 uppercase tracking-wider">
                {t('caseContext')}
              </p>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-navy-700 text-white text-xs font-bold px-2 py-0.5 rounded">
                  {caseItem.id}
                </span>
                {caseItem.latam_relevant && (
                  <span className="bg-gold text-white text-xs font-semibold px-2 py-0.5 rounded">
                    LATAM
                  </span>
                )}
              </div>
              <h3 className="text-sm font-bold text-navy-700 leading-snug mb-1">
                {caseItem.title}
              </h3>
              <p className="text-xs text-gray-500 mb-3">
                {caseItem.company} · {caseItem.year}
              </p>
              <PRRatingBadge rating={caseItem.pr_rating} size="sm" locale={locale} />

              <div className="mt-3 flex flex-wrap gap-1">
                {caseItem.crisis_type.slice(0, 2).map((ct) => (
                  <span
                    key={ct}
                    className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded"
                  >
                    {(locale === 'es' ? CRISIS_TYPE_LABELS_ES : CRISIS_TYPE_LABELS)[ct] ?? ct}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Context summary */}
          <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
            <p className="text-xs font-bold text-amber-800 uppercase tracking-wide mb-2">
              {locale === 'es' ? 'Contexto del Escenario' : 'Scenario Brief'}
            </p>
            <p className="text-xs text-amber-900 leading-relaxed">{scenario.contextSummary}</p>
          </div>

          {/* Frameworks hint */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
              {locale === 'es' ? 'Marcos Relevantes' : 'Relevant Frameworks'}
            </p>
            <div className="space-y-1.5">
              {scenario.frameworks.map((f) => {
                const fw = getFrameworkById(f);
                const label = fw
                  ? (locale === 'es' ? fw.titleEs : fw.title)
                  : f;
                return (
                  <div key={f} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0 mt-1" />
                    <Link
                      href={fw ? `/${locale}/frameworks/${fw.id}` : `/${locale}/frameworks`}
                      className="text-xs text-gray-600 hover:text-navy-700 hover:underline leading-snug"
                    >
                      {label}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Simulation panel (persona selector → chat) */}
        <div className="flex-1 bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col" style={{ height: '100%' }}>
          <QuizSimulationPanel
            caseId={caseItem.id}
            caseTitle={caseItem.title}
            defaultOpener={scenario.opener}
            locale={locale}
          />
        </div>
      </div>
    </div>
  );
}
