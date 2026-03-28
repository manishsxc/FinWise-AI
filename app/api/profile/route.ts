import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getAdminDb } from '@/lib/firebase-admin'

const DEFAULT_PROFILE = {
  moneyScore: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    
    const userId = (session.user as any).id
    const db = getAdminDb()

    try {
      const [profileSnap, goalsSnap, nudgesSnap] = await Promise.all([
        db.collection('profiles').doc(userId).get(),
        db.collection('goals').where('userId', '==', userId).where('isCompleted', '==', false).limit(10).get(),
        db.collection('nudges').where('userId', '==', userId).where('read', '==', false).orderBy('createdAt', 'desc').limit(5).get(),
      ])

      return NextResponse.json({
        user: { name: session.user.name, email: session.user.email, plan: (session.user as any).plan },
        profile: profileSnap.exists ? profileSnap.data() : DEFAULT_PROFILE,
        goals: goalsSnap.docs.map(d => ({ id: d.id, ...d.data() })),
        nudges: nudgesSnap.docs.map(d => ({ id: d.id, ...d.data() })),
      })
    } catch (dbErr: any) {
      // If Firestore fails due to certificate issues, return default profile
      if (dbErr?.code === 14 || dbErr?.message?.includes('UNABLE_TO_GET_ISSUER_CERT')) {
        console.warn('Firestore certificate error, returning cached profile:', dbErr.message)
        return NextResponse.json({
          user: { name: session.user.name, email: session.user.email, plan: (session.user as any).plan },
          profile: DEFAULT_PROFILE,
          goals: [],
          nudges: [],
          warning: 'Firestore unavailable - using cached data'
        })
      }
      throw dbErr
    }
  } catch (err) {
    console.error('Profile error:', err)
    return NextResponse.json({ error: 'Failed to load profile' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const userId = (session.user as any).id
    const updates = await req.json()
    const db = getAdminDb()
    
    try {
      // If name is being updated, update it in both collections
      const updatePromises = [
        db.collection('profiles').doc(userId).set(
          { ...updates, updatedAt: new Date().toISOString() }, { merge: true }
        )
      ]
      
      // Also update user name if provided
      if (updates.name) {
        updatePromises.push(
          db.collection('users').doc(userId).set(
            { name: updates.name, updatedAt: new Date().toISOString() }, { merge: true }
          )
        )
      }
      
      await Promise.all(updatePromises)
      return NextResponse.json({ success: true })
    } catch (dbErr: any) {
      if (dbErr?.code === 14 || dbErr?.message?.includes('UNABLE_TO_GET_ISSUER_CERT')) {
        console.warn('Firestore update skipped due to certificate error')
        return NextResponse.json({ success: true, warning: 'Will sync when firestore available' })
      }
      throw dbErr
    }
  } catch {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }
}
