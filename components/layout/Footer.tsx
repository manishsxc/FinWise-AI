'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Twitter, Linkedin, Youtube, Instagram, Download } from 'lucide-react';

const cols = {
  Product: [
    { l: 'FIRE Path Planner',   h: '/features#fire' },
    { l: 'Tax Wizard',          h: '/features#tax' },
    { l: 'MF Portfolio X-Ray',  h: '/features#mf' },
    { l: 'AI Advisor',          h: '/advisor' },
    { l: 'Goals & Badges',      h: '/goals' },
    { l: 'Scenario Simulator',  h: '/scenario' },
    { l: 'Money Health Score',  h: '/features#health' },
    { l: 'Weekly Reports',      h: '/reports' },
  ],
  Segments: [
    { l: 'Individual / Salaried',    h: '/segments/individual' },
    { l: 'Business Owners',          h: '/segments/business' },
    { l: 'Finance Professionals',    h: '/segments/professional' },
    { l: 'Banks & NBFCs',            h: '/segments/banking' },
    { l: 'Couple Money Planner',     h: '/segments/couple' },
    { l: 'NRI Planning',             h: '/segments/nri' },
  ],
  Company: [
    { l: 'About Us',           h: '/about' },
    { l: 'Careers',            h: '/careers' },
    { l: 'Blog',               h: '/blog' },
    { l: 'Press Kit',          h: '/press' },
    { l: 'Contact',            h: '/contact' },
    { l: 'Investor Relations', h: '/investors' },
  ],
  Support: [
    { l: 'Help Center',       h: '/help' },
    { l: 'API Docs',          h: '/docs' },
    { l: 'Security',          h: '/security' },
    { l: 'Community',         h: '/community' },
    { l: 'Feature Requests',  h: '/feedback' },
    { l: 'Status Page',       h: 'https://status.finwise.ai' },
  ],
};

const legal = [
  { l: 'Privacy Policy',       h: '/privacy' },
  { l: 'Terms of Service',     h: '/terms' },
  { l: 'Cookie Policy',        h: '/cookies' },
  { l: 'SEBI Disclaimer',      h: '/disclaimer' },
  { l: 'Refund Policy',        h: '/refund' },
  { l: 'Grievance Redressal',  h: '/grievance' },
];

