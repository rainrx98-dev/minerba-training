// ─── Case geographic coordinates ─────────────────────────────────────────────
// Lat/lng for the primary incident location of each case.
// Used by the interactive world map page.

export interface CaseCoordinate {
  caseId: string;
  lat: number;
  lng: number;
  /** Short location label shown in the map tooltip */
  location: string;
  locationEs: string;
}

export const CASE_COORDINATES: CaseCoordinate[] = [
  // ── Energy / Oil ────────────────────────────────────────────────────────────
  {
    caseId: 'case-01',
    lat: 60.5,
    lng: -146.5,
    location: 'Prince William Sound, Alaska, USA',
    locationEs: 'Sonido del Príncipe Guillermo, Alaska, EE.UU.',
  },
  {
    caseId: 'case-02',
    lat: 61.0,
    lng: 1.5,
    location: 'North Sea (UK sector)',
    locationEs: 'Mar del Norte (sector del RU)',
  },
  {
    caseId: 'case-03',
    lat: 29.76,
    lng: -95.37,
    location: 'Houston, Texas, USA',
    locationEs: 'Houston, Texas, EE.UU.',
  },
  {
    caseId: 'case-04',
    lat: 28.7,
    lng: -88.4,
    location: 'Gulf of Mexico (Macondo Well)',
    locationEs: 'Golfo de México (Pozo Macondo)',
  },
  {
    caseId: 'case-05',
    lat: 52.08,
    lng: 4.31,
    location: 'The Hague, Netherlands',
    locationEs: 'La Haya, Países Bajos',
  },
  {
    caseId: 'case-06',
    lat: 4.9,
    lng: 6.4,
    location: 'Niger Delta, Nigeria',
    locationEs: 'Delta del Níger, Nigeria',
  },
  {
    caseId: 'case-07',
    lat: -22.9,
    lng: -43.2,
    location: 'Rio de Janeiro, Brazil',
    locationEs: 'Río de Janeiro, Brasil',
  },
  // ── Healthcare ───────────────────────────────────────────────────────────────
  {
    caseId: 'case-H1',
    lat: 41.88,
    lng: -87.63,
    location: 'Chicago, Illinois, USA',
    locationEs: 'Chicago, Illinois, EE.UU.',
  },
  {
    caseId: 'case-H2',
    lat: 41.05,
    lng: -73.54,
    location: 'Stamford, Connecticut, USA',
    locationEs: 'Stamford, Connecticut, EE.UU.',
  },
  {
    caseId: 'case-H3',
    lat: 51.75,
    lng: -1.26,
    location: 'Oxford, United Kingdom',
    locationEs: 'Oxford, Reino Unido',
  },
  // ── Latin America ─────────────────────────────────────────────────────────
  {
    caseId: 'case-L1',
    lat: 0.09,
    lng: -76.88,
    location: 'Lago Agrio, Ecuador',
    locationEs: 'Lago Agrio, Ecuador',
  },
  {
    caseId: 'case-L2',
    lat: -15.78,
    lng: -47.93,
    location: 'Brasília, Brazil',
    locationEs: 'Brasilia, Brasil',
  },
  {
    caseId: 'case-L3',
    lat: -0.23,
    lng: -78.5,
    location: 'Quito, Ecuador',
    locationEs: 'Quito, Ecuador',
  },
  // ── Mining ───────────────────────────────────────────────────────────────────
  {
    caseId: 'case-M1',
    lat: -20.14,
    lng: -44.2,
    location: 'Brumadinho, Minas Gerais, Brazil',
    locationEs: 'Brumadinho, Minas Gerais, Brasil',
  },
  {
    caseId: 'case-M2',
    lat: -20.38,
    lng: -43.42,
    location: 'Mariana, Minas Gerais, Brazil',
    locationEs: 'Mariana, Minas Gerais, Brasil',
  },
  {
    caseId: 'case-M3',
    lat: -22.9,
    lng: 116.5,
    location: 'Pilbara, Western Australia',
    locationEs: 'Pilbara, Australia Occidental',
  },
  {
    caseId: 'case-M4',
    lat: -29.9,
    lng: -69.7,
    location: 'San Juan Province, Argentina',
    locationEs: 'Provincia de San Juan, Argentina',
  },
  {
    caseId: 'case-M5',
    lat: -11.53,
    lng: -75.9,
    location: 'La Oroya, Peru',
    locationEs: 'La Oroya, Perú',
  },
  // ── New Energy / Oil ─────────────────────────────────────────────────────
  {
    caseId: 'case-08',
    lat: 29.38,
    lng: -94.97,
    location: 'Texas City, Texas, USA',
    locationEs: 'Texas City, Texas, EE.UU.',
  },
  {
    caseId: 'case-09',
    lat: 39.75,
    lng: -121.62,
    location: 'Paradise, California, USA',
    locationEs: 'Paradise, California, EE.UU.',
  },
  {
    caseId: 'case-10',
    lat: 32.78,
    lng: -79.94,
    location: 'Colonial Pipeline (Southeast USA)',
    locationEs: 'Colonial Pipeline (sureste de EE.UU.)',
  },
  {
    caseId: 'case-11',
    lat: 20.07,
    lng: -99.19,
    location: 'Tlahuelilpan, Hidalgo, Mexico',
    locationEs: 'Tlahuelilpan, Hidalgo, México',
  },
  {
    caseId: 'case-12',
    lat: 46.35,
    lng: -100.52,
    location: 'Standing Rock, North Dakota, USA',
    locationEs: 'Standing Rock, Dakota del Norte, EE.UU.',
  },
  {
    caseId: 'case-13',
    lat: 40.71,
    lng: -74.01,
    location: 'New York / Irving, Texas, USA',
    locationEs: 'Nueva York / Irving, Texas, EE.UU.',
  },
  // ── Renewables / Energy Transition ──────────────────────────────────────
  {
    caseId: 'case-R1',
    lat: 52.52,
    lng: 13.41,
    location: 'Wolfsburg, Germany (VW HQ)',
    locationEs: 'Wolfsburg, Alemania (sede VW)',
  },
  {
    caseId: 'case-R2',
    lat: 55.68,
    lng: 12.57,
    location: 'Copenhagen, Denmark (Ørsted HQ)',
    locationEs: 'Copenhague, Dinamarca (sede Ørsted)',
  },
  // ── New Mining ──────────────────────────────────────────────────────────
  {
    caseId: 'case-M6',
    lat: 52.48,
    lng: -121.56,
    location: 'Mount Polley, British Columbia, Canada',
    locationEs: 'Mount Polley, Columbia Británica, Canadá',
  },
  {
    caseId: 'case-M7',
    lat: -5.2,
    lng: 141.3,
    location: 'Ok Tedi, Western Province, Papua New Guinea',
    locationEs: 'Ok Tedi, Provincia Occidental, Papúa Nueva Guinea',
  },
  {
    caseId: 'case-M8',
    lat: -4.05,
    lng: 137.12,
    location: 'Grasberg, Papua, Indonesia',
    locationEs: 'Grasberg, Papúa, Indonesia',
  },
  {
    caseId: 'case-M9',
    lat: -6.93,
    lng: -78.63,
    location: 'Yanacocha, Cajamarca, Peru',
    locationEs: 'Yanacocha, Cajamarca, Perú',
  },
  {
    caseId: 'case-M10',
    lat: -33.38,
    lng: 149.0,
    location: 'Cadia Valley, New South Wales, Australia',
    locationEs: 'Cadia Valley, Nueva Gales del Sur, Australia',
  },
  // ── New Healthcare ──────────────────────────────────────────────────────
  {
    caseId: 'case-H4',
    lat: 40.01,
    lng: -74.3,
    location: 'Whitehouse Station, New Jersey, USA (Merck HQ)',
    locationEs: 'Whitehouse Station, Nueva Jersey, EE.UU. (sede Merck)',
  },
  {
    caseId: 'case-H5',
    lat: 37.42,
    lng: -122.14,
    location: 'Palo Alto, California, USA',
    locationEs: 'Palo Alto, California, EE.UU.',
  },
  {
    caseId: 'case-H6',
    lat: 39.92,
    lng: 116.39,
    location: 'Beijing, China (GSK China operations)',
    locationEs: 'Pekín, China (operaciones GSK China)',
  },
  {
    caseId: 'case-H7',
    lat: 40.43,
    lng: -74.51,
    location: 'New Brunswick, New Jersey, USA (J&J HQ)',
    locationEs: 'New Brunswick, Nueva Jersey, EE.UU. (sede J&J)',
  },
  {
    caseId: 'case-H8',
    lat: 14.6,
    lng: 121.0,
    location: 'Manila, Philippines',
    locationEs: 'Manila, Filipinas',
  },
  {
    caseId: 'case-H9',
    lat: 12.0,
    lng: 8.52,
    location: 'Kano, Nigeria',
    locationEs: 'Kano, Nigeria',
  },
  {
    caseId: 'case-H10',
    lat: 55.68,
    lng: 12.57,
    location: 'Copenhagen, Denmark (Novo Nordisk HQ)',
    locationEs: 'Copenhague, Dinamarca (sede Novo Nordisk)',
  },
];

/** Look up coordinates by caseId prefix (e.g. "case-M1" matches "case-M1-vale-brumadinho") */
export function getCoordinatesForCase(fullCaseId: string): CaseCoordinate | undefined {
  return CASE_COORDINATES.find((c) => fullCaseId.startsWith(c.caseId));
}
