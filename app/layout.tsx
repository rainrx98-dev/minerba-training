import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'MINERBA — Crisis Intelligence Training',
    template: '%s · MINERBA',
  },
  description:
    '38 real PR crises across energy, mining, and healthcare — bilingual simulations, AI-powered debriefs, and LatAm-adapted frameworks for Minerba consultants.',
  keywords: [
    'crisis communications', 'PR training', 'energy sector', 'mining', 'healthcare',
    'Latin America', 'Minerba', 'crisis management', 'corporate communications'
  ],
  openGraph: {
    type: 'website',
    siteName: 'MINERBA Crisis Intelligence Training',
    title: 'MINERBA — Crisis Intelligence Training',
    description: '38 real PR crises. AI simulations. LatAm-adapted frameworks.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
