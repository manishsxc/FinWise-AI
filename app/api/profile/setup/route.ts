import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getAdminDb } from '@/lib/firebase-admin'
import { z } from 'zod'

const setupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone must be 10 digits'),
  occupation: z.string().optional().default(''),
  monthlyIncome: z.number().positive('Must be greater than 0'),
  monthlyExpense: z.number().positive('Must be greater than 0'),
  investmentExperience: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
})

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const data = setupSchema.parse(body)

    const userId = (session.user as any).id
    const db = getAdminDb()

    // Update user name if changed
    if (data.name !== session.user.name) {
      await db.collection('users').doc(userId).set(
        { name: data.name, updatedAt: new Date().toISOString() },
        { merge: true }
      )
    }

    // Create/update profile with all user info
    const now = new Date().toISOString()
    await db.collection('profiles').doc(userId).set({
      userId,
      name: data.name,
      phone: data.phone,
      occupation: data.occupation,
      monthlyIncome: data.monthlyIncome,
      monthlyExpense: data.monthlyExpense,
      investmentExperience: data.investmentExperience,
      isProfileComplete: true, // Mark as completed
      profileCompletedAt: now,
      moneyScore: 0,
      createdAt: new Date().toISOString(),
      updatedAt: now,
    }, { merge: true })

    return NextResponse.json({
      success: true,
      message: 'Profile setup completed',
    })
  } catch (err: any) {
    console.error('Profile setup error:', err)
    if (err.name === 'ZodError') {
      return NextResponse.json({ error: err.errors[0].message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to setup profile' }, { status: 500 })
  }
}
