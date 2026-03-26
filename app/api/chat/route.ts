import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getAdminDb } from '@/lib/firebase-admin'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM = `You are FinWise AI — a knowledgeable, warm, conversational financial advisor for Indian users.

PERSONA: Like a trusted CA friend — specific, practical, non-judgmental, available 24×7. Never preachy.

LANGUAGE: Detect user language and respond accordingly:
- Hindi/Hinglish → respond in warm Hinglish
- English → respond in clear friendly English
- Tamil/Telugu/Bengali → respond in that language

INDIAN FINANCIAL KNOWLEDGE (FY 2025-26):
Tax slabs OLD regime: 0-2.5L→0%, 2.5-5L→5%, 5-10L→20%, 10L+→30%
Tax slabs NEW regime: 0-3L→0%, 3-7L→5%, 7-10L→10%, 10-12L→15%, 12-15L→20%, 15L+→30%
New regime 87A rebate: zero tax up to ₹7L taxable income
Standard deduction: Old=₹50K, New=₹75K
80C limit: ₹1.5L (ELSS, PPF, EPF, NSC, life insurance)
80D: ₹25K self/family, ₹50K senior citizen parents
NPS 80CCD(1B): extra ₹50K
HRA: min(actual HRA, 50%/40% basic, rent minus 10% basic)
Home loan 24B interest: up to ₹2L

Returns: Equity MF 10-12% CAGR, Debt MF 6-8%, PPF 7.1%, FD 6.5-7.5%
Emergency fund: 6 months expenses minimum
Term insurance: 10-15x annual income
Safe SIP: at least 20% of income
Safe EMI: max 40% of income
Retirement corpus: 25x annual expenses (4% withdrawal rate)

RESPONSE STYLE:
- Under 200 words unless question needs more depth
- Bullet points for action steps
- Always give specific ₹ numbers and %
- End with ONE clear next action
- Light emoji use

For investment recommendations always add:
"Please consult a SEBI-registered adviser before investing."

NEVER: specific stock tips, guaranteed returns, illegal tax advice`

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const body = await req.json()
    const { message, history = [] } = body

    if (!message?.trim()) {
      return NextResponse.json({ error: 'Message required' }, { status: 400 })
    }

    const messages = [...history.slice(-18), { role: 'user' as const, content: message }]

    const response = await client.messages.create({
      model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: SYSTEM,
      messages,
    })

    const reply = response.content[0].type === 'text' ? response.content[0].text : ''

    // Save to Firestore if logged in
    if (session?.user && (session.user as any).id) {
      const userId = (session.user as any).id
      const db = getAdminDb()
      const now = new Date().toISOString()
      const batch = db.batch()
      const userRef = db.collection('chats').doc(userId).collection('messages').doc()
      const assistantRef = db.collection('chats').doc(userId).collection('messages').doc()
      batch.set(userRef, { role: 'user', content: message, createdAt: now })
      batch.set(assistantRef, { role: 'assistant', content: reply, createdAt: new Date(Date.now() + 1).toISOString() })
      await batch.commit().catch(console.error)
    }

    return NextResponse.json({ reply, usage: response.usage })
  } catch (err: any) {
    console.error('Chat error:', err)
    if (err.status === 429) return NextResponse.json({ error: 'Rate limit. Please wait a moment.' }, { status: 429 })
    return NextResponse.json({ error: 'AI unavailable. Please try again.' }, { status: 500 })
  }
}

// GET - fetch chat history
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) return NextResponse.json({ messages: [] })
    const userId = (session.user as any).id
    const db = getAdminDb()
    const snap = await db.collection('chats').doc(userId).collection('messages')
      .orderBy('createdAt', 'asc').limit(50).get()
    const messages = snap.docs.map(d => ({ id: d.id, ...d.data() }))
    return NextResponse.json({ messages })
  } catch {
    return NextResponse.json({ messages: [] })
  }
}
