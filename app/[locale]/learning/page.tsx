import type { Metadata } from 'next';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { LEARNING_PATHS, DIFFICULTY_COLORS, LATAM_RELEVANCE_COLORS } from '@/lib/learning-paths';
import { getCaseById } from '@/lib/cases';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: locale === 'es'
      ? 'Rutas de Aprendizaje — MINERBA Crisis Communications'
      : 'Learning Paths — MINERBA Crisis Communications',
    description: locale === 'es'
      ? `${LEARNING_PATHS.length} rutas de aprendizaje curadas — secuencias estructuradas de casos para formación deliberada en comunicaciones de crisis.`
      : `${LEARNING_PATHS.length} curated learning paths — structured case sequences for deliberate crisis communications training.`,
  };
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }];
}

export default async function LearningPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const isEs = locale === 'es';

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <div className="bg-navy-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-navy-300 uppercase tracking-widest mb-3 block">
              {isEs ? 'Formación Estructurada' : 'Structured Training'}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
              {isEs ? 'Rutas de Aprendizaje MINERBA' : 'MINERBA Learning Paths'}
            </h1>
            <p className="text-navy-200 text-base leading-relaxed max-w-2xl mb-6">
              {isEs
                ? 'Secuencias de casos curadas para formación deliberada. Cada ruta está diseñada alrededor de un tipo de compromiso específico de Minerba — para que aprenda no solo los casos, sino cómo aplicarlos.'
                : 'Curated case sequences for deliberate practice. Each path is designed around a specific Minerba engagement type — so you learn not just the cases, but how to apply them.'}
            </p>

            {/* Path stats */}
            <div className="flex flex-wrap gap-6">
              <StatItem value={LEARNING_PATHS.length} label={isEs ? 'Rutas' : 'Paths'} />
              <div className="hidden md:block h-8 w-px bg-navy-500" />
              <StatItem
                value={LEARNING_PATHS.reduce((sum, p) => sum + p.caseIds.length, 0)}
                label={isEs ? 'Casos en total' : 'Total cases'}
              />
              <div className="hidden md:block h-8 w-px bg-navy-500" />
              <StatItem
                value={Math.round(LEARNING_PATHS.reduce((sum, p) => sum + p.estimatedHours, 0))}
                label={isEs ? 'Horas de estudio' : 'Hours of study'}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── How to use ────────────────────────────────────────────────────────── */}
      <div className="bg-amber-50 border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-bold">
              {isEs ? '💡 Cómo usar las rutas: ' : '💡 How to use learning paths: '}
            </span>
            {isEs
              ? 'Cada ruta incluye casos en secuencia deliberada. Léalos en orden, luego simule el caso final para consolidar su comprensión. Los resultados de aprendizaje describen exactamente qué podrá hacer cuando termine.'
              : 'Each path sequences cases in deliberate order. Read them in order, then simulate the final case to consolidate understanding. The learning outcomes describe exactly what you will be able to do when you finish.'}
          </p>
        </div>
      </div>

      {/* ── Path cards ────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Difficulty filter legend */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            {isEs ? 'Niveles:' : 'Levels:'}
          </span>
          {(['Foundational', 'Intermediate', 'Advanced'] as const).map((d) => {
            const labelEs = d === 'Foundational' ? 'Fundacional' : d === 'Intermediate' ? 'Intermedio' : 'Avanzado';
            return (
              <span key={d} className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${DIFFICULTY_COLORS[d]}`}>
                {isEs ? labelEs : d}
              </span>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {LEARNING_PATHS.map((path) => {
            const firstFewCases = path.caseIds.slice(0, 4).map((id) => getCaseById(id)).filter(Boolean);
            const difficultyLabel = isEs
              ? (path.difficulty === 'Foundational' ? 'Fundacional' : path.difficulty === 'Intermediate' ? 'Intermedio' : 'Avanzado')
              : path.difficulty;

            return (
              <div
                key={path.id}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-navy-300 transition-all"
              >
                {/* Card header */}
                <div className="bg-navy-700 px-6 py-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{path.icon}</span>
                      <div>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${DIFFICULTY_COLORS[path.difficulty]}`}>
                          {difficultyLabel}
                        </span>
                      </div>
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border shrink-0 ${LATAM_RELEVANCE_COLORS[path.latamRelevance]}`}>
                      🌎 LATAM {isEs ? path.latamRelevanceEs : path.latamRelevance}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-white leading-snug mb-1">
                    {isEs ? path.titleEs : path.title}
                  </h2>
                  <p className="text-navy-300 text-xs">{isEs ? path.taglineEs : path.tagline}</p>
                </div>

                {/* Card body */}
                <div className="p-6">
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">
                    {isEs ? path.descriptionEs : path.description}
                  </p>

                  {/* Objective */}
                  <div className="bg-navy-50 border border-navy-200 rounded-lg p-3.5 mb-5">
                    <p className="text-xs font-bold text-navy-600 uppercase tracking-widest mb-1.5">
                      {isEs ? path.objectiveLabelEs : path.objectiveLabel}
                    </p>
                    <p className="text-xs text-navy-700 leading-relaxed">
                      {isEs ? path.objectiveEs : path.objective}
                    </p>
                  </div>

                  {/* Case preview strip */}
                  <div className="mb-5">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                      {isEs ? `${path.caseIds.length} Casos en Secuencia` : `${path.caseIds.length} Cases in Sequence`}
                    </p>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {path.caseIds.map((caseId, idx) => {
                        const c = getCaseById(caseId);
                        const ratingColors: Record<string, string> = {
                          failed: 'bg-red-100 text-red-700 border-red-200',
                          mixed: 'bg-amber-100 text-amber-700 border-amber-200',
                          effective: 'bg-green-100 text-green-700 border-green-200',
                        };
                        return (
                          <div key={caseId} className="flex items-center gap-1">
                            {idx > 0 && <span className="text-gray-300 text-xs">→</span>}
                            <span
                              className={`text-xs font-bold px-1.5 py-0.5 rounded border ${
                                c ? ratingColors[c.pr_rating] : 'bg-gray-100 text-gray-600 border-gray-200'
                              }`}
                              title={c?.title}
                            >
                              {caseId}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      <span className="inline-flex items-center gap-1 mr-3">
                        <span className="w-2 h-2 rounded-full bg-red-400" />
                        {isEs ? 'Fallido' : 'Failed'}
                      </span>
                      <span className="inline-flex items-center gap-1 mr-3">
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        {isEs ? 'Mixto' : 'Mixed'}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        {isEs ? 'Efectivo' : 'Effective'}
                      </span>
                    </p>
                  </div>

                  {/* Consulting scenario teaser */}
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3.5 mb-5">
                    <p className="text-xs font-bold text-amber-700 uppercase tracking-widest mb-1">
                      {isEs ? '🎯 Escenario de Consultoría' : '🎯 Consulting Scenario'}
                    </p>
                    <p className="text-xs text-amber-800 leading-relaxed line-clamp-3">
                      {isEs ? path.consultingScenarioEs : path.consultingScenario}
                    </p>
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/${locale}/learning/${path.id}`}
                    className="block w-full text-center bg-navy-700 text-white text-sm font-bold py-3 rounded-xl hover:bg-navy-800 transition-colors"
                  >
                    {isEs ? `Iniciar ruta — ${path.estimatedHours} hrs →` : `Start path — ${path.estimatedHours} hrs →`}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Bottom CTA ───────────────────────────────────────────────────────── */}
        <div className="mt-14 bg-navy-700 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-2">
            {isEs ? '¿Prefiere explorar por su cuenta?' : 'Prefer to explore on your own?'}
          </h2>
          <p className="text-navy-300 text-sm mb-6 max-w-xl mx-auto">
            {isEs
              ? 'Filtre los 38 casos por industria, tipo de crisis o calificación PR — o simule cualquier caso directamente.'
              : 'Filter all 38 cases by industry, crisis type, or PR rating — or simulate any case directly.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href={`/${locale}/cases`}
              className="inline-flex items-center gap-2 bg-white text-navy-700 font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-navy-50 transition-colors"
            >
              {isEs ? '📂 Explorar 38 casos →' : '📂 Browse 38 cases →'}
            </Link>
            <Link
              href={`/${locale}/assessment`}
              className="inline-flex items-center gap-2 bg-gold text-white font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-amber-500 transition-colors"
            >
              {isEs ? '⚡ Tomar diagnóstico →' : '⚡ Take assessment →'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatItem({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <div className="text-3xl font-black text-white">{value}</div>
      <div className="text-navy-300 text-xs mt-0.5">{label}</div>
    </div>
  );
}
