'use client';
import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Loader2 } from 'lucide-react';

type Scenario = 'jobless' | 'bonus' | 'sip' | 'homeloan' | 'marriage' | 'baby';

const scenarios: { id: Scenario; icon: string; label: string }[] = [
  { id: 'jobless', icon: '😰', label: 'Job Loss' },
  { id: 'bonus', icon: '🎉', label: 'Bonus Received' },
  { id: 'sip', icon: '📈', label: 'Increase SIP' },
  { id: 'homeloan', icon: '🏠', label: 'Home Loan' },
  { id: 'marriage', icon: '💑', label: 'Marriage' },
  { id: 'baby', icon: '👶', label: 'New Baby' },
];

function fmt(n: number) { return '₹' + Math.round(n).toLocaleString('en-IN'); }
function fmtL(n: number) {
  if (n >= 10000000) return '₹' + (n / 10000000).toFixed(2) + 'Cr';
  if (n >= 100000) return '₹' + (n / 100000).toFixed(1) + 'L';
  return fmt(n);
}

function calc(id: Scenario, vals: Record<string, number>): Record<string, string> {
  switch (id) {
    case 'jobless': {
      const run1 = (vals.ef / vals.exp).toFixed(1);
      const run2 = (vals.ef / (vals.exp - vals.sip)).toFixed(1);
      return { 'Emergency fund runway': run1 + ' months', 'With paused SIPs': run2 + ' months', 'Monthly burn rate': fmt(vals.exp), 'Pause SIPs for': '3 months, then resume', 'Priority expenses': 'Rent, food, insurance, EMI', 'Recommended action': 'Cut discretionary spend by 40%' };
    }
    case 'bonus': {
      const invest = vals.bonus * 0.6, ef = vals.bonus * 0.2, tax = vals.bonus * 0.2;
      const corpus = invest * Math.pow(1.12, vals.yrs);
      return { 'Invest in equity MF (60%)': fmt(invest), 'Emergency top-up (20%)': fmt(ef), 'Tax-saving ELSS/NPS (20%)': fmt(tax), [`Corpus after ${vals.yrs} years @12%`]: fmtL(corpus), 'Tax saved on ELSS': fmt(tax * 0.3), 'Wealth created (vs FD)': fmtL(corpus - vals.bonus) };
    }
    case 'sip': {
      const r = 0.12 / 12, n = vals.yrs * 12;
      const c1 = vals.cur * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
      const c2 = (vals.cur + vals.inc) * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
      return { 'Current SIP corpus': fmtL(c1), 'New SIP corpus': fmtL(c2), 'Extra wealth created': fmtL(c2 - c1), 'Additional monthly cost': fmt(vals.inc), [`Return on extra invest`]: `${((c2 - c1) / (vals.inc * n) * 100).toFixed(0)}% over investment`, [`Retire earlier by`]: `${((c2 - c1) / (vals.inc * 12 * 8)).toFixed(1)} years` };
    }
    case 'homeloan': {
      const loan = vals.property * (1 - vals.dp / 100);
      const rate = vals.rate / 100 / 12, n = vals.tenure * 12;
      const emi = loan * rate * Math.pow(1 + rate, n) / (Math.pow(1 + rate, n) - 1);
      const totalPay = emi * n, interest = totalPay - loan;
      const emiPct = (emi / 80000 * 100).toFixed(1);
      return { 'Loan amount': fmtL(loan), 'Monthly EMI': fmt(emi), 'Total interest paid': fmtL(interest), [`EMI to income ratio`]: `${emiPct}% (safe if <40%)`, 'Total repayment': fmtL(totalPay), 'Safe to take?': +emiPct < 40 ? '✓ Yes — within safe limit' : '⚠ EMI too high for income' };
    }
    case 'marriage': {
      const gap = Math.max(0, vals.budget - vals.saved);
      const monthly = gap / vals.months;
      return { 'Wedding budget gap': fmt(gap), 'Monthly savings needed': fmt(monthly), 'Best saving vehicle': 'Liquid MF or short-term FD', 'Keep long-term SIPs?': '✓ Yes — never break SIPs for wedding', 'Insurance to add': 'Health floater for new family', 'Joint budget tip': 'Merge income tracking post-marriage' };
    }
    case 'baby': {
      const extraExp = vals.exp * 0.35;
      const efTop = extraExp * 6;
      const eduCorpus = vals.edu;
      const r = 0.12 / 12, n = 18 * 12;
      const eduSIP = eduCorpus * r / (Math.pow(1 + r, n) - 1);
      return { [`Extra monthly expenses`]: `${fmt(extraExp)}/month`, 'Emergency fund top-up': fmt(efTop), [`Education SIP (start now)`]: `${fmt(eduSIP)}/month for 18 yrs`, [`Term insurance increase`]: `${fmt(vals.exp * 12 * 5)} more cover`, 'Maternity/paternity leave fund': fmt(vals.exp * 3), 'Best investment for child': 'SSY (Sukanya) or equity MF' };
    }
  }
}

