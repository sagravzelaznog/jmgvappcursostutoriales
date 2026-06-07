// Importaciones de Firebase (versión modular)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  query, 
  where, 
  onSnapshot,
  serverTimestamp
} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROYECTO.firebaseapp.com",
  projectId: "TU_PROYECTO_ID",
  storageBucket: "TU_PROYECTO.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID",
  measurementId: "G-XXXXXXXXXX"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Proveedores de autenticación
const googleProvider = new GoogleAuthProvider();

// Colecciones de Firestore
const USERS_COLLECTION = 'users';
const PAYMENTS_COLLECTION = 'payments';

// Funciones de autenticación
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    // Verificar si el usuario ya existe en Firestore
    const userDoc = await getDoc(doc(db, USERS_COLLECTION, result.user.uid));
    
    if (!userDoc.exists()) {
      // Crear documento de usuario si no existe
      await setDoc(doc(db, USERS_COLLECTION, result.user.uid), {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        role: 'student', // Rol por defecto
        status: 'inactive',
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp()
      });
    } else {
      // Actualizar última conexión
      await updateDoc(doc(db, USERS_COLLECTION, result.user.uid), {
        lastLogin: serverTimestamp()
      });
    }
    
    return { user: result.user, isNewUser: !userDoc.exists() };
  } catch (error) {
    console.error("Error en autenticación con Google:", error);
    throw error;
  }
};

const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    throw error;
  }
};

// Funciones de usuario
const getUserProfile = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, USERS_COLLECTION, userId));
    return userDoc.exists() ? { id: userDoc.id, ...userDoc.data() } : null;
  } catch (error) {
    console.error("Error al obtener perfil de usuario:", error);
    throw error;
  }
};

// Funciones de almacenamiento
const uploadFile = async (file, path) => {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error al subir archivo:", error);
    throw error;
  }
};

export {
  auth,
  db,
  storage,
  signInWithGoogle,
  signOutUser,
  onAuthStateChanged,
  getUserProfile,
  uploadFile,
  USERS_COLLECTION,
  PAYMENTS_COLLECTION
};
