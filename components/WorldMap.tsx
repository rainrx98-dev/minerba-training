'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps';
import type { Case } from '@/lib/case-types';
import type { CaseCoordinate } from '@/lib/case-coordinates';

export interface MapCase {
  caseItem: Case;
  coord: CaseCoordinate;
}

interface WorldMapProps {
  cases: MapCase[];
  locale: string;
}

const GEO_URL = '/world-110m.json';

const PR_COLORS: Record<string, string> = {
  failed: '#ef4444',
  mixed: '#f59e0b',
  effective: '#22c55e',
};

const PR_META: Record<string, { en: string; es: string; bg: string; text: string; border: string }> = {
  failed:    { en: 'Failed',    es: 'Fallido',   bg: 'bg-red-50',   text: 'text-red-700',   border: 'border-red-200' },
  mixed:     { en: 'Mixed',     es: 'Mixto',      bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  effective: { en: 'Effective', es: 'Efectivo',   bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
};

export default function WorldMap({ cases, locale }: WorldMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    caseItem: Case;
    location: string;
  } | null>(null);
  const [selected, setSelected] = useState<{ caseItem: Case; location: string } | null>(null);
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState<[number, number]>([0, 20]);
  const isEs = locale === 'es';

  function handleMouseEnter(e: React.MouseEvent, caseItem: Case, location: string) {
    if (selected) return; // don't show tooltip when panel is open
    const rect = containerRef.current?.getBoundingClientRect();
    const x = rect ? e.clientX - rect.left : e.clientX;
    const y = rect ? e.clientY - rect.top : e.clientY;
    setTooltip({ x, y, caseItem, location });
  }

  function handleClick(caseItem: Case, location: string) {
    setTooltip(null);
    setSelected((prev) =>
      prev?.caseItem.id === caseItem.id ? null : { caseItem, location }
    );
  }

  const containerWidth = containerRef.current?.offsetWidth ?? 600;
  const prInfo = selected ? PR_META[selected.caseItem.pr_rating] : null;

  return (
    <div ref={containerRef} className="relative w-full select-none">

      {/* ── Zoom controls ────────────────────────────────────────────────────── */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-1.5">
        <button
          onClick={() => setZoom((z) => Math.min(z * 1.5, 8))}
          className="w-9 h-9 bg-navy-700 text-white rounded-xl shadow-lg hover:bg-navy-600 flex items-center justify-center text-lg font-bold transition-colors"
          title="Zoom in"
        >+</button>
        <button
          onClick={() => setZoom((z) => Math.max(z / 1.5, 1))}
          className="w-9 h-9 bg-navy-700 text-white rounded-xl shadow-lg hover:bg-navy-600 flex items-center justify-center text-xl font-bold transition-colors"
          title="Zoom out"
        >−</button>
        <button
          onClick={() => { setZoom(1); setCenter([0, 20]); setSelected(null); }}
          className="w-9 h-9 bg-white border border-gray-200 text-gray-500 rounded-xl shadow-sm hover:bg-gray-50 flex items-center justify-center text-base transition-colors"
          title="Reset view"
        >↺</button>
      </div>

      {/* ── Hover tooltip ────────────────────────────────────────────────────── */}
      {tooltip && (
        <div
          className="absolute z-20 bg-white border border-gray-150 rounded-xl shadow-2xl p-3.5 w-56 pointer-events-none"
          style={{
            left: Math.min(tooltip.x + 16, containerWidth - 240),
            top: Math.max(tooltip.y - 52, 8),
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: PR_COLORS[tooltip.caseItem.pr_rating] }}
            />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              {tooltip.caseItem.id.replace('case-', '')} · {tooltip.caseItem.year}
            </span>
          </div>
          <p className="text-sm font-bold text-navy-700 leading-snug mb-1">
            {tooltip.caseItem.title}
          </p>
          <p className="text-xs text-gray-500 mb-0.5">📍 {tooltip.location}</p>
          <p className="text-xs text-gray-400">{tooltip.caseItem.company}</p>
          <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center gap-1">
            <span className="text-[11px] font-semibold text-navy-500">
              {isEs ? 'Clic para ver' : 'Click to view'}
            </span>
            <span className="text-[11px] text-navy-400">→</span>
          </div>
        </div>
      )}

      {/* ── Map ──────────────────────────────────────────────────────────────── */}
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 130 }}
        style={{ width: '100%', height: 'auto', background: '#EAF3FB' }}
      >
        <ZoomableGroup
          zoom={zoom}
          center={center}
          onMoveEnd={({ zoom: z, coordinates }) => {
            setZoom(z);
            setCenter(coordinates as [number, number]);
          }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#D5E6F2"
                  stroke="#AECADE"
                  strokeWidth={0.4}
                  style={{
                    default: { outline: 'none' },
                    hover:   { fill: '#BDD5EB', outline: 'none' },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>

          {cases.map(({ caseItem, coord }) => {
            const color = PR_COLORS[caseItem.pr_rating] ?? '#6b7280';
            const location = isEs ? coord.locationEs : coord.location;
            const isSelected = selected?.caseItem.id === caseItem.id;

            return (
              <Marker
                key={caseItem.id}
                coordinates={[coord.lng, coord.lat]}
                onMouseEnter={(e) => handleMouseEnter(e, caseItem, location)}
                onMouseLeave={() => setTooltip(null)}
                onClick={() => handleClick(caseItem, location)}
              >
                {/* Glow ring */}
                <circle
                  r={isSelected ? 13 : 9}
                  fill={color}
                  fillOpacity={isSelected ? 0.30 : 0.16}
                  stroke={isSelected ? color : 'none'}
                  strokeWidth={isSelected ? 1 : 0}
                  strokeOpacity={0.5}
                />
                {/* Main dot */}
                <circle
                  r={isSelected ? 6.5 : 5}
                  fill={color}
                  stroke="white"
                  strokeWidth={isSelected ? 2 : 1.5}
                  style={{ cursor: 'pointer' }}
                />
              </Marker>
            );
          })}
        </ZoomableGroup>
      </ComposableMap>

      {/* ── Selected case panel ──────────────────────────────────────────────── */}
      {selected && prInfo && (
        <div className="absolute bottom-4 left-4 right-16 md:left-auto md:right-16 md:w-72 z-20 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Top accent bar */}
          <div
            className="h-1.5"
            style={{ backgroundColor: PR_COLORS[selected.caseItem.pr_rating] }}
          />

          <div className="p-4 relative">
            {/* Close button */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 w-6 h-6 text-gray-400 hover:text-gray-700 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-xs leading-none"
              aria-label="Close"
            >✕</button>

            {/* Case ID + PR rating badge */}
            <div className="flex items-center gap-2 mb-2 pr-7">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                {selected.caseItem.id.replace('case-', '')} · {selected.caseItem.year}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${prInfo.bg} ${prInfo.text} ${prInfo.border}`}>
                {isEs ? prInfo.es : prInfo.en}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-sm font-bold text-navy-700 leading-snug mb-2">
              {selected.caseItem.title}
            </h3>

            {/* Location + company */}
            <p className="text-xs text-gray-500 mb-0.5">📍 {selected.location}</p>
            <p className="text-xs text-gray-400">{selected.caseItem.company}</p>

            {/* Tags */}
            {selected.caseItem.tags && selected.caseItem.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2.5">
                {selected.caseItem.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* CTA buttons */}
            <div className="flex gap-2 mt-3.5">
              <Link
                href={`/${locale}/cases/${selected.caseItem.id}`}
                className="flex-1 text-center text-xs font-bold bg-navy-700 text-white py-2.5 rounded-xl hover:bg-navy-600 transition-colors"
              >
                {isEs ? 'Ver caso' : 'View case'}
              </Link>
              <Link
                href={`/${locale}/quiz/${selected.caseItem.id}`}
                className="flex-1 text-center text-xs font-bold bg-amber-50 border border-amber-200 text-amber-700 py-2.5 rounded-xl hover:bg-amber-100 transition-colors"
              >
                ⚡ {isEs ? 'Simular' : 'Simulate'}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
