import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getAllCases } from '@/lib/cases';
import CaseBrowser from '@/components/CaseBrowser';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return {
    title: locale === 'es' ? 'Casos de Estudio' : 'Case Studies',
    description: locale === 'es'
      ? '38 crisis emblemáticas en energía, minería y salud. Filtre por industria, región o calificación PR.'
      : '38 landmark crises across energy, mining, and healthcare. Filter by industry, region, or PR outcome.',
  };
}

export default async function CasesPage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string };
  searchParams: { industry?: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('cases');
  const cases = getAllCases();
  const VALID_INDUSTRIES = ['energy', 'mining', 'healthcare'];
  const initialIndustry = searchParams?.industry && VALID_INDUSTRIES.includes(searchParams.industry)
    ? searchParams.industry
    : undefined;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page header */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-3 font-medium uppercase tracking-wide">
          <span>MINERBA</span>
          <span>›</span>
          <span>{t('title')}</span>
        </div>
        <h1 className="text-3xl font-bold text-navy-700 mb-2">{t('title')}</h1>
        <p className="text-gray-500 max-w-2xl">{t('subtitle')}</p>
      </div>

      <CaseBrowser cases={cases} locale={locale} initialIndustry={initialIndustry} />
    </div>
  );
}
