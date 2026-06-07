import React from 'react';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../shared/LoadingSpinner';

const Login = () => {
  const { loginWithGoogle, loading, error } = useAuth();

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginWithGoogle();
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Iniciando sesión..." />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Bienvenido</h1>
              <p className="text-gray-600">Inicia sesión para acceder a tu cuenta</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="space-y-6">
              <div>
                <button
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" aria-hidden="true">
                    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                      <path
                        fill="#4285F4"
                        d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.28426 53.749 C -8.73374 55.894 -10.1781 57.979 -12.8073 59.269 L -12.8023 59.289 L -6.85241 63.744 L -6.85241 63.744 C -9.53958 61.521 -10.939 57.799 -10.939 53.479 C -10.939 52.559 -10.869 51.669 -10.729 50.809 C -6.30442 50.159 -3.264 53.274 -3.264 51.509 Z"
                      />
                      <path
                        fill="#34A853"
                        d="M -14.754 63.239 C -9.44395 63.239 -4.95928 60.024 -3.40436 55.264 L -10.729 50.809 C -11.999 53.994 -14.754 56.639 -18.774 56.639 C -20.8508 56.644 -22.8373 55.928 -24.4119 54.619 L -30.499 58.589 L -30.499 58.589 C -27.5559 61.479 -23.2219 63.239 -18.764 63.239 C -17.554 63.249 -16.344 63.119 -15.154 62.849 C -13.964 62.579 -12.804 62.174 -11.694 61.639 L -5.614 65.749 L -5.609 65.739 C -8.254 68.334 -11.854 69.999 -15.894 69.999 C -25.254 69.999 -32.754 62.499 -32.754 52.999 C -32.754 43.499 -25.254 35.999 -15.894 35.999 C -12.564 35.999 -9.514 37.189 -7.094 39.189 L -3.454 35.769 C -6.634 32.919 -10.984 30.999 -15.894 30.999 C -27.164 30.999 -36.254 40.089 -36.254 51.359 C -36.254 62.629 -27.164 71.719 -15.894 71.719 C -3.904 71.719 5.746 61.609 5.746 51.359 C 5.746 49.469 5.486 47.599 4.976 45.799 L -3.264 45.799 L -3.264 51.509 L -14.754 51.509 L -14.754 63.239 Z"
                      />
                    </g>
                  </svg>
                  Continuar con Google
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">O ingresa manualmente</span>
                </div>
              </div>

              <form className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="tucorreo@ejemplo.com"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="••••••••"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Recordarme
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    Iniciar sesión
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          <div className="bg-gray-50 px-8 py-6 text-center">
            <p className="text-sm text-gray-600">
              ¿No tienes una cuenta?{' '}
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Regístrate
              </a>
            </p>
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Al continuar, aceptas nuestros <a href="#" className="text-blue-600 hover:underline">Términos de servicio</a> y <a href="#" className="text-blue-600 hover:underline">Política de privacidad</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
