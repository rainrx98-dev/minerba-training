import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getAllCases, CRISIS_TYPE_LABELS, CRISIS_TYPE_LABELS_ES } from '@/lib/cases';
import { INDUSTRY_PROFILES } from '@/lib/industry-profiles';
import { getCaseById } from '@/lib/cases';
import type { Industry } from '@/lib/case-types';
import { LEARNING_PATHS } from '@/lib/learning-paths';
import { getFrameworkById, CATEGORY_META as FW_CATEGORY_META } from '@/lib/frameworks';
import type { FrameworkCategory } from '@/lib/frameworks';
import PRRatingBadge from '@/components/PRRatingBadge';
import CaseCard from '@/components/CaseCard';

const VALID_INDUSTRIES: Industry[] = ['energy', 'mining', 'healthcare'];

export async function generateMetadata({
  params: { locale, id },
}: {
  params: { locale: string; id: string };
}): Promise<Metadata> {
  if (!VALID_INDUSTRIES.includes(id as Industry)) return {};
  const profile = INDUSTRY_PROFILES[id as Industry];
  return {
    title: locale === 'es'
      ? `${profile.labelEs} — MINERBA Crisis Communications`
      : `${profile.label} — MINERBA Crisis Communications`,
    description: locale === 'es' ? profile.heroSubtitleEs : profile.heroSubtitle,
  };
}

export async function generateStaticParams() {
  return VALID_INDUSTRIES.flatMap((id) => [
    { locale: 'en', id },
    { locale: 'es', id },
  ]);
}

