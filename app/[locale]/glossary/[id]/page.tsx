import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { GLOSSARY, CATEGORY_META } from '@/lib/glossary';
import { getCaseById } from '@/lib/cases';
import PRRatingBadge from '@/components/PRRatingBadge';

export async function generateMetadata({
  params: { locale, id },
}: {
  params: { locale: string; id: string };
}): Promise<Metadata> {
  const term = GLOSSARY.find((t) => t.id === id);
  if (!term) return {};
  return {
    title: locale === 'es'
      ? `${term.termEs} — Glosario MINERBA`
      : `${term.term} — MINERBA Glossary`,
    description: locale === 'es'
      ? term.definitionEs.slice(0, 160)
      : term.definition.slice(0, 160),
  };
}

export async function generateStaticParams() {
  return GLOSSARY.flatMap((term) => [
    { locale: 'en', id: term.id },
    { locale: 'es', id: term.id },
  ]);
}

export default async function GlossaryTermPage({
  params: { locale, id },
}: {
  params: { locale: string; id: string };
}) {
  setRequestLocale(locale);
  const term = GLOSSARY.find((t) => t.id === id);
  if (!term) notFound();

  const isEs = locale === 'es';
  const cat = CATEGORY_META[term.category];

  // Resolve related cases
  const relatedCases = term.relatedCaseIds
    .map((cid) => getCaseById(cid))
    .filter(Boolean);

  // Resolve see-also terms
  const seeAlsoTerms = (term.seeAlso ?? [])
    .map((tid) => GLOSSARY.find((t) => t.id === tid))
    .filter(Boolean);

  // Prev / next within same category
  const catTerms = GLOSSARY.filter((t) => t.category === term.category);
  const termIdx = catTerms.findIndex((t) => t.id === id);
  const prevTerm = termIdx > 0 ? catTerms[termIdx - 1] : null;
  const nextTerm = termIdx < catTerms.length - 1 ? catTerms[termIdx + 1] : null;

  // All terms for sidebar browse
  const allByCategory = GLOSSARY.reduce<Record<string, typeof GLOSSARY>>((acc, t) => {
    if (!acc[t.category]) acc[t.category] = [];
    acc[t.category].push(t);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <div className={`bg-navy-700 text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-navy-400 mb-5 font-medium uppercase tracking-wide flex-wrap">
            <Link href={`/${locale}`} className="hover:text-navy-200 transition-colors">MINERBA</Link>
            <span>›</span>
            <Link href={`/${locale}/glossary`} className="hover:text-navy-200 transition-colors">
              {isEs ? 'Glosario' : 'Glossary'}
            </Link>
            <span>›</span>
            <span className="text-navy-200 truncate max-w-[200px]">
              {isEs ? term.termEs : term.term}
            </span>
          </div>

          {/* Category badge */}
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${cat.color}`}>
              {cat.icon} {isEs ? cat.labelEs : cat.label}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
            {isEs ? term.termEs : term.term}
          </h1>

          {/* Spanish term shown on EN page and vice versa */}
          <p className="text-navy-400 text-sm italic">
            {isEs ? `EN: ${term.term}` : `ES: ${term.termEs}`}
          </p>
        </div>
      </div>

      {/* ── Body grid ─────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Main column ─────────────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Definition */}
            <div className="bg-white border border-gray-200 rounded-2xl p-7 shadow-sm">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                {isEs ? 'Definición' : 'Definition'}
              </h2>
              <p className="text-gray-700 leading-relaxed text-base">
                {isEs ? term.definitionEs : term.definition}
              </p>
            </div>

            {/* Why it matters */}
            <div className="bg-navy-700 rounded-2xl p-7">
              <h2 className="text-xs font-bold text-navy-300 uppercase tracking-widest mb-4">
                {isEs ? '¿Por qué importa?' : 'Why It Matters'}
              </h2>
              <p className="text-navy-100 leading-relaxed">
                {isEs ? term.whyItMattersEs : term.whyItMatters}
              </p>
            </div>

            {/* Related cases */}
            {relatedCases.length > 0 && (
              <div>
                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">
                  {isEs ? 'Casos Relacionados en el Dataset' : 'Related Cases in the Dataset'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {relatedCases.map((c) => c && (
                    <Link
                      key={c.id}
                      href={`/${locale}/cases/${c.id}`}
                      className="group flex items-start gap-3 bg-white border border-gray-200 rounded-xl p-4 hover:border-navy-300 hover:shadow-md transition-all"
                    >
                      <span className="bg-navy-700 text-white text-xs font-bold px-2 py-1 rounded flex-shrink-0 mt-0.5">
                        {c.id}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-navy-700 leading-snug group-hover:text-navy-500 transition-colors">
                          {c.company}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5 truncate">{c.title}</p>
                        <div className="mt-1.5">
                          <PRRatingBadge rating={c.pr_rating} size="sm" locale={locale} />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* See also */}
            {seeAlsoTerms.length > 0 && (
              <div>
                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">
                  {isEs ? 'Ver También' : 'See Also'}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {seeAlsoTerms.map((t) => t && (
                    <Link
                      key={t.id}
                      href={`/${locale}/glossary/${t.id}`}
                      className={`flex items-center gap-2 border rounded-xl px-4 py-3 hover:shadow-sm transition-all ${CATEGORY_META[t.category].color}`}
                    >
                      <span className="text-sm">{CATEGORY_META[t.category].icon}</span>
                      <div>
                        <p className="text-sm font-bold leading-snug">{isEs ? t.termEs : t.term}</p>
                        <p className="text-xs opacity-70 mt-0.5">
                          {isEs ? CATEGORY_META[t.category].labelEs : CATEGORY_META[t.category].label}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Sidebar ─────────────────────────────────────────────────────── */}
          <div className="space-y-5">

            {/* Quick facts */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                {isEs ? 'Resumen' : 'Quick Facts'}
              </h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    {isEs ? 'Categoría' : 'Category'}
                  </dt>
                  <dd className="mt-1">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${cat.color}`}>
                      {cat.icon} {isEs ? cat.labelEs : cat.label}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    {isEs ? 'Casos vinculados' : 'Linked cases'}
                  </dt>
                  <dd className="mt-1 text-sm font-bold text-navy-700">
                    {term.relatedCaseIds.length}
                  </dd>
                </div>
                {term.seeAlso && term.seeAlso.length > 0 && (
                  <div>
                    <dt className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                      {isEs ? 'Términos relacionados' : 'Related terms'}
                    </dt>
                    <dd className="mt-1 text-sm font-bold text-navy-700">
                      {term.seeAlso.length}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Browse by category */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                {isEs ? 'Más términos' : 'Browse terms'}
              </h3>
              {(['strategic', 'operational', 'legal', 'latam'] as const).map((catKey) => {
                const terms = allByCategory[catKey] ?? [];
                const meta = CATEGORY_META[catKey];
                return (
                  <div key={catKey} className="mb-4 last:mb-0">
                    <p className={`text-xs font-bold uppercase tracking-wide mb-2 ${meta.color.split(' ').find(c => c.startsWith('text-')) ?? 'text-gray-500'}`}>
                      {meta.icon} {isEs ? meta.labelEs : meta.label}
                    </p>
                    <div className="space-y-1">
                      {terms.map((t) => (
                        <Link
                          key={t.id}
                          href={`/${locale}/glossary/${t.id}`}
                          className={`block text-xs py-1 px-2 rounded transition-colors ${
                            t.id === id
                              ? 'bg-navy-100 text-navy-700 font-bold'
                              : 'text-gray-600 hover:text-navy-700 hover:bg-gray-50'
                          }`}
                        >
                          {isEs ? t.termEs : t.term}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="bg-navy-700 rounded-2xl p-5">
              <p className="text-xs font-bold text-navy-300 uppercase tracking-widest mb-2">
                {isEs ? 'Practicar' : 'Practice'}
              </p>
              <p className="text-sm text-navy-200 leading-relaxed mb-4">
                {isEs
                  ? 'Aplica este concepto en una simulación de crisis real.'
                  : 'Apply this concept in a real crisis simulation.'}
              </p>
              <Link
                href={`/${locale}/cases`}
                className="block text-center text-sm font-bold bg-white text-navy-700 rounded-lg px-4 py-2.5 hover:bg-navy-100 transition-colors"
              >
                {isEs ? 'Elegir un caso →' : 'Choose a case →'}
              </Link>
            </div>
          </div>
        </div>

        {/* ── Prev / Next navigation ───────────────────────────────────────────── */}
        <div className="mt-10 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between gap-4">
          {prevTerm ? (
            <Link
              href={`/${locale}/glossary/${prevTerm.id}`}
              className="flex items-start gap-3 group max-w-xs"
            >
              <span className="text-gray-400 group-hover:text-navy-600 transition-colors text-xl leading-none mt-0.5">←</span>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-0.5">
                  {isEs ? 'Anterior' : 'Previous'}
                </p>
                <p className="text-sm font-bold text-navy-700 group-hover:text-navy-500 transition-colors leading-snug">
                  {isEs ? prevTerm.termEs : prevTerm.term}
                </p>
              </div>
            </Link>
          ) : <div />}

          <Link
            href={`/${locale}/glossary`}
            className="flex items-center gap-1.5 text-sm font-semibold text-navy-500 hover:text-navy-700 transition-colors self-center"
          >
            ↑ {isEs ? 'Ver todo el glosario' : 'All glossary terms'}
          </Link>

          {nextTerm ? (
            <Link
              href={`/${locale}/glossary/${nextTerm.id}`}
              className="flex items-start gap-3 group max-w-xs text-right justify-end"
            >
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-0.5">
                  {isEs ? 'Siguiente' : 'Next'}
                </p>
                <p className="text-sm font-bold text-navy-700 group-hover:text-navy-500 transition-colors leading-snug">
                  {isEs ? nextTerm.termEs : nextTerm.term}
                </p>
              </div>
              <span className="text-gray-400 group-hover:text-navy-600 transition-colors text-xl leading-none mt-0.5">→</span>
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}
