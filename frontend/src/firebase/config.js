import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBwlKR61BiHLE7P0v5jTWtn8Q5Z1EtmC1s",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "wasteguide-ai-3a05b.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "wasteguide-ai-3a05b",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "wasteguide-ai-3a05b.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "678403281349",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:678403281349:web:49dc37cacc6593e2aa3bac",
}

// Initialize Firebase only when config is present
const isConfigured = firebaseConfig.apiKey && firebaseConfig.projectId

let db = null

if (isConfigured) {
  const app = initializeApp(firebaseConfig)
  db = getFirestore(app)
}

export { db, isConfigured as isFirebaseConfigured }
