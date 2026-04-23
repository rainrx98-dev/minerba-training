import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import Nav from '@/components/Nav';
import Image from 'next/image';
import Link from 'next/link';
import '@/app/globals.css';

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }];
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="min-h-screen bg-gray-50 font-sans">
        <Nav locale={locale} />
        <main>{children}</main>
        <footer className="border-t border-navy-800 bg-navy-700 mt-16">
          <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* Brand */}
              <div>
                <Image
                  src="/logo-minerba-white.png"
                  alt="MINERBA"
                  width={120}
                  height={22}
                  className="object-contain mb-3"
                />
                <p className="text-xs text-navy-300 leading-relaxed max-w-xs">
                  {locale === 'es'
                    ? 'Plataforma de entrenamiento en comunicaciones de crisis para consultores de Minerba.'
                    : 'Crisis communications training platform for Minerba consultants.'}
                </p>
              </div>

              {/* Quick links */}
              <div>
                <p className="text-xs font-bold text-navy-400 uppercase tracking-widest mb-3">
                  {locale === 'es' ? 'Navegación' : 'Navigation'}
                </p>
                <div className="space-y-2">
                  {[
                    { href: `/${locale}/services`, label: locale === 'es' ? 'Servicios' : 'Services' },
                    { href: `/${locale}/learning`, label: locale === 'es' ? '🎓 Rutas de Aprendizaje' : '🎓 Learning Paths' },
                    { href: `/${locale}/cases`, label: locale === 'es' ? 'Casos de Estudio' : 'Case Studies' },
                    { href: `/${locale}/map`, label: locale === 'es' ? 'Mapa de Crisis' : 'Crisis Map' },
                    { href: `/${locale}/frameworks`, label: locale === 'es' ? 'Marcos de Trabajo' : 'Frameworks' },
                    { href: `/${locale}/glossary`, label: locale === 'es' ? 'Glosario' : 'Glossary' },
                    { href: `/${locale}/stats`, label: locale === 'es' ? 'Estadísticas' : 'Dataset Stats' },
                    { href: `/${locale}/personas`, label: locale === 'es' ? '🎭 Adversarios de Simulación' : '🎭 Simulation Adversaries' },
                    { href: `/${locale}/assessment`, label: locale === 'es' ? '⚡ Diagnóstico de Preparación' : '⚡ Readiness Assessment' },
                    { href: `/${locale}/search`, label: locale === 'es' ? '🔍 Búsqueda Global' : '🔍 Global Search' },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block text-xs text-navy-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Industries */}
              <div>
                <p className="text-xs font-bold text-navy-400 uppercase tracking-widest mb-3">
                  {locale === 'es' ? 'Industrias' : 'Industries'}
                </p>
                <div className="space-y-2">
                  {[
                    { id: 'energy', label: locale === 'es' ? '⛽ Energía & Petróleo' : '⛽ Energy & Oil' },
                    { id: 'mining', label: locale === 'es' ? '⛏ Minería' : '⛏ Mining' },
                    { id: 'healthcare', label: locale === 'es' ? '🏥 Salud' : '🏥 Healthcare' },
                  ].map((ind) => (
                    <Link
                      key={ind.id}
                      href={`/${locale}/industry/${ind.id}`}
                      className="block text-xs text-navy-300 hover:text-white transition-colors"
                    >
                      {ind.label}
                    </Link>
                  ))}
                </div>
              </div>

            </div>

            <div className="border-t border-navy-600 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-navy-400">
                {locale === 'es'
                  ? '© 2026 Minerba Comunicación Corporativa · Proyecto de Consultoría Rice Jones MBA'
                  : '© 2026 Minerba Comunicación Corporativa · Rice Jones MBA Consulting Project'}
              </p>
              <div className="flex items-center gap-4">
                <span className="text-xs text-navy-500">38 {locale === 'es' ? 'casos · 3 industrias · 2 idiomas' : 'cases · 3 industries · 2 languages'}</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </NextIntlClientProvider>
  );
}
