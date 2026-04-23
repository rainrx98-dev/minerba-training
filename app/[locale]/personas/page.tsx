import type { Metadata } from 'next';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { PERSONAS } from '@/lib/personas';

// ── Static generation ──────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }];
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title:
      locale === 'es'
        ? 'Personajes de Simulación — MINERBA'
        : 'Simulation Adversaries — MINERBA',
    description:
      locale === 'es'
        ? '5 personajes de IA que puede enfrentar en las simulaciones de comunicaciones de crisis de MINERBA: periodista, regulador, comunidad, inversor y ONG.'
        : '5 AI personas you can face in MINERBA crisis communications simulations: journalist, regulator, community leader, investor, and NGO director.',
  };
}

// ── Scoring dimensions per persona ────────────────────────────────────────────
// What the AI debrief evaluates for each persona type

const PERSONA_SCORING: Record<
  string,
  {
    whatSatisfies: string;
    whatSatisfiesEs: string;
    dimensions: string[];
    dimensionsEs: string[];
    watchOut: string;
    watchOutEs: string;
  }
> = {
  journalist: {
    whatSatisfies:
      'Specific, factual answers with named accountability — the story still runs, but the framing softens.',
    whatSatisfiesEs:
      'Respuestas específicas y fácticas con responsabilidades nombradas — la nota se publica igual, pero el enfoque se suaviza.',
    dimensions: [
      'Message consistency under sustained adversarial pressure',
      'Avoiding new legal liability through precise word choice',
      'Humanising the response while remaining factually tight',
      'Handling "what did you know and when?" without deflecting',
      'Not confirming unverified allegations — even by accident',
    ],
    dimensionsEs: [
      'Consistencia del mensaje bajo presión adversarial sostenida',
      'Evitar nuevas responsabilidades legales con elección precisa de palabras',
      'Humanizar la respuesta sin perder precisión factual',
      'Manejar "¿qué sabían y cuándo?" sin evadir',
      'No confirmar alegaciones no verificadas — ni siquiera accidentalmente',
    ],
    watchOut:
      'The journalist introduces new complications mid-conversation — a document they just received, a contradictory prior statement. Never react to unverified claims; acknowledge and verify.',
    watchOutEs:
      'El periodista introduce nuevas complicaciones a mitad de conversación — un documento que acaba de recibir, una declaración contradictoria previa. Nunca reaccione a afirmaciones no verificadas; reconózcalas y verifíquelas.',
  },
  regulator: {
    whatSatisfies:
      'Complete, timestamped factual disclosure with named accountability. Voluntary disclosure beyond the minimum. A binding remediation commitment with third-party oversight.',
    whatSatisfiesEs:
      'Divulgación factual completa con marcas de tiempo y responsabilidades nombradas. Divulgación voluntaria más allá del mínimo. Compromiso de remediación vinculante con supervisión de terceros.',
    dimensions: [
      'Distinguishing the legal register from the reputational register',
      'Avoiding over-disclosure that creates unnecessary legal exposure',
      'Avoiding under-disclosure that constitutes obstruction',
      'Demonstrating genuine cooperation vs. managed compliance',
      'Providing timestamped, verifiable factual precision',
    ],
    dimensionsEs: [
      'Distinguir el registro legal del reputacional',
      'Evitar la sobredivulgación que crea exposición legal innecesaria',
      'Evitar la subdivulgación que constituye obstrucción',
      'Demostrar cooperación genuina vs. cumplimiento gestionado',
      'Proporcionar precisión factual con marcas de tiempo verificables',
    ],
    watchOut:
      'The regulator introduces parallel investigations and contradictions from field reports. "We are still investigating" is not an acceptable answer — provide what is known now, not what will be known later.',
    watchOutEs:
      'El regulador introduce investigaciones paralelas y contradicciones de informes de campo. "Aún estamos investigando" no es una respuesta aceptable — proporcione lo que se sabe ahora, no lo que se sabrá después.',
  },
  community: {
    whatSatisfies:
      'Specific, plain-language acknowledgment of harm. Concrete commitments with independent governance — not company-controlled foundations. Genuine human equality, not liability management.',
    whatSatisfiesEs:
      'Reconocimiento específico del daño en lenguaje sencillo. Compromisos concretos con gobernanza independiente — no fundaciones controladas por la empresa. Igualdad humana genuina, no gestión de responsabilidad.',
    dimensions: [
      'Leading with empathy before facts — not the reverse',
      'Giving unconditional acknowledgment, not qualified legalese',
      'Treating the person as an equal, not a liability to manage',
      'Making promises that are actually keepable and enforceable',
      'Recognising that financial offers cannot substitute for acknowledgment',
    ],
    dimensionsEs: [
      'Liderar con empatía antes que con hechos — no al revés',
      'Dar reconocimiento incondicional, no jerga legal calificada',
      'Tratar a la persona como un igual, no como una responsabilidad a gestionar',
      'Hacer promesas que sean realmente cumplibles y exigibles',
      'Reconocer que las ofertas financieras no pueden sustituir el reconocimiento',
    ],
    watchOut:
      'Carmen López escalates gradually — each round she introduces another affected family member or a meeting with a journalist tomorrow. Emotional momentum builds quickly; technical arguments make it worse.',
    watchOutEs:
      'Carmen López escala gradualmente — en cada ronda introduce a otro familiar afectado o una reunión con un periodista mañana. El impulso emocional se acumula rápidamente; los argumentos técnicos lo empeoran.',
  },
  investor: {
    whatSatisfies:
      'A credible financial exposure range. Named board accountability with consequences. A recovery plan with specific milestones. Genuine transparency about governance changes.',
    whatSatisfiesEs:
      'Un rango creíble de exposición financiera. Responsabilidad de la junta directiva con nombres y consecuencias. Un plan de recuperación con hitos específicos. Transparencia genuina sobre cambios de gobernanza.',
    dimensions: [
      'Understanding reputational risk vs. structural financial risk',
      'Speaking the language of fiduciary duty, not brand narrative',
      'Providing quantified specificity, not vague assurances',
      'Understanding ESG rating mechanics and MSCI watchlist implications',
      'Demonstrating that management credibility can survive the incident',
    ],
    dimensionsEs: [
      'Distinguir el riesgo reputacional del riesgo financiero estructural',
      'Hablar el lenguaje del deber fiduciario, no de la narrativa de marca',
      'Proporcionar especificidad cuantificada, no vagas garantías',
      'Comprender los mecanismos de calificación ESG e implicaciones de watchlist MSCI',
      'Demostrar que la credibilidad de la dirección puede sobrevivir al incidente',
    ],
    watchOut:
      'The investor is coordinating informally with 2–3 other large shareholders. Your answers do not stay in this room. Activist proxy advisory firms are already watching. Vague answers are a governance red flag in themselves.',
    watchOutEs:
      'El inversor se coordina informalmente con 2–3 grandes accionistas. Sus respuestas no quedan en esta sala. Las firmas de asesoramiento proxy activistas ya están atentas. Las respuestas vagas son una señal de alerta de gobernanza en sí mismas.',
  },
  ngo: {
    whatSatisfies:
      'Binding, independently monitored commitments with specific milestones and public reporting. Named executive accountability with consequences. Acknowledgment of systemic failure — not operational error.',
    whatSatisfiesEs:
      'Compromisos vinculantes e independientemente monitoreados con hitos específicos e informes públicos. Responsabilidad ejecutiva nombrada con consecuencias. Reconocimiento de falla sistémica — no de error operativo.',
    dimensions: [
      'Recognising the NGO as both watchdog and potential ally',
      'Distinguishing settling a case from resolving an issue',
      'Offering binding commitments, not aspirational language',
      'Understanding that co-opting the NGO is a career-ending mistake',
      'Engaging with ILO 169 / UNGP legal frameworks on their terms',
    ],
    dimensionsEs: [
      'Reconocer la ONG como vigilante y potencial aliada',
      'Distinguir resolver un caso de resolver un problema',
      'Ofrecer compromisos vinculantes, no lenguaje aspiracional',
      'Entender que cooptar la ONG es un error que termina carreras',
      'Comprometerse con los marcos jurídicos OIT 169 / UNGP en sus propios términos',
    ],
    watchOut:
      'Dr. Andrade has 18 months of documentation, UN Rapporteur contacts, and a Geneva press conference in 24 hours. She is giving you one opportunity. Anything that sounds like PR spin immediately ends the negotiation.',
    watchOutEs:
      'La Dra. Andrade tiene 18 meses de documentación, contactos con relatores de la ONU y una conferencia de prensa en Ginebra en 24 horas. Le está dando una oportunidad. Cualquier cosa que suene a spin de PR termina inmediatamente la negociación.',
  },
};

