import Link from 'next/link';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getFeaturedCases, getAllCases } from '@/lib/cases';
import CaseCard from '@/components/CaseCard';
import { PERSONAS } from '@/lib/personas';
import { LEARNING_PATHS } from '@/lib/learning-paths';
import type { Industry } from '@/lib/case-types';

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('home');
  const tf = await getTranslations('cases');
  const featuredCases = getFeaturedCases();
  const allCases = getAllCases();

  const crisisTypes = new Set(allCases.flatMap((c) => c.crisis_type)).size;
  const regions = new Set(allCases.map((c) => c.region)).size;
  const industries = new Set(allCases.map((c) => c.industry).filter(Boolean)) as Set<Industry>;

  const INDUSTRY_DATA: Array<{ id: Industry; icon: string; label: string; labelEs: string; desc: string; descEs: string; count: number }> = [
    {
      id: 'energy',
      icon: '⛽',
      label: 'Energy & Oil',
      labelEs: 'Energía y Petróleo',
      desc: 'Oil spills, fraud, corruption, and social license failures across upstream and midstream energy sectors.',
      descEs: 'Derrames de petróleo, fraude, corrupción y pérdida de licencia social en el sector energético.',
      count: allCases.filter((c) => c.industry === 'energy' || !c.industry).length,
    },
    {
      id: 'mining',
      icon: '⛏',
      label: 'Mining',
      labelEs: 'Minería',
      desc: 'Tailings dam collapses, cyanide spills, indigenous rights violations, and community health crises.',
      descEs: 'Colapsos de represas, derrames de cianuro, violaciones a derechos indígenas y crisis de salud comunitaria.',
      count: allCases.filter((c) => c.industry === 'mining').length,
    },
    {
      id: 'healthcare',
      icon: '🏥',
      label: 'Healthcare',
      labelEs: 'Salud',
      desc: 'Product safety failures, pharmaceutical marketing fraud, and vaccine communications crises.',
      descEs: 'Fallas de seguridad en productos, fraude farmacéutico y crisis de comunicaciones en vacunas.',
      count: allCases.filter((c) => c.industry === 'healthcare').length,
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-navy-700 text-white overflow-hidden">
        {/* Subtle decorative blobs */}
        <div className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-white/[0.03]" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-white/[0.02]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-16">
          <div className="max-w-3xl">
            {/* MINERBA white logo in hero */}
            <div className="mb-8">
              <Image
                src="/logo-minerba-white.png"
                alt="MINERBA"
                width={160}
                height={30}
                priority
                className="object-contain mb-4"
              />
              <div className="inline-flex items-center gap-2 bg-navy-600/80 border border-navy-500/60 rounded-full px-4 py-1.5">
                <span className="text-navy-300 text-xs font-medium tracking-wide">
                  Crisis Intelligence Training · Energy · Mining · Healthcare
                </span>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black leading-[1.05] mb-5 tracking-tight">
              {t('tagline')}
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-2xl">
              {t('subtitle')}
            </p>

            {/* Stats row */}
            <div className="flex items-center gap-8 md:gap-12 mb-10">
              <StatItem value={allCases.length} label={t('stats.cases')} />
              <div className="h-10 w-px bg-navy-500/60" />
              <StatItem value={crisisTypes} label={t('stats.crisisTypes')} />
              <div className="h-10 w-px bg-navy-500/60" />
              <StatItem value={regions} label={t('stats.regions')} />
            </div>

            {/* PR outcome distribution bar */}
            {(() => {
              const failedCount = allCases.filter((c) => c.pr_rating === 'failed').length;
              const mixedCount = allCases.filter((c) => c.pr_rating === 'mixed').length;
              const effectiveCount = allCases.filter((c) => c.pr_rating === 'effective').length;
              const total = allCases.length;
              return (
                <div>
                  <div className="flex h-2 rounded-full overflow-hidden gap-0.5 mb-3 max-w-xs">
                    <div className="bg-crisis-red rounded-l-full" style={{ width: `${(failedCount / total) * 100}%` }} />
                    <div className="bg-crisis-amber" style={{ width: `${(mixedCount / total) * 100}%` }} />
                    <div className="bg-crisis-green rounded-r-full flex-1" />
                  </div>
                  <div className="flex gap-5">
                    {[
                      { count: failedCount, label: locale === 'es' ? 'Fallida' : 'Failed', color: 'text-red-400' },
                      { count: mixedCount, label: locale === 'es' ? 'Mixta' : 'Mixed', color: 'text-amber-400' },
                      { count: effectiveCount, label: locale === 'es' ? 'Efectiva' : 'Effective', color: 'text-green-400' },
                    ].map(({ count, label, color }) => (
                      <div key={label} className="flex items-center gap-1.5">
                        <span className={`text-base font-black tabular-nums ${color}`}>{count}</span>
                        <span className="text-xs text-navy-400">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="bg-white relative z-10 border-t border-gray-100 pt-10 pb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <FeatureCard
            icon="⚡"
            title={locale === 'es' ? 'Diagnóstico de Preparación' : 'Crisis Readiness Assessment'}
            description={
              locale === 'es'
                ? '12 preguntas · 4 minutos. Identifique sus brechas, reciba su puntuación de 0–100 y recomendaciones MINERBA personalizadas.'
                : '12 questions · 4 minutes. Identify your gaps, receive a 0–100 score, and get personalised MINERBA recommendations.'
            }
            cta={locale === 'es' ? 'Iniciar diagnóstico →' : 'Take the assessment →'}
            href={`/${locale}/assessment`}
            accent
          />
          <FeatureCard
            icon="📂"
            title={t('features.browse.title')}
            description={t('features.browse.description')}
            cta={t('features.browse.cta')}
            href={`/${locale}/cases`}
          />
          <FeatureCard
            icon="🎮"
            title={t('features.quiz.title')}
            description={t('features.quiz.description')}
            cta={t('features.quiz.cta')}
            href={`/${locale}/cases`}
          />
          <FeatureCard
            icon="🗺"
            title={locale === 'es' ? 'Mapa Mundial de Crisis' : 'Global Crisis Map'}
            description={
              locale === 'es'
                ? 'Explora geográficamente dónde ocurrieron las crisis. Haz clic en los marcadores para acceder a cada caso.'
                : 'Explore geographically where crises happened. Click markers to jump directly to each case.'
            }
            cta={locale === 'es' ? 'Abrir mapa interactivo →' : 'Open interactive map →'}
            href={`/${locale}/map`}
          />
          <FeatureCard
            icon="🛡"
            title={t('features.frameworks.title')}
            description={t('features.frameworks.description')}
            cta={t('features.frameworks.cta')}
            href={`/${locale}/frameworks`}
          />
          <FeatureCard
            icon="📖"
            title={locale === 'es' ? 'Glosario de Crisis' : 'Crisis Glossary'}
            description={
              locale === 'es'
                ? '24 términos clave de comunicaciones de crisis — definiciones bilingües, contexto LATAM y vínculos a casos.'
                : '24 essential crisis communications terms — bilingual definitions, LATAM context, and links to cases.'
            }
            cta={locale === 'es' ? 'Explorar glosario →' : 'Explore glossary →'}
            href={`/${locale}/glossary`}
          />
          <FeatureCard
            icon="📊"
            title={locale === 'es' ? 'Estadísticas del Dataset' : 'Dataset Statistics'}
            description={
              locale === 'es'
                ? 'Análisis cuantitativo de los 38 casos: distribución por industria, tipo de crisis, calificación PR y relevancia LATAM.'
                : 'Quantitative breakdown of all 38 cases by industry, crisis type, PR rating, and LATAM relevance.'
            }
            cta={locale === 'es' ? 'Ver análisis →' : 'View analysis →'}
            href={`/${locale}/stats`}
          />
          <FeatureCard
            icon="🎓"
            title={locale === 'es' ? 'Rutas de Aprendizaje' : 'Learning Paths'}
            description={
              locale === 'es'
                ? '5 secuencias curadas de casos para formación deliberada — energía LATAM, minería, farmacéutico, anticorrupción y derechos indígenas.'
                : '5 curated case sequences for deliberate practice — LATAM energy, mining, pharma, anti-corruption, and indigenous rights tracks.'
            }
            cta={locale === 'es' ? 'Explorar rutas →' : 'Explore paths →'}
            href={`/${locale}/learning`}
          />
          <FeatureCard
            icon="🎭"
            title={locale === 'es' ? 'Adversarios de Simulación' : 'Simulation Adversaries'}
            description={
              locale === 'es'
                ? '5 perfiles de partes interesadas con IA — periodista, regulador, líder comunitario, inversor, directora de ONG. Conozca sus agendas antes de enfrentarlos.'
                : '5 AI stakeholder profiles — journalist, regulator, community leader, investor, NGO director. Know their agendas before you face them.'
            }
            cta={locale === 'es' ? 'Conocer a los adversarios →' : 'Meet the adversaries →'}
            href={`/${locale}/personas`}
          />
        </div>
        </div>
      </section>

      {/* Industry modules */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-navy-700">
            {locale === 'es' ? 'Módulos por Industria' : 'Industry Modules'}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {locale === 'es'
              ? 'Explora casos y simulaciones por sector'
              : 'Explore cases and crisis simulations by sector'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {INDUSTRY_DATA.map((ind) => (
            <Link
              key={ind.id}
              href={`/${locale}/industry/${ind.id}`}
              className="group block bg-white border border-gray-200 rounded-lg p-6 hover:border-navy-300 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{ind.icon}</span>
                <span className="text-xs font-semibold text-navy-500 bg-navy-50 border border-navy-200 px-2 py-0.5 rounded-full">
                  {ind.count} {locale === 'es' ? 'casos' : 'cases'}
                </span>
              </div>
              <h3 className="font-bold text-navy-700 text-lg mb-2 group-hover:text-navy-500">
                {locale === 'es' ? ind.labelEs : ind.label}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {locale === 'es' ? ind.descEs : ind.desc}
              </p>
              <div className="mt-4 text-xs font-semibold text-navy-500 group-hover:text-navy-700 transition-colors">
                {locale === 'es' ? 'Explorar módulo →' : 'Explore module →'}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Learning Paths teaser */}
      <section className="bg-white border-t border-gray-200 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-navy-700">
                {locale === 'es' ? '🎓 Rutas de Aprendizaje' : '🎓 Learning Paths'}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {locale === 'es'
                  ? 'Secuencias de casos curadas para formación deliberada en comunicaciones de crisis'
                  : 'Curated case sequences for deliberate crisis communications training'}
              </p>
            </div>
            <Link
              href={`/${locale}/learning`}
              className="text-sm font-semibold text-navy-500 border border-navy-300 px-4 py-2 rounded hover:bg-navy-50 transition-colors"
            >
              {locale === 'es' ? 'Ver todas →' : 'View all →'}
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LEARNING_PATHS.slice(0, 3).map((path) => (
              <Link
                key={path.id}
                href={`/${locale}/learning/${path.id}`}
                className="group bg-navy-700 border border-navy-600 rounded-xl p-5 hover:bg-navy-600 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{path.icon}</span>
                  <span className="text-xs text-navy-400">
                    {path.caseIds.length} {locale === 'es' ? 'casos' : 'cases'} · {path.estimatedHours} hrs
                  </span>
                </div>
                <h3 className="font-bold text-white text-sm mb-2 group-hover:text-navy-100 leading-snug transition-colors">
                  {locale === 'es' ? path.titleEs : path.title}
                </h3>
                <p className="text-navy-300 text-xs leading-relaxed line-clamp-2">
                  {locale === 'es' ? path.objectiveEs : path.objective}
                </p>
                <div className="mt-3 text-xs font-semibold text-navy-300 group-hover:text-white transition-colors">
                  {locale === 'es' ? 'Iniciar ruta →' : 'Start path →'}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured cases */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-0">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-navy-700">{t('featured')}</h2>
            <p className="text-gray-500 text-sm mt-1">
              {locale === 'es' ? 'Casos de alta relevancia para mercados latinoamericanos' : 'High-relevance cases for Latin American markets'}
            </p>
          </div>
          <Link
            href={`/${locale}/cases`}
            className="text-sm font-semibold text-navy-500 border border-navy-300 px-4 py-2 rounded hover:bg-navy-50 transition-colors"
          >
            {locale === 'es' ? 'Ver todos →' : 'View all →'}
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredCases.slice(0, 6).map((c) => (
            <CaseCard
              key={c.id}
              caseItem={c}
              locale={locale}
              readLabel={tf('readCase')}
              quizLabel={tf('startQuiz')}
            />
          ))}
        </div>
        {featuredCases.length > 6 && (
          <div className="text-center mt-6">
            <Link
              href={`/${locale}/cases`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-navy-600 border border-navy-300 px-5 py-2.5 rounded-lg hover:bg-navy-50 transition-colors"
            >
              {locale === 'es'
                ? `Ver los ${featuredCases.length - 6} casos destacados restantes →`
                : `View ${featuredCases.length - 6} more featured cases →`}
            </Link>
          </div>
        )}
      </section>

      {/* ── Personas section ──────────────────────────────────────────────── */}
      <section className="bg-navy-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-navy-300 uppercase tracking-widest mb-2 block">
                {locale === 'es' ? 'Modo Simulación' : 'Simulation Mode'}
              </span>
              <h2 className="text-2xl font-bold text-white leading-tight">
                {locale === 'es'
                  ? '¿Con quién te enfrentarás?'
                  : 'Who Will You Face?'}
              </h2>
              <p className="text-navy-300 text-sm mt-2 max-w-lg leading-relaxed">
                {locale === 'es'
                  ? 'En cada simulación elijes una perspectiva. La IA adopta ese rol — tú siempre eres el asesor de comunicaciones. Practica adaptar tu mensaje a cada interlocutor.'
                  : 'In each simulation you choose a perspective. The AI plays that stakeholder — you always play the communications advisor. Practice adapting your message to each audience.'}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 shrink-0 self-start md:self-auto">
              <Link
                href={`/${locale}/cases`}
                className="inline-flex items-center gap-2 bg-white text-navy-700 font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-navy-50 transition-colors"
              >
                {locale === 'es' ? 'Elegir un caso para simular →' : 'Choose a case to simulate →'}
              </Link>
              <Link
                href={`/${locale}/personas`}
                className="inline-flex items-center gap-2 border border-navy-400 text-navy-200 font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-navy-600 hover:text-white transition-colors"
              >
                {locale === 'es' ? '🎭 Conocer a los adversarios →' : '🎭 Meet the adversaries →'}
              </Link>
            </div>
          </div>

          {/* Persona cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {PERSONAS.map((p) => {
              const DIFF_COLORS: Record<string, string> = {
                Challenging: 'text-amber-300 bg-amber-900/40 border-amber-700',
                'Very Challenging': 'text-orange-300 bg-orange-900/40 border-orange-700',
                Expert: 'text-red-300 bg-red-900/40 border-red-700',
              };
              const diffLabel = locale === 'es' ? p.difficultyEs : p.difficulty;
              const diffColor = DIFF_COLORS[p.difficulty] ?? 'text-gray-300 bg-gray-700 border-gray-600';
              const name = locale === 'es' ? p.nameEs : p.name;
              const role = locale === 'es' ? p.roleEs : p.role;
              const agenda = locale === 'es' ? p.agendaEs : p.agenda;

              // Map each persona's dark text class to a lighter variant for dark bg
              const LIGHT_NAME_COLOR: Record<string, string> = {
                journalist: 'text-amber-300',
                regulator: 'text-blue-300',
                community: 'text-red-300',
                investor: 'text-sky-300',
                ngo: 'text-green-300',
              };
              const nameTxtClass = LIGHT_NAME_COLOR[p.id] ?? 'text-white';

              return (
                <Link
                  key={p.id}
                  href={`/${locale}/personas#${p.id}`}
                  className={`group relative block border-2 rounded-xl p-4 transition-all duration-150 hover:scale-[1.02] hover:shadow-lg bg-navy-600 hover:bg-navy-500 ${p.colorClass}`}
                >
                  {/* Icon + difficulty */}
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl">{p.icon}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${diffColor}`}>
                      {diffLabel}
                    </span>
                  </div>
                  {/* Name + role */}
                  <p className={`font-bold text-sm leading-snug ${nameTxtClass}`}>
                    {name}
                  </p>
                  <p className="text-navy-300 text-xs mt-0.5 mb-3">{role}</p>
                  {/* Agenda teaser */}
                  <p className="text-navy-400 text-xs leading-relaxed line-clamp-3">{agenda}</p>
                  {/* Hover CTA */}
                  <div className="mt-3 text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    {locale === 'es' ? 'Ver perfil completo →' : 'View full profile →'}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Bottom note */}
          <p className="text-center text-navy-400 text-xs mt-8">
            {locale === 'es'
              ? 'Cada sesión puede ejecutarse con una perspectiva diferente. Cada perspectiva requiere un enfoque de comunicación distinto.'
              : 'Each session can be run with a different perspective. Each stakeholder requires a different communications approach.'}
          </p>
        </div>
      </section>

      {/* Frameworks */}
      <section id="frameworks" className="bg-gray-50 border-t border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-navy-700">{t('frameworksSection.title')}</h2>
            <p className="text-gray-500 text-sm mt-1">{t('frameworksSection.subtitle')}</p>
          </div>

          {/* 72-Hour Protocol — full-width redesign */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

            {/* Card header */}
            <div className="bg-navy-700 px-8 py-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex items-start gap-5">
                  <div className="shrink-0 bg-navy-600 border border-navy-500 rounded-xl px-4 py-2 text-center min-w-[64px]">
                    <div className="text-3xl font-black text-white leading-none">72</div>
                    <div className="text-navy-300 text-xs font-bold mt-0.5 uppercase tracking-widest">HRS</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {t('frameworksSection.protocol72.title')}
                    </h3>
                    <p className="text-navy-300 text-sm leading-relaxed max-w-2xl">
                      {t('frameworksSection.protocol72.description')}
                    </p>
                  </div>
                </div>
                <div className="shrink-0 flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 rounded-lg px-3 py-2 self-start">
                  <span className="text-base">🌎</span>
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">
                    {locale === 'es' ? 'Adaptación LATAM' : 'LATAM Adapted'}
                  </span>
                </div>
              </div>
            </div>

            {/* Column labels */}
            <div className="hidden sm:grid sm:grid-cols-12 bg-gray-50 border-b border-gray-200">
              <div className="sm:col-span-2 px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-widest">
                {t('frameworksSection.protocol72.col1')}
              </div>
              <div className="sm:col-span-6 px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-widest border-l border-gray-200">
                {t('frameworksSection.protocol72.col2')}
              </div>
              <div className="sm:col-span-4 px-6 py-3 text-xs font-bold text-amber-600 uppercase tracking-widest border-l border-amber-200 bg-amber-50">
                🌎 {t('frameworksSection.protocol72.col3')}
              </div>
            </div>

            {/* Phase rows */}
            <div className="divide-y divide-gray-100">
              {[
                { row: 'row1', dot: 'bg-red-500',    txt: 'text-red-600',    badge: locale === 'es' ? 'CRÍTICO' : 'CRITICAL' },
                { row: 'row2', dot: 'bg-orange-500', txt: 'text-orange-600', badge: locale === 'es' ? 'URGENTE' : 'URGENT' },
                { row: 'row3', dot: 'bg-amber-500',  txt: 'text-amber-700',  badge: '' },
                { row: 'row4', dot: 'bg-blue-500',   txt: 'text-blue-700',   badge: '' },
                { row: 'row5', dot: 'bg-green-600',  txt: 'text-green-700',  badge: '' },
              ].map(({ row, dot, txt, badge }) => (
                <div key={row} className="grid grid-cols-1 sm:grid-cols-12 group hover:bg-blue-50/20 transition-colors">
                  {/* Time window */}
                  <div className="sm:col-span-2 flex items-center gap-3 px-6 py-5 sm:border-r border-gray-100">
                    <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${dot}`} />
                    <div>
                      <div className={`text-sm font-black tracking-tight ${txt}`}>
                        {t(`frameworksSection.protocol72.${row}_window` as any)}
                      </div>
                      {badge && (
                        <div className={`text-xs font-bold uppercase tracking-widest mt-0.5 opacity-70 ${txt}`}>
                          {badge}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Required action */}
                  <div className="sm:col-span-6 px-6 py-5 flex items-center sm:border-r border-gray-100">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {t(`frameworksSection.protocol72.${row}_action` as any)}
                    </p>
                  </div>
                  {/* LATAM adaptation */}
                  <div className="sm:col-span-4 px-6 py-5 bg-amber-50/60 group-hover:bg-amber-50 transition-colors">
                    <p className="text-xs text-amber-800 leading-relaxed">
                      {t(`frameworksSection.protocol72.${row}_latam` as any)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Card footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-gray-400 italic">
                {locale === 'es'
                  ? 'Derivado del análisis de Exxon Valdez y casos latinoamericanos L1–L3.'
                  : 'Derived from the Exxon Valdez analysis and Latin American cases L1–L3.'}
              </p>
              <Link
                href={`/${locale}/frameworks`}
                className="text-xs font-semibold text-navy-600 hover:text-navy-800 transition-colors"
              >
                {locale === 'es' ? 'Ver todos los marcos →' : 'View all frameworks →'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatItem({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <div className="text-4xl md:text-5xl font-black text-white tabular-nums leading-none">{value}</div>
      <div className="text-navy-300 text-xs font-medium mt-2 leading-tight">{label}</div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  cta,
  href,
  accent = false,
}: {
  icon: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  accent?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`block rounded-lg p-6 border transition-shadow hover:shadow-md ${
        accent
          ? 'bg-navy-500 text-white border-navy-400'
          : 'bg-white text-gray-800 border-gray-200'
      }`}
    >
      <div className="text-2xl mb-3">{icon}</div>
      <h3 className={`font-bold text-base mb-2 ${accent ? 'text-white' : 'text-navy-700'}`}>
        {title}
      </h3>
      <p className={`text-sm leading-relaxed mb-4 ${accent ? 'text-blue-100' : 'text-gray-500'}`}>
        {description}
      </p>
      <span
        className={`text-sm font-semibold ${accent ? 'text-white underline underline-offset-2' : 'text-navy-500'}`}
      >
        {cta}
      </span>
    </Link>
  );
}

