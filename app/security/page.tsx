import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Security — FinWise AI',
  description: 'How FinWise AI protects your financial data. AES-256 encryption, SOC2 compliance, SEBI guidelines, and responsible disclosure.',
};

export default function SecurityPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="pt-14 pb-12 text-center">
            <div className="section-label">Security</div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Your Financial Data is <span className="gradient-text">Fortress-Level Safe</span></h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">We hold ourselves to banking-grade security standards. Here's exactly how we protect your most sensitive data.</p>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-14">
            {['AES-256 Encryption', 'TLS 1.3 in Transit', 'SOC 2 Type II', 'ISO 27001', 'SEBI Compliant', 'RBI Guidelines', 'GDPR Ready', 'India Data Residency'].map(b => (
              <span key={b} className="badge badge-green text-sm">{b}</span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
            {[
              { icon: '🔒', title: 'Encryption at Rest', desc: 'All your financial data — salary details, portfolio information, Form 16 documents, CAMS statements — is encrypted at rest using AES-256 encryption in Firebase/Google Cloud. Even Google employees cannot read your data without your authentication.' },
              { icon: '🔐', title: 'Encryption in Transit', desc: 'All data transmission between your browser, our servers, and Firebase uses TLS 1.3 — the same standard used by banks and payment processors. This prevents man-in-the-middle attacks.' },
              { icon: '🇮🇳', title: 'India Data Residency', desc: 'All user data is stored in Google Cloud\'s Mumbai (asia-south1) region. Your financial information never leaves India. This ensures compliance with Indian data localization requirements.' },
              { icon: '🤖', title: 'AI Data Handling', desc: 'When processing your queries through Claude AI (Anthropic), we anonymize personally identifiable information before the API call. We have a data processing agreement with Anthropic that explicitly prohibits using our users\' data for AI training.' },
              { icon: '🔑', title: 'Authentication Security', desc: 'We use industry-standard bcrypt (cost factor 12) for password hashing. Passwords are salted and never stored in plaintext. We support Google OAuth 2.0 for passwordless sign-in. JWT tokens expire every 30 days.' },
              { icon: '🛡️', title: 'Security Headers', desc: 'Our web app implements a comprehensive set of security headers: X-Frame-Options (DENY), X-Content-Type-Options (nosniff), Strict-Transport-Security (HSTS), and Content Security Policy to prevent XSS attacks.' },
              { icon: '📝', title: 'Audit Trail', desc: 'Every AI recommendation, every calculator result, and every login is logged with timestamp, IP address, and session ID. This audit trail is retained for 2 years for security and compliance purposes.' },
              { icon: '🚨', title: 'Breach Notification', desc: 'In the event of a data breach, we will notify affected users within 72 hours as required by IT Act 2000. We\'ve never had a breach, but our incident response plan is tested quarterly.' },
            ].map(item => (
              <div key={item.title} className="card p-6">
                <span className="text-3xl block mb-3">{item.icon}</span>
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* What we never do */}
          <div className="card p-8 mb-10">
            <h2 className="text-xl font-bold text-white mb-5">What We Will Never Do</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                'Sell your personal financial data to any third party',
                'Use your data to train AI models without explicit consent',
                'Store your banking passwords or net banking credentials',
                'Access your accounts directly — we use statement uploads only',
                'Share your information with advertisers',
                'Store your payment card details on our servers',
                'Send your data outside India without your knowledge',
                'Keep your data after you delete your account (30-day purge)',
              ].map(item => (
                <div key={item} className="flex items-start gap-3 text-sm text-slate-300">
                  <span className="text-red-400 font-bold flex-shrink-0 mt-0.5">✗</span>{item}
                </div>
              ))}
            </div>
          </div>

          {/* Responsible disclosure */}
          <div className="card p-8 text-center">
            <h2 className="text-xl font-bold text-white mb-3">Responsible Disclosure</h2>
            <p className="text-slate-400 max-w-xl mx-auto mb-5">Found a security vulnerability? We take all reports seriously and respond within 24 hours. We offer recognition in our security hall of fame for valid disclosures.</p>
            <a href="mailto:sumitranjanhisu@gmail.com" className="btn-primary">sumitranjanhisu@gmail.com</a>
            <p className="text-xs text-slate-500 mt-3">Please do not publicly disclose vulnerabilities before we've had a chance to fix them. We follow a 90-day coordinated disclosure policy.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
