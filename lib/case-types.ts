// ─── Types & label maps ──────────────────────────────────────────────────────
// This file has NO Node.js imports — safe to use in client components.

export type Industry = 'energy' | 'mining' | 'healthcare';

export interface CaseMeta {
  id: string;
  title: string;
  company: string;
  year: number;
  country: string;
  region: 'global' | 'latin-america';
  industry?: Industry;
  crisis_type: string[];
  pr_rating: 'failed' | 'mixed' | 'effective';
  sector: string[];
  tags: string[];
  latam_relevant: boolean;
  featured: boolean;
  summary: string;
  frameworks: string[];
}

export interface Case extends CaseMeta {
  content: string;
  slug: string;
}

export const CRISIS_TYPE_LABELS: Record<string, string> = {
  'environmental-disaster': 'Environmental Disaster',
  'ngo-pressure': 'NGO / Activist Pressure',
  environmental: 'Environmental',
  fraud: 'Fraud / Governance',
  governance: 'Governance',
  'investor-relations': 'Investor Relations',
  corruption: 'Corruption',
  'cross-border': 'Cross-Border',
  fcpa: 'FCPA',
  'human-rights': 'Human Rights',
  'social-license': 'Social License',
  'indigenous-rights': 'Indigenous Rights',
  'inherited-liability': 'Inherited Liability',
  'product-safety': 'Product Safety',
};

export const SECTOR_LABELS: Record<string, string> = {
  'oil-gas': 'Oil & Gas',
  transport: 'Transport',
  decommissioning: 'Decommissioning',
  offshore: 'Offshore',
  'corporate-governance': 'Corporate Governance',
  'energy-trading': 'Energy Trading',
  'state-owned-energy': 'State-Owned Energy',
  'energy-infrastructure': 'Energy Infrastructure',
  mining: 'Mining',
  'iron-ore': 'Iron Ore',
  gold: 'Gold & Precious Metals',
  'metals-smelting': 'Metals Smelting',
  pharmaceuticals: 'Pharmaceuticals',
  'consumer-health': 'Consumer Health',
  vaccines: 'Vaccines',
};

export const INDUSTRY_LABELS: Record<Industry, string> = {
  energy: 'Energy & Oil',
  mining: 'Mining',
  healthcare: 'Healthcare',
};

export const INDUSTRY_DESCRIPTIONS: Record<Industry, string> = {
  energy: 'Oil spills, fraud, corruption, and social license failures across upstream and midstream energy sectors.',
  mining: 'Tailings dam collapses, cyanide spills, indigenous rights violations, and community health crises.',
  healthcare: 'Product safety failures, pharmaceutical marketing fraud, and vaccine communications crises.',
};

export const INDUSTRY_ICONS: Record<Industry, string> = {
  energy: '⛽',
  mining: '⛏',
  healthcare: '🏥',
};

export const CRISIS_TYPE_LABELS_ES: Record<string, string> = {
  'environmental-disaster': 'Desastre Ambiental',
  'ngo-pressure': 'Presión ONG / Activistas',
  environmental: 'Ambiental',
  fraud: 'Fraude / Gobernanza',
  governance: 'Gobernanza',
  'investor-relations': 'Relaciones con Inversores',
  corruption: 'Corrupción',
  'cross-border': 'Transfronterizo',
  fcpa: 'FCPA',
  'human-rights': 'Derechos Humanos',
  'social-license': 'Licencia Social',
  'indigenous-rights': 'Derechos Indígenas',
  'inherited-liability': 'Responsabilidad Heredada',
  'product-safety': 'Seguridad del Producto',
};

export const SECTOR_LABELS_ES: Record<string, string> = {
  'oil-gas': 'Petróleo y Gas',
  transport: 'Transporte',
  decommissioning: 'Desmantelamiento',
  offshore: 'Offshore',
  'corporate-governance': 'Gobernanza Corporativa',
  'energy-trading': 'Comercialización de Energía',
  'state-owned-energy': 'Energía Estatal',
  'energy-infrastructure': 'Infraestructura Energética',
  mining: 'Minería',
  'iron-ore': 'Mineral de Hierro',
  gold: 'Oro y Metales Preciosos',
  'metals-smelting': 'Fundición de Metales',
  pharmaceuticals: 'Farmacéuticos',
  'consumer-health': 'Salud del Consumidor',
  vaccines: 'Vacunas',
};

export const INDUSTRY_LABELS_ES: Record<Industry, string> = {
  energy: 'Energía y Petróleo',
  mining: 'Minería',
  healthcare: 'Salud',
};
