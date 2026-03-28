import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { getAdminDb, getDoc, setDoc } from './firebase-admin'

// Simple in-memory cache for user lookups (clear on restart)
const userCache = new Map<string, { data: any; timestamp: number }>()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

function getCachedUser(email: string) {
  const cached = userCache.get(email)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data
  }
  return null
}

function setCachedUser(email: string, data: any) {
  userCache.set(email, { data, timestamp: Date.now() })
}

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
          const email = user.email.toLowerCase()
          
          // Check cache first
          let cachedUser = getCachedUser(email)
          if (cachedUser !== null) {
            return true
          }

          const snap = await db.collection('users')
            .where('email', '==', email)
            .limit(1)
            .get()

          if (snap.empty) {
            // New user — create both user and profile in parallel
            const userDoc = {
              name: user.name,
              email: email,
              image: user.image,
              plan: 'FREE',
              provider: 'google',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }
            const profileDoc = {
              userId: user.id || email,
              moneyScore: null,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }
            
            // Parallelize writes
            await Promise.all([
              db.collection('users').doc(user.id || email).set(userDoc),
              db.collection('profiles').doc(user.id || email).set(profileDoc),
            ])
            
            setCachedUser(email, userDoc)
          } else {
            setCachedUser(email, snap.docs[0].data())
          }
        } catch (e) {
          console.error('Google sign in error:', e)
          // Don't block sign-in on error, but log it
        }
      }
      return true
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        
        // Use cache for faster lookups
        try {
          const cached = getCachedUser(user.email || '')
          if (cached) {
            token.plan = cached.plan || 'FREE'
            token.id = user.id
          } else if (user.email) {
            const db = getAdminDb()
            const snap = await db.collection('users')
              .where('email', '==', user.email.toLowerCase())
              .limit(1)
              .get()
            
            if (!snap.empty) {
              const userData = snap.docs[0].data()
              token.plan = userData.plan || 'FREE'
              token.id = snap.docs[0].id
              setCachedUser(user.email.toLowerCase(), userData)
            } else {
              token.plan = 'FREE'
            }
          }
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
