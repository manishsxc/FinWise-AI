'use client';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

const goals = [
  { icon: '🏠', name: 'Dream Home', target: 4000000, saved: 1360000, color: '#06b6d4', months: 36 },
  { icon: '🎓', name: 'Child Education', target: 2500000, saved: 300000, color: '#a855f7', months: 180 },
  { icon: '🌴', name: 'FIRE Retirement', target: 30000000, saved: 5400000, color: '#f59e0b', months: 264 },
  { icon: '🚗', name: 'New Car Fund', target: 800000, saved: 496000, color: '#10b981', months: 8 },
  { icon: '✈️', name: 'Europe Trip', target: 250000, saved: 200000, color: '#f97316', months: 3 },
];

const badges = [
  { icon: '💰', name: 'SIP Champion', desc: '12 months continuous SIP', earned: true },
  { icon: '🛡️', name: 'Debt Free', desc: 'Zero bad debt', earned: true },
  { icon: '🏦', name: 'Emergency Ready', desc: '6 months emergency fund', earned: true },
  { icon: '📊', name: 'Tax Saver', desc: 'Maxed 80C deduction', earned: true },
  { icon: '🎯', name: 'Goal Setter', desc: 'Created 5+ goals', earned: true },
  { icon: '🔥', name: '21-Day Streak', desc: 'Logged in 21 days straight', earned: true },
  { icon: '🌟', name: 'Crorepati Path', desc: 'Corpus crossed ₹1Cr', earned: false },
  { icon: '🏠', name: 'Home Owner', desc: 'Completed home goal', earned: false },
  { icon: '🌴', name: 'FIRE Achiever', desc: 'Reached retirement corpus', earned: false },
  { icon: '🎓', name: 'Edu Planner', desc: 'Education goal 100%', earned: false },
  { icon: '📈', name: 'Alpha Seeker', desc: 'Portfolio beats Nifty 3 yrs', earned: false },
  { icon: '🤝', name: 'Couple Goals', desc: 'Joint planning activated', earned: false },
];

function fmt(n: number) { return '₹' + Math.round(n).toLocaleString('en-IN'); }
function fmtL(n: number) {
  if (n >= 10000000) return '₹' + (n / 10000000).toFixed(1) + 'Cr';
  if (n >= 100000) return '₹' + (n / 100000).toFixed(1) + 'L';
  return fmt(n);
}

export default function GoalsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Goals & Badges</h1>
            <p className="text-slate-400 text-sm">Track financial goals. Earn badges for good money habits.</p>
          </div>
          <button className="btn-primary btn-sm">+ New Goal</button>
        </div>

        {/* Gamification stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { val: '🔥 23', label: 'Day Streak', color: 'text-amber-400' },
            { val: '⭐ 1,240', label: 'Money Coins', color: 'text-yellow-400' },
            { val: '🏅 6/12', label: 'Badges Earned', color: 'text-purple-400' },
          ].map((s) => (
            <div key={s.label} className="card p-5 text-center">
              <div className={`text-2xl font-bold font-mono ${s.color}`}>{s.val}</div>
              <div className="text-xs text-slate-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Goals */}
        <div>
          <h2 className="text-lg font-bold text-white mb-4">Financial Goals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {goals.map((g) => {
              const pct = Math.round((g.saved / g.target) * 100);
              return (
                <div key={g.name} className="card p-5 hover:border-white/20 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-2xl block mb-1">{g.icon}</span>
                      <div className="font-bold text-white text-sm">{g.name}</div>
                      <div className="text-xs text-slate-500 mt-0.5">Target: {fmtL(g.target)}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold font-mono" style={{ color: g.color }}>{pct}%</div>
                      <div className="text-xs text-slate-500">{g.months} mo left</div>
                    </div>
                  </div>
                  <div className="h-2 bg-slate-900 rounded-full overflow-hidden mb-2">
                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${pct}%`, background: g.color }} />
                  </div>
                  <div className="flex justify-between text-xs">
                    <span style={{ color: g.color }}>{fmtL(g.saved)} saved</span>
                    <span className="text-slate-500">{fmtL(g.target - g.saved)} to go</span>
                  </div>
                </div>
              );
            })}

            {/* Add goal card */}
            <button className="card p-5 border-dashed flex flex-col items-center justify-center gap-2 hover:border-white/20 transition-colors min-h-[140px]">
              <div className="text-3xl text-slate-600">+</div>
              <div className="text-sm text-slate-500">Add New Goal</div>
            </button>
          </div>
        </div>

        {/* Badges */}
        <div>
          <h2 className="text-lg font-bold text-white mb-4">Achievement Badges</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {badges.map((b) => (
              <div
                key={b.name}
                className={`card p-4 text-center transition-colors ${b.earned ? 'border-amber-700/40 bg-amber-900/10' : 'opacity-50'}`}
                title={b.desc}
              >
                <div className={`text-3xl mb-2 ${!b.earned ? 'grayscale opacity-40' : ''}`}>{b.icon}</div>
                <div className="text-xs font-semibold text-white leading-tight">{b.name}</div>
                <div className="text-[10px] text-slate-500 mt-1 leading-relaxed">{b.desc}</div>
                {b.earned && <div className="mt-2 text-[10px] text-amber-400 font-bold">EARNED ✓</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
