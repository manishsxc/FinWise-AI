'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, LayoutDashboard, LogOut, Zap, ChevronDown, Settings, Download } from 'lucide-react';

const featuresMenu = [
  { icon: '📈', label: 'FIRE Path Planner',    desc: 'Retirement roadmap & SIP calculator',   href: '/features#fire' },
  { icon: '🧾', label: 'Tax Wizard',           desc: 'Old vs new regime + Form 16 AI',         href: '/features#tax' },
  { icon: '🔬', label: 'MF Portfolio X-Ray',   desc: 'XIRR, overlap & rebalancing',            href: '/features#mf' },
  { icon: '🤖', label: 'AI Advisor Chatbot',   desc: 'Hindi & English, 24×7',                  href: '/features#advisor' },
  { icon: '🔮', label: 'Scenario Simulator',   desc: '"What if" life event planner',           href: '/features#scenario' },
  { icon: '💯', label: 'Money Health Score',   desc: '6-dimension financial wellness',          href: '/features#health' },
  { icon: '🏆', label: 'Goals & Gamification', desc: 'Track goals, earn badges',               href: '/features#goals' },
  { icon: '📊', label: 'Weekly Report Card',   desc: 'Auto PDF every Sunday',                  href: '/features#reports' },
];

const businessMenu = [
  { icon: '👤', label: 'Individual / Salaried',    desc: 'FIRE, tax, MF planning',             href: '/segments/individual' },
  { icon: '💼', label: 'Business Owners',          desc: 'Cash flow, GST, loan advice',         href: '/segments/business' },
  { icon: '🏛️', label: 'Finance Professionals',   desc: 'Multi-client portfolio AI',           href: '/segments/professional' },
  { icon: '💑', label: 'Couple Money Planner',     desc: 'Joint financial optimization',         href: '/segments/couple' },
  { icon: '🌏', label: 'NRI Planning',             desc: 'Cross-border tax & investments',      href: '/segments/nri' },
];

const banksMenu = [
  { icon: '🏦', label: 'Banks & NBFCs',        desc: 'White-label AI advisor SDK',             href: '/segments/banking' },
  { icon: '🔌', label: 'API Documentation',    desc: 'REST API for your platform',             href: '/docs' },
  { icon: '📋', label: 'Enterprise Pricing',   desc: 'Custom plans from ₹15L/yr',             href: '/contact?enterprise=true' },
  { icon: '🛡️', label: 'Security & Compliance',desc: 'SOC2, SEBI, RBI guidelines',           href: '/security' },
];

type MenuItem = { icon: string; label: string; desc: string; href: string };

