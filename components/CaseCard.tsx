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
    <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex">
      {/* Left accent bar — PR rating colour */}
      <div
        className={clsx(
          'w-1.5 shrink-0',
          caseItem.pr_rating === 'failed'
            ? 'bg-crisis-red'
            : caseItem.pr_rating === 'mixed'
              ? 'bg-crisis-amber'
              : 'bg-crisis-green'
        )}
      />

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Top meta row */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-1.5">
            <span className="bg-navy-700 text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wider">
              {caseItem.id}
            </span>
            {isLatam && (
              <span className="bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-200 tracking-wider">
                LATAM
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/${locale}/industry/${industryId}`}
              className="text-base hover:opacity-70 transition-opacity"
              title={industryLabel}
            >
              {industryIcon}
            </Link>
            <span className="text-xs font-bold text-gray-300 tabular-nums">{caseItem.year}</span>
          </div>
        </div>

        {/* Company (micro-label) */}
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
          {caseItem.company}
        </p>

        {/* Title */}
        <h3 className="text-sm font-bold text-navy-700 leading-snug mb-3 group-hover:text-navy-500 transition-colors">
          {caseItem.title}
        </h3>

        {/* Summary */}
        <p className="text-xs text-gray-500 leading-relaxed mb-4 flex-1 line-clamp-3">
          {caseItem.summary}
        </p>

        {/* Crisis type chips */}
        <div className="flex flex-wrap gap-1 mb-3">
          {caseItem.crisis_type.slice(0, 2).map((ct) => (
            <span
              key={ct}
              className="text-[10px] font-medium text-gray-500 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-200"
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
        <div className="flex gap-2 pt-3 border-t border-gray-100">
          <Link
            href={`/${locale}/cases/${caseItem.id}`}
            className="flex-1 text-center text-xs font-bold bg-navy-700 text-white py-2.5 px-3 rounded-lg hover:bg-navy-600 transition-colors"
          >
            {readLabel}
          </Link>
          <Link
            href={`/${locale}/quiz/${caseItem.id}`}
            className="flex-1 text-center text-xs font-bold text-amber-700 py-2.5 px-3 rounded-lg bg-amber-50 border border-amber-200 hover:bg-amber-100 transition-colors"
          >
            ⚡ {quizLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
