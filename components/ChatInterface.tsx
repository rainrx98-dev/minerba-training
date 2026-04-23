'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
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

  // Persona avatar label — shown next to AI messages
  const personaLabel = persona
    ? (isEs ? persona.nameEs : persona.name)
    : t('facilitator');
  const personaIcon = persona ? persona.icon : 'M';
  const personaBgClass = persona ? persona.bgClass : 'bg-navy-500';
  const personaTextClass = persona ? persona.textClass : 'text-navy-500';

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Persona banner (only shown when a persona is active) */}
      {persona && (
        <div className={`shrink-0 flex items-center justify-between px-4 py-2 border-b ${persona.bgClass} ${persona.colorClass} border-b-2`}>
          <div className="flex items-center gap-2">
            <span className="text-base">{persona.icon}</span>
            <div>
              <span className={`text-xs font-bold uppercase tracking-wide ${persona.textClass}`}>
                {isEs ? persona.nameEs : persona.name}
              </span>
              <span className="text-xs text-gray-500 ml-2">
                {isEs ? persona.roleEs : persona.role}
              </span>
            </div>
          </div>
          {onReset && !isDebriefMode && (
            <button
              onClick={onReset}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors border border-gray-200 rounded px-2 py-0.5 bg-white"
            >
              {isEs ? '← Cambiar perspectiva' : '← Change persona'}
            </button>
          )}
        </div>
      )}

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex message-enter ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'assistant' && (
              <div className="max-w-2xl w-full">
                <div className="flex items-center gap-2 mb-1.5">
                  {/* Avatar */}
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm ${persona ? 'bg-white border-2 ' + persona.colorClass : 'bg-navy-500'}`}>
                    {persona
                      ? <span>{persona.icon}</span>
                      : <span className="text-white text-xs font-bold">M</span>
                    }
                  </div>
                  <span className={`text-xs font-semibold uppercase tracking-wide ${persona ? persona.textClass : 'text-navy-600'}`}>
                    {personaLabel}
                  </span>
                  {index === messages.length - 1 && isLoading && (
                    <span className="text-xs text-gray-400 italic">
                      {isEs ? 'respondiendo...' : 'responding...'}
                    </span>
                  )}
                </div>
                <div className={`border rounded-lg rounded-tl-none p-4 ${persona ? persona.bgClass + ' ' + persona.colorClass.replace('border-', 'border-l-4 border-') : 'bg-gray-50 border-gray-200'}`}>
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

            {message.role === 'user' && message.content !== '[DEBRIEF REQUEST]' && (
              <div className="max-w-2xl w-full">
                <div className="flex items-center justify-end gap-2 mb-1.5">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {t('you')} · {t('roundLabel')} {Math.ceil(index / 2)}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">C</span>
                  </div>
                </div>
                <div className="bg-navy-500 text-white rounded-lg rounded-tr-none p-4 text-sm leading-relaxed">
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            )}
          </div>
        ))}

        {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
          <div className="flex justify-start">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 bg-navy-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-navy-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-navy-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      {!isDebriefMode && (
        <div className="border-t border-gray-200 p-4 bg-white shrink-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400">
              {t('roundLabel')} {round}
              {persona && (
                <span className={`ml-2 font-medium ${persona.textClass}`}>
                  · {isEs ? `Hablando con ${persona.nameEs}` : `Speaking with ${persona.name}`}
                </span>
              )}
            </span>
            <button
              onClick={handleDebrief}
              disabled={isLoading || messages.length < 3}
              className="text-xs text-gold hover:text-gold-dark font-medium disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {t('endDebrief')} →
            </button>
          </div>
          <div className="flex gap-2">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={
                persona
                  ? (isEs
                    ? `Responde a ${persona.nameEs}...`
                    : `Respond to ${persona.name}...`)
                  : t('inputPlaceholder')
              }
              disabled={isLoading}
              rows={2}
              style={{ minHeight: '64px', maxHeight: '160px' }}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2.5 text-sm resize-none overflow-y-auto focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-navy-500 disabled:opacity-50 disabled:bg-gray-50"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={isLoading || !input.trim()}
              className="bg-navy-500 text-white px-4 rounded-lg hover:bg-navy-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-semibold text-sm self-end py-2.5"
            >
              {t('sendButton')}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">{t('debriefNote')}</p>
        </div>
      )}

      {isDebriefMode && !isLoading && (
        <div className="border-t border-gray-200 p-4 bg-gray-50 shrink-0">
          <p className="text-sm text-gray-500 mb-3 text-center">
            {isEs ? 'Sesión completada.' : 'Session complete.'}
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {onReset && (
              <button
                onClick={onReset}
                className="text-sm font-semibold border border-navy-500 text-navy-500 px-4 py-2 rounded-lg hover:bg-navy-50 transition-colors"
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
              className="text-sm font-semibold bg-navy-500 text-white px-4 py-2 rounded-lg hover:bg-navy-600 transition-colors"
            >
              {t('newSession')}
            </button>
            <Link
              href={`/${locale}/cases`}
              className="text-sm font-semibold border border-gray-300 text-gray-600 px-4 py-2 rounded-lg hover:bg-white transition-colors"
            >
              {isEs ? 'Más casos →' : 'More cases →'}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
