// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCN_2D-qxi4sUla7jI_16u7j8IGTRTGE_Q",
  authDomain: "caterinjuan-bf892.firebaseapp.com",
  projectId: "caterinjuan-bf892",
  storageBucket: "caterinjuan-bf892.firebasestorage.app",
  messagingSenderId: "579783358770",
  appId: "1:579783358770:web:7b031361bd34bbf7c23f2b",
  measurementId: "G-3FPPLSX1W7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);