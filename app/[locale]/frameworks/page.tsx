import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { FRAMEWORKS, CATEGORY_META } from '@/lib/frameworks';
import FrameworksFilter from '@/components/FrameworksFilter';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return {
    title: locale === 'es' ? 'Marcos de Trabajo' : 'Frameworks',
    description: locale === 'es'
      ? '14 marcos de comunicación de crisis — académicos, estándares internacionales y protocolos operacionales para América Latina.'
      : '14 crisis communications frameworks — academic, industry standards, and operational protocols for Latin America.',
  };
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }];
}

export default async function FrameworksPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const isEs = locale === 'es';

  // Summary counts
  const counts = {
    academic: FRAMEWORKS.filter((f) => f.category === 'academic').length,
    industry: FRAMEWORKS.filter((f) => f.category === 'industry').length,
    operational: FRAMEWORKS.filter((f) => f.category === 'operational').length,
    latam: FRAMEWORKS.filter((f) => f.category === 'latam').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-navy-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-navy-300 uppercase tracking-widest mb-3 block">
              {isEs ? 'Biblioteca de Marcos' : 'Frameworks Library'}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
              {isEs
                ? 'Marcos de Crisis y Estándares de la Industria'
                : 'Crisis Frameworks & Industry Standards'}
            </h1>
            <p className="text-navy-300 text-base leading-relaxed max-w-2xl">
              {isEs
                ? 'Los marcos académicos, estándares internacionales y protocolos operacionales que definen la práctica de comunicaciones de crisis en los sectores extractivos. Organizados para uso inmediato en el campo.'
                : 'The academic frameworks, international standards, and operational protocols that define crisis communications practice in extractive sectors. Organised for immediate field use.'}
            </p>

            {/* Category summary chips */}
            <div className="flex flex-wrap gap-3 mt-6">
              {(Object.keys(counts) as Array<keyof typeof counts>).map((cat) => {
                const meta = CATEGORY_META[cat];
                return (
                  <div
                    key={cat}
                    className="flex items-center gap-2 bg-navy-600 border border-navy-500 rounded-lg px-3 py-1.5"
                  >
                    <span className="text-base">{meta.icon}</span>
                    <span className="text-xs font-semibold text-navy-200">
                      {isEs ? meta.labelEs : meta.label}
                    </span>
                    <span className="text-xs font-bold text-white bg-navy-500 rounded-full px-1.5">
                      {counts[cat]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Usage guidance strip */}
      <div className="bg-amber-50 border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-bold">
              {isEs ? '💡 Cómo usar esta biblioteca: ' : '💡 How to use this library: '}
            </span>
            {isEs
              ? 'Selecciona una categoría para filtrar. Haz clic en cualquier marco para expandir los principios clave. Los casos relacionados enlazan directamente al estudio de caso y la simulación.'
              : 'Select a category to filter. Click any framework to expand the key principles. Related cases link directly to the case study and simulation.'}
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Left sidebar — quick reference */}
          <aside className="hidden lg:block w-60 shrink-0">
            <div className="sticky top-24 space-y-4">

              {/* Category quick links */}
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-navy-500 px-4 py-2.5">
                  <p className="text-xs font-bold text-white uppercase tracking-wide">
                    {isEs ? 'Categorías' : 'Categories'}
                  </p>
                </div>
                <div className="p-3 space-y-1">
                  {(Object.keys(CATEGORY_META) as Array<keyof typeof CATEGORY_META>).map((cat) => {
                    const meta = CATEGORY_META[cat];
                    return (
                      <div key={cat} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{meta.icon}</span>
                          <span className="text-xs text-gray-700">
                            {isEs ? meta.labelEs : meta.label}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-navy-600 bg-navy-50 rounded-full px-2 py-0.5">
                          {counts[cat]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick definition card */}
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                  {isEs ? 'Nota de Uso' : 'Usage Note'}
                </p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {isEs
                    ? 'Los marcos académicos explican el por qué. Los estándares de la industria definen el mínimo. Los protocolos operacionales le dicen cómo. Los marcos de LATAM adaptan todo lo anterior al contexto regional.'
                    : 'Academic frameworks explain the why. Industry standards define the minimum. Operational protocols tell you how. LATAM frameworks adapt all of the above to the regional context.'}
                </p>
              </div>

              {/* Simulate CTA */}
              <div className="bg-navy-500 rounded-xl p-4 text-white">
                <p className="text-xs font-bold uppercase tracking-wide mb-1 text-navy-200">
                  {isEs ? 'Poner a Prueba' : 'Put It to the Test'}
                </p>
                <p className="text-xs text-navy-300 leading-relaxed mb-3">
                  {isEs
                    ? 'Los marcos solo cobran vida en la práctica. Inicia una simulación.'
                    : 'Frameworks only come alive in practice. Run a simulation.'}
                </p>
                <a
                  href={`/${locale}/cases`}
                  className="block text-center text-xs font-bold bg-white text-navy-700 rounded-lg px-3 py-2 hover:bg-navy-50 transition-colors"
                >
                  {isEs ? 'Elegir un caso →' : 'Choose a case →'}
                </a>
              </div>
            </div>
          </aside>

          {/* Right: filterable framework list */}
          <main className="flex-1 min-w-0">
            <FrameworksFilter locale={locale} />
          </main>
        </div>
      </div>
    </div>
  );
}
