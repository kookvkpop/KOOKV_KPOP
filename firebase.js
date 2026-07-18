import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCmOeijeREN2uLAvOgo0oaiV6mpuYLfqxk",
  authDomain: "kookvkpop-190dd.firebaseapp.com",
  projectId: "kookvkpop-190dd",
  storageBucket: "kookvkpop-190dd.firebasestorage.app",
  messagingSenderId: "1034083891854",
  appId: "1:1034083891854:web:325812ee28e6550d9967df",
  measurementId: "G-N5QNTN5Y2S"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
