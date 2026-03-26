import { initializeApp, getApps, cert, App } from 'firebase-admin/app'
import { getFirestore, Firestore } from 'firebase-admin/firestore'
import { getAuth, Auth } from 'firebase-admin/auth'

let adminApp: App
let adminDb: Firestore
let adminAuth: Auth

function initAdmin() {
  if (getApps().length > 0) {
    adminApp = getApps()[0]
  } else {
    adminApp = initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    })
  }
  adminDb = getFirestore(adminApp)
  adminAuth = getAuth(adminApp)
}

// Lazy init
export function getAdminDb(): Firestore {
  if (!adminDb) initAdmin()
  return adminDb
}

export function getAdminAuth(): Auth {
  if (!adminAuth) initAdmin()
  return adminAuth
}

// ── Firestore helpers ────────────────────────────────────────

export async function getDoc(collection: string, id: string) {
  const db = getAdminDb()
  const snap = await db.collection(collection).doc(id).get()
  if (!snap.exists) return null
  return { id: snap.id, ...snap.data() }
}

export async function setDoc(collection: string, id: string, data: object, merge = true) {
  const db = getAdminDb()
  await db.collection(collection).doc(id).set(
    { ...data, updatedAt: new Date().toISOString() },
    { merge }
  )
}

export async function addDoc(collection: string, data: object) {
  const db = getAdminDb()
  const ref = await db.collection(collection).add({
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })
  return ref.id
}

export async function updateDoc(collection: string, id: string, data: object) {
  const db = getAdminDb()
  await db.collection(collection).doc(id).update({
    ...data,
    updatedAt: new Date().toISOString(),
  })
}

export async function deleteDoc(collection: string, id: string) {
  const db = getAdminDb()
  await db.collection(collection).doc(id).delete()
}

export async function queryDocs(
  collection: string,
  filters: Array<[string, FirebaseFirestore.WhereFilterOp, any]> = [],
  orderByField?: string,
  limitNum?: number
) {
  const db = getAdminDb()
  let q: FirebaseFirestore.Query = db.collection(collection)
  filters.forEach(([field, op, val]) => { q = q.where(field, op, val) })
  if (orderByField) q = q.orderBy(orderByField, 'desc')
  if (limitNum) q = q.limit(limitNum)
  const snap = await q.get()
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}
