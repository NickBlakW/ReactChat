import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBtavHlAL8iq_VsTEe9GSLCnENmRTNcbww',
  authDomain: 'reactchat-af0c4.firebaseapp.com',
  databaseURL:
    'https://reactchat-af0c4-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'reactchat-af0c4',
  storageBucket: 'reactchat-af0c4.appspot.com',
  messagingSenderId: '751933296007',
  appId: '1:751933296007:web:3d7800c4e539ce2a565722',
  measurementId: 'G-LNHXPDJHSM',
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = initializeFirestore(app, { experimentalForceLongPolling: true });
const auth = getAuth(app);

export { db, auth };
