'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

export function OnboardingModal({ isOpen, onComplete }: OnboardingModalProps) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    occupation: '',
    monthlyIncome: '',
    monthlyExpense: '',
    investmentExperience: 'beginner',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      toast.error('Please enter your full name');
      return;
    }
    if (!formData.phone.match(/^[0-9]{10}$/)) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }
    if (!formData.monthlyIncome || parseInt(formData.monthlyIncome) <= 0) {
      toast.error('Please enter valid monthly income');
      return;
    }
    if (!formData.monthlyExpense || parseInt(formData.monthlyExpense) <= 0) {
      toast.error('Please enter valid monthly expense');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/profile/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
          phone: formData.phone,
          occupation: formData.occupation.trim(),
          monthlyIncome: parseInt(formData.monthlyIncome),
          monthlyExpense: parseInt(formData.monthlyExpense),
          investmentExperience: formData.investmentExperience,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to save profile');
      }

      toast.success('Profile created! Welcome to FinWise AI 🎉');
      onComplete();
    } catch (error) {
      console.error('Onboarding error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-2xl border border-white/10 max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-slate-900 border-b border-white/10 p-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Complete Your Profile</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <p className="text-sm text-slate-400 mb-6">
            Welcome! Let's personalize your financial advisor experience.
          </p>

          {/* First Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">First Name *</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="e.g., Sumit"
              className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-400 text-sm"
              disabled={loading}
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Last Name *</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="e.g., Kumar"
              className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-400 text-sm"
              disabled={loading}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Phone *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="10-digit number"
              className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-400 text-sm"
              disabled={loading}
              maxLength={10}
            />
          </div>

          {/* Occupation */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Occupation</label>
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              placeholder="e.g., Software Engineer"
              className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-400 text-sm"
              disabled={loading}
            />
          </div>

          {/* Monthly Income */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Monthly Income (₹) *</label>
            <input
              type="number"
              name="monthlyIncome"
              value={formData.monthlyIncome}
              onChange={handleChange}
              placeholder="e.g., 50000"
              className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-400 text-sm"
              disabled={loading}
              min="0"
            />
          </div>

          {/* Monthly Expense */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Monthly Expense (₹) *</label>
            <input
              type="number"
              name="monthlyExpense"
              value={formData.monthlyExpense}
              onChange={handleChange}
              placeholder="e.g., 30000"
              className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-400 text-sm"
              disabled={loading}
              min="0"
            />
          </div>

          {/* Investment Experience */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Investment Experience</label>
            <select
              name="investmentExperience"
              value={formData.investmentExperience}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-400 text-sm"
              disabled={loading}
            >
              <option value="beginner">Beginner (New to investing)</option>
              <option value="intermediate">Intermediate (2-5 years)</option>
              <option value="advanced">Advanced (5+ years)</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm mt-8"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? 'Saving...' : 'Complete Profile'}
          </button>

          <p className="text-xs text-slate-500 text-center">
            Your data is encrypted and stored securely in Firebase.
          </p>
        </form>
      </div>
    </div>
  );
}
