import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Features — FinWise AI',
  description: 'Explore all 15+ AI-powered financial tools — FIRE planner, Tax Wizard, MF X-Ray, AI chatbot, scenario simulator, and more.',
};

const features = [
  {
    id: 'fire', icon: '📈', title: 'FIRE Path Planner', badge: 'Core Feature',
    tagline: 'Retire early with a precise month-by-month roadmap',
    description: 'Our FIRE (Financial Independence, Retire Early) Planner takes your current financial situation and builds a complete, personalized retirement roadmap. Using the 4% safe withdrawal rule and real equity market return assumptions, it calculates exactly how much SIP you need to start today.',
    howItWorks: [
      'Enter your age, monthly income, expenses, existing corpus, and target retirement age',
      'AI calculates target corpus using 25× annual expenses (4% withdrawal rate)',
      'Shows month-by-month SIP amount needed at 12% CAGR equity assumption',
      'Generates year-by-year corpus projection for the next 30 years',
      'Recommends asset allocation shifts (equity/debt/gold) by decade',
    ],
    benefits: ['Saves 40+ hours of manual financial planning', 'Accounts for inflation in corpus calculation', 'Updates automatically when you change any input', 'Identifies insurance gaps and tax-saving opportunities'],
    plans: 'Available on all plans',
  },
  {
    id: 'tax', icon: '🧾', title: 'Tax Wizard', badge: 'FY 2025-26 Ready',
    tagline: 'Never leave money on the table at tax time again',
    description: 'FinWise AI\'s Tax Wizard supports Form 16 upload and performs a complete tax analysis for FY 2025-26. It compares the old and new tax regimes with your actual numbers, identifies every deduction you\'re missing, and ranks tax-saving investments by effort-to-savings ratio.',
    howItWorks: [
      'Upload Form 16 PDF or manually enter salary, HRA, and investment details',
      'AI computes old regime taxable income: gross – standard ₹50K – HRA – 80C – 80D – NPS – 24B',
      'New regime: gross – standard ₹75K, slabs 0–3L @ 0%, 3–7L @ 5%, 7–10L @ 10%...',
      'Side-by-side comparison shows exact rupee savings for each regime',
      'Missing deduction finder shows unused 80C headroom, 80D gap, NPS opportunity',
    ],
    benefits: ['Average user saves ₹18,000+ in previously missed deductions', 'Covers all major deductions: 80C, 80D, 80CCD, HRA, 24B, LTA', 'New regime 87A rebate (zero tax up to ₹7L) correctly applied', 'Ranked list of tax-saving investments by liquidity and returns'],
    plans: 'Pro plan and above',
  },
  {
    id: 'mf', icon: '🔬', title: 'MF Portfolio X-Ray', badge: 'CAMS / KFintech',
    tagline: 'See what your mutual fund portfolio is really doing',
    description: 'Upload your CAMS or KFintech consolidated statement and get a comprehensive portfolio analysis in under 10 seconds. FinWise AI calculates your true XIRR across all SIPs, detects overlap between funds, quantifies expense ratio drag in real rupees, and compares your performance against benchmarks.',
    howItWorks: [
      'Upload CAMS/KFintech statement PDF or enter portfolio details manually',
      'XIRR calculated using Newton-Raphson method on all cash flows',
      'Overlap analysis: cross-references top-10 holdings of each fund pair',
      'Expense ratio drag: current AUM × expense ratio = annual leakage in ₹',
      'Benchmark comparison against Nifty 50 TRI, Nifty Midcap, and CRISIL indices',
    ],
    benefits: ['True XIRR vs simple absolute return — shows real performance', 'Fund overlap detection prevents false diversification', 'Average user saves ₹28,000/year by fixing expense ratio drag', 'Personalized rebalancing action plan, not generic advice'],
    plans: 'Pro plan and above',
  },
  {
    id: 'advisor', icon: '🤖', title: 'AI Advisor Chatbot', badge: '24×7 Available',
    tagline: 'Your personal CA — available at 3 AM, free of judgment',
    description: 'Powered by Claude AI, our conversational financial advisor understands Hindi, English, Hinglish, Tamil, Telugu, and Bengali. It\'s trained with deep Indian financial context — exact tax slabs, SIP return benchmarks, SEBI regulations, and RBI guidelines. Every conversation is saved securely to your account.',
    howItWorks: [
      'Type or voice your financial question in any Indian language',
      'AI detects language and responds in the same language naturally',
      'Draws on your saved financial profile for personalized answers',
      'Uses Indian financial context: actual 2025-26 tax slabs, PPF rates, SEBI rules',
      'Conversation history saved securely in Firebase — picks up where you left off',
    ],
    benefits: ['Saves ₹2,000–15,000/month vs human CA consultation fees', '6 Indian languages — no language barrier to financial planning', 'Remembers your financial situation across sessions', 'Available 24×7 — ask at midnight, get answer instantly'],
    plans: 'Unlimited on Pro and above; 10 q/day on Free',
  },
  {
    id: 'scenario', icon: '🔮', title: 'Scenario Simulator', badge: '"What If?" Engine',
    tagline: 'Model any life event\'s financial impact before it happens',
    description: 'The Scenario Simulator lets you model the financial impact of 6 major life events before you\'re in them. From job loss runway calculation to home loan affordability to new baby preparation — see the numbers clearly and make informed decisions.',
    howItWorks: [
      'Job Loss: calculates emergency fund runway, which expenses to cut, SIP pause logic',
      'Bonus: 60/20/20 optimal allocation — equity MF, emergency top-up, tax-saving',
      'SIP Increase: compound impact over 20 years, years saved to FIRE target',
      'Home Loan: EMI, total interest, EMI-to-income ratio safety check (safe < 40%)',
      'Marriage: budget gap, liquid fund strategy, joint financial planning kickoff',
    ],
    benefits: ['Make major financial decisions with data, not gut feel', 'All 6 scenarios use real Indian financial assumptions', 'Results update in real-time as you change inputs', 'Exportable summary for each scenario'],
    plans: 'Pro plan and above',
  },
  {
    id: 'health', icon: '💯', title: 'Money Health Score', badge: '6 Dimensions',
    tagline: 'Know your complete financial wellness in 5 minutes',
    description: 'The Money Health Score is a 0–100 composite score across 6 financial dimensions. It gives you an honest, data-driven picture of your financial health — not a generic quiz, but a weighted calculation based on your actual numbers.',
    howItWorks: [
      'Emergency Fund (25% weight): months saved ÷ 6 target × 100',
      'Insurance (20%): actual cover ÷ recommended (12× income) × 100',
      'Investment Rate (20%): % of income invested ÷ 30% target × 100',
      'Debt Health (15%): (40% – EMI ratio) ÷ 40% × 100',
      'Tax Efficiency (10%) + Retirement Readiness (10%)',
    ],
    benefits: ['Shows exactly where you are weakest and need to act', 'Score updates automatically after each calculator use', 'Benchmark comparison: how you compare to peers your age', 'Weekly score tracking to see improvement over time'],
    plans: 'Available on all plans including Free',
  },
  {
    id: 'goals', icon: '🏆', title: 'Goals & Gamification', badge: 'Habit-forming',
    tagline: 'Build wealth through habits, not willpower',
    description: 'Set up to 10 financial goals — home, education, retirement, travel, emergency fund — and track real progress with visual bars. Earn badges and maintain streaks for good financial behaviors. Our gamification system is designed by behavioral economists to make financial discipline enjoyable.',
    howItWorks: [
      'Create goals with target amount, target date, and category',
      'Goals saved in real-time to your Firebase account',
      'Progress bars update as you add contributions',
      'Badges awarded for: 12-month SIP streak, 80C maxed, debt-free status, emergency fund complete',
      'Daily streak rewards for checking in and taking financial actions',
    ],
    benefits: ['Users with goal tracking save 23% more on average', '10+ goal types covering every major life financial milestone', 'Peer leaderboard (optional) for accountability', 'WhatsApp reminders for goal contribution due dates'],
    plans: 'Pro plan and above',
  },
  {
    id: 'reports', icon: '📊', title: 'Weekly Report Card', badge: 'Auto-generated',
    tagline: 'Your Sunday morning financial newspaper, personalized',
    description: 'Every Sunday at 9 AM, FinWise AI auto-generates a comprehensive weekly financial report. It covers your spending breakdown, savings achieved, net worth delta, peer benchmarking, and 3 specific AI observations about your financial behavior that week.',
    howItWorks: [
      'Aggregates spending data from your linked bank accounts (SMS parsing)',
      'Calculates savings rate, SIP completion, net worth change',
      'Peer benchmarking: compares you to anonymized same-age, same-city cohort',
      'AI generates 3 specific observations: 1 positive, 1 warning, 1 opportunity',
      'PDF report generated and sent to your email or available in-app',
    ],
    benefits: ['Zero manual effort — fully automated every Sunday', 'Peer comparison shows where you stand vs same-age Indians', 'AI observations are specific to your data, not generic tips', 'Downloadable PDF for record-keeping or sharing with advisor'],
    plans: 'Pro plan and above',
  },
];

