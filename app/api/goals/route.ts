import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getAdminDb } from '@/lib/firebase-admin'

async function getUserId(req: NextRequest): Promise<string | null> {
  const session = await getServerSession(authOptions)
  if (!session?.user) return null
  return (session.user as any).id as string
}

export async function GET(req: NextRequest) {
  const userId = await getUserId(req)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const db = getAdminDb()
  const snap = await db.collection('goals').where('userId', '==', userId).orderBy('createdAt', 'desc').get()
  const goals = snap.docs.map(d => ({ id: d.id, ...d.data() }))
  return NextResponse.json({ goals })
}

export async function POST(req: NextRequest) {
  const userId = await getUserId(req)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  if (!body.name || !body.targetAmount) return NextResponse.json({ error: 'Name and target amount required' }, { status: 400 })

  const db = getAdminDb()
  const now = new Date().toISOString()
  const ref = await db.collection('goals').add({
    userId,
    name: body.name,
    icon: body.icon || '🎯',
    targetAmount: body.targetAmount,
    savedAmount: body.savedAmount || 0,
    category: body.category || 'OTHER',
    targetDate: body.targetDate || null,
    isCompleted: false,
    createdAt: now,
    updatedAt: now,
  })

  return NextResponse.json({ goal: { id: ref.id, name: body.name } })
}

export async function PATCH(req: NextRequest) {
  const userId = await getUserId(req)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id, ...updates } = await req.json()
  if (!id) return NextResponse.json({ error: 'Goal ID required' }, { status: 400 })

  const db = getAdminDb()
  const docRef = db.collection('goals').doc(id)
  const doc = await docRef.get()

  if (!doc.exists || doc.data()?.userId !== userId) {
    return NextResponse.json({ error: 'Goal not found' }, { status: 404 })
  }

  await docRef.update({ ...updates, updatedAt: new Date().toISOString() })
  return NextResponse.json({ updated: true })
}

export async function DELETE(req: NextRequest) {
  const userId = await getUserId(req)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Goal ID required' }, { status: 400 })

  const db = getAdminDb()
  const docRef = db.collection('goals').doc(id)
  const doc = await docRef.get()

  if (!doc.exists || doc.data()?.userId !== userId) {
    return NextResponse.json({ error: 'Goal not found' }, { status: 404 })
  }

  await docRef.delete()
  return NextResponse.json({ deleted: true })
}
