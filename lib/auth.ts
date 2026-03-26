import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { getAdminDb, getDoc, setDoc } from './firebase-admin'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        try {
          // Look up user in Firestore by email
          const db = getAdminDb()
          const snap = await db.collection('users')
            .where('email', '==', credentials.email.toLowerCase())
            .limit(1)
            .get()

          if (snap.empty) return null
          const userData = snap.docs[0].data()
          const userId = snap.docs[0].id

          if (!userData.password) return null
          const valid = await bcrypt.compare(credentials.password, userData.password)
          if (!valid) return null

          return { id: userId, name: userData.name, email: userData.email }
        } catch (e) {
          console.error('Auth error:', e)
          return null
        }
      },
    }),
  ],

  session: { strategy: 'jwt', maxAge: 30 * 24 * 60 * 60 },
  pages: { signIn: '/login', error: '/login' },

  callbacks: {
    async signIn({ user, account }) {
      // For Google sign-in: create/update user in Firestore
      if (account?.provider === 'google' && user.email) {
        try {
          const db = getAdminDb()
          const snap = await db.collection('users')
            .where('email', '==', user.email)
            .limit(1)
            .get()

          if (snap.empty) {
            // New user — create record
            await db.collection('users').doc(user.id || user.email).set({
              name: user.name,
              email: user.email,
              image: user.image,
              plan: 'FREE',
              provider: 'google',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            })
            // Create profile
            await db.collection('profiles').doc(user.id || user.email).set({
              userId: user.id || user.email,
              moneyScore: null,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            })
          }
        } catch (e) {
          console.error('Google sign in error:', e)
        }
      }
      return true
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        // Get plan from Firestore
        try {
          const db = getAdminDb()
          const snap = await db.collection('users')
            .where('email', '==', user.email)
            .limit(1)
            .get()
          token.plan = snap.empty ? 'FREE' : (snap.docs[0].data().plan || 'FREE')
          token.id = snap.empty ? user.id : snap.docs[0].id
        } catch {
          token.plan = 'FREE'
        }
      }
      return token
    },

    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id as string
        ;(session.user as any).plan = token.plan as string
      }
      return session
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
}