export default function FeaturesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 pb-20">
        {/* Hero */}
        <div className="max-w-7xl mx-auto px-6 pt-14 pb-16 text-center">
          <div className="section-label">Platform capabilities</div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-5">Everything You Need to<br /><span className="gradient-text">Master Your Money</span></h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">15+ AI-powered tools built specifically for India — with real tax slabs, real return benchmarks, and real Hindi support.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {features.map(f => (
              <a key={f.id} href={`#${f.id}`} className="px-4 py-2 rounded-xl bg-slate-800 border border-white/10 text-sm text-slate-300 hover:text-white hover:border-white/20 transition-colors">
                {f.icon} {f.title}
              </a>
            ))}
          </div>
        </div>

        {/* Feature sections */}
        <div className="max-w-7xl mx-auto px-6 space-y-24">
          {features.map((f, idx) => (
            <section key={f.id} id={f.id} className="scroll-mt-24">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">{f.icon}</span>
                    <span className="badge badge-blue">{f.badge}</span>
                  </div>
                  <h2 className="text-3xl font-extrabold text-white mb-3">{f.title}</h2>
                  <p className="text-lg text-blue-400 font-medium mb-4">{f.tagline}</p>
                  <p className="text-slate-400 leading-relaxed mb-6">{f.description}</p>
                  <div className="flex flex-wrap gap-3">
                    <Link href="/register" className="btn-primary">Try It Free</Link>
                    <span className="flex items-center px-4 py-2.5 text-sm text-slate-400 bg-slate-800 rounded-xl border border-white/10">{f.plans}</span>
                  </div>
                </div>
                <div className={`space-y-5 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="card p-6">
                    <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">How It Works</h3>
                    <ol className="space-y-3">
                      {f.howItWorks.map((step, i) => (
                        <li key={i} className="flex gap-3 text-sm text-slate-300 leading-relaxed">
                          <span className="w-5 h-5 rounded-full bg-blue-600/30 border border-blue-600/50 flex items-center justify-center text-blue-400 text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div className="card p-6">
                    <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Key Benefits</h3>
                    <ul className="space-y-2.5">
                      {f.benefits.map((b, i) => (
                        <li key={i} className="flex gap-2.5 text-sm text-slate-300">
                          <span className="text-emerald-400 mt-0.5 flex-shrink-0">✓</span>{b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="max-w-3xl mx-auto px-6 mt-24 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Start Using All Features Today</h2>
          <p className="text-slate-400 mb-8">Free plan available. Pro at ₹499/month — less than one CA consultation.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn-primary btn-lg">Start Free — No Card Required</Link>
            <Link href="/pricing" className="btn-secondary btn-lg">Compare Plans</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