export default function ScenarioPage() {
  const [active, setActive] = useState<Scenario>('jobless');
  const [result, setResult] = useState<Record<string, string> | null>(null);
  const [loading, setLoading] = useState(false);
  const [vals, setVals] = useState({ ef: 270000, exp: 45000, sip: 14000, bonus: 200000, yrs: 22, cur: 14000, inc: 5000, property: 8000000, dp: 20, rate: 9, tenure: 20, budget: 1500000, saved: 500000, months: 18, edu: 2500000 });

  const v = (k: keyof typeof vals) => vals[k];
  const set = (k: keyof typeof vals, val: number) => setVals(p => ({ ...p, [k]: val }));
  const inp = "input text-sm";
  const lbl = "label text-xs";

  const run = () => { setLoading(true); setTimeout(() => { setResult(calc(active, vals)); setLoading(false); }, 600); };

  const fields: Record<Scenario, { label: string; key: keyof typeof vals }[]> = {
    jobless: [{ label: 'Emergency Fund (₹)', key: 'ef' }, { label: 'Monthly Expenses (₹)', key: 'exp' }, { label: 'Monthly SIP to pause (₹)', key: 'sip' }],
    bonus: [{ label: 'Bonus Amount (₹)', key: 'bonus' }, { label: 'Years to Retirement', key: 'yrs' }],
    sip: [{ label: 'Current Monthly SIP (₹)', key: 'cur' }, { label: 'Increase by (₹/month)', key: 'inc' }, { label: 'Years to Invest', key: 'yrs' }],
    homeloan: [{ label: 'Property Value (₹)', key: 'property' }, { label: 'Down Payment (%)', key: 'dp' }, { label: 'Tenure (years)', key: 'tenure' }, { label: 'Interest Rate (%)', key: 'rate' }],
    marriage: [{ label: 'Wedding Budget (₹)', key: 'budget' }, { label: 'Already Saved (₹)', key: 'saved' }, { label: 'Months to Wedding', key: 'months' }],
    baby: [{ label: 'Monthly Expenses (₹)', key: 'exp' }, { label: 'Education Goal in 18yrs (₹)', key: 'edu' }],
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">What If? Scenario Simulator</h1>
          <p className="text-slate-400 text-sm">Model any life event's financial impact instantly with real calculations.</p>
        </div>

        {/* Scenario tabs */}
        <div className="flex flex-wrap gap-2">
          {scenarios.map((s) => (
            <button key={s.id} onClick={() => { setActive(s.id); setResult(null); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${active === s.id ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400 border border-white/10 hover:text-white'}`}>
              {s.icon} {s.label}
            </button>
          ))}
        </div>

        <div className="card p-7">
          <h2 className="font-bold text-white mb-5 flex items-center gap-2">
            {scenarios.find(s => s.id === active)?.icon}
            {scenarios.find(s => s.id === active)?.label} — Impact Analysis
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-5">
            {fields[active].map(({ label, key }) => (
              <div key={key}>
                <label className={lbl}>{label}</label>
                <input type="number" className={inp} value={v(key)} onChange={e => set(key, +e.target.value)} />
              </div>
            ))}
          </div>

          <button onClick={run} disabled={loading} className="btn-primary px-8">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Modelling impact...</> : '🔮 Model Financial Impact'}
          </button>

          {result && (
            <div className="mt-6 bg-slate-900 rounded-xl p-6 border border-white/10 animate-fade-in">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Financial Impact Analysis</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(result).map(([k, v]) => (
                  <div key={k} className="flex justify-between items-start py-2 px-3 bg-[#0f172a] rounded-lg border border-white/5">
                    <span className="text-xs text-slate-400 flex-1">{k}</span>
                    <span className={`text-xs font-mono font-semibold ml-3 ${v.startsWith('✓') ? 'text-emerald-400' : v.startsWith('⚠') ? 'text-amber-400' : 'text-white'}`}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <p className="text-xs text-slate-600 text-center">
          ⚠️ Scenario results are estimates. Returns at 12% CAGR assumed for equity. Consult a SEBI-registered advisor for major financial decisions.
        </p>
      </div>
    </DashboardLayout>
  );
}
