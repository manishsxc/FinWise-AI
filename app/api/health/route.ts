import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getAdminDb } from '@/lib/firebase-admin'

export async function POST(req: NextRequest) {
  try {
    const { monthlyIncome, monthlyExpenses = 0, emergencyFundMonths = 0, insuranceCoverLakhs = 0, monthlyInvestmentPct = 0, emiToIncomeRatio = 0, has80CMaxed = false } = await req.json()
    if (!monthlyIncome) return NextResponse.json({ error: 'Monthly income required' }, { status: 400 })

    const recommended = monthlyIncome * 12 * 12 / 100000
    const dims = {
      emergency: Math.min(100, Math.round(emergencyFundMonths / 6 * 100)),
      insurance: Math.min(100, Math.round(insuranceCoverLakhs / recommended * 100)),
      investment: Math.min(100, Math.round(monthlyInvestmentPct / 30 * 100)),
      debt: Math.min(100, Math.max(0, Math.round((40 - emiToIncomeRatio) / 40 * 100))),
      tax: has80CMaxed ? 85 : 40,
      retirement: 30,
    }
    const weights: Record<string, number> = { emergency: 0.25, insurance: 0.20, investment: 0.20, debt: 0.15, tax: 0.10, retirement: 0.10 }
    const overall = Math.round(Object.entries(dims).reduce((s, [k, v]) => s + v * weights[k], 0))
    const label = overall >= 80 ? 'Excellent' : overall >= 65 ? 'Good' : overall >= 45 ? 'Fair' : overall >= 25 ? 'Needs Work' : 'Critical'

    const priorities = Object.entries(dims).filter(([, v]) => v < 65).sort(([, a], [, b]) => a - b).slice(0, 3).map(([k]) => ({
      dimension: k, score: (dims as any)[k],
      action: ({ emergency: `Build emergency fund — need ₹${Math.round(monthlyExpenses * Math.max(0, 6 - emergencyFundMonths)).toLocaleString('en-IN')} more`, insurance: `Increase term cover to ₹${Math.round(recommended)}L`, investment: `Increase monthly SIP by ₹${Math.round(monthlyIncome * 0.05).toLocaleString('en-IN')}`, debt: 'Pay down credit card / personal loans first', tax: 'Max out 80C (₹1.5L) + NPS 80CCD(1B) (₹50K)', retirement: 'Start NPS or increase VPF contribution' } as any)[k] || 'Take action',
    }))

    const result = { overall, label, dimensions: dims, priorities }

    const session = await getServerSession(authOptions)
    if (session?.user && (session.user as any).id) {
      const db = getAdminDb()
      await db.collection('profiles').doc((session.user as any).id).set(
        { moneyScore: overall, monthlyIncome, monthlyExpenses, emergencyFundMonths, insuranceCoverLakhs, updatedAt: new Date().toISOString() },
        { merge: true }
      ).catch(console.error)
    }

    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ error: 'Calculation failed' }, { status: 500 })
  }
}
