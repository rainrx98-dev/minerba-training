import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import {
  LEARNING_PATHS,
  getLearningPathById,
  DIFFICULTY_COLORS,
  LATAM_RELEVANCE_COLORS,
} from '@/lib/learning-paths';
import { getCaseById, getAllCases } from '@/lib/cases';
import { getFrameworkById } from '@/lib/frameworks';
import PRRatingBadge from '@/components/PRRatingBadge';

export async function generateMetadata({
  params: { locale, id },
}: {
  params: { locale: string; id: string };
}): Promise<Metadata> {
  const path = getLearningPathById(id);
  if (!path) return {};
  return {
    title: locale === 'es'
      ? `${path.titleEs} — MINERBA Learning Path`
      : `${path.title} — MINERBA Learning Path`,
    description: locale === 'es' ? path.descriptionEs.slice(0, 160) : path.description.slice(0, 160),
  };
}

export async function generateStaticParams() {
  return LEARNING_PATHS.flatMap((p) => [
    { locale: 'en', id: p.id },
    { locale: 'es', id: p.id },
  ]);
}

export default async function LearningPathDetailPage({
  params: { locale, id },
}: {
  params: { locale: string; id: string };
}) {
  setRequestLocale(locale);
  const path = getLearningPathById(id);
  if (!path) notFound();

  const isEs = locale === 'es';

  // Resolve all cases in order
  const cases = path.caseIds.map((cid) => getCaseById(cid)).filter(Boolean);

  // Sibling paths for navigation
  const currentIdx = LEARNING_PATHS.findIndex((p) => p.id === id);
  const prevPath = currentIdx > 0 ? LEARNING_PATHS[currentIdx - 1] : null;
  const nextPath = currentIdx < LEARNING_PATHS.length - 1 ? LEARNING_PATHS[currentIdx + 1] : null;

  // Key frameworks
  const frameworks = path.keyFrameworks.map((fid) => getFrameworkById(fid)).filter(Boolean);

  const difficultyLabel = isEs
    ? (path.difficulty === 'Foundational' ? 'Fundacional' : path.difficulty === 'Intermediate' ? 'Intermedio' : 'Avanzado')
    : path.difficulty;

  const PR_COLORS: Record<string, string> = {
    failed: 'border-l-red-500 bg-red-50/30',
    mixed: 'border-l-amber-500 bg-amber-50/30',
    effective: 'border-l-green-500 bg-green-50/30',
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <div className="bg-navy-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-navy-400 mb-5 font-medium uppercase tracking-wide flex-wrap">
            <Link href={`/${locale}`} className="hover:text-navy-200 transition-colors">MINERBA</Link>
            <span>›</span>
            <Link href={`/${locale}/learning`} className="hover:text-navy-200 transition-colors">
              {isEs ? 'Rutas de Aprendizaje' : 'Learning Paths'}
            </Link>
            <span>›</span>
            <span className="text-navy-200">{isEs ? path.titleEs : path.title}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{path.icon}</span>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${DIFFICULTY_COLORS[path.difficulty]}`}>
                    {difficultyLabel}
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${LATAM_RELEVANCE_COLORS[path.latamRelevance]}`}>
                    🌎 LATAM {isEs ? path.latamRelevanceEs : path.latamRelevance}
                  </span>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-white leading-tight mb-2">
                {isEs ? path.titleEs : path.title}
              </h1>
              <p className="text-navy-300 text-sm">{isEs ? path.taglineEs : path.tagline}</p>
            </div>

            {/* Quick stats */}
            <div className="shrink-0 bg-navy-600 border border-navy-500 rounded-xl px-5 py-4">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-black text-white">{path.caseIds.length}</div>
                  <div className="text-xs text-navy-400 mt-0.5">{isEs ? 'Casos' : 'Cases'}</div>
                </div>
                <div className="h-8 w-px bg-navy-500" />
                <div className="text-center">
                  <div className="text-2xl font-black text-white">{path.estimatedHours}</div>
                  <div className="text-xs text-navy-400 mt-0.5">{isEs ? 'Horas' : 'Hours'}</div>
                </div>
                <div className="h-8 w-px bg-navy-500" />
                <div className="text-center">
                  <div className="text-2xl font-black text-white">{path.outcomes.length}</div>
                  <div className="text-xs text-navy-400 mt-0.5">{isEs ? 'Resultados' : 'Outcomes'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* ── Main content ──────────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0 space-y-8">

            {/* Description */}
            <section className="bg-white border border-gray-200 rounded-2xl p-7 shadow-sm">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
                {isEs ? 'Sobre Esta Ruta' : 'About This Path'}
              </h2>
              <p className="text-gray-700 leading-relaxed text-base">
                {isEs ? path.descriptionEs : path.description}
              </p>

              {/* Objective */}
              <div className="mt-5 bg-navy-50 border border-navy-200 rounded-xl p-4">
                <p className="text-xs font-bold text-navy-600 uppercase tracking-widest mb-2">
                  {isEs ? path.objectiveLabelEs : path.objectiveLabel}
                </p>
                <p className="text-sm text-navy-700 leading-relaxed font-medium">
                  {isEs ? path.objectiveEs : path.objective}
                </p>
              </div>
            </section>

            {/* Consulting Scenario */}
            <section className="bg-amber-50 border border-amber-200 rounded-2xl p-7">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <h2 className="text-sm font-bold text-amber-800 uppercase tracking-widest mb-1">
                    {isEs ? 'Escenario de Consultoría MINERBA' : 'MINERBA Consulting Scenario'}
                  </h2>
                  <p className="text-xs text-amber-700">
                    {isEs
                      ? 'Este es el tipo de compromiso real para el que te prepara esta ruta.'
                      : 'This is the type of real engagement this path prepares you for.'}
                  </p>
                </div>
              </div>
              <p className="text-sm text-amber-900 leading-relaxed font-medium">
                {isEs ? path.consultingScenarioEs : path.consultingScenario}
              </p>
            </section>

            {/* Case sequence */}
            <section>
              <div className="mb-5">
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">
                  {isEs ? 'Secuencia de Casos' : 'Case Sequence'}
                </h2>
                <p className="text-xs text-gray-400">
                  {isEs
                    ? 'Lea los casos en este orden para construir la comprensión de forma progresiva.'
                    : 'Read cases in this order to build understanding progressively.'}
                </p>
              </div>

              <div className="space-y-3">
                {cases.map((caseItem, idx) => {
                  if (!caseItem) return null;
                  return (
                    <div
                      key={caseItem.id}
                      className={`bg-white border border-l-4 border-gray-200 rounded-xl p-5 shadow-sm ${PR_COLORS[caseItem.pr_rating]}`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Step number */}
                        <div className="shrink-0 w-8 h-8 rounded-full bg-navy-700 text-white flex items-center justify-center text-xs font-black">
                          {idx + 1}
                        </div>

                        {/* Case content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className="text-xs font-bold text-navy-700 bg-navy-50 border border-navy-200 px-1.5 py-0.5 rounded">
                              {caseItem.id}
                            </span>
                            <PRRatingBadge rating={caseItem.pr_rating} size="sm" locale={locale} />
                            {caseItem.latam_relevant && (
                              <span className="text-xs font-semibold bg-gold text-white px-1.5 py-0.5 rounded">
                                LATAM
                              </span>
                            )}
                          </div>
                          <h3 className="font-bold text-navy-700 text-base mb-0.5 leading-snug">
                            {caseItem.title}
                          </h3>
                          <p className="text-xs text-gray-400 mb-2">
                            {caseItem.company} · {caseItem.country} · {caseItem.year}
                          </p>
                          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                            {caseItem.summary}
                          </p>

                          {/* Action buttons */}
                          <div className="flex gap-2 mt-3">
                            <Link
                              href={`/${locale}/cases/${caseItem.id}`}
                              className="text-xs font-semibold bg-navy-700 text-white px-3 py-1.5 rounded-lg hover:bg-navy-800 transition-colors"
                            >
                              {isEs ? 'Leer caso →' : 'Read case →'}
                            </Link>
                            <Link
                              href={`/${locale}/quiz/${caseItem.id}`}
                              className="text-xs font-semibold border border-navy-300 text-navy-600 px-3 py-1.5 rounded-lg hover:bg-navy-50 transition-colors"
                            >
                              {isEs ? 'Simular' : 'Simulate'}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Final simulation CTA */}
              {cases.length > 0 && cases[cases.length - 1] && (
                <div className="mt-5 bg-navy-700 rounded-xl p-5 text-white text-center">
                  <p className="text-sm font-bold mb-1">
                    {isEs ? '¿Listo para poner a prueba esta ruta?' : 'Ready to test this path?'}
                  </p>
                  <p className="text-navy-300 text-xs mb-4">
                    {isEs
                      ? 'Después de leer todos los casos, simule el último para consolidar su comprensión.'
                      : 'After reading all the cases, simulate the final one to consolidate your understanding.'}
                  </p>
                  <Link
                    href={`/${locale}/quiz/${cases[cases.length - 1]!.id}`}
                    className="inline-flex items-center gap-2 bg-white text-navy-700 font-bold text-sm px-6 py-2.5 rounded-lg hover:bg-navy-50 transition-colors"
                  >
                    {isEs
                      ? `Simular caso final: ${cases[cases.length - 1]!.id} →`
                      : `Simulate final case: ${cases[cases.length - 1]!.id} →`}
                  </Link>
                </div>
              )}
            </section>

            {/* Learning Outcomes */}
            <section className="bg-white border border-gray-200 rounded-2xl p-7 shadow-sm">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-5">
                {isEs ? 'Resultados de Aprendizaje' : 'Learning Outcomes'}
              </h2>
              <p className="text-xs text-gray-400 mb-4">
                {isEs
                  ? 'Después de completar esta ruta, usted podrá:'
                  : 'After completing this path, you will be able to:'}
              </p>
              <div className="space-y-3">
                {(isEs ? path.outcomesEs : path.outcomes).map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-green-600 font-black text-sm shrink-0 mt-0.5">✓</span>
                    <p className="text-sm text-gray-700 leading-relaxed">{outcome}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* ── Sidebar ───────────────────────────────────────────────────────── */}
          <aside className="w-full lg:w-64 shrink-0 space-y-4 lg:sticky lg:top-24">

            {/* Path meta */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <h3 className="text-xs font-bold text-navy-700 uppercase tracking-wider mb-4">
                {isEs ? 'Detalles de la Ruta' : 'Path Details'}
              </h3>
              <SidebarRow label={isEs ? 'Nivel' : 'Level'} value={difficultyLabel} />
              <SidebarRow
                label={isEs ? 'Industria' : 'Industry Focus'}
                value={isEs ? path.industryFocusEs : path.industryFocus}
              />
              <SidebarRow
                label={isEs ? 'Tiempo estimado' : 'Estimated Time'}
                value={`${path.estimatedHours} ${isEs ? 'horas' : 'hours'}`}
              />
              <SidebarRow
                label={isEs ? 'Casos' : 'Cases'}
                value={String(path.caseIds.length)}
              />
              <SidebarRow
                label={isEs ? 'Relevancia LATAM' : 'LATAM Relevance'}
                value={isEs ? path.latamRelevanceEs : path.latamRelevance}
              />
            </div>

            {/* Relevant frameworks */}
            {frameworks.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <h3 className="text-xs font-bold text-navy-700 uppercase tracking-wider mb-3">
                  {isEs ? 'Marcos Relevantes' : 'Relevant Frameworks'}
                </h3>
                <div className="space-y-2">
                  {frameworks.map((fw) => {
                    if (!fw) return null;
                    return (
                      <Link
                        key={fw.id}
                        href={`/${locale}/frameworks/${fw.id}`}
                        className="flex items-center gap-2 p-2 rounded border border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-base leading-none shrink-0">{fw.icon}</span>
                        <div>
                          <p className="text-xs font-semibold text-navy-700 leading-snug">
                            {isEs ? fw.titleEs : fw.title}
                          </p>
                          <p className="text-xs text-gray-400 leading-snug">
                            {isEs ? fw.whenEs : fw.when}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Assessment CTA */}
            <div className="bg-gold rounded-xl p-4 text-white">
              <p className="text-xs font-bold uppercase tracking-wide mb-1 text-white/80">
                {isEs ? '¿Cómo está su preparación?' : 'How prepared are you?'}
              </p>
              <p className="text-xs text-white/80 leading-relaxed mb-3">
                {isEs
                  ? 'Tome el diagnóstico de 4 minutos y reciba una puntuación de 0–100 personalizada.'
                  : 'Take the 4-minute assessment and receive a personalised 0–100 score.'}
              </p>
              <Link
                href={`/${locale}/assessment`}
                className="block text-center text-xs font-bold bg-white text-gold rounded-lg px-3 py-2 hover:bg-amber-50 transition-colors"
              >
                {isEs ? '⚡ Iniciar diagnóstico →' : '⚡ Take assessment →'}
              </Link>
            </div>

            {/* All paths */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <h3 className="text-xs font-bold text-navy-700 uppercase tracking-wider mb-3">
                {isEs ? 'Todas las Rutas' : 'All Paths'}
              </h3>
              <div className="space-y-2">
                {LEARNING_PATHS.map((p) => (
                  <Link
                    key={p.id}
                    href={`/${locale}/learning/${p.id}`}
                    className={`flex items-center gap-2 p-2 rounded border transition-colors ${
                      p.id === id
                        ? 'border-navy-300 bg-navy-50'
                        : 'border-gray-100 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-sm shrink-0">{p.icon}</span>
                    <span className={`text-xs leading-snug ${p.id === id ? 'font-bold text-navy-700' : 'text-gray-600'}`}>
                      {isEs ? p.titleEs : p.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* ── Prev / Next Path Navigation ───────────────────────────────────── */}
        {(prevPath || nextPath) && (
          <div className="mt-10 pt-6 border-t border-gray-200 grid grid-cols-2 gap-4">
            <div>
              {prevPath && (
                <Link
                  href={`/${locale}/learning/${prevPath.id}`}
                  className="group flex items-start gap-3 p-4 rounded-xl border border-gray-200 bg-white hover:border-navy-300 hover:shadow-sm transition-all"
                >
                  <span className="text-gray-400 group-hover:text-navy-500 transition-colors mt-0.5 shrink-0">←</span>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-400 mb-0.5 uppercase tracking-wide font-medium">
                      {isEs ? 'Ruta anterior' : 'Previous path'}
                    </p>
                    <p className="text-sm font-semibold text-navy-700 group-hover:text-navy-500 leading-snug truncate transition-colors">
                      {isEs ? prevPath.titleEs : prevPath.title}
                    </p>
                  </div>
                </Link>
              )}
            </div>
            <div className="flex justify-end">
              {nextPath && (
                <Link
                  href={`/${locale}/learning/${nextPath.id}`}
                  className="group flex items-start gap-3 p-4 rounded-xl border border-gray-200 bg-white hover:border-navy-300 hover:shadow-sm transition-all text-right w-full"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-400 mb-0.5 uppercase tracking-wide font-medium">
                      {isEs ? 'Siguiente ruta' : 'Next path'}
                    </p>
                    <p className="text-sm font-semibold text-navy-700 group-hover:text-navy-500 leading-snug truncate transition-colors">
                      {isEs ? nextPath.titleEs : nextPath.title}
                    </p>
                  </div>
                  <span className="text-gray-400 group-hover:text-navy-500 transition-colors mt-0.5 shrink-0">→</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SidebarRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-3">
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{label}</p>
      <p className="text-xs text-gray-700 mt-0.5 font-semibold">{value}</p>
    </div>
  );
}
