import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
export const metadata: Metadata = { title: 'Feature Requests — FinWise AI', description: 'Suggest new features for FinWise AI. Vote on feature requests and help shape the product roadmap.' };
const features = [
  { votes:234, title:'Stock portfolio tracker integration', status:'In Review', desc:'Connect Zerodha/Groww account to track direct equity holdings alongside MFs.' },
  { votes:189, title:'WhatsApp bot for AI advisor', status:'Planned', desc:'Ask financial questions directly on WhatsApp without opening the app.' },
  { votes:156, title:'PPF / EPF / NPS tracker', status:'Planned', desc:'Manually enter or auto-import government scheme balances into net worth.' },
  { votes:134, title:'Credit card expense categorization', status:'In Review', desc:'Auto-categorize expenses from credit card statements for budget analysis.' },
  { votes:98, title:'Family expense split view', status:'Under Consideration', desc:'See household income and expenses across multiple family members.' },
  { votes:76, title:'Telugu language support', status:'In Progress', desc:'Full Telugu language support for AI advisor and all platform content.' },
];
const statusColors: Record<string,string> = { 'In Progress':'badge-blue','Planned':'badge-green','In Review':'badge-amber','Under Consideration':'badge-purple' };
export default function FeedbackPage() {
  return (<><Navbar /><main className="pt-20 pb-20"><div className="max-w-4xl mx-auto px-6"><div className="pt-14 pb-12 text-center"><div className="section-label">Feature Requests</div><h1 className="text-4xl font-extrabold text-white mb-4">Help Shape FinWise AI</h1><p className="text-xl text-slate-400 max-w-xl mx-auto">Vote on features you want, suggest new ones, and see what we're building next. Your feedback directly drives our roadmap.</p></div>
  <div className="card p-6 mb-8"><h2 className="font-bold text-white mb-4">Submit a Feature Request</h2><form className="space-y-4"><div><label className="label">Feature Title</label><input type="text" className="input" placeholder="e.g. SSY Sukanya Samriddhi scheme tracker" /></div><div><label className="label">Describe the problem it solves</label><textarea className="input min-h-[100px] resize-none" placeholder="What are you trying to do that you can't do today?" /></div><button type="submit" className="btn-primary">Submit Feature Request</button></form></div>
  <h2 className="text-xl font-bold text-white mb-5">Top Requested Features</h2>
  <div className="space-y-4">{features.map(f=><div key={f.title} className="card p-5 flex gap-5"><div className="flex flex-col items-center justify-center w-14 flex-shrink-0 text-center"><div className="text-2xl font-bold font-mono text-white">{f.votes}</div><div className="text-xs text-slate-500">votes</div><button className="mt-2 text-slate-400 hover:text-blue-400 transition-colors text-lg">▲</button></div><div className="flex-1"><div className="flex items-start justify-between gap-3"><h3 className="font-semibold text-white">{f.title}</h3><span className={`badge ${statusColors[f.status]||'badge-blue'} text-xs flex-shrink-0`}>{f.status}</span></div><p className="text-sm text-slate-400 mt-1">{f.desc}</p></div></div>)}</div></div></main><Footer /></>);
}
