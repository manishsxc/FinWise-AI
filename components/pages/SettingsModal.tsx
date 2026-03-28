'use client';
import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useProfile } from '@/hooks/useProfile';
import { X, Loader2, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { data: session } = useSession();
  const { data: profileData, refetch } = useProfile();
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [newName, setNewName] = useState(profileData?.profile?.name || session?.user?.name || '');

  // Update new name when profile data loads
  useEffect(() => {
    setNewName(profileData?.profile?.name || session?.user?.name || '');
  }, [profileData, session]);

  const handleChangeProfileName = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newName.trim()) {
      toast.error('Name cannot be empty');
      return;
    }

    if (newName === (profileData?.profile?.name || session?.user?.name)) {
      toast.error('Please enter a different name');
      return;
    }

    setLoading(true);
    try {
      // Update profile name
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName.trim() }),
      });

      if (!res.ok) {
        throw new Error('Failed to update name');
      }

      toast.success('Name updated successfully!');
      await refetch();
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update name');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/account', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to delete account');
      }

      toast.success('Account deleted. Redirecting...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Sign out and redirect
      await signOut({ redirect: true, callbackUrl: '/' });
    } catch (error) {
      console.error('Delete account error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to delete account');
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-2xl border border-white/10 max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 sticky top-0 bg-slate-900">
          <h2 className="text-xl font-bold text-white">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition"
            disabled={loading}
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Account Info */}
          <div>
            <h3 className="text-sm font-semibold text-slate-300 mb-4">Account Information</h3>
            <div className="space-y-3 bg-slate-800/50 p-4 rounded-lg border border-white/5">
              <div>
                <label className="text-xs text-slate-400">Email</label>
                <p className="text-white font-medium">{session?.user?.email}</p>
              </div>
              <div>
                <label className="text-xs text-slate-400">Phone</label>
                <p className="text-white font-medium">{profileData?.profile?.phone || 'Not set'}</p>
              </div>
            </div>
          </div>

          {/* Change Name */}
          <div>
            <h3 className="text-sm font-semibold text-slate-300 mb-3">Change Your Name</h3>
            <form onSubmit={handleChangeProfileName} className="space-y-3">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-2 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? 'Updating...' : 'Update Name'}
              </button>
            </form>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10" />

          {/* Delete Account Section */}
          <div>
            <h3 className="text-sm font-semibold text-red-400 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Danger Zone
            </h3>
            
            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                disabled={loading}
                className="w-full px-4 py-2 bg-red-600/20 border border-red-500/50 hover:bg-red-600/30 text-red-400 text-sm font-medium rounded-lg transition disabled:opacity-50"
              >
                Delete Account
              </button>
            ) : (
              <div className="space-y-3 bg-red-600/10 border border-red-500/30 rounded-lg p-4">
                <p className="text-sm text-red-300">
                  ⚠️ This action <span className="font-bold">cannot be undone</span>. All your data will be permanently deleted.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    disabled={loading}
                    className="flex-1 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    disabled={loading}
                    className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                    {loading ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
