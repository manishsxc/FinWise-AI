'use client';
import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Loader2 } from 'lucide-react';

function fmt(n: number) { return '₹' + Math.round(n).toLocaleString('en-IN'); }
function fmtL(n: number) {
  if (n >= 10000000) return '₹' + (n / 10000000).toFixed(2) + 'Cr';
  if (n >= 100000) return '₹' + (n / 100000).toFixed(2) + 'L';
  return fmt(n);
}

function ResultBox({ data }: { data: Record<string, any> | null }) {
  if (!data) return null;
  return (
    <div className="mt-5 bg-slate-900 rounded-xl p-5 border border-white/10 space-y-2.5 animate-fade-in">
      {Object.entries(data).map(([key, val]) => (
        <div key={key} className="flex justify-between items-center text-sm py-1.5 border-b border-white/5 last:border-0">
          <span className="text-slate-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
          <span className={`font-mono font-semibold ${String(val).includes('✓') || String(val).startsWith('✓') ? 'text-emerald-400' : 'text-white'}`}>{String(val)}</span>
        </div>
      ))}
    </div>
  );
}

function ToolCard({ id, icon, title, badge, children }: { id: string; icon: string; title: string; badge?: string; children: React.ReactNode }) {
  return (
    <div id={id} className="card p-6 scroll-mt-20">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <h2 className="text-lg font-bold text-white">{title}</h2>
        </div>
        {badge && <span className="badge badge-green text-xs">{badge}</span>}
      </div>
      {children}
    </div>
  );
}

