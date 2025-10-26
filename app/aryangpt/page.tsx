'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Menu, X, Zap, Copy, Download, RotateCcw } from 'lucide-react';

type Message = {
  id: string;
  from: 'user' | 'bot';
  text: string;
  meta?: string;
  timestamp?: Date;
};

export default function AryanGPTPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      from: 'bot',
      text: "Yo! I'm AryanGPT — your chaotic-genius AI clone. Toggle Meme Mode for extra spice.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'pro' | 'meme'>('meme');
  const [isThinking, setIsThinking] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const listRef = useRef<HTMLDivElement | null>(null);

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

  async function fakeBotResponse(userText: string) {
    setIsThinking(true);
    setShowSuggestions(false);
    const id = `b_${Date.now()}`;
    pushMessage({ id, from: 'bot', text: '...', meta: 'typing', timestamp: new Date() });

    try {
      const res = await fetch('/api/aryan-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userText }),
      });

      const data = await res.json();

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
    const userMsg: Message = { id: `u_${Date.now()}`, from: 'user', text: input, timestamp: new Date() };
    pushMessage(userMsg);
    setInput('');
    setTimeout(() => fakeBotResponse(userMsg.text), 250);
  }

  function handleSuggestionClick(text: string) {
    pushMessage({ id: `u_${Date.now()}`, from: 'user', text, timestamp: new Date() });
    fakeBotResponse(text);
  }

  function copyMessage(text: string) {
    navigator.clipboard.writeText(text);
  }

  function clearChat() {
    setMessages([
      {
        id: 'm1',
        from: 'bot',
        text: "Yo! I'm AryanGPT — your chaotic-genius AI clone. Toggle Meme Mode for extra spice.",
        timestamp: new Date(),
      },
    ]);
    setShowSuggestions(true);
  }

  function exportChat() {
    const chatText = messages
      .map((m) => `${m.from === 'user' ? 'You' : 'AryanGPT'}: ${m.text}`)
      .join('\n\n');
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aryangpt-chat-${Date.now()}.txt`;
    a.click();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-slate-50 flex flex-col">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-indigo-500 via-pink-500 to-yellow-400 flex items-center justify-center text-slate-900 font-bold text-lg">
              A
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-semibold">AryanGPT</h1>
              <p className="text-xs text-slate-400 hidden sm:block">Chat-style portfolio</p>
            </div>
          </div>

          {/* Desktop Mode Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <div className="text-xs text-slate-300">Mode</div>
            <div className="flex items-center rounded-full bg-slate-700/40 p-1">
              <button
                onClick={() => setMode('pro')}
                className={`px-3 py-1 rounded-full text-sm transition ${
                  mode === 'pro' ? 'bg-slate-100/10' : 'hover:bg-slate-700/60'
                }`}
              >
                Pro
              </button>
              <button
                onClick={() => setMode('meme')}
                className={`px-3 py-1 rounded-full text-sm transition ${
                  mode === 'meme'
                    ? 'bg-amber-400 text-slate-900'
                    : 'hover:bg-slate-700/60'
                }`}
              >
                <Zap className="w-3 h-3 inline mr-1" />
                Meme
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="md:hidden p-2 hover:bg-slate-700/50 rounded-lg transition"
          >
            {showMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {showMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 pt-3 border-t border-slate-700/50 md:hidden"
            >
              <div className="flex flex-col gap-3">
                <div>
                  <div className="text-xs text-slate-400 mb-2">Mode</div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setMode('pro');
                        setShowMenu(false);
                      }}
                      className={`flex-1 px-4 py-2 rounded-lg text-sm transition ${
                        mode === 'pro'
                          ? 'bg-slate-700 text-slate-100'
                          : 'bg-slate-800 hover:bg-slate-700'
                      }`}
                    >
                      Pro Mode
                    </button>
                    <button
                      onClick={() => {
                        setMode('meme');
                        setShowMenu(false);
                      }}
                      className={`flex-1 px-4 py-2 rounded-lg text-sm transition ${
                        mode === 'meme'
                          ? 'bg-amber-400 text-slate-900'
                          : 'bg-slate-800 hover:bg-slate-700'
                      }`}
                    >
                      <Zap className="w-3 h-3 inline mr-1" />
                      Meme Mode
                    </button>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      clearChat();
                      setShowMenu(false);
                    }}
                    className="flex-1 px-4 py-2 rounded-lg text-sm bg-slate-800 hover:bg-slate-700 transition flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Clear Chat
                  </button>
                  <button
                    onClick={() => {
                      exportChat();
                      setShowMenu(false);
                    }}
                    className="flex-1 px-4 py-2 rounded-lg text-sm bg-slate-800 hover:bg-slate-700 transition flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Chat Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <div
          ref={listRef}
          className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4"
        >
          {messages.map((m, idx) => (
            <div key={m.id} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18 }}
                className={`max-w-[85%] sm:max-w-[70%] group relative`}
              >
                <div
                  className={`p-3 sm:p-4 rounded-2xl ${
                    m.from === 'user'
                      ? 'bg-amber-400 text-slate-900 rounded-br-sm'
                      : 'bg-slate-700/40 text-slate-100 rounded-bl-sm'
                  }`}
                >
                  <pre
                    className="whitespace-pre-wrap break-words text-sm sm:text-base leading-relaxed font-sans"
                    dangerouslySetInnerHTML={{
                      __html:
                        m.meta === 'typing'
                          ? '<span class="animate-pulse text-slate-400">AryanGPT is thinking...</span>'
                          : m.text
                              .replace(/\*\*(.*?)\*\*/g, '<span class="text-amber-400 font-semibold">$1</span>')
                              .replace(/^\*+\s+/gm, '• ')
                              .replace(/\n/g, '<br/>'),
                    }}
                  />
                </div>
                
                {/* Message Actions */}
                {m.from === 'bot' && m.meta !== 'typing' && (
                  <button
                    onClick={() => copyMessage(m.text)}
                    className="absolute -bottom-2 right-2 opacity-0 group-hover:opacity-100 transition bg-slate-800 hover:bg-slate-700 p-1.5 rounded-full"
                    title="Copy message"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                )}
                
                {/* Timestamp */}
                {m.timestamp && (
                  <div className={`text-xs text-slate-500 mt-1 ${m.from === 'user' ? 'text-right' : 'text-left'}`}>
                    {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                )}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Suggestions */}
        <AnimatePresence>
          {showSuggestions && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="px-4 pb-2"
            >
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleSuggestionClick(s)}
                    className="bg-slate-700/50 hover:bg-slate-600/50 text-slate-200 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm transition border border-slate-600/30"
                  >
                    {s}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Area */}
        <div className="border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm p-3 sm:p-4">
          <form onSubmit={handleSend} className="flex items-end gap-2 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message AryanGPT..."
                className="w-full bg-slate-800/50 border border-slate-600/50 rounded-2xl px-4 py-3 sm:py-3.5 focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-slate-500 text-sm sm:text-base"
                disabled={isThinking}
              />
            </div>
            <button
              type="submit"
              disabled={isThinking || !input.trim()}
              className="px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl bg-amber-400 text-slate-900 font-medium hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}