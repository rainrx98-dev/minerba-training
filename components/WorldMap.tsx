'use client';

import { useState, useRef } from 'react';
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

export default function WorldMap({ cases, locale }: WorldMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    caseItem: Case;
    location: string;
  } | null>(null);
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState<[number, number]>([0, 20]);
  const isEs = locale === 'es';

  function handleMouseEnter(
    e: React.MouseEvent,
    caseItem: Case,
    location: string,
  ) {
    const rect = containerRef.current?.getBoundingClientRect();
    const x = rect ? e.clientX - rect.left : e.clientX;
    const y = rect ? e.clientY - rect.top : e.clientY;
    setTooltip({ x, y, caseItem, location });
  }

  return (
    <div ref={containerRef} className="relative w-full select-none">
      {/* Zoom controls */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1">
        <button
          onClick={() => setZoom((z) => Math.min(z * 1.5, 8))}
          className="w-8 h-8 bg-white border border-gray-300 rounded shadow text-lg font-bold text-gray-700 hover:bg-gray-50 flex items-center justify-center"
          title="Zoom in"
        >
          +
        </button>
        <button
          onClick={() => setZoom((z) => Math.max(z / 1.5, 1))}
          className="w-8 h-8 bg-white border border-gray-300 rounded shadow text-lg font-bold text-gray-700 hover:bg-gray-50 flex items-center justify-center"
          title="Zoom out"
        >
          −
        </button>
        <button
          onClick={() => { setZoom(1); setCenter([0, 20]); }}
          className="w-8 h-8 bg-white border border-gray-300 rounded shadow text-xs font-bold text-gray-500 hover:bg-gray-50 flex items-center justify-center"
          title="Reset view"
        >
          ↺
        </button>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute z-20 bg-white border border-gray-200 rounded-lg shadow-lg p-3 w-52 pointer-events-none"
          style={{
            left: tooltip.x + 14,
            top: Math.max(tooltip.y - 40, 8),
          }}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: PR_COLORS[tooltip.caseItem.pr_rating] }}
            />
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
              {tooltip.caseItem.id.replace('case-', '').toUpperCase()}
            </span>
          </div>
          <p className="text-xs font-bold text-navy-700 leading-snug mb-0.5">
            {tooltip.caseItem.title}
          </p>
          <p className="text-xs text-gray-500">📍 {tooltip.location}</p>
          <p className="text-xs text-gray-400 mt-0.5">
            {tooltip.caseItem.company} · {tooltip.caseItem.year}
          </p>
          <p className="text-xs text-navy-500 font-semibold mt-1.5">
            {isEs ? 'Clic para ver el caso →' : 'Click to view case →'}
          </p>
        </div>
      )}

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 130 }}
        style={{ width: '100%', height: 'auto' }}
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
                  fill="#E2EAF4"
                  stroke="#C8D6E8"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: 'none' },
                    hover: { fill: '#C8D6E8', outline: 'none' },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>

          {cases.map(({ caseItem, coord }) => {
            const color = PR_COLORS[caseItem.pr_rating] ?? '#6b7280';
            const caseHref = `/${locale}/cases/${caseItem.id}`;
            const location = isEs ? coord.locationEs : coord.location;

            return (
              <Marker
                key={caseItem.id}
                coordinates={[coord.lng, coord.lat]}
                onMouseEnter={(e) => handleMouseEnter(e, caseItem, location)}
                onMouseLeave={() => setTooltip(null)}
                onClick={() => { window.location.href = caseHref; }}
              >
                {/* Outer glow ring */}
                <circle r={8} fill={color} fillOpacity={0.2} stroke="none" />
                {/* Main dot */}
                <circle
                  r={5}
                  fill={color}
                  stroke="white"
                  strokeWidth={1.5}
                  style={{ cursor: 'pointer' }}
                />
                {/* ID label above marker */}
                <text
                  textAnchor="middle"
                  y={-9}
                  style={{
                    fontSize: 6.5,
                    fontWeight: 700,
                    fill: '#1e3a5f',
                    pointerEvents: 'none',
                    userSelect: 'none',
                  }}
                >
                  {caseItem.id.replace('case-', '').toUpperCase()}
                </text>
              </Marker>
            );
          })}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}
