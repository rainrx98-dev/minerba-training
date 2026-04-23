'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface NavProps {
  locale: string;
}

interface DropItem {
  href: string;
  icon: string;
  label: string;
  labelEs: string;
  desc: string;
  descEs: string;
}

const CASES_ITEMS: DropItem[] = [
  { href: '/cases',    icon: '📂', label: 'Case Studies',  labelEs: 'Casos de Estudio', desc: '38 landmark crises — energy, mining, healthcare',    descEs: '38 crisis emblemáticas — energía, minería, salud' },
  { href: '/map',      icon: '🗺', label: 'Crisis Map',    labelEs: 'Mapa de Crisis',   desc: 'Geographic view of every case in the dataset',       descEs: 'Vista geográfica de todos los casos del dataset' },
  { href: '/stats',    icon: '📊', label: 'Dataset Stats', labelEs: 'Estadísticas',     desc: 'Industry, region, and PR outcome breakdowns',         descEs: 'Distribución por industria, región y resultado PR' },
];

const REFERENCE_ITEMS: DropItem[] = [
  { href: '/frameworks', icon: '🛡', label: 'Frameworks',     labelEs: 'Marcos',           desc: '14 crisis communication frameworks with detail pages', descEs: '14 marcos de crisis con páginas de detalle' },
  { href: '/glossary',   icon: '📖', label: 'Glossary',       labelEs: 'Glosario',         desc: '24 essential terms — bilingual definitions',           descEs: '24 términos esenciales — definiciones bilingües' },
  { href: '/learning',   icon: '🎓', label: 'Learning Paths', labelEs: 'Rutas',            desc: '5 curated case sequences for deliberate practice',     descEs: '5 secuencias curadas para formación deliberada' },
];

const SIMULATE_ITEMS: DropItem[] = [
  { href: '/personas',   icon: '🎭', label: 'Simulation Personas', labelEs: 'Adversarios', desc: '5 AI stakeholder profiles — know them before you face them', descEs: '5 perfiles IA — conócelos antes de enfrentarlos' },
  { href: '/assessment', icon: '⚡', label: 'Readiness Assessment', labelEs: 'Diagnóstico', desc: '12-question diagnostic · 0–100 readiness score',           descEs: '12 preguntas · puntuación de preparación 0–100' },
];

