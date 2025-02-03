import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, query, where, getDocs } from 'firebase/firestore';

const firebaseConfig = {
    apiKey : import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
}

export async function getProjectCountByTag(pRef, tagId) {
  // Erstelle eine Dokument-Referenz für den Tag
  const tagRef = doc(pRef.firestore, 'tags', tagId);

  // Abfrage: Suche nach Projekten, die diese Tag-Referenz im 'tags'-Array enthalten
  const q = query(pRef, where('tags', 'array-contains', tagRef));

  const querySnapshot = await getDocs(q);
  return querySnapshot.size;
}

export { firebaseApp, auth, db, getCurrentUser };