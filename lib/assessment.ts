// ─── Crisis Readiness Assessment ─────────────────────────────────────────────
// No Node.js imports — safe in client components.

export type AssessmentCategory = 'strategic' | 'operational' | 'latam' | 'training';

export interface AssessmentOption {
  value: 0 | 1 | 2 | 3;
  label: string;
  labelEs: string;
}

export interface AssessmentQuestion {
  id: string;
  category: AssessmentCategory;
  question: string;
  questionEs: string;
  options: AssessmentOption[];
  linkedGlossaryId?: string;
  criticalGap?: boolean; // flags gaps that are especially high risk
}

export const CATEGORY_META: Record<
  AssessmentCategory,
  { label: string; labelEs: string; icon: string; color: string; barColor: string; description: string; descriptionEs: string }
> = {
  strategic: {
    label: 'Strategic Preparedness',
    labelEs: 'Preparación Estratégica',
    icon: '♟',
    color: 'text-navy-700',
    barColor: 'bg-navy-500',
    description: 'Leadership visibility, crisis planning, and executive readiness',
    descriptionEs: 'Visibilidad del liderazgo, planificación de crisis y preparación ejecutiva',
  },
  operational: {
    label: 'Operational Readiness',
    labelEs: 'Preparación Operativa',
    icon: '⚙️',
    color: 'text-blue-700',
    barColor: 'bg-blue-500',
    description: 'Tools, templates, and systems ready to activate at incident',
    descriptionEs: 'Herramientas, plantillas y sistemas listos para activar ante un incidente',
  },
  latam: {
    label: 'LATAM & Regulatory',
    labelEs: 'LATAM y Regulatorio',
    icon: '🌎',
    color: 'text-green-700',
    barColor: 'bg-green-500',
    description: 'Indigenous rights, community engagement, and anti-corruption compliance',
    descriptionEs: 'Derechos indígenas, compromiso comunitario y cumplimiento anti-corrupción',
  },
  training: {
    label: 'Simulation & Learning',
    labelEs: 'Simulación y Aprendizaje',
    icon: '🎯',
    color: 'text-amber-700',
    barColor: 'bg-amber-500',
    description: 'Crisis rehearsal frequency, debrief quality, and organisational learning',
    descriptionEs: 'Frecuencia de ensayos de crisis, calidad del debrief y aprendizaje organizacional',
  },
};

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  // ── STRATEGIC ──────────────────────────────────────────────────────────────
  {
    id: 'spokesperson',
    category: 'strategic',
    criticalGap: true,
    question: 'Does your organisation have a designated crisis spokesperson who has received formal media training?',
    questionEs: '¿Su organización tiene un vocero de crisis designado que ha recibido capacitación formal en medios?',
    linkedGlossaryId: 'crisis-spokesperson',
    options: [
      { value: 0, label: 'No designated spokesperson exists', labelEs: 'No existe vocero designado' },
      { value: 1, label: 'Someone identified informally, not yet trained', labelEs: 'Alguien identificado informalmente, sin capacitación' },
      { value: 2, label: 'Trained spokesperson, but media training is 2+ years old', labelEs: 'Vocero capacitado, pero la capacitación tiene 2+ años' },
      { value: 3, label: 'Trained spokesperson with media training in the last 12 months', labelEs: 'Vocero capacitado con entrenamiento en medios en los últimos 12 meses' },
    ],
  },
  {
    id: 'crisis-plan',
    category: 'strategic',
    question: 'Does your organisation have a written crisis communications plan?',
    questionEs: '¿Su organización tiene un plan de comunicaciones de crisis por escrito?',
    options: [
      { value: 0, label: 'No written crisis communications plan', labelEs: 'No existe un plan escrito' },
      { value: 1, label: 'A draft or framework exists but is incomplete', labelEs: 'Existe un borrador o marco incompleto' },
      { value: 2, label: 'Written plan exists but has not been reviewed in 3+ years', labelEs: 'Plan escrito existe pero no ha sido revisado en 3+ años' },
      { value: 3, label: 'Written, tested, and reviewed in the last 2 years', labelEs: 'Escrito, probado y revisado en los últimos 2 años' },
    ],
  },
  {
    id: 'csuite-simulation',
    category: 'strategic',
    question: 'Has your C-suite participated in a crisis communications simulation?',
    questionEs: '¿Su equipo directivo ha participado en una simulación de comunicaciones de crisis?',
    options: [
      { value: 0, label: 'C-suite has never done a crisis simulation', labelEs: 'El equipo directivo nunca ha hecho una simulación' },
      { value: 1, label: 'One simulation was run at some point, not recently', labelEs: 'Se realizó una simulación en algún momento, no recientemente' },
      { value: 2, label: 'Simulation conducted within the last 3 years', labelEs: 'Simulación realizada en los últimos 3 años' },
      { value: 3, label: 'Full C-suite simulation within the last 18 months', labelEs: 'Simulación completa del equipo directivo en los últimos 18 meses' },
    ],
  },

  // ── OPERATIONAL ────────────────────────────────────────────────────────────
  {
    id: 'holding-statements',
    category: 'operational',
    criticalGap: true,
    question: 'Do you have pre-approved holding statements ready for your most likely crisis scenarios?',
    questionEs: '¿Tiene declaraciones de contención pre-aprobadas listas para sus escenarios de crisis más probables?',
    linkedGlossaryId: 'holding-statement',
    options: [
      { value: 0, label: 'No holding statements prepared', labelEs: 'No hay declaraciones preparadas' },
      { value: 1, label: 'A general template exists but not scenario-specific', labelEs: 'Existe una plantilla general, no específica por escenario' },
      { value: 2, label: 'Holding statements exist for some scenarios, not reviewed recently', labelEs: 'Existen para algunos escenarios, no revisadas recientemente' },
      { value: 3, label: 'Pre-approved, scenario-specific holding statements for top 3 crisis types', labelEs: 'Declaraciones pre-aprobadas y específicas para los 3 principales tipos de crisis' },
    ],
  },
  {
    id: 'dark-site',
    category: 'operational',
    question: 'Do you have a crisis-specific website (dark site) that can be activated rapidly?',
    questionEs: '¿Tiene un sitio web específico para crisis (dark site) que pueda activarse rápidamente?',
    linkedGlossaryId: 'dark-site',
    options: [
      { value: 0, label: 'No crisis-specific website exists', labelEs: 'No existe un sitio web específico para crisis' },
      { value: 1, label: 'Crisis content planned but not yet built', labelEs: 'Contenido de crisis planeado pero no construido' },
      { value: 2, label: 'Dark site exists but activation time is unknown', labelEs: 'Existe pero el tiempo de activación es desconocido' },
      { value: 3, label: 'Tested dark site activatable within 60 minutes', labelEs: 'Sitio de crisis probado, activable en 60 minutos' },
    ],
  },
  {
    id: 'stakeholder-map',
    category: 'operational',
    question: 'Do you have a pre-built stakeholder contact list for a crisis scenario?',
    questionEs: '¿Tiene una lista de contactos de partes interesadas pre-construida para un escenario de crisis?',
    linkedGlossaryId: 'stakeholder-mapping',
    options: [
      { value: 0, label: 'No pre-built stakeholder contact list', labelEs: 'No existe lista de contactos de partes interesadas' },
      { value: 1, label: 'General media contact list only', labelEs: 'Solo existe una lista de contactos de medios' },
      { value: 2, label: 'Media and government contacts, but no community or NGO contacts', labelEs: 'Medios y gobierno, sin contactos comunitarios u ONG' },
      { value: 3, label: 'Complete list: media, government, NGOs, community leaders with preferred channels', labelEs: 'Lista completa: medios, gobierno, ONG, líderes comunitarios con canales preferidos' },
    ],
  },

  // ── LATAM ──────────────────────────────────────────────────────────────────
  {
    id: 'fpic',
    category: 'latam',
    criticalGap: true,
    question: 'Have you completed FPIC / consulta previa processes for operations in or near indigenous territories?',
    questionEs: '¿Ha completado procesos de CLPI / consulta previa para operaciones en o cerca de territorios indígenas?',
    linkedGlossaryId: 'fpic',
    options: [
      { value: 0, label: 'No FPIC or consulta previa process in place', labelEs: 'No existe proceso de CLPI o consulta previa' },
      { value: 1, label: 'Process initiated but not completed for all relevant areas', labelEs: 'Proceso iniciado pero no completado para todas las áreas relevantes' },
      { value: 2, label: 'Consulta previa completed but not documented for community use', labelEs: 'Consulta previa completada pero no documentada para uso comunitario' },
      { value: 3, label: 'Fully documented FPIC for all relevant territories with community-accessible records', labelEs: 'CLPI completamente documentado para todos los territorios con registros accesibles a la comunidad' },
    ],
  },
  {
    id: 'community-channel',
    category: 'latam',
    question: 'Do you have a direct communication channel to community leaders in your operating areas?',
    questionEs: '¿Tiene un canal de comunicación directo con los líderes comunitarios en sus áreas de operación?',
    linkedGlossaryId: 'whatsapp-communications',
    options: [
      { value: 0, label: 'No direct channel to community leaders', labelEs: 'No existe canal directo con líderes comunitarios' },
      { value: 1, label: 'Community liaison identified but no formal protocol', labelEs: 'Enlace comunitario identificado pero sin protocolo formal' },
      { value: 2, label: 'Protocol exists but not regularly tested', labelEs: 'Protocolo existe pero no se prueba regularmente' },
      { value: 3, label: 'Active direct channel (e.g. WhatsApp) to community leaders, tested in last 6 months', labelEs: 'Canal directo activo (ej. WhatsApp) con líderes, probado en últimos 6 meses' },
    ],
  },
  {
    id: 'anti-corruption',
    category: 'latam',
    question: 'Does your organisation have an active anti-corruption compliance programme covering all LATAM operations?',
    questionEs: '¿Su organización tiene un programa activo de cumplimiento anti-corrupción que cubra todas sus operaciones en LATAM?',
    linkedGlossaryId: 'fcpa',
    options: [
      { value: 0, label: 'No formal anti-corruption programme', labelEs: 'No existe programa formal anti-corrupción' },
      { value: 1, label: 'Policy exists but is not actively enforced or audited', labelEs: 'Existe una política pero no se aplica ni audita activamente' },
      { value: 2, label: 'Policy and training in place; third-party audit not yet conducted', labelEs: 'Política y capacitación establecidas; auditoría de terceros aún no realizada' },
      { value: 3, label: 'Active programme with third-party audit in the last 2 years', labelEs: 'Programa activo con auditoría de terceros en los últimos 2 años' },
    ],
  },

  // ── TRAINING ───────────────────────────────────────────────────────────────
  {
    id: 'last-simulation',
    category: 'training',
    question: 'When did your organisation last run a full crisis communications simulation?',
    questionEs: '¿Cuándo realizó su organización por última vez una simulación completa de comunicaciones de crisis?',
    options: [
      { value: 0, label: 'Never', labelEs: 'Nunca' },
      { value: 1, label: 'More than 3 years ago', labelEs: 'Hace más de 3 años' },
      { value: 2, label: 'Within the last 1–3 years', labelEs: 'En los últimos 1–3 años' },
      { value: 3, label: 'Within the last 12 months', labelEs: 'En los últimos 12 meses' },
    ],
  },
  {
    id: 'debrief',
    category: 'training',
    question: 'Does your organisation conduct structured post-crisis debriefs and implement lessons learned?',
    questionEs: '¿Su organización realiza debriefs estructurados post-crisis e implementa las lecciones aprendidas?',
    options: [
      { value: 0, label: 'No formal debrief process', labelEs: 'No existe proceso formal de debrief' },
      { value: 1, label: 'Informal debriefs occasionally conducted', labelEs: 'Debriefs informales realizados ocasionalmente' },
      { value: 2, label: 'Formal debrief for major incidents only, not always actioned', labelEs: 'Debrief formal solo para incidentes mayores, no siempre ejecutado' },
      { value: 3, label: 'Structured debrief after every incident or simulation with documented actions', labelEs: 'Debrief estructurado después de cada incidente o simulación con acciones documentadas' },
    ],
  },
  {
    id: 'social-media-protocol',
    category: 'training',
    question: 'Does your crisis plan include a social media and misinformation response protocol?',
    questionEs: '¿Su plan de crisis incluye un protocolo de respuesta a redes sociales y desinformación?',
    options: [
      { value: 0, label: 'No social media crisis protocol', labelEs: 'No existe protocolo de crisis para redes sociales' },
      { value: 1, label: 'General social media policy, no crisis-specific protocol', labelEs: 'Política general de redes sociales, sin protocolo específico para crisis' },
      { value: 2, label: 'Crisis social media protocol exists but has not been rehearsed', labelEs: 'Protocolo de crisis existe pero no ha sido ensayado' },
      { value: 3, label: 'Rehearsed protocol including misinformation response, activatable in 30 minutes', labelEs: 'Protocolo ensayado incluyendo respuesta a desinformación, activable en 30 minutos' },
    ],
  },
];

