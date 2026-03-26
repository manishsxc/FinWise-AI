import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ArrowRight, Zap, Shield, TrendingUp, Check } from 'lucide-react';

export const metadata: Metadata = {
  title: "FinWise AI — India's AI Financial Advisor | FIRE Planner, Tax Wizard, MF X-Ray",
  description: 'AI-powered financial advisor for every Indian. FIRE planner, Tax Wizard, MF Portfolio X-Ray, and 24×7 AI advisor. Start free today.',
};

const features = [
  { icon: '📈', title: 'FIRE Path Planner', desc: 'Month-by-month retirement roadmap. Exact SIP amounts, corpus calculation, asset allocation — personalized.', tag: 'Core', color: 'badge-green' },
  { icon: '🧾', title: 'Tax Wizard', desc: 'Upload Form 16. Old vs new regime comparison. Every missing deduction flagged with rupee savings shown.', tag: 'Core', color: 'badge-green' },
  { icon: '🔬', title: 'MF Portfolio X-Ray', desc: 'CAMS/KFintech upload → XIRR, overlap analysis, expense ratio drag, rebalancing plan in 10 seconds.', tag: 'Core', color: 'badge-green' },
  { icon: '🤖', title: 'AI Advisor Chatbot', desc: 'Conversational AI in Hindi, English, Hinglish, Tamil, Telugu, Bengali. 24×7. Like texting a CA friend.', tag: 'Premium', color: 'badge-purple' },
  { icon: '🔮', title: 'Scenario Simulator', desc: '"What if I lose my job?" — instant financial impact modelling across 6 major life events.', tag: 'Premium', color: 'badge-purple' },
  { icon: '💯', title: 'Money Health Score', desc: '6-dimension financial wellness score — emergency fund, insurance, investments, debt, tax, retirement.', tag: 'All Plans', color: 'badge-blue' },
  { icon: '🏆', title: 'Goals + Gamification', desc: 'Track 10+ financial goals. Earn badges and streaks for good money habits. Real-time progress.', tag: 'Premium', color: 'badge-purple' },
  { icon: '📊', title: 'Weekly Report Card', desc: 'Auto-generated Sunday PDF — spending breakdown, savings rate, peer benchmarking, AI observations.', tag: 'Premium', color: 'badge-purple' },
  { icon: '💑', title: 'Couple Planner', desc: "India's first joint AI financial plan. HRA, NPS, SIP optimization across two incomes.", tag: 'Family', color: 'badge-amber' },
];

const plans = [
  { name: 'Starter', price: '₹0', period: '/mo', desc: 'Begin your financial journey', popular: false,
    features: ['Money Health Score', 'Basic AI chatbot (10 q/day)', '1 goal tracker', 'Daily market nudges', 'Basic tax comparison'],
    cta: 'Get Started Free', href: '/register', style: 'btn-secondary w-full justify-center' },
  { name: 'Pro', price: '₹499', period: '/mo', desc: 'The real AI advisor experience', popular: true,
    features: ['Unlimited AI advisor chat', 'Tax Wizard + Form 16 upload', 'FIRE Planner + MF X-Ray', 'All 6 scenario simulators', 'Document vault (5 GB)', 'Weekly PDF report card', 'Multilingual support (6 languages)', 'Goals + Gamification'],
    cta: 'Start 14-day Free Trial', href: '/register?plan=pro', style: 'btn-primary w-full justify-center' },
  { name: 'Business', price: '₹1,299', period: '/mo', desc: 'For entrepreneurs & owners', popular: false,
    features: ['Everything in Pro', 'Business cash flow AI', 'GST + advance tax tracking', 'Loan eligibility analyser', 'Salary vs dividend optimizer', '3 business + personal profiles'],
    cta: 'Start Free Trial', href: '/register?plan=business', style: 'btn-secondary w-full justify-center' },
  { name: 'Professional', price: '₹3,999', period: '/mo', desc: 'For CAs, CFPs & advisors', popular: false,
    features: ['Everything in Business', 'Up to 50 client profiles', 'Bulk CAMS analysis', 'Compliance copilot', 'White-label reports', 'API access (10K calls/mo)', 'Dedicated account manager'],
    cta: 'Contact Sales', href: '/contact?plan=pro', style: 'btn-secondary w-full justify-center' },
];

