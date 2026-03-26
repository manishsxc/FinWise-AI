// Individual/Salaried segment page
import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'For Individual & Salaried Professionals — FinWise AI',
  description: 'FinWise AI for salaried professionals. FIRE planner, Tax Wizard, MF X-Ray, AI advisor in Hindi. Start free at ₹499/month.',
};

export default function IndividualPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="pt-14 pb-14 text-center">
            <div className="section-label">For Individuals & Salaried Professionals</div>
            <h1 className="text-5xl font-extrabold text-white mb-5">Your Personal CA,<br /><span className="gradient-text">Available 24×7 at ₹499/month</span></h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">Whether you're 25 just starting out, or 45 planning retirement — FinWise AI gives you the same quality financial advice a CA charges ₹25,000+/year for.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/register" className="btn-primary btn-lg">Start Free Trial</Link>
              <Link href="/tools" className="btn-secondary btn-lg">Try the Tools</Link>
            </div>
          </div>

          {/* Pain points */}
          <div className="card p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-5 text-center">Sound Familiar?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                '😰 "I\'ve been meaning to start SIP for years but don\'t know how much"',
                '😤 "My CA charges ₹20K/year just to file my ITR — that\'s it"',
                '🤷 "I have 7 mutual funds but no idea if they\'re good or overlapping"',
                '😓 "Tax time every year — I definitely miss deductions but don\'t know which"',
                '😰 "I want to retire at 50 but have no idea if I\'m on track"',
                '😤 "Nobody told me I could save ₹50K more tax just with NPS"',
              ].map(p => (
                <div key={p} className="bg-slate-800 rounded-xl p-4 text-sm text-slate-300 leading-relaxed border border-white/5">{p}</div>
              ))}
            </div>
            <p className="text-center text-slate-400 mt-5 text-sm">FinWise AI solves all of these. In minutes. For ₹499/month.</p>
          </div>

          {/* Features for this segment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              { icon: '📈', title: 'FIRE Path Planner', desc: 'Enter your age, income, expenses, and when you want to retire. Get exact monthly SIP amount, projected corpus year-by-year, asset allocation recommendations, and insurance gap analysis. Takes 3 minutes.', benefit: 'Average user discovers they need ₹8,000 less SIP than they thought — or that they\'re already on track.' },
              { icon: '🧾', title: 'Tax Wizard', desc: 'Upload Form 16 or enter manually. FinWise AI compares old vs new regime with your actual numbers, finds every missing deduction, and shows you exactly how much to invest where before March 31.', benefit: 'Average user finds ₹18,000–₹43,000 in missed deductions they didn\'t know about.' },
              { icon: '🔬', title: 'MF Portfolio X-Ray', desc: 'Upload your CAMS statement and get your true XIRR, overlap analysis, expense ratio drag in rupees, and a specific rebalancing action plan. Replaces what a mutual fund advisor charges ₹10K for.', benefit: 'Average user has 40%+ fund overlap and ₹15,000+/year in unnecessary expense ratio drag.' },
              { icon: '🤖', title: 'AI Advisor in Hindi', desc: 'Ask anything — SIP advice, insurance queries, loan decisions, investment comparisons — in Hindi, Hinglish, or English. Get specific answers with rupee amounts, not generic advice. Available 24×7.', benefit: '72% of users ask their first financial question in Hinglish. Finally, a financial advisor who speaks your language.' },
              { icon: '🔮', title: 'Life Event Simulator', desc: 'Planning to buy a home? Having a baby? Getting married? Model the financial impact of any major life event before it happens. See the exact rupee impact on your savings rate, corpus, and retirement date.', benefit: 'Make major decisions with data. Not gut feel. Not WhatsApp forwards.' },
              { icon: '🏆', title: 'Goals & Gamification', desc: 'Set financial goals (home, education, car, travel, retirement). Track real progress. Earn badges for good habits — SIP Champion, Debt Free, Emergency Ready. Daily nudges keep you on track.', benefit: 'Users with active goal tracking save 23% more per month on average.' },
            ].map(f => (
              <div key={f.title} className="card p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{f.icon}</span>
                  <h3 className="font-bold text-white">{f.title}</h3>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed mb-3">{f.desc}</p>
                <div className="bg-emerald-900/20 border border-emerald-800/30 rounded-xl p-3 text-xs text-emerald-300 leading-relaxed">
                  💡 {f.benefit}
                </div>
              </div>
            ))}
          </div>

          {/* Pricing */}
          <div className="card p-8 text-center mb-12">
            <h2 className="text-2xl font-bold text-white mb-2">Pro Plan — ₹499/month</h2>
            <p className="text-slate-400 mb-5">That's ₹16/day. Less than your morning chai. For the CA India never had.</p>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {['vs ₹25,000+/yr real CA', 'vs ₹2,000/month financial advisor', 'vs ₹500/session investment advisor', 'No appointment needed', 'Available 24×7', 'Hindi + English support'].map(b => (
                <span key={b} className="text-xs px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 border border-white/10">{b}</span>
              ))}
            </div>
            <Link href="/register?plan=PRO" className="btn-primary btn-lg">Start 14-Day Free Trial — No Card Required</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
