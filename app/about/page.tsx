import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'About Us — FinWise AI',
  description: 'FinWise AI is built by Sumit Kumar and Mehak Singhal from KIIT University, Bhubaneswar. On a mission to make financial planning accessible to every Indian.',
};

const team = [
  {
    name: 'Sumit Kumar', role: 'CEO & Co-founder', bg: 'KIIT University, Bhubaneswar',
    bio: 'Passionate about democratizing financial planning for India. Built FinWise AI to give every Indian the same quality financial advice that costs ₹25,000+/year from a human CA.',
    avatar: 'SK', phone: '+91 73660 06363', email: 'sumitranjanhisu@gmail.com',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Mehak Singhal', role: 'CTO & Co-founder', bg: 'KIIT University, Bhubaneswar',
    bio: 'Full-stack engineer and AI enthusiast. Leads all product development and technical architecture at FinWise AI. Believes AI can democratize financial expertise the way the internet democratized information.',
    avatar: 'MS', phone: '+91 70806 40233', email: 'singhalmehak04@gmail.com',
    color: 'from-purple-500 to-pink-500',
  },
];

const values = [
  { icon: '🎯', title: 'Radical Accessibility', desc: "World-class financial advice should not be a luxury. We build every feature with the 28-year-old salaried professional in Bhopal in mind — not just the HNI in South Mumbai." },
  { icon: '🔒', title: 'Privacy First', desc: "Your financial data is yours. We never sell it, never share it, and never use it to train AI models." },
  { icon: '🇮🇳', title: 'Built for India', desc: "Built ground-up for Indian tax laws, Indian markets, Indian languages, and Indian financial aspirations." },
  { icon: '🧠', title: 'Honest Intelligence', desc: "We are clear that we are not licensed financial advisors. Our AI gives you the best information to make informed decisions." },
  { icon: '📏', title: 'No Conflicts of Interest', desc: "We don't push specific mutual funds because fund houses pay us more. Our recommendations are driven by what's best for you." },
  { icon: '💡', title: 'Simplicity Over Complexity', desc: "Financial jargon is a barrier. We translate complex concepts into clear Hindi and English." },
];

