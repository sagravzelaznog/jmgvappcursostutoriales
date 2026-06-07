import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase';
import LoadingSpinner from '../shared/LoadingSpinner';

const StudentDashboard = () => {
  const { user, userProfile, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Simulación de carga de cursos
        // En una aplicación real, esto vendría de Firestore
        setTimeout(() => {
          const mockCourses = [
            {
              id: '1',
              title: 'Introducción a Firebase',
              progress: 65,
              lastAccessed: 'Hace 2 días',
              thumbnail: 'https://via.placeholder.com/300x180?text=Firebase+Course'
            },
            {
              id: '2',
              title: 'Autenticación con Firebase',
              progress: 30,
              lastAccessed: 'Ayer',
              thumbnail: 'https://via.placeholder.com/300x180?text=Auth+Course'
            }
          ];
          setCourses(mockCourses);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error al cargar cursos:', error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Cargando tu panel..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Mi Aprendizaje</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Hola, {user?.displayName || 'Estudiante'}</span>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="p-8 text-white">
            <h2 className="text-3xl font-bold mb-2">¡Bienvenido de vuelta!</h2>
            <p className="text-blue-100 max-w-2xl">
              Continúa aprendiendo de donde lo dejaste. Tienes {courses.length} cursos en progreso.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`${
                activeTab === 'dashboard'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Mi Progreso
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`${
                activeTab === 'courses'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Mis Cursos
            </button>
            <button
              onClick={() => setActiveTab('certificates')}
              className={`${
                activeTab === 'certificates'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Certificados
            </button>
          </nav>
        </div>

        {/* Dashboard Content */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Cursos en progreso</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                  <div key={course.id} className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="h-40 bg-gray-200">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h4 className="font-medium text-gray-900 mb-2">{course.title}</h4>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500 mb-4">
                        <span>Progreso: {course.progress}%</span>
                        <span>Último acceso: {course.lastAccessed}</span>
                      </div>
                      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                        Continuar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Tu actividad reciente</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Tus últimas actividades en los cursos.</p>
              </div>
              <div className="border-t border-gray-200">
                <ul className="divide-y divide-gray-200">
                  <li className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">Completaste una lección</p>
                        <p className="text-sm text-gray-500">Introducción a Firebase - Lección 2</p>
                      </div>
                      <div className="ml-auto text-sm text-gray-500">Hace 2 días</div>
                    </div>
                  </li>
                  <li className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">Nuevo tiempo de estudio</p>
                        <p className="text-sm text-gray-500">30 minutos en Autenticación con Firebase</p>
                      </div>
                      <div className="ml-auto text-sm text-gray-500">Ayer</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Mis Cursos</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Todos los cursos en los que estás inscrito.</p>
            </div>
            <div className="border-t border-gray-200">
              <ul className="divide-y divide-gray-200">
                {courses.map((course) => (
                  <li key={course.id} className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden bg-gray-200">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{course.title}</h4>
                        <div className="mt-1 flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-xs text-gray-500">{course.progress}%</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <button className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          {course.progress === 0 ? 'Comenzar' : 'Continuar'}
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'certificates' && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Sin certificados aún</h3>
            <p className="mt-1 text-sm text-gray-500">Completa un curso para obtener tu primer certificado.</p>
            <div className="mt-6">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg
                  className="-ml-1 mr-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clipRule="evenodd"
                  />
                </svg>
                Explorar cursos
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 overflow-hidden sm:px-6 lg:px-8">
          <p className="mt-8 text-center text-base text-gray-500">
            &copy; {new Date().getFullYear()} Plataforma de Aprendizaje. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default StudentDashboard;
