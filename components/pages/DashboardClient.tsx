'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useProfile } from '@/hooks/useProfile';
import { OnboardingModal } from './OnboardingModal';
import { SettingsModal } from './SettingsModal';
import { Settings } from 'lucide-react';

export function DashboardClient() {
  const { data: session } = useSession();
  const { data: profileData, refetch } = useProfile();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Check if profile is complete
  useEffect(() => {
    if (profileData?.profile && !profileData.profile.isProfileComplete) {
      setShowOnboarding(true);
    }
  }, [profileData]);

  const handleOnboardingComplete = async () => {
    setShowOnboarding(false);
    // Refetch profile data to get updated user info
    await refetch();
  };

  // Get display name: prioritize profile name, fallback to session name
  const displayName = profileData?.profile?.name || session?.user?.name || 'Friend';
  const firstName = displayName.split(' ')[0];
  const isProfileComplete = profileData?.profile?.isProfileComplete;

  return (
    <>
      <OnboardingModal isOpen={showOnboarding} onComplete={handleOnboardingComplete} />
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />

      <div className="space-y-6">
        {/* Welcome + Settings */}
        <div className="card p-7 relative overflow-hidden">
          <div aria-hidden className="absolute right-0 top-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">Namaste, {firstName}! 👋</h1>
              
              {isProfileComplete ? (
                <p className="text-slate-400 text-sm">
                  Welcome back! Your profile is set up and ready to go.
                </p>
              ) : (
                <p className="text-slate-400 text-sm">
                  Complete your profile to unlock personalized financial insights and recommendations.
                </p>
              )}
            </div>
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 hover:bg-slate-800 rounded-lg transition text-slate-400 hover:text-white"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* User Profile Summary */}
        {isProfileComplete && profileData?.profile && (
          <div className="card p-6 bg-slate-800/50 border border-blue-500/20">
            <h3 className="text-sm font-semibold text-blue-400 mb-4">✓ Your Profile</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-slate-400 text-xs mb-1">Name</div>
                <div className="text-white font-medium">{profileData.profile.name}</div>
              </div>
              <div>
                <div className="text-slate-400 text-xs mb-1">Phone</div>
                <div className="text-white font-medium">{profileData.profile.phone}</div>
              </div>
              <div>
                <div className="text-slate-400 text-xs mb-1">Monthly Income</div>
                <div className="text-white font-medium">₹{profileData.profile.monthlyIncome?.toLocaleString('en-IN')}</div>
              </div>
              <div>
                <div className="text-slate-400 text-xs mb-1">Monthly Expense</div>
                <div className="text-white font-medium">₹{profileData.profile.monthlyExpense?.toLocaleString('en-IN')}</div>
              </div>
              <div>
                <div className="text-slate-400 text-xs mb-1">Occupation</div>
                <div className="text-white font-medium">{profileData.profile.occupation || 'Not specified'}</div>
              </div>
              <div>
                <div className="text-slate-400 text-xs mb-1">Experience</div>
                <div className="text-white font-medium capitalize">{profileData.profile.investmentExperience || 'Beginner'}</div>
              </div>
            </div>
          </div>
        )}

        {/* Getting Started - Show when profile not complete */}
        {!isProfileComplete && (
          <div className="card p-6 border border-amber-500/30">
            <h3 className="text-base font-semibold text-white mb-4">🚀 Get Started</h3>
            <div className="space-y-3 text-sm text-slate-300">
              <p>👤 Complete your profile information</p>
              <p>📊 Get your Money Health Score</p>
              <p>💰 Receive personalized financial insights</p>
              <p>🎯 Set and track your financial goals</p>
            </div>
            <button 
              onClick={() => setShowOnboarding(true)}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition"
            >
              Complete Profile Now
            </button>
          </div>
        )}
      </div>
    </>
  );
}
