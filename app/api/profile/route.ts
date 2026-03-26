import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getAdminDb } from '@/lib/firebase-admin'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const userId = (session.user as any).id
    const db = getAdminDb()

    const [profileSnap, goalsSnap, nudgesSnap] = await Promise.all([
      db.collection('profiles').doc(userId).get(),
      db.collection('goals').where('userId', '==', userId).where('isCompleted', '==', false).limit(10).get(),
      db.collection('nudges').where('userId', '==', userId).where('read', '==', false).orderBy('createdAt', 'desc').limit(5).get(),
    ])

    return NextResponse.json({
      user: { name: session.user.name, email: session.user.email, plan: (session.user as any).plan },
      profile: profileSnap.exists ? profileSnap.data() : null,
      goals: goalsSnap.docs.map(d => ({ id: d.id, ...d.data() })),
      nudges: nudgesSnap.docs.map(d => ({ id: d.id, ...d.data() })),
    })
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
    await db.collection('profiles').doc(userId).set(
      { ...updates, updatedAt: new Date().toISOString() }, { merge: true }
    )
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }
}