export default function ToolsPage() {
  const [fireResult, setFireResult] = useState<any>(null);
  const [taxResult, setTaxResult] = useState<any>(null);
  const [mfResult, setMfResult] = useState<any>(null);
  const [healthResult, setHealthResult] = useState<any>(null);
  const [loading, setLoading] = useState<string | null>(null);

  // FIRE state
  const [fire, setFire] = useState({ age: 28, income: 80000, expenses: 45000, corpus: 500000, retireAge: 50 });

  // Tax state
  const [tax, setTax] = useState({ grossSalary: 1200000, hra: 180000, rentPaid: 200000, deduction80C: 100000, deduction80D: 0, nps80CCD1B: 0, homeLoanInterest24B: 0 });

  // MF state
  const [mf, setMf] = useState({ portfolioValue: 500000, totalInvested: 380000, yearsInvested: 4, fundCount: 7, avgExpenseRatio: 1.2 });

  // Health state
  const [health, setHealth] = useState({ monthlyIncome: 80000, monthlyExpenses: 45000, emergencyFundMonths: 4, insuranceCoverLakhs: 50, monthlyInvestmentPct: 17, emiToIncomeRatio: 15, has80CMaxed: false });

  async function callApi(endpoint: string, body: object, setter: (d: any) => void, key: string) {
    setLoading(key);
    try {
      const res = await fetch(`/api/${endpoint}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const data = await res.json();
      setter(data);
    } catch { setter({ error: 'Calculation failed' }); }
    setLoading(null);
  }

  const calcFIRE = () => callApi('fire', { age: fire.age, income: fire.income, expenses: fire.expenses, existingCorpus: fire.corpus, retirementAge: fire.retireAge }, (data) => {
    if (data.results) setFireResult({
      'Years to retirement': data.results.yearsToRetirement + ' years',
      'Monthly SIP needed': fmtL(data.results.monthlySIPNeeded) + '/month',
      'Target corpus (25× expenses)': fmtL(data.results.targetCorpus),
      'Projected corpus': fmtL(data.results.projectedCorpus),
      'Current savings rate': data.results.savingsRate + '%',
      'On track': data.results.onTrack ? '✓ Yes' : '⚠ Need to increase SIP',
    });
  }, 'fire');

  const calcTax = () => callApi('tax', tax, (data) => {
    if (data.recommendation) setTaxResult({
      'Old regime tax': fmt(data.oldRegime.tax),
      'New regime tax': fmt(data.newRegime.tax),
      'Better regime': data.recommendation.betterRegime === 'old' ? 'Old Regime' : 'New Regime',
      'You save': fmt(data.recommendation.savings),
      'Effective rate (better)': data.recommendation.betterRegime === 'old' ? data.oldRegime.effectiveRate + '%' : data.newRegime.effectiveRate + '%',
      'Missing deduction potential': fmtL(data.potentialAdditionalSaving) + ' more savings possible',
    });
  }, 'tax');

  const calcMF = () => callApi('mf', mf, (data) => {
    if (data.analysis) setMfResult({
      'Absolute return': data.analysis.absoluteReturn + '%',
      'XIRR (CAGR)': data.analysis.xirr.toFixed(1) + '%',
      'vs Nifty 50': (data.analysis.alpha > 0 ? '+' : '') + data.analysis.alpha.toFixed(1) + '% alpha',
      'Portfolio score': data.analysis.overallScore + '/100',
      'Overlap risk': data.overlap.risk,
      'Annual expense drag': fmt(data.costs.annualExpenseDrag),
      'Action': data.rebalancingActions[0] || 'Portfolio looks healthy',
    });
  }, 'mf');

  const calcHealth = () => callApi('health', health, (data) => {
    if (data.overall !== undefined) setHealthResult({
      'Overall money score': data.overall + '/100 — ' + data.label,
      'Emergency fund': data.dimensions?.find((d: any) => d.name === 'emergency')?.score + '/100',
      'Insurance': data.dimensions?.find((d: any) => d.name === 'insurance')?.score + '/100',
      'Investment rate': data.dimensions?.find((d: any) => d.name === 'investment')?.score + '/100',
      'Debt health': data.dimensions?.find((d: any) => d.name === 'debt')?.score + '/100',
      'Top priority': data.priorities?.[0]?.action || 'All dimensions healthy',
    });
  }, 'health');

  const inputCls = "input text-sm";
  const labelCls = "label text-xs";

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Financial Tools</h1>
          <p className="text-slate-400 text-sm">All calculators powered by real financial formulas — not estimates.</p>
        </div>

        {/* FIRE Planner */}
        <ToolCard id="fire" icon="📈" title="FIRE Path Planner" badge="Core Feature">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: 'Current Age', key: 'age', type: 'number', min: 18, max: 60 },
              { label: 'Monthly Income (₹)', key: 'income', type: 'number', step: 5000 },
              { label: 'Monthly Expenses (₹)', key: 'expenses', type: 'number', step: 1000 },
              { label: 'Existing Corpus (₹)', key: 'corpus', type: 'number', step: 10000 },
              { label: 'Target Retirement Age', key: 'retireAge', type: 'number', min: 30, max: 65 },
            ].map(({ label, key, ...rest }) => (
              <div key={key}>
                <label className={labelCls}>{label}</label>
                <input className={inputCls} value={(fire as any)[key]} onChange={e => setFire(p => ({ ...p, [key]: +e.target.value }))} {...rest} />
              </div>
            ))}
            <div className="flex items-end">
              <button onClick={calcFIRE} disabled={loading === 'fire'} className="btn-primary w-full py-3">
                {loading === 'fire' ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Calculate FIRE Roadmap'}
              </button>
            </div>
          </div>
          <ResultBox data={fireResult} />
        </ToolCard>

        {/* Tax Wizard */}
        <ToolCard id="tax" icon="🧾" title="Tax Wizard — FY 2025-26" badge="Form 16 AI">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: 'Gross Annual Salary (₹)', key: 'grossSalary', step: 10000 },
              { label: 'HRA Received/year (₹)', key: 'hra', step: 5000 },
              { label: 'Annual Rent Paid (₹)', key: 'rentPaid', step: 5000 },
              { label: '80C Investments (₹) max ₹1.5L', key: 'deduction80C', max: 150000 },
              { label: '80D Health Insurance (₹)', key: 'deduction80D', max: 25000 },
              { label: 'NPS 80CCD(1B) (₹) max ₹50K', key: 'nps80CCD1B', max: 50000 },
            ].map(({ label, key, ...rest }) => (
              <div key={key}>
                <label className={labelCls}>{label}</label>
                <input type="number" className={inputCls} value={(tax as any)[key]} onChange={e => setTax(p => ({ ...p, [key]: +e.target.value }))} {...rest} />
              </div>
            ))}
          </div>
          <button onClick={calcTax} disabled={loading === 'tax'} className="btn-primary mt-4 px-8">
            {loading === 'tax' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Compare Tax Regimes'}
          </button>
          <ResultBox data={taxResult} />
        </ToolCard>

        {/* MF X-Ray */}
        <ToolCard id="mf" icon="🔬" title="MF Portfolio X-Ray" badge="CAMS/KFintech">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: 'Portfolio Value (₹)', key: 'portfolioValue' },
              { label: 'Total Invested (₹)', key: 'totalInvested' },
              { label: 'Years Invested', key: 'yearsInvested', max: 40 },
              { label: 'Number of Funds', key: 'fundCount', max: 30 },
              { label: 'Avg Expense Ratio (%)', key: 'avgExpenseRatio', step: 0.1 },
            ].map(({ label, key, ...rest }) => (
              <div key={key}>
                <label className={labelCls}>{label}</label>
                <input type="number" className={inputCls} value={(mf as any)[key]} onChange={e => setMf(p => ({ ...p, [key]: +e.target.value }))} {...rest} />
              </div>
            ))}
            <div className="flex items-end">
              <button onClick={calcMF} disabled={loading === 'mf'} className="btn-primary w-full py-3">
                {loading === 'mf' ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Analyse Portfolio'}
              </button>
            </div>
          </div>
          <ResultBox data={mfResult} />
        </ToolCard>

        {/* Money Health Score */}
        <ToolCard id="health" icon="💯" title="Money Health Score" badge="6 Dimensions">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className={labelCls}>Monthly Income (₹)</label>
              <input type="number" className={inputCls} value={health.monthlyIncome} onChange={e => setHealth(p => ({ ...p, monthlyIncome: +e.target.value }))} />
            </div>
            <div>
              <label className={labelCls}>Monthly Expenses (₹)</label>
              <input type="number" className={inputCls} value={health.monthlyExpenses} onChange={e => setHealth(p => ({ ...p, monthlyExpenses: +e.target.value }))} />
            </div>
            <div>
              <label className={labelCls}>Emergency Fund (months) — {health.emergencyFundMonths}mo</label>
              <input type="range" min={0} max={12} value={health.emergencyFundMonths} onChange={e => setHealth(p => ({ ...p, emergencyFundMonths: +e.target.value }))} className="w-full mt-2 accent-blue-500" />
            </div>
            <div>
              <label className={labelCls}>Insurance Cover (₹ Lakhs) — ₹{health.insuranceCoverLakhs}L</label>
              <input type="range" min={0} max={200} value={health.insuranceCoverLakhs} onChange={e => setHealth(p => ({ ...p, insuranceCoverLakhs: +e.target.value }))} className="w-full mt-2 accent-blue-500" />
            </div>
            <div>
              <label className={labelCls}>% Income Invested — {health.monthlyInvestmentPct}%</label>
              <input type="range" min={0} max={60} value={health.monthlyInvestmentPct} onChange={e => setHealth(p => ({ ...p, monthlyInvestmentPct: +e.target.value }))} className="w-full mt-2 accent-blue-500" />
            </div>
            <div>
              <label className={labelCls}>EMI/Income Ratio — {health.emiToIncomeRatio}%</label>
              <input type="range" min={0} max={60} value={health.emiToIncomeRatio} onChange={e => setHealth(p => ({ ...p, emiToIncomeRatio: +e.target.value }))} className="w-full mt-2 accent-blue-500" />
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-300">
              <input type="checkbox" checked={health.has80CMaxed} onChange={e => setHealth(p => ({ ...p, has80CMaxed: e.target.checked }))} className="w-4 h-4 rounded accent-blue-500" />
              80C fully maxed (₹1.5L)
            </label>
            <button onClick={calcHealth} disabled={loading === 'health'} className="btn-primary ml-auto px-8">
              {loading === 'health' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Calculate Score'}
            </button>
          </div>
          <ResultBox data={healthResult} />
        </ToolCard>

        <p className="text-xs text-slate-600 text-center pb-4">
          ⚠️ All calculations are estimates based on stated assumptions. Consult a SEBI-registered advisor before making investment decisions.
        </p>
      </div>
    </DashboardLayout>
  );
}
