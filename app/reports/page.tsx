import { DashboardLayout } from '@/components/layout/DashboardLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Weekly Report — FinWise AI' };

const spendingData = [
  { label: 'Housing / Rent', amount: 18000, pct: 40, color: '#06b6d4' },
  { label: 'Food & Dining', amount: 10000, pct: 22, color: '#f59e0b' },
  { label: 'Transport', amount: 5000, pct: 11, color: '#a855f7' },
  { label: 'Shopping', amount: 4200, pct: 9, color: '#f97316' },
  { label: 'Health', amount: 3000, pct: 7, color: '#10b981' },
  { label: 'Entertainment', amount: 2000, pct: 4, color: '#3b82f6' },
  { label: 'Other', amount: 3000, pct: 7, color: '#64748b' },
];

const insights = [
  { type: 'success', icon: '✅', title: 'Great habit!', text: "You didn't touch your emergency fund this month despite an unexpected ₹3K expense. Excellent financial discipline." },
  { type: 'warning', icon: '⚠️', title: 'Watch out:', text: 'Food spend up 18% vs last month. Dining out increasing — consider cooking at home 3 more days/week to save ₹3K/month.' },
  { type: 'info', icon: '💡', title: 'Opportunity:', text: 'You can still invest ₹50,000 in PPF before March 31 for extra 80C benefit and ₹15,500 tax saving.' },
  { type: 'action', icon: '🎯', title: 'Action needed:', text: 'Term insurance cover of ₹50L is insufficient for your income. Recommend increasing to ₹1.5Cr (cost: ~₹15K/year more).' },
];

const colorMap: Record<string, string> = { success: 'border-emerald-500 bg-emerald-900/10 text-emerald-300', warning: 'border-amber-500 bg-amber-900/10 text-amber-300', info: 'border-blue-500 bg-blue-900/10 text-blue-300', action: 'border-orange-500 bg-orange-900/10 text-orange-300' };

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Weekly Report Card</h1>
            <p className="text-slate-400 text-sm">Week of Mar 16–22, 2026 · Auto-generated every Sunday</p>
          </div>
          <button className="btn-secondary btn-sm">↓ Download PDF</button>
        </div>

        {/* Summary row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { val: '₹45,200', label: 'Total Spent', change: '+₹2,100 vs last week', up: false },
            { val: '₹30,800', label: 'Total Saved/Invested', change: '+₹3,200 vs last week', up: true },
            { val: '38.5%', label: 'Savings Rate', change: '↑ +3.2% vs last month', up: true },
            { val: '₹18.4L', label: 'Net Worth', change: '↑ ₹32K this month', up: true },
          ].map((s) => (
            <div key={s.label} className="card p-5">
              <div className="text-xl font-bold font-mono text-white">{s.val}</div>
              <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
              <div className={`text-xs mt-2 font-medium ${s.up ? 'text-emerald-400' : 'text-red-400'}`}>{s.change}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Spending breakdown */}
          <div className="card p-6">
            <h2 className="font-bold text-white mb-5">Spending Breakdown</h2>
            <div className="space-y-3">
              {spendingData.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color }} />
                  <span className="text-sm text-slate-400 flex-1">{item.label}</span>
                  <div className="w-24 h-1.5 bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${item.pct}%`, background: item.color }} />
                  </div>
                  <span className="text-sm font-mono text-white w-16 text-right">₹{item.amount.toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Peer benchmark */}
          <div className="card p-6">
            <h2 className="font-bold text-white mb-5">Peer Benchmark (Age 28, Tier 1)</h2>
            <div className="space-y-4">
              {[
                { label: 'You', val: 184, display: '₹18.4L NW', color: '#10b981', pct: 77 },
                { label: 'Average peer', val: 120, display: '₹12L NW', color: '#64748b', pct: 50 },
                { label: 'Top 10%', val: 280, display: '₹28L NW', color: '#f59e0b', pct: 100 },
              ].map((row) => (
                <div key={row.label}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-slate-300 font-medium">{row.label}</span>
                    <span className="font-mono" style={{ color: row.color }}>{row.display}</span>
                  </div>
                  <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${row.pct}%`, background: row.color }} />
                  </div>
                </div>
              ))}
              <div className="mt-3 p-3 bg-emerald-900/20 rounded-xl border border-emerald-800/30 text-xs text-emerald-300">
                You're in the <strong>top 25%</strong> of your peer group. ₹9.6L more to reach top 10%.
              </div>
            </div>
          </div>
        </div>

        {/* AI Observations */}
        <div className="card p-6">
          <h2 className="font-bold text-white mb-4">AI Observations This Week</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {insights.map((ins) => (
              <div key={ins.title} className={`p-4 rounded-xl border-l-4 ${colorMap[ins.type]}`}>
                <div className="font-semibold text-sm mb-1">{ins.icon} {ins.title}</div>
                <p className="text-xs leading-relaxed opacity-80">{ins.text}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-slate-600 text-center">
          ⚠️ Spending data is illustrative. Connect your bank account for real-time tracking. FinWise AI does not store raw bank credentials.
        </p>
      </div>
    </DashboardLayout>
  );
}
