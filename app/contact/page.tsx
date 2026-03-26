import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us — FinWise AI',
  description: 'Get in touch with FinWise AI founders Sumit Kumar and Mehak Singhal from KIIT University, Bhubaneswar.',
};

const contacts = [
  {
    icon: Mail,
    color: 'text-blue-400',
    title: 'Sumit Kumar — CEO',
    value: 'sumitranjanhisu@gmail.com',
    href: 'mailto:sumitranjanhisu@gmail.com',
    sub: 'General enquiries, partnerships, media',
  },
  {
    icon: Phone,
    color: 'text-emerald-400',
    title: 'Sumit Kumar',
    value: '+91 73660 06363',
    href: 'tel:+917366006363',
    sub: 'Mon–Sat, 9 AM–8 PM IST',
  },
  {
    icon: Phone,
    color: 'text-purple-400',
    title: 'Mehak Singhal — CTO',
    value: '+91 70806 40233',
    href: 'tel:+917080640233',
    sub: 'Technical & product enquiries',
  },
  {
    icon: Mail,
    color: 'text-amber-400',
    title: 'General Support',
    value: 'sumitranjanhisu@gmail.com',
    href: 'mailto:sumitranjanhisu@gmail.com',
    sub: 'Response within 4 hours',
  },
  {
    icon: Mail,
    color: 'text-cyan-400',
    title: 'Enterprise / B2B',
    value: 'sumitranjanhisu@gmail.com',
    href: 'mailto:sumitranjanhisu@gmail.com',
    sub: 'Banks, NBFCs, white-label',
  },
  {
    icon: Mail,
    color: 'text-rose-400',
    title: 'Investor Relations',
    value: 'sumitranjanhisu@gmail.com',
    href: 'mailto:sumitranjanhisu@gmail.com',
    sub: 'Raising ₹2Cr seed round',
  },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="pt-14 pb-12 text-center">
            <div className="section-label">Get in touch</div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              We&apos;d Love to Hear From You
            </h1>
            <p className="text-xl text-slate-400 max-w-xl mx-auto">
              Built by two founders from KIIT University, Bhubaneswar. We respond to every message personally.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left — contacts */}
            <div className="space-y-4">
              {/* Founder cards */}
              <div className="card p-6">
                <h3 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Founders — KIIT Bhubaneswar</h3>

                <div className="space-y-5">
                  {/* Sumit */}
                  <div className="pb-5 border-b border-white/10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">SK</div>
                      <div>
                        <div className="font-bold text-white text-sm">Sumit Kumar</div>
                        <div className="text-xs text-blue-400">CEO & Co-founder</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <a href="mailto:sumitranjanhisu@gmail.com" className="flex items-center gap-2.5 text-sm text-slate-300 hover:text-white transition-colors">
                        <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                        sumitranjanhisu@gmail.com
                      </a>
                      <a href="tel:+917366006363" className="flex items-center gap-2.5 text-sm text-slate-300 hover:text-white transition-colors">
                        <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                        +91 73660 06363
                      </a>
                    </div>
                  </div>

                  {/* Mehak */}
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">MS</div>
                      <div>
                        <div className="font-bold text-white text-sm">Mehak Singhal</div>
                        <div className="text-xs text-purple-400">CTO & Co-founder</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <a href="tel:+917080640233" className="flex items-center gap-2.5 text-sm text-slate-300 hover:text-white transition-colors">
                        <Phone className="w-4 h-4 text-purple-400 flex-shrink-0" />
                        +91 70806 40233
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* College */}
              <div className="card p-5">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-white text-sm mb-1">KIIT University</div>
                    <div className="text-sm text-slate-400">Kalinga Institute of Industrial Technology<br />Bhubaneswar, Odisha — 751024</div>
                  </div>
                </div>
              </div>

              {/* Other contacts */}
              <div className="card p-5 space-y-4">
                <h3 className="font-bold text-white text-sm">Other Enquiries</h3>
                {[
                  { label: 'Product Support', val: 'sumitranjanhisu@gmail.com', color: 'text-emerald-400', href: 'mailto:sumitranjanhisu@gmail.com' },
                  { label: 'Enterprise / B2B', val: 'sumitranjanhisu@gmail.com', color: 'text-purple-400', href: 'mailto:sumitranjanhisu@gmail.com' },
                  { label: 'Investor Relations', val: 'sumitranjanhisu@gmail.com', color: 'text-amber-400', href: 'mailto:sumitranjanhisu@gmail.com' },
                  { label: 'Press / Media', val: 'sumitranjanhisu@gmail.com', color: 'text-cyan-400', href: 'mailto:sumitranjanhisu@gmail.com' },
                ].map(c => (
                  <div key={c.label}>
                    <div className="text-xs font-semibold text-slate-400 mb-0.5">{c.label}</div>
                    <a href={c.href} className={`text-sm ${c.color} hover:underline`}>{c.val}</a>
                  </div>
                ))}
              </div>

              {/* Response times */}
              <div className="card p-5">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-white text-sm mb-2">Response Times</div>
                    <div className="space-y-1 text-xs text-slate-400">
                      <div>📧 Support email — within 4 hours</div>
                      <div>🏢 Enterprise — within 24 hours</div>
                      <div>💰 Investors — within 48 hours</div>
                      <div>📞 Phone — Mon–Sat 9 AM–8 PM IST</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Contact form */}
            <div className="lg:col-span-2 card p-8">
              <h2 className="text-xl font-bold text-white mb-2">Send Us a Message</h2>
              <p className="text-sm text-slate-400 mb-6">We personally read and respond to every message.</p>

              <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Your Full Name</label>
                    <input type="text" className="input" placeholder="Rahul Sharma" required />
                  </div>
                  <div>
                    <label className="label">Email Address</label>
                    <input type="email" className="input" placeholder="rahul@example.com" required />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Phone Number (optional)</label>
                    <input type="tel" className="input" placeholder="+91 73660 06363" />
                  </div>
                  <div>
                    <label className="label">Type of Enquiry</label>
                    <select className="input">
                      <option value="">Select type…</option>
                      <option>Product / App Support</option>
                      <option>Enterprise / White-label</option>
                      <option>Investor Relations</option>
                      <option>Partnership</option>
                      <option>Press / Media</option>
                      <option>Careers</option>
                      <option>Feedback</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="label">Company / College (optional)</label>
                  <input type="text" className="input" placeholder="HDFC Bank, IIT Delhi, Freelancer…" />
                </div>
                <div>
                  <label className="label">Your Message</label>
                  <textarea
                    className="input min-h-[140px] resize-none"
                    placeholder="Tell us what's on your mind. For enterprise enquiries, please mention your expected user volume."
                    required
                  />
                </div>
                <div className="flex items-start gap-3">
                  <input type="checkbox" id="agree" className="w-4 h-4 mt-0.5 rounded accent-blue-500" required />
                  <label htmlFor="agree" className="text-xs text-slate-400 leading-relaxed cursor-pointer">
                    I agree to FinWise AI&apos;s{' '}
                    <a href="/privacy" className="text-blue-400 hover:text-blue-300">Privacy Policy</a>. My data will be used only to respond to this enquiry.
                  </label>
                </div>
                <button type="submit" className="btn-primary w-full py-3 text-sm">
                  Send Message →
                </button>
              </form>
            </div>
          </div>

          {/* Enterprise CTA */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-blue-950/50 to-cyan-950/30 border border-blue-800/30 p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">🏦 Banks & NBFCs</h2>
                <p className="text-slate-400 leading-relaxed">
                  Looking to white-label FinWise AI inside your banking app? Custom enterprise plans, SDK integration in under 1 week.
                </p>
              </div>
              <div className="space-y-2.5">
                {['Custom pricing from ₹15L/year based on MAU', 'White-label SDK — your brand, our AI', 'SOC2, SEBI, RBI guidelines compliant', 'Revenue share model available'].map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-slate-300">
                    <span className="text-emerald-400 flex-shrink-0">✓</span>{f}
                  </div>
                ))}
                <div className="pt-2">
                  <a href="mailto:sumitranjanhisu@gmail.com" className="btn-primary inline-flex text-sm">
                    Schedule Enterprise Demo →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Grievance */}
          <div className="mt-8 card p-6 text-center">
            <h3 className="font-bold text-white mb-1">Grievance Officer</h3>
            <p className="text-sm text-slate-400 mb-3">As per IT Act 2000 and Consumer Protection Act 2019</p>
            <div className="inline-flex flex-col items-center gap-1">
              <span className="text-sm font-semibold text-white">Sumit Kumar</span>
              <a href="mailto:sumitranjanhisu@gmail.com" className="text-sm text-blue-400 hover:text-blue-300">sumitranjanhisu@gmail.com</a>
              <span className="text-xs text-slate-500">Response within 30 days</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
