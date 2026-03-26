import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Help Center — FinWise AI',
  description: 'Get help with FinWise AI. FAQs, setup guides, feature documentation, and contact support.',
};

const categories = [
  {
    icon: '🚀', title: 'Getting Started',
    articles: [
      { q: 'How do I create an account?', a: 'Click "Get Started Free" on the homepage. You can sign up with Google (one click) or with your email and password. The Free plan has no credit card requirement.' },
      { q: 'What is the Money Health Score?', a: 'It\'s a 0–100 composite score across 6 dimensions: Emergency Fund, Insurance Coverage, Investment Rate, Debt Health, Tax Efficiency, and Retirement Readiness. Each dimension is weighted differently to reflect its importance. You can improve your score by taking the recommended actions.' },
      { q: 'What is the FIRE Path Planner?', a: 'FIRE stands for Financial Independence, Retire Early. The planner takes your age, income, expenses, existing savings, and target retirement age — then calculates exactly how much SIP you need to start today to reach your corpus by retirement. It uses the standard 4% withdrawal rate, meaning your corpus target is 25× your annual expenses.' },
      { q: 'Is FinWise AI safe to use?', a: 'Yes. All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We store data in Firebase (Google Cloud) Mumbai region — within India. We never sell your data. We never use your personal data to train AI models.' },
    ],
  },
  {
    icon: '🧾', title: 'Tax Wizard',
    articles: [
      { q: 'What tax slabs does FinWise AI use?', a: 'We use the latest FY 2025-26 slabs. Old Regime: 0–2.5L @ 0%, 2.5–5L @ 5%, 5–10L @ 20%, 10L+ @ 30%. New Regime: 0–3L @ 0%, 3–7L @ 5%, 7–10L @ 10%, 10–12L @ 15%, 12–15L @ 20%, 15L+ @ 30%. The new regime 87A rebate (zero tax up to ₹7L taxable income) is also applied.' },
      { q: 'Can I upload my Form 16?', a: 'Yes, on Pro plan and above. Upload your Form 16 PDF and FinWise AI will automatically extract your salary, HRA, and deduction details. It then runs the old vs new regime comparison and shows you every deduction you might be missing.' },
      { q: 'What deductions does the Tax Wizard cover?', a: 'Standard Deduction (₹50K old / ₹75K new), 80C (ELSS, PPF, NSC, EPF, life insurance — max ₹1.5L), 80D (health insurance — max ₹25K self / ₹50K parents), 80CCD(1B) NPS (max ₹50K), HRA exemption, 24B home loan interest (max ₹2L), and LTA.' },
      { q: 'Is FinWise AI a tax filing service?', a: 'No. We help you understand your tax liability and identify deductions. For actual tax filing, use the Income Tax portal (incometax.gov.in) or platforms like ClearTax. We recommend consulting a CA for complex tax situations.' },
    ],
  },
  {
    icon: '📊', title: 'MF Portfolio X-Ray',
    articles: [
      { q: 'How do I get my CAMS statement?', a: 'Visit myCAMS.com or send an email to investor@camsonline.com from your registered email. You will receive a consolidated account statement (CAS) with all your mutual fund holdings across all AMCs. Alternatively, visit KFintech.com for KFin-serviced funds.' },
      { q: 'What is XIRR and why is it better than absolute return?', a: 'XIRR (Extended Internal Rate of Return) accounts for the timing of each SIP installment. If you invest ₹5,000/month for 5 years, the first installment has been invested longer than the last. Absolute return treats all investments as if made on day one — which overstates returns for regular SIPs. XIRR gives you the true annualized return.' },
      { q: 'What is fund overlap and why does it matter?', a: 'Fund overlap means two or more of your mutual funds hold the same stocks. If you own 5 large-cap funds, they likely all hold HDFC Bank, Reliance, and Infosys. You think you\'re diversified but you\'re not — you have concentrated exposure. The X-Ray detects this and recommends consolidation.' },
      { q: 'What is expense ratio drag?', a: 'Every mutual fund charges an annual expense ratio (typically 0.5–2.5%) deducted from the fund NAV. On a ₹5 lakh portfolio with 1.5% expense ratio, you\'re paying ₹7,500/year even if you do nothing. Switching to index funds (0.1–0.2% expense ratio) can save ₹6,500+ per year compounding over decades.' },
    ],
  },
  {
    icon: '🤖', title: 'AI Advisor',
    articles: [
      { q: 'What languages does the AI advisor support?', a: 'Hindi, English, Hinglish (mixed Hindi-English), Tamil, Telugu, and Bengali. The AI automatically detects your language and responds in the same language. You can switch languages mid-conversation.' },
      { q: 'Can the AI advisor give me stock tips?', a: 'No. We deliberately don\'t provide specific stock recommendations. The AI advises on category-level decisions (large-cap vs mid-cap MF, equity vs debt allocation, etc.) but doesn\'t say "buy X stock." This protects you from potential manipulation and is aligned with SEBI guidelines.' },
      { q: 'Is the AI always right?', a: 'No AI is always right. We strongly recommend verifying important financial decisions with a SEBI-registered investment adviser. Our AI is an excellent starting point and educational tool — not a substitute for professional advice for major financial decisions.' },
      { q: 'How is my chat history stored?', a: 'Your conversation history is stored in Firebase Firestore, encrypted and accessible only to you. We do not share your conversations with any third party. You can delete your chat history at any time from Settings.' },
    ],
  },
  {
    icon: '💳', title: 'Billing & Plans',
    articles: [
      { q: 'What payment methods are accepted?', a: 'We accept all major payment methods via Razorpay: UPI (GPay, PhonePe, Paytm), credit/debit cards (Visa, Mastercard, RuPay), and net banking. All transactions are in Indian Rupees and include GST.' },
      { q: 'Can I upgrade or downgrade my plan?', a: 'Yes, at any time. Upgrades take effect immediately and are prorated. Downgrades take effect at the next billing cycle. There\'s no lock-in — you can cancel anytime.' },
      { q: 'Is there a free trial?', a: 'Yes. New users get a 14-day free trial on the Pro plan (no credit card required). After 14 days, you automatically move to the Free plan unless you add a payment method.' },
      { q: 'What is your refund policy?', a: 'We offer a 7-day money-back guarantee for new subscriptions. If you\'re not satisfied within 7 days of your first paid charge, email sumitranjanhisu@gmail.com and we\'ll process a full refund. Annual plan refunds are prorated.' },
    ],
  },
];

