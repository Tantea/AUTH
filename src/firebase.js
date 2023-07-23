import { initializeApp } from 'firebase/app'
import {getAuth} from 'firebase/auth'



const firebaseConfig = {
  apiKey: "AIzaSyAAXfPMoLkKB4H21O-Cj2F61xpG3amQiDM",
  authDomain: "reactsign-10d3e.firebaseapp.com",
  projectId: "reactsign-10d3e",
  storageBucket: "reactsign-10d3e.appspot.com",
  messagingSenderId: "279291669957",
  appId: "1:279291669957:web:c8947bd3e5ce554bf92fac"
} 
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export {auth}
