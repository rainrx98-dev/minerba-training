import type { Metadata } from 'next';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title:
      locale === 'es'
        ? 'Nuestros Servicios — MINERBA Comunicación Corporativa'
        : 'Our Services — MINERBA Crisis Communications',
    description:
      locale === 'es'
        ? 'Diagnóstico, planificación, entrenamiento y simulación de crisis para empresas de energía y minería en América Latina.'
        : 'Crisis readiness diagnostics, planning, executive training, and simulation for Latin American energy and mining companies.',
  };
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }];
}

// ─── Bilingual content ────────────────────────────────────────────────────────

const SERVICES = [
  {
    icon: '⚡',
    titleEn: 'Crisis Readiness Assessment',
    titleEs: 'Diagnóstico de Preparación para Crisis',
    descEn:
      'A structured 12-dimension diagnostic that benchmarks your organisation against 38 real LATAM energy and mining crises. You receive a 0–100 readiness score, a gap-priority matrix, and a written findings report.',
    descEs:
      'Un diagnóstico estructurado de 12 dimensiones que compara su organización con 38 crisis reales de energía y minería en LATAM. Recibe una puntuación de 0–100, una matriz de brechas prioritarias y un informe escrito.',
    tagEn: 'Energy & Mining Operators',
    tagEs: 'Operadores de Energía y Minería',
  },
  {
    icon: '📋',
    titleEn: 'Crisis Communications Plan Development',
    titleEs: 'Desarrollo del Plan de Comunicación de Crisis',
    descEn:
      'We write a complete, activation-ready crisis communications plan — covering 12+ scenario types, pre-approved holding statements, stakeholder notification trees, and bilingual message templates. Built around your actual operations and community context.',
    descEs:
      'Redactamos un plan de comunicación de crisis completo y listo para activar — con más de 12 tipos de escenario, declaraciones de contención pre-aprobadas, árboles de notificación y plantillas bilingües. Construido a partir de su contexto operacional y comunitario real.',
    tagEn: 'Companies Without a Written Plan',
    tagEs: 'Empresas Sin Plan Escrito',
  },
  {
    icon: '🎙',
    titleEn: 'CEO & Spokesperson Media Training',
    titleEs: 'Entrenamiento de Portavoces y CEO para Medios',
    descEn:
      'Intensive camera and interview coaching that builds camera presence, bridging technique, and message discipline under pressure. Executives complete three on-camera simulations with journalist role-play drawn from real LATAM crisis coverage.',
    descEs:
      'Coaching intensivo ante cámara y en entrevistas que desarrolla presencia mediática, técnica de puente y disciplina de mensaje bajo presión. Los ejecutivos completan tres simulaciones con rol de periodista basadas en coberturas reales de crisis LATAM.',
    tagEn: 'C-Suite & Designated Spokespersons',
    tagEs: 'Alta Dirección y Portavoces Designados',
  },
  {
    icon: '🎯',
    titleEn: 'Crisis Simulation Exercise',
    titleEs: 'Ejercicio de Simulación de Crisis',
    descEn:
      'A full-day, multi-stakeholder tabletop or live simulation built around a scenario specific to your industry and geography. Includes a structured debrief, scored performance dashboard, and a 90-day improvement roadmap.',
    descEs:
      'Una simulación de mesa o en vivo de jornada completa con múltiples partes interesadas, construida alrededor de un escenario específico a su industria y geografía. Incluye un debrief estructurado, tablero de desempeño y hoja de ruta de mejora a 90 días.',
    tagEn: 'Crisis Response Teams',
    tagEs: 'Equipos de Respuesta a Crisis',
  },
  {
    icon: '🌎',
    titleEn: 'LATAM Market Entry Protocol',
    titleEs: 'Protocolo de Entrada a Mercados LATAM',
    descEn:
      'A social-licence-first communications strategy for companies entering new Latin American markets. Covers indigenous consultation obligations, community relations architecture, and regulatory communications mapping across target jurisdictions.',
    descEs:
      'Una estrategia de comunicaciones centrada en la licencia social para empresas que ingresan a nuevos mercados latinoamericanos. Cubre obligaciones de consulta indígena, arquitectura de relaciones comunitarias y mapeo de comunicaciones regulatorias en las jurisdicciones objetivo.',
    tagEn: 'International Companies Entering LATAM',
    tagEs: 'Empresas Internacionales Que Ingresan a LATAM',
  },
  {
    icon: '⚖️',
    titleEn: 'FPIC / Consulta Previa Support',
    titleEs: 'Apoyo a CLPI / Consulta Previa',
    descEn:
      'End-to-end advisory for Free, Prior and Informed Consent processes under ILO Convention 169 and national frameworks. We provide documentation design, compliance review, and community engagement facilitation to reduce legal and reputational exposure.',
    descEs:
      'Asesoría integral para procesos de Consentimiento Libre, Previo e Informado bajo el Convenio 169 de la OIT y marcos nacionales. Ofrecemos diseño de documentación, revisión de cumplimiento y facilitación del relacionamiento comunitario para reducir la exposición legal y reputacional.',
    tagEn: 'Mining & Energy Projects Near Indigenous Communities',
    tagEs: 'Proyectos Mineros y Energéticos Cerca de Comunidades Indígenas',
  },
  {
    icon: '🤝',
    titleEn: 'Stakeholder Mapping & Community Relations',
    titleEs: 'Mapeo de Partes Interesadas y Relaciones Comunitarias',
    descEn:
      'A structured intelligence exercise that builds a living stakeholder register, influence-interest matrix, and pre-built contact protocols for every key actor. We also design the community liaison role and onboard your first liaison officer.',
    descEs:
      'Un ejercicio de inteligencia estructurado que construye un registro vivo de partes interesadas, una matriz de influencia-interés y protocolos de contacto prediseñados para cada actor clave. También diseñamos el rol de enlace comunitario y acompañamos el proceso de incorporación.',
    tagEn: 'Operations with Community Conflict Risk',
    tagEs: 'Operaciones con Riesgo de Conflicto Comunitario',
  },
  {
    icon: '🔁',
    titleEn: 'Post-Crisis Debrief & Lessons System',
    titleEs: 'Sistema de Debrief Post-Crisis y Lecciones Aprendidas',
    descEn:
      'A facilitated post-incident process that converts your crisis experience into institutional knowledge. Deliverables include a structured After Action Review, a prioritised lessons register, and an implementation-tracking system tied to your next plan revision.',
    descEs:
      'Un proceso post-incidente facilitado que convierte la experiencia de crisis en conocimiento institucional. Los entregables incluyen una Revisión After Action estructurada, un registro priorizado de lecciones y un sistema de seguimiento vinculado a la próxima revisión del plan.',
    tagEn: 'Organisations After a Significant Incident',
    tagEs: 'Organizaciones Tras un Incidente Significativo',
  },
];

