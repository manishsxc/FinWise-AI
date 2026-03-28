'use client'
import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

export function useProfile() {
  const { data: session } = useSession()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const refresh = useCallback(async () => {
    if (!session?.user) return
    setLoading(true)
    try {
      const res = await fetch('/api/profile')
      if (res.ok) {
        const profileData = await res.json()
        // Ensure profile has isProfileComplete flag
        if (profileData.profile && profileData.profile.isProfileComplete === undefined) {
          profileData.profile.isProfileComplete = false
        }
        setData(profileData)
      }
    } catch (error) {
      console.error('Profile fetch error:', error)
      /* silent */
    }
    setLoading(false)
  }, [session])

  useEffect(() => {
    refresh()
  }, [refresh])

  const update = async (updates: Record<string, any>) => {
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
      if (res.ok) {
        await refresh()
      } else {
        toast.error('Failed to save')
      }
    } catch (error) {
      toast.error('Failed to save')
      console.error('Profile update error:', error)
    }
  }

  return { data, loading, refetch: refresh, update }
}

export function useGoals() {
  const { data: session } = useSession()
  const [goals, setGoals] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const fetchGoals = useCallback(async () => {
    if (!session?.user) return
    setLoading(true)
    try {
      const res = await fetch('/api/goals')
      if (res.ok) setGoals((await res.json()).goals || [])
    } catch (error) {
      console.error('Goals fetch error:', error)
      /* silent */
    }
    setLoading(false)
  }, [session])

  useEffect(() => { fetchGoals() }, [fetchGoals])

  const createGoal = async (goal: { name: string; icon: string; targetAmount: number; savedAmount?: number; category?: string }) => {
    const res = await fetch('/api/goals', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(goal) })
    if (res.ok) { toast.success('Goal created!'); fetchGoals() }
    else toast.error('Failed to create goal')
  }

  const updateGoal = async (id: string, updates: Record<string, any>) => {
    const res = await fetch('/api/goals', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, ...updates }) })
    if (res.ok) fetchGoals()
    else toast.error('Update failed')
  }

  const deleteGoal = async (id: string) => {
    const res = await fetch(`/api/goals?id=${id}`, { method: 'DELETE' })
    if (res.ok) { toast.success('Goal deleted'); fetchGoals() }
    else toast.error('Delete failed')
  }

  return { goals, loading, createGoal, updateGoal, deleteGoal, refetch: fetchGoals }
}
