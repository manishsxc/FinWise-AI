'use client';
import { useState, useRef, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Send, Loader2, Bot, User, RefreshCw } from 'lucide-react';

type Message = { role: 'user' | 'assistant'; content: string; timestamp: Date; };

const QUICK_QUESTIONS = [
  { label: 'SIP advice for ₹80K income', q: 'Mera SIP kitna hona chahiye? Monthly income ₹80,000 hai.' },
  { label: 'Old vs new tax regime?', q: 'Old vs new tax regime comparison karo mere liye. Salary ₹12L hai.' },
  { label: 'FIRE at 45 — possible?', q: 'Main 45 saal mein retire karna chahta hoon. Abhi 28 saal ka hoon. Kya possible hai?' },
  { label: 'Emergency fund advice', q: 'Emergency fund kitna hona chahiye aur kahan rakhun?' },
  { label: 'Term vs whole life insurance', q: 'Term insurance vs whole life — kya lena chahiye?' },
  { label: 'Home loan — should I take?', q: 'Mumbai mein ₹80L ka flat lena chahta hoon. Home loan lena sahi hoga?' },
  { label: 'MF overlap fix', q: 'Mere paas 8 mutual funds hain. Overlap kaafi hai. Kya karna chahiye?' },
  { label: 'Bonus investment advice', q: 'Mujhe ₹2L ka bonus mila. Best use kya hoga?' },
];

const NUDGES = [
  { color: 'border-amber-500 bg-amber-900/10', text: '⏰ SIP of ₹5,000 due in 3 days — Parag Parikh Flexi Cap' },
  { color: 'border-emerald-500 bg-emerald-900/10', text: '✅ PPF: ₹50K headroom left — invest before March 31' },
  { color: 'border-red-500 bg-red-900/10', text: '📉 Nifty down 2.1% — don\'t panic sell, stay course' },
];

export default function AdvisorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Namaste! Main hoon aapka **AI Money Mentor** 🙏\n\nMain in cheezein mein help kar sakta hoon:\n• SIP, mutual funds, stocks advice\n• Tax planning (old vs new regime)\n• FIRE planning & retirement goals\n• Insurance, emergency fund guidance\n• Koi bhi financial doubt\n\nHindi mein baat karo ya English — dono chalega! Kya poochna chahte ho?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const userText = text || input.trim();
    if (!userText || loading) return;
    setInput('');

    const userMsg: Message = { role: 'user', content: userText, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setMessages(prev => [...prev, { role: 'assistant', content: data.message, timestamp: new Date() }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, ek second rukho — dobara try karo!', timestamp: new Date() }]);
    } finally {
      setLoading(false);
    }
  };

  const formatContent = (text: string) => {
    return text.split('**').map((part, i) =>
      i % 2 === 1 ? <strong key={i} className="text-white font-semibold">{part}</strong> : part
    );
  };

  return (
    <DashboardLayout>
      <div className="flex gap-5 h-[calc(100vh-8rem)]">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0 flex flex-col gap-4">
          {/* Bot profile */}
          <div className="card p-5 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl mx-auto mb-3">🤖</div>
            <div className="font-bold text-white text-sm">MoneyBot</div>
            <div className="text-xs text-slate-400 mt-1">Your 24×7 CA friend</div>
            <div className="flex items-center justify-center gap-1.5 mt-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-emerald-400">Online</span>
            </div>
          </div>

          {/* Nudges */}
          <div className="card p-4">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Today's Nudges</div>
            <div className="space-y-2">
              {NUDGES.map((n, i) => (
                <div key={i} className={`p-2.5 rounded-lg border-l-2 text-xs text-slate-300 leading-relaxed ${n.color}`}>{n.text}</div>
              ))}
            </div>
          </div>

          {/* Quick questions */}
          <div className="card p-4 flex-1 overflow-y-auto">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Quick Questions</div>
            <div className="space-y-1.5">
              {QUICK_QUESTIONS.map((qq) => (
                <button
                  key={qq.label}
                  onClick={() => sendMessage(qq.q)}
                  className="w-full text-left text-xs p-2.5 rounded-lg bg-slate-900 border border-white/5 text-slate-400 hover:text-white hover:border-white/10 transition-colors leading-relaxed"
                >
                  {qq.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col card overflow-hidden">
          {/* Header */}
          <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <div>
                <div className="text-sm font-semibold text-white">AI Money Mentor</div>
                <div className="text-xs text-slate-400">Powered by Claude AI · Hindi & English</div>
              </div>
            </div>
            <button
              onClick={() => setMessages([messages[0]])}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              title="New conversation"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm mt-0.5 ${
                  msg.role === 'assistant' ? 'bg-gradient-to-br from-blue-500 to-cyan-500' : 'bg-slate-800 border border-white/10'
                }`}>
                  {msg.role === 'assistant' ? <Bot className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-slate-300" />}
                </div>
                <div className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'}>
                  <div className="whitespace-pre-line text-sm leading-relaxed">
                    {formatContent(msg.content)}
                  </div>
                  <div className="text-[10px] opacity-50 mt-1.5">
                    {msg.timestamp.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="chat-bubble-bot">
                  <div className="flex gap-1.5 py-1">
                    <div className="w-2 h-2 rounded-full bg-slate-500 typing-dot" />
                    <div className="w-2 h-2 rounded-full bg-slate-500 typing-dot" />
                    <div className="w-2 h-2 rounded-full bg-slate-500 typing-dot" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-5 py-4 border-t border-white/10">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                placeholder="Kuch bhi poochho... e.g. mera emergency fund kitna hona chahiye?"
                className="input flex-1 text-sm"
                disabled={loading}
                aria-label="Message input"
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className="btn-primary px-4 py-2"
                aria-label="Send message"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-slate-600 mt-2 text-center">
              FinWise AI provides educational information only. Not investment advice. ·{' '}
              <span className="text-slate-500">SEBI Disclaimer</span>
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
