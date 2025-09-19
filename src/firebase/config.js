import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBL3qOtS7Iz76vx-plgKJZ84vdkg1uEDwI",
  authDomain: "my-medicine-store-450d6.firebaseapp.com",
  projectId: "my-medicine-store-450d6",
  storageBucket: "my-medicine-store-450d6.appspot.com",
  messagingSenderId: "323257327215",
  appId: "1:323257327215:web:6117effc1c7a4af1dcb79a"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
