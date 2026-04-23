import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import {
  FRAMEWORKS,
  CATEGORY_META,
  getFrameworkById,
  getFrameworkKeys,
} from '@/lib/frameworks';
import type { FrameworkCategory } from '@/lib/frameworks';
import { LEARNING_PATHS } from '@/lib/learning-paths';
import { getCaseById } from '@/lib/cases';

// ── Static generation ──────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const locales = ['en', 'es'];
  return locales.flatMap((locale) =>
    FRAMEWORKS.map((fw) => ({ locale, id: fw.id }))
  );
}

export async function generateMetadata({
  params: { locale, id },
}: {
  params: { locale: string; id: string };
}): Promise<Metadata> {
  const fw = getFrameworkById(id);
  if (!fw) return {};
  const isEs = locale === 'es';
  return {
    title: isEs
      ? `${fw.titleEs} — Marcos MINERBA`
      : `${fw.title} — MINERBA Frameworks`,
    description: isEs ? fw.summaryEs.slice(0, 160) : fw.summary.slice(0, 160),
  };
}

// ── Styling maps ───────────────────────────────────────────────────────────────

const CATEGORY_ACCENT: Record<FrameworkCategory, string> = {
  academic: 'border-purple-500',
  industry: 'border-blue-500',
  operational: 'border-navy-500',
  latam: 'border-green-600',
};

const CATEGORY_BADGE: Record<FrameworkCategory, string> = {
  academic: 'bg-purple-50 text-purple-700 border-purple-200',
  industry: 'bg-blue-50 text-blue-700 border-blue-200',
  operational: 'bg-navy-50 text-navy-700 border-navy-200',
  latam: 'bg-green-50 text-green-700 border-green-200',
};

const CATEGORY_HERO_BG: Record<FrameworkCategory, string> = {
  academic: 'bg-purple-700',
  industry: 'bg-blue-700',
  operational: 'bg-navy-700',
  latam: 'bg-green-800',
};

const CATEGORY_PRINCIPLE_BORDER: Record<FrameworkCategory, string> = {
  academic: 'border-l-purple-400',
  industry: 'border-l-blue-400',
  operational: 'border-l-navy-400',
  latam: 'border-l-green-500',
};

// ── Page ───────────────────────────────────────────────────────────────────────

