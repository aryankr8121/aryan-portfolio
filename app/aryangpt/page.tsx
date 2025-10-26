'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

type Message = {
  id: string;
  from: 'user' | 'bot';
  text: string;
  meta?: string;
};

export default function AryanGPTPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      from: 'bot',
      text: "Yo! I'm AryanGPT — your chaotic-genius AI clone. Toggle Meme Mode for extra spice.",
    },
  ]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'pro' | 'meme'>('meme');
  const [isThinking, setIsThinking] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  // ✅ Suggestion list
  const suggestions = [
    'Who is Aryan?',
    'Show my skills',
    'Show my projects',
    'Tell me about my experience',
    'What do I specialize in?',
  ];

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isThinking]);

  function pushMessage(msg: Message) {
    setMessages((m) => [...m, msg]);
  }

  // ✅ Updated Gemini bot response with "thinking" animation
  async function fakeBotResponse(userText: string) {
    setIsThinking(true);
    const id = `b_${Date.now()}`;
    pushMessage({ id, from: 'bot', text: '...', meta: 'typing' });

    try {
      const res = await fetch('/api/aryan-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userText }),
      });

      const data = await res.json();

      // Animate message once AI responds
      setMessages((ms) =>
        ms.map((m) =>
          m.id === id ? { ...m, text: data.reply || '...', meta: undefined } : m
        )
      );
    } catch (err) {
      setMessages((ms) =>
        ms.map((m) =>
          m.id === id
            ? {
                ...m,
                text: '⚠️ Gemini AI not responding. Try again later.',
                meta: undefined,
              }
            : m
        )
      );
    } finally {
      setIsThinking(false);
    }
  }

  function handleSend(e?: React.FormEvent) {
    e?.preventDefault();
    if (!input.trim()) return;
    const userMsg: Message = { id: `u_${Date.now()}`, from: 'user', text: input };
    pushMessage(userMsg);
    setInput('');
    setTimeout(() => fakeBotResponse(userMsg.text), 250);
  }

  // ✅ Suggestion bubble click handler
  function handleSuggestionClick(text: string) {
    pushMessage({ id: `u_${Date.now()}`, from: 'user', text });
    fakeBotResponse(text);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-slate-50 p-6 flex flex-col">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-500 via-pink-500 to-yellow-400 flex items-center justify-center text-slate-900 font-bold text-xl">
            A
          </div>
          <div>
            <h1 className="text-2xl font-semibold">AryanGPT</h1>
            <p className="text-sm text-slate-300">Chat-style portfolio • Toggle Meme Mode</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs text-slate-300 mr-2">Mode</div>
          <div className="flex items-center rounded-full bg-slate-700/40 p-1">
            <button
              onClick={() => setMode('pro')}
              className={`px-3 py-1 rounded-full text-sm ${
                mode === 'pro' ? 'bg-slate-100/10' : 'hover:bg-slate-700/60'
              }`}
            >
              Pro
            </button>
            <button
              onClick={() => setMode('meme')}
              className={`px-3 py-1 rounded-full text-sm ${
                mode === 'meme'
                  ? 'bg-amber-400 text-slate-900'
                  : 'hover:bg-slate-700/60'
              }`}
            >
              Meme
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 bg-slate-800/30 rounded-2xl p-4 flex flex-col">
        <div
          ref={listRef}
          className="flex-1 overflow-y-auto p-2 space-y-4 scrollbar-thin scrollbar-thumb-slate-700/60"
        >
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18 }}
                className={`max-w-[70%] p-3 rounded-2xl ${
                  m.from === 'user'
                    ? 'bg-amber-400 text-slate-900 rounded-br-sm'
                    : 'bg-slate-700/40 text-slate-100 rounded-bl-sm'
                }`}
              >
                <pre
                  className="whitespace-pre-wrap break-words text-sm leading-6"
                  dangerouslySetInnerHTML={{
                    __html:
                      m.meta === 'typing'
                        ? '<span class="animate-pulse text-slate-400">AryanGPT is thinking...</span>'
                        : m.text
                            // ✅ highlight **bold** as amber-colored text
                            .replace(/\*\*(.*?)\*\*/g, '<span class="text-amber-400 font-large">$1</span>')
                            
                            .replace(/^\*+\s+/gm, '• ')
                            
                            // ✅ line breaks into <br/>
                            .replace(/\n/g, '<br/>'),
                  }}
                />

              </motion.div>
            </div>
          ))}
        </div>

        {/* ✅ Suggestion bubbles */}
        <div className="flex flex-wrap gap-2 mt-3 mb-2">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => handleSuggestionClick(s)}
              className="bg-slate-700 hover:bg-slate-600 text-slate-100 px-3 py-1 rounded-full text-sm transition"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input form */}
        <form onSubmit={handleSend} className="mt-2 flex items-center gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message AryanGPT... ('Hey there what's up?')"
            className="flex-1 bg-transparent border border-slate-600 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-slate-450"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-full bg-amber-400 text-slate-900 font-medium"
          >
            Send
          </button>
        </form>
      </main>
    </div>
  );
}