function NavDropdown({ items, open, wide }: { items: MenuItem[]; open: boolean; wide?: boolean }) {
  if (!open) return null;
  return (
    <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 animate-fade-in ${wide ? 'w-[480px]' : 'w-72'}`}>
      <div className={`p-2 ${wide ? 'grid grid-cols-2' : ''}`}>
        {items.map((item) => (
          <Link key={item.href} href={item.href}
            className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors group">
            <span className="text-xl mt-0.5 group-hover:scale-110 transition-transform flex-shrink-0">{item.icon}</span>
            <div>
              <div className="text-sm font-semibold text-white leading-tight">{item.label}</div>
              <div className="text-xs text-slate-500 mt-0.5 leading-snug">{item.desc}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function Navbar() {
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPWABtn, setShowPWABtn] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setActiveDropdown(null);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // PWA Install prompt
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPWABtn(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const installPWA = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setShowPWABtn(false);
    setDeferredPrompt(null);
  };

  const toggle = (name: string) => setActiveDropdown(prev => prev === name ? null : name);

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#060a12]/95 backdrop-blur-xl border-b border-white/10 shadow-xl' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0" aria-label="FinWise AI Home">
            <div className="w-9 h-9 rounded-xl overflow-hidden bg-gradient-to-br from-blue-500 to-cyan-500 flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
              <Image src="/logo.png" alt="FinWise AI Logo" width={36} height={36} className="object-cover w-full h-full" />
            </div>
            <span className="font-bold text-lg text-white">Fin<span className="text-blue-400">Wise</span><span className="text-xs text-slate-500 font-normal ml-0.5">AI</span></span>
          </Link>

          {/* Desktop Nav */}
          <div ref={navRef} className="hidden md:flex items-center gap-0.5 relative">
            <div className="relative">
              <button onClick={() => toggle('features')} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${activeDropdown === 'features' ? 'text-white bg-white/8' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}>
                Features <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'features' ? 'rotate-180' : ''}`} />
              </button>
              <NavDropdown items={featuresMenu} open={activeDropdown === 'features'} wide />
            </div>

            <Link href="/pricing" className="px-3 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors">Pricing</Link>

            <div className="relative">
              <button onClick={() => toggle('business')} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${activeDropdown === 'business' ? 'text-white bg-white/8' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}>
                For Business <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'business' ? 'rotate-180' : ''}`} />
              </button>
              <NavDropdown items={businessMenu} open={activeDropdown === 'business'} />
            </div>

            <div className="relative">
              <button onClick={() => toggle('banks')} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${activeDropdown === 'banks' ? 'text-white bg-white/8' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}>
                For Banks <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'banks' ? 'rotate-180' : ''}`} />
              </button>
              <NavDropdown items={banksMenu} open={activeDropdown === 'banks'} />
            </div>

            <Link href="/about" className="px-3 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors">Company</Link>
          </div>

          {/* Auth + PWA */}
          <div className="hidden md:flex items-center gap-2">
            {/* PWA Install button */}
            {showPWABtn && (
              <button onClick={installPWA} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-900/40 text-emerald-300 border border-emerald-700/40 hover:bg-emerald-900/60 transition-colors">
                <Download className="w-3.5 h-3.5" />Install App
              </button>
            )}

            {status === 'loading' ? (
              <div className="w-8 h-8 rounded-full bg-slate-800 animate-pulse" />
            ) : session ? (
              <div className="flex items-center gap-2" ref={userRef}>
                <Link href="/dashboard" className="btn-primary btn-sm flex items-center gap-1.5">
                  <LayoutDashboard className="w-3.5 h-3.5" />Dashboard
                </Link>
                <div className="relative">
                  <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-white/5 transition-colors">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white">
                      {session.user?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl p-2 animate-fade-in">
                      <div className="px-3 py-2.5 border-b border-white/10 mb-1">
                        <p className="text-sm font-semibold text-white truncate">{session.user?.name}</p>
                        <p className="text-xs text-slate-500 truncate">{session.user?.email}</p>
                        <span className="inline-block mt-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800">
                          {((session.user as any)?.plan || 'FREE')} PLAN
                        </span>
                      </div>
                      <Link href="/dashboard" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"><LayoutDashboard className="w-4 h-4" />Dashboard</Link>
                      <Link href="/dashboard/settings" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"><Settings className="w-4 h-4" />Settings</Link>
                      <div className="border-t border-white/10 mt-1 pt-1">
                        <button onClick={() => { signOut({ callbackUrl: '/' }); setUserMenuOpen(false); }} className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-950/50 rounded-xl transition-colors">
                          <LogOut className="w-4 h-4" />Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <Link href="/login" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">Sign In</Link>
                <Link href="/register" className="btn-primary btn-sm flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" />Get Started Free</Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-[#060a12]/98 border-t border-white/10 pb-5 pt-2 animate-fade-in">
            <div className="space-y-0.5">
              <div className="px-4 pt-2 pb-1 text-[10px] font-bold text-slate-600 uppercase tracking-widest">Features</div>
              {featuresMenu.map(item => (
                <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-xl mx-1 transition-colors">
                  <span className="text-base">{item.icon}</span>{item.label}
                </Link>
              ))}
              <div className="border-t border-white/10 my-2" />
              <div className="px-4 pt-1 pb-1 text-[10px] font-bold text-slate-600 uppercase tracking-widest">For Business</div>
              {businessMenu.map(item => (
                <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-xl mx-1 transition-colors">
                  <span className="text-base">{item.icon}</span>{item.label}
                </Link>
              ))}
              <div className="border-t border-white/10 my-2" />
              {[
                { l: 'Pricing',   h: '/pricing' },
                { l: 'For Banks', h: '/segments/banking' },
                { l: 'About Us',  h: '/about' },
                { l: 'Contact',   h: '/contact' },
              ].map(item => (
                <Link key={item.h} href={item.h} onClick={() => setMobileOpen(false)} className="flex items-center px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-xl mx-1 transition-colors">{item.l}</Link>
              ))}
              <div className="border-t border-white/10 mt-3 pt-3 px-3 flex flex-col gap-2">
                {showPWABtn && (
                  <button onClick={installPWA} className="btn-secondary flex items-center justify-center gap-2 text-emerald-300 border-emerald-700/50">
                    <Download className="w-4 h-4" />Install as App (PWA)
                  </button>
                )}
                {session ? (
                  <>
                    <Link href="/dashboard" className="btn-primary justify-center" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                    <button onClick={() => { signOut({ callbackUrl: '/' }); setMobileOpen(false); }} className="btn-secondary text-red-400 justify-center">Sign Out</button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="btn-secondary justify-center" onClick={() => setMobileOpen(false)}>Sign In</Link>
                    <Link href="/register" className="btn-primary justify-center" onClick={() => setMobileOpen(false)}><Zap className="w-4 h-4" />Get Started Free</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