const testimonials = [
  { name: 'Priya Sharma', role: 'Software Engineer, Bengaluru', rating: 5, text: 'Found ₹43,000 in tax deductions I was missing. Paid for itself 7× in the first month.' },
  { name: 'Rajesh Mehta', role: 'Business Owner, Surat', rating: 5, text: 'Cash flow predictions are accurate. GST reminder saved me ₹15,000 in penalties.' },
  { name: 'Mohammed Zaid', role: 'Salaried Professional, Hyderabad', rating: 5, text: 'Maine Hindi mein poocha aur AI ne bilkul waisi tarah samjhaaya jaise ek dost samjhaata hai.' },
  { name: 'Deepa Nair', role: 'Doctor, Kochi', rating: 5, text: 'MF X-Ray showed I was paying ₹28K/yr in expense ratio drag and had 67% fund overlap. Fixed it in one session.' },
  { name: 'Anita Krishnan', role: 'CA, Chennai', rating: 5, text: 'I manage 30 client portfolios with FinWise AI. What took 3 days now takes 3 hours.' },
  { name: 'Arjun Singh', role: 'Startup Founder, Delhi', rating: 5, text: 'Scenario simulator is insane. Modelled 6 fundraising scenarios and their personal finance impact instantly.' },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden bg-grid bg-[#060a12] pt-16">
          <div aria-hidden className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-blue-600/10 blur-[120px]" />
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-cyan-600/8 blur-[100px]" />
          </div>
          <div className="relative z-10 max-w-5xl mx-auto px-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-900/40 border border-blue-700/40 rounded-full text-sm text-blue-300 font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="font-mono text-xs">ET AI HACKATHON 2026</span>
              <span className="text-slate-500">·</span>
              Problem Statement #9
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] mb-6 tracking-tight">
              India's <span className="gradient-text">AI Financial OS</span><br />for Every Indian
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              From salaried professionals to banks — the AI-powered financial advisor that 95% of India has been waiting for.{' '}
              <strong className="text-white">₹499/month</strong> vs ₹25,000/year CA cost.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link href="/register" className="btn-primary btn-lg group w-full sm:w-auto">
                <Zap className="w-5 h-5" />Start Free — No Card Required
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/dashboard" className="btn-secondary btn-lg w-full sm:w-auto">View Demo Dashboard</Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-slate-500 mb-14">
              {[{ icon: Shield, l: 'SEBI Compliant' }, { icon: Shield, l: 'Bank-grade Security' }, { icon: TrendingUp, l: 'Powered by Claude AI' }].map(({ icon: Icon, l }) => (
                <div key={l} className="flex items-center gap-1.5"><Icon className="w-4 h-4 text-emerald-400" />{l}</div>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[{ v: '14Cr+', l: 'Target users', c: 'text-blue-400' }, { v: '₹499', l: 'vs ₹25K CA/yr', c: 'text-emerald-400' }, { v: '95%', l: 'Underserved', c: 'text-amber-400' }, { v: '₹100Cr', l: 'ARR target Yr 3', c: 'text-purple-400' }].map(s => (
                <div key={s.l} className="card p-4 text-center">
                  <div className={`text-2xl font-bold font-mono ${s.c}`}>{s.v}</div>
                  <div className="text-xs text-slate-400 mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Marquee */}
        <div className="py-4 border-y border-white/10 bg-slate-900/50 overflow-hidden">
          <div className="flex gap-10 animate-marquee whitespace-nowrap">
            {[...Array(2)].flatMap(() => ['🏦 HDFC Bank Integration','📊 CAMS / KFintech Parser','🧾 Form 16 Tax Wizard','🤖 Claude AI Powered','🇮🇳 6 Indian Languages','📈 NSE / BSE Live Data','🔒 SEBI Compliant','💰 Real-time MF X-Ray','🏆 Gamification System','📱 PWA Mobile App','🔔 Smart Nudge Engine','📋 Weekly PDF Reports']).map((item, i) => (
              <span key={i} className="text-sm text-slate-400 font-medium">{item}</span>
            ))}
          </div>
        </div>

        {/* Features */}
        <section id="features" className="py-20 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-label">Full feature set</div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">15+ AI-Powered Tools</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">From basic budgeting to institutional-grade portfolio analytics.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(f => (
              <div key={f.title} className="card-hover p-6">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{f.icon}</span>
                  <span className={f.color}>{f.tag}</span>
                </div>
                <h3 className="font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-20 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="section-label">Pricing</div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Simple, Transparent Pricing</h2>
              <p className="text-slate-400 text-lg">Start free. Upgrade when you need more. Annual billing saves 20%.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              {plans.map(plan => (
                <div key={plan.name} className={`relative flex flex-col rounded-2xl p-6 border ${plan.popular ? 'border-blue-500 bg-blue-900/20' : 'border-white/10 bg-slate-900'}`}>
                  {plan.popular && <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">Most Popular</div>}
                  <div className="mb-5">
                    <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">{plan.name}</div>
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-3xl font-extrabold font-mono text-white">{plan.price}</span>
                      <span className="text-slate-400 text-sm">{plan.period}</span>
                    </div>
                    <p className="text-xs text-slate-500">{plan.desc}</p>
                  </div>
                  <ul className="space-y-2 mb-6 flex-1">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />{f}
                      </li>
                    ))}
                  </ul>
                  <Link href={plan.href} className={`btn ${plan.style}`}>{plan.cta}</Link>
                </div>
              ))}
            </div>
            <div className="rounded-2xl p-7 bg-gradient-to-r from-blue-900/40 to-cyan-900/20 border border-blue-700/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">🏦 Banks, NBFCs & Fintech Platforms</h3>
                <p className="text-sm text-slate-400">White-label FinWise AI inside your app. Custom pricing from ₹15L/year. Integration in 1 week.</p>
              </div>
              <Link href="/contact?enterprise=true" className="btn-primary whitespace-nowrap">Talk to Enterprise Team →</Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-label">Social proof</div>
            <h2 className="text-4xl font-extrabold text-white mb-3">Loved Across India</h2>
            <div className="flex items-center justify-center gap-2 text-amber-400">{'★★★★★'}<span className="text-white font-bold ml-1">4.8/5</span><span className="text-slate-400 text-sm">from 1,247 reviews</span></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map(t => (
              <div key={t.name} className="card p-6">
                <div className="text-amber-400 text-sm mb-3">{'★'.repeat(t.rating)}</div>
                <p className="text-sm text-slate-300 leading-relaxed mb-4 italic">"{t.text}"</p>
                <div><div className="font-semibold text-white text-sm">{t.name}</div><div className="text-xs text-slate-500">{t.role}</div></div>
              </div>
            ))}
          </div>
        </section>

        {/* Mobile App */}
        <section className="py-20 bg-slate-900/50 px-6" id="mobile-app">
          <div className="max-w-7xl mx-auto">
            <div className="rounded-3xl bg-gradient-to-br from-blue-900/40 to-cyan-900/20 border border-blue-700/30 p-10 md:p-14">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="section-label">Mobile App</div>
                  <h2 className="text-4xl font-extrabold text-white mb-4">FinWise AI in Your Pocket</h2>
                  <p className="text-slate-400 mb-6 leading-relaxed">Full-featured app for iOS and Android. SIP reminders, market nudges, quick AI queries, and daily money score on your phone.</p>
                  <ul className="space-y-3 mb-8">
                    {['Works offline — PWA with local caching','Biometric login (Face ID, Fingerprint)','WhatsApp-style chat with AI advisor','Widget support — money score on home screen','Dark mode, 6 language support'].map(f => (
                      <li key={f} className="flex items-center gap-3 text-sm text-slate-300">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-xs flex-shrink-0">✓</span>{f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-3">
                    <a href="https://apps.apple.com/in/app/finwise-ai" target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 px-5 py-3 bg-slate-900 border border-white/10 rounded-xl hover:border-white/20 transition-colors">
                      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                      <div><div className="text-xs text-slate-400">Download on the</div><div className="text-sm font-semibold text-white">App Store</div></div>
                    </a>
                    <a href="https://play.google.com/store/apps/details?id=ai.finwise.app" target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 px-5 py-3 bg-slate-900 border border-white/10 rounded-xl hover:border-white/20 transition-colors">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none"><path d="M3.18 23.28c.35.19.75.2 1.12.04l11.37-6.57-2.54-2.54-9.95 9.07z" fill="#EA4335"/><path d="M20.68 10.04l-2.83-1.64-2.83 2.83 2.83 2.83 2.86-1.65c.82-.47.82-1.9-.03-2.37z" fill="#FBBC04"/><path d="M4.3.72C3.93.56 3.53.57 3.18.76L13.13 10.7l2.54-2.54L4.3.72z" fill="#4285F4"/><path d="M3.18.76c-.35.19-.56.54-.56 1.02v20.44c0 .48.21.83.56 1.02l.09.08L13.81 12.1v-.2L3.27.68l-.09.08z" fill="#34A853"/></svg>
                      <div><div className="text-xs text-slate-400">Get it on</div><div className="text-sm font-semibold text-white">Google Play</div></div>
                    </a>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-56 bg-[#060a12] border-2 border-slate-700 rounded-[36px] p-2.5 shadow-2xl">
                    <div className="bg-slate-900 rounded-[28px] overflow-hidden h-[440px] flex flex-col">
                      <div className="bg-blue-600 px-4 py-3 flex items-center gap-2">
                        <div className="w-5 h-5 rounded-md bg-white/20 flex items-center justify-center text-xs font-bold text-white">F</div>
                        <span className="text-white text-xs font-semibold">FinWise AI</span>
                      </div>
                      <div className="flex-1 p-3 space-y-3 overflow-hidden">
                        <div className="bg-slate-800 rounded-xl p-3">
                          <div className="text-[10px] text-slate-400 mb-1">Money Score</div>
                          <div className="text-2xl font-bold font-mono text-blue-400">69/100</div>
                          <div className="h-1.5 bg-slate-700 rounded-full mt-2 overflow-hidden"><div className="h-full bg-blue-500 rounded-full" style={{width:'69%'}} /></div>
                        </div>
                        <div className="bg-amber-900/20 border border-amber-700/30 rounded-xl p-3">
                          <div className="text-[10px] text-amber-400 font-bold mb-1">TODAY'S NUDGE</div>
                          <div className="text-xs text-slate-300">SIP of ₹5K due tomorrow. Don't miss it!</div>
                        </div>
                        <div className="bg-slate-800 rounded-xl p-3">
                          <div className="text-[10px] text-slate-400 mb-2">AI Advisor</div>
                          <div className="bg-blue-600 rounded-lg p-2 text-xs text-white mb-1.5">Mera FIRE plan kab hoga?</div>
                          <div className="bg-slate-700 rounded-lg p-2 text-xs text-slate-300">Current SIP pe 22 saal mein ₹3.2Cr. ₹5K increase karo toh 19 saal mein!</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 text-center relative overflow-hidden">
          <div aria-hidden className="absolute inset-0 pointer-events-none"><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-600/15 blur-[100px] rounded-full" /></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="section-label">Get started today</div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Your AI Financial Advisor<br />is Ready Right Now</h2>
            <p className="text-slate-400 text-lg mb-10">Join 50,000+ Indians who've started their financial transformation. Free forever plan available.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register" className="btn-primary btn-lg w-full sm:w-auto">Start Free — No Card Required →</Link>
              <Link href="/contact" className="btn-secondary btn-lg w-full sm:w-auto">Schedule Investor Demo</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
