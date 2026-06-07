import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import LoadingSpinner from '../shared/LoadingSpinner';

const AdminPanel = () => {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    pendingUsers: 0,
    paymentsToday: 0,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        let usersQuery;
        
        if (activeTab === 'pending') {
          usersQuery = query(collection(db, 'users'), where('status', '==', 'pending'));
        } else if (activeTab === 'active') {
          usersQuery = query(collection(db, 'users'), where('status', '==', 'active'));
        } else {
          usersQuery = collection(db, 'users');
        }

        const querySnapshot = await getDocs(usersQuery);
        const usersData = [];
        
        // Contadores para estadísticas
        let activeCount = 0;
        let pendingCount = 0;
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        let paymentsToday = 0;

        querySnapshot.forEach((doc) => {
          const userData = { id: doc.id, ...doc.data() };
          usersData.push(userData);
          
          // Contar usuarios activos y pendientes
          if (userData.status === 'active') {
            activeCount++;
            // Verificar si el pago fue hoy
            if (userData.paymentDate) {
              const paymentDate = userData.paymentDate.toDate();
              if (paymentDate >= today) {
                paymentsToday++;
              }
            }
          } else if (userData.status === 'pending') {
            pendingCount++;
          }
        });

        setUsers(usersData);
        setStats({
          totalUsers: usersData.length,
          activeUsers: activeCount,
          pendingUsers: pendingCount,
          paymentsToday: paymentsToday,
        });
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [activeTab]);

  const handleApproveUser = async (userId) => {
    if (window.confirm('¿Estás seguro de aprobar este usuario?')) {
      try {
        await updateDoc(doc(db, 'users', userId), {
          status: 'active',
          approvedAt: new Date(),
          approvedBy: user.uid,
        });
        // Actualizar la lista de usuarios
        setUsers(users.map(u => 
          u.id === userId ? { ...u, status: 'active' } : u
        ));
      } catch (error) {
        console.error('Error al aprobar usuario:', error);
      }
    }
  };

  const handleRejectUser = async (userId) => {
    if (window.confirm('¿Estás seguro de rechazar este usuario?')) {
      try {
        await updateDoc(doc(db, 'users', userId), {
          status: 'rejected',
          rejectedAt: new Date(),
          rejectedBy: user.uid,
        });
        // Actualizar la lista de usuarios
        setUsers(users.filter(u => u.id !== userId));
      } catch (error) {
        console.error('Error al rechazar usuario:', error);
      }
    }
  };

  if (loading) {
    return <LoadingSpinner message="Cargando panel de administración..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">{user?.email}</span>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <dl className="grid grid-cols-1 gap-5 sm:grid-cols-4">
          <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Usuarios Totales</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.totalUsers}</dd>
          </div>
          <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Usuarios Activos</dt>
            <dd className="mt-1 text-3xl font-semibold text-green-600">{stats.activeUsers}</dd>
          </div>
          <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Pendientes de Aprobación</dt>
            <dd className="mt-1 text-3xl font-semibold text-yellow-600">{stats.pendingUsers}</dd>
          </div>
          <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Pagos Hoy</dt>
            <dd className="mt-1 text-3xl font-semibold text-blue-600">{stats.paymentsToday}</dd>
          </div>
        </dl>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('pending')}
              className={`${
                activeTab === 'pending'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Pendientes
              {stats.pendingUsers > 0 && (
                <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {stats.pendingUsers}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('active')}
              className={`${
                activeTab === 'active'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Activos
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`${
                activeTab === 'all'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Todos los Usuarios
            </button>
          </nav>
        </div>

        {/* Users Table */}
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle">
              <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Usuario
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Correo
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Estado
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Fecha de Registro
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Acciones</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-3 py-4 text-sm text-gray-500 text-center">
                          No hay usuarios para mostrar
                        </td>
                      </tr>
                    ) : (
                      users.map((user) => (
                        <tr key={user.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img 
                                  className="h-10 w-10 rounded-full" 
                                  src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email)}&background=random`} 
                                  alt="" 
                                />
                              </div>
                              <div className="ml-4">
                                <div className="font-medium text-gray-900">
                                  {user.displayName || 'Sin nombre'}
                                </div>
                                <div className="text-gray-500">
                                  {user.role || 'Estudiante'}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {user.email}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <span 
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                user.status === 'active'
                                  ? 'bg-green-100 text-green-800'
                                  : user.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {user.status === 'active' 
                                ? 'Activo' 
                                : user.status === 'pending' 
                                  ? 'Pendiente' 
                                  : 'Rechazado'}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {user.createdAt?.toDate ? user.createdAt.toDate().toLocaleDateString() : 'N/A'}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            {user.status === 'pending' && (
                              <div className="space-x-2">
                                <button
                                  onClick={() => handleApproveUser(user.id)}
                                  className="text-green-600 hover:text-green-900"
                                >
                                  Aprobar
                                </button>
                                <button
                                  onClick={() => handleRejectUser(user.id)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  Rechazar
                                </button>
                              </div>
                            )}
                            {user.status === 'active' && (
                              <span className="text-green-600">Activo</span>
                            )}
                            {user.status === 'rejected' && (
                              <span className="text-red-600">Rechazado</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 overflow-hidden sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Panel de Administración. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AdminPanel;