const DIFFERENTIATORS = [
  {
    icon: '🌎',
    titleEn: 'Deep Latin American Expertise',
    titleEs: 'Profunda Experiencia en América Latina',
    descEn:
      'Our methodology is built on the region — not adapted from it. Every framework, scenario, and recommendation is grounded in the political, cultural, and regulatory realities of Latin American markets.',
    descEs:
      'Nuestra metodología está construida desde la región, no adaptada a ella. Cada marco, escenario y recomendación está fundamentado en las realidades políticas, culturales y regulatorias de los mercados latinoamericanos.',
  },
  {
    icon: '📊',
    titleEn: '38-Case Proprietary Dataset',
    titleEs: 'Dataset Propietario de 38 Casos',
    descEn:
      'Every recommendation is calibrated against our structured analysis of 38 energy, mining, and healthcare crises across Latin America — the largest practitioner-curated dataset of its kind for the region.',
    descEs:
      'Cada recomendación está calibrada con nuestro análisis estructurado de 38 crisis de energía, minería y salud en toda América Latina — el mayor dataset curado por practicantes de su tipo para la región.',
  },
  {
    icon: '🗣',
    titleEn: 'Fully Bilingual Delivery',
    titleEs: 'Entrega Completamente Bilingüe',
    descEn:
      'All deliverables, training materials, and simulations are produced in both English and Spanish. No translation lag, no message dilution — your team receives the same precision in both languages.',
    descEs:
      'Todos los entregables, materiales de formación y simulaciones se producen en inglés y español. Sin retrasos de traducción ni dilución del mensaje — su equipo recibe la misma precisión en ambos idiomas.',
  },
  {
    icon: '🎯',
    titleEn: 'Simulation-Based Learning',
    titleEs: 'Aprendizaje Basado en Simulación',
    descEn:
      'We do not deliver slide decks. Every engagement includes at least one hands-on simulation, because retention and behaviour change require practice under realistic pressure — not passive instruction.',
    descEs:
      'No entregamos presentaciones de diapositivas. Cada proyecto incluye al menos una simulación práctica, porque la retención y el cambio de comportamiento requieren práctica bajo presión realista, no instrucción pasiva.',
  },
];