export default function Nav({ locale }: NavProps) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [openDrop, setOpenDrop] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Cmd+K / Ctrl+K → open search
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        router.push(`/${locale}/search`);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [locale, router]);

  // Close dropdown only when clicking OUTSIDE the nav — never interrupt
  // clicks on the dropdown links themselves.
  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDrop(null);
      }
    }
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, []);

  function switchLocale() {
    const targetLocale = locale === 'en' ? 'es' : 'en';
    const segments = pathname.split('/');
    segments[1] = targetLocale;
    router.push(segments.join('/'));
  }

  function isActive(path: string) {
    const full = `/${locale}${path}`;
    return pathname.startsWith(full);
  }

  function groupActive(items: DropItem[]) {
    return items.some((item) => isActive(item.href));
  }

  function openDropdown(id: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDrop(id);
  }

  function scheduleClose() {
    closeTimer.current = setTimeout(() => setOpenDrop(null), 300);
  }

  const isEs = locale === 'es';
  const homeActive = pathname === `/${locale}` || pathname === `/${locale}/`;
  const servicesActive = isActive('/services');
  const assessmentActive = isActive('/assessment');

  return (
    <nav ref={navRef} className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ──────────────────────────────────────────────── */}
          <Link href={`/${locale}`} className="flex items-center gap-3 shrink-0">
            <Image
              src="/logo-minerba-color.png"
              alt="MINERBA"
              width={120}
              height={22}
              priority
              className="object-contain"
            />
            <span className="hidden lg:block text-xs font-medium text-gray-400 border-l border-gray-200 pl-3 leading-tight">
              Crisis Intelligence<br />Training
            </span>
          </Link>

          {/* ── Desktop nav ───────────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-0.5" onMouseLeave={scheduleClose}>

            {/* Home */}
            <NavLink href={`/${locale}`} active={homeActive}>
              {t('home')}
            </NavLink>

            {/* Cases dropdown */}
            <DropTrigger
              id="cases"
              label={isEs ? 'Casos' : 'Cases'}
              active={groupActive(CASES_ITEMS)}
              open={openDrop === 'cases'}
              onEnter={() => openDropdown('cases')}
              onLeave={scheduleClose}
            >
              {CASES_ITEMS.map((item) => (
                <DropLink
                  key={item.href}
                  href={`/${locale}${item.href}`}
                  icon={item.icon}
                  label={isEs ? item.labelEs : item.label}
                  desc={isEs ? item.descEs : item.desc}
                  active={isActive(item.href)}
                  onClick={() => setOpenDrop(null)}
                />
              ))}
            </DropTrigger>

            {/* Reference dropdown */}
            <DropTrigger
              id="reference"
              label={isEs ? 'Referencia' : 'Reference'}
              active={groupActive(REFERENCE_ITEMS)}
              open={openDrop === 'reference'}
              onEnter={() => openDropdown('reference')}
              onLeave={scheduleClose}
            >
              {REFERENCE_ITEMS.map((item) => (
                <DropLink
                  key={item.href}
                  href={`/${locale}${item.href}`}
                  icon={item.icon}
                  label={isEs ? item.labelEs : item.label}
                  desc={isEs ? item.descEs : item.desc}
                  active={isActive(item.href)}
                  onClick={() => setOpenDrop(null)}
                />
              ))}
            </DropTrigger>

            {/* Simulate dropdown */}
            <DropTrigger
              id="simulate"
              label={isEs ? 'Simular' : 'Simulate'}
              active={groupActive(SIMULATE_ITEMS)}
              open={openDrop === 'simulate'}
              onEnter={() => openDropdown('simulate')}
              onLeave={scheduleClose}
            >
              {SIMULATE_ITEMS.map((item) => (
                <DropLink
                  key={item.href}
                  href={`/${locale}${item.href}`}
                  icon={item.icon}
                  label={isEs ? item.labelEs : item.label}
                  desc={isEs ? item.descEs : item.desc}
                  active={isActive(item.href)}
                  onClick={() => setOpenDrop(null)}
                />
              ))}
            </DropTrigger>

            {/* Services */}
            <NavLink href={`/${locale}/services`} active={servicesActive}>
              {isEs ? 'Servicios' : 'Services'}
            </NavLink>
          </div>

          {/* ── Right side controls ───────────────────────────────── */}
          <div className="flex items-center gap-2">

            {/* Search ⌘K */}
            <Link
              href={`/${locale}/search`}
              aria-label="Search"
              className="hidden md:inline-flex items-center gap-1.5 pl-2.5 pr-2 py-1.5 rounded-lg border border-gray-200 text-gray-400 hover:text-navy-700 hover:border-navy-300 hover:bg-gray-50 transition-colors text-xs"
            >
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <kbd className="text-[10px] font-semibold text-gray-300 tracking-tight">⌘K</kbd>
            </Link>

            {/* Assessment CTA */}
            <Link
              href={`/${locale}/assessment`}
              className={`hidden md:inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${
                assessmentActive ? 'bg-amber-600 text-white' : 'bg-gold text-white hover:bg-amber-500'
              }`}
            >
              ⚡ {isEs ? 'Diagnóstico' : 'Assessment'}
            </Link>

            {/* Language toggle */}
            <button
              onClick={switchLocale}
              className="text-sm font-semibold text-navy-500 border border-navy-300 rounded px-3 py-1.5 hover:bg-navy-50 transition-colors"
            >
              {t('languageSwitch')}
            </button>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded text-gray-500 hover:text-navy-700 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile drawer ─────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white shadow-md divide-y divide-gray-100">

          {/* Home */}
          <Link
            href={`/${locale}`}
            onClick={() => setMobileOpen(false)}
            className={`block px-5 py-3 text-sm font-semibold transition-colors ${homeActive ? 'text-navy-700 bg-navy-50' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            {t('home')}
          </Link>

          {/* Mobile accordion groups */}
          {[
            { id: 'cases',     label: isEs ? '📂 Casos & Datos' : '📂 Cases & Data', items: CASES_ITEMS },
            { id: 'reference', label: isEs ? '🛡 Referencia' : '🛡 Reference',       items: REFERENCE_ITEMS },
            { id: 'simulate',  label: isEs ? '🎮 Simular' : '🎮 Simulate',           items: SIMULATE_ITEMS },
          ].map(({ id, label, items }) => {
            const active = items.some((item) => isActive(item.href));
            const expanded = mobileExpanded === id;
            return (
              <div key={id}>
                <button
                  onClick={() => setMobileExpanded(expanded ? null : id)}
                  className={`w-full flex items-center justify-between px-5 py-3 text-sm font-semibold transition-colors ${active ? 'text-navy-700 bg-navy-50' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  <span>{label}</span>
                  <svg
                    width="14" height="14" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" strokeWidth={2.5}
                    className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expanded && (
                  <div className="bg-gray-50 px-4 py-2 space-y-1">
                    {items.map((item) => (
                      <Link
                        key={item.href}
                        href={`/${locale}${item.href}`}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                          isActive(item.href)
                            ? 'bg-white text-navy-700 font-semibold shadow-sm'
                            : 'text-gray-600 hover:bg-white hover:text-navy-700'
                        }`}
                      >
                        <span className="text-base">{item.icon}</span>
                        <span>{isEs ? item.labelEs : item.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Services */}
          <Link
            href={`/${locale}/services`}
            onClick={() => setMobileOpen(false)}
            className={`block px-5 py-3 text-sm font-semibold transition-colors ${servicesActive ? 'text-navy-700 bg-navy-50' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            {isEs ? 'Servicios' : 'Services'}
          </Link>

          {/* Assessment + Search */}
          <div className="px-4 py-3 flex flex-col gap-2">
            <Link
              href={`/${locale}/assessment`}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 bg-gold text-white text-sm font-bold rounded-lg px-4 py-2.5 hover:bg-amber-500 transition-colors"
            >
              ⚡ {isEs ? 'Diagnóstico de Preparación' : 'Readiness Assessment'}
            </Link>
            <Link
              href={`/${locale}/search`}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 border border-gray-200 text-gray-600 text-sm font-semibold rounded-lg px-4 py-2.5 hover:bg-gray-50 transition-colors"
            >
              🔍 {isEs ? 'Búsqueda global' : 'Global search'}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

// ── Dropdown trigger ──────────────────────────────────────────────────────────
// All hover logic lives on the outer container — no gap can break the zone.
// A zero-height transparent bridge fills the space between button bottom
// and panel top so the mouse never exits between them.
function DropTrigger({
  id, label, active, open, onEnter, onLeave, children,
}: {
  id: string;
  label: string;
  active: boolean;
  open: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onReenter?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <button
        className={`flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded transition-colors ${
          active || open
            ? 'text-navy-700 bg-navy-50 font-semibold'
            : 'text-gray-600 hover:text-navy-700 hover:bg-gray-50'
        }`}
      >
        {label}
        <svg
          width="13" height="13" fill="none" viewBox="0 0 24 24"
          stroke="currentColor" strokeWidth={2.5}
          className={`transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Invisible bridge: sits between button bottom and panel top so
          moving the mouse downward never exits the hover zone */}
      {open && (
        <div className="absolute top-full left-0 w-full h-3" aria-hidden />
      )}

      {/* Dropdown panel — offset by the bridge height */}
      {open && (
        <div className="absolute top-[calc(100%+12px)] left-0 w-72 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50">
          {/* Top accent line */}
          <div className="h-0.5 bg-gradient-to-r from-navy-600 to-navy-400" />
          <div className="py-1.5">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Dropdown item ─────────────────────────────────────────────────────────────
function DropLink({
  href, icon, label, desc, active, onClick,
}: {
  href: string;
  icon: string;
  label: string;
  desc: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-start gap-3 px-4 py-2.5 mx-1.5 rounded-lg transition-colors group ${
        active
          ? 'bg-navy-50 text-navy-700'
          : 'text-gray-700 hover:bg-gray-50'
      }`}
    >
      <span className="text-lg mt-0.5 flex-shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className={`text-sm font-semibold leading-snug ${active ? 'text-navy-700' : 'text-gray-800 group-hover:text-navy-700'}`}>
          {label}
        </p>
        <p className="text-xs text-gray-400 leading-snug mt-0.5">{desc}</p>
      </div>
    </Link>
  );
}

// ── Plain nav link ────────────────────────────────────────────────────────────
function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`px-3.5 py-2 text-sm font-medium rounded transition-colors ${
        active
          ? 'text-navy-700 bg-navy-50 font-semibold'
          : 'text-gray-600 hover:text-navy-700 hover:bg-gray-50'
      }`}
    >
      {children}
    </Link>
  );
}