const milestones = [
  { year: '2025', month: 'Jan', event: 'Founded by Sumit Kumar and Mehak Singhal at KIIT University, Bhubaneswar.' },
  { year: '2025', month: 'Jun', event: 'Built first version of Tax Wizard — found ₹18,000+ in missed deductions for early beta users.' },
  { year: '2025', month: 'Sep', event: 'Launched FIRE Planner and MF Portfolio X-Ray. Integrated Claude AI for conversational advisor in Hindi and English.' },
  { year: '2026', month: 'Jan', event: 'Launched full platform with 15+ tools. First business client onboarded. Crossed 10,000 registered users.' },
  { year: '2026', month: 'Mar', event: 'ET AI Hackathon 2026 finalist — Problem Statement #9. Raising ₹2Cr seed round.' },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 pb-20">
        <div className="max-w-5xl mx-auto px-6 pt-14 pb-16 text-center">
          <div className="section-label">Our story</div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
            Making Financial Expertise<br />
            <span className="gradient-text">Accessible to Every Indian</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            FinWise AI was born at KIIT University, Bhubaneswar from a simple frustration: why does excellent financial advice cost ₹25,000+ a year when 95% of Indians have no financial plan?
          </p>
        </div>

        {/* Stats */}
        <div className="max-w-4xl mx-auto px-6 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { val: '14 Crore+', label: 'Target users', color: 'text-blue-400' },
              { val: '95%', label: 'Indians with no financial plan', color: 'text-red-400' },
              { val: '₹25,000+', label: 'Annual CA cost', color: 'text-amber-400' },
              { val: '₹499', label: 'Our monthly Pro plan', color: 'text-emerald-400' },
            ].map(s => (
              <div key={s.label} className="card p-5 text-center">
                <div className={`text-2xl font-extrabold font-mono ${s.color} mb-1`}>{s.val}</div>
                <div className="text-xs text-slate-400 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission */}
        <div className="max-w-3xl mx-auto px-6 text-center mb-20">
          <div className="section-label">Our mission</div>
          <blockquote className="text-3xl md:text-4xl font-bold text-white leading-snug">
            &ldquo;Make world-class financial planning as accessible as checking WhatsApp — for every Indian, in every language.&rdquo;
          </blockquote>
          <p className="text-slate-400 mt-4">— Sumit Kumar, CEO &amp; Co-founder</p>
        </div>

        {/* Values */}
        <div className="max-w-7xl mx-auto px-6 mb-20">
          <div className="text-center mb-10">
            <div className="section-label">What we believe</div>
            <h2 className="text-3xl font-extrabold text-white">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map(v => (
              <div key={v.title} className="card p-6">
                <span className="text-3xl block mb-3">{v.icon}</span>
                <h3 className="font-bold text-white mb-2">{v.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto px-6 mb-20">
          <div className="text-center mb-10">
            <div className="section-label">Our journey</div>
            <h2 className="text-3xl font-extrabold text-white">Milestones</h2>
          </div>
          <div className="space-y-4">
            {milestones.map((m, i) => (
              <div key={i} className="flex gap-5 items-start">
                <div className="flex-shrink-0 w-20 text-right">
                  <div className="text-xs font-mono text-slate-500">{m.year}</div>
                  <div className="text-sm font-bold text-blue-400">{m.month}</div>
                </div>
                <div className="flex-shrink-0 mt-1.5">
                  <div className="w-3 h-3 rounded-full bg-blue-600 border-2 border-blue-400" />
                  {i < milestones.length - 1 && <div className="w-0.5 h-10 bg-white/10 ml-1 mt-1" />}
                </div>
                <div className="card p-4 flex-1 -mt-0.5">
                  <p className="text-sm text-slate-300 leading-relaxed">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="max-w-5xl mx-auto px-6 mb-20">
          <div className="text-center mb-10">
            <div className="section-label">The founders</div>
            <h2 className="text-3xl font-extrabold text-white mb-3">Meet the Team</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Two students from KIIT University, Bhubaneswar who believe financial expertise should be democratized.</p>
          </div>

          {/* Logo showcase */}
          <div className="flex justify-center mb-10">
            <div className="w-32 h-32 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <Image src="/logo.png" alt="FinWise AI Logo" width={128} height={128} className="object-cover w-full h-full" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {team.map(member => (
              <div key={member.name} className="card p-8">
                <div className="flex items-center gap-5 mb-5">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-lg`}>
                    {member.avatar}
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">{member.name}</div>
                    <div className="text-blue-400 font-semibold text-sm">{member.role}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{member.bg}</div>
                  </div>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed mb-5">{member.bio}</p>
                <div className="space-y-2 pt-4 border-t border-white/10">
                  <a href={`tel:${member.phone.replace(/\s/g,'')}`} className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors">
                    <span>📞</span> {member.phone}
                  </a>
                  <a href={`mailto:${member.email}`} className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                    <span>✉️</span> {member.email}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 card p-6 text-center">
            <div className="text-3xl mb-3">🎓</div>
            <h3 className="font-bold text-white mb-2">Proudly Built at KIIT University, Bhubaneswar</h3>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">Kalinga Institute of Industrial Technology (KIIT). Built during ET AI Hackathon 2026 — Problem Statement #9.</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Join Our Mission</h2>
          <p className="text-slate-400 mb-8">Whether you&apos;re a user, investor, or potential team member — we&apos;d love to connect.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn-primary btn-lg">Try FinWise AI Free</Link>
            <Link href="/contact" className="btn-secondary btn-lg">Get in Touch</Link>
            <Link href="/investors" className="btn-secondary btn-lg">Invest</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
