import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBHomdVHLA7UEo6D_ARoXIQ-jWrPzGBf2E",
  authDomain: "proyecto-tiendarte.firebaseapp.com",
  projectId: "proyecto-tiendarte",
  storageBucket: "proyecto-tiendarte.firebasestorage.app",
  messagingSenderId: "660259833828",
  appId: "1:660259833828:web:b9b9b9b9f8be5c67a669f1"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
export const db = getFirestore(app);
