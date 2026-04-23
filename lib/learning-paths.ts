// ─── Learning Paths ───────────────────────────────────────────────────────────
// Curated case sequences for structured crisis communications training.
// No Node.js imports — safe in client components.

export interface LearningPath {
  id: string;
  icon: string;
  title: string;
  titleEs: string;
  tagline: string;
  taglineEs: string;
  description: string;
  descriptionEs: string;
  difficulty: 'Foundational' | 'Intermediate' | 'Advanced';
  difficultyEs: string;
  estimatedHours: number;
  caseIds: string[];              // short IDs in learning order
  objectiveLabel: string;
  objectiveLabelEs: string;
  objective: string;
  objectiveEs: string;
  keyFrameworks: string[];        // framework IDs from lib/frameworks
  industryFocus: string;
  industryFocusEs: string;
  latamRelevance: 'High' | 'Medium' | 'Core';
  latamRelevanceEs: string;
  /** What the learner will be able to do after completing the path */
  outcomes: string[];
  outcomesEs: string[];
  /** A specific MINERBA consulting scenario this path prepares for */
  consultingScenario: string;
  consultingScenarioEs: string;
}

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'latam-energy-fundamentals',
    icon: '⛽',
    title: 'LATAM Energy Crisis Fundamentals',
    titleEs: 'Fundamentos de Crisis Energéticas en LATAM',
    tagline: '7 cases · 5.5 hrs · Core LATAM track',
    taglineEs: '7 casos · 5.5 hrs · Track fundamental LATAM',
    description:
      'The essential oil and gas crisis cases for any consultant advising energy companies in Latin America. Starting with the global benchmark (Exxon Valdez) and ending with the LATAM-specific failures (Petrobras, PEMEX, Dakota Access), this track builds a complete understanding of how energy sector crises unfold — and why they almost always fail in the first 72 hours.',
    descriptionEs:
      'Los casos de crisis de petróleo y gas esenciales para cualquier consultor que asesore a empresas energéticas en América Latina. Comenzando con el referente global (Exxon Valdez) y terminando con las fallas específicas de LATAM (Petrobras, PEMEX, Dakota Access), este track construye una comprensión completa de cómo se desarrollan las crisis del sector energético.',
    difficulty: 'Foundational',
    difficultyEs: 'Fundacional',
    estimatedHours: 5.5,
    caseIds: ['01', '04', '07', '11', '12', 'L1', 'L2'],
    objectiveLabel: 'Core Learning Objective',
    objectiveLabelEs: 'Objetivo de Aprendizaje Principal',
    objective:
      'Master the pattern of CEO absence, regulatory deflection, and community notification failure that recurs across energy sector crises — and identify what effective 72-hour response looks like.',
    objectiveEs:
      'Dominar el patrón de ausencia del CEO, evasión regulatoria y falla de notificación comunitaria que se repite en las crisis del sector energético — e identificar qué aspecto tiene una respuesta efectiva de 72 horas.',
    keyFrameworks: ['72-hour-protocol', 'fpic-checklist'],
    industryFocus: 'Energy & Oil',
    industryFocusEs: 'Energía y Petróleo',
    latamRelevance: 'Core',
    latamRelevanceEs: 'Central',
    outcomes: [
      'Identify the five most common energy sector communication failures before they occur',
      'Apply the 72-Hour Protocol to an oil spill or pipeline incident scenario',
      'Brief an energy sector CEO before a crisis press conference',
      'Recognize the FPIC consultation obligations triggered by pipeline routes near indigenous territories',
      'Distinguish state energy partner exposure from direct company liability in LATAM contexts',
    ],
    outcomesEs: [
      'Identificar las cinco fallas de comunicación más comunes en el sector energético antes de que ocurran',
      'Aplicar el Protocolo de 72 Horas a un escenario de derrame de petróleo o incidente de oleoducto',
      'Preparar a un CEO del sector energético antes de una conferencia de prensa de crisis',
      'Reconocer las obligaciones de consulta FPIC activadas por rutas de oleoductos cerca de territorios indígenas',
      'Distinguir la exposición del socio estatal de la responsabilidad directa de la empresa en contextos LATAM',
    ],
    consultingScenario:
      'A European energy company asks Minerba to advise on communications strategy for its first pipeline through indigenous territory in Colombia. Completion of this track prepares you to conduct the initial stakeholder mapping and risk assessment meeting.',
    consultingScenarioEs:
      'Una empresa energética europea pide a Minerba asesoría en estrategia de comunicaciones para su primer oleoducto a través de territorio indígena en Colombia. La finalización de este track lo prepara para dirigir la reunión inicial de mapeo de partes interesadas y evaluación de riesgos.',
  },

  {
    id: 'mining-failure-to-success',
    icon: '⛏',
    title: 'Mining: Failure to Success',
    titleEs: 'Minería: del Fracaso al Éxito',
    tagline: '6 cases · 4.5 hrs · Narrative arc track',
    taglineEs: '6 casos · 4.5 hrs · Track de arco narrativo',
    description:
      'A deliberately sequenced journey from the worst mining crisis response in history (Brumadinho) through the endemic failure patterns of LATAM operations (Yanacocha, Barrick Veladero, Ok Tedi) to the rare effective response that shows what is actually possible (Cadia Mine, Newcrest). This track is designed to inoculate consultants against the "it can\'t happen here" bias.',
    descriptionEs:
      'Un recorrido deliberadamente secuenciado desde la peor respuesta a una crisis minera en la historia (Brumadinho) a través de los patrones de falla endémicos de las operaciones de LATAM (Yanacocha, Barrick Veladero, Ok Tedi) hasta la rara respuesta efectiva que muestra lo que es realmente posible (Mina Cadia, Newcrest). Este track está diseñado para inocular a los consultores contra el sesgo de "eso no puede pasar aquí".',
    difficulty: 'Intermediate',
    difficultyEs: 'Intermedio',
    estimatedHours: 4.5,
    caseIds: ['M1', 'M4', 'M9', 'M7', 'M6', 'M10'],
    objectiveLabel: 'Core Learning Objective',
    objectiveLabelEs: 'Objetivo de Aprendizaje Principal',
    objective:
      'Understand the full spectrum from catastrophic failure to genuine best practice in mining crisis communications — and be able to diagnose which pattern a client is vulnerable to before an incident occurs.',
    objectiveEs:
      'Comprender el espectro completo desde el fracaso catastrófico hasta las mejores prácticas genuinas en comunicaciones de crisis mineras — y ser capaz de diagnosticar cuál patrón vulnera a un cliente antes de que ocurra un incidente.',
    keyFrameworks: ['72-hour-protocol', 'fpic-checklist'],
    industryFocus: 'Mining',
    industryFocusEs: 'Minería',
    latamRelevance: 'High',
    latamRelevanceEs: 'Alta',
    outcomes: [
      'Conduct a tailings dam communications risk assessment for a LATAM mining client',
      'Design a community notification protocol that prioritises downstream communities before media',
      'Identify the "premature operational resumption" trap and explain its reputational consequences',
      'Brief a mining CEO on the difference between regulatory approval to resume and social license to resume',
      'Apply the FPIC checklist to an existing LATAM mining operation with legacy community conflicts',
    ],
    outcomesEs: [
      'Realizar una evaluación de riesgo de comunicaciones para represas de relaves en un cliente minero de LATAM',
      'Diseñar un protocolo de notificación comunitaria que priorice a las comunidades aguas abajo antes que a los medios',
      'Identificar la trampa de "reanudación operativa prematura" y explicar sus consecuencias reputacionales',
      'Preparar a un CEO minero para entender la diferencia entre aprobación regulatoria para reanudar y licencia social para reanudar',
      'Aplicar la lista de verificación FPIC a una operación minera de LATAM existente con conflictos comunitarios históricos',
    ],
    consultingScenario:
      'A LATAM mining company has just received approval to resume operations 8 months after a tailings spill. Community groups are opposing the resumption. Minerba is retained to design a re-engagement communications programme.',
    consultingScenarioEs:
      'Una empresa minera de LATAM acaba de recibir aprobación para reanudar operaciones 8 meses después de un derrame de relaves. Los grupos comunitarios se oponen a la reanudación. Minerba es contratada para diseñar un programa de comunicaciones de reintegración.',
  },

  {
    id: 'pharmaceutical-crisis-masterclass',
    icon: '🏥',
    title: 'Pharmaceutical Crisis Masterclass',
    titleEs: 'Clase Magistral de Crisis Farmacéutica',
    tagline: '5 cases · 4 hrs · From gold standard to catastrophe',
    taglineEs: '5 casos · 4 hrs · Del estándar dorado a la catástrofe',
    description:
      'An intensive study of pharmaceutical crisis communications, beginning with the J&J Tylenol case — still the definitive best-practice model after 40 years — and then systematically examining how five subsequent pharmaceutical companies failed by doing the opposite. Includes product safety suppression, clinical trial ethics violations, and the Dengvaxia case which shows how even a correct disclosure can cause catastrophic harm through wrong sequencing.',
    descriptionEs:
      'Un estudio intensivo de comunicaciones de crisis farmacéuticas, comenzando con el caso del Tylenol de J&J — aún el modelo de mejores prácticas definitivo después de 40 años — y luego examinando sistemáticamente cómo cinco empresas farmacéuticas posteriores fracasaron haciendo lo contrario. Incluye supresión de seguridad de productos, violaciones de ética en ensayos clínicos y el caso Dengvaxia que muestra cómo incluso una divulgación correcta puede causar daño catastrófico a través de una secuencia incorrecta.',
    difficulty: 'Intermediate',
    difficultyEs: 'Intermedio',
    estimatedHours: 4,
    caseIds: ['H1', 'H4', 'H2', 'H8', 'H9'],
    objectiveLabel: 'Core Learning Objective',
    objectiveLabelEs: 'Objetivo de Aprendizaje Principal',
    objective:
      'Learn to distinguish between a well-executed same-day disclosure (which can still be a crisis response failure if preceded by years of suppression) and a genuinely transparent organisation. Understand the sequencing rules for LATAM health market product safety communications.',
    objectiveEs:
      'Aprender a distinguir entre una divulgación bien ejecutada el mismo día (que aún puede ser una falla de respuesta a la crisis si fue precedida por años de supresión) y una organización genuinamente transparente. Comprender las reglas de secuenciación para comunicaciones de seguridad de productos en mercados de salud de LATAM.',
    keyFrameworks: ['72-hour-protocol'],
    industryFocus: 'Healthcare',
    industryFocusEs: 'Salud',
    latamRelevance: 'Medium',
    latamRelevanceEs: 'Media',
    outcomes: [
      'Apply the J&J Tylenol decision framework to evaluate a current pharmaceutical product safety scenario',
      'Identify the "scientific uncertainty" suppression pattern before it becomes documentary evidence',
      'Design a multi-market simultaneous product withdrawal communications sequence for LATAM',
      'Brief a pharma CEO on why cooperative regulatory engagement outperforms adversarial posture in LATAM markets',
      'Prepare a vaccine safety disclosure communication plan that sequences government ministries before media',
    ],
    outcomesEs: [
      'Aplicar el marco de decisión del Tylenol de J&J para evaluar un escenario actual de seguridad de productos farmacéuticos',
      'Identificar el patrón de supresión de "incertidumbre científica" antes de que se convierta en evidencia documental',
      'Diseñar una secuencia de comunicaciones de retiro simultáneo de productos multi-mercado para LATAM',
      'Preparar a un CEO farmacéutico sobre por qué el compromiso regulatorio cooperativo supera la postura adversarial en mercados LATAM',
      'Preparar un plan de comunicación de divulgación de seguridad de vacunas que secuencie los ministerios de salud antes que los medios',
    ],
    consultingScenario:
      'A pharmaceutical client operating in Brazil and Argentina has received internal safety signals about one of its analgesic products. No regulatory action has been taken. Minerba is asked to advise on whether and how to disclose proactively.',
    consultingScenarioEs:
      'Un cliente farmacéutico que opera en Brasil y Argentina ha recibido señales internas de seguridad sobre uno de sus productos analgésicos. No se ha tomado ninguna acción regulatoria. Minerba es consultada sobre si y cómo divulgar de manera proactiva.',
  },

  {
    id: 'anti-corruption-governance',
    icon: '⚖️',
    title: 'Anti-Corruption & Governance Failures',
    titleEs: 'Anticorrupción y Fallas de Gobernanza',
    tagline: '6 cases · 4.5 hrs · FCPA & LATAM compliance track',
    taglineEs: '6 casos · 4.5 hrs · Track FCPA y cumplimiento LATAM',
    description:
      'The LATAM-critical track on corruption and governance crisis communications. From Enron\'s accounting fraud to the Petrobras Lava Jato scandal — the largest corruption investigation in Latin American history — to the GSK China bribery case, this track builds a rigorous understanding of how corruption crises unfold, how they escalate, and what role the communications function can play (and cannot play) when the underlying conduct is documented.',
    descriptionEs:
      'El track crítico para LATAM sobre comunicaciones de crisis de corrupción y gobernanza. Desde el fraude contable de Enron hasta el escándalo Lava Jato de Petrobras — la mayor investigación de corrupción en la historia latinoamericana — hasta el caso de soborno en China de GSK, este track construye una comprensión rigurosa de cómo se desarrollan las crisis de corrupción.',
    difficulty: 'Advanced',
    difficultyEs: 'Avanzado',
    estimatedHours: 4.5,
    caseIds: ['03', '07', 'H6', 'L2', 'L3', 'R1'],
    objectiveLabel: 'Core Learning Objective',
    objectiveLabelEs: 'Objetivo de Aprendizaje Principal',
    objective:
      'Understand the role of proactive disclosure and regulatory cooperation in corruption crises — and be able to brief a CEO on why the communications response alone cannot rescue a company from documented institutional misconduct.',
    objectiveEs:
      'Comprender el papel de la divulgación proactiva y la cooperación regulatoria en las crisis de corrupción — y ser capaz de preparar a un CEO sobre por qué la respuesta de comunicaciones por sí sola no puede rescatar a una empresa de una conducta institucional documentada.',
    keyFrameworks: ['anti-corruption-checklist'],
    industryFocus: 'Cross-sector',
    industryFocusEs: 'Multisectorial',
    latamRelevance: 'Core',
    latamRelevanceEs: 'Central',
    outcomes: [
      'Conduct a pre-entry anti-corruption communications risk assessment for a LATAM market',
      'Advise a client on the communications consequences of refusing regulatory cooperation vs. cooperating fully',
      'Identify the FCPA exposure pattern in a LATAM state energy partnership before a regulator does',
      'Design a communication strategy for a company caught in a third-party corruption investigation',
      'Brief a board on the reputational lifecycle of a corruption crisis from investigation to settlement',
    ],
    outcomesEs: [
      'Realizar una evaluación de riesgo de comunicaciones anticorrupción previa a la entrada para un mercado LATAM',
      'Asesorar a un cliente sobre las consecuencias comunicacionales de negarse a cooperar con los reguladores versus cooperar plenamente',
      'Identificar el patrón de exposición FCPA en una asociación estatal energética de LATAM antes que un regulador',
      'Diseñar una estrategia de comunicación para una empresa atrapada en una investigación de corrupción de terceros',
      'Preparar a una junta directiva sobre el ciclo de vida reputacional de una crisis de corrupción desde la investigación hasta el acuerdo',
    ],
    consultingScenario:
      'A Minerba client\'s local distribution partner in Peru has been named in a national anti-corruption investigation. The client has no direct involvement but their commercial relationship is documented. Minerba must advise on stakeholder communications for the next 30 days.',
    consultingScenarioEs:
      'El socio de distribución local de un cliente de Minerba en Perú ha sido nombrado en una investigación nacional anticorrupción. El cliente no tiene participación directa pero su relación comercial está documentada. Minerba debe asesorar en comunicaciones con partes interesadas para los próximos 30 días.',
  },

  {
    id: 'indigenous-rights-social-license',
    icon: '🌿',
    title: 'Indigenous Rights & Social License',
    titleEs: 'Derechos Indígenas y Licencia Social',
    tagline: '5 cases · 4 hrs · FPIC specialist track',
    taglineEs: '5 casos · 4 hrs · Track especialista CPLI',
    description:
      'The most critical track for consultants advising extractive companies in Latin America. Indigenous rights violations are the single most common trigger of sustained, international reputational crises in the MINERBA dataset. This track moves from the global precedent (Dakota Access Pipeline) through LATAM-specific cases (Chevron Ecuador, Newmont Yanacocha) to the Rio Tinto Juukan Gorge destruction — the most recent global case and the most consequential for CEO accountability.',
    descriptionEs:
      'El track más crítico para consultores que asesoran a empresas extractivas en América Latina. Las violaciones de derechos indígenas son el desencadenante más común de crisis reputacionales sostenidas e internacionales en el dataset MINERBA. Este track va desde el precedente global (Dakota Access Pipeline) a través de casos específicos de LATAM (Chevron Ecuador, Newmont Yanacocha) hasta la destrucción de Juukan Gorge por Rio Tinto.',
    difficulty: 'Advanced',
    difficultyEs: 'Avanzado',
    estimatedHours: 4,
    caseIds: ['12', 'L1', 'M9', 'M3', 'M8'],
    objectiveLabel: 'Core Learning Objective',
    objectiveLabelEs: 'Objetivo de Aprendizaje Principal',
    objective:
      'Build deep competency in FPIC process communications, indigenous community engagement, and the specific reputational dynamics that make indigenous rights violations the most durable of all crisis types.',
    objectiveEs:
      'Construir competencia profunda en comunicaciones de procesos FPIC, compromiso con comunidades indígenas y la dinámica reputacional específica que hace que las violaciones de derechos indígenas sean el tipo de crisis más duradero.',
    keyFrameworks: ['fpic-checklist', '72-hour-protocol'],
    industryFocus: 'Mining & Energy',
    industryFocusEs: 'Minería y Energía',
    latamRelevance: 'Core',
    latamRelevanceEs: 'Central',
    outcomes: [
      'Conduct a pre-project FPIC compliance communications assessment for an extractive operation',
      'Design a community notification system that meets ILO Convention 169 standards',
      'Advise a client on whether their existing consultation process would withstand scrutiny under ILO 169',
      'Prepare crisis communications for an incident in an area with unresolved indigenous land rights',
      'Brief a mining board on the difference between regulatory approval and genuine FPIC consent',
    ],
    outcomesEs: [
      'Realizar una evaluación de comunicaciones de cumplimiento FPIC previa al proyecto para una operación extractiva',
      'Diseñar un sistema de notificación comunitaria que cumpla con los estándares del Convenio 169 de la OIT',
      'Asesorar a un cliente sobre si su proceso de consulta existente resistiría el escrutinio bajo el Convenio 169',
      'Preparar comunicaciones de crisis para un incidente en un área con derechos territoriales indígenas no resueltos',
      'Preparar a una junta minera sobre la diferencia entre la aprobación regulatoria y el consentimiento genuino FPIC',
    ],
    consultingScenario:
      'A client is planning a copper mine expansion that will affect the traditional territory of three indigenous communities in southern Peru. Two communities have informally agreed; one is opposed. Minerba is retained to design the Consulta Previa communications strategy.',
    consultingScenarioEs:
      'Un cliente planea una expansión de mina de cobre que afectará el territorio tradicional de tres comunidades indígenas en el sur del Perú. Dos comunidades han acordado informalmente; una se opone. Minerba es contratada para diseñar la estrategia de comunicaciones de Consulta Previa.',
  },
];

export function getLearningPathById(id: string): LearningPath | undefined {
  return LEARNING_PATHS.find((p) => p.id === id);
}

export const DIFFICULTY_COLORS: Record<LearningPath['difficulty'], string> = {
  Foundational: 'bg-blue-100 text-blue-700 border-blue-200',
  Intermediate: 'bg-amber-100 text-amber-700 border-amber-200',
  Advanced: 'bg-red-100 text-red-700 border-red-200',
};

export const LATAM_RELEVANCE_COLORS: Record<LearningPath['latamRelevance'], string> = {
  Core: 'bg-green-100 text-green-700 border-green-200',
  High: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Medium: 'bg-teal-100 text-teal-700 border-teal-200',
};