const PROCESS_STEPS = [
  {
    number: '01',
    labelEn: 'Diagnose',
    labelEs: 'Diagnosticar',
    descEn:
      'We start with a rapid readiness assessment to understand your current capabilities, exposure profile, and the most likely crisis scenarios for your operations.',
    descEs:
      'Comenzamos con una evaluación rápida de preparación para comprender sus capacidades actuales, perfil de exposición y los escenarios de crisis más probables para sus operaciones.',
  },
  {
    number: '02',
    labelEn: 'Design',
    labelEs: 'Diseñar',
    descEn:
      'We co-create a tailored engagement — whether a plan, training programme, simulation, or advisory retainer — aligned to your risk profile, team size, and timeline.',
    descEs:
      'Co-creamos un proyecto a medida — ya sea un plan, programa de formación, simulación o contrato de asesoría — alineado a su perfil de riesgo, tamaño de equipo y calendario.',
  },
  {
    number: '03',
    labelEn: 'Deliver',
    labelEs: 'Entregar',
    descEn:
      'We execute with your team, transfer institutional knowledge, and leave you with documentation and systems that function without us when a real crisis strikes.',
    descEs:
      'Ejecutamos con su equipo, transferimos conocimiento institucional y le dejamos documentación y sistemas que funcionan sin nosotros cuando una crisis real ocurre.',
  },
];

// ─── Page component ───────────────────────────────────────────────────────────

