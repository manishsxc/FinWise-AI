import type { Metadata } from 'next';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

export const metadata: Metadata = { title: 'Dashboard — FinWise AI' };

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome + Score */}
        <div className="card p-7 relative overflow-hidden">
          <div aria-hidden className="absolute right-0 top-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <h1 className="text-2xl font-bold text-white mb-1">Namaste, Rahul! 👋</h1>
          <p className="text-slate-400 text-sm">
            Your money score improved <span className="text-emerald-400 font-semibold">+4 points</span> this week.
            Tax filing deadline in <span className="text-amber-400 font-semibold">47 days</span>.
          </p>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { val: '₹18.4L', label: 'Net Worth', change: '+₹32K', up: true },
              { val: '₹14,000', label: 'Monthly SIP', change: '3 active', up: true },
              { val: '₹2.1L', label: 'Tax Saved (80C)', change: '₹50K more possible', up: false },
              { val: '6.2 mo', label: 'Emergency Fund', change: 'Target met ✓', up: true },
            ].map((s) => (
              <div key={s.label} className="bg-slate-900 rounded-xl p-4 border border-white/5">
                <div className="text-xl font-bold font-mono text-white">{s.val}</div>
                <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
                <div className={`text-xs mt-1 font-medium ${s.up ? 'text-emerald-400' : 'text-amber-400'}`}>{s.change}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Money Health Score */}
        <div className="card p-6">
          <h2 className="font-bold text-white mb-4">Money Health Score</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: 'Emergency Fund', score: 72, color: '#10b981' },
              { label: 'Insurance', score: 48, color: '#f59e0b' },
              { label: 'Investments', score: 65, color: '#3b82f6' },
              { label: 'Tax Efficiency', score: 40, color: '#f97316' },
              { label: 'Debt Health', score: 88, color: '#10b981' },
            ].map((d) => (
              <div key={d.label} className="bg-slate-900 rounded-xl p-4 text-center border border-white/5">
                <div className="text-xs text-slate-400 mb-2">{d.label}</div>
                <div className="text-2xl font-bold font-mono" style={{ color: d.color }}>{d.score}</div>
                <div className="mt-2 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${d.score}%`, background: d.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: '📈', title: 'FIRE Planner', desc: 'Retire at 50 — ₹3.2Cr corpus needed. ₹24.5K SIP required.', href: '/tools#fire', color: 'from-blue-900/40 to-blue-900/10 border-blue-700/30' },
            { icon: '🧾', title: 'Tax Wizard', desc: 'Missing ₹50K in deductions. File before March 31 and save ₹15,500.', href: '/tools#tax', color: 'from-amber-900/40 to-amber-900/10 border-amber-700/30' },
            { icon: '🔬', title: 'MF X-Ray', desc: '7 funds with 43% overlap. ₹28K expense ratio drag. Rebalance now.', href: '/tools#mf', color: 'from-purple-900/40 to-purple-900/10 border-purple-700/30' },
          ].map((c) => (
            <a key={c.title} href={c.href} className={`rounded-2xl p-6 bg-gradient-to-br border hover:scale-[1.02] transition-transform ${c.color}`}>
              <span className="text-3xl block mb-3">{c.icon}</span>
              <h3 className="font-bold text-white mb-2">{c.title}</h3>
              <p className="text-sm text-slate-400">{c.desc}</p>
            </a>
          ))}
        </div>

        {/* Today's nudges */}
        <div className="card p-6">
          <h2 className="font-bold text-white mb-4">Today's Smart Nudges</h2>
          <div className="space-y-3">
            {[
              { type: 'amber', icon: '💰', text: 'SIP of ₹5,000 due in 3 days — Parag Parikh Flexi Cap' },
              { type: 'green', icon: '✅', text: 'Your PPF has ₹50K headroom left — invest before March 31 for 80C benefit' },
              { type: 'red', icon: '📉', text: "Nifty down 2.1% today — don't panic sell. Stay the course!" },
              { type: 'blue', icon: '🎯', text: 'Europe trip goal: 80% complete — ₹50K more to go!' },
            ].map((n, i) => (
              <div key={i} className={`flex items-center gap-3 p-4 rounded-xl border-l-4 ${
                n.type === 'amber' ? 'bg-amber-900/10 border-amber-500' :
                n.type === 'green' ? 'bg-emerald-900/10 border-emerald-500' :
                n.type === 'red' ? 'bg-red-900/10 border-red-500' :
                'bg-blue-900/10 border-blue-500'
              }`}>
                <span className="text-xl">{n.icon}</span>
                <p className="text-sm text-slate-300">{n.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