const socials = [
  { href: 'https://twitter.com/finwiseai',          Icon: Twitter,   label: 'Twitter' },
  { href: 'https://linkedin.com/company/finwiseai', Icon: Linkedin,  label: 'LinkedIn' },
  { href: 'https://youtube.com/@finwiseai',         Icon: Youtube,   label: 'YouTube' },
  { href: 'https://instagram.com/finwiseai',        Icon: Instagram, label: 'Instagram' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#060a12] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-blue-500 to-cyan-500 flex-shrink-0 shadow-lg">
                <Image src="/logo.png" alt="FinWise AI" width={40} height={40} className="object-cover w-full h-full" />
              </div>
              <span className="font-bold text-xl text-white">Fin<span className="text-blue-400">Wise</span> AI</span>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed mb-5 max-w-xs">
              India&apos;s AI-powered financial OS. Making world-class financial advice accessible to every Indian at ₹499/month. Built at KIIT University, Bhubaneswar.
            </p>

            {/* Founders */}
            <div className="space-y-3 mb-5">
              <div className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Founders</div>

              <div className="bg-slate-800/60 rounded-xl p-3 border border-white/5">
                <div className="text-xs font-semibold text-white mb-2">
                  Sumit Kumar — CEO &amp; Co-founder
                </div>
                <a href="mailto:sumitranjanhisu@gmail.com" className="flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 transition-colors mb-1">
                  <Mail className="w-3.5 h-3.5 flex-shrink-0" />sumitranjanhisu@gmail.com
                </a>
                <a href="tel:+917366006363" className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors">
                  <Phone className="w-3.5 h-3.5 flex-shrink-0" />+91 73660 06363
                </a>
              </div>

              <div className="bg-slate-800/60 rounded-xl p-3 border border-white/5">
                <div className="text-xs font-semibold text-white mb-2">
                  Mehak Singhal — CTO &amp; Co-founder
                </div>
                <a href="mailto:singhalmehak04@gmail.com" className="flex items-center gap-2 text-xs text-purple-400 hover:text-purple-300 transition-colors mb-1">
                  <Mail className="w-3.5 h-3.5 flex-shrink-0" />singhalmehak04@gmail.com
                </a>
                <a href="tel:+917080640233" className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors">
                  <Phone className="w-3.5 h-3.5 flex-shrink-0" />+91 70806 40233
                </a>
              </div>

              <div className="flex items-start gap-2 text-xs text-slate-500 pt-1">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-blue-400" />
                <span>KIIT University, Bhubaneswar, Odisha — 751024</span>
              </div>
            </div>

            <div className="flex gap-2">
              {socials.map(({ href, Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/50 transition-colors">
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(cols).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">{section}</h3>
              <ul className="space-y-2.5">
                {links.map(({ l, h }) => (
                  <li key={l}>
                    <Link href={h} className="text-sm text-slate-400 hover:text-white transition-colors">{l}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* App download + PWA */}
        <div className="py-8 border-y border-white/10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div>
              <h3 className="text-sm font-bold text-white mb-1">Download FinWise AI</h3>
              <p className="text-xs text-slate-400">Available on iOS, Android, and as a Progressive Web App (PWA) — install directly from your browser.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {/* App Store */}
              <a href="https://apps.apple.com/in/app/finwise-ai" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-2.5 bg-slate-900 border border-white/10 rounded-xl hover:border-white/20 transition-colors">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div>
                  <div className="text-[10px] text-slate-400">Download on the</div>
                  <div className="text-sm font-semibold text-white">App Store</div>
                </div>
              </a>

              {/* Google Play */}
              <a href="https://play.google.com/store/apps/details?id=ai.finwise.app" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-2.5 bg-slate-900 border border-white/10 rounded-xl hover:border-white/20 transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                  <path d="M3.18 23.28c.35.19.75.2 1.12.04l11.37-6.57-2.54-2.54-9.95 9.07z" fill="#EA4335"/>
                  <path d="M20.68 10.04l-2.83-1.64-2.83 2.83 2.83 2.83 2.86-1.65c.82-.47.82-1.9-.03-2.37z" fill="#FBBC04"/>
                  <path d="M4.3.72C3.93.56 3.53.57 3.18.76L13.13 10.7l2.54-2.54L4.3.72z" fill="#4285F4"/>
                  <path d="M3.18.76c-.35.19-.56.54-.56 1.02v20.44c0 .48.21.83.56 1.02l.09.08L13.81 12.1v-.2L3.27.68l-.09.08z" fill="#34A853"/>
                </svg>
                <div>
                  <div className="text-[10px] text-slate-400">Get it on</div>
                  <div className="text-sm font-semibold text-white">Google Play</div>
                </div>
              </a>

              {/* PWA install button */}
              <div id="footer-pwa-trigger"
                className="flex items-center gap-3 px-4 py-2.5 bg-emerald-950/50 border border-emerald-700/40 rounded-xl cursor-pointer hover:bg-emerald-950/70 transition-colors"
                onClick={() => {
                  // Trigger navbar PWA install if available
                  const event = new CustomEvent('pwa-install-request');
                  window.dispatchEvent(event);
                }}>
                <Download className="w-6 h-6 text-emerald-400" />
                <div>
                  <div className="text-[10px] text-emerald-500">Install directly</div>
                  <div className="text-sm font-semibold text-emerald-300">PWA (Web App)</div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-600 mt-3">
            💡 <strong className="text-slate-500">PWA tip:</strong> In Chrome/Edge, click the install icon (⊕) in the address bar, or tap &quot;Add to Home Screen&quot; in Safari/Chrome mobile to install FinWise AI as an app — no App Store required.
          </p>
        </div>

        {/* Trust badges */}
        <div className="pt-6 flex flex-wrap gap-3 mb-6">
          {[
            { t: 'SEBI Compliant',  c: 'text-emerald-400 border-emerald-800/50 bg-emerald-950/50' },
            { t: 'SSL Secured',     c: 'text-blue-400    border-blue-800/50   bg-blue-950/50' },
            { t: 'ISO 27001',       c: 'text-purple-400  border-purple-800/50 bg-purple-950/50' },
            { t: 'SOC 2 Type II',   c: 'text-amber-400   border-amber-800/50  bg-amber-950/50' },
            { t: 'GDPR Ready',      c: 'text-cyan-400    border-cyan-800/50   bg-cyan-950/50' },
            { t: 'RBI Guidelines',  c: 'text-orange-400  border-orange-800/50 bg-orange-950/50' },
          ].map(b => (
            <span key={b.t} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${b.c}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current" />{b.t}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 bg-black/30">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
            <div className="text-xs text-slate-500 text-center md:text-left">
              <p>
                © {year} <strong className="text-slate-400">FinWise AI</strong> — Built by{' '}
                <a href="mailto:sumitranjanhisu@gmail.com" className="text-blue-400 hover:underline">Sumit Kumar</a>
                {' '}&amp;{' '}
                <a href="mailto:singhalmehak04@gmail.com" className="text-purple-400 hover:underline">Mehak Singhal</a>
                , KIIT University, Bhubaneswar
              </p>
              <p className="mt-0.5 text-slate-600">
                📞 Sumit: +91 73660 06363 · Mehak: +91 70806 40233
              </p>
            </div>
            <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              {legal.map(({ l, h }) => (
                <Link key={l} href={h} className="text-xs text-slate-500 hover:text-slate-300 transition-colors whitespace-nowrap">{l}</Link>
              ))}
            </nav>
          </div>
          {/* SEBI disclaimer */}
          <div className="pt-4 border-t border-white/5">
            <p className="text-[11px] text-slate-600 text-center leading-relaxed max-w-5xl mx-auto">
              <strong className="text-slate-500">⚠️ SEBI Disclaimer:</strong> FinWise AI is a financial technology platform providing AI-generated educational content and financial planning tools. It does not provide investment advice as defined under SEBI (Investment Advisers) Regulations, 2013. All information is for educational purposes only. Mutual fund investments are subject to market risks. Past performance is not indicative of future returns. Please read all scheme-related documents carefully. Consult a SEBI-registered investment adviser before making any investment decisions.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