// ── Score computation ─────────────────────────────────────────────────────────

export type ScoreBand = 'critical' | 'at-risk' | 'developing' | 'prepared' | 'optimised';

export const SCORE_BANDS: Record<ScoreBand, {
  label: string;
  labelEs: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
  descriptionEs: string;
}> = {
  critical: {
    label: 'Critical Risk',
    labelEs: 'Riesgo Crítico',
    color: 'text-red-700',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-300',
    description: 'Significant vulnerabilities exist across multiple areas. A crisis today would likely result in severe reputational and operational damage.',
    descriptionEs: 'Existen vulnerabilidades significativas en múltiples áreas. Una crisis hoy probablemente resultaría en daño reputacional y operativo severo.',
  },
  'at-risk': {
    label: 'At Risk',
    labelEs: 'En Riesgo',
    color: 'text-orange-700',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-300',
    description: 'Key protocols are missing or outdated. Your organisation has some crisis awareness but insufficient infrastructure to manage a major incident.',
    descriptionEs: 'Faltan protocolos clave o están desactualizados. Su organización tiene conciencia de crisis pero infraestructura insuficiente para manejar un incidente mayor.',
  },
  developing: {
    label: 'Developing',
    labelEs: 'En Desarrollo',
    color: 'text-amber-700',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-300',
    description: 'A foundation exists but important gaps remain. Targeted improvements to specific areas would meaningfully reduce exposure.',
    descriptionEs: 'Existe una base pero persisten brechas importantes. Mejoras específicas en áreas clave reducirían significativamente la exposición.',
  },
  prepared: {
    label: 'Prepared',
    labelEs: 'Preparado',
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-300',
    description: 'Strong preparedness with isolated gaps. Focused improvements in 1–2 areas would bring you to optimised readiness.',
    descriptionEs: 'Buena preparación con brechas aisladas. Mejoras específicas en 1–2 áreas le llevarían a una preparación óptima.',
  },
  optimised: {
    label: 'Optimised',
    labelEs: 'Optimizado',
    color: 'text-green-700',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-300',
    description: 'Comprehensive crisis readiness across all dimensions. Maintain through regular simulation and plan review.',
    descriptionEs: 'Preparación integral para crisis en todas las dimensiones. Mantenga mediante simulaciones regulares y revisión del plan.',
  },
};

