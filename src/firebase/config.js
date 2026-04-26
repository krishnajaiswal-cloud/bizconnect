import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCCctVdQeY7hX9RVFdvcRi9LG3fV_nDJ9c',
  authDomain: 'bizconnect-india.firebaseapp.com',
  projectId: 'bizconnect-india',
  storageBucket: 'bizconnect-india.firebasestorage.app',
  messagingSenderId: '239669686687',
  appId: '1:239669686687:web:bce5ce584b91c0cfaa4daa',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;