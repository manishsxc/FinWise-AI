import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getAdminDb } from '@/lib/firebase-admin'

export async function POST(req: NextRequest) {
  try {
    const { age, income, expenses, existingCorpus = 0, retirementAge, returnRate = 0.12 } = await req.json()

    if (!age || !income || !expenses || !retirementAge) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (retirementAge <= age) {
      return NextResponse.json({ error: 'Retirement age must be greater than current age' }, { status: 400 })
    }

    const years = retirementAge - age
    const targetCorpus = expenses * 12 * 25   // 4% safe withdrawal
    const fvExisting = existingCorpus * Math.pow(1 + returnRate, years)
    const additionalNeeded = Math.max(0, targetCorpus - fvExisting)
    const r = returnRate / 12
    const n = years * 12
    const monthlySIP = additionalNeeded > 0 ? additionalNeeded * r / (Math.pow(1 + r, n) - 1) : 0
    const sipCorpus = monthlySIP > 0 ? monthlySIP * ((Math.pow(1 + r, n) - 1) / r) * (1 + r) : 0
    const projectedCorpus = sipCorpus + fvExisting
    const savingsRate = ((income - expenses) / income * 100)

    const allocation = age < 30 ? { equity: 85, debt: 10, gold: 5 }
      : age < 40 ? { equity: 75, debt: 20, gold: 5 }
      : age < 50 ? { equity: 60, debt: 35, gold: 5 }
      : { equity: 40, debt: 55, gold: 5 }

    const projection = Array.from({ length: Math.min(years, 30) }, (_, i) => {
      const yr = i + 1
      const sipG = monthlySIP > 0 ? monthlySIP * ((Math.pow(1 + returnRate, yr) - 1) / returnRate) * (1 + returnRate) : 0
      return { year: new Date().getFullYear() + yr, age: age + yr, corpus: Math.round(sipG + existingCorpus * Math.pow(1 + returnRate, yr)) }
    })

    const result = {
      results: {
        yearsToRetirement: years,
        targetCorpus: Math.round(targetCorpus),
        monthlySIPNeeded: Math.round(monthlySIP),
        projectedCorpus: Math.round(projectedCorpus),
        savingsRate: parseFloat(savingsRate.toFixed(1)),
        onTrack: projectedCorpus >= targetCorpus * 0.95,
        shortfall: Math.max(0, Math.round(targetCorpus - projectedCorpus)),
      },
      allocation,
      projection,
      recommendations: [
        monthlySIP > 0 ? `Start SIP of ₹${Math.round(monthlySIP).toLocaleString('en-IN')}/month immediately` : 'Great! Existing corpus is sufficient.',
        `Maintain ${allocation.equity}% equity for ${Math.min(10, years)} more years`,
        'Ensure term insurance: 10× annual income = ₹' + Math.round(income * 12 * 10 / 100000) + 'L',
        'Review portfolio every 3 years and rebalance',
      ],
    }

    // Save to Firestore
    const session = await getServerSession(authOptions)
    if (session?.user && (session.user as any).id) {
      const db = getAdminDb()
      await db.collection('profiles').doc((session.user as any).id).set(
        { fireResult: result.results, monthlyIncome: income, monthlyExpenses: expenses, existingCorpus, retirementAge, age, updatedAt: new Date().toISOString() },
        { merge: true }
      ).catch(console.error)
    }

    return NextResponse.json(result)
  } catch (err) {
    console.error('FIRE error:', err)
    return NextResponse.json({ error: 'Calculation failed' }, { status: 500 })
  }
}
