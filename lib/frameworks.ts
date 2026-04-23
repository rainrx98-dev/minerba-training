// ─── Frameworks, Protocols & Checklists ──────────────────────────────────────
// Organized in four categories:
//   academic   — peer-reviewed crisis communication theory
//   industry   — international standards and industry body guidelines
//   operational — practical protocols and playbooks
//   latam       — Latin America-specific tools and adaptations

export type FrameworkCategory = 'academic' | 'industry' | 'operational' | 'latam';

export interface FrameworkItem {
  id: string;
  category: FrameworkCategory;
  icon: string;
  title: string;
  titleEs: string;
  origin: string;        // e.g. "W. Timothy Coombs, 1995"
  originEs: string;
  when: string;          // one-line: when to apply
  whenEs: string;
  summary: string;
  summaryEs: string;
  principles: { label: string; labelEs: string; detail: string; detailEs: string }[];
  usedInCases?: string[];   // case IDs where this is relevant
  externalRef?: string;     // URL for further reading
}

export const FRAMEWORKS: FrameworkItem[] = [
  // ══════════════════════════════════════════════════════════
  // ACADEMIC FRAMEWORKS
  // ══════════════════════════════════════════════════════════

  {
    id: 'scct',
    category: 'academic',
    icon: '🎓',
    title: 'Situational Crisis Communication Theory (SCCT)',
    titleEs: 'Teoría de Comunicación de Crisis Situacional (SCCT)',
    origin: 'W. Timothy Coombs — 1995, updated 2007',
    originEs: 'W. Timothy Coombs — 1995, actualizado en 2007',
    when: 'Selecting the right response posture based on crisis type and organisational history',
    whenEs: 'Seleccionar la postura de respuesta correcta según el tipo de crisis e historial organizacional',
    summary:
      'SCCT is the most widely cited academic framework in crisis communications. It argues that the appropriate communication response depends on the type of crisis (victim, accidental, or preventable) combined with the organization\'s prior reputational history. Higher responsibility attributions require more accommodative responses.',
    summaryEs:
      'SCCT es el marco académico más citado en comunicaciones de crisis. Sostiene que la respuesta apropiada depende del tipo de crisis (víctima, accidental o prevenible) combinada con el historial reputacional previo de la organización. Mayor atribución de responsabilidad requiere respuestas más acomodaticias.',
    principles: [
      {
        label: 'Victim Cluster',
        labelEs: 'Clúster Víctima',
        detail: 'Organization is also harmed (natural disaster, product tampering, workplace violence). Minimal responsibility attributed. Deny or diminish strategies are appropriate.',
        detailEs: 'La organización también sufre daño (desastre natural, sabotaje de producto, violencia laboral). Mínima responsabilidad atribuida. Estrategias de negación o minimización son apropiadas.',
      },
      {
        label: 'Accidental Cluster',
        labelEs: 'Clúster Accidental',
        detail: 'Unintentional acts or technical malfunctions. Moderate responsibility. Diminish strategies (excuse/justification) are appropriate. Accommodate if history is poor.',
        detailEs: 'Actos no intencionales o fallos técnicos. Responsabilidad moderada. Estrategias de minimización (excusa/justificación) son apropiadas. Acomodar si el historial es desfavorable.',
      },
      {
        label: 'Preventable Cluster',
        labelEs: 'Clúster Prevenible',
        detail: 'Deliberate misconduct, human error, or ignored warnings. High responsibility. Accommodative strategies (apology, compensation, corrective action) are required.',
        detailEs: 'Conducta deliberada, error humano o advertencias ignoradas. Alta responsabilidad. Se requieren estrategias acomodaticias (disculpa, compensación, acción correctiva).',
      },
      {
        label: 'History & Reputation',
        labelEs: 'Historial y Reputación',
        detail: 'Prior crisis history or negative reputation intensifies responsibility attribution by one full cluster level — an accidental crisis becomes preventable if the company has a poor track record.',
        detailEs: 'Un historial previo de crisis o reputación negativa intensifica la atribución de responsabilidad en un nivel completo — una crisis accidental se convierte en prevenible si la empresa tiene un historial deficiente.',
      },
    ],
    usedInCases: ['case-01', 'case-04', 'case-08', 'case-11', 'case-M1', 'case-M2', 'case-M6', 'case-H8', 'case-H9'],
    externalRef: 'https://www.tandfonline.com/doi/abs/10.1080/1062726X.2007.9428063',
  },

  {
    id: 'image-restoration',
    category: 'academic',
    icon: '🎓',
    title: 'Image Restoration Theory',
    titleEs: 'Teoría de Restauración de Imagen',
    origin: 'William L. Benoit — 1995',
    originEs: 'William L. Benoit — 1995',
    when: 'Choosing specific verbal strategies when organizational reputation is under attack',
    whenEs: 'Elegir estrategias verbales específicas cuando la reputación organizacional está bajo ataque',
    summary:
      'Benoit\'s theory holds that maintaining a positive image is a primary goal of communication. When an organization is accused of wrongdoing, it must choose from five main image restoration strategies depending on how defensible its position is and what outcomes it seeks.',
    summaryEs:
      'La teoría de Benoit sostiene que mantener una imagen positiva es un objetivo principal de la comunicación. Cuando una organización es acusada de mala conducta, debe elegir entre cinco estrategias principales de restauración de imagen según cuán defendible sea su posición y qué resultados busca.',
    principles: [
      {
        label: '1. Denial',
        labelEs: '1. Negación',
        detail: 'Simple denial (did not do it) or shift blame to another actor. Only viable if factually defensible — exposed denial devastates credibility.',
        detailEs: 'Negación simple (no lo hizo) o transferir culpa a otro actor. Solo viable si es defendible fácticamente — la negación expuesta devasta la credibilidad.',
      },
      {
        label: '2. Evade Responsibility',
        labelEs: '2. Evasión de Responsabilidad',
        detail: 'Claim provocation, defeasibility (lack of control/information), accident, or good intent. Common in early responses but undermined by document discovery.',
        detailEs: 'Alegar provocación, indefectibilidad (falta de control/información), accidente o buena intención. Común en respuestas tempranas pero socavado por descubrimiento de documentos.',
      },
      {
        label: '3. Reduce Offensiveness',
        labelEs: '3. Reducir la Ofensividad',
        detail: 'Bolstering (emphasize positive record), minimisation, differentiation, transcendence, attack accusers, or compensation. Mixed-outcome strategy — can appear tone-deaf.',
        detailEs: 'Refuerzo (enfatizar registro positivo), minimización, diferenciación, trascendencia, atacar acusadores o compensación. Estrategia de resultado mixto — puede parecer insensible.',
      },
      {
        label: '4. Corrective Action',
        labelEs: '4. Acción Correctiva',
        detail: 'Promise to fix the problem and prevent recurrence. Most credible when combined with third-party oversight. Essential in environmental and safety crises.',
        detailEs: 'Promesa de resolver el problema y evitar recurrencias. Más creíble combinada con supervisión de terceros. Esencial en crisis ambientales y de seguridad.',
      },
      {
        label: '5. Mortification',
        labelEs: '5. Mortificación',
        detail: 'Full apology — acknowledges wrongdoing, accepts responsibility, asks for forgiveness. Most accommodative strategy. BP\'s "I want my life back" is a failure case study in getting tone wrong.',
        detailEs: 'Disculpa completa — reconoce la mala conducta, acepta la responsabilidad, pide perdón. Estrategia más acomodaticia. El "quiero que me devuelvan mi vida" de BP es un caso de estudio del tono equivocado.',
      },
    ],
    usedInCases: ['case-04', 'case-06', 'case-H1', 'case-H2', 'case-R1', 'case-H4', 'case-H5', 'case-H7'],
  },

  {
    id: 'sandman',
    category: 'academic',
    icon: '🎓',
    title: 'Sandman Risk Communication Model',
    titleEs: 'Modelo de Comunicación de Riesgo de Sandman',
    origin: 'Peter M. Sandman — 1987',
    originEs: 'Peter M. Sandman — 1987',
    when: 'Understanding why publics react disproportionately (or insufficiently) to technical risk levels',
    whenEs: 'Comprender por qué los públicos reaccionan desproporcionadamente (o insuficientemente) a los niveles técnicos de riesgo',
    summary:
      'Sandman\'s famous formulation: Risk = Hazard + Outrage. Technical experts define risk by probability and magnitude (hazard). The public defines risk by its emotional and social context (outrage). Companies that focus only on hazard while ignoring outrage consistently misjudge public reaction — and vice versa.',
    summaryEs:
      'La famosa formulación de Sandman: Riesgo = Peligro + Indignación. Los expertos técnicos definen el riesgo por probabilidad y magnitud (peligro). El público define el riesgo por su contexto emocional y social (indignación). Las empresas que se centran solo en el peligro ignorando la indignación juzgan consistentemente mal la reacción pública.',
    principles: [
      {
        label: 'Outrage Amplifiers',
        labelEs: 'Amplificadores de Indignación',
        detail: 'Involuntary exposure, artificial/industrial source, morally unacceptable conduct, lack of trust in the company, inequitable distribution of risk and benefit, controlled by others, catastrophic potential, and media visibility all increase outrage regardless of actual hazard level.',
        detailEs: 'Exposición involuntaria, fuente artificial/industrial, conducta moralmente inaceptable, falta de confianza en la empresa, distribución inequitativa de riesgo y beneficio, controlado por otros, potencial catastrófico y visibilidad mediática aumentan la indignación independientemente del nivel real de peligro.',
      },
      {
        label: 'High Hazard / Low Outrage',
        labelEs: 'Alto Peligro / Baja Indignación',
        detail: 'People ignore real risks that seem familiar, voluntary, or controlled — e.g. workplace chemical exposure. The challenge is increasing appropriate concern without causing panic.',
        detailEs: 'Las personas ignoran riesgos reales que parecen familiares, voluntarios o controlados. El desafío es aumentar la preocupación apropiada sin causar pánico.',
      },
      {
        label: 'Low Hazard / High Outrage',
        labelEs: 'Bajo Peligro / Alta Indignación',
        detail: 'People overreact to risks that seem new, industrial, or unjustly imposed — e.g. pipeline routes through communities. The challenge is acknowledging outrage without dismissing it.',
        detailEs: 'Las personas reaccionan exageradamente ante riesgos que parecen nuevos, industriales o injustamente impuestos. El desafío es reconocer la indignación sin descartarla.',
      },
      {
        label: 'Practical Application',
        labelEs: 'Aplicación Práctica',
        detail: 'In high-outrage situations: acknowledge the outrage first, before data. Explain the hazard only after trust is partially restored. Never lead with statistics to an angry community.',
        detailEs: 'En situaciones de alta indignación: reconocer la indignación primero, antes de los datos. Explicar el peligro solo después de que la confianza se restaure parcialmente. Nunca lidere con estadísticas ante una comunidad enfadada.',
      },
    ],
    usedInCases: ['case-06', 'case-11', 'case-L1', 'case-M1', 'case-M5', 'case-M6', 'case-H8'],
  },

  {
    id: 'stakeholder-theory',
    category: 'academic',
    icon: '🎓',
    title: 'Stakeholder Salience Model',
    titleEs: 'Modelo de Prominencia de Partes Interesadas',
    origin: 'Mitchell, Agle & Wood — 1997 (based on Freeman, 1984)',
    originEs: 'Mitchell, Agle y Wood — 1997 (basado en Freeman, 1984)',
    when: 'Mapping and prioritising which stakeholders to engage first in a crisis',
    whenEs: 'Mapear y priorizar con qué partes interesadas relacionarse primero en una crisis',
    summary:
      'Not all stakeholders are equal in a crisis. The Salience Model ranks them by three attributes: power (ability to impose their will), legitimacy (socially accepted claim to involvement), and urgency (time-sensitive or critical nature of their stake). Those with all three are Definitive Stakeholders and must be engaged first.',
    summaryEs:
      'No todas las partes interesadas son iguales en una crisis. El Modelo de Prominencia las clasifica por tres atributos: poder (capacidad de imponer su voluntad), legitimidad (reclamación socialmente aceptada de participación) y urgencia (naturaleza urgente o crítica de su interés). Las que tienen los tres son Partes Interesadas Definitivas y deben ser abordadas primero.',
    principles: [
      {
        label: 'Power',
        labelEs: 'Poder',
        detail: 'Can this stakeholder impose costs, disrupt operations, move markets, or change laws? Regulators, large investors, and national media typically have high power in energy/mining crises.',
        detailEs: '¿Puede esta parte interesada imponer costos, interrumpir operaciones, mover mercados o cambiar leyes? Los reguladores, grandes inversores y medios nacionales generalmente tienen alto poder en crisis de energía/minería.',
      },
      {
        label: 'Legitimacy',
        labelEs: 'Legitimidad',
        detail: 'Does their claim to involvement have social, legal, or moral standing? Affected communities have high legitimacy even when they lack formal power.',
        detailEs: '¿Tiene su reclamación de participación base social, legal o moral? Las comunidades afectadas tienen alta legitimidad incluso cuando carecen de poder formal.',
      },
      {
        label: 'Urgency',
        labelEs: 'Urgencia',
        detail: 'Is their claim time-sensitive or critical? A regulator with a 48-hour filing deadline has urgency. A general public with a vague concern does not.',
        detailEs: '¿Su reclamación es urgente o crítica en el tiempo? Un regulador con plazo de presentación de 48 horas tiene urgencia. Un público general con preocupaciones vagas no la tiene.',
      },
      {
        label: 'Crisis Application',
        labelEs: 'Aplicación en Crisis',
        detail: 'Run a stakeholder map in the first 2 hours: list every stakeholder, score Power/Legitimacy/Urgency 1–3, rank total scores. The top 3–5 must receive direct personal outreach before any public statement.',
        detailEs: 'Elabore un mapa de partes interesadas en las primeras 2 horas: liste todas las partes, puntúe Poder/Legitimidad/Urgencia del 1 al 3, clasifique los puntajes totales. Las 3–5 primeras deben recibir contacto personal directo antes de cualquier declaración pública.',
      },
    ],
    usedInCases: ['case-04', 'case-06', 'case-12', 'case-L1', 'case-M1', 'case-M7', 'case-M8', 'case-M9', 'case-H10'],
  },

  // ══════════════════════════════════════════════════════════
  // INDUSTRY STANDARDS
  // ══════════════════════════════════════════════════════════

  {
    id: 'ungp',
    category: 'industry',
    icon: '🌐',
    title: 'UN Guiding Principles on Business & Human Rights (UNGP)',
    titleEs: 'Principios Rectores de la ONU sobre Empresas y Derechos Humanos',
    origin: 'John Ruggie, UN Special Representative — 2011 (endorsed by UNHRC)',
    originEs: 'John Ruggie, Representante Especial de la ONU — 2011 (respaldado por el CDHONU)',
    when: 'Any operation touching human rights — indigenous communities, environmental harm to populations, labour practices',
    whenEs: 'Cualquier operación que afecte los derechos humanos — comunidades indígenas, daño ambiental a poblaciones, prácticas laborales',
    summary:
      'The "Ruggie Framework" — Protect, Respect, Remedy — is the global baseline for corporate human rights due diligence. It has been adopted by the OECD, incorporated into EU legislation, and referenced in virtually every major international investment framework. NGOs use it as the primary benchmark for accountability claims against extractive industry companies.',
    summaryEs:
      'El "Marco Ruggie" — Proteger, Respetar, Remediar — es la línea base global para la diligencia debida en derechos humanos corporativos. Ha sido adoptado por la OCDE, incorporado a la legislación de la UE y referenciado en casi todos los marcos internacionales de inversión. Las ONG lo usan como referencia principal para reclamaciones de responsabilidad contra empresas extractivas.',
    principles: [
      {
        label: 'Pillar 1 — State Duty to Protect',
        labelEs: 'Pilar 1 — Deber del Estado de Proteger',
        detail: 'States must protect against human rights abuses by third parties (including corporations) through regulation, policy, and access to remedy. Companies operating where states fail to regulate are still bound by the standard.',
        detailEs: 'Los estados deben proteger contra abusos de derechos humanos por terceros (incluidas las corporaciones) mediante regulación, política y acceso a remedios. Las empresas que operan donde los estados no regulan siguen estando sujetas a la norma.',
      },
      {
        label: 'Pillar 2 — Corporate Responsibility to Respect',
        labelEs: 'Pilar 2 — Responsabilidad Corporativa de Respetar',
        detail: 'Companies must conduct human rights due diligence: identify actual and potential impacts, integrate findings into decisions, track performance, communicate how impacts are addressed. This applies across global supply chains.',
        detailEs: 'Las empresas deben realizar la debida diligencia en derechos humanos: identificar impactos reales y potenciales, integrar los hallazgos en las decisiones, realizar seguimiento del desempeño, comunicar cómo se abordan los impactos. Esto se aplica en cadenas de suministro globales.',
      },
      {
        label: 'Pillar 3 — Access to Remedy',
        labelEs: 'Pilar 3 — Acceso a Remedio',
        detail: 'Both judicial and non-judicial grievance mechanisms must be accessible, transparent, and effective. Company-run grievance mechanisms must meet the "effectiveness criteria" — or NGOs will challenge them as cosmetic.',
        detailEs: 'Los mecanismos de reparación judiciales y no judiciales deben ser accesibles, transparentes y efectivos. Los mecanismos de quejas de la empresa deben cumplir los "criterios de efectividad", o las ONG los cuestionarán como cosméticos.',
      },
      {
        label: 'Salient Issues in Extractives',
        labelEs: 'Problemas Relevantes en Industrias Extractivas',
        detail: 'The most commonly cited UNGP violations in extractive sector crises: failure to conduct prior HRDD before project approval, inadequate community consultation, security force conduct, environmental impacts on livelihood, and lack of effective grievance mechanisms.',
        detailEs: 'Las violaciones de los UNGP más citadas en crisis del sector extractivo: falta de debida diligencia en derechos humanos antes de la aprobación del proyecto, consulta comunitaria inadecuada, conducta de fuerzas de seguridad, impactos ambientales en medios de vida y falta de mecanismos de quejas efectivos.',
      },
    ],
    usedInCases: ['case-06', 'case-12', 'case-L1', 'case-M3', 'case-M5', 'case-M7', 'case-M8', 'case-M9', 'case-H9'],
    externalRef: 'https://www.ohchr.org/documents/publications/guidingprinciplesbusinesshr_en.pdf',
  },

  {
    id: 'equator-principles',
    category: 'industry',
    icon: '🌐',
    title: 'Equator Principles (EP4)',
    titleEs: 'Principios del Ecuador (EP4)',
    origin: 'International Finance Corporation — 2003, EP4 revised 2020',
    originEs: 'Corporación Financiera Internacional — 2003, EP4 revisado en 2020',
    when: 'Project finance for large infrastructure/extractive projects — lenders require EP compliance as a loan condition',
    whenEs: 'Financiamiento de proyectos para grandes proyectos de infraestructura/extractivos — los prestamistas exigen cumplimiento de EP como condición de préstamo',
    summary:
      'Adopted by 137 financial institutions in 37 countries covering over 70% of international project finance in emerging markets. The EPs require Environmental and Social Impact Assessments, stakeholder engagement, and grievance mechanisms for all Category A and B projects. Failure to maintain EP compliance can trigger loan default clauses.',
    summaryEs:
      'Adoptado por 137 instituciones financieras en 37 países, cubriendo más del 70% del financiamiento internacional de proyectos en mercados emergentes. Los PE requieren Evaluaciones de Impacto Ambiental y Social, participación de partes interesadas y mecanismos de quejas para todos los proyectos de Categoría A y B. El incumplimiento puede activar cláusulas de incumplimiento de préstamos.',
    principles: [
      {
        label: 'Category A Projects',
        labelEs: 'Proyectos Categoría A',
        detail: 'Significant adverse environmental/social impacts — diverse, irreversible, unprecedented. Require full ESIA, ongoing monitoring, and independent expert review. Oil, gas, and large mining projects typically qualify.',
        detailEs: 'Impactos ambientales/sociales adversos significativos — diversos, irreversibles, sin precedentes. Requieren EIAS completa, monitoreo continuo y revisión experta independiente. Los proyectos de petróleo, gas y minería a gran escala típicamente califican.',
      },
      {
        label: 'FPIC Requirement (EP4)',
        labelEs: 'Requisito de CPLI (EP4)',
        detail: 'EP4 added an explicit Free, Prior, and Informed Consent requirement for projects affecting indigenous peoples. Lenders must verify consent was genuine — not just procedural box-ticking.',
        detailEs: 'EP4 agregó un requisito explícito de Consentimiento Libre, Previo e Informado para proyectos que afecten a pueblos indígenas. Los prestamistas deben verificar que el consentimiento fue genuino, no solo un trámite formal.',
      },
      {
        label: 'Grievance Mechanism (PR7)',
        labelEs: 'Mecanismo de Quejas (PR7)',
        detail: 'Projects must establish a project-level grievance mechanism for affected communities. Must be culturally appropriate, transparent, and accessible without retribution.',
        detailEs: 'Los proyectos deben establecer un mecanismo de quejas a nivel de proyecto para las comunidades afectadas. Debe ser culturalmente apropiado, transparente y accesible sin represalias.',
      },
      {
        label: 'Crisis Communications Implication',
        labelEs: 'Implicación para Comunicaciones de Crisis',
        detail: 'If a crisis reveals EP non-compliance, the company faces not only reputational damage but potential loan acceleration. Communicators must coordinate messaging with legal and finance teams immediately.',
        detailEs: 'Si una crisis revela incumplimiento de los PE, la empresa enfrenta no solo daño reputacional sino potencial aceleración del préstamo. Los comunicadores deben coordinar los mensajes con los equipos legales y financieros de inmediato.',
      },
    ],
    usedInCases: ['case-L1', 'case-M1', 'case-M2', 'case-M6', 'case-M7', 'case-M8', 'case-M9'],
    externalRef: 'https://equator-principles.com/app/uploads/The_Equator_Principles_EP4_July2020.pdf',
  },

  {
    id: 'icmm',
    category: 'industry',
    icon: '🌐',
    title: 'ICMM Crisis Management Framework',
    titleEs: 'Marco de Gestión de Crisis del ICMM',
    origin: 'International Council on Mining & Metals — updated 2019',
    originEs: 'Consejo Internacional de Minería y Metales — actualizado en 2019',
    when: 'Mining sector crises — tailings, community conflicts, environmental incidents, worker safety',
    whenEs: 'Crisis del sector minero — relaves, conflictos comunitarios, incidentes ambientales, seguridad de trabajadores',
    summary:
      'The ICMM represents 28 of the world\'s largest mining companies. Its Crisis Management Framework provides the mining sector\'s de facto standard for incident response. Following Samarco and Brumadinho, the framework was revised with strengthened tailings dam monitoring and community notification requirements.',
    summaryEs:
      'El ICMM representa a 28 de las mayores empresas mineras del mundo. Su Marco de Gestión de Crisis proporciona el estándar de facto del sector minero para la respuesta a incidentes. Tras Samarco y Brumadinho, el marco fue revisado con requisitos fortalecidos de monitoreo de represas de relaves y notificación comunitaria.',
    principles: [
      {
        label: 'Tailings Management Standard (2020)',
        labelEs: 'Estándar de Gestión de Relaves (2020)',
        detail: 'The Global Industry Standard on Tailings Management requires: independent review board, annual publicly disclosed safety reports, consequence classification of all facilities, and community early-warning notification systems. Non-compliance is now a blocking issue for ICMM membership.',
        detailEs: 'El Estándar Global de la Industria sobre Gestión de Relaves requiere: junta de revisión independiente, informes de seguridad anuales divulgados públicamente, clasificación de consecuencias de todas las instalaciones y sistemas de notificación temprana comunitaria. El incumplimiento es ahora un problema bloqueante para la membresía del ICMM.',
      },
      {
        label: 'Community Notification Protocol',
        labelEs: 'Protocolo de Notificación Comunitaria',
        detail: 'Downstream communities must be notified before regulatory agencies, using their primary language and communication channels (radio, SMS, community leaders). Notification logs must be maintained.',
        detailEs: 'Las comunidades aguas abajo deben ser notificadas antes que las agencias reguladoras, usando su idioma principal y canales de comunicación (radio, SMS, líderes comunitarios). Se deben mantener registros de notificación.',
      },
      {
        label: 'CEO Response Standard',
        labelEs: 'Estándar de Respuesta del CEO',
        detail: 'For Category 1 incidents (fatalities or mass displacement), CEO personal presence at the affected site within 72 hours is now considered the industry minimum. Delegation to PR teams alone is considered reputationally unacceptable.',
        detailEs: 'Para incidentes de Categoría 1 (fatalidades o desplazamiento masivo), la presencia personal del CEO en el sitio afectado dentro de las 72 horas se considera ahora el mínimo de la industria. La delegación solo a equipos de PR se considera reputacionalmente inaceptable.',
      },
      {
        label: 'Third-Party Monitoring',
        labelEs: 'Monitoreo de Terceros',
        detail: 'Post-incident environmental monitoring must be conducted by an entity independent of both the company and the regulator. Joint government-community monitoring panels are considered best practice.',
        detailEs: 'El monitoreo ambiental post-incidente debe ser realizado por una entidad independiente tanto de la empresa como del regulador. Los paneles de monitoreo gobierno-comunidad conjuntos se consideran la mejor práctica.',
      },
    ],
    usedInCases: ['case-M1', 'case-M2', 'case-M3', 'case-M4', 'case-M5', 'case-M6', 'case-M7', 'case-M8', 'case-M9'],
    externalRef: 'https://www.icmm.com/en-gb/environment/tailings-management',
  },

  {
    id: 'iso-22301',
    category: 'industry',
    icon: '🌐',
    title: 'ISO 22301 — Business Continuity Management',
    titleEs: 'ISO 22301 — Gestión de Continuidad del Negocio',
    origin: 'International Organization for Standardization — 2019 (rev.)',
    originEs: 'Organización Internacional de Normalización — 2019 (rev.)',
    when: 'Pre-crisis preparation and post-crisis recovery planning for any sector',
    whenEs: 'Preparación pre-crisis y planificación de recuperación post-crisis para cualquier sector',
    summary:
      'ISO 22301 is the international standard for Business Continuity Management Systems (BCMS). While primarily operational, it has direct implications for crisis communications: it requires documented incident response plans, tested communications protocols, designated spokespersons, and regular simulation exercises — all of which directly determine how well a company performs in the first hours of a crisis.',
    summaryEs:
      'ISO 22301 es el estándar internacional para Sistemas de Gestión de Continuidad del Negocio (SGCN). Aunque principalmente operacional, tiene implicaciones directas para las comunicaciones de crisis: requiere planes documentados de respuesta a incidentes, protocolos de comunicación probados, portavoces designados y ejercicios de simulación regulares.',
    principles: [
      {
        label: 'Business Impact Analysis (BIA)',
        labelEs: 'Análisis de Impacto en el Negocio (AIN)',
        detail: 'Identify the most critical business functions, their dependencies, and the maximum tolerable downtime. Drives prioritisation in crisis response — what to protect first.',
        detailEs: 'Identificar las funciones comerciales más críticas, sus dependencias y el tiempo de inactividad máximo tolerable. Dirige la priorización en la respuesta a la crisis: qué proteger primero.',
      },
      {
        label: 'Communications Planning',
        labelEs: 'Planificación de Comunicaciones',
        detail: 'ISO 22301 Clause 7.4 requires documented internal and external communications procedures: who speaks to whom, by what channel, with what approval chain, within what time window.',
        detailEs: 'La Cláusula 7.4 de ISO 22301 requiere procedimientos documentados de comunicación interna y externa: quién habla con quién, por qué canal, con qué cadena de aprobación, dentro de qué ventana de tiempo.',
      },
      {
        label: 'Testing & Exercising',
        labelEs: 'Pruebas y Ejercicios',
        detail: 'Plans must be tested at least annually through tabletop exercises, functional drills, or full-scale simulations. Untested plans consistently fail in real crises — companies with regular drills demonstrate 40% faster response times.',
        detailEs: 'Los planes deben probarse al menos anualmente mediante ejercicios de mesa, simulacros funcionales o simulaciones a gran escala. Los planes no probados fallan consistentemente en crisis reales — las empresas con simulacros regulares demuestran tiempos de respuesta un 40% más rápidos.',
      },
      {
        label: 'Documentation Requirements',
        labelEs: 'Requisitos de Documentación',
        detail: 'Certified BCMS requires maintained records of: incident logs, decision chronologies, stakeholder notifications, and communications transcripts. These become critical evidence in regulatory and legal proceedings.',
        detailEs: 'El SGCN certificado requiere registros mantenidos de: registros de incidentes, cronologías de decisiones, notificaciones a partes interesadas y transcripciones de comunicaciones. Estos se convierten en evidencia crítica en procedimientos regulatorios y legales.',
      },
    ],
    externalRef: 'https://www.iso.org/iso-22301-business-continuity.html',
  },

  // ══════════════════════════════════════════════════════════
  // OPERATIONAL PROTOCOLS
  // ══════════════════════════════════════════════════════════

  {
    id: '72-hour-protocol',
    category: 'operational',
    icon: '⏱',
    title: 'Minerba 72-Hour Crisis Response Protocol',
    titleEs: 'Protocolo de Respuesta a Crisis de 72 Horas de Minerba',
    origin: 'Minerba Comunicación Corporativa — derived from Exxon Valdez (1989) post-mortems',
    originEs: 'Minerba Comunicación Corporativa — derivado de los análisis post-mortem del Exxon Valdez (1989)',
    when: 'First 72 hours of any publicly visible crisis in the energy, mining, or infrastructure sector',
    whenEs: 'Primeras 72 horas de cualquier crisis públicamente visible en el sector energético, minero o de infraestructura',
    summary:
      'The 72-Hour Protocol defines the critical response windows across the first three days of a crisis. It is derived from analysis of failures (Exxon Valdez, Deepwater Horizon, Samarco) and successes (J&J Tylenol, AstraZeneca vaccine pause). The Latin America adaptation addresses regional specifics: government sequencing, WhatsApp-first communications, community leader protocols, and regulatory relationships.',
    summaryEs:
      'El Protocolo de 72 Horas define las ventanas de respuesta críticas durante los primeros tres días de una crisis. Se deriva del análisis de fracasos (Exxon Valdez, Deepwater Horizon, Samarco) y éxitos (J&J Tylenol, pausa de vacuna AstraZeneca). La adaptación para América Latina aborda especificidades regionales: secuenciación gubernamental, comunicaciones WhatsApp primero, protocolos de líderes comunitarios y relaciones regulatorias.',
    principles: [
      {
        label: '0–2 Hours: Containment & Activation',
        labelEs: '0–2 Horas: Contención y Activación',
        detail: 'Notify CEO. Activate crisis team. Designate single spokesperson. Issue holding statement: "We are aware of [situation]. Safety of [people/environment] is our immediate priority. We will provide a full update within [X] hours." Do NOT speculate on cause. LATAM: Issue statement in Spanish/Portuguese first. Alert community leaders directly before press.',
        detailEs: 'Notificar al CEO. Activar equipo de crisis. Designar portavoz único. Emitir declaración provisional: "Somos conscientes de [situación]. La seguridad de [personas/entorno] es nuestra prioridad inmediata. Proporcionaremos una actualización completa en [X] horas." NO especular sobre la causa. LATAM: Emitir declaración primero en español/portugués. Alertar a líderes comunitarios directamente antes de la prensa.',
      },
      {
        label: '2–6 Hours: CEO Visibility',
        labelEs: '2–6 Horas: Visibilidad del CEO',
        detail: 'CEO must appear on camera with an empathy statement — even if facts are still unclear. Acknowledge the human impact. Do not lead with legal disclaimers. LATAM: Prioritize a WhatsApp video message to community WhatsApp groups before national media appearance.',
        detailEs: 'El CEO debe aparecer en cámara con una declaración de empatía, incluso si los hechos aún no están claros. Reconocer el impacto humano. No liderar con descargos legales. LATAM: Priorizar un mensaje de video por WhatsApp a grupos comunitarios de WhatsApp antes de la aparición en medios nacionales.',
      },
      {
        label: '6–24 Hours: First Full Briefing',
        labelEs: '6–24 Horas: Primer Informe Completo',
        detail: 'Provide the first complete public briefing with all confirmed facts. Establish a twice-daily communications cadence. LATAM: Brief government ministries (Environment, Energy, Regional Governor) BEFORE the press conference. If the minister hears it from CNN first, you have lost a critical ally.',
        detailEs: 'Proporcionar el primer informe público completo con todos los hechos confirmados. Establecer una cadencia de comunicaciones dos veces al día. LATAM: Informar a los ministerios gubernamentales (Ambiente, Energía, Gobernador Regional) ANTES de la conferencia de prensa. Si el ministro lo escucha por CNN primero, ha perdido un aliado crítico.',
      },
      {
        label: '24–48 Hours: Independent Monitoring',
        labelEs: '24–48 Horas: Monitoreo Independiente',
        detail: 'Announce independent third-party environmental and safety monitoring. The monitor must be genuinely independent — a local university, international NGO, or joint government-community body. Company-selected monitors are automatically discredited. Publish the monitor\'s first report publicly.',
        detailEs: 'Anunciar monitoreo ambiental y de seguridad independiente de terceros. El monitor debe ser genuinamente independiente — una universidad local, ONG internacional o un cuerpo gobierno-comunidad conjunto. Los monitores seleccionados por la empresa son automáticamente desacreditados. Publicar el primer informe del monitor públicamente.',
      },
      {
        label: '48–72 Hours: Community Commitment',
        labelEs: '48–72 Horas: Compromiso Comunitario',
        detail: 'CEO must travel to the affected community and meet with leaders in their space, not in a company facility. Announce a community support mechanism with independent governance. Commit to binding milestones — vague "ongoing commitment" language is reputationally worthless at this stage.',
        detailEs: 'El CEO debe viajar a la comunidad afectada y reunirse con líderes en su espacio, no en una instalación de la empresa. Anunciar un mecanismo de apoyo comunitario con gobernanza independiente. Comprometerse a hitos vinculantes — el lenguaje vago de "compromiso continuo" no tiene valor reputacional en esta etapa.',
      },
    ],
    usedInCases: ['case-01', 'case-04', 'case-08', 'case-09', 'case-10', 'case-M1', 'case-M2', 'case-H1'],
  },

  {
    id: 'social-media-protocol',
    category: 'operational',
    icon: '⏱',
    title: 'Social Media Crisis Response Protocol',
    titleEs: 'Protocolo de Respuesta a Crisis en Redes Sociales',
    origin: 'Minerba Comunicación Corporativa — synthesised from platform-specific best practices',
    originEs: 'Minerba Comunicación Corporativa — sintetizado de las mejores prácticas específicas de plataformas',
    when: 'Any crisis with significant social media activity — monitor activation within 30 minutes of first viral signal',
    whenEs: 'Cualquier crisis con actividad significativa en redes sociales — activar monitoreo dentro de los 30 minutos de la primera señal viral',
    summary:
      'Social media has compressed crisis response windows from days to minutes. A single viral video or tweet can now define the narrative before a company has issued its first statement. This protocol governs monitoring, escalation, response timing, and platform-specific decisions during a social media-amplified crisis.',
    summaryEs:
      'Las redes sociales han comprimido las ventanas de respuesta de días a minutos. Un solo video o tweet viral puede definir la narrativa antes de que una empresa haya emitido su primera declaración. Este protocolo rige el monitoreo, escalado, tiempos de respuesta y decisiones específicas de plataforma durante una crisis amplificada en redes sociales.',
    principles: [
      {
        label: 'Monitoring & Early Warning',
        labelEs: 'Monitoreo y Alerta Temprana',
        detail: 'Set up keyword alerts for company name, facility names, key personnel, and sector terms in the local language. In LATAM: WhatsApp group monitoring is as important as Twitter/X. A community organiser\'s WhatsApp broadcast can mobilise faster than any news outlet.',
        detailEs: 'Configurar alertas de palabras clave para el nombre de la empresa, nombres de instalaciones, personal clave y términos del sector en el idioma local. En LATAM: el monitoreo de grupos de WhatsApp es tan importante como Twitter/X. La transmisión de WhatsApp de un organizador comunitario puede movilizarse más rápido que cualquier medio de comunicación.',
      },
      {
        label: 'The 30-Minute Rule',
        labelEs: 'La Regla de los 30 Minutos',
        detail: 'If a post reaches 1,000 shares or 500 comments within 30 minutes, escalate immediately to communications director. If it reaches 5,000 within the hour, activate the crisis protocol regardless of whether traditional media have picked it up.',
        detailEs: 'Si una publicación alcanza 1.000 compartidos o 500 comentarios en 30 minutos, escalar inmediatamente al director de comunicaciones. Si alcanza 5.000 en la primera hora, activar el protocolo de crisis independientemente de si los medios tradicionales lo han recogido.',
      },
      {
        label: 'Respond vs. Dark Period Decision',
        labelEs: 'Decisión de Responder vs. Período de Silencio',
        detail: 'Never go dark on social media during a crisis — silence is interpreted as confirmation of the worst. If facts are not yet confirmed, the response is: "We are aware and are actively investigating. We will update within [X] hours." Update on schedule regardless of whether you have new information.',
        detailEs: 'Nunca entrar en silencio en redes sociales durante una crisis — el silencio se interpreta como confirmación de lo peor. Si los hechos no están confirmados, la respuesta es: "Somos conscientes y estamos investigando activamente. Actualizaremos en [X] horas." Actualizar según el horario independientemente de si hay nueva información.',
      },
      {
        label: 'Misinformation Response',
        labelEs: 'Respuesta a Desinformación',
        detail: 'For factual errors: correct once, clearly, with evidence — then stop engaging with the original thread. Do not amplify by repeating the false claim. For emotionally charged accusations without factual error: acknowledge the feeling, do not argue the narrative.',
        detailEs: 'Para errores fácticos: corregir una vez, claramente, con evidencia — luego dejar de interactuar con el hilo original. No amplificar repitiendo la afirmación falsa. Para acusaciones cargadas emocionalmente sin error fáctico: reconocer el sentimiento, no discutir la narrativa.',
      },
    ],
    usedInCases: ['case-04', 'case-06', 'case-09', 'case-M1', 'case-R1', 'case-H10'],
  },

  {
    id: 'spokesperson-protocol',
    category: 'operational',
    icon: '⏱',
    title: 'Crisis Spokesperson & Media Protocol',
    titleEs: 'Protocolo de Portavoz y Medios en Crisis',
    origin: 'Minerba Comunicación Corporativa — industry composite',
    originEs: 'Minerba Comunicación Corporativa — compuesto de la industria',
    when: 'Before any media interaction in a crisis — from holding statements to live television',
    whenEs: 'Antes de cualquier interacción con medios en una crisis — desde declaraciones provisionales hasta televisión en vivo',
    summary:
      'Spokesperson management is one of the highest-failure points in crisis communications. The wrong person, the wrong message, the wrong channel, or the wrong tone can create secondary crises that outlast the original event. This protocol governs spokesperson selection, message discipline, and media engagement decisions.',
    summaryEs:
      'La gestión de portavoces es uno de los puntos de mayor falla en las comunicaciones de crisis. La persona incorrecta, el mensaje incorrecto, el canal incorrecto o el tono incorrecto pueden crear crisis secundarias que duran más que el evento original. Este protocolo rige la selección de portavoces, la disciplina de mensajes y las decisiones de interacción con medios.',
    principles: [
      {
        label: 'Single Spokesperson Rule',
        labelEs: 'Regla del Portavoz Único',
        detail: 'One spokesperson per stakeholder audience. CEO for investors and national media. Operations director for regulators. Community liaison for affected communities. Technical director for environmental agencies. Fragmented spokespersons create contradictory messages — the Exxon Valdez failure was partly defined by multiple conflicting voices.',
        detailEs: 'Un portavoz por audiencia de partes interesadas. CEO para inversores y medios nacionales. Director de operaciones para reguladores. Enlace comunitario para comunidades afectadas. Director técnico para agencias ambientales. Los portavoces fragmentados crean mensajes contradictorios — el fracaso del Exxon Valdez fue en parte definido por múltiples voces contradictorias.',
      },
      {
        label: 'The Three-Message Framework',
        labelEs: 'El Marco de Tres Mensajes',
        detail: 'Every spokesperson interaction must contain three and only three core messages: (1) What you know to be true right now, (2) What you are doing about it, (3) Your commitment to the affected parties. Every answer to a journalist question should bridge back to one of these three messages.',
        detailEs: 'Cada interacción de portavoz debe contener tres y solo tres mensajes centrales: (1) Lo que sabe que es verdad ahora mismo, (2) Lo que está haciendo al respecto, (3) Su compromiso con las partes afectadas. Cada respuesta a una pregunta de periodista debe conectar de regreso a uno de estos tres mensajes.',
      },
      {
        label: 'Bridging Techniques',
        labelEs: 'Técnicas de Conexión',
        detail: '"That\'s an important question — what I can tell you is..." / "Before I address that, the most important thing to know is..." / "I don\'t have that information right now, but what I do know is..." These phrases are not evasion — they are how trained spokespersons maintain message control under adversarial questioning.',
        detailEs: '"Esa es una pregunta importante — lo que puedo decirle es..." / "Antes de abordar eso, lo más importante es..." / "No tengo esa información ahora, pero lo que sí sé es..." Estas frases no son evasión — así es como los portavoces entrenados mantienen el control del mensaje bajo preguntas adversariales.',
      },
      {
        label: 'When NOT to Do Live Television',
        labelEs: 'Cuándo NO Hacer Televisión en Vivo',
        detail: 'Avoid live television if: facts are still evolving, legal counsel has flagged liability risk, the spokesperson has not slept in 24+ hours, the interviewer is known for ambush techniques, or the company position has changed in the last 6 hours. A taped statement with a delay is always better than a live disaster.',
        detailEs: 'Evitar televisión en vivo si: los hechos aún están evolucionando, el asesor legal ha marcado riesgo de responsabilidad, el portavoz no ha dormido en 24+ horas, el entrevistador es conocido por técnicas de emboscada, o la posición de la empresa ha cambiado en las últimas 6 horas. Una declaración grabada con retraso siempre es mejor que un desastre en vivo.',
      },
    ],
    usedInCases: ['case-01', 'case-04', 'case-08', 'case-11', 'case-H2', 'case-H4', 'case-H8'],
  },

  // ══════════════════════════════════════════════════════════
  // LATAM-SPECIFIC
  // ══════════════════════════════════════════════════════════

  {
    id: 'fpic',
    category: 'latam',
    icon: '🌎',
    title: 'FPIC / Consulta Previa Checklist',
    titleEs: 'Lista de Verificación CPLI / Consulta Previa',
    origin: 'ILO Convention 169 (1989) · UNDRIP (2007) · Minerba adaptation',
    originEs: 'Convenio 169 de la OIT (1989) · DNUDPI (2007) · Adaptación Minerba',
    when: 'Any energy or mining operation in or near indigenous or traditional community territories in Latin America',
    whenEs: 'Cualquier operación energética o minera en o cerca de territorios indígenas o de comunidades tradicionales en América Latina',
    summary:
      'Free, Prior, and Informed Consent (FPIC) is a legally binding requirement under ILO Convention 169 (ratified by most Latin American states) and the UN Declaration on the Rights of Indigenous Peoples. Failure to conduct genuine consulta previa is the single most common cause of operational shutdowns and social license revocation in the Latin American extractive sector.',
    summaryEs:
      'El Consentimiento Libre, Previo e Informado (CLPI) es un requisito legalmente vinculante bajo el Convenio 169 de la OIT (ratificado por la mayoría de los estados latinoamericanos) y la Declaración de la ONU sobre los Derechos de los Pueblos Indígenas. La falta de una consulta previa genuina es la causa más común de cierres operacionales y revocación de licencia social en el sector extractivo latinoamericano.',
    principles: [
      {
        label: '1. Community Baseline Study',
        labelEs: '1. Estudio de Línea Base Comunitaria',
        detail: 'Conduct and publicly disclose a community baseline study covering livelihoods, land use, health status, cultural heritage, and resource dependency — before any project planning begins. Must be conducted with community participation, not by the company alone.',
        detailEs: 'Realizar y divulgar públicamente un estudio de línea base comunitaria que cubra medios de vida, uso de la tierra, estado de salud, patrimonio cultural y dependencia de recursos — antes de que comience cualquier planificación del proyecto. Debe realizarse con participación comunitaria, no solo por la empresa.',
      },
      {
        label: '2. Process Timing',
        labelEs: '2. Cronograma del Proceso',
        detail: 'Initiate consulta previa at least 12 months before any physical operations begin. Courts in Colombia, Peru, Ecuador, and Brazil have nullified projects that began consultation less than 6 months before operations — treating it as notification rather than genuine consultation.',
        detailEs: 'Iniciar la consulta previa al menos 12 meses antes de que comiencen las operaciones físicas. Los tribunales en Colombia, Perú, Ecuador y Brasil han anulado proyectos que iniciaron la consulta menos de 6 meses antes de las operaciones, tratándola como notificación en lugar de consulta genuina.',
      },
      {
        label: '3. Representative Selection',
        labelEs: '3. Selección de Representantes',
        detail: 'Community representatives must be chosen by the community through its own customary procedures — not pre-selected by the company or government. The company may not recognise "compliant" community leaders as the legitimate voice if they are not the community\'s own choice.',
        detailEs: 'Los representantes de la comunidad deben ser elegidos por la comunidad a través de sus propios procedimientos consuetudinarios, no preseleccionados por la empresa o el gobierno. La empresa no puede reconocer líderes comunitarios "complacientes" como la voz legítima si no son la elección propia de la comunidad.',
      },
      {
        label: '4. Consent vs. Consultation',
        labelEs: '4. Consentimiento vs. Consulta',
        detail: 'The legal standard in most LATAM jurisdictions has shifted from "right to be consulted" to "right to withhold consent." A consultation process that culminates in the company proceeding regardless of community opposition is legally challengeable and operationally dangerous.',
        detailEs: 'El estándar legal en la mayoría de las jurisdicciones de LATAM ha pasado del "derecho a ser consultado" al "derecho a negar el consentimiento". Un proceso de consulta que culmina con la empresa procediendo independientemente de la oposición comunitaria es legalmente cuestionable y operacionalmente peligroso.',
      },
      {
        label: '5. Benefit Fund Governance',
        labelEs: '5. Gobernanza del Fondo de Beneficios',
        detail: 'Community benefit commitments must be structured as independently governed funds — not company foundations, not royalty adjustments that require legal enforcement, and not in-kind contributions the company controls. Judicial oversight of benefit funds has become standard in LATAM arbitration outcomes.',
        detailEs: 'Los compromisos de beneficios comunitarios deben estructurarse como fondos con gobernanza independiente, no fundaciones de empresa, no ajustes de regalías que requieren ejecución legal, y no contribuciones en especie que la empresa controla. La supervisión judicial de los fondos de beneficios se ha vuelto estándar en los resultados de arbitraje de LATAM.',
      },
      {
        label: '6. Language & Publication',
        labelEs: '6. Idioma y Publicación',
        detail: 'All environmental monitoring results, project changes, and consultation outcomes must be published in the community\'s primary language — including indigenous languages where applicable. Spanish-only disclosure in a Quechua-speaking territory has been held invalid by Peruvian and Ecuadorian courts.',
        detailEs: 'Todos los resultados de monitoreo ambiental, cambios en el proyecto y resultados de consulta deben publicarse en el idioma principal de la comunidad, incluidos los idiomas indígenas cuando corresponda. La divulgación solo en español en un territorio de habla quechua ha sido declarada inválida por tribunales peruanos y ecuatorianos.',
      },
    ],
    usedInCases: ['case-12', 'case-L1', 'case-L3', 'case-M3', 'case-M4', 'case-M5', 'case-M7', 'case-M8', 'case-M9', 'case-H9'],
    externalRef: 'https://www.ilo.org/dyn/normlex/en/f?p=NORMLEXPUB:12100:0::NO::P12100_INSTRUMENT_ID:312314',
  },

  {
    id: 'anti-corruption',
    category: 'latam',
    icon: '🌎',
    title: 'Anti-Corruption Market Entry Checklist',
    titleEs: 'Lista Anti-Corrupción para Entrada al Mercado',
    origin: 'FCPA (US, 1977) · UKBA (UK, 2010) · Minerba LATAM adaptation',
    originEs: 'FCPA (EE.UU., 1977) · UKBA (RU, 2010) · Adaptación LATAM de Minerba',
    when: 'Market entry and ongoing operations in any Latin American jurisdiction — mandatory before engaging local agents, partners, or state entities',
    whenEs: 'Entrada al mercado y operaciones continuas en cualquier jurisdicción latinoamericana — obligatorio antes de contratar agentes locales, socios o entidades estatales',
    summary:
      'Corruption-related crises in Latin America carry a compounding risk: they typically involve FCPA or UKBA extraterritorial jurisdiction (meaning US/UK prosecutors), domestic criminal exposure, regulatory licence revocation, and social license collapse simultaneously. The Lava Jato investigation became the largest corruption prosecution in history and implicated companies on six continents.',
    summaryEs:
      'Las crisis relacionadas con la corrupción en América Latina conllevan un riesgo compuesto: típicamente involucran jurisdicción extraterritorial FCPA o UKBA (lo que significa fiscales de EE.UU./RU), exposición criminal doméstica, revocación de licencia regulatoria y colapso de licencia social simultáneamente. La investigación Lava Jato se convirtió en el mayor proceso judicial por corrupción en la historia e implicó a empresas en seis continentes.',
    principles: [
      {
        label: '1. FCPA Risk Assessment',
        labelEs: '1. Evaluación de Riesgo FCPA',
        detail: 'Any company with US-listed securities or using USD-denominated transactions is subject to FCPA. Conduct a jurisdiction-by-jurisdiction risk assessment covering: TI Corruption Perceptions Index score, local enforcement history, sector-specific corruption patterns (licensing, environmental permits, customs).',
        detailEs: 'Cualquier empresa con valores cotizados en EE.UU. o que use transacciones denominadas en USD está sujeta a la FCPA. Realizar una evaluación de riesgo jurisdicción por jurisdicción que cubra: puntaje del Índice de Percepción de Corrupción de Transparencia Internacional, historial local de aplicación, patrones de corrupción específicos del sector (licencias, permisos ambientales, aduanas).',
      },
      {
        label: '2. Third-Party Due Diligence',
        labelEs: '2. Debida Diligencia de Terceros',
        detail: 'Enhanced due diligence required on all local agents, intermediaries, consultants, and JV partners. Minimum: politically exposed persons check, beneficial ownership verification, references from prior clients, contractual anti-corruption representations and warranties with right to audit.',
        detailEs: 'Se requiere debida diligencia mejorada en todos los agentes locales, intermediarios, consultores y socios de JV. Mínimo: verificación de personas expuestas políticamente, verificación de titularidad beneficiaria, referencias de clientes anteriores, representaciones y garantías contractuales anti-corrupción con derecho de auditoría.',
      },
      {
        label: '3. State Partner Exposure',
        labelEs: '3. Exposición del Socio Estatal',
        detail: 'Operations involving state-owned energy or mining companies (Pemex, Petrobras, PDVSA, ENAP, Ecopetrol, etc.) carry elevated FCPA risk. All financial flows through state partner relationships must be documented, segregated, and subject to independent audit.',
        detailEs: 'Las operaciones que involucran empresas estatales de energía o minería (Pemex, Petrobras, PDVSA, ENAP, Ecopetrol, etc.) conllevan mayor riesgo de FCPA. Todos los flujos financieros a través de relaciones con socios estatales deben estar documentados, segregados y sujetos a auditoría independiente.',
      },
      {
        label: '4. Voluntary Disclosure Protocol',
        labelEs: '4. Protocolo de Divulgación Voluntaria',
        detail: 'If internal investigation reveals FCPA or domestic corruption exposure: engage specialist US/UK legal counsel before any disclosure. Voluntary self-disclosure to DOJ typically reduces penalties by 25–35% and avoids criminal prosecution. But timing and scope of disclosure are critical — poorly managed voluntary disclosure can expand liability.',
        detailEs: 'Si una investigación interna revela exposición FCPA o corrupción doméstica: contratar asesoría legal especializada en EE.UU./RU antes de cualquier divulgación. La autodivulgación voluntaria al DOJ típicamente reduce las penalidades en un 25–35% y evita el procesamiento penal. Pero el momento y alcance de la divulgación son críticos.',
      },
      {
        label: '5. Crisis Narrative Control',
        labelEs: '5. Control de la Narrativa de Crisis',
        detail: 'In a corruption crisis, the most dangerous PR move is the one your legal team did not approve. Coordinate all public messaging with internal and external legal counsel. The gap between what you say publicly and what the investigation reveals is where secondary crises are born.',
        detailEs: 'En una crisis de corrupción, el movimiento de PR más peligroso es el que su equipo legal no aprobó. Coordinar todos los mensajes públicos con asesores legales internos y externos. La brecha entre lo que dice públicamente y lo que revela la investigación es donde nacen las crisis secundarias.',
      },
    ],
    usedInCases: ['case-07', 'case-13', 'case-L2', 'case-L3', 'case-R1', 'case-H6'],
    externalRef: 'https://www.justice.gov/criminal/fraud/fcpa',
  },

  {
    id: 'latam-regulatory',
    category: 'latam',
    icon: '🌎',
    title: 'LATAM Regulatory Relations Playbook',
    titleEs: 'Manual de Relaciones Regulatorias para LATAM',
    origin: 'Minerba Comunicación Corporativa — synthesised from ANLA (Colombia), SEMARNAT (Mexico), IBAMA (Brazil), OEFA (Peru)',
    originEs: 'Minerba Comunicación Corporativa — sintetizado de ANLA (Colombia), SEMARNAT (México), IBAMA (Brasil), OEFA (Perú)',
    when: 'Any regulatory interaction during or after a crisis — before, during, and after formal proceedings',
    whenEs: 'Cualquier interacción regulatoria durante o después de una crisis — antes, durante y después de procedimientos formales',
    summary:
      'Latin American environmental and mining regulators have expanded enforcement powers significantly since 2010. Each major market has distinct agency structures, enforcement cultures, and political dynamics. Treating a LATAM regulator like a US EPA interaction — formal, arms-length, compliance-focused — is a common and costly mistake.',
    summaryEs:
      'Los reguladores ambientales y mineros latinoamericanos han ampliado significativamente sus poderes de aplicación desde 2010. Cada mercado principal tiene estructuras de agencias distintas, culturas de aplicación y dinámicas políticas. Tratar a un regulador de LATAM como una interacción con la EPA de EE.UU. — formal, distante, enfocada en cumplimiento — es un error común y costoso.',
    principles: [
      {
        label: 'Relationship vs. Compliance Orientation',
        labelEs: 'Orientación de Relación vs. Cumplimiento',
        detail: 'In most LATAM jurisdictions, regulatory outcomes are significantly influenced by the quality of the relationship between company and agency — not just compliance status. Companies that invest in proactive, transparent relationships with regulators before a crisis consistently receive more cooperative treatment during enforcement proceedings.',
        detailEs: 'En la mayoría de las jurisdicciones de LATAM, los resultados regulatorios están significativamente influenciados por la calidad de la relación entre la empresa y la agencia, no solo el estado de cumplimiento. Las empresas que invierten en relaciones proactivas y transparentes con los reguladores antes de una crisis consistentemente reciben un trato más cooperativo durante los procedimientos de aplicación.',
      },
      {
        label: 'Ministry Briefing Sequence',
        labelEs: 'Secuencia de Información a Ministerios',
        detail: 'In a crisis, the correct briefing sequence is: (1) Environment Ministry, (2) Energy/Mining Ministry, (3) Regional Governor, (4) Municipal Mayor, (5) Community leaders — then press conference. Companies that brief press before ministries routinely face expedited enforcement action and lose regulatory allies.',
        detailEs: 'En una crisis, la secuencia correcta de información es: (1) Ministerio de Ambiente, (2) Ministerio de Energía/Minería, (3) Gobernador Regional, (4) Alcalde Municipal, (5) Líderes comunitarios — luego conferencia de prensa. Las empresas que informan a la prensa antes que a los ministerios rutinariamente enfrentan acciones de aplicación aceleradas y pierden aliados regulatorios.',
      },
      {
        label: 'Political Exposure Risk',
        labelEs: 'Riesgo de Exposición Política',
        detail: 'In election years or politically contested periods, regulatory enforcement in LATAM is often amplified for political reasons. Assess the political calendar before any significant operational change and build relationships with all major political actors — not only the governing party.',
        detailEs: 'En años electorales o períodos políticamente disputados, la aplicación regulatoria en LATAM a menudo se amplifica por razones políticas. Evaluar el calendario político antes de cualquier cambio operacional significativo y construir relaciones con todos los actores políticos principales, no solo con el partido gobernante.',
      },
      {
        label: 'Documentation for Defense',
        labelEs: 'Documentación para Defensa',
        detail: 'Maintain contemporaneous records of all regulatory notifications, meeting minutes, submitted reports, and compliance actions. In LATAM proceedings, the company that produces a complete documentary record demonstrating good-faith compliance effort consistently receives significantly lower penalties.',
        detailEs: 'Mantener registros contemporáneos de todas las notificaciones regulatorias, actas de reuniones, informes presentados y acciones de cumplimiento. En los procedimientos de LATAM, la empresa que produce un registro documental completo que demuestra esfuerzo de cumplimiento de buena fe consistentemente recibe penalidades significativamente menores.',
      },
    ],
    usedInCases: ['case-07', 'case-11', 'case-L1', 'case-L2', 'case-L3', 'case-M4', 'case-M9'],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export const CATEGORY_META: Record<
  FrameworkCategory,
  { label: string; labelEs: string; icon: string; description: string; descriptionEs: string }
> = {
  academic: {
    label: 'Academic Frameworks',
    labelEs: 'Marcos Académicos',
    icon: '🎓',
    description: 'Peer-reviewed theories from crisis communications research — the intellectual foundation for practice.',
    descriptionEs: 'Teorías revisadas por pares de la investigación en comunicaciones de crisis — la base intelectual para la práctica.',
  },
  industry: {
    label: 'Industry Standards',
    labelEs: 'Estándares de la Industria',
    icon: '🌐',
    description: 'International body guidelines and certification standards adopted by major extractive companies.',
    descriptionEs: 'Directrices de organismos internacionales y estándares de certificación adoptados por las principales empresas extractivas.',
  },
  operational: {
    label: 'Operational Protocols',
    labelEs: 'Protocolos Operacionales',
    icon: '⏱',
    description: 'Practical playbooks and checklists for in-crisis and pre-crisis use.',
    descriptionEs: 'Manuales prácticos y listas de verificación para uso durante la crisis y antes de la crisis.',
  },
  latam: {
    label: 'Latin America Specific',
    labelEs: 'Específico para América Latina',
    icon: '🌎',
    description: 'Tools and adaptations calibrated to LATAM legal, cultural, and political realities.',
    descriptionEs: 'Herramientas y adaptaciones calibradas para las realidades legales, culturales y políticas de LATAM.',
  },
};

export function getFrameworksByCategory(category: FrameworkCategory): FrameworkItem[] {
  return FRAMEWORKS.filter((f) => f.category === category);
}

/** Alias map — legacy IDs used in older case files / quiz-prompts */
export const FRAMEWORK_ALIASES: Record<string, string> = {
  'fpic-checklist': 'fpic',
  'anti-corruption-checklist': 'anti-corruption',
};

export function getFrameworkById(id: string): FrameworkItem | undefined {
  const resolved = FRAMEWORK_ALIASES[id] ?? id;
  return FRAMEWORKS.find((f) => f.id === resolved);
}

/**
 * Returns all lookup keys that resolve to the given canonical framework ID.
 * Used when cross-referencing learning paths against framework IDs.
 */
export function getFrameworkKeys(canonicalId: string): string[] {
  const aliases = Object.entries(FRAMEWORK_ALIASES)
    .filter(([, v]) => v === canonicalId)
    .map(([k]) => k);
  return [canonicalId, ...aliases];
}