export default async function FrameworkDetailPage({
  params: { locale, id },
}: {
  params: { locale: string; id: string };
}) {
  setRequestLocale(locale);

  const fw = getFrameworkById(id);
  if (!fw) notFound();

  const isEs = locale === 'es';
  const catMeta = CATEGORY_META[fw.category];
  const badgeClass = CATEGORY_BADGE[fw.category];
  const heroBg = CATEGORY_HERO_BG[fw.category];
  const principleBorder = CATEGORY_PRINCIPLE_BORDER[fw.category];

  // ── Cross-references ──────────────────────────────────────────────────────
  // All lookup keys that resolve to this framework (canonical + aliases)
  const frameworkKeys = getFrameworkKeys(fw.id);

  // Learning paths that reference this framework
  const relatedPaths = LEARNING_PATHS.filter((p) =>
    p.keyFrameworks.some((k) => frameworkKeys.includes(k))
  );

  // Cases that use this framework (strip 'case-' prefix)
  const relatedCases = (fw.usedInCases ?? [])
    .map((ucId) => getCaseById(ucId.replace(/^case-/, '')))
    .filter(Boolean);

  // ── Prev / Next navigation within FRAMEWORKS array ────────────────────────
  const idx = FRAMEWORKS.findIndex((f) => f.id === fw.id);
  const prevFw = idx > 0 ? FRAMEWORKS[idx - 1] : null;
  const nextFw = idx < FRAMEWORKS.length - 1 ? FRAMEWORKS[idx + 1] : null;

  // ── Other frameworks in same category ─────────────────────────────────────
  const sameCategory = FRAMEWORKS.filter(
    (f) => f.category === fw.category && f.id !== fw.id
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className={`${heroBg} text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs mb-6 opacity-80">
            <Link href={`/${locale}`} className="hover:underline">MINERBA</Link>
            <span>›</span>
            <Link href={`/${locale}/frameworks`} className="hover:underline">
              {isEs ? 'Marcos de Trabajo' : 'Frameworks'}
            </Link>
            <span>›</span>
            <span className="opacity-70 truncate max-w-[220px]">
              {isEs ? fw.titleEs : fw.title}
            </span>
          </nav>

          <div className="flex items-start gap-4">
            <span className="text-4xl flex-shrink-0 mt-1">{fw.icon}</span>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${badgeClass}`}>
                  {catMeta.icon} {isEs ? catMeta.labelEs : catMeta.label}
                </span>
                <span className="text-xs opacity-60">{fw.origin}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-3">
                {isEs ? fw.titleEs : fw.title}
              </h1>
              {/* When to use highlight */}
              <div className="inline-flex items-start gap-2 bg-white/10 rounded-lg px-4 py-2.5 max-w-2xl">
                <span className="text-lg flex-shrink-0 mt-0.5">⏱</span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide opacity-70 mb-0.5">
                    {isEs ? 'Cuándo aplicar' : 'When to apply'}
                  </p>
                  <p className="text-sm leading-relaxed opacity-90">
                    {isEs ? fw.whenEs : fw.when}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Left: main column ──────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Summary */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">
                {isEs ? 'Descripción General' : 'Overview'}
              </h2>
              <p className="text-base text-gray-700 leading-relaxed">
                {isEs ? fw.summaryEs : fw.summary}
              </p>
            </div>

            {/* Principles */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-5">
                {isEs ? 'Principios y Componentes Clave' : 'Key Principles & Components'}
              </h2>
              <div className="space-y-4">
                {fw.principles.map((p, i) => (
                  <div
                    key={i}
                    className={`border-l-4 ${principleBorder} rounded-r-lg bg-gray-50 px-5 py-4`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-navy-100 text-navy-700 text-xs font-black flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-bold text-navy-700 mb-1.5">
                          {isEs ? p.labelEs : p.label}
                        </p>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {isEs ? p.detailEs : p.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Cases */}
            {relatedCases.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest">
                    {isEs
                      ? `Casos de Estudio Relacionados (${relatedCases.length})`
                      : `Related Case Studies (${relatedCases.length})`}
                  </h2>
                  <Link
                    href={`/${locale}/cases`}
                    className="text-xs text-navy-500 font-semibold hover:text-navy-700 transition-colors"
                  >
                    {isEs ? 'Ver todos →' : 'View all →'}
                  </Link>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {relatedCases.map((c) => {
                    if (!c) return null;
                    const ratingColor =
                      c.pr_rating === 'failed'
                        ? 'bg-red-50 border-red-200 text-red-700'
                        : c.pr_rating === 'effective'
                        ? 'bg-green-50 border-green-200 text-green-700'
                        : 'bg-amber-50 border-amber-200 text-amber-700';
                    const ratingLabel =
                      c.pr_rating === 'failed'
                        ? (isEs ? 'Fallido' : 'Failed')
                        : c.pr_rating === 'effective'
                        ? (isEs ? 'Efectivo' : 'Effective')
                        : (isEs ? 'Mixto' : 'Mixed');
                    return (
                      <Link
                        key={c.id}
                        href={`/${locale}/cases/${c.id}`}
                        className="group flex items-start gap-3 p-3 rounded-xl border border-gray-200 hover:border-navy-300 hover:bg-navy-50/30 transition-all"
                      >
                        <span className="text-xs font-black text-white bg-navy-700 px-2 py-1 rounded flex-shrink-0 mt-0.5">
                          {c.id}
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-navy-700 group-hover:text-navy-900 leading-snug line-clamp-2">
                            {c.title}
                          </p>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="text-xs text-gray-400">{c.company}</span>
                            <span className="text-gray-300">·</span>
                            <span className="text-xs text-gray-400">{c.year}</span>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ml-1 ${ratingColor}`}>
                              {ratingLabel}
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ── Right: sidebar ─────────────────────────────────────────────── */}
          <div className="space-y-5">

            {/* Framework metadata card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                {isEs ? 'Detalles del Marco' : 'Framework Details'}
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">
                    {isEs ? 'Categoría' : 'Category'}
                  </p>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${badgeClass}`}>
                    {catMeta.icon} {isEs ? catMeta.labelEs : catMeta.label}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">
                    {isEs ? 'Origen' : 'Origin'}
                  </p>
                  <p className="text-xs text-gray-700 font-medium">{fw.origin}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">
                    {isEs ? 'Principios' : 'Principles'}
                  </p>
                  <p className="text-xs text-gray-700 font-medium">
                    {fw.principles.length} {isEs ? 'componentes' : 'components'}
                  </p>
                </div>
                {(fw.usedInCases?.length ?? 0) > 0 && (
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">
                      {isEs ? 'Casos relacionados' : 'Related cases'}
                    </p>
                    <p className="text-xs text-gray-700 font-medium">
                      {fw.usedInCases!.length} {isEs ? 'casos en el dataset' : 'cases in dataset'}
                    </p>
                  </div>
                )}
                {fw.externalRef && (
                  <div className="pt-2 border-t border-gray-100">
                    <a
                      href={fw.externalRef}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                    >
                      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      {isEs ? 'Fuente oficial' : 'Official source'}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Learning paths that use this framework */}
            {relatedPaths.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                  {isEs ? '🎓 Rutas de Aprendizaje' : '🎓 Learning Paths'}
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  {isEs
                    ? 'Las siguientes rutas de aprendizaje utilizan este marco como referencia central.'
                    : 'The following learning paths use this framework as a core reference.'}
                </p>
                <div className="space-y-3">
                  {relatedPaths.map((p) => (
                    <Link
                      key={p.id}
                      href={`/${locale}/learning/${p.id}`}
                      className="flex items-start gap-2.5 p-3 rounded-xl border border-gray-200 hover:border-navy-300 hover:bg-navy-50/30 transition-all group"
                    >
                      <span className="text-xl flex-shrink-0 leading-none mt-0.5">{p.icon}</span>
                      <div>
                        <p className="text-xs font-bold text-navy-700 group-hover:text-navy-900 leading-snug">
                          {isEs ? p.titleEs : p.title}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          {isEs ? p.taglineEs : p.tagline}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <Link
                    href={`/${locale}/learning`}
                    className="text-xs font-semibold text-navy-500 hover:text-navy-700 transition-colors"
                  >
                    {isEs ? '→ Ver todas las rutas' : '→ Browse all paths'}
                  </Link>
                </div>
              </div>
            )}

            {/* Other frameworks in same category */}
            {sameCategory.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                  {isEs
                    ? `Otros Marcos ${catMeta.labelEs}`
                    : `Other ${catMeta.label} Frameworks`}
                </h3>
                <div className="space-y-2">
                  {sameCategory.map((f) => (
                    <Link
                      key={f.id}
                      href={`/${locale}/frameworks/${f.id}`}
                      className="flex items-start gap-2 p-2.5 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <span className="text-sm flex-shrink-0">{f.icon}</span>
                      <p className="text-xs text-gray-600 group-hover:text-navy-700 leading-snug">
                        {isEs ? f.titleEs : f.title}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* All frameworks link */}
            <Link
              href={`/${locale}/frameworks`}
              className="block text-center text-sm font-semibold text-navy-600 border border-navy-200 rounded-xl py-3 hover:bg-navy-50 transition-colors"
            >
              ← {isEs ? 'Ver todos los marcos' : 'Back to all frameworks'}
            </Link>
          </div>
        </div>

        {/* Prev / Next framework navigation */}
        <div className="mt-10 border-t border-gray-200 pt-8 grid grid-cols-2 gap-4">
          {prevFw ? (
            <Link
              href={`/${locale}/frameworks/${prevFw.id}`}
              className="group flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:border-navy-300 hover:shadow-sm transition-all"
            >
              <span className="text-lg text-gray-300 group-hover:text-navy-500 transition-colors flex-shrink-0">←</span>
              <div className="min-w-0">
                <p className="text-xs text-gray-400 mb-0.5">
                  {isEs ? 'Marco anterior' : 'Previous framework'}
                </p>
                <p className="text-sm font-semibold text-navy-700 truncate">
                  {isEs ? prevFw.titleEs : prevFw.title}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {nextFw ? (
            <Link
              href={`/${locale}/frameworks/${nextFw.id}`}
              className="group flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:border-navy-300 hover:shadow-sm transition-all col-start-2 justify-end text-right"
            >
              <div className="min-w-0">
                <p className="text-xs text-gray-400 mb-0.5">
                  {isEs ? 'Marco siguiente' : 'Next framework'}
                </p>
                <p className="text-sm font-semibold text-navy-700 truncate">
                  {isEs ? nextFw.titleEs : nextFw.title}
                </p>
              </div>
              <span className="text-lg text-gray-300 group-hover:text-navy-500 transition-colors flex-shrink-0">→</span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
