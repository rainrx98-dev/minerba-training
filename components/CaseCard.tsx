import Link from 'next/link';
import clsx from 'clsx';
import PRRatingBadge from './PRRatingBadge';
import type { Case, Industry } from '@/lib/case-types';
import { CRISIS_TYPE_LABELS, CRISIS_TYPE_LABELS_ES, INDUSTRY_ICONS, INDUSTRY_LABELS, INDUSTRY_LABELS_ES } from '@/lib/case-types';

interface CaseCardProps {
  caseItem: Case;
  locale: string;
  readLabel?: string;
  quizLabel?: string;
}

export default function CaseCard({
  caseItem,
  locale,
  readLabel = 'Read Case',
  quizLabel = 'Simulate',
}: CaseCardProps) {
  const isLatam = caseItem.region === 'latin-america';
  const industryId: Industry = caseItem.industry ?? 'energy';
  const industryIcon = INDUSTRY_ICONS[industryId];
  const industryLabel = locale === 'es' ? INDUSTRY_LABELS_ES[industryId] : INDUSTRY_LABELS[industryId];
  const ctLabels = locale === 'es' ? CRISIS_TYPE_LABELS_ES : CRISIS_TYPE_LABELS;

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col">
      {/* Header stripe */}
      <div
        className={clsx(
          'h-1 w-full',
          caseItem.pr_rating === 'failed'
            ? 'bg-crisis-red'
            : caseItem.pr_rating === 'mixed'
              ? 'bg-crisis-amber'
              : 'bg-crisis-green'
        )}
      />

      <div className="p-5 flex flex-col flex-1">
        {/* Top meta row */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="inline-block bg-navy-700 text-white text-xs font-bold px-2 py-0.5 rounded">
              {caseItem.id}
            </span>
            <Link
              href={`/${locale}/industry/${industryId}`}
              className="text-sm hover:opacity-70 transition-opacity"
              title={industryLabel}
            >
              {industryIcon}
            </Link>
            {isLatam && (
              <span className="inline-block bg-gold text-white text-xs font-semibold px-2 py-0.5 rounded">
                LATAM
              </span>
            )}
          </div>
          <span className="text-xs text-gray-400 whitespace-nowrap">{caseItem.year}</span>
        </div>

        {/* Title & company */}
        <h3 className="text-sm font-bold text-navy-700 mb-0.5 leading-snug">{caseItem.title}</h3>
        <p className="text-xs text-gray-500 mb-3">{caseItem.company}</p>

        {/* Summary */}
        <p className="text-xs text-gray-600 leading-relaxed mb-4 flex-1 line-clamp-3">
          {caseItem.summary}
        </p>

        {/* Crisis type chips */}
        <div className="flex flex-wrap gap-1 mb-3">
          {caseItem.crisis_type.slice(0, 2).map((ct) => (
            <span
              key={ct}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded border border-gray-200"
            >
              {ctLabels[ct] ?? ct}
            </span>
          ))}
        </div>

        {/* PR Rating */}
        <div className="mb-4">
          <PRRatingBadge rating={caseItem.pr_rating} size="sm" locale={locale} />
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-auto">
          <Link
            href={`/${locale}/cases/${caseItem.id}`}
            className="flex-1 text-center text-xs font-semibold bg-navy-500 text-white py-2 px-3 rounded hover:bg-navy-600 transition-colors"
          >
            {readLabel}
          </Link>
          <Link
            href={`/${locale}/quiz/${caseItem.id}`}
            className="flex-1 text-center text-xs font-semibold border border-navy-500 text-navy-500 py-2 px-3 rounded hover:bg-navy-50 transition-colors"
          >
            {quizLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
