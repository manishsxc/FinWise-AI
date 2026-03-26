import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getAdminDb } from '@/lib/firebase-admin'

export async function POST(req: NextRequest) {
  try {
    const { portfolioValue, totalInvested, yearsInvested, fundCount = 5, avgExpenseRatio = 1.2 } = await req.json()
    if (!portfolioValue || !totalInvested || !yearsInvested) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

    const absReturn = (portfolioValue - totalInvested) / totalInvested * 100
    const xirr = (Math.pow(portfolioValue / totalInvested, 1 / yearsInvested) - 1) * 100
    const alpha = xirr - 12.5
    const overlapRisk = fundCount > 8 ? 'High' : fundCount > 5 ? 'Moderate' : 'Low'
    const annualDrag = portfolioValue * avgExpenseRatio / 100

    const result = {
      analysis: { absoluteReturn: parseFloat(absReturn.toFixed(2)), xirr: parseFloat(xirr.toFixed(2)), benchmark: 12.5, alpha: parseFloat(alpha.toFixed(2)) },
      overlap: { risk: overlapRisk, fundCount },
      costs: { annualExpenseDrag: Math.round(annualDrag), expenseRatio: avgExpenseRatio, indexFundSaving: Math.round(annualDrag * 0.9) },
      actions: [
        fundCount > 6 && `Consolidate ${fundCount} → 4-5 funds to reduce overlap`,
        avgExpenseRatio > 1.0 && `Switch to index funds — save ₹${Math.round(annualDrag * 0.9).toLocaleString('en-IN')}/yr`,
        xirr < 10 && 'Portfolio underperforming — review fund selection',
        alpha < 0 && `Trailing Nifty by ${Math.abs(alpha).toFixed(1)}% CAGR — consider index funds`,
      ].filter(Boolean),
    }

    const session = await getServerSession(authOptions)
    if (session?.user && (session.user as any).id) {
      const db = getAdminDb()
      await db.collection('profiles').doc((session.user as any).id).set(
        { mfResult: result, updatedAt: new Date().toISOString() }, { merge: true }
      ).catch(console.error)
    }

    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 })
  }
}
