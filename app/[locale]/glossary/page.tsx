import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { GLOSSARY } from '@/lib/glossary';
import GlossaryBrowser from '@/components/GlossaryBrowser';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: locale === 'es' ? 'Glosario de Crisis' : 'Crisis Communications Glossary',
    description:
      locale === 'es'
        ? `${GLOSSARY.length} términos clave de comunicaciones de crisis con definiciones bilingües, contexto LATAM y vínculos a casos.`
        : `${GLOSSARY.length} essential crisis communications terms with bilingual definitions, LATAM context, and links to cases.`,
  };
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }];
}

export default async function GlossaryPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const isEs = locale === 'es';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page header */}
      <div className="bg-navy-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <span className="text-xs font-bold text-navy-300 uppercase tracking-widest mb-2 block">
            {isEs ? 'Referencia' : 'Reference'}
          </span>
          <h1 className="text-3xl font-bold text-white mb-2">
            {isEs ? 'Glosario de Crisis' : 'Crisis Communications Glossary'}
          </h1>
          <p className="text-navy-300 text-sm max-w-2xl leading-relaxed">
            {isEs
              ? `${GLOSSARY.length} términos clave de comunicaciones de crisis — con definiciones bilingües, contexto LATAM y vínculos a casos del dataset.`
              : `${GLOSSARY.length} essential crisis communications terms — bilingual definitions, LATAM context, and links to cases in the dataset.`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <GlossaryBrowser locale={locale} />
      </div>
    </div>
  );
}
