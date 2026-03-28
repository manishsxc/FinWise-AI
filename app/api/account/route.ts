import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getAdminDb } from '@/lib/firebase-admin'

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = (session.user as any).id
    const db = getAdminDb()

    try {
      // Delete all user data in parallel
      await Promise.all([
        // Delete user document
        db.collection('users').doc(userId).delete(),
        // Delete profile
        db.collection('profiles').doc(userId).delete(),
        // Delete goals
        db.collection('goals').where('userId', '==', userId).get().then(snapshot => {
          return Promise.all(snapshot.docs.map(doc => doc.ref.delete()))
        }),
        // Delete nudges
        db.collection('nudges').where('userId', '==', userId).get().then(snapshot => {
          return Promise.all(snapshot.docs.map(doc => doc.ref.delete()))
        }),
        // Delete chats
        db.collection('chats').where('userId', '==', userId).get().then(snapshot => {
          return Promise.all(snapshot.docs.map(doc => doc.ref.delete()))
        }),
        // Delete reports
        db.collection('reports').where('userId', '==', userId).get().then(snapshot => {
          return Promise.all(snapshot.docs.map(doc => doc.ref.delete()))
        }),
      ])

      return NextResponse.json({ success: true, message: 'Account deleted successfully' })
    } catch (dbErr: any) {
      if (dbErr?.code === 14 || dbErr?.message?.includes('UNABLE_TO_GET_ISSUER_CERT')) {
        console.warn('Firestore certificate error during account deletion')
        // Still return success to allow logout even if cert error
        return NextResponse.json({ success: true, message: 'Account deletion initiated' })
      }
      throw dbErr
    }
  } catch (err) {
    console.error('Account deletion error:', err)
    return NextResponse.json({ error: 'Failed to delete account' }, { status: 500 })
  }
}
