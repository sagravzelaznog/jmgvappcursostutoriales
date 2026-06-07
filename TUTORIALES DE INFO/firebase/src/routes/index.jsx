import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Importamos los componentes de las páginas
import Login from '../components/auth/Login';
import StudentDashboard from '../components/dashboard/StudentDashboard';
import AdminPanel from '../components/admin/AdminPanel';
import PaymentForm from '../components/payment/PaymentForm';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import NotFound from '../components/shared/NotFound';

// Componente para rutas protegidas que requieren autenticación
const PrivateRoute = ({ requiredRole = null }) => {
  const { currentUser, userProfile, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  // Si no hay usuario autenticado, redirigir al login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Si se requiere un rol específico y el usuario no lo tiene
  if (requiredRole && userProfile?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Si el usuario está autenticado (y tiene el rol requerido si es necesario)
  return <Outlet />;
};

// Componente para rutas de invitados (no autenticados)
const GuestRoute = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  // Si el usuario ya está autenticado, redirigir al dashboard correspondiente
  if (currentUser) {
    const redirectTo = currentUser.role === 'admin' ? '/admin' : '/dashboard';
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};

// Componente de rutas de la aplicación
const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      {/* Rutas solo para invitados (no autenticados) */}
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Rutas protegidas para usuarios autenticados */}
      <Route element={<PrivateRoute />}>
        {/* Dashboard del estudiante */}
        <Route path="/dashboard" element={<StudentDashboard />} />
        
        {/* Formulario de pago */}
        <Route path="/payment" element={<PaymentForm />} />
      </Route>

      {/* Rutas protegidas solo para administradores */}
      <Route element={<PrivateRoute requiredRole="admin" />}>
        <Route path="/admin" element={<AdminPanel />} />
      </Route>

      {/* Rutas especiales */}
      <Route path="/unauthorized" element={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Acceso no autorizado</h1>
            <p className="text-gray-600 mb-6">No tienes permiso para acceder a esta página.</p>
            <a 
              href="/dashboard" 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Volver al inicio
            </a>
          </div>
        </div>
      } />

      {/* Ruta 404 - Página no encontrada */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
