'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import clsx from 'clsx';
import type { Persona } from '@/lib/personas';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatInterfaceProps {
  caseId: string;
  opener: string;       // first AI message (scenario opener OR persona opener)
  locale: string;
  persona?: Persona;    // if set, AI plays this character
  onReset?: () => void; // called when user clicks "Change Persona"
}

export default function ChatInterface({
  caseId,
  opener,
  locale,
  persona,
  onReset,
}: ChatInterfaceProps) {
  const t = useTranslations('quiz');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: opener },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDebriefMode, setIsDebriefMode] = useState(false);
  const [round, setRound] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isEs = locale === 'es';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-resize textarea on input
  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);
    const ta = e.target;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 160) + 'px';
  }

  async function sendMessage(content: string, isDebrief = false) {
    if (!content.trim() && !isDebrief) return;

    const userMsg: Message = {
      role: 'user',
      content: isDebrief ? '[DEBRIEF REQUEST]' : content,
    };

    const updatedMessages = isDebrief ? messages : [...messages, userMsg];

    if (!isDebrief) {
      setMessages(updatedMessages);
      setInput('');
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
      setRound((r) => r + 1);
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          caseId,
          isDebrief,
          locale,
          personaId: persona?.id,
        }),
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let aiContent = '';

      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        aiContent += chunk;
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'assistant', content: aiContent };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: isEs
            ? '⚠️ Error al conectar con el servidor. Verifique su clave API e intente nuevamente.'
            : '⚠️ Error connecting to the server. Check your API key and try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleDebrief() {
    setIsDebriefMode(true);
    sendMessage('', true);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  // Persona label — shown next to AI message bubbles
  const personaLabel = persona
    ? (isEs ? persona.nameEs : persona.name)
    : t('facilitator');

  return (
    <div className="flex flex-col h-full bg-white">

      {/* ── Persona banner ────────────────────────────────────────────────── */}
      {persona && (
        <div className={clsx('shrink-0 border-b-2', persona.colorClass)}>
          <div className={clsx('px-5 py-4', persona.bgClass)}>
            <div className="flex items-center justify-between gap-4">
              {/* Avatar + identity */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 rounded-full flex items-center justify-center text-xl bg-white/25 border border-white/20 shadow-inner flex-shrink-0">
                  {persona.icon}
                </div>
                <div className="min-w-0">
                  <p className={clsx('text-sm font-bold leading-tight truncate', persona.textClass)}>
                    {isEs ? persona.nameEs : persona.name}
                  </p>
                  <p className={clsx('text-xs mt-0.5 opacity-60 truncate', persona.textClass)}>
                    {isEs ? persona.roleEs : persona.role}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 opacity-75">
                      {isEs ? 'Simulación activa' : 'Live simulation'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Change persona button */}
              {onReset && !isDebriefMode && (
                <button
                  onClick={onReset}
                  className="shrink-0 text-xs font-semibold border border-gray-200 rounded-lg px-3 py-1.5 bg-white/80 hover:bg-white text-gray-600 hover:text-gray-800 transition-colors"
                >
                  {isEs ? '← Cambiar' : '← Change'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Messages area ─────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="max-w-2xl mx-auto px-5 py-6 space-y-5">
        {messages.map((message, index) => (
          <div
            key={index}
            className={clsx(
              'flex',
              message.role === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            {/* AI / assistant message */}
            {message.role === 'assistant' && (
              <div className="w-full">
                {/* Name + avatar row */}
                <div className="flex items-center gap-2 mb-2">
                  <div className={clsx(
                    'w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0 shadow-sm',
                    persona ? 'bg-white/80' : 'bg-navy-600'
                  )}>
                    {persona
                      ? <span>{persona.icon}</span>
                      : <span className="text-white text-xs font-bold">M</span>
                    }
                  </div>
                  <span className={clsx(
                    'text-[10px] font-bold uppercase tracking-widest',
                    persona ? persona.textClass : 'text-navy-500'
                  )}>
                    {personaLabel}
                  </span>
                  {index === messages.length - 1 && isLoading && (
                    <span className="text-[10px] text-gray-400 italic animate-pulse">
                      {isEs ? 'respondiendo…' : 'responding…'}
                    </span>
                  )}
                </div>
                {/* Bubble */}
                <div className={clsx(
                  'rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm',
                  persona
                    ? persona.bgClass + ' ' + persona.colorClass.replace('border-', 'border-l-4 border-')
                    : 'bg-gray-50 border border-gray-200'
                )}>
                  {message.content ? (
                    <div className="case-content text-sm">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <div className="flex gap-1.5 py-1">
                      <span className="w-2 h-2 bg-navy-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-navy-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-navy-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* User message */}
            {message.role === 'user' && message.content !== '[DEBRIEF REQUEST]' && (
              <div className="max-w-[72%]">
                {/* Name + avatar row */}
                <div className="flex items-center justify-end gap-2 mb-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {t('you')} · R{Math.ceil(index / 2)}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-navy-700 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <span className="text-white text-xs font-bold">C</span>
                  </div>
                </div>
                {/* Bubble */}
                <div className="bg-navy-700 text-white rounded-2xl rounded-tr-sm px-5 py-4 shadow-sm text-sm leading-relaxed">
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Standalone loading dots (for first response) */}
        {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
          <div className="flex justify-start">
            <div className="bg-gray-50 border border-gray-200 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 bg-navy-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-navy-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-navy-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
        </div>{/* end max-w-2xl */}
      </div>

      {/* ── Input area ────────────────────────────────────────────────────── */}
      {!isDebriefMode && (
        <div className="border-t border-gray-100 bg-white shrink-0 shadow-[0_-2px_8px_rgba(0,0,0,0.04)]">
          <div className="max-w-2xl mx-auto px-5 pt-3 pb-4">
          {/* Meta row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-navy-50 text-navy-600 text-[10px] font-bold px-2.5 py-1 rounded-full border border-navy-100">
                <span className="w-1.5 h-1.5 rounded-full bg-navy-400 animate-pulse" />
                {t('roundLabel')} {round}
              </span>
              {persona && (
                <span className={clsx('text-[10px] font-semibold', persona.textClass)}>
                  {'↔ '}{isEs ? persona.nameEs : persona.name}
                </span>
              )}
            </div>
            <button
              onClick={handleDebrief}
              disabled={isLoading || messages.length < 3}
              className="text-xs text-gold hover:text-yellow-600 font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {t('endDebrief')} →
            </button>
          </div>

          {/* Textarea + send */}
          <div className="flex gap-2 items-end">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={
                persona
                  ? (isEs
                    ? `Responde a ${persona.nameEs}…`
                    : `Respond to ${persona.name}…`)
                  : t('inputPlaceholder')
              }
              disabled={isLoading}
              rows={2}
              style={{ minHeight: '64px', maxHeight: '160px' }}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none overflow-y-auto focus:outline-none focus:ring-2 focus:ring-navy-400 focus:border-navy-400 disabled:opacity-50 disabled:bg-gray-100 transition-colors"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={isLoading || !input.trim()}
              className="bg-navy-700 text-white px-5 py-3 rounded-xl hover:bg-navy-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-bold text-sm shadow-sm self-end"
            >
              {t('sendButton')}
            </button>
          </div>
          <p className="text-[10px] text-gray-400 mt-2">{t('debriefNote')}</p>
          </div>{/* end max-w-2xl */}
        </div>
      )}

      {/* ── Debrief complete state ─────────────────────────────────────────── */}
      {isDebriefMode && !isLoading && (
        <div className="border-t border-gray-200 bg-gray-50 shrink-0">
        <div className="max-w-2xl mx-auto p-5">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-green-500 text-lg">✓</span>
            <p className="text-sm font-semibold text-gray-700">
              {isEs ? 'Sesión completada.' : 'Session complete.'}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {onReset && (
              <button
                onClick={onReset}
                className="text-sm font-bold border border-navy-300 text-navy-600 px-4 py-2.5 rounded-xl hover:bg-navy-50 transition-colors"
              >
                {isEs ? '← Nueva perspectiva' : '← New persona'}
              </button>
            )}
            <button
              onClick={() => {
                setMessages([{ role: 'assistant', content: opener }]);
                setInput('');
                setRound(1);
                setIsDebriefMode(false);
              }}
              className="text-sm font-bold bg-navy-700 text-white px-4 py-2.5 rounded-xl hover:bg-navy-600 transition-colors"
            >
              {t('newSession')}
            </button>
            <Link
              href={`/${locale}/cases`}
              className="text-sm font-bold border border-gray-200 text-gray-600 px-4 py-2.5 rounded-xl hover:bg-white transition-colors"
            >
              {isEs ? 'Más casos →' : 'More cases →'}
            </Link>
          </div>
        </div>{/* end max-w-2xl */}
        </div>
      )}
    </div>
  );
}