export default async function IndustryPage({
  params: { locale, id },
}: {
  params: { locale: string; id: string };
}) {
  setRequestLocale(locale);

  if (!VALID_INDUSTRIES.includes(id as Industry)) notFound();

  const profile = INDUSTRY_PROFILES[id as Industry];
  const isEs = locale === 'es';
  const allCases = getAllCases();

  // Filter cases for this industry
  const industryCases = allCases.filter((c) => {
    if (id === 'energy') return c.industry === 'energy' || !c.industry;
    return c.industry === id;
  });

  const failedCases = industryCases.filter((c) => c.pr_rating === 'failed');
  const mixedCases = industryCases.filter((c) => c.pr_rating === 'mixed');
  const effectiveCases = industryCases.filter((c) => c.pr_rating === 'effective');
  const latamRelevant = industryCases.filter((c) => c.latam_relevant);

  const featuredFailed = getCaseById(profile.featuredFailedCaseId);
  const featuredEffective = getCaseById(profile.featuredEffectiveCaseId);

  const SEVERITY_STYLES = {
    critical: {
      badge: 'bg-red-100 text-red-700 border-red-200',
      dot: 'bg-red-500',
      label: isEs ? 'CRÍTICO' : 'CRITICAL',
    },
    high: {
      badge: 'bg-amber-100 text-amber-700 border-amber-200',
      dot: 'bg-amber-500',
      label: isEs ? 'ALTO' : 'HIGH',
    },
  };

  const OTHER_INDUSTRIES = VALID_INDUSTRIES.filter((i) => i !== id);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <div className="bg-navy-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-navy-400 mb-6 font-medium uppercase tracking-wide">
            <Link href={`/${locale}`} className="hover:text-navy-200 transition-colors">MINERBA</Link>
            <span>›</span>
            <Link href={`/${locale}/cases`} className="hover:text-navy-200 transition-colors">
              {isEs ? 'Casos' : 'Cases'}
            </Link>
            <span>›</span>
            <span className="text-navy-200">{isEs ? profile.labelEs : profile.label}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-5xl">{profile.icon}</span>
                <span className="text-xs font-bold text-navy-300 uppercase tracking-widest">
                  {isEs ? 'Sector' : 'Sector'} · {isEs ? profile.labelEs : profile.label}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
                {isEs ? profile.heroTitleEs : profile.heroTitle}
              </h1>
              <p className="text-navy-200 text-base leading-relaxed max-w-2xl">
                {isEs ? profile.heroSubtitleEs : profile.heroSubtitle}
              </p>
            </div>

            {/* Stat pill */}
            <div className="shrink-0 bg-navy-600 border border-navy-500 rounded-xl px-5 py-4 text-right">
              <p className="text-xs text-navy-300 font-medium mb-2">{isEs ? 'Dataset MINERBA' : 'MINERBA Dataset'}</p>
              <div className="flex items-center gap-4 justify-end">
                <StatPill value={industryCases.length} label={isEs ? 'Casos' : 'Cases'} color="white" />
                <StatPill value={failedCases.length} label={isEs ? 'Fallidos' : 'Failed'} color="red" />
                <StatPill value={effectiveCases.length} label={isEs ? 'Efectivos' : 'Effective'} color="green" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">

        {/* ── Overview ──────────────────────────────────────────────────────── */}
        <section className="bg-white border border-gray-200 rounded-2xl p-7 shadow-sm">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
            {isEs ? 'Descripción General' : 'Sector Overview'}
          </h2>
          <p className="text-gray-700 leading-relaxed text-base">
            {isEs ? profile.overviewEs : profile.overview}
          </p>

          {/* PR breakdown bar */}
          <div className="mt-6 pt-5 border-t border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
              {isEs ? 'Distribución de Calificación PR en este Sector' : 'PR Rating Distribution in this Sector'}
            </p>
            <div className="flex items-center gap-2 h-5 rounded-full overflow-hidden">
              {failedCases.length > 0 && (
                <div
                  className="bg-red-500 h-full rounded-l-full transition-all"
                  style={{ width: `${(failedCases.length / industryCases.length) * 100}%` }}
                  title={`Failed: ${failedCases.length}`}
                />
              )}
              {mixedCases.length > 0 && (
                <div
                  className="bg-amber-400 h-full transition-all"
                  style={{ width: `${(mixedCases.length / industryCases.length) * 100}%` }}
                  title={`Mixed: ${mixedCases.length}`}
                />
              )}
              {effectiveCases.length > 0 && (
                <div
                  className="bg-green-500 h-full rounded-r-full transition-all"
                  style={{ width: `${(effectiveCases.length / industryCases.length) * 100}%` }}
                  title={`Effective: ${effectiveCases.length}`}
                />
              )}
            </div>
            <div className="flex items-center gap-5 mt-2">
              <LegendDot color="bg-red-500" label={`${failedCases.length} ${isEs ? 'Fallidas' : 'Failed'} (${Math.round((failedCases.length / industryCases.length) * 100)}%)`} />
              <LegendDot color="bg-amber-400" label={`${mixedCases.length} ${isEs ? 'Mixtas' : 'Mixed'} (${Math.round((mixedCases.length / industryCases.length) * 100)}%)`} />
              <LegendDot color="bg-green-500" label={`${effectiveCases.length} ${isEs ? 'Efectivas' : 'Effective'} (${Math.round((effectiveCases.length / industryCases.length) * 100)}%)`} />
            </div>
          </div>
        </section>

        {/* ── LATAM Risk Briefing ───────────────────────────────────────────── */}
        <section>
          <div className="mb-6">
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest mb-1 block">
              🌎 {isEs ? 'Riesgos de LATAM' : 'LATAM Risk Briefing'}
            </span>
            <h2 className="text-xl font-bold text-navy-700">
              {isEs ? 'Los Mayores Riesgos de Comunicación para este Sector en América Latina' : 'The Top Communications Risks for this Sector in Latin America'}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {isEs
                ? 'Basado en el análisis del dataset MINERBA y los patrones de falla más recurrentes.'
                : 'Based on the MINERBA dataset analysis and the most recurrent failure patterns.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {profile.latamRisks.map((risk) => {
              const style = SEVERITY_STYLES[risk.severity];
              return (
                <div
                  key={risk.title}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-bold text-navy-700 text-base leading-snug">
                      {isEs ? risk.titleEs : risk.title}
                    </h3>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border shrink-0 ${style.badge}`}>
                      {style.label}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {isEs ? risk.detailEs : risk.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Common Failure Patterns ───────────────────────────────────────── */}
        <section>
          <div className="mb-6">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-1 block">
              ⚠️ {isEs ? 'Patrones de Falla' : 'Failure Patterns'}
            </span>
            <h2 className="text-xl font-bold text-navy-700">
              {isEs ? 'Los Errores Más Recurrentes en Este Sector' : 'The Most Recurring Mistakes in This Sector'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {profile.commonFailures.map((failure, idx) => {
              const exemplarCase = getCaseById(failure.caseId);
              return (
                <div key={failure.title} className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-black text-amber-600 bg-amber-50 border border-amber-200 w-6 h-6 flex items-center justify-center rounded-full shrink-0">
                      {idx + 1}
                    </span>
                    <h3 className="font-bold text-navy-700 text-sm leading-snug">
                      {isEs ? failure.titleEs : failure.title}
                    </h3>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">
                    {isEs ? failure.detailEs : failure.detail}
                  </p>
                  {exemplarCase && (
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <p className="text-xs text-gray-400 font-medium mb-1.5">
                        {isEs ? 'Caso Ejemplo:' : 'Exemplar Case:'}
                      </p>
                      <Link
                        href={`/${locale}/cases/${exemplarCase.id}`}
                        className="flex items-center gap-2 group"
                      >
                        <span className="text-xs font-bold text-navy-700 bg-navy-50 px-1.5 py-0.5 rounded group-hover:bg-navy-100 transition-colors">
                          {exemplarCase.id}
                        </span>
                        <span className="text-xs text-navy-600 group-hover:text-navy-800 group-hover:underline transition-colors leading-snug">
                          {exemplarCase.company}
                        </span>
                        <span className="text-xs text-gray-400">·</span>
                        <span className="text-xs text-gray-400">{exemplarCase.year}</span>
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Featured Cases (Failed + Effective) ──────────────────────────── */}
        {(featuredFailed || featuredEffective) && (
          <section>
            <div className="mb-6">
              <span className="text-xs font-bold text-navy-500 uppercase tracking-widest mb-1 block">
                {isEs ? 'Casos Destacados' : 'Landmark Cases'}
              </span>
              <h2 className="text-xl font-bold text-navy-700">
                {isEs ? 'Un Fracaso y un Éxito: Los Extremos del Sector' : 'One Failure, One Success: The Sector Extremes'}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {isEs
                  ? 'Estos dos casos definen los límites de lo que es posible — para bien y para mal — en comunicaciones de crisis.'
                  : 'These two cases define the boundaries of what\'s possible — for better and worse — in crisis communications.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredFailed && (
                <div className="bg-white border border-red-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="bg-red-50 border-b border-red-200 px-5 py-3 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0" />
                    <span className="text-xs font-bold text-red-700 uppercase tracking-widest">
                      {isEs ? 'Caso de Fracaso' : 'Failure Case'}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-bold text-navy-700 bg-navy-50 px-1.5 py-0.5 rounded">
                        {featuredFailed.id}
                      </span>
                      <PRRatingBadge rating={featuredFailed.pr_rating} size="sm" locale={locale} />
                    </div>
                    <h3 className="font-bold text-navy-700 text-base leading-snug mb-1">
                      {featuredFailed.title}
                    </h3>
                    <p className="text-xs text-gray-400 mb-3">{featuredFailed.company} · {featuredFailed.country} · {featuredFailed.year}</p>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">{featuredFailed.summary}</p>
                    <div className="flex gap-2">
                      <Link
                        href={`/${locale}/cases/${featuredFailed.id}`}
                        className="text-xs font-semibold text-navy-600 border border-navy-200 px-3 py-1.5 rounded hover:bg-navy-50 transition-colors"
                      >
                        {isEs ? 'Leer Caso →' : 'Read Case →'}
                      </Link>
                      <Link
                        href={`/${locale}/quiz/${featuredFailed.id}`}
                        className="text-xs font-semibold bg-navy-700 text-white px-3 py-1.5 rounded hover:bg-navy-800 transition-colors"
                      >
                        {isEs ? 'Simular →' : 'Simulate →'}
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {featuredEffective && (
                <div className="bg-white border border-green-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="bg-green-50 border-b border-green-200 px-5 py-3 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0" />
                    <span className="text-xs font-bold text-green-700 uppercase tracking-widest">
                      {isEs ? 'Caso de Éxito' : 'Effective Case'}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-bold text-navy-700 bg-navy-50 px-1.5 py-0.5 rounded">
                        {featuredEffective.id}
                      </span>
                      <PRRatingBadge rating={featuredEffective.pr_rating} size="sm" locale={locale} />
                    </div>
                    <h3 className="font-bold text-navy-700 text-base leading-snug mb-1">
                      {featuredEffective.title}
                    </h3>
                    <p className="text-xs text-gray-400 mb-3">{featuredEffective.company} · {featuredEffective.country} · {featuredEffective.year}</p>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">{featuredEffective.summary}</p>
                    <div className="flex gap-2">
                      <Link
                        href={`/${locale}/cases/${featuredEffective.id}`}
                        className="text-xs font-semibold text-navy-600 border border-navy-200 px-3 py-1.5 rounded hover:bg-navy-50 transition-colors"
                      >
                        {isEs ? 'Leer Caso →' : 'Read Case →'}
                      </Link>
                      <Link
                        href={`/${locale}/quiz/${featuredEffective.id}`}
                        className="text-xs font-semibold bg-green-700 text-white px-3 py-1.5 rounded hover:bg-green-800 transition-colors"
                      >
                        {isEs ? 'Simular →' : 'Simulate →'}
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── All Cases for This Industry ───────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold text-navy-500 uppercase tracking-widest mb-1 block">
                {isEs ? 'Todos los Casos' : 'All Cases'}
              </span>
              <h2 className="text-xl font-bold text-navy-700">
                {isEs
                  ? `${industryCases.length} Casos de ${profile.labelEs} en MINERBA`
                  : `${industryCases.length} ${profile.label} Cases in MINERBA`}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs text-gray-400">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                {isEs ? 'Fallido' : 'Failed'}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-400">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                {isEs ? 'Mixto' : 'Mixed'}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-400">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                {isEs ? 'Efectivo' : 'Effective'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {industryCases.map((c) => (
              <CaseCard
                key={c.id}
                caseItem={c}
                locale={locale}
                readLabel={isEs ? 'Leer Caso' : 'Read Case'}
                quizLabel={isEs ? 'Simular' : 'Simulate'}
              />
            ))}
          </div>
        </section>

        {/* ── Sector-Specific Services ──────────────────────────────────────── */}
        <section className="bg-navy-700 rounded-2xl p-8">
          <div className="mb-7">
            <span className="text-xs font-bold text-navy-300 uppercase tracking-widest mb-2 block">
              {isEs ? 'Servicios de MINERBA' : 'MINERBA Services'}
            </span>
            <h2 className="text-xl font-bold text-white">
              {isEs
                ? `Servicios de MINERBA para ${profile.labelEs}`
                : `MINERBA Services for ${profile.label}`}
            </h2>
            <p className="text-navy-300 text-sm mt-1.5 max-w-xl">
              {isEs
                ? 'Servicios adaptados a los riesgos específicos de este sector en América Latina.'
                : 'Services tailored to the specific risk profile of this sector in Latin America.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {profile.services.map((svc) => (
              <div
                key={svc.title}
                className="bg-navy-600 border border-navy-500 rounded-xl p-5 hover:bg-navy-500 transition-colors"
              >
                <span className="text-2xl mb-3 block">{svc.icon}</span>
                <h3 className="font-bold text-white text-sm mb-2">
                  {isEs ? svc.titleEs : svc.title}
                </h3>
                <p className="text-navy-300 text-xs leading-relaxed">
                  {isEs ? svc.descriptionEs : svc.description}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${locale}/assessment`}
              className="inline-flex items-center gap-2 bg-gold text-white font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-amber-500 transition-colors"
            >
              {isEs ? '⚡ Iniciar diagnóstico gratuito →' : '⚡ Start free assessment →'}
            </Link>
            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center gap-2 border border-navy-400 text-navy-200 font-semibold text-sm px-5 py-2.5 rounded-lg hover:border-white hover:text-white transition-colors"
            >
              {isEs ? 'Ver todos los servicios →' : 'View all services →'}
            </Link>
          </div>
        </section>

        {/* ── Key Frameworks for This Sector ───────────────────────────────── */}
        {(() => {
          const INDUSTRY_FRAMEWORK_MAP: Record<Industry, string[]> = {
            energy: ['72-hour-protocol', 'fpic', 'stakeholder-theory', 'latam-regulatory', 'scct'],
            mining: ['72-hour-protocol', 'fpic', 'ungp', 'icmm', 'sandman'],
            healthcare: ['scct', 'image-restoration', 'iso-22301', '72-hour-protocol'],
          };
          const FW_BADGE: Record<FrameworkCategory, string> = {
            academic: 'bg-purple-50 text-purple-700 border-purple-200',
            industry: 'bg-blue-50 text-blue-700 border-blue-200',
            operational: 'bg-navy-50 text-navy-700 border-navy-200',
            latam: 'bg-green-50 text-green-700 border-green-200',
          };
          const fwIds = INDUSTRY_FRAMEWORK_MAP[id as Industry] ?? [];
          const relevantFws = fwIds
            .map((fid) => getFrameworkById(fid))
            .filter(Boolean);
          if (relevantFws.length === 0) return null;
          return (
            <section>
              <div className="mb-5">
                <span className="text-xs font-bold text-navy-500 uppercase tracking-widest mb-1 block">
                  📚 {isEs ? 'Marcos de Referencia' : 'Key Frameworks'}
                </span>
                <h2 className="text-xl font-bold text-navy-700">
                  {isEs
                    ? `Marcos Clave para ${profile.labelEs}`
                    : `Key Frameworks for ${profile.label}`}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  {isEs
                    ? 'Los protocolos y estándares que definen las comunicaciones de crisis en este sector.'
                    : 'The protocols and standards that define crisis communications practice in this sector.'}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {relevantFws.map((fw) => {
                  if (!fw) return null;
                  const catMeta = FW_CATEGORY_META[fw.category];
                  return (
                    <Link
                      key={fw.id}
                      href={`/${locale}/frameworks/${fw.id}`}
                      className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-navy-300 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-start gap-3 mb-2.5">
                        <span className="text-2xl flex-shrink-0 mt-0.5">{fw.icon}</span>
                        <div className="min-w-0">
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${FW_BADGE[fw.category]}`}>
                            {catMeta.icon} {isEs ? catMeta.labelEs : catMeta.label}
                          </span>
                          <h3 className="font-bold text-navy-700 text-sm group-hover:text-navy-500 leading-snug mt-1 transition-colors">
                            {isEs ? fw.titleEs : fw.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                        {isEs ? fw.whenEs : fw.when}
                      </p>
                      <div className="mt-3 text-xs font-semibold text-navy-500 group-hover:text-navy-700 transition-colors">
                        {isEs ? 'Ver marco →' : 'View framework →'}
                      </div>
                    </Link>
                  );
                })}
              </div>
              <div className="mt-4">
                <Link
                  href={`/${locale}/frameworks`}
                  className="text-xs font-semibold text-navy-500 hover:text-navy-700 transition-colors"
                >
                  {isEs ? '→ Ver todos los marcos' : '→ Browse all 14 frameworks'}
                </Link>
              </div>
            </section>
          );
        })()}

        {/* ── Relevant Learning Paths ──────────────────────────────────────── */}
        {(() => {
          const relevantPaths = LEARNING_PATHS.filter((p) => {
            const focus = p.industryFocus.toLowerCase();
            return focus.includes(id) || focus.includes('cross') || (id === 'energy' && focus.includes('energy')) || (id === 'mining' && focus.includes('mining')) || (id === 'healthcare' && focus.includes('health'));
          });
          if (relevantPaths.length === 0) return null;
          return (
            <section>
              <div className="mb-5">
                <span className="text-xs font-bold text-navy-500 uppercase tracking-widest mb-1 block">
                  🎓 {isEs ? 'Rutas de Aprendizaje' : 'Learning Paths'}
                </span>
                <h2 className="text-xl font-bold text-navy-700">
                  {isEs
                    ? `Rutas de Aprendizaje para ${profile.labelEs}`
                    : `Learning Paths for ${profile.label}`}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  {isEs
                    ? 'Secuencias estructuradas de casos para formación deliberada en este sector.'
                    : 'Structured case sequences for deliberate practice in this sector.'}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relevantPaths.map((lp) => (
                  <Link
                    key={lp.id}
                    href={`/${locale}/learning/${lp.id}`}
                    className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-navy-300 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-2xl">{lp.icon}</span>
                      <div>
                        <h3 className="font-bold text-navy-700 text-sm group-hover:text-navy-500 leading-snug transition-colors">
                          {isEs ? lp.titleEs : lp.title}
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5">{isEs ? lp.taglineEs : lp.tagline}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                      {isEs ? lp.objectiveEs : lp.objective}
                    </p>
                    <div className="mt-3 text-xs font-semibold text-navy-500 group-hover:text-navy-700 transition-colors">
                      {isEs ? 'Iniciar ruta →' : 'Start path →'}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })()}

        {/* ── Other Sectors ────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
            {isEs ? 'Otros Sectores en MINERBA' : 'Other Sectors in MINERBA'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {OTHER_INDUSTRIES.map((otherId) => {
              const other = INDUSTRY_PROFILES[otherId];
              const otherCases = allCases.filter((c) => {
                if (otherId === 'energy') return c.industry === 'energy' || !c.industry;
                return c.industry === otherId;
              });
              return (
                <Link
                  key={otherId}
                  href={`/${locale}/industry/${otherId}`}
                  className="group flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-5 hover:border-navy-300 hover:shadow-sm transition-all"
                >
                  <span className="text-3xl">{other.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-navy-700 text-base group-hover:text-navy-500 transition-colors">
                      {isEs ? other.labelEs : other.label}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {otherCases.length} {isEs ? 'casos en MINERBA' : 'cases in MINERBA'}
                    </p>
                  </div>
                  <span className="text-gray-300 group-hover:text-navy-500 transition-colors text-lg">→</span>
                </Link>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StatPill({ value, label, color }: { value: number; label: string; color: 'white' | 'red' | 'green' }) {
  const colors = {
    white: 'text-white',
    red: 'text-red-400',
    green: 'text-green-400',
  };
  return (
    <div className="text-right">
      <div className={`text-2xl font-black leading-none ${colors[color]}`}>{value}</div>
      <div className="text-xs text-navy-400 mt-0.5">{label}</div>
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${color}`} />
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );
}
