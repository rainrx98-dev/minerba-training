// ─── Crisis Communications Glossary ─────────────────────────────────────────
// No Node.js imports — safe to use in client components.

export type GlossaryCategory = 'strategic' | 'operational' | 'legal' | 'latam';

export interface GlossaryTerm {
  id: string;
  term: string;
  termEs: string;
  category: GlossaryCategory;
  definition: string;
  definitionEs: string;
  whyItMatters: string;
  whyItMattersEs: string;
  relatedCaseIds: string[]; // short IDs: '01', 'H1', 'M1', etc.
  seeAlso?: string[];       // other term IDs in this glossary
}

export const CATEGORY_META: Record<
  GlossaryCategory,
  { label: string; labelEs: string; icon: string; color: string }
> = {
  strategic: {
    label: 'Strategic',
    labelEs: 'Estratégico',
    icon: '♟',
    color: 'bg-navy-50 text-navy-700 border-navy-200',
  },
  operational: {
    label: 'Operational',
    labelEs: 'Operativo',
    icon: '⚙️',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  legal: {
    label: 'Legal / Regulatory',
    labelEs: 'Legal / Regulatorio',
    icon: '⚖️',
    color: 'bg-purple-50 text-purple-700 border-purple-200',
  },
  latam: {
    label: 'LATAM-Specific',
    labelEs: 'Específico LATAM',
    icon: '🌎',
    color: 'bg-green-50 text-green-700 border-green-200',
  },
};

export const GLOSSARY: GlossaryTerm[] = [
  // ── STRATEGIC ──────────────────────────────────────────────────────────────
  {
    id: 'social-license',
    term: 'Social License to Operate (SLO)',
    termEs: 'Licencia Social para Operar',
    category: 'strategic',
    definition:
      'The ongoing acceptance and approval of a company\'s operations by local communities, civil society, and other stakeholders — distinct from legal or regulatory permission. Social license is earned through trust, transparency, and demonstrated benefit; it can be lost even when all legal requirements are met.',
    definitionEs:
      'La aceptación y aprobación continua de las operaciones de una empresa por parte de las comunidades locales, la sociedad civil y otros grupos de interés — distinta del permiso legal o regulatorio. La licencia social se gana a través de la confianza, la transparencia y el beneficio demostrado; puede perderse incluso cuando se cumplen todos los requisitos legales.',
    whyItMatters:
      'The majority of crises in the MINERBA dataset — particularly in mining and energy — involve social license failure as either the root cause or a compounding factor. Companies that rely solely on regulatory approval find that government permits do not prevent community blockades, NGO campaigns, or reputational collapse.',
    whyItMattersEs:
      'La mayoría de las crisis en el dataset MINERBA — especialmente en minería y energía — involucran una falla de licencia social como causa raíz o factor agravante. Las empresas que dependen exclusivamente de la aprobación regulatoria descubren que los permisos gubernamentales no previenen bloqueos comunitarios, campañas de ONG ni colapso reputacional.',
    relatedCaseIds: ['M1', 'M2', 'M4', 'M5', 'M9', '06', 'L1'],
    seeAlso: ['fpic', 'stakeholder-mapping', 'community-benefit-fund'],
  },
  {
    id: 'reputational-capital',
    term: 'Reputational Capital',
    termEs: 'Capital Reputacional',
    category: 'strategic',
    definition:
      'The accumulated goodwill, trust, and positive regard that an organisation has built with its stakeholders over time. Reputational capital functions as a buffer in a crisis: organisations with high capital receive more benefit of the doubt, while those with low capital face an immediate credibility deficit regardless of how well they respond.',
    definitionEs:
      'La buena voluntad, confianza y consideración positiva acumulada que una organización ha construido con sus grupos de interés a lo largo del tiempo. El capital reputacional actúa como amortiguador en una crisis: las organizaciones con alto capital reciben más beneficio de la duda, mientras que las de bajo capital enfrentan un déficit de credibilidad inmediato independientemente de qué tan bien respondan.',
    whyItMatters:
      'Johnson & Johnson\'s Tylenol response (H1) succeeded partly because J&J had decades of consumer trust to draw on. Shell\'s Brent Spar response (02) failed partly because the company had little goodwill with European environmental audiences.',
    whyItMattersEs:
      'La respuesta de Johnson & Johnson al caso Tylenol (H1) tuvo éxito en parte porque J&J tenía décadas de confianza del consumidor. La respuesta de Shell a Brent Spar (02) fracasó en parte porque la empresa tenía poca afinidad con las audiencias ambientales europeas.',
    relatedCaseIds: ['H1', '02', '04', 'M1'],
    seeAlso: ['social-license', 'ceo-visibility'],
  },
  {
    id: 'ceo-visibility',
    term: 'CEO Visibility',
    termEs: 'Visibilidad del CEO',
    category: 'strategic',
    definition:
      'The decision whether to deploy the chief executive as the public face of a crisis response. CEO visibility signals that the organisation treats the crisis as a matter of institutional importance. Absence of the CEO — or delayed CEO engagement — signals evasion and leaves a communications vacuum that adversaries fill.',
    definitionEs:
      'La decisión de desplegar al director ejecutivo como la cara pública de la respuesta a una crisis. La visibilidad del CEO señala que la organización trata la crisis como un asunto de importancia institucional. La ausencia del CEO — o el compromiso tardío del CEO — señala evasión y deja un vacío de comunicación que los adversarios llenan.',
    whyItMatters:
      'BP\'s Tony Hayward became a case study in the damage a visible CEO can cause with wrong messaging (04). J&J\'s James Burke became a model for how CEO visibility builds trust (H1). The Vioxx withdrawal\'s initial praise rested on CEO Gilmartin\'s same-day press conference (H4).',
    whyItMattersEs:
      'Tony Hayward de BP se convirtió en un caso de estudio del daño que puede causar un CEO visible con mensajes equivocados (04). James Burke de J&J se convirtió en un modelo de cómo la visibilidad del CEO construye confianza (H1). El elogio inicial del retiro del Vioxx se basó en la conferencia de prensa del mismo día del CEO Gilmartin (H4).',
    relatedCaseIds: ['H1', '04', 'H4', 'M6'],
    seeAlso: ['holding-statement', 'crisis-spokesperson'],
  },
  {
    id: 'voluntary-disclosure',
    term: 'Voluntary Disclosure',
    termEs: 'Divulgación Voluntaria',
    category: 'strategic',
    definition:
      'The proactive decision to publicly disclose negative information — safety risks, financial irregularities, environmental damage — before a regulator or third party compels disclosure. Voluntary disclosure typically results in significantly less reputational and legal damage than compelled disclosure.',
    definitionEs:
      'La decisión proactiva de divulgar públicamente información negativa — riesgos de seguridad, irregularidades financieras, daños ambientales — antes de que un regulador o tercero exija la divulgación. La divulgación voluntaria típicamente resulta en significativamente menos daño reputacional y legal que la divulgación forzada.',
    whyItMatters:
      'Merck\'s voluntary withdrawal of Vioxx (H4) earned initial praise; the damage came from the five years of pre-withdrawal suppression. Shell\'s voluntary reserve restatement (05) minimised legal exposure vs. the compelled outcome Enron faced (03).',
    whyItMattersEs:
      'El retiro voluntario del Vioxx por parte de Merck (H4) ganó elogios iniciales; el daño vino de los cinco años de supresión previa al retiro. La reafirmación voluntaria de reservas de Shell (05) minimizó la exposición legal frente al resultado forzado que enfrentó Enron (03).',
    relatedCaseIds: ['H4', '03', '05', 'H5'],
    seeAlso: ['holding-statement', 'regulatory-engagement'],
  },
  {
    id: 'silence-as-admission',
    term: 'Silence as Admission',
    termEs: 'Silencio como Admisión',
    category: 'strategic',
    definition:
      'The communications principle that corporate silence in a crisis is interpreted by media, regulators, and the public as confirmation of wrongdoing or indifference to harm. In the absence of the company\'s voice, the narrative is controlled by adversaries.',
    definitionEs:
      'El principio de comunicaciones de que el silencio corporativo en una crisis es interpretado por los medios, reguladores y el público como confirmación de irregularidades o indiferencia al daño. En ausencia de la voz de la empresa, la narrativa es controlada por los adversarios.',
    whyItMatters:
      'Enron\'s refusal to engage with analyst questions about its financial structure (03) created the suspicion that preceded its collapse. Petrobras\'s delayed response to Lava Jato (07) allowed prosecutors and media to define the narrative entirely.',
    whyItMattersEs:
      'La negativa de Enron a responder preguntas de analistas sobre su estructura financiera (03) creó la sospecha que precedió a su colapso. La respuesta tardía de Petrobras a Lava Jato (07) permitió a fiscales y medios definir completamente la narrativa.',
    relatedCaseIds: ['03', '07', '04', 'H5'],
    seeAlso: ['holding-statement', 'ceo-visibility'],
  },
  {
    id: 'issue-vs-crisis',
    term: 'Issue vs. Crisis',
    termEs: 'Problema vs. Crisis',
    category: 'strategic',
    definition:
      'An issue is a known risk or concern that is manageable through normal operations — it has not yet reached acute public attention. A crisis is an issue that has escalated to the point where it requires an emergency response, threatens the organisation\'s reputation or operations, and demands CEO-level engagement. Most crises begin as ignored issues.',
    definitionEs:
      'Un problema es un riesgo o preocupación conocida que es manejable a través de operaciones normales — aún no ha alcanzado atención pública aguda. Una crisis es un problema que ha escalado al punto en que requiere una respuesta de emergencia, amenaza la reputación u operaciones de la organización, y exige compromiso a nivel de CEO. La mayoría de las crisis comienzan como problemas ignorados.',
    whyItMatters:
      'The 72-hour window matters most because the issue-to-crisis transition accelerates rapidly. Merck\'s cardiovascular signal was an issue in 2000; by 2004 it was a global crisis. Petrobras\'s contractor bribes were an issue until Lava Jato made them a national crisis.',
    whyItMattersEs:
      'La ventana de 72 horas importa principalmente porque la transición de problema a crisis se acelera rápidamente. La señal cardiovascular de Merck era un problema en 2000; para 2004 era una crisis global. Los sobornos de contratistas de Petrobras eran un problema hasta que Lava Jato los convirtió en una crisis nacional.',
    relatedCaseIds: ['H4', '07', '04', '13'],
    seeAlso: ['crisis-72-hour', 'reputational-capital'],
  },

  // ── OPERATIONAL ────────────────────────────────────────────────────────────
  {
    id: 'crisis-72-hour',
    term: '72-Hour Crisis Protocol',
    termEs: 'Protocolo de Crisis 72 Horas',
    category: 'operational',
    definition:
      'The MINERBA framework establishing five mandatory response windows in the first 72 hours of a crisis: (1) 0–2 hrs: holding statement and CEO notification; (2) 2–6 hrs: CEO on-camera; (3) 6–24 hrs: full briefing and cadence established; (4) 24–48 hrs: independent monitoring announced; (5) 48–72 hrs: community support committed. Derived from Exxon Valdez case analysis.',
    definitionEs:
      'El marco MINERBA que establece cinco ventanas de respuesta obligatorias en las primeras 72 horas de una crisis: (1) 0–2 hrs: declaración de espera y notificación al CEO; (2) 2–6 hrs: CEO ante cámara; (3) 6–24 hrs: briefing completo y cadencia establecida; (4) 24–48 hrs: monitoreo independiente anunciado; (5) 48–72 hrs: apoyo comunitario comprometido. Derivado del análisis del caso Exxon Valdez.',
    whyItMatters:
      'Every case in the MINERBA dataset where the company failed to hit these windows experienced compounded reputational damage. The protocol is specifically calibrated for Latin American contexts where community and government relationships require parallel, not sequential, engagement.',
    whyItMattersEs:
      'Cada caso en el dataset MINERBA donde la empresa no cumplió estas ventanas experimentó daño reputacional compuesto. El protocolo está específicamente calibrado para contextos latinoamericanos donde las relaciones con comunidades y gobierno requieren compromiso paralelo, no secuencial.',
    relatedCaseIds: ['01', '04', 'M1', 'M2', 'H1'],
    seeAlso: ['holding-statement', 'ceo-visibility', 'media-cadence'],
  },
  {
    id: 'holding-statement',
    term: 'Holding Statement',
    termEs: 'Declaración de Contención',
    category: 'operational',
    definition:
      'An initial public statement issued in the first hours of a crisis that acknowledges the event, expresses concern for those affected, commits to providing more information, and does not make admissions of liability or speculate on cause. It holds the communications space without overcommitting.',
    definitionEs:
      'Una declaración pública inicial emitida en las primeras horas de una crisis que reconoce el evento, expresa preocupación por los afectados, se compromete a proporcionar más información y no hace admisiones de responsabilidad ni especula sobre la causa. Ocupa el espacio de comunicaciones sin sobrecomprometerse.',
    whyItMatters:
      'The absence of a holding statement forces the organisation into silence — which becomes its own story. Johnson & Johnson\'s first hours in the 1982 Tylenol crisis (H1) demonstrated that immediate acknowledgment, not delayed confirmation, controls narrative.',
    whyItMattersEs:
      'La ausencia de una declaración de contención obliga a la organización al silencio — que se convierte en su propia historia. Las primeras horas de Johnson & Johnson en la crisis del Tylenol de 1982 (H1) demostraron que el reconocimiento inmediato, no la confirmación tardía, controla la narrativa.',
    relatedCaseIds: ['H1', '04', 'M2', '01'],
    seeAlso: ['crisis-72-hour', 'ceo-visibility', 'media-cadence'],
  },
  {
    id: 'media-cadence',
    term: 'Media Cadence',
    termEs: 'Cadencia Mediática',
    category: 'operational',
    definition:
      'A pre-committed schedule of regular briefings — typically twice daily in the acute phase — that keeps media informed, demonstrates transparency, and prevents the communications vacuum that leads to speculation. Cadence signals that the company is in control of its own information flow.',
    definitionEs:
      'Un calendario preestablecido de briefings regulares — típicamente dos veces al día en la fase aguda — que mantiene informados a los medios, demuestra transparencia y previene el vacío de comunicación que lleva a la especulación. La cadencia señala que la empresa controla su propio flujo de información.',
    whyItMatters:
      'BP\'s erratic communication schedule during Deepwater Horizon (04) allowed social media to fill information gaps. Exxon\'s near-silence in the first days of the Valdez spill (01) created the defining narrative of corporate indifference that shaped the case\'s legacy.',
    whyItMattersEs:
      'El calendario de comunicación errático de BP durante el Horizonte Profundo (04) permitió que las redes sociales llenaran las brechas de información. El casi silencio de Exxon en los primeros días del derrame del Valdez (01) creó la narrativa definitoria de indiferencia corporativa que marcó el legado del caso.',
    relatedCaseIds: ['01', '04', 'H1', 'M2'],
    seeAlso: ['holding-statement', 'crisis-72-hour'],
  },
  {
    id: 'crisis-spokesperson',
    term: 'Crisis Spokesperson',
    termEs: 'Vocero de Crisis',
    category: 'operational',
    definition:
      'A designated individual trained to deliver consistent, on-message communications during a crisis. In major crises, this is often the CEO; in technical crises it may be a senior operations or safety officer. The spokesperson must be briefed, credible, empathetic, and authorised to speak for the organisation.',
    definitionEs:
      'Un individuo designado y capacitado para entregar comunicaciones consistentes y enfocadas durante una crisis. En crisis mayores, suele ser el CEO; en crisis técnicas puede ser un oficial senior de operaciones o seguridad. El vocero debe estar informado, ser creíble, empático y estar autorizado para hablar en nombre de la organización.',
    whyItMatters:
      'Tony Hayward\'s "I\'d like my life back" comment (04) and "this is a relatively tiny amount of oil" characterise how a wrong spokesperson or wrong messaging can define a company\'s legacy. Contrast with J&J\'s consistent, empathetic messaging in the Tylenol crisis (H1).',
    whyItMattersEs:
      'El comentario "me gustaría recuperar mi vida" de Tony Hayward (04) y "esta es una cantidad relativamente pequeña de petróleo" caracterizan cómo un vocero equivocado o mensajes equivocados pueden definir el legado de una empresa. Contrasta con los mensajes consistentes y empáticos de J&J en la crisis del Tylenol (H1).',
    relatedCaseIds: ['04', 'H1', 'M2', 'H4'],
    seeAlso: ['ceo-visibility', 'empathy-statement'],
  },
  {
    id: 'empathy-statement',
    term: 'Empathy Statement',
    termEs: 'Declaración de Empatía',
    category: 'operational',
    definition:
      'A public communication that genuinely acknowledges the harm, suffering, or concern of those affected by an incident — without necessarily admitting liability. Empathy statements are distinct from apologies and can be issued while facts are still being established. They signal that the organisation regards human impact as its primary concern.',
    definitionEs:
      'Una comunicación pública que genuinamente reconoce el daño, sufrimiento o preocupación de los afectados por un incidente — sin necesariamente admitir responsabilidad. Las declaraciones de empatía son distintas de las disculpas y pueden emitirse mientras los hechos aún se establecen. Señalan que la organización considera el impacto humano como su preocupación principal.',
    whyItMatters:
      'The absence of an empathy statement — or a technically correct but cold statement — routinely transforms a manageable incident into a reputational catastrophe. BP\'s messaging during Deepwater Horizon (04) consistently prioritised operational status over human impact, a pattern visible across several failed cases in the dataset.',
    whyItMattersEs:
      'La ausencia de una declaración de empatía — o una declaración técnicamente correcta pero fría — transforma rutinariamente un incidente manejable en una catástrofe reputacional. Los mensajes de BP durante el Horizonte Profundo (04) priorizaron consistentemente el estado operativo sobre el impacto humano, un patrón visible en varios casos fallidos del dataset.',
    relatedCaseIds: ['04', 'H1', 'M1', 'M2'],
    seeAlso: ['holding-statement', 'ceo-visibility'],
  },
  {
    id: 'independent-monitoring',
    term: 'Independent Third-Party Monitoring',
    termEs: 'Monitoreo Independiente de Terceros',
    category: 'operational',
    definition:
      'The engagement of a credible, non-company-affiliated organisation — typically an NGO, academic institution, or government body — to monitor environmental or safety conditions and publish findings. Independent monitoring converts unverifiable company claims into credible information that stakeholders can trust.',
    definitionEs:
      'La contratación de una organización creíble no afiliada a la empresa — típicamente una ONG, institución académica u organismo gubernamental — para monitorear condiciones ambientales o de seguridad y publicar hallazgos. El monitoreo independiente convierte afirmaciones no verificables de la empresa en información creíble que las partes interesadas pueden confiar.',
    whyItMatters:
      'The MINERBA 72-hour protocol mandates announcing independent monitoring by hour 48. Cases where companies selected their own monitors — or where monitoring was absent — systematically produced worse outcomes and prolonged reputational damage.',
    whyItMattersEs:
      'El protocolo MINERBA de 72 horas exige anunciar monitoreo independiente antes de la hora 48. Los casos donde las empresas seleccionaron sus propios monitores — o donde el monitoreo estuvo ausente — produjeron sistemáticamente peores resultados y daño reputacional prolongado.',
    relatedCaseIds: ['01', '04', 'M2', 'M6', 'L1'],
    seeAlso: ['crisis-72-hour', 'third-party-validation'],
  },
  {
    id: 'third-party-validation',
    term: 'Third-Party Validation',
    termEs: 'Validación por Terceros',
    category: 'operational',
    definition:
      'The use of credible external voices — scientific experts, regulators, NGOs, academic institutions — to corroborate or endorse the company\'s position. Third-party validation transfers credibility from trusted external sources to the company\'s communications at a moment when the company\'s own credibility may be compromised.',
    definitionEs:
      'El uso de voces externas creíbles — expertos científicos, reguladores, ONG, instituciones académicas — para corroborar o respaldar la posición de la empresa. La validación por terceros transfiere credibilidad de fuentes externas de confianza a las comunicaciones de la empresa en un momento en que la propia credibilidad de la empresa puede estar comprometida.',
    whyItMatters:
      'AstraZeneca\'s vaccine communications crisis (H3) illustrates the cost of failing to coordinate third-party scientific endorsement before making regulatory claims. J&J\'s Tylenol response (H1) succeeded in part by immediately engaging the FBI and FDA as visible investigation partners.',
    whyItMattersEs:
      'La crisis de comunicaciones de la vacuna de AstraZeneca (H3) ilustra el costo de no coordinar el respaldo científico de terceros antes de hacer afirmaciones regulatorias. La respuesta al Tylenol de J&J (H1) tuvo éxito en parte al involucrar inmediatamente al FBI y la FDA como socios visibles de la investigación.',
    relatedCaseIds: ['H1', 'H3', '01', 'M2'],
    seeAlso: ['independent-monitoring', 'regulatory-engagement'],
  },
  {
    id: 'dark-site',
    term: 'Dark Site',
    termEs: 'Sitio Oscuro',
    category: 'operational',
    definition:
      'A pre-built, fully designed crisis communications website that exists in a dormant state and can be activated within minutes of a major incident. It contains pre-written holding statements, executive contact protocols, and template messaging for different crisis scenarios. Unlike a company\'s main website, it is built specifically for crisis-speed communication.',
    definitionEs:
      'Un sitio web de comunicaciones de crisis preconstruido y completamente diseñado que existe en estado inactivo y puede activarse en minutos después de un incidente mayor. Contiene declaraciones de contención pre-redactadas, protocolos de contacto ejecutivo y mensajes plantilla para diferentes escenarios de crisis. A diferencia del sitio web principal de la empresa, está construido específicamente para comunicación a velocidad de crisis.',
    whyItMatters:
      'Colonial Pipeline\'s communications during the 2021 ransomware attack (10) were hampered by the fact that its own digital infrastructure was compromised. A dark site on external hosting would have enabled immediate public communications regardless of internal network status.',
    whyItMattersEs:
      'Las comunicaciones de Colonial Pipeline durante el ataque de ransomware de 2021 (10) se vieron obstaculizadas por el hecho de que su propia infraestructura digital estaba comprometida. Un sitio oscuro en alojamiento externo habría permitido comunicaciones públicas inmediatas independientemente del estado de la red interna.',
    relatedCaseIds: ['10', '04', '01'],
    seeAlso: ['holding-statement', 'crisis-72-hour'],
  },

  // ── LEGAL / REGULATORY ─────────────────────────────────────────────────────
  {
    id: 'regulatory-engagement',
    term: 'Regulatory Pre-Briefing',
    termEs: 'Pre-Informar a Reguladores',
    category: 'legal',
    definition:
      'The practice of informing relevant government regulators about an incident or disclosure before making a public announcement — ensuring regulators are not blindsided and positioning the company as cooperative. Regulatory pre-briefing reduces the risk of aggressive enforcement responses and signals institutional good faith.',
    definitionEs:
      'La práctica de informar a los reguladores gubernamentales relevantes sobre un incidente o divulgación antes de hacer un anuncio público — asegurando que los reguladores no sean sorprendidos y posicionando a la empresa como cooperativa. Pre-informar a reguladores reduce el riesgo de respuestas de aplicación agresivas y señala buena fe institucional.',
    whyItMatters:
      'The MINERBA 72-hour protocol mandates briefing government ministries before the first press conference. Shell\'s reserve restatement crisis (05) demonstrates the difference between a managed regulatory engagement and a regulatory-led enforcement action.',
    whyItMattersEs:
      'El protocolo MINERBA de 72 horas exige informar a los ministerios gubernamentales antes de la primera conferencia de prensa. La crisis de reafirmación de reservas de Shell (05) demuestra la diferencia entre una gestión regulatoria coordinada y una acción de cumplimiento liderada por reguladores.',
    relatedCaseIds: ['05', '04', 'H4', 'H3'],
    seeAlso: ['voluntary-disclosure', 'third-party-validation'],
  },
  {
    id: 'fcpa',
    term: 'FCPA (Foreign Corrupt Practices Act)',
    termEs: 'FCPA (Ley de Prácticas Corruptas en el Extranjero)',
    category: 'legal',
    definition:
      'A United States federal law that prohibits U.S. persons and companies — and foreign companies listed on U.S. exchanges — from bribing foreign government officials to obtain or retain business. FCPA enforcement is extraterritorial: a company does not need to be headquartered in the U.S. to face FCPA liability.',
    definitionEs:
      'Una ley federal de los Estados Unidos que prohíbe a personas y empresas estadounidenses — y a empresas extranjeras que cotizan en bolsas estadounidenses — sobornar a funcionarios gubernamentales extranjeros para obtener o retener negocios. La aplicación del FCPA es extraterritorial: una empresa no necesita tener sede en EE.UU. para enfrentar responsabilidad FCPA.',
    whyItMatters:
      'GSK\'s China bribery scandal (H6) and Petrobras\'s Lava Jato (07) both involved FCPA exposure alongside local law violations. The MINERBA Anti-Corruption Checklist exists specifically because FCPA liability is the single most frequent legal risk for non-U.S. energy companies operating in Latin America.',
    whyItMattersEs:
      'El escándalo de soborno en China de GSK (H6) y el Lava Jato de Petrobras (07) involucraron exposición al FCPA junto con violaciones de leyes locales. La Lista de Verificación Anti-Corrupción MINERBA existe específicamente porque la responsabilidad FCPA es el riesgo legal más frecuente para empresas energéticas no estadounidenses que operan en América Latina.',
    relatedCaseIds: ['07', 'H6', 'L2', 'L3'],
    seeAlso: ['consulta-previa', 'regulatory-engagement'],
  },
  {
    id: 'inherited-liability',
    term: 'Inherited Environmental Liability',
    termEs: 'Responsabilidad Ambiental Heredada',
    category: 'legal',
    definition:
      'Environmental contamination, community harm, or legal obligations that a company assumes when it acquires an asset, enters a partnership, or inherits operations with pre-existing damage. Companies frequently underestimate inherited liability in due diligence and are then trapped by reputational and legal obligations they did not create.',
    definitionEs:
      'Contaminación ambiental, daño comunitario u obligaciones legales que una empresa asume cuando adquiere un activo, entra en una asociación o hereda operaciones con daños preexistentes. Las empresas frecuentemente subestiman la responsabilidad heredada en la debida diligencia y luego quedan atrapadas por obligaciones reputacionales y legales que no crearon.',
    whyItMatters:
      'Doe Run\'s La Oroya lead smelter (M5), Chevron\'s Ecuador litigation (L1), and Freeport\'s Grasberg operations (M8) all involve inherited liability as a defining element. The LATAM energy sector has a high prevalence of inherited liability due to previous state-owned enterprise operations.',
    whyItMattersEs:
      'La fundidora de plomo de Doe Run en La Oroya (M5), el litigio de Chevron en Ecuador (L1) y las operaciones de Grasberg de Freeport (M8) involucran responsabilidad heredada como elemento definitorio. El sector energético latinoamericano tiene una alta prevalencia de responsabilidad heredada debido a operaciones previas de empresas estatales.',
    relatedCaseIds: ['M5', 'L1', 'M8', '06'],
    seeAlso: ['social-license', 'independent-monitoring'],
  },

  // ── LATAM-SPECIFIC ─────────────────────────────────────────────────────────
  {
    id: 'fpic',
    term: 'FPIC — Free, Prior and Informed Consent',
    termEs: 'CLPI — Consentimiento Libre, Previo e Informado',
    category: 'latam',
    definition:
      'An international human rights principle, codified in ILO Convention 169 and the UN Declaration on the Rights of Indigenous Peoples (UNDRIP), requiring that indigenous and tribal communities give their free, prior, and informed consent before activities affecting their territories, resources, or rights are approved or commenced. FPIC is a right, not a consultation process.',
    definitionEs:
      'Un principio de derechos humanos internacional, codificado en el Convenio 169 de la OIT y la Declaración de la ONU sobre los Derechos de los Pueblos Indígenas, que requiere que las comunidades indígenas y tribales den su consentimiento libre, previo e informado antes de que se aprueben o inicien actividades que afecten sus territorios, recursos o derechos. El CLPI es un derecho, no un proceso de consulta.',
    whyItMatters:
      'ILO Convention 169 has been ratified by 23 countries, most of them in Latin America. Every country in which MINERBA operates has either ratified ILO 169 or has constitutional indigenous rights protections that replicate FPIC obligations. Mining projects that begin without genuine FPIC compliance face a near-certainty of injunction, community conflict, or operational shutdown.',
    whyItMattersEs:
      'El Convenio 169 de la OIT ha sido ratificado por 23 países, la mayoría en América Latina. Cada país en el que opera MINERBA ha ratificado el Convenio 169 o tiene protecciones constitucionales de derechos indígenas que replican las obligaciones del CLPI. Los proyectos mineros que inician sin cumplimiento genuino del CLPI enfrentan una casi certeza de interdicto, conflicto comunitario o cierre operacional.',
    relatedCaseIds: ['M3', 'M9', 'L1', 'M6', 'M8', '12'],
    seeAlso: ['consulta-previa', 'social-license', 'community-benefit-fund'],
  },
  {
    id: 'consulta-previa',
    term: 'Consulta Previa',
    termEs: 'Consulta Previa',
    category: 'latam',
    definition:
      'The Latin American legal mechanism, grounded in ILO Convention 169 and domestic constitutional law, requiring governments and companies to undertake structured consultation with indigenous and afro-descendant communities before approving projects that affect their territories. Consulta previa is more procedurally defined than FPIC and is often mandatory under national law.',
    definitionEs:
      'El mecanismo legal latinoamericano, fundamentado en el Convenio 169 de la OIT y el derecho constitucional nacional, que exige a gobiernos y empresas realizar consultas estructuradas con comunidades indígenas y afrodescendientes antes de aprobar proyectos que afecten sus territorios. La consulta previa está más definida procesalmente que el CLPI y suele ser obligatoria bajo la legislación nacional.',
    whyItMatters:
      'Colombia, Peru, Ecuador, Bolivia, and Chile all have consulta previa requirements under domestic law. Failure to complete consulta previa is grounds for project injunction and licence revocation. The Newmont Yanacocha case (M9) and the Dakota Access Pipeline case (12) both demonstrate the operational and financial cost of inadequate indigenous consultation.',
    whyItMattersEs:
      'Colombia, Perú, Ecuador, Bolivia y Chile tienen requisitos de consulta previa bajo la ley nacional. La falta de completar la consulta previa es motivo de medida cautelar y revocación de licencia. El caso de Newmont Yanacocha (M9) y el caso del Dakota Access Pipeline (12) demuestran el costo operativo y financiero de una consulta indígena inadecuada.',
    relatedCaseIds: ['M9', '12', 'L1', 'L2', 'M3'],
    seeAlso: ['fpic', 'social-license'],
  },
  {
    id: 'local-language-first',
    term: 'Local Language First',
    termEs: 'Primero en Idioma Local',
    category: 'latam',
    definition:
      'The MINERBA communications principle that in any Latin American crisis, the first public statement and community notification must be issued in Spanish (or Portuguese in Brazil) before English-language international communications — not simultaneously or after. A company that issues English communications first signals that its primary audience is its shareholder base, not the affected community.',
    definitionEs:
      'El principio de comunicaciones MINERBA de que en cualquier crisis latinoamericana, la primera declaración pública y notificación comunitaria debe emitirse en español (o portugués en Brasil) antes de las comunicaciones internacionales en inglés — no simultáneamente ni después. Una empresa que emite comunicaciones en inglés primero señala que su audiencia principal es su base accionarial, no la comunidad afectada.',
    whyItMatters:
      'Multiple mining cases in the dataset (M1 Brumadinho, M2 Samarco, M4 Barrick Veladero) show that affected communities and Brazilian/Argentine government officials received communications after English-language investor updates. This sequencing became a standalone reputational issue that amplified the underlying crisis.',
    whyItMattersEs:
      'Múltiples casos de minería en el dataset (M1 Brumadinho, M2 Samarco, M4 Barrick Veladero) muestran que las comunidades afectadas y los funcionarios gubernamentales brasileños/argentinos recibieron comunicaciones después de las actualizaciones de inversores en inglés. Esta secuenciación se convirtió en un problema reputacional independiente que amplificó la crisis subyacente.',
    relatedCaseIds: ['M1', 'M2', 'M4', 'M9'],
    seeAlso: ['crisis-72-hour', 'stakeholder-mapping'],
  },
  {
    id: 'community-benefit-fund',
    term: 'Community Benefit Fund',
    termEs: 'Fondo de Beneficio Comunitario',
    category: 'latam',
    definition:
      'A formally established, independently governed financial mechanism through which a company makes structured payments to affected communities — for development, remediation, livelihood support, or compensation. The key operational criteria are independent governance (not company-controlled), community participation in allocation decisions, and public reporting of disbursements.',
    definitionEs:
      'Un mecanismo financiero formal e independientemente gobernado a través del cual una empresa realiza pagos estructurados a comunidades afectadas — para desarrollo, remediación, apoyo a medios de vida o compensación. Los criterios operativos clave son la gobernanza independiente (no controlada por la empresa), la participación comunitaria en decisiones de asignación e informes públicos de desembolsos.',
    whyItMatters:
      'The MINERBA 72-hour protocol requires a publicly committed community support mechanism by hour 72. Cases where companies established company-controlled compensation programmes (Vale Brumadinho, Samarco) faced sustained criticism; the few cases with genuinely independent structures reported faster trust recovery.',
    whyItMattersEs:
      'El protocolo MINERBA de 72 horas requiere un mecanismo de apoyo comunitario comprometido públicamente antes de la hora 72. Los casos donde las empresas establecieron programas de compensación controlados por la empresa (Vale Brumadinho, Samarco) enfrentaron críticas sostenidas; los pocos casos con estructuras genuinamente independientes informaron una recuperación de confianza más rápida.',
    relatedCaseIds: ['M1', 'M2', 'M5', 'M9'],
    seeAlso: ['fpic', 'social-license', 'independent-monitoring'],
  },
  {
    id: 'whatsapp-communications',
    term: 'WhatsApp-First Community Communications',
    termEs: 'Comunicaciones Comunitarias por WhatsApp',
    category: 'latam',
    definition:
      'The MINERBA recommendation to use WhatsApp as the primary channel for direct community communication in Latin American crisis responses, prior to or alongside national media briefings. WhatsApp penetration in LATAM exceeds 85% in most markets; community leaders and local officials will receive and share information faster via WhatsApp than through any other channel.',
    definitionEs:
      'La recomendación MINERBA de usar WhatsApp como canal principal para comunicación directa con la comunidad en respuestas a crisis latinoamericanas, antes o junto con los briefings de medios nacionales. La penetración de WhatsApp en LATAM supera el 85% en la mayoría de los mercados; los líderes comunitarios y funcionarios locales recibirán y compartirán información más rápido por WhatsApp que por cualquier otro canal.',
    whyItMatters:
      'The MINERBA 72-hour protocol specifically calls for local-language video via WhatsApp to community leaders by hour 6 — before national media briefings. This channel recommendation is derived from analysis of what actually reached communities first in Brumadinho (M1) and Barrick Veladero (M4) response failures.',
    whyItMattersEs:
      'El protocolo MINERBA de 72 horas llama específicamente a video en idioma local por WhatsApp a líderes comunitarios antes de la hora 6 — antes de los briefings de medios nacionales. Esta recomendación de canal se deriva del análisis de qué llegó realmente primero a las comunidades en los fracasos de respuesta de Brumadinho (M1) y Barrick Veladero (M4).',
    relatedCaseIds: ['M1', 'M4', 'M9'],
    seeAlso: ['local-language-first', 'crisis-72-hour'],
  },
  {
    id: 'stakeholder-mapping',
    term: 'Stakeholder Mapping',
    termEs: 'Mapeo de Partes Interesadas',
    category: 'operational',
    definition:
      'A systematic pre-crisis exercise that identifies every individual, community, organisation, and institution that could be affected by or influential in a crisis scenario — including their communication preferences, trust levels, decision-making authority, and potential response. Stakeholder maps should be built and maintained before a crisis, not assembled during one.',
    definitionEs:
      'Un ejercicio sistemático previo a la crisis que identifica a cada individuo, comunidad, organización e institución que podría verse afectado o ser influyente en un escenario de crisis — incluyendo sus preferencias de comunicación, niveles de confianza, autoridad de toma de decisiones y respuesta potencial. Los mapas de partes interesadas deben construirse y mantenerse antes de una crisis, no ensamblarse durante una.',
    whyItMatters:
      'Indigenous community notification failures in Mount Polley (M6), Rio Tinto Juukan (M3), and Barrick Veladero (M4) all reflect the absence of a pre-built stakeholder contact protocol. A functional stakeholder map would have ensured communities were on the first-call list, not discovered after media notification.',
    whyItMattersEs:
      'Las fallas de notificación a comunidades indígenas en Mount Polley (M6), Rio Tinto Juukan (M3) y Barrick Veladero (M4) reflejan la ausencia de un protocolo de contacto de partes interesadas preestablecido. Un mapa de partes interesadas funcional habría asegurado que las comunidades estuvieran en la lista de primera llamada, no descubiertas después de la notificación mediática.',
    relatedCaseIds: ['M6', 'M3', 'M4', 'M9'],
    seeAlso: ['fpic', 'local-language-first', 'community-benefit-fund'],
  },
  {
    id: 'pr-rating',
    term: 'MINERBA PR Rating',
    termEs: 'Calificación PR de MINERBA',
    category: 'strategic',
    definition:
      'The three-tier assessment framework used in this casebook to evaluate crisis communications responses: Failed — the company\'s response materially worsened the reputational, legal, or operational outcome; Mixed — the response had substantive elements of both good practice and failure; Effective — the company\'s response demonstrably limited damage or enabled reputation recovery.',
    definitionEs:
      'El marco de evaluación de tres niveles utilizado en este libro de casos para evaluar las respuestas de comunicaciones de crisis: Fallida — la respuesta de la empresa empeoró materialmente el resultado reputacional, legal u operativo; Mixta — la respuesta tuvo elementos sustanciales tanto de buenas prácticas como de fracaso; Efectiva — la respuesta de la empresa limitó demostrablemente el daño o permitió la recuperación de la reputación.',
    whyItMatters:
      'The MINERBA dataset of 38 cases shows 47% Failed, 29% Mixed, and 24% Effective across energy, mining, and healthcare sectors. The failed majority reflects systematic patterns: delayed CEO visibility, poor indigenous engagement, inadequate independent monitoring, and prioritisation of legal caution over transparent communication.',
    whyItMattersEs:
      'El dataset MINERBA de 38 casos muestra 47% Fallida, 29% Mixta y 24% Efectiva en los sectores de energía, minería y atención médica. La mayoría fallida refleja patrones sistemáticos: visibilidad tardía del CEO, compromiso indígena deficiente, monitoreo independiente inadecuado y priorización de la cautela legal sobre la comunicación transparente.',
    relatedCaseIds: ['H1', '04', 'M1', '01'],
    seeAlso: ['social-license', 'voluntary-disclosure', 'ceo-visibility'],
  },
];

export function getGlossaryByCategory(cat: GlossaryCategory): GlossaryTerm[] {
  return GLOSSARY.filter((t) => t.category === cat);
}

export function getGlossaryTermById(id: string): GlossaryTerm | undefined {
  return GLOSSARY.find((t) => t.id === id);
}
