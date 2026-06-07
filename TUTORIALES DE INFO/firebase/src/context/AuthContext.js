import { createContext, useContext, useEffect, useState } from 'react';
import { 
  auth, 
  onAuthStateChanged, 
  signInWithGoogle, 
  signOutUser,
  getUserProfile
} from '../services/firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Escuchar cambios en la autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          // Usuario autenticado
          const userData = await getUserProfile(user.uid);
          setCurrentUser(user);
          setUserProfile(userData);
        } else {
          // No hay usuario autenticado
          setCurrentUser(null);
          setUserProfile(null);
        }
      } catch (err) {
        console.error("Error en el contexto de autenticación:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    });

    // Limpiar suscripción al desmontar
    return () => unsubscribe();
  }, []);

  // Iniciar sesión con Google
  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);
      const { user } = await signInWithGoogle();
      const userData = await getUserProfile(user.uid);
      setCurrentUser(user);
      setUserProfile(userData);
      return user;
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Cerrar sesión
  const logout = async () => {
    try {
      setLoading(true);
      await signOutUser();
      setCurrentUser(null);
      setUserProfile(null);
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Actualizar perfil de usuario
  const updateUserProfile = (updates) => {
    setUserProfile(prev => ({
      ...prev,
      ...updates
    }));
  };

  const value = {
    currentUser,
    userProfile,
    loading,
    error,
    loginWithGoogle,
    logout,
    updateUserProfile,
    isAuthenticated: !!currentUser,
    isAdmin: userProfile?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Cargando...</p>
        </div>
      )}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export default AuthContext;
