'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to the console in development
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-auto px-6 text-center">
        {/* Icon */}
        <div className="text-5xl mb-5">⚠️</div>

        <h1 className="text-2xl font-bold text-navy-700 mb-3">
          Something went wrong
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-xs mx-auto">
          An unexpected error occurred. You can try again, or navigate back to
          the main platform.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 bg-navy-700 text-white font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-navy-800 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/en"
            className="inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-600 font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-white transition-colors"
          >
            ← Back to home
          </Link>
        </div>

        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
            <p className="text-xs font-bold text-red-600 uppercase tracking-wide mb-1">
              Error details (dev only)
            </p>
            <p className="text-xs text-red-700 font-mono break-all">{error.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