// ── Difficulty config ──────────────────────────────────────────────────────────

const DIFFICULTY_CONFIG = {
  Challenging: {
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    bar: 'bg-amber-400',
    barWidth: '33%',
    label: 'Challenging',
    labelEs: 'Exigente',
  },
  'Very Challenging': {
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    bar: 'bg-orange-500',
    barWidth: '66%',
    label: 'Very Challenging',
    labelEs: 'Muy Exigente',
  },
  Expert: {
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200',
    bar: 'bg-red-600',
    barWidth: '100%',
    label: 'Expert',
    labelEs: 'Experto',
  },
};

// ── Page ───────────────────────────────────────────────────────────────────────

export default async function PersonasPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const isEs = locale === 'es';

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <div className="bg-navy-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs mb-5 text-navy-400">
            <Link href={`/${locale}`} className="hover:text-white transition-colors">MINERBA</Link>
            <span>›</span>
            <span className="text-navy-200">
              {isEs ? 'Personajes de Simulación' : 'Simulation Adversaries'}
            </span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
              {isEs
                ? 'Conozca a Sus Adversarios de Simulación'
                : 'Know Your Simulation Adversaries'}
            </h1>
            <p className="text-navy-200 text-base leading-relaxed max-w-2xl mb-6">
              {isEs
                ? 'En las simulaciones de crisis de MINERBA, la IA adopta uno de cinco roles de partes interesadas. Cada personaje tiene una agenda específica, un estilo de presión distinto y criterios de debrief únicos. Estudie esta guía antes de su primera simulación.'
                : 'In MINERBA crisis simulations, the AI takes on one of five stakeholder roles. Each persona has a specific agenda, a distinct pressure style, and unique debrief scoring criteria. Study this guide before your first simulation.'}
            </p>

            {/* Persona quick-pick pills */}
            <div className="flex flex-wrap gap-2">
              {PERSONAS.map((p) => {
                const diffCfg = DIFFICULTY_CONFIG[p.difficulty];
                return (
                  <a
                    key={p.id}
                    href={`#${p.id}`}
                    className="flex items-center gap-1.5 bg-navy-600 hover:bg-navy-500 border border-navy-500 rounded-lg px-3 py-1.5 transition-colors text-xs font-semibold text-white"
                  >
                    <span>{p.icon}</span>
                    <span>{isEs ? p.nameEs : p.name}</span>
                    <span className={`ml-1 text-[10px] px-1.5 py-0.5 rounded-full border ${diffCfg.bg} ${diffCfg.color} ${diffCfg.border}`}>
                      {isEs ? diffCfg.labelEs : diffCfg.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Preparation tip bar ─────────────────────────────────────────────── */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <p className="text-xs text-amber-800 font-medium">
            💡 {isEs
              ? 'Consejo: Comience con El/La Periodista o El/La Inversor/a para desarrollar habilidades de mensajería básicas antes de enfrentar a La Comunidad o La ONG, que requieren inteligencia emocional más profunda.'
              : 'Tip: Start with The Journalist or The Investor to build core messaging skills before facing The Community or The NGO, which require deeper emotional intelligence.'}
          </p>
        </div>
      </div>

      {/* ── Persona cards ───────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

        {PERSONAS.map((persona, idx) => {
          const scoring = PERSONA_SCORING[persona.id];
          const diffCfg = DIFFICULTY_CONFIG[persona.difficulty];

          return (
            <div
              id={persona.id}
              key={persona.id}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm scroll-mt-20"
            >
              {/* Card header */}
              <div className={`${persona.bgClass} border-b ${persona.colorClass.replace('border-', 'border-')} px-7 py-6`}>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <span className="text-4xl flex-shrink-0 leading-none mt-1">{persona.icon}</span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${diffCfg.bg} ${diffCfg.color} ${diffCfg.border}`}>
                          {isEs ? diffCfg.labelEs : diffCfg.label}
                        </span>
                        <span className="text-xs text-gray-400 font-medium">
                          {isEs ? 'Adversario' : 'Adversary'} #{idx + 1}
                        </span>
                      </div>
                      <h2 className={`text-2xl font-black ${persona.textClass} leading-tight`}>
                        {isEs ? persona.nameEs : persona.name}
                      </h2>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {isEs ? persona.roleEs : persona.role}
                      </p>
                    </div>
                  </div>

                  {/* Difficulty bar */}
                  <div className="shrink-0 min-w-[120px]">
                    <p className="text-xs text-gray-400 font-medium mb-1.5">
                      {isEs ? 'Nivel de dificultad' : 'Difficulty level'}
                    </p>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${diffCfg.bar}`}
                        style={{ width: diffCfg.barWidth }}
                      />
                    </div>
                    <p className={`text-xs font-semibold mt-1 ${diffCfg.color}`}>
                      {isEs ? diffCfg.labelEs : diffCfg.label}
                    </p>
                  </div>
                </div>

                {/* Description + Agenda */}
                <div className="mt-5 grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                      {isEs ? 'Quién es' : 'Who they are'}
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {isEs ? persona.descriptionEs : persona.description}
                    </p>
                  </div>
                  <div className={`${persona.bgClass} border ${persona.colorClass.replace('border-l-', 'border-').replace('border-', 'border-')} rounded-xl p-4`}>
                    <p className={`text-xs font-bold uppercase tracking-wider mb-1.5 ${persona.textClass}`}>
                      {isEs ? 'Su agenda' : 'Their agenda'}
                    </p>
                    <p className="text-sm font-semibold text-gray-700 leading-relaxed">
                      {isEs ? persona.agendaEs : persona.agenda}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card body */}
              <div className="px-7 py-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Opening move preview */}
                <div className="lg:col-span-1">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                    {isEs ? 'Cómo abre la conversación' : 'How they open'}
                  </h3>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <p className="text-xs text-gray-600 leading-relaxed italic line-clamp-5">
                      &ldquo;{(isEs ? persona.openerLineEs : persona.openerLine).split('\n')[0].replace(/\*/g, '')}&rdquo;
                    </p>
                    <p className="text-xs text-gray-400 mt-2 font-medium">
                      {isEs ? '— apertura real en la simulación' : '— actual simulation opening'}
                    </p>
                  </div>
                </div>

                {/* Scoring dimensions */}
                {scoring && (
                  <div className="lg:col-span-1">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                      {isEs ? 'Qué evalúa el debrief' : 'Debrief scoring dimensions'}
                    </h3>
                    <div className="space-y-1.5">
                      {(isEs ? scoring.dimensionsEs : scoring.dimensions).map((dim, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-navy-400 font-bold text-xs shrink-0 mt-0.5">
                            {i + 1}.
                          </span>
                          <p className="text-xs text-gray-600 leading-relaxed">{dim}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* What satisfies + watch out */}
                {scoring && (
                  <div className="space-y-4 lg:col-span-1">
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-1.5">
                        {isEs ? '✓ Qué los satisface' : '✓ What satisfies them'}
                      </p>
                      <p className="text-xs text-green-800 leading-relaxed">
                        {isEs ? scoring.whatSatisfiesEs : scoring.whatSatisfies}
                      </p>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                      <p className="text-xs font-bold text-red-700 uppercase tracking-wide mb-1.5">
                        {isEs ? '⚠ Cuidado con' : '⚠ Watch out for'}
                      </p>
                      <p className="text-xs text-red-800 leading-relaxed">
                        {isEs ? scoring.watchOutEs : scoring.watchOut}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* CTA strip */}
              <div className="px-7 pb-6">
                <div className="border-t border-gray-100 pt-5 flex flex-wrap items-center gap-3">
                  <p className="text-xs text-gray-400 mr-2">
                    {isEs
                      ? 'Practica con este personaje:'
                      : 'Practice with this persona:'}
                  </p>
                  <Link
                    href={`/${locale}/cases`}
                    className="text-xs font-semibold bg-navy-700 text-white px-3 py-1.5 rounded-lg hover:bg-navy-800 transition-colors"
                  >
                    {isEs ? `Simular con ${persona.nameEs} →` : `Simulate with ${persona.name} →`}
                  </Link>
                  <Link
                    href={`/${locale}/assessment`}
                    className="text-xs font-semibold border border-gray-200 text-gray-500 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {isEs ? '⚡ Diagnóstico →' : '⚡ Assessment →'}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Bottom CTA ──────────────────────────────────────────────────────── */}
      <div className="bg-navy-700 mt-8 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            {isEs
              ? '¿Listo para la simulación?'
              : 'Ready to simulate?'}
          </h2>
          <p className="text-navy-300 text-sm max-w-xl mx-auto mb-7 leading-relaxed">
            {isEs
              ? 'Elija un caso de estudio y enfrente a uno de estos adversarios. Después de la conversación, el personaje le dará un debrief profesional basado en los criterios de evaluación anteriores.'
              : 'Choose a case study and face one of these adversaries. After the conversation, the persona will give you a professional debrief based on the scoring criteria above.'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`/${locale}/cases`}
              className="inline-flex items-center gap-2 bg-white text-navy-700 font-bold text-sm px-6 py-3 rounded-lg hover:bg-navy-50 transition-colors"
            >
              {isEs ? '→ Explorar casos y simular' : '→ Explore cases & simulate'}
            </Link>
            <Link
              href={`/${locale}/learning`}
              className="inline-flex items-center gap-2 border border-navy-400 text-navy-200 font-semibold text-sm px-6 py-3 rounded-lg hover:border-white hover:text-white transition-colors"
            >
              {isEs ? '🎓 Ver rutas de aprendizaje' : '🎓 View learning paths'}
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
