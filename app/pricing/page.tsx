import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Check } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pricing — FinWise AI',
  description: 'Transparent pricing for every Indian. Free plan available. Pro at ₹499/month. Business at ₹1,299/month.',
};

const plans = [
  {
    name: 'Starter', price: '₹0', period: '/mo', desc: 'Begin your financial journey', popular: false,
    features: ['Money Health Score', 'Basic AI chatbot (10 q/day)', '1 goal tracker', 'Daily market nudges', 'Basic tax comparison'],
    cta: 'Get Started Free', href: '/register', style: 'btn-secondary w-full justify-center',
  },
  {
    name: 'Pro', price: '₹499', period: '/mo', desc: 'The real AI advisor experience', popular: true,
    features: ['Unlimited AI advisor chat', 'Tax Wizard + Form 16 upload', 'FIRE Planner + MF X-Ray', 'All 6 scenario simulators', 'Document vault (5 GB)', 'Weekly PDF report card', 'Multilingual (6 languages)', 'Goals + Gamification'],
    cta: 'Start 14-day Free Trial', href: '/register?plan=PRO', style: 'btn-primary w-full justify-center',
  },
  {
    name: 'Business', price: '₹1,299', period: '/mo', desc: 'For entrepreneurs & owners', popular: false,
    features: ['Everything in Pro', 'Business cash flow AI', 'GST + advance tax tracking', 'Loan eligibility analyser', 'Salary vs dividend optimizer', '3 profiles'],
    cta: 'Start Free Trial', href: '/register?plan=BUSINESS', style: 'btn-secondary w-full justify-center',
  },
  {
    name: 'Professional', price: '₹3,999', period: '/mo', desc: 'For CAs, CFPs & advisors', popular: false,
    features: ['Everything in Business', 'Up to 50 client profiles', 'Bulk CAMS analysis', 'Compliance copilot', 'White-label reports', 'API access (10K calls/mo)'],
    cta: 'Contact Sales', href: '/contact?plan=professional', style: 'btn-secondary w-full justify-center',
  },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-6 pt-14 text-center mb-12">
          <div className="section-label">Pricing</div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Simple, Transparent Pricing</h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">Start free. Upgrade when you need more. Cancel anytime. No hidden fees.</p>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {plans.map(plan => (
              <div key={plan.name} className={`relative flex flex-col rounded-2xl p-6 border ${plan.popular ? 'border-blue-500 bg-blue-950/20' : 'border-white/10 bg-slate-900'}`}>
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">Most Popular</div>
                )}
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

          {/* B2B Banner */}
          <div className="rounded-2xl p-7 bg-gradient-to-r from-blue-950/40 to-cyan-950/20 border border-blue-800/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 mb-10">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">🏦 Banks, NBFCs & Fintech Platforms</h3>
              <p className="text-sm text-slate-400">White-label FinWise AI inside your app. Custom pricing from ₹15L/year. Integration in 1 week.</p>
            </div>
            <Link href="/contact?enterprise=true" className="btn-primary whitespace-nowrap">Talk to Enterprise Team →</Link>
          </div>

          {/* SEBI disclaimer */}
          <div className="rounded-xl bg-amber-950/20 border border-amber-800/30 p-4 text-center">
            <p className="text-xs text-amber-300/70 leading-relaxed">
              ⚠️ <strong className="text-amber-300">SEBI Disclaimer:</strong> FinWise AI provides AI-generated educational tools. Not a SEBI-registered Investment Adviser. All content is for informational purposes only. Mutual fund investments are subject to market risks. Consult a qualified financial advisor before investing.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
