import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
export const metadata: Metadata = { title: 'API Documentation — FinWise AI', description: 'FinWise AI REST API documentation. Integrate financial planning AI into your app. Authentication, endpoints, SDKs, and examples.' };
const endpoints = [
  { method:'POST', path:'/api/v1/fire', desc:'Calculate FIRE retirement plan', params:'age, income, expenses, existingCorpus, retirementAge' },
  { method:'POST', path:'/api/v1/tax', desc:'Tax regime comparison (FY 2025-26)', params:'grossSalary, hra, deduction80C, deduction80D, nps, homeLoan' },
  { method:'POST', path:'/api/v1/mf/analyze', desc:'MF portfolio analysis', params:'portfolioValue, totalInvested, yearsInvested, fundCount, expenseRatio' },
  { method:'POST', path:'/api/v1/health-score', desc:'Money health score (6 dimensions)', params:'monthlyIncome, emergencyFund, insurance, investmentPct, emiRatio' },
  { method:'POST', path:'/api/v1/chat', desc:'AI financial advisor conversation', params:'message, conversationHistory[], userContext?' },
  { method:'POST', path:'/api/v1/scenario', desc:'Life event financial impact', params:'scenarioType, inputs (varies by scenario)' },
];
const methodColors: Record<string,string> = { POST:'bg-emerald-900/60 text-emerald-300 border-emerald-800', GET:'bg-blue-900/60 text-blue-300 border-blue-800' };
export default function DocsPage() {
  return (<><Navbar /><main className="pt-20 pb-20"><div className="max-w-5xl mx-auto px-6"><div className="pt-14 pb-12"><div className="section-label">API Documentation</div><h1 className="text-4xl font-extrabold text-white mb-4">FinWise AI API</h1><p className="text-xl text-slate-400 mb-6">Integrate AI-powered financial planning into your application. REST API with JSON responses. Available on Professional plan and above.</p><div className="flex gap-3"><Link href="/register?plan=PROFESSIONAL" className="btn-primary">Get API Access</Link><a href="mailto:sumitranjanhisu@gmail.com" className="btn-secondary">Contact Engineering</a></div></div>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">{[{icon:'🔑',t:'Authentication',d:'Bearer token authentication. Generate API keys from your dashboard Settings > API Keys.'},{icon:'⚡',t:'Rate Limits',d:'Professional: 10,000 requests/month. Enterprise: custom limits. Rate limit headers included in all responses.'},{icon:'🌐',t:'Base URL',d:'https://api.finwise.ai/v1 for production. All endpoints use HTTPS. JSON request/response.'}].map(c=><div key={c.t} className="card p-5"><span className="text-2xl block mb-2">{c.icon}</span><h3 className="font-bold text-white mb-1 text-sm">{c.t}</h3><p className="text-xs text-slate-400 leading-relaxed">{c.d}</p></div>)}</div>
  <h2 className="text-xl font-bold text-white mb-5">API Endpoints</h2>
  <div className="space-y-4 mb-10">{endpoints.map(e=><div key={e.path} className="card p-5"><div className="flex items-center gap-3 mb-2"><span className={`badge text-xs border ${methodColors[e.method]||''}`}>{e.method}</span><code className="text-sm font-mono text-blue-300">{e.path}</code></div><p className="text-sm text-slate-300 mb-2">{e.desc}</p><p className="text-xs text-slate-500"><span className="text-slate-400">Parameters:</span> {e.params}</p></div>)}</div>
  <h2 className="text-xl font-bold text-white mb-4">Quick Start Example</h2>
  <div className="card p-6 font-mono text-sm"><div className="text-slate-500 mb-2"># Calculate FIRE plan</div><div className="text-blue-300">curl -X POST https://api.finwise.ai/v1/fire \</div><div className="text-slate-300 ml-4">-H "Authorization: Bearer YOUR_API_KEY" \</div><div className="text-slate-300 ml-4">-H "Content-Type: application/json" \</div><div className="text-slate-300 ml-4">-d '&#123;"age":28,"income":80000,"expenses":45000,"retirementAge":50&#125;'</div><div className="text-slate-500 mt-4 mb-2"># Response</div><div className="text-emerald-300">&#123;</div><div className="text-slate-300 ml-4">"results": &#123;"monthlySIPNeeded":24500,"targetCorpus":16200000&#125;,</div><div className="text-slate-300 ml-4">"allocation": &#123;"equity":85,"debt":10,"gold":5&#125;</div><div className="text-emerald-300">&#125;</div></div></div></main><Footer /></>);
}
