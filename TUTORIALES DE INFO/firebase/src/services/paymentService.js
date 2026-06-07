import { db, storage } from './firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  updateDoc, 
  serverTimestamp,
  query,
  where,
  getDocs,
  getDoc
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const PAYMENTS_COLLECTION = 'payments';
const USERS_COLLECTION = 'users';

/**
 * Sube un comprobante de pago a Storage
 * @param {File} file - Archivo del comprobante
 * @param {string} userId - ID del usuario
 * @returns {Promise<string>} URL de descarga del archivo
 */
export const uploadPaymentProof = async (file, userId) => {
  try {
    const storageRef = ref(storage, `payments/${userId}/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error('Error al subir el comprobante:', error);
    throw new Error('No se pudo subir el comprobante. Por favor, inténtalo de nuevo.');
  }
};

/**
 * Crea un nuevo pago en Firestore
 * @param {Object} paymentData - Datos del pago
 * @param {string} userId - ID del usuario
 * @returns {Promise<string>} ID del documento del pago creado
 */
export const createPayment = async (paymentData, userId) => {
  try {
    const paymentRef = doc(collection(db, PAYMENTS_COLLECTION));
    const payment = {
      ...paymentData,
      userId,
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    
    await setDoc(paymentRef, payment);
    
    // Actualizar el estado del usuario
    const userRef = doc(db, USERS_COLLECTION, userId);
    await updateDoc(userRef, {
      paymentStatus: 'pending',
      lastPaymentId: paymentRef.id,
      updatedAt: serverTimestamp(),
    });
    
    return paymentRef.id;
  } catch (error) {
    console.error('Error al crear el pago:', error);
    throw new Error('No se pudo procesar el pago. Por favor, inténtalo de nuevo.');
  }
};

/**
 * Obtiene los pagos de un usuario
 * @param {string} userId - ID del usuario
 * @returns {Promise<Array>} Lista de pagos del usuario
 */
export const getUserPayments = async (userId) => {
  try {
    const q = query(
      collection(db, PAYMENTS_COLLECTION),
      where('userId', '==', userId)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      // Convertir timestamps a fechas legibles
      createdAt: doc.data().createdAt?.toDate().toLocaleDateString(),
      updatedAt: doc.data().updatedAt?.toDate().toLocaleDateString(),
    }));
  } catch (error) {
    console.error('Error al obtener los pagos:', error);
    throw new Error('No se pudieron cargar los pagos. Por favor, recarga la página.');
  }
};

/**
 * Actualiza el estado de un pago (solo para administradores)
 * @param {string} paymentId - ID del pago
 * @param {string} status - Nuevo estado (approved, rejected, pending)
 * @param {string} adminId - ID del administrador que realiza la acción
 * @param {string} [notes] - Notas adicionales
 */
export const updatePaymentStatus = async (paymentId, status, adminId, notes = '') => {
  try {
    const paymentRef = doc(db, PAYMENTS_COLLECTION, paymentId);
    const paymentDoc = await getDoc(paymentRef);
    
    if (!paymentDoc.exists()) {
      throw new Error('El pago no existe');
    }
    
    const paymentData = paymentDoc.data();
    
    // Actualizar el pago
    await updateDoc(paymentRef, {
      status,
      reviewedBy: adminId,
      reviewedAt: serverTimestamp(),
      notes,
      updatedAt: serverTimestamp(),
    });
    
    // Si el pago es aprobado, actualizar el estado del usuario
    if (status === 'approved') {
      const userRef = doc(db, USERS_COLLECTION, paymentData.userId);
      await updateDoc(userRef, {
        paymentStatus: 'active',
        subscriptionExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días desde ahora
        updatedAt: serverTimestamp(),
      });
    }
    
    return true;
  } catch (error) {
    console.error('Error al actualizar el estado del pago:', error);
    throw new Error('No se pudo actualizar el estado del pago. Por favor, inténtalo de nuevo.');
  }
};

/**
 * Verifica si un usuario tiene un pago activo
 * @param {string} userId - ID del usuario
 * @returns {Promise<boolean>} true si el usuario tiene un pago activo, false en caso contrario
 */
export const hasActivePayment = async (userId) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, userId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      return false;
    }
    
    const userData = userDoc.data();
    
    // Verificar si el usuario tiene un pago activo
    if (userData.paymentStatus === 'active' && userData.subscriptionExpiresAt) {
      const expirationDate = userData.subscriptionExpiresAt.toDate();
      return expirationDate > new Date();
    }
    
    return false;
  } catch (error) {
    console.error('Error al verificar el pago activo:', error);
    return false;
  }
};
