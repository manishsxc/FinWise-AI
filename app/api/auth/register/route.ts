import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { getAdminDb } from '@/lib/firebase-admin'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(100),
  phone: z.string().optional(),
  plan: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)
    const db = getAdminDb()

    // Check if user exists
    const existing = await db.collection('users')
      .where('email', '==', data.email.toLowerCase())
      .limit(1).get()

    if (!existing.empty) {
      return NextResponse.json(
        { error: 'An account with this email already exists. Please sign in.' },
        { status: 409 }
      )
    }

    const hashed = await bcrypt.hash(data.password, 12)
    const now = new Date().toISOString()

    // Create user document
    const userRef = db.collection('users').doc()
    await userRef.set({
      name: data.name.trim(),
      email: data.email.toLowerCase(),
      password: hashed,
      phone: data.phone || null,
      plan: data.plan || 'FREE',
      provider: 'credentials',
      createdAt: now,
      updatedAt: now,
    })

    // Create empty profile
    await db.collection('profiles').doc(userRef.id).set({
      userId: userRef.id,
      moneyScore: null,
      createdAt: now,
      updatedAt: now,
    })

    // Create welcome nudge
    await db.collection('nudges').add({
      userId: userRef.id,
      type: 'CUSTOM',
      message: `Welcome ${data.name}! Start by calculating your Money Health Score.`,
      read: false,
      createdAt: now,
    })

    return NextResponse.json({
      success: true,
      user: { id: userRef.id, name: data.name, email: data.email, plan: data.plan || 'FREE' },
    })
  } catch (err: any) {
    if (err.name === 'ZodError') {
      return NextResponse.json({ error: err.errors[0].message }, { status: 400 })
    }
    console.error('Register error:', err)
    return NextResponse.json({ error: 'Registration failed. Please try again.' }, { status: 500 })
  }
}
