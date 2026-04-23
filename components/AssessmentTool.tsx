'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ASSESSMENT_QUESTIONS,
  QUESTIONS_BY_CATEGORY,
  CATEGORY_ORDER,
  CATEGORY_META,
  SCORE_BANDS,
  computeResults,
} from '@/lib/assessment';
import type { AssessmentCategory } from '@/lib/assessment';
import { LEARNING_PATHS, DIFFICULTY_COLORS, LATAM_RELEVANCE_COLORS } from '@/lib/learning-paths';
import type { LearningPath } from '@/lib/learning-paths';

type Phase = 'intro' | 'questions' | 'contact' | 'results';

interface ContactInfo {
  name: string;
  company: string;
  role: string;
  email: string;
  country: string;
}

export default function AssessmentTool({ locale }: { locale: string }) {
  const isEs = locale === 'es';
  const [phase, setPhase] = useState<Phase>('intro');
  const [categoryIdx, setCategoryIdx] = useState(0); // 0-3
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [contact, setContact] = useState<ContactInfo>({ name: '', company: '', role: '', email: '', country: '' });
  const [submitted, setSubmitted] = useState(false);

  const currentCategory = CATEGORY_ORDER[categoryIdx] as AssessmentCategory;
  const currentQuestions = QUESTIONS_BY_CATEGORY[currentCategory];
  const catMeta = CATEGORY_META[currentCategory];

  // How many questions in current category are answered
  const currentAnswered = currentQuestions.filter((q) => answers[q.id] !== undefined).length;
  const currentComplete = currentAnswered === currentQuestions.length;

  // Overall progress
  const totalAnswered = ASSESSMENT_QUESTIONS.filter((q) => answers[q.id] !== undefined).length;
  const totalQuestions = ASSESSMENT_QUESTIONS.length;

  function handleAnswer(questionId: string, value: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  function handleNext() {
    if (categoryIdx < CATEGORY_ORDER.length - 1) {
      setCategoryIdx((i) => i + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setPhase('contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function handlePrev() {
    if (categoryIdx > 0) {
      setCategoryIdx((i) => i - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setPhase('intro');
    }
  }

  function handleSkipContact() {
    setPhase('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setPhase('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const results = phase === 'results' ? computeResults(answers) : null;

  // ── INTRO ──────────────────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          {/* Header */}
          <div className="bg-navy-700 px-8 py-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-navy-600 border border-navy-500 rounded-xl px-4 py-2 text-center">
                <div className="text-2xl font-black text-white leading-none">CR</div>
                <div className="text-navy-300 text-xs font-bold mt-0.5 uppercase tracking-widest">Score</div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  {isEs ? 'Evaluación de Preparación para Crisis' : 'Crisis Readiness Assessment'}
                </h2>
                <p className="text-navy-300 text-sm mt-0.5">
                  {isEs ? 'Por MINERBA Comunicación Corporativa' : 'By MINERBA Comunicación Corporativa'}
                </p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="px-8 py-7">
            <p className="text-gray-700 leading-relaxed mb-6">
              {isEs
                ? 'Esta evaluación mide la preparación de su organización para manejar una crisis de comunicaciones en el sector energético o minero de América Latina. 12 preguntas · 4 dimensiones · 4 minutos.'
                : 'This assessment measures your organisation\'s readiness to manage a communications crisis in the Latin American energy or mining sector. 12 questions · 4 dimensions · 4 minutes.'}
            </p>

            {/* 4 category previews */}
            <div className="grid grid-cols-2 gap-3 mb-7">
              {CATEGORY_ORDER.map((cat) => {
                const m = CATEGORY_META[cat];
                return (
                  <div key={cat} className="bg-gray-50 border border-gray-100 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base">{m.icon}</span>
                      <span className="text-xs font-bold text-gray-700">
                        {isEs ? m.labelEs : m.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 leading-snug">
                      {isEs ? m.descriptionEs : m.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* What you get */}
            <div className="bg-navy-50 border border-navy-100 rounded-lg p-4 mb-7">
              <p className="text-xs font-bold text-navy-700 uppercase tracking-wide mb-2">
                {isEs ? 'Sus resultados incluirán:' : 'Your results will include:'}
              </p>
              <ul className="space-y-1.5">
                {[
                  isEs ? 'Puntuación de preparación de 0 a 100' : 'Readiness score from 0 to 100',
                  isEs ? 'Desglose por categoría con sus principales brechas' : 'Category breakdown with your top gaps',
                  isEs ? 'Las 3 vulnerabilidades más urgentes' : 'Your 3 most urgent vulnerabilities',
                  isEs ? 'Recomendaciones de servicios MINERBA adaptadas a sus brechas' : 'MINERBA service recommendations tailored to your gaps',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-navy-800">
                    <span className="text-navy-400 mt-0.5 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setPhase('questions')}
              className="w-full bg-navy-700 text-white font-bold py-3.5 rounded-xl hover:bg-navy-800 transition-colors text-sm"
            >
              {isEs ? 'Comenzar la evaluación →' : 'Begin assessment →'}
            </button>
            <p className="text-xs text-center text-gray-400 mt-3">
              {isEs
                ? 'Sus respuestas son confidenciales y no se guardan automáticamente.'
                : 'Your answers are confidential and not automatically stored.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── QUESTIONS ──────────────────────────────────────────────────────────────
  if (phase === 'questions') {
    return (
      <div className="max-w-2xl mx-auto">
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
              {isEs ? `Sección ${categoryIdx + 1} de ${CATEGORY_ORDER.length}` : `Section ${categoryIdx + 1} of ${CATEGORY_ORDER.length}`}
              {' · '}
              <span className={catMeta.color}>{isEs ? catMeta.labelEs : catMeta.label}</span>
            </span>
            <span className="text-xs text-gray-400">
              {totalAnswered}/{totalQuestions} {isEs ? 'respondidas' : 'answered'}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-navy-500 rounded-full transition-all duration-300"
              style={{ width: `${(totalAnswered / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Category header */}
        <div className="flex items-center gap-3 mb-5">
          <span className="text-2xl">{catMeta.icon}</span>
          <div>
            <h3 className="font-bold text-navy-700">{isEs ? catMeta.labelEs : catMeta.label}</h3>
            <p className="text-xs text-gray-500">{isEs ? catMeta.descriptionEs : catMeta.description}</p>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6 mb-8">
          {currentQuestions.map((q, qi) => (
            <div key={q.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              {/* Question header */}
              <div className={`px-5 py-4 border-b border-gray-100 ${answers[q.id] !== undefined ? 'bg-gray-50' : 'bg-white'}`}>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-navy-100 text-navy-700 text-xs font-bold flex items-center justify-center mt-0.5">
                    {categoryIdx * 3 + qi + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-navy-700 leading-snug">
                      {isEs ? q.questionEs : q.question}
                    </p>
                    {q.criticalGap && (
                      <span className="inline-block mt-1.5 text-xs font-bold text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded-full">
                        {isEs ? '⚠ Factor crítico' : '⚠ Critical factor'}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Answer options */}
              <div className="divide-y divide-gray-50">
                {q.options.map((opt) => {
                  const selected = answers[q.id] === opt.value;
                  const scoreColors = [
                    'hover:bg-red-50 hover:border-red-200',
                    'hover:bg-orange-50 hover:border-orange-200',
                    'hover:bg-amber-50 hover:border-amber-200',
                    'hover:bg-green-50 hover:border-green-200',
                  ];
                  const selectedColors = [
                    'bg-red-50 border-l-4 border-l-red-400',
                    'bg-orange-50 border-l-4 border-l-orange-400',
                    'bg-amber-50 border-l-4 border-l-amber-400',
                    'bg-green-50 border-l-4 border-l-green-500',
                  ];
                  const dotColors = ['bg-red-400', 'bg-orange-400', 'bg-amber-400', 'bg-green-500'];

                  return (
                    <button
                      key={opt.value}
                      onClick={() => handleAnswer(q.id, opt.value)}
                      className={`w-full text-left px-5 py-3.5 flex items-center gap-3 transition-colors cursor-pointer ${
                        selected ? selectedColors[opt.value] : `bg-white ${scoreColors[opt.value]}`
                      }`}
                    >
                      {/* Score dot */}
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${dotColors[opt.value]} ${selected ? 'opacity-100' : 'opacity-30'}`} />
                      {/* Check indicator */}
                      <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                        selected ? 'border-navy-500 bg-navy-500' : 'border-gray-300 bg-white'
                      }`}>
                        {selected && (
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="white">
                            <path d="M1.5 4L3 5.5L6.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                          </svg>
                        )}
                      </span>
                      <span className={`text-sm leading-snug ${selected ? 'font-semibold text-gray-800' : 'text-gray-600'}`}>
                        {isEs ? opt.labelEs : opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrev}
            className="text-sm font-medium text-gray-500 hover:text-navy-700 transition-colors"
          >
            ← {isEs ? 'Atrás' : 'Back'}
          </button>
          <button
            onClick={handleNext}
            disabled={!currentComplete}
            className="bg-navy-700 text-white font-bold text-sm px-6 py-2.5 rounded-lg hover:bg-navy-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {categoryIdx < CATEGORY_ORDER.length - 1
              ? (isEs ? 'Siguiente sección →' : 'Next section →')
              : (isEs ? 'Ver resultados →' : 'See results →')}
          </button>
        </div>
        {!currentComplete && (
          <p className="text-xs text-center text-gray-400 mt-3">
            {isEs
              ? `Responde las ${currentQuestions.length - currentAnswered} preguntas restantes para continuar.`
              : `Answer the ${currentQuestions.length - currentAnswered} remaining question${currentQuestions.length - currentAnswered !== 1 ? 's' : ''} to continue.`}
          </p>
        )}
      </div>
    );
  }

  // ── CONTACT ────────────────────────────────────────────────────────────────
  if (phase === 'contact') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="bg-navy-700 px-8 py-6">
            <h2 className="text-lg font-bold text-white mb-1">
              {isEs ? '¡Evaluación completa!' : 'Assessment complete!'}
            </h2>
            <p className="text-navy-300 text-sm">
              {isEs
                ? 'Deje sus datos para que un consultor MINERBA pueda personalizar las recomendaciones y hacer seguimiento.'
                : 'Leave your details so a MINERBA consultant can personalise your recommendations and follow up.'}
            </p>
          </div>
          <div className="px-8 py-7">
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
                    {isEs ? 'Nombre' : 'Name'} *
                  </label>
                  <input
                    required
                    type="text"
                    value={contact.name}
                    onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
                    placeholder={isEs ? 'Su nombre' : 'Your name'}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
                    {isEs ? 'Empresa' : 'Company'} *
                  </label>
                  <input
                    required
                    type="text"
                    value={contact.company}
                    onChange={(e) => setContact((c) => ({ ...c, company: e.target.value }))}
                    placeholder={isEs ? 'Nombre de la empresa' : 'Company name'}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
                    {isEs ? 'Cargo' : 'Role'} *
                  </label>
                  <input
                    required
                    type="text"
                    value={contact.role}
                    onChange={(e) => setContact((c) => ({ ...c, role: e.target.value }))}
                    placeholder={isEs ? 'Su cargo' : 'Your title'}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
                    {isEs ? 'País' : 'Country'} *
                  </label>
                  <input
                    required
                    type="text"
                    value={contact.country}
                    onChange={(e) => setContact((c) => ({ ...c, country: e.target.value }))}
                    placeholder={isEs ? 'País de operación' : 'Operating country'}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
                  {isEs ? 'Correo electrónico' : 'Email'} *
                </label>
                <input
                  required
                  type="email"
                  value={contact.email}
                  onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                  placeholder={isEs ? 'correo@empresa.com' : 'you@company.com'}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-navy-700 text-white font-bold py-3 rounded-xl hover:bg-navy-800 transition-colors text-sm mt-2"
              >
                {isEs ? 'Ver mi informe de preparación →' : 'View my readiness report →'}
              </button>
            </form>
            <button
              onClick={handleSkipContact}
              className="w-full text-xs text-gray-400 hover:text-gray-600 mt-3 py-2 transition-colors"
            >
              {isEs ? 'Omitir y ver resultados sin dejar datos' : 'Skip and view results without sharing details'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── RESULTS ────────────────────────────────────────────────────────────────
  if (phase === 'results' && results) {
    const band = SCORE_BANDS[results.band];
    const scoreColor =
      results.band === 'critical' ? '#ef4444' :
      results.band === 'at-risk' ? '#f97316' :
      results.band === 'developing' ? '#f59e0b' :
      results.band === 'prepared' ? '#3b82f6' : '#16a34a';

    // ── Smart learning path recommendations ────────────────────────────────
    // Map each assessment category to the learning paths that address it best.
    // Primary path = best match; fallback ensures variety.
    const CATEGORY_PATH_MAP: Record<AssessmentCategory, [string, string]> = {
      latam:      ['latam-energy-fundamentals',        'indigenous-rights-social-license'],
      strategic:  ['anti-corruption-governance',       'mining-failure-to-success'],
      operational:['latam-energy-fundamentals',        'mining-failure-to-success'],
      training:   ['pharmaceutical-crisis-masterclass','mining-failure-to-success'],
    };

    // Sort categories weakest → strongest, then walk them to build
    // a deduplicated list of up to 2 recommended path IDs.
    const sortedByWeakness = [...CATEGORY_ORDER].sort(
      (a, b) =>
        results.categoryPcts[a as AssessmentCategory] -
        results.categoryPcts[b as AssessmentCategory]
    );
    const recommendedPathIds: string[] = [];
    for (const cat of sortedByWeakness) {
      for (const pid of CATEGORY_PATH_MAP[cat as AssessmentCategory]) {
        if (!recommendedPathIds.includes(pid)) recommendedPathIds.push(pid);
        if (recommendedPathIds.length >= 2) break;
      }
      if (recommendedPathIds.length >= 2) break;
    }
    const recommendedPaths: LearningPath[] = recommendedPathIds
      .map((id) => LEARNING_PATHS.find((p) => p.id === id))
      .filter((p): p is LearningPath => Boolean(p));

    return (
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Score hero */}
        <div className={`bg-white border-2 ${band.borderColor} rounded-2xl overflow-hidden shadow-sm`}>
          <div className={`${band.bgColor} px-8 py-6`}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              {/* Score circle */}
              <div className="flex-shrink-0">
                <div
                  className="w-28 h-28 rounded-full border-8 flex flex-col items-center justify-center"
                  style={{ borderColor: scoreColor }}
                >
                  <span className="text-3xl font-black leading-none" style={{ color: scoreColor }}>
                    {results.totalScore}
                  </span>
                  <span className="text-xs font-bold text-gray-400 mt-0.5">/100</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-2xl font-black ${band.color}`}>
                    {isEs ? band.labelEs : band.label}
                  </span>
                </div>
                <p className={`text-sm leading-relaxed max-w-lg ${band.color} opacity-90`}>
                  {isEs ? band.descriptionEs : band.description}
                </p>
                {contact.name && (
                  <p className="text-xs text-gray-500 mt-2">
                    {isEs
                      ? `Evaluación de ${contact.name} · ${contact.company}`
                      : `Assessment for ${contact.name} · ${contact.company}`}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Category bars */}
          <div className="px-8 py-6 border-t border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
              {isEs ? 'Puntuación por Dimensión' : 'Score by Dimension'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CATEGORY_ORDER.map((cat) => {
                const m = CATEGORY_META[cat];
                const pct = results.categoryPcts[cat];
                return (
                  <div key={cat}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">{m.icon}</span>
                        <span className="text-xs font-semibold text-gray-700">
                          {isEs ? m.labelEs : m.label}
                        </span>
                      </div>
                      <span className={`text-sm font-black ${pct < 50 ? 'text-red-600' : pct < 70 ? 'text-amber-600' : 'text-green-700'}`}>
                        {pct}%
                      </span>
                    </div>
                    <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${m.barColor}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Top gaps */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">
            {isEs ? '🔍 Sus 3 Principales Vulnerabilidades' : '🔍 Your 3 Priority Vulnerabilities'}
          </h3>
          <div className="space-y-3">
            {results.topGaps.map((q, i) => {
              const answer = answers[q.id] ?? 0;
              const selectedOption = q.options.find((o) => o.value === answer);
              const urgencyColor = answer === 0 ? 'border-l-red-500 bg-red-50' : answer === 1 ? 'border-l-orange-400 bg-orange-50' : 'border-l-amber-400 bg-amber-50';
              const urgencyLabel = answer === 0
                ? (isEs ? 'Brecha crítica' : 'Critical gap')
                : answer === 1
                ? (isEs ? 'Brecha significativa' : 'Significant gap')
                : (isEs ? 'Necesita mejora' : 'Needs improvement');
              const urgencyTextColor = answer === 0 ? 'text-red-700' : answer === 1 ? 'text-orange-700' : 'text-amber-700';

              return (
                <div key={q.id} className={`rounded-lg border-l-4 p-4 ${urgencyColor}`}>
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{CATEGORY_META[q.category].icon}</span>
                      <span className="text-xs font-bold text-gray-500">
                        #{i + 1} · {isEs ? CATEGORY_META[q.category].labelEs : CATEGORY_META[q.category].label}
                      </span>
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-wide ${urgencyTextColor}`}>
                      {urgencyLabel}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-gray-800 mb-1.5">
                    {isEs ? q.questionEs : q.question}
                  </p>
                  <p className="text-xs text-gray-600 italic">
                    {isEs ? 'Su respuesta: ' : 'Your response: '}
                    {isEs ? selectedOption?.labelEs : selectedOption?.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommended Learning Paths */}
        {recommendedPaths.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">
              {isEs ? '🎓 Rutas de Aprendizaje Recomendadas' : '🎓 Recommended Learning Paths'}
            </h3>
            <p className="text-xs text-gray-400 mb-5">
              {isEs
                ? 'Basado en sus brechas, estas rutas de casos prácticos reforzarán las dimensiones donde su organización es más vulnerable.'
                : 'Based on your gaps, these curated case tracks will strengthen the dimensions where your organisation is most exposed.'}
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {recommendedPaths.map((path) => (
                <Link
                  key={path.id}
                  href={`/${locale}/learning/${path.id}`}
                  className="group flex flex-col gap-3 p-4 rounded-xl border border-gray-200 hover:border-navy-300 hover:bg-navy-50/40 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0 leading-none mt-0.5">{path.icon}</span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1 mb-1.5">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${DIFFICULTY_COLORS[path.difficulty]}`}>
                          {isEs ? path.difficultyEs : path.difficulty}
                        </span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${LATAM_RELEVANCE_COLORS[path.latamRelevance]}`}>
                          🌎 {isEs ? path.latamRelevanceEs : path.latamRelevance}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-navy-700 group-hover:text-navy-900 leading-snug">
                        {isEs ? path.titleEs : path.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{isEs ? path.taglineEs : path.tagline}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                    {isEs ? path.objectiveEs : path.objective}
                  </p>
                  <span className="text-xs font-semibold text-navy-500 group-hover:text-navy-800 transition-colors mt-auto">
                    {isEs ? 'Comenzar ruta →' : 'Start path →'}
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <Link
                href={`/${locale}/learning`}
                className="text-xs font-semibold text-navy-500 hover:text-navy-700 transition-colors"
              >
                {isEs ? '→ Ver las 5 rutas de aprendizaje' : '→ Browse all 5 learning paths'}
              </Link>
              <span className="text-xs text-gray-400">
                {isEs
                  ? `Dimensión más débil: ${CATEGORY_META[sortedByWeakness[0] as AssessmentCategory].labelEs}`
                  : `Weakest dimension: ${CATEGORY_META[sortedByWeakness[0] as AssessmentCategory].label}`}
              </span>
            </div>
          </div>
        )}

        {/* Recommendations */}
        {results.recommendations.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">
              {isEs ? 'Servicios MINERBA Recomendados' : 'Recommended MINERBA Services'}
            </h3>
            <p className="text-xs text-gray-400 mb-5">
              {isEs
                ? 'Basado en sus respuestas, las siguientes intervenciones abordarían sus brechas más urgentes.'
                : 'Based on your responses, the following interventions would address your most urgent gaps.'}
            </p>
            <div className="space-y-4">
              {results.recommendations.map((rec, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50">
                  <div className="w-8 h-8 rounded-full bg-navy-700 text-white flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-navy-700 mb-1">
                      {isEs ? rec.titleEs : rec.title}
                    </p>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {isEs ? rec.serviceEs : rec.service}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-navy-700 rounded-2xl p-7 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div>
              <h3 className="text-lg font-bold mb-1">
                {isEs ? 'Solicite una consulta con MINERBA' : 'Book a consultation with MINERBA'}
              </h3>
              <p className="text-navy-300 text-sm leading-relaxed max-w-md">
                {isEs
                  ? 'Nuestros consultores revisarán su evaluación y propondrán un programa de mejora específico para su organización y sector.'
                  : 'Our consultants will review your assessment and propose a targeted improvement programme for your organisation and sector.'}
              </p>
            </div>
            <div className="flex flex-col gap-2 shrink-0">
              <a
                href="mailto:info@minerba.com?subject=Crisis Readiness Assessment"
                className="inline-flex items-center justify-center gap-2 bg-white text-navy-700 font-bold text-sm px-6 py-3 rounded-lg hover:bg-navy-50 transition-colors"
              >
                {isEs ? '✉ Contactar a MINERBA' : '✉ Contact MINERBA'}
              </a>
              <button
                onClick={() => { setPhase('intro'); setAnswers({}); setCategoryIdx(0); setContact({ name: '', company: '', role: '', email: '', country: '' }); setSubmitted(false); }}
                className="text-xs text-navy-400 hover:text-white transition-colors text-center py-1"
              >
                {isEs ? '↺ Repetir evaluación' : '↺ Retake assessment'}
              </button>
            </div>
          </div>
        </div>

        {/* Explore platform */}
        <div className="flex flex-wrap gap-3 pb-4">
          <Link
            href={`/${locale}/cases`}
            className="text-sm font-semibold border border-gray-200 text-gray-600 px-4 py-2 rounded-lg hover:bg-white transition-colors"
          >
            {isEs ? '→ Explorar casos de estudio' : '→ Explore case studies'}
          </Link>
          <Link
            href={`/${locale}/learning`}
            className="text-sm font-semibold border border-gray-200 text-gray-600 px-4 py-2 rounded-lg hover:bg-white transition-colors"
          >
            {isEs ? '→ Rutas de aprendizaje' : '→ Learning paths'}
          </Link>
          <Link
            href={`/${locale}/glossary`}
            className="text-sm font-semibold border border-gray-200 text-gray-600 px-4 py-2 rounded-lg hover:bg-white transition-colors"
          >
            {isEs ? '→ Glosario de conceptos' : '→ Glossary of concepts'}
          </Link>
          <Link
            href={`/${locale}/frameworks`}
            className="text-sm font-semibold border border-gray-200 text-gray-600 px-4 py-2 rounded-lg hover:bg-white transition-colors"
          >
            {isEs ? '→ Marcos de referencia' : '→ Frameworks library'}
          </Link>
        </div>
      </div>
    );
  }

  return null;
}
