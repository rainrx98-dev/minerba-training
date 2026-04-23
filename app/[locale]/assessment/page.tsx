import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import AssessmentTool from '@/components/AssessmentTool';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title:
      locale === 'es'
        ? 'Evaluación de Preparación para Crisis — MINERBA'
        : 'Crisis Readiness Assessment — MINERBA',
    description:
      locale === 'es'
        ? '12 preguntas · 4 minutos · Obtenga su puntuación de preparación para crisis y recomendaciones personalizadas de MINERBA.'
        : '12 questions · 4 minutes · Get your crisis readiness score and personalised MINERBA recommendations.',
  };
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }];
}

export default async function AssessmentPage({
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
            {isEs ? 'Herramienta de Diagnóstico' : 'Diagnostic Tool'}
          </span>
          <h1 className="text-3xl font-bold text-white mb-2">
            {isEs ? 'Evaluación de Preparación para Crisis' : 'Crisis Readiness Assessment'}
          </h1>
          <p className="text-navy-300 text-sm max-w-2xl leading-relaxed">
            {isEs
              ? '12 preguntas · 4 dimensiones · 4 minutos. Identifique las brechas de preparación de su organización y reciba recomendaciones de servicios MINERBA adaptadas a su perfil.'
              : '12 questions · 4 dimensions · 4 minutes. Identify your organisation\'s preparedness gaps and receive MINERBA service recommendations tailored to your profile.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <AssessmentTool locale={locale} />
      </div>
    </div>
  );
}
