// ─── Industry Risk Briefing Content ──────────────────────────────────────────
// Static narrative content per industry. Dynamic stats computed from case data.

import type { Industry } from './case-types';

export interface IndustryRisk {
  title: string;
  titleEs: string;
  detail: string;
  detailEs: string;
  severity: 'high' | 'critical';
}

export interface IndustryService {
  icon: string;
  title: string;
  titleEs: string;
  description: string;
  descriptionEs: string;
}

export interface IndustryFailurePattern {
  title: string;
  titleEs: string;
  detail: string;
  detailEs: string;
  caseId: string; // exemplar case
}

export interface IndustryProfile {
  id: Industry;
  icon: string;
  label: string;
  labelEs: string;
  heroTitle: string;
  heroTitleEs: string;
  heroSubtitle: string;
  heroSubtitleEs: string;
  overview: string;
  overviewEs: string;
  latamRisks: IndustryRisk[];
  commonFailures: IndustryFailurePattern[];
  services: IndustryService[];
  featuredFailedCaseId: string;
  featuredEffectiveCaseId: string;
  statLine: string;
  statLineEs: string;
}

export const INDUSTRY_PROFILES: Record<Industry, IndustryProfile> = {
  energy: {
    id: 'energy',
    icon: '⛽',
    label: 'Energy & Oil',
    labelEs: 'Energía y Petróleo',
    heroTitle: 'Crisis Communications for Energy & Oil Companies',
    heroTitleEs: 'Comunicaciones de Crisis para Empresas de Energía y Petróleo',
    heroSubtitle:
      'Oil spills, regulatory fraud, ransomware attacks, indigenous conflicts, and climate litigation — the energy sector generates the most complex and reputationally destructive crises in the MINERBA dataset.',
    heroSubtitleEs:
      'Derrames de petróleo, fraude regulatorio, ataques de ransomware, conflictos indígenas y litigios climáticos — el sector energético genera las crisis más complejas y reputacionalmente destructivas en el dataset MINERBA.',
    overview:
      'Energy and oil companies operate at the intersection of environmental risk, government dependence, and community expectation — particularly in Latin America, where state energy partnerships and indigenous territories create a uniquely demanding communications environment. The MINERBA dataset includes 13 energy sector cases spanning four decades; fewer than one in four resulted in an effective communications response.',
    overviewEs:
      'Las empresas de energía y petróleo operan en la intersección del riesgo ambiental, la dependencia gubernamental y las expectativas comunitarias — particularmente en América Latina, donde las asociaciones con empresas estatales de energía y los territorios indígenas crean un entorno de comunicaciones excepcionalmente exigente. El dataset MINERBA incluye 13 casos del sector energético en cuatro décadas; menos de uno de cada cuatro resultó en una respuesta de comunicaciones efectiva.',
    latamRisks: [
      {
        title: 'State Energy Partnership Exposure',
        titleEs: 'Exposición en Asociaciones con Empresas Estatales',
        detail:
          'Operations involving PEMEX, Petrobras, Ecopetrol, or PDVSA carry inherited reputational and legal risk. Corruption investigations initiated against a state partner can implicate foreign operators even where no direct wrongdoing occurred. Petrobras\'s Lava Jato scandal ensnared dozens of international energy companies through contractor relationships.',
        detailEs:
          'Las operaciones con PEMEX, Petrobras, Ecopetrol o PDVSA conllevan riesgo reputacional y legal heredado. Las investigaciones de corrupción iniciadas contra un socio estatal pueden involucrar a operadores extranjeros incluso donde no hubo irregularidades directas. El escándalo Lava Jato de Petrobras involucró a docenas de empresas energéticas internacionales a través de relaciones con contratistas.',
        severity: 'critical',
      },
      {
        title: 'Pipeline Route & Indigenous Territory Conflict',
        titleEs: 'Conflicto por Rutas de Oleoductos y Territorios Indígenas',
        detail:
          'The Dakota Access Pipeline case (2016) became the defining model of how pipeline approvals that bypass indigenous consultation create sustained, international, reputationally devastating conflicts. In LATAM, ILO Convention 169 ratification across Colombia, Peru, Ecuador, Bolivia, and Chile creates legal consultation obligations that many energy companies treat as box-checking exercises — at significant reputational and operational cost.',
        detailEs:
          'El caso del Dakota Access Pipeline (2016) se convirtió en el modelo definitivo de cómo las aprobaciones de oleoductos que omiten la consulta indígena crean conflictos sostenidos, internacionales y devastadores para la reputación. En LATAM, la ratificación del Convenio 169 de la OIT en Colombia, Perú, Ecuador, Bolivia y Chile crea obligaciones legales de consulta que muchas empresas energéticas tratan como simples formalidades — con un costo reputacional y operativo significativo.',
        severity: 'critical',
      },
      {
        title: 'Climate Litigation & Deception Exposure',
        titleEs: 'Litigios Climáticos y Exposición por Engaño',
        detail:
          'Exxon\'s climate deception case (2019) established that decades-old internal communications about climate science create current legal and reputational liability. LATAM courts have been increasingly receptive to climate-linked environmental litigation, particularly in Ecuador, Colombia, and Brazil.',
        detailEs:
          'El caso de engaño climático de Exxon (2019) estableció que las comunicaciones internas de hace décadas sobre ciencia climática crean responsabilidad legal y reputacional actual. Los tribunales latinoamericanos han sido cada vez más receptivos a los litigios ambientales vinculados al clima, particularmente en Ecuador, Colombia y Brasil.',
        severity: 'high',
      },
      {
        title: 'Cyber Attack & Operational Silence',
        titleEs: 'Ciberataques y Silencio Operacional',
        detail:
          'Colonial Pipeline\'s 2021 ransomware attack demonstrated that a cyber event can simultaneously disable operations and communications infrastructure — making it impossible to follow a 72-hour protocol if the dark site is on internal servers. LATAM energy infrastructure is significantly under-protected against cyber threats relative to North American equivalents.',
        detailEs:
          'El ataque de ransomware de Colonial Pipeline en 2021 demostró que un evento cibernético puede deshabilitar simultáneamente las operaciones y la infraestructura de comunicaciones — haciendo imposible seguir un protocolo de 72 horas si el sitio de crisis está en servidores internos. La infraestructura energética en LATAM está significativamente menos protegida contra amenazas cibernéticas que sus equivalentes norteamericanos.',
        severity: 'high',
      },
    ],
    commonFailures: [
      {
        title: 'CEO Absence in First 72 Hours',
        titleEs: 'Ausencia del CEO en las Primeras 72 Horas',
        detail:
          'Exxon\'s CEO Lawrence Rawl did not travel to Alaska until nearly two weeks after the Valdez spill. The leadership vacuum defined the public narrative. This pattern repeated in Deepwater Horizon, where Tony Hayward\'s delayed and tone-deaf engagement compounded the damage.',
        detailEs:
          'El CEO de Exxon, Lawrence Rawl, no viajó a Alaska hasta casi dos semanas después del derrame del Valdez. El vacío de liderazgo definió la narrativa pública. Este patrón se repitió en el Horizonte Profundo, donde el tardío e insensible compromiso de Tony Hayward agravó el daño.',
        caseId: '01',
      },
      {
        title: 'Regulatory Concealment Over Voluntary Disclosure',
        titleEs: 'Ocultamiento Regulatorio en Lugar de Divulgación Voluntaria',
        detail:
          'Enron\'s systematic concealment of financial irregularities, and Exxon\'s internal climate science suppression, both demonstrate how prioritising legal caution over transparent disclosure converts a manageable issue into a criminal liability.',
        detailEs:
          'El ocultamiento sistemático de irregularidades financieras de Enron, y la supresión interna de la ciencia climática de Exxon, demuestran cómo priorizar la cautela legal sobre la divulgación transparente convierte un problema manejable en una responsabilidad penal.',
        caseId: '03',
      },
      {
        title: 'Wrong Messaging Priority',
        titleEs: 'Priorización Incorrecta de Mensajes',
        detail:
          'BP\'s messaging during Deepwater Horizon consistently prioritised operational status ("we will pay for this") and liability limitation over human impact acknowledgment. Tony Hayward\'s "I\'d like my life back" comment crystallised the perception of corporate indifference.',
        detailEs:
          'Los mensajes de BP durante el Horizonte Profundo priorizaron consistentemente el estado operativo ("pagaremos por esto") y la limitación de responsabilidad sobre el reconocimiento del impacto humano. El comentario "me gustaría recuperar mi vida" de Tony Hayward cristalizó la percepción de indiferencia corporativa.',
        caseId: '04',
      },
    ],
    services: [
      { icon: '⚡', title: 'Crisis Readiness Assessment', titleEs: 'Evaluación de Preparación para Crisis', description: 'Benchmark your energy company\'s current crisis readiness against the 13-case energy sector dataset.', descriptionEs: 'Compare la preparación actual de su empresa energética con el dataset de 13 casos del sector.' },
      { icon: '🛢', title: 'Oil Spill Response Protocol', titleEs: 'Protocolo de Respuesta a Derrames', description: 'Scenario-specific holding statements, stakeholder maps, and 72-hour action plans for spill and pipeline incidents.', descriptionEs: 'Declaraciones de contención específicas, mapas de partes interesadas y planes de acción de 72 horas para incidentes de derrame.' },
      { icon: '🌎', title: 'LATAM Indigenous Consultation Protocol', titleEs: 'Protocolo de Consulta Indígena LATAM', description: 'FPIC compliance review and community notification systems for pipeline and upstream operations near indigenous territories.', descriptionEs: 'Revisión de cumplimiento CLPI y sistemas de notificación comunitaria para operaciones cerca de territorios indígenas.' },
      { icon: '🎯', title: 'C-Suite Crisis Simulation', titleEs: 'Simulación de Crisis para Alta Dirección', description: 'Full energy sector simulation calibrated to your regional context — spill, fraud, or regulatory investigation scenario.', descriptionEs: 'Simulación completa del sector energético calibrada a su contexto regional — derrame, fraude o investigación regulatoria.' },
    ],
    featuredFailedCaseId: '04',
    featuredEffectiveCaseId: 'R2',
    statLine: 'Energy sector cases in MINERBA dataset: 13 · Failed responses: 69% · LATAM-relevant: 85%',
    statLineEs: 'Casos del sector energético en MINERBA: 13 · Respuestas fallidas: 69% · Relevantes para LATAM: 85%',
  },

  mining: {
    id: 'mining',
    icon: '⛏',
    label: 'Mining',
    labelEs: 'Minería',
    heroTitle: 'Crisis Communications for Mining Companies',
    heroTitleEs: 'Comunicaciones de Crisis para Empresas Mineras',
    heroSubtitle:
      'Tailings dam collapses, cyanide spills, indigenous rights violations, and decades-long community conflicts — mining produces the highest concentration of catastrophic, LATAM-origin crises in the MINERBA dataset.',
    heroSubtitleEs:
      'Colapsos de represas de relaves, derrames de cianuro, violaciones de derechos indígenas y conflictos comunitarios de décadas — la minería produce la mayor concentración de crisis catastróficas de origen latinoamericano en el dataset MINERBA.',
    overview:
      'No sector in the MINERBA dataset produces more severe, community-driven, and legally complex crises than mining. Eight of the ten mining cases resulted in failed or mixed communications responses. The two Brazilian tailings dam disasters (Brumadinho and Samarco) together killed more than 300 people and generated combined fines and settlements exceeding $10 billion. The common thread: companies that treated community relations as a compliance function rather than a social license investment.',
    overviewEs:
      'Ningún sector en el dataset MINERBA produce crisis más severas, impulsadas por la comunidad y legalmente complejas que la minería. Ocho de los diez casos mineros resultaron en respuestas de comunicaciones fallidas o mixtas. Los dos desastres de represas de relaves en Brasil (Brumadinho y Samarco) juntos mataron a más de 300 personas y generaron multas y acuerdos combinados que superan los 10 mil millones de dólares. El hilo común: empresas que trataron las relaciones comunitarias como una función de cumplimiento en lugar de una inversión en licencia social.',
    latamRisks: [
      {
        title: 'Tailings Dam Failure',
        titleEs: 'Falla de Represa de Relaves',
        detail:
          'Brazil\'s two worst tailings dam disasters (Samarco 2015, Brumadinho 2019) both occurred within a decade. The 2020 Global Industry Standard on Tailings Management was adopted directly in response. Any mining operation in LATAM with active tailings storage is operating in a post-Brumadinho environment where stakeholder tolerance for risk is essentially zero — and where the communications response in the first 6 hours will determine whether the company survives the reputational crisis.',
        detailEs:
          'Los dos peores desastres de represas de relaves en Brasil (Samarco 2015, Brumadinho 2019) ocurrieron en menos de una década. El Estándar Global de la Industria sobre Gestión de Relaves de 2020 fue adoptado directamente en respuesta. Cualquier operación minera en LATAM con almacenamiento activo de relaves opera en un entorno post-Brumadinho donde la tolerancia de las partes interesadas al riesgo es esencialmente cero.',
        severity: 'critical',
      },
      {
        title: 'Indigenous Rights & Consulta Previa',
        titleEs: 'Derechos Indígenas y Consulta Previa',
        detail:
          'Every major LATAM mining-affected country (Peru, Chile, Colombia, Bolivia, Brazil, Argentina) has domestic consulta previa obligations. Rio Tinto\'s destruction of the Juukan Gorge rockshelters (Australia, 2020) — a site of 46,000 years of indigenous habitation — demonstrated that this risk is not limited to LATAM and that no regulatory approval shields a company from reputational catastrophe when indigenous cultural rights are violated.',
        detailEs:
          'Todos los principales países mineros de LATAM (Perú, Chile, Colombia, Bolivia, Brasil, Argentina) tienen obligaciones domésticas de consulta previa. La destrucción de los refugios rocosos de Juukan Gorge por Rio Tinto (Australia, 2020) — un sitio con 46,000 años de habitación indígena — demostró que este riesgo no se limita a LATAM y que ninguna aprobación regulatoria protege a una empresa de la catástrofe reputacional cuando se violan los derechos culturales indígenas.',
        severity: 'critical',
      },
      {
        title: 'Inherited Liability from Previous Operators',
        titleEs: 'Responsabilidad Heredada de Operadores Anteriores',
        detail:
          'La Oroya (Peru) and Ok Tedi (Papua New Guinea) show the extreme danger of inheriting operations with pre-existing community health damage. Doe Run\'s acquisition of the La Oroya lead smelter came with decades of blood lead poisoning in the surrounding community. In LATAM, many abandoned or historic mining sites carry unresolved community health obligations that attach to any new operator.',
        detailEs:
          'La Oroya (Perú) y Ok Tedi (Papúa Nueva Guinea) muestran el peligro extremo de heredar operaciones con daño previo a la salud comunitaria. La adquisición de la fundidora de plomo de La Oroya por Doe Run vino con décadas de envenenamiento por plomo en sangre en la comunidad circundante. En LATAM, muchos sitios mineros abandonados o históricos tienen obligaciones de salud comunitaria no resueltas que se adhieren a cualquier nuevo operador.',
        severity: 'high',
      },
      {
        title: 'Water Source Contamination & Artisanal Mining Conflict',
        titleEs: 'Contaminación de Fuentes de Agua y Conflicto con Minería Artesanal',
        detail:
          'Barrick Gold\'s Veladero mine in Argentina discharged cyanide solution into rivers feeding Andean communities on three separate occasions. The company\'s failure to notify downstream communities promptly — and its use of a company-controlled response narrative — destroyed social license across the entire Andean operation region.',
        detailEs:
          'La mina Veladero de Barrick Gold en Argentina descargó solución de cianuro en ríos que abastecen a comunidades andinas en tres ocasiones separadas. La falla de la empresa en notificar oportunamente a las comunidades aguas abajo — y su uso de una narrativa de respuesta controlada por la empresa — destruyó la licencia social en toda la región de operaciones andinas.',
        severity: 'critical',
      },
    ],
    commonFailures: [
      {
        title: 'Delayed Community Notification',
        titleEs: 'Notificación Comunitaria Tardía',
        detail:
          'In Brumadinho, Samarco, Barrick Veladero, and Mount Polley, indigenous and downstream communities learned of the incident through media before receiving direct company notification. This sequencing — investors and media before communities — is the single most common pattern in failed mining crisis responses.',
        detailEs:
          'En Brumadinho, Samarco, Barrick Veladero y Mount Polley, las comunidades indígenas y aguas abajo se enteraron del incidente a través de los medios antes de recibir notificación directa de la empresa. Esta secuencia — inversores y medios antes que comunidades — es el patrón más común en las respuestas fallidas de crisis mineras.',
        caseId: 'M1',
      },
      {
        title: 'Premature Operational Resumption',
        titleEs: 'Reanudación Operativa Prematura',
        detail:
          'Mount Polley\'s decision to resume operations within a year of the tailings breach — before community trust had been rebuilt — became a standalone second crisis. Regulatory approval to resume is not equivalent to social license to resume.',
        detailEs:
          'La decisión de Mount Polley de reanudar operaciones dentro del año posterior a la ruptura de la represa de relaves — antes de que la confianza comunitaria se hubiera reconstruido — se convirtió en una segunda crisis independiente. La aprobación regulatoria para reanudar no equivale a la licencia social para reanudar.',
        caseId: 'M6',
      },
      {
        title: 'Company-Controlled Monitoring',
        titleEs: 'Monitoreo Controlado por la Empresa',
        detail:
          'When companies select, fund, and control their own environmental monitors, the results are dismissed by communities, NGOs, and regulators as inherently conflicted. Yanacocha, Ok Tedi, and La Oroya all suffered prolonged reputational damage because monitoring was perceived as self-serving.',
        detailEs:
          'Cuando las empresas seleccionan, financian y controlan sus propios monitores ambientales, los resultados son descartados por las comunidades, ONG y reguladores como inherentemente conflictivos. Yanacocha, Ok Tedi y La Oroya sufrieron daño reputacional prolongado porque el monitoreo fue percibido como interesado.',
        caseId: 'M9',
      },
    ],
    services: [
      { icon: '⚡', title: 'Mining Crisis Readiness Assessment', titleEs: 'Evaluación de Preparación para Crisis Mineras', description: 'Benchmark your readiness against the 10-case mining dataset — tailings, indigenous rights, water contamination, and community conflict scenarios.', descriptionEs: 'Compare su preparación con el dataset de 10 casos mineros — relaves, derechos indígenas, contaminación del agua y conflictos comunitarios.' },
      { icon: '🌊', title: 'Tailings Incident Response Protocol', titleEs: 'Protocolo de Respuesta a Incidentes de Relaves', description: 'First-72-hours playbook for tailings dam failure: community notification sequence, independent monitoring deployment, and government briefing protocol.', descriptionEs: 'Protocolo de primeras 72 horas para falla de represa de relaves: secuencia de notificación comunitaria, despliegue de monitoreo independiente y protocolo de briefing gubernamental.' },
      { icon: '⚖️', title: 'FPIC / Consulta Previa Compliance Review', titleEs: 'Revisión de Cumplimiento CLPI / Consulta Previa', description: 'Independent review of your indigenous consultation documentation against ILO 169 and applicable national law across all LATAM operating jurisdictions.', descriptionEs: 'Revisión independiente de su documentación de consulta indígena contra el Convenio 169 de la OIT y la legislación nacional aplicable en todas las jurisdicciones operativas de LATAM.' },
      { icon: '🤝', title: 'Community Relations Programme Design', titleEs: 'Diseño del Programa de Relaciones Comunitarias', description: 'Pre-built stakeholder contact protocols, community benefit fund design, and WhatsApp-first communication systems for LATAM mining operations.', descriptionEs: 'Protocolos de contacto de partes interesadas pre-construidos, diseño de fondo de beneficio comunitario y sistemas de comunicación WhatsApp-first para operaciones mineras en LATAM.' },
    ],
    featuredFailedCaseId: 'M1',
    featuredEffectiveCaseId: 'M10',
    statLine: 'Mining sector cases in MINERBA dataset: 10 · Failed responses: 60% · Cases set in LATAM: 5',
    statLineEs: 'Casos del sector minero en MINERBA: 10 · Respuestas fallidas: 60% · Casos en LATAM: 5',
  },

  healthcare: {
    id: 'healthcare',
    icon: '🏥',
    label: 'Healthcare',
    labelEs: 'Salud',
    heroTitle: 'Crisis Communications for Healthcare & Pharmaceutical Companies',
    heroTitleEs: 'Comunicaciones de Crisis para Empresas de Salud y Farmacéuticas',
    heroSubtitle:
      'Product safety suppression, pharmaceutical fraud, vaccine communications failures, and access inequity crises — healthcare companies face uniquely high-trust obligations that, when violated, produce irreversible reputational damage.',
    heroSubtitleEs:
      'Supresión de seguridad de productos, fraude farmacéutico, fallas en comunicaciones de vacunas y crisis de equidad de acceso — las empresas de salud enfrentan obligaciones de confianza excepcionalmente altas que, cuando se violan, producen daño reputacional irreversible.',
    overview:
      'The J&J Tylenol case remains the gold standard of effective crisis response: voluntary product recall, CEO visibility, full cooperation with regulators, and genuine consumer safety prioritisation. Every other major crisis in the MINERBA healthcare dataset is a study in what happens when companies do the opposite — suppress safety signals, deploy legal caution over transparency, and treat regulators as adversaries. Merck\'s Vioxx withdrawal cost $4.85 billion and followed five years of documented cardiovascular signal suppression. Purdue Pharma\'s OxyContin crisis destroyed a company and fuelled a national addiction epidemic.',
    overviewEs:
      'El caso del Tylenol de J&J sigue siendo el estándar de oro de la respuesta efectiva a crisis: retiro voluntario del producto, visibilidad del CEO, plena cooperación con reguladores y genuina priorización de la seguridad del consumidor. Todos los demás casos importantes en el dataset de salud de MINERBA son estudios de lo que sucede cuando las empresas hacen lo contrario — suprimen señales de seguridad, despliegan cautela legal sobre transparencia y tratan a los reguladores como adversarios.',
    latamRisks: [
      {
        title: 'Asymmetric Market Withdrawal Timing',
        titleEs: 'Calendario Asimétrico de Retiro del Mercado',
        detail:
          'When a pharmaceutical company withdraws a product in the U.S. or Europe but delays withdrawal in LATAM markets — even by weeks — it creates a narrative of deliberate two-tier safety standards. This narrative is legally and reputationally devastating and is increasingly monitored by Pan American Health Organization (PAHO) and national health ministries.',
        detailEs:
          'Cuando una empresa farmacéutica retira un producto en EE.UU. o Europa pero retrasa el retiro en mercados latinoamericanos — incluso por semanas — crea una narrativa de estándares de seguridad deliberadamente de dos niveles. Esta narrativa es legalmente y reputacionalmente devastadora y es cada vez más monitoreada por la PAHO y los ministerios de salud nacionales.',
        severity: 'critical',
      },
      {
        title: 'Clinical Trial Ethics in Low-Regulation Markets',
        titleEs: 'Ética de Ensayos Clínicos en Mercados de Baja Regulación',
        detail:
          'Pfizer\'s 1996 Trovan trial in Nigeria — where an experimental antibiotic was tested on children during a meningitis epidemic without adequate informed consent — established the defining precedent for clinical trial ethics violations in developing markets. LATAM countries with recent legal reforms around bioethics and clinical trials have significantly increased scrutiny of foreign pharmaceutical trial practices.',
        detailEs:
          'El ensayo Trovan de Pfizer en Nigeria en 1996 — donde se probó un antibiótico experimental en niños durante una epidemia de meningitis sin consentimiento informado adecuado — estableció el precedente definitorio para violaciones de ética en ensayos clínicos en mercados en desarrollo. Los países latinoamericanos con reformas legales recientes en torno a la bioética y los ensayos clínicos han aumentado significativamente el escrutinio de las prácticas de ensayos farmacéuticos extranjeros.',
        severity: 'critical',
      },
      {
        title: 'Vaccine Access & Equity Communications',
        titleEs: 'Comunicaciones de Acceso y Equidad a Vacunas',
        detail:
          'Sanofi\'s Dengvaxia crisis in the Philippines (2017) — where a dengue vaccine was administered to 800,000 children before its full risk profile was understood — demonstrated that vaccine safety communications in lower-income markets require significantly more proactive community engagement than in high-income markets. The same dynamic applies across Latin America, where vaccine hesitancy has been amplified by perceived inequitable access during COVID-19.',
        detailEs:
          'La crisis de la Dengvaxia de Sanofi en Filipinas (2017) — donde se administró una vacuna contra el dengue a 800,000 niños antes de que se entendiera su perfil de riesgo completo — demostró que las comunicaciones de seguridad de vacunas en mercados de bajos ingresos requieren un compromiso comunitario significativamente más proactivo que en los mercados de altos ingresos.',
        severity: 'high',
      },
      {
        title: 'Pharmaceutical Sales Force Ethics',
        titleEs: 'Ética de la Fuerza de Ventas Farmacéutica',
        detail:
          'GSK\'s systematic bribery of Chinese healthcare providers — using travel, gifts, and speaking fees as inducements — triggered a $490M fine and set a precedent for extraterritorial FCPA enforcement in healthcare. LATAM pharmaceutical markets, where physician-sales rep relationships are often more direct and personal, carry elevated bribery exposure.',
        detailEs:
          'El soborno sistemático de GSK a proveedores de atención médica chinos — usando viajes, regalos y honorarios por ponencias como incentivos — desencadenó una multa de $490M y estableció un precedente para la aplicación extraterritorial del FCPA en salud. Los mercados farmacéuticos de LATAM, donde las relaciones médico-representante de ventas son a menudo más directas y personales, tienen mayor exposición al soborno.',
        severity: 'high',
      },
    ],
    commonFailures: [
      {
        title: 'Suppressing Safety Signals as "Scientific Uncertainty"',
        titleEs: 'Supresión de Señales de Seguridad como "Incertidumbre Científica"',
        detail:
          'Merck\'s use of the "naproxen protective effect" hypothesis to explain Vioxx cardiovascular data — despite internal evidence that the signal was real — is the archetypal case of framing a known risk as scientific ambiguity. The "dodge and defer" training card created documentary evidence of institutional intent that destroyed the company\'s legal defence.',
        detailEs:
          'El uso por parte de Merck de la hipótesis del "efecto protector del naproxeno" para explicar los datos cardiovasculares del Vioxx — a pesar de la evidencia interna de que la señal era real — es el caso arquetípico de enmarcar un riesgo conocido como ambigüedad científica.',
        caseId: 'H4',
      },
      {
        title: 'Aggressive Marketing Preceding Regulatory Action',
        titleEs: 'Marketing Agresivo Antes de la Acción Regulatoria',
        detail:
          'Purdue Pharma\'s systematic misrepresentation of OxyContin\'s addiction risk to physicians, regulators, and patients — using funded research, speaker fees, and misleading dosing claims — created a liability trail that ultimately led to the company\'s dissolution and $8B+ in settlements.',
        detailEs:
          'La tergiversación sistemática de Purdue Pharma del riesgo de adicción al OxyContin ante médicos, reguladores y pacientes — usando investigación financiada, honorarios por ponencias y afirmaciones de dosificación engañosas — creó un rastro de responsabilidad que finalmente llevó a la disolución de la empresa y acuerdos por más de $8B.',
        caseId: 'H2',
      },
      {
        title: 'Attacking External Scientific Critics',
        titleEs: 'Ataque a Críticos Científicos Externos',
        detail:
          'Both Merck (Vioxx) and J&J (talc asbestos) deployed communications strategies to discredit independent scientists who published early safety warnings. This approach converts academic disagreement into a personal conflict, amplifies media coverage, and motivates the targeted scientists to intensify their research.',
        detailEs:
          'Tanto Merck (Vioxx) como J&J (amianto en talco) desplegaron estrategias de comunicación para desacreditar a científicos independientes que publicaron advertencias tempranas de seguridad. Este enfoque convierte el desacuerdo académico en un conflicto personal, amplifica la cobertura mediática y motiva a los científicos atacados a intensificar su investigación.',
        caseId: 'H7',
      },
    ],
    services: [
      { icon: '⚡', title: 'Pharma Crisis Readiness Assessment', titleEs: 'Evaluación de Preparación para Crisis Farmacéuticas', description: 'Benchmark your pharmaceutical or medtech company\'s readiness against the 10-case healthcare dataset — product safety, regulatory, and access scenarios.', descriptionEs: 'Compare la preparación de su empresa farmacéutica o de tecnología médica con el dataset de 10 casos de salud.' },
      { icon: '💊', title: 'Product Safety Crisis Protocol', titleEs: 'Protocolo de Crisis de Seguridad del Producto', description: 'Voluntary withdrawal playbook, multi-market simultaneous communication protocol, and regulatory pre-briefing strategy for product safety events.', descriptionEs: 'Protocolo de retiro voluntario, protocolo de comunicación simultánea multi-mercado y estrategia de pre-briefing regulatorio para eventos de seguridad del producto.' },
      { icon: '🌎', title: 'LATAM Market Access Communications', titleEs: 'Comunicaciones de Acceso al Mercado LATAM', description: 'Equity-focused access communications, vaccine rollout strategy, and health ministry engagement protocols for LATAM markets.', descriptionEs: 'Comunicaciones de acceso centradas en equidad, estrategia de implementación de vacunas y protocolos de compromiso con ministerios de salud para mercados LATAM.' },
      { icon: '🎯', title: 'Regulatory Investigation Simulation', titleEs: 'Simulación de Investigación Regulatoria', description: 'FDA/ANVISA/COFEPRIS investigation scenario simulation with CEO and legal/communications alignment workshop.', descriptionEs: 'Simulación de escenario de investigación FDA/ANVISA/COFEPRIS con taller de alineación CEO y equipo legal/comunicaciones.' },
    ],
    featuredFailedCaseId: 'H2',
    featuredEffectiveCaseId: 'H1',
    statLine: 'Healthcare cases in MINERBA dataset: 10 · Failed responses: 50% · LATAM-relevant: 70%',
    statLineEs: 'Casos de salud en MINERBA: 10 · Respuestas fallidas: 50% · Relevantes para LATAM: 70%',
  },
};