export function getBand(score: number): ScoreBand {
  if (score <= 30) return 'critical';
  if (score <= 55) return 'at-risk';
  if (score <= 72) return 'developing';
  if (score <= 88) return 'prepared';
  return 'optimised';
}

export function computeResults(answers: Record<string, number>) {
  const maxPerQuestion = 3;
  const questionsPerCategory = 3;
  const maxPerCategory = maxPerQuestion * questionsPerCategory; // 9

  // Category scores
  const categoryScores: Record<AssessmentCategory, number> = {
    strategic: 0,
    operational: 0,
    latam: 0,
    training: 0,
  };

  ASSESSMENT_QUESTIONS.forEach((q) => {
    const val = answers[q.id] ?? 0;
    categoryScores[q.category] += val;
  });

  const categoryPcts = Object.fromEntries(
    Object.entries(categoryScores).map(([cat, raw]) => [
      cat,
      Math.round((raw / maxPerCategory) * 100),
    ])
  ) as Record<AssessmentCategory, number>;

  // Overall score
  const totalRaw = Object.values(categoryScores).reduce((a, b) => a + b, 0);
  const totalMax = maxPerCategory * 4; // 36
  const totalScore = Math.round((totalRaw / totalMax) * 100);

  // Top gaps: 3 lowest-scoring questions
  const scored = ASSESSMENT_QUESTIONS.map((q) => ({
    q,
    val: answers[q.id] ?? 0,
  })).sort((a, b) => a.val - b.val);
  const topGaps = scored.slice(0, 3).map((s) => s.q);

  // Recommendations based on category scores
  const recs: { title: string; titleEs: string; service: string; serviceEs: string }[] = [];

  if (categoryPcts.strategic < 60) {
    recs.push({
      title: 'CEO & Spokesperson Media Training',
      titleEs: 'Capacitación en Medios para CEO y Voceros',
      service: 'One or two-day intensive workshop covering camera presence, bridging techniques, message discipline, and live crisis scenario rehearsal.',
      serviceEs: 'Taller intensivo de uno o dos días con presencia en cámara, técnicas de mensajería, disciplina de mensaje y ensayo de escenarios de crisis en vivo.',
    });
  }
  if (categoryPcts.strategic < 80 && categoryPcts.strategic >= 60) {
    recs.push({
      title: 'Crisis Communications Plan Review',
      titleEs: 'Revisión del Plan de Comunicaciones de Crisis',
      service: 'Structured review and update of existing crisis communications plan against MINERBA standards and current regulatory environment.',
      serviceEs: 'Revisión y actualización estructurada del plan de comunicaciones de crisis existente contra los estándares MINERBA y el entorno regulatorio actual.',
    });
  }
  if (categoryPcts.operational < 60) {
    recs.push({
      title: 'Crisis Infrastructure Audit',
      titleEs: 'Auditoría de Infraestructura de Crisis',
      service: 'Full audit of holding statements, dark site activation readiness, and stakeholder contact protocols — with a structured remediation roadmap.',
      serviceEs: 'Auditoría completa de declaraciones de contención, preparación del sitio de crisis y protocolos de contacto de partes interesadas — con hoja de ruta de remediación.',
    });
  }
  if (categoryPcts.operational >= 60 && categoryPcts.operational < 80) {
    recs.push({
      title: 'Stakeholder Mapping Workshop',
      titleEs: 'Taller de Mapeo de Partes Interesadas',
      service: 'Facilitated exercise to build or update your crisis stakeholder map, including community leaders, NGOs, regulators, and media contacts with preferred channels.',
      serviceEs: 'Ejercicio facilitado para construir o actualizar su mapa de partes interesadas de crisis, incluyendo líderes comunitarios, ONG, reguladores y contactos de medios.',
    });
  }
  if (categoryPcts.latam < 60) {
    recs.push({
      title: 'LATAM Crisis Protocol Development',
      titleEs: 'Desarrollo del Protocolo de Crisis LATAM',
      service: 'End-to-end development of your Latin American crisis communications protocol: FPIC documentation, community notification systems, and anti-corruption compliance review.',
      serviceEs: 'Desarrollo integral del protocolo de comunicaciones de crisis latinoamericano: documentación CLPI, sistemas de notificación comunitaria y revisión de cumplimiento anti-corrupción.',
    });
  }
  if (categoryPcts.latam >= 60 && categoryPcts.latam < 80) {
    recs.push({
      title: 'FPIC / Consulta Previa Compliance Review',
      titleEs: 'Revisión de Cumplimiento CLPI / Consulta Previa',
      service: 'Independent review of your current indigenous consultation documentation and processes against ILO Convention 169 and applicable national law requirements.',
      serviceEs: 'Revisión independiente de su documentación y procesos de consulta indígena actuales contra el Convenio 169 de la OIT y los requisitos legales nacionales aplicables.',
    });
  }
  if (categoryPcts.training < 60) {
    recs.push({
      title: 'Crisis Simulation Exercise',
      titleEs: 'Ejercicio de Simulación de Crisis',
      service: 'Full multi-stakeholder crisis simulation calibrated to your industry and regional context, with structured debrief, scoring, and improvement roadmap.',
      serviceEs: 'Simulación de crisis multistakeholder completa calibrada a su industria y contexto regional, con debrief estructurado, puntuación y hoja de ruta de mejora.',
    });
  }
  if (categoryPcts.training >= 60 && categoryPcts.training < 80) {
    recs.push({
      title: 'Debrief Process & Lessons Learned System',
      titleEs: 'Proceso de Debrief y Sistema de Lecciones Aprendidas',
      service: 'Design and implementation of a structured post-crisis debrief framework that converts incident learnings into measurable preparedness improvements.',
      serviceEs: 'Diseño e implementación de un marco estructurado de debrief post-crisis que convierte los aprendizajes de incidentes en mejoras de preparación medibles.',
    });
  }

  // Always include simulation if score is < 85
  if (totalScore < 85 && !recs.some((r) => r.title.includes('Simulation'))) {
    recs.push({
      title: 'Crisis Simulation Exercise',
      titleEs: 'Ejercicio de Simulación de Crisis',
      service: 'Full multi-stakeholder crisis simulation calibrated to your industry and regional context, with structured debrief and improvement roadmap.',
      serviceEs: 'Simulación completa de crisis calibrada a su industria y contexto regional, con debrief estructurado y hoja de ruta de mejora.',
    });
  }

  return {
    totalScore,
    categoryPcts,
    band: getBand(totalScore),
    topGaps,
    recommendations: recs.slice(0, 4),
  };
}

// Grouped by category in display order
export const QUESTIONS_BY_CATEGORY: Record<AssessmentCategory, AssessmentQuestion[]> = {
  strategic: ASSESSMENT_QUESTIONS.filter((q) => q.category === 'strategic'),
  operational: ASSESSMENT_QUESTIONS.filter((q) => q.category === 'operational'),
  latam: ASSESSMENT_QUESTIONS.filter((q) => q.category === 'latam'),
  training: ASSESSMENT_QUESTIONS.filter((q) => q.category === 'training'),
};

export const CATEGORY_ORDER: AssessmentCategory[] = ['strategic', 'operational', 'latam', 'training'];
