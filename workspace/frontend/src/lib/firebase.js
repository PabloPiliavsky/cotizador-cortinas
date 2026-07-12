import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD03eBZmLCgcsPNX7KrYi8fjjuFIa8ebmU",
  authDomain: "metalconf-ff3ba.firebaseapp.com",
  projectId: "metalconf-ff3ba",
  storageBucket: "metalconf-ff3ba.firebasestorage.app",
  messagingSenderId: "569687219402",
  appId: "1:569687219402:web:219e06cdaddb9e6c212833",
  measurementId: "G-7477H80J70",
}

export const firebaseApp = initializeApp(firebaseConfig)
export const db = getFirestore(firebaseApp)
