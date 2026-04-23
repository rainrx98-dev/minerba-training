import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-auto px-6 text-center">
        {/* Error code */}
        <div className="text-8xl font-black text-navy-200 leading-none mb-4 select-none">
          404
        </div>

        {/* Icon */}
        <div className="text-5xl mb-5">🗺</div>

        <h1 className="text-2xl font-bold text-navy-700 mb-3">
          Page not found
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-xs mx-auto">
          This page doesn&apos;t exist in the MINERBA dataset. It may have been moved,
          or you may have followed a broken link.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/en"
            className="inline-flex items-center justify-center gap-2 bg-navy-700 text-white font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-navy-800 transition-colors"
          >
            ← Back to home
          </Link>
          <Link
            href="/en/cases"
            className="inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-600 font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-white transition-colors"
          >
            Browse 38 cases →
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-10 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-widest mb-4">
            Popular destinations
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { href: '/en/cases',      label: '📂 Cases' },
              { href: '/en/frameworks', label: '🛡 Frameworks' },
              { href: '/en/glossary',   label: '📖 Glossary' },
              { href: '/en/map',        label: '🗺 Crisis Map' },
              { href: '/en/learning',   label: '🎓 Learning Paths' },
              { href: '/en/search',     label: '🔍 Search' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-xs text-navy-600 border border-navy-200 bg-navy-50 hover:bg-navy-100 px-3 py-1.5 rounded-lg font-medium transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
