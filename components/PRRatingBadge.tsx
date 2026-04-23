import clsx from 'clsx';

interface PRRatingBadgeProps {
  rating: 'failed' | 'mixed' | 'effective';
  size?: 'sm' | 'md';
  locale?: string;
}

const RATING_CONFIG = {
  failed: {
    label: 'Failed Response',
    labelEs: 'Respuesta Fallida',
    icon: '✕',
    classes: 'bg-crisis-redLight text-crisis-red border border-red-200',
  },
  mixed: {
    label: 'Mixed / Partial Recovery',
    labelEs: 'Respuesta Mixta',
    icon: '~',
    classes: 'bg-crisis-amberLight text-crisis-amber border border-amber-200',
  },
  effective: {
    label: 'Effective Response',
    labelEs: 'Respuesta Efectiva',
    icon: '✓',
    classes: 'bg-crisis-greenLight text-crisis-green border border-green-200',
  },
};

export default function PRRatingBadge({ rating, size = 'md', locale }: PRRatingBadgeProps) {
  const config = RATING_CONFIG[rating];
  const label = locale === 'es' ? config.labelEs : config.label;
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded font-semibold',
        config.classes,
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs'
      )}
    >
      <span className="font-bold">{config.icon}</span>
      {label}
    </span>
  );
}
