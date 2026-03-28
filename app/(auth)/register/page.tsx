'use client';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2, ArrowLeft, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const plans = [
  { id: 'FREE', name: 'Starter', price: 'Free' },
  { id: 'PRO', name: 'Pro', price: '₹499/mo', popular: true },
  { id: 'BUSINESS', name: 'Business', price: '₹1,299/mo' },
];

export default function RegisterPage() {
  const router = useRouter();
  const [plan, setPlan] = useState('PRO');
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const pwStrength = (pw: string) => {
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  };
  const strength = pwStrength(form.password);
  const strengthColors = ['', 'bg-red-500', 'bg-amber-500', 'bg-yellow-400', 'bg-emerald-500'];
  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) { toast.error('Please accept the terms to continue.'); return; }
    if (form.password.length < 8) { toast.error('Password must be at least 8 characters.'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, plan }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');
      toast.success('Account created! Signing you in...');
      const result = await signIn('credentials', { email: form.email, password: form.password, redirect: false });
      if (result?.ok) router.push('/dashboard?welcome=true');
      else router.push('/login');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060a12] flex items-center justify-center p-4 relative">
      <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>
      <div className="relative w-full max-w-lg">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-8 transition-colors"><ArrowLeft className="w-4 h-4" />Back to FinWise AI</Link>
        <div className="card p-8">
          <div className="text-center mb-7">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center font-bold text-white text-xl mx-auto mb-4">F</div>
            <h1 className="text-2xl font-bold text-white">Create your account</h1>
            <p className="text-slate-400 text-sm mt-1">Start your 14-day free trial. No credit card required.</p>
          </div>

          {/* Plan picker */}
          <div className="mb-6">
            <label className="label">Choose your plan</label>
            <div className="grid grid-cols-3 gap-2">
              {plans.map(p => (
                <button key={p.id} type="button" onClick={() => setPlan(p.id)}
                  className={`relative p-3 rounded-xl border text-left transition-all ${plan === p.id ? 'border-blue-500 bg-blue-900/20' : 'border-white/10 bg-slate-800 hover:border-white/20'}`}>
                  {p.popular && <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">POPULAR</div>}
                  <div className="text-xs font-bold text-white">{p.name}</div>
                  <div className="text-xs text-blue-400 font-mono font-semibold">{p.price}</div>
                  {plan === p.id && <Check className="absolute top-2 right-2 w-3.5 h-3.5 text-blue-400" />}
                </button>
              ))}
            </div>
          </div>

          {/* Google */}
          <button onClick={() => signIn('google', { callbackUrl: '/dashboard?welcome=true' })}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-sm font-medium text-white hover:border-white/20 transition-all mb-5">
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Sign up with Google
          </button>

          <div className="relative mb-5">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
            <div className="relative flex justify-center text-xs text-slate-500"><span className="bg-slate-900 px-3">or with email</span></div>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div><label className="label">Full Name</label><input type="text" value={form.name} onChange={e => setForm(p => ({...p,name:e.target.value}))} className="input" placeholder="First Last" required autoComplete="name" /></div>
              <div><label className="label">Phone (optional)</label><input type="tel" value={form.phone} onChange={e => setForm(p => ({...p,phone:e.target.value}))} className="input" placeholder="10-digit number" autoComplete="tel" /></div>
            </div>
            <div><label className="label">Email Address</label><input type="email" value={form.email} onChange={e => setForm(p => ({...p,email:e.target.value}))} className="input" placeholder="your.email@domain.com" required autoComplete="email" /></div>
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <input type={show ? 'text' : 'password'} value={form.password} onChange={e => setForm(p => ({...p,password:e.target.value}))} className="input pr-10" placeholder="Min. 8 characters" required minLength={8} autoComplete="new-password" />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">{show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
              </div>
              {form.password && (
                <div className="mt-1.5 flex items-center gap-2">
                  <div className="flex gap-1 flex-1">{[1,2,3,4].map(i => <div key={i} className={`h-1 flex-1 rounded-full ${i <= strength ? strengthColors[strength] : 'bg-slate-700'}`} />)}</div>
                  <span className="text-xs text-slate-400">{strengthLabels[strength]}</span>
                </div>
              )}
            </div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-0.5 w-4 h-4 rounded accent-blue-500" />
              <span className="text-xs text-slate-400 leading-relaxed">I agree to FinWise AI's{' '}<Link href="/terms" target="_blank" className="text-blue-400 hover:text-blue-300">Terms of Service</Link>{' '}and{' '}<Link href="/privacy" target="_blank" className="text-blue-400 hover:text-blue-300">Privacy Policy</Link>. I understand this is not investment advice.</span>
            </label>
            <button type="submit" disabled={loading || !agreed} className="btn-primary w-full py-3 mt-1">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : `Create Account — ${plans.find(p=>p.id===plan)?.name} Plan`}
            </button>
          </form>
          <p className="text-center text-sm text-slate-400 mt-5">Already have an account?{' '}<Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
}
