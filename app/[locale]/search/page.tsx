import type { Metadata } from 'next';
import { Suspense } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { getAllCases } from '@/lib/cases';
import SearchClient from '@/components/SearchClient';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: locale === 'es' ? 'Búsqueda Global — MINERBA' : 'Global Search — MINERBA',
    description: locale === 'es'
      ? 'Busca en toda la plataforma MINERBA: casos, marcos, glosario y rutas de aprendizaje.'
      : 'Search the entire MINERBA platform: cases, frameworks, glossary, and learning paths.',
  };
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }];
}

export default async function SearchPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const allCases = getAllCases();

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-400 text-sm">Loading search…</div>
      </div>
    }>
      <SearchClient locale={locale} cases={allCases} />
    </Suspense>
  );
}