export default async function ServicesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const isEs = locale === 'es';

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <div className="bg-navy-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-navy-300 uppercase tracking-widest mb-3 block">
              {isEs ? 'Servicios Profesionales' : 'Professional Services'}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              {isEs ? 'Nuestros Servicios' : 'Our Services'}
            </h1>
            <p className="text-navy-200 text-lg leading-relaxed max-w-2xl">
              {isEs
                ? 'Diagnóstico, planificación, entrenamiento y simulación de crisis diseñados específicamente para empresas de energía y minería que operan en América Latina.'
                : 'Crisis diagnostics, planning, training, and simulation designed specifically for energy and mining companies operating across Latin America.'}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={`/${locale}/assessment`}
                className="inline-flex items-center gap-2 bg-gold text-white font-bold text-sm px-6 py-3 rounded-lg hover:bg-gold-dark transition-colors"
              >
                {isEs ? '⚡ Iniciar diagnóstico gratuito →' : '⚡ Start free assessment →'}
              </Link>
              <a
                href="#services"
                className="inline-flex items-center gap-2 border border-navy-400 text-navy-200 font-semibold text-sm px-6 py-3 rounded-lg hover:border-white hover:text-white transition-colors"
              >
                {isEs ? 'Ver todos los servicios ↓' : 'View all services ↓'}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Service cards ─────────────────────────────────────────────────────── */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-navy-700">
            {isEs ? 'Catálogo de Servicios' : 'Service Catalogue'}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {isEs
              ? 'Ocho líneas de servicio que cubren el ciclo completo de preparación y respuesta a crisis'
              : 'Eight service lines covering the full crisis preparedness and response lifecycle'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SERVICES.map((s) => (
            <div
              key={s.titleEn}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:border-navy-300 hover:shadow-md transition-all"
            >
              {/* Icon + tag row */}
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl leading-none">{s.icon}</span>
                <span className="text-xs font-semibold text-navy-500 bg-navy-50 border border-navy-200 px-2.5 py-1 rounded-full leading-tight text-right max-w-[55%]">
                  {isEs ? s.tagEs : s.tagEn}
                </span>
              </div>
              {/* Title */}
              <h3 className="font-bold text-navy-700 text-lg mb-3 leading-snug">
                {isEs ? s.titleEs : s.titleEn}
              </h3>
              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed">
                {isEs ? s.descEs : s.descEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Why MINERBA ───────────────────────────────────────────────────────── */}
      <section className="bg-navy-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-xs font-bold text-navy-300 uppercase tracking-widest mb-3 block">
              {isEs ? 'Nuestra Diferenciación' : 'Our Differentiation'}
            </span>
            <h2 className="text-2xl font-bold text-white">
              {isEs ? '¿Por Qué MINERBA?' : 'Why MINERBA?'}
            </h2>
            <p className="text-navy-300 text-sm mt-2 max-w-xl leading-relaxed">
              {isEs
                ? 'No somos una firma de comunicaciones genérica con un módulo LATAM. Somos especialistas construidos desde adentro de la región.'
                : 'We are not a generic communications firm with a LATAM module. We are specialists built from inside the region.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DIFFERENTIATORS.map((d) => (
              <div
                key={d.titleEn}
                className="bg-navy-600 border border-navy-500 rounded-xl p-6 hover:bg-navy-500 transition-colors"
              >
                <span className="text-3xl mb-4 block">{d.icon}</span>
                <h3 className="font-bold text-white text-base mb-3 leading-snug">
                  {isEs ? d.titleEs : d.titleEn}
                </h3>
                <p className="text-navy-300 text-sm leading-relaxed">
                  {isEs ? d.descEs : d.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How we work ───────────────────────────────────────────────────────── */}
      <section className="bg-white border-t border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-navy-400 uppercase tracking-widest mb-3 block">
              {isEs ? 'Nuestro Proceso' : 'Our Process'}
            </span>
            <h2 className="text-2xl font-bold text-navy-700 mb-3">
              {isEs ? 'Cómo Trabajamos' : 'How We Work'}
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              {isEs
                ? 'Cada proyecto sigue tres fases diseñadas para producir resultados tangibles desde la primera sesión.'
                : 'Every engagement follows three phases designed to produce tangible results from the first session.'}
            </p>
          </div>

          <div className="relative">
            {/* Connector line — visible on md+ */}
            <div className="hidden md:block absolute top-10 left-[16.67%] right-[16.67%] h-px bg-navy-200 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {PROCESS_STEPS.map((step, idx) => (
                <div key={step.number} className="flex flex-col items-center text-center">
                  {/* Step number circle */}
                  <div className="w-20 h-20 rounded-full bg-navy-700 text-white flex flex-col items-center justify-center mb-5 shadow-md">
                    <span className="text-xs font-bold text-navy-300 uppercase tracking-widest leading-none">
                      {isEs ? 'Paso' : 'Step'}
                    </span>
                    <span className="text-2xl font-black leading-none mt-0.5">{idx + 1}</span>
                  </div>
                  {/* Step label */}
                  <h3 className="font-bold text-navy-700 text-xl mb-3">
                    {isEs ? step.labelEs : step.labelEn}
                  </h3>
                  {/* Description */}
                  <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                    {isEs ? step.descEs : step.descEn}
                  </p>
                  {/* Arrow between steps — mobile only */}
                  {idx < PROCESS_STEPS.length - 1 && (
                    <div className="md:hidden mt-6 text-navy-300 text-2xl">↓</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA strip ─────────────────────────────────────────────────────────── */}
      <section className="bg-gold py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-white leading-tight mb-2">
                {isEs
                  ? '¿Listo para saber dónde está su organización?'
                  : 'Ready to find out where your organisation stands?'}
              </h2>
              <p className="text-white/80 text-sm leading-relaxed max-w-xl">
                {isEs
                  ? 'Complete el diagnóstico gratuito de preparación en 4 minutos y reciba recomendaciones de servicios personalizadas basadas en sus respuestas.'
                  : 'Complete the free readiness assessment in 4 minutes and receive personalised service recommendations based on your answers.'}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href={`/${locale}/assessment`}
                className="inline-flex items-center justify-center gap-2 bg-white text-gold-dark font-bold text-sm px-7 py-3.5 rounded-lg hover:bg-navy-50 transition-colors shadow-sm"
              >
                {isEs ? '⚡ Iniciar diagnóstico →' : '⚡ Take the assessment →'}
              </Link>
              <Link
                href={`/${locale}/cases`}
                className="inline-flex items-center justify-center gap-2 border-2 border-white/60 text-white font-semibold text-sm px-7 py-3.5 rounded-lg hover:border-white hover:bg-white/10 transition-colors"
              >
                {isEs ? 'Ver casos de estudio →' : 'Explore case studies →'}
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
