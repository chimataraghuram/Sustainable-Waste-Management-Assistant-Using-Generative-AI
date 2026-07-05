import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'
import { db, isFirebaseConfigured } from '../firebase/config'

const HISTORY_COLLECTION = 'history'

/**
 * Save an analysis result to Firestore history.
 * @param {object} data - { item, category, recyclable }
 */
export async function saveToHistory({ item, category, recyclable }) {
  if (!isFirebaseConfigured || !db) {
    console.warn('Firebase not configured — history will not be saved.')
    return null
  }

  const docRef = await addDoc(collection(db, HISTORY_COLLECTION), {
    item,
    category,
    recyclable,
    timestamp: serverTimestamp(),
  })

  return docRef.id
}

/**
 * Fetch all history entries, newest first.
 * @returns {Promise<Array>} History records
 */
export async function fetchHistory() {
  if (!isFirebaseConfigured || !db) {
    return []
  }

  const q = query(
    collection(db, HISTORY_COLLECTION),
    orderBy('timestamp', 'desc'),
  )

  const snapshot = await getDocs(q)

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    // Convert Firestore timestamp to JS Date for display
    timestamp: doc.data().timestamp?.toDate?.() ?? new Date(),
  }))
}
