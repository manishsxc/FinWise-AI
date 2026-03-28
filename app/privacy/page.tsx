import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'FinWise AI Privacy Policy — How we collect, use, and protect your financial data.',
};

const sections = [
  {
    title: '1. Information We Collect',
    content: `We collect information you provide directly to us when you create an account, use our services, or contact us for support.

**Personal Information:** Name, email address, phone number, and profile information.

**Financial Information:** Salary details, investment portfolio data, Form 16 documents, CAMS/KFintech statements, bank SMS data (processed locally on your device), and other financial documents you voluntarily upload.

**Usage Data:** How you interact with our platform, features you use, queries you make to our AI advisor, and your financial goals.

**Device Information:** Browser type, operating system, IP address, and device identifiers for security and analytics purposes.

We do NOT collect: Your bank account passwords, net banking credentials, or any information that would give us access to your accounts directly.`,
  },
  {
    title: '2. How We Use Your Information',
    content: `**To provide our services:** Your financial data is used exclusively to generate personalized financial plans, tax analysis, portfolio reviews, and AI advisor responses tailored to you.

**AI Processing:** Your queries and financial data are processed through Anthropic's Claude AI API. We anonymize personally identifiable information before sending data to AI systems wherever possible.

**Communications:** We use your email and phone to send service notifications, SIP reminders, tax deadline alerts, and (with your consent) marketing communications.

**Analytics:** Aggregate, anonymized data helps us improve our platform. We never sell individual user data.

**Legal compliance:** We may process your data to comply with SEBI, RBI, and other applicable Indian regulations.`,
  },
  {
    title: '3. Data Storage and Security',
    content: `**Encryption:** All data is encrypted at rest using AES-256 encryption and in transit using TLS 1.3.

**Document Vault:** Your uploaded documents (Form 16, CAMS statements, insurance policies) are stored in AWS S3 with server-side encryption. Access is restricted to your account only.

**Data Centers:** Primary data is stored in AWS Mumbai (ap-south-1) region, ensuring data residency within India.

**Security Audits:** We undergo regular security audits and penetration testing. We maintain SOC 2 Type II compliance.

**Breach Notification:** In the event of a data breach, we will notify affected users within 72 hours as per IT Act 2000 requirements.

**Retention:** We retain your data for as long as your account is active. Upon account deletion, data is purged within 30 days.`,
  },
  {
    title: '4. Data Sharing',
    content: `**We do NOT sell your personal data to third parties.**

We share data only in these limited circumstances:

**AI Processing Partners:** Anonymized query data is processed by Anthropic (Claude AI). Anthropic does not store or train on your data per our enterprise agreement.

**Payment Processing:** Razorpay processes payments. We share only transaction-relevant information. Your card details are never stored on our servers.

**Email/SMS Services:** Resend and Twilio receive your contact information to deliver notifications you've requested.

**Legal Requirements:** We may disclose data when required by law, court order, or regulatory authorities (SEBI, RBI, Income Tax Department).

**Business Transfers:** In the event of a merger or acquisition, user data may be transferred to the new entity with equivalent privacy protections.`,
  },
  {
    title: '5. Financial Data — Special Protections',
    content: `We treat financial data with the highest level of protection:

**Form 16 & Tax Documents:** Processed only to generate your tax analysis. Not shared with any third party including tax authorities unless legally required.

**CAMS/KFintech Statements:** Used solely for portfolio analysis. Raw statement data is encrypted and accessible only to you.

**Bank SMS Data:** Processed entirely on your device. Raw SMS content is never transmitted to our servers.

**AI Queries:** Financial questions you ask our AI are processed through secured API calls. Conversation history is stored encrypted and accessible only to you.

**SEBI Compliance:** We operate in compliance with SEBI guidelines on data protection for financial intermediaries.`,
  },
  {
    title: '6. Your Rights',
    content: `As a FinWise AI user, you have the following rights:

**Access:** Request a complete copy of all data we hold about you.

**Correction:** Update or correct inaccurate personal information at any time through your profile settings.

**Deletion:** Request deletion of your account and all associated data. We will process this within 30 days.

**Portability:** Export your financial data in JSON or CSV format at any time from your Settings page.

**Opt-out:** Unsubscribe from marketing communications at any time. Service-critical notifications cannot be disabled.

**Grievance Redressal:** Contact our Grievance Officer at sumitranjanhisu@gmail.com or +91-73660-06363 within 30 days of any concern.

To exercise any of these rights, contact us at sumitranjanhisu@gmail.com.`,
  },
  {
    title: '7. Cookies and Tracking',
    content: `**Essential Cookies:** Required for authentication, security, and basic functionality. Cannot be disabled.

**Analytics Cookies:** Google Analytics (GA4) helps us understand usage patterns. IP addresses are anonymized.

**Preference Cookies:** Store your language preference, theme settings, and dashboard layout.

**Marketing Cookies:** Only used with your explicit consent. Can be disabled in Cookie Settings.

We do not use third-party advertising cookies or cross-site tracking technologies.

You can manage cookie preferences through our Cookie Settings panel accessible from the footer.`,
  },
  {
    title: '8. Children\'s Privacy',
    content: `FinWise AI is not intended for users under 18 years of age. We do not knowingly collect personal information from minors.

If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately at sumitranjanhisu@gmail.com and we will delete the information.`,
  },
  {
    title: '9. Changes to This Policy',
    content: `We may update this Privacy Policy periodically. We will notify you of significant changes via:
- Email notification to your registered address
- In-app notification at login
- A notice on our website

Continued use of FinWise AI after changes constitutes acceptance of the updated policy. We encourage you to review this policy regularly.

**Last Updated:** March 22, 2026
**Effective Date:** January 1, 2026
**Version:** 2.1`,
  },
  {
    title: '10. Contact Us',
    content: `**Privacy Officer:** FinWise AI Team
**Email:** sumitranjanhisu@gmail.com
**Phone:** +91-73660-06363
**Address:** FinWise AI Pvt. Ltd., 123, KIIT University, Bhubaneswar, Odisha — 751024

**Grievance Officer:** Anita Krishnan
**Email:** sumitranjanhisu@gmail.com
**Response Time:** Within 30 days as per IT Act 2000

For SEBI-related queries regarding investment advice: compliance@finwise.ai`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="mb-12">
            <div className="badge badge-blue mb-4">Legal</div>
            <h1 className="text-4xl font-extrabold text-white mb-4">Privacy Policy</h1>
            <p className="text-slate-400 text-lg">
              We take your financial data seriously. Here's exactly how we handle it.
            </p>
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-slate-500">
              <span>Last updated: March 22, 2026</span>
              <span>·</span>
              <span>Effective: January 1, 2026</span>
              <span>·</span>
              <span>Version 2.1</span>
            </div>
          </div>

          {/* Key commitments */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {[
              { icon: '🔒', title: 'We Never Sell Your Data', desc: 'Your financial information is never sold to advertisers, data brokers, or third parties.' },
              { icon: '🛡️', title: 'AES-256 Encryption', desc: 'All your data — financial documents, queries, goals — encrypted at rest and in transit.' },
              { icon: '🇮🇳', title: 'India Data Residency', desc: 'All your data is stored in AWS Mumbai (ap-south-1). Stays within India.' },
            ].map((c) => (
              <div key={c.title} className="card p-5">
                <span className="text-2xl block mb-2">{c.icon}</span>
                <h3 className="font-bold text-white text-sm mb-1">{c.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>

          {/* Sections */}
          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.title} className="card p-8">
                <h2 className="text-xl font-bold text-white mb-5 pb-3 border-b border-white/10">{section.title}</h2>
                <div className="space-y-3">
                  {section.content.split('\n\n').map((para, i) => (
                    <p key={i} className="text-sm text-slate-300 leading-relaxed">
                      {para.split('**').map((part, j) =>
                        j % 2 === 1 ? <strong key={j} className="text-white font-semibold">{part}</strong> : part
                      )}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
