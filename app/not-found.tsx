import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
export default function NotFound() {
  return (<><Navbar /><main className="min-h-screen flex items-center justify-center text-center px-6"><div><div className="text-8xl font-extrabold font-mono text-slate-800 mb-4">404</div><h1 className="text-2xl font-bold text-white mb-3">Page not found</h1><p className="text-slate-400 mb-8">This page doesn't exist.</p><div className="flex gap-3 justify-center"><Link href="/" className="btn-primary">Go Home</Link><Link href="/dashboard" className="btn-secondary">Dashboard</Link></div></div></main></>);
}
