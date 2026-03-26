import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getAdminDb } from '@/lib/firebase-admin'

function oldTax(inc: number) {
  let t = 0
  if (inc > 1000000) { t += (inc - 1000000) * 0.30; inc = 1000000 }
  if (inc > 500000) { t += (inc - 500000) * 0.20; inc = 500000 }
  if (inc > 250000) t += (inc - 250000) * 0.05
  return Math.round(t * 1.04)
}

function newTax(inc: number) {
  if (inc <= 700000) return 0
  let t = 0
  if (inc > 1500000) { t += (inc - 1500000) * 0.30; inc = 1500000 }
  if (inc > 1200000) { t += (inc - 1200000) * 0.20; inc = 1200000 }
  if (inc > 1000000) { t += (inc - 1000000) * 0.15; inc = 1000000 }
  if (inc > 700000) { t += (inc - 700000) * 0.10; inc = 700000 }
  if (inc > 300000) t += (inc - 300000) * 0.05
  return Math.round(t * 1.04)
}

export async function POST(req: NextRequest) {
  try {
    const { grossSalary: gs, basic = gs * 0.5, hra = 0, rentPaid = 0, isMetroCity = true, deduction80C = 0, deduction80D = 0, nps80CCD1B = 0, homeLoanInterest24B = 0 } = await req.json()
    if (!gs) return NextResponse.json({ error: 'Gross salary required' }, { status: 400 })

    const hraExempt = Math.round(Math.min(hra, isMetroCity ? basic * 0.5 : basic * 0.4, Math.max(0, rentPaid - basic * 0.1)))
    const c80C = Math.min(deduction80C, 150000)
    const c80D = Math.min(deduction80D, 25000)
    const cNPS = Math.min(nps80CCD1B, 50000)
    const cHL = Math.min(homeLoanInterest24B, 200000)

    const oldTaxable = Math.max(0, gs - 50000 - hraExempt - c80C - c80D - cNPS - cHL)
    const newTaxable = Math.max(0, gs - 75000)
    const oldFinal = oldTax(oldTaxable)
    const newFinal = newTax(newTaxable)
    const better = oldFinal <= newFinal ? 'old' : 'new'
    const savings = Math.abs(oldFinal - newFinal)

    const missing = []
    if (c80C < 150000) missing.push({ name: '80C (ELSS/PPF/NSC)', gap: 150000 - c80C, saving: Math.round((150000 - c80C) * 0.31), tip: 'Invest in ELSS MF for tax saving + market returns' })
    if (cNPS < 50000) missing.push({ name: 'NPS 80CCD(1B)', gap: 50000 - cNPS, saving: Math.round((50000 - cNPS) * 0.31), tip: 'Open NPS account — extra ₹50K deduction' })
    if (c80D < 25000) missing.push({ name: '80D Health Insurance', gap: 25000 - c80D, saving: Math.round((25000 - c80D) * 0.31), tip: 'Buy health insurance — covers family + saves tax' })

    const result = {
      oldRegime: { taxableIncome: oldTaxable, tax: oldFinal, effectiveRate: parseFloat((oldFinal / gs * 100).toFixed(2)) },
      newRegime: { taxableIncome: newTaxable, tax: newFinal, effectiveRate: parseFloat((newFinal / gs * 100).toFixed(2)) },
      recommendation: { betterRegime: better, savings, reason: better === 'old' ? `Old regime saves ₹${savings.toLocaleString('en-IN')} — your deductions are high.` : `New regime saves ₹${savings.toLocaleString('en-IN')} — simpler slabs work better for you.` },
      missingDeductions: missing,
      totalPotentialSaving: missing.reduce((s, m) => s + m.saving, 0),
    }

    const session = await getServerSession(authOptions)
    if (session?.user && (session.user as any).id) {
      const db = getAdminDb()
      await db.collection('profiles').doc((session.user as any).id).set(
        { taxResult: result, monthlyIncome: Math.round(gs / 12), updatedAt: new Date().toISOString() },
        { merge: true }
      ).catch(console.error)
    }

    return NextResponse.json(result)
  } catch (err) {
    console.error('Tax error:', err)
    return NextResponse.json({ error: 'Calculation failed' }, { status: 500 })
  }
}
