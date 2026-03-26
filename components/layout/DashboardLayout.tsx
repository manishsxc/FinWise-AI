'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { LayoutDashboard, Wrench, Bot, Trophy, FileBarChart, Zap, LogOut, Settings, Bell, ChevronLeft } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';

const nav = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/tools', label: 'Financial Tools', icon: Wrench },
  { href: '/advisor', label: 'AI Advisor', icon: Bot },
  { href: '/goals', label: 'Goals & Badges', icon: Trophy },
  { href: '/reports', label: 'Weekly Report', icon: FileBarChart },
  { href: '/scenario', label: 'What If?', icon: Zap },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { data: profileData } = useProfile();
  const score = profileData?.profile?.moneyScore;

  return (
    <div className="min-h-screen flex bg-[#060a12]">
      {/* Sidebar */}
      <aside className="w-60 flex-shrink-0 bg-slate-900 border-r border-white/10 flex flex-col sticky top-0 h-screen hidden md:flex">
        <div className="p-4 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center font-bold text-white text-sm">F</div>
            <span className="font-bold text-white text-sm">Fin<span className="text-blue-400">Wise</span> AI</span>
          </Link>
        </div>

        {score !== undefined && (
          <div className="mx-3 mt-3 mb-1 bg-slate-800 rounded-xl p-3 border border-white/5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-slate-400">Money Score</span>
              <span className="text-sm font-bold font-mono text-blue-400">{score}/100</span>
            </div>
            <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-1000" style={{ width: `${score}%` }} />
            </div>
          </div>
        )}

        <nav className="flex-1 p-2 space-y-0.5 mt-1">
          {nav.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href}
              className={`sidebar-link ${pathname === href || pathname?.startsWith(href + '/') ? 'active' : ''}`}>
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">{label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-2 border-t border-white/10 space-y-0.5">
          <Link href="/dashboard/settings" className="sidebar-link"><Settings className="w-4 h-4" />Settings</Link>
          <button onClick={() => signOut({ callbackUrl: '/' })} className="sidebar-link w-full text-left text-red-400 hover:text-red-300 hover:bg-red-900/20">
            <LogOut className="w-4 h-4" />Sign Out
          </button>
          {session?.user && (
            <div className="flex items-center gap-2.5 p-3 mt-1">
              <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                {session.user.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-medium text-white truncate">{session.user.name}</div>
                <div className="text-[10px] text-slate-500 truncate">{(session.user as any).plan || 'FREE'}</div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-[#060a12]/90 backdrop-blur border-b border-white/10 px-5 py-3 flex items-center justify-between">
          <div className="text-sm font-semibold text-white">
            {nav.find(n => n.href === pathname)?.label || 'Dashboard'}
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 relative" aria-label="Notifications">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </button>
            <span className="badge badge-amber text-xs">{((session?.user as any)?.plan || 'FREE').toUpperCase()}</span>
          </div>
        </header>
        <main className="flex-1 p-5 md:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
