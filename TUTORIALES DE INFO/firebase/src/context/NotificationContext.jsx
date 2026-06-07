import React, { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback(({ message, type = 'info', autoClose = true, autoCloseDuration = 5000 }) => {
    const id = Date.now().toString();
    const newNotification = {
      id,
      message,
      type,
      autoClose,
      autoCloseDuration
    };

    setNotifications(prev => [...prev, newNotification]);

    // Si no es autoClose, no programamos su eliminación
    if (!autoClose) return;

    // Retornamos la función de limpieza
    return () => {
      setNotifications(prev => prev.filter(notification => notification.id !== id));
    };
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  // Métodos de conveniencia
  const notificationApi = {
    success: (message, options = {}) => 
      addNotification({ ...options, message, type: 'success' }),
    error: (message, options = {}) => 
      addNotification({ ...options, message, type: 'error' }),
    warning: (message, options = {}) => 
      addNotification({ ...options, message, type: 'warning' }),
    info: (message, options = {}) => 
      addNotification({ ...options, message, type: 'info' }),
  };

  return (
    <NotificationContext.Provider value={notificationApi}>
      {children}
      <NotificationContainer 
        notifications={notifications} 
        onRemove={removeNotification} 
      />
    </NotificationContext.Provider>
  );
};

// Componente contenedor de notificaciones
const NotificationContainer = ({ notifications, onRemove }) => {
  return (
    <div className="fixed top-4 right-4 z-50 w-full max-w-xs space-y-2">
      {notifications.map(notification => (
        <Notification 
          key={notification.id}
          id={notification.id}
          message={notification.message}
          type={notification.type}
          autoClose={notification.autoClose}
          autoCloseDuration={notification.autoCloseDuration}
          onClose={() => onRemove(notification.id)}
        />
      ))}
    </div>
  );
};

// Componente de notificación individual
const Notification = ({ id, message, type, autoClose, autoCloseDuration, onClose }) => {
  const notificationRef = React.useRef(null);

  React.useEffect(() => {
    if (!autoClose) return;

    const timer = setTimeout(() => {
      handleClose();
    }, autoCloseDuration);

    return () => clearTimeout(timer);
  }, [autoClose, autoCloseDuration]);

  const handleClose = () => {
    if (notificationRef.current) {
      notificationRef.current.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => onClose?.(id), 200);
    } else {
      onClose?.(id);
    }
  };

  const getNotificationStyles = () => {
    const baseStyles = 'relative p-4 pr-10 mb-2 rounded-lg shadow-lg transition-all duration-200 transform';
    const typeStyles = {
      success: 'bg-green-50 text-green-800 border-l-4 border-green-500',
      error: 'bg-red-50 text-red-800 border-l-4 border-red-500',
      warning: 'bg-yellow-50 text-yellow-800 border-l-4 border-yellow-500',
      info: 'bg-blue-50 text-blue-800 border-l-4 border-blue-500',
    };
    return `${baseStyles} ${typeStyles[type] || typeStyles.info}`;
  };

  const iconMap = {
    success: (
      <div className="inline-flex items-center justify-center flex-shrink-0 w-6 h-6 text-green-500">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </div>
    ),
    error: (
      <div className="inline-flex items-center justify-center flex-shrink-0 w-6 h-6 text-red-500">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>
    ),
    warning: (
      <div className="inline-flex items-center justify-center flex-shrink-0 w-6 h-6 text-yellow-500">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </div>
    ),
    info: (
      <div className="inline-flex items-center justify-center flex-shrink-0 w-6 h-6 text-blue-500">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h2a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      </div>
    ),
  };

  return (
    <div 
      ref={notificationRef}
      className={`${getNotificationStyles()} animate-fadeIn`}
      role="alert"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {iconMap[type] || iconMap.info}
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium">
            {type === 'success' && '¡Éxito!'}
            {type === 'error' && 'Error'}
            {type === 'warning' && 'Advertencia'}
            {type === 'info' && 'Información'}
          </p>
          <p className="mt-1 text-sm">{message}</p>
        </div>
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md"
        >
          <span className="sr-only">Cerrar</span>
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Hook personalizado para usar el contexto
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification debe ser usado dentro de un NotificationProvider');
  }
  return context;
};

export default NotificationContext;