export default function HelpPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="pt-14 pb-10 text-center">
            <div className="section-label">Help Center</div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">How Can We Help?</h1>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">Find answers to common questions or reach out to our support team.</p>
          </div>

          {/* Search bar (decorative) */}
          <div className="max-w-xl mx-auto mb-14">
            <div className="relative">
              <input type="text" placeholder="Search help articles... (e.g. 'how to upload Form 16')" className="input py-4 pl-5 pr-12 w-full text-base" />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</button>
            </div>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-10">
            {categories.map(cat => (
              <section key={cat.title}>
                <h2 className="flex items-center gap-3 text-xl font-bold text-white mb-5">
                  <span className="text-2xl">{cat.icon}</span>{cat.title}
                </h2>
                <div className="space-y-3">
                  {cat.articles.map(article => (
                    <details key={article.q} className="card group">
                      <summary className="px-6 py-4 cursor-pointer list-none flex items-center justify-between font-semibold text-white hover:text-blue-300 transition-colors">
                        <span className="text-sm md:text-base">{article.q}</span>
                        <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg ml-4 flex-shrink-0">▾</span>
                      </summary>
                      <div className="px-6 pb-5 pt-0">
                        <p className="text-sm text-slate-400 leading-relaxed">{article.a}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Contact support */}
          <div className="mt-16 card p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: '💬', title: 'Live Chat', desc: 'Chat with our support team Monday–Friday, 9 AM–6 PM IST.', action: 'Start Chat', href: '#' },
                { icon: '📧', title: 'Email Support', desc: 'Send us a message and we\'ll respond within 4 business hours.', action: 'Email Us', href: 'mailto:sumitranjanhisu@gmail.com' },
                { icon: '📞', title: 'Phone Support', desc: 'For urgent issues: +91 73660 06363 (Mon–Fri, 9 AM–6 PM).', action: 'Call Now', href: 'tel:+919876543210' },
              ].map(c => (
                <div key={c.title} className="text-center">
                  <span className="text-4xl block mb-3">{c.icon}</span>
                  <h3 className="font-bold text-white mb-2">{c.title}</h3>
                  <p className="text-sm text-slate-400 mb-4">{c.desc}</p>
                  <a href={c.href} className="btn-secondary btn-sm">{c.action}</a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
