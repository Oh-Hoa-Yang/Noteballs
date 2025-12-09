// All comments are removed (copy & paste from the firebase setup instructions)

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCPoRe71VzK_j7ufB6453BdhS5O8w60nlQ',
  authDomain: 'noteballs-50a2a.firebaseapp.com',
  projectId: 'noteballs-50a2a',
  storageBucket: 'noteballs-50a2a.firebasestorage.app',
  messagingSenderId: '58516923416',
  appId: '1:58516923416:web:1cf0916588475ec3d48f6d'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {
    db,
    auth
}