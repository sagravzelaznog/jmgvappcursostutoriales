import { createContext, useContext, useState, useCallback } from 'react';
import { useNotification } from './NotificationContext';

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [isCheckingSubscription, setIsCheckingSubscription] = useState(true);
  const { success: showSuccess, error: showError } = useNotification();

  // ... rest of your existing code ...

  // Example of how to use notifications in your functions
  const processPayment = async (paymentData) => {
    setLoading(true);
    try {
      // Your payment processing logic here
      await someApiCall(paymentData);
      showSuccess('Pago procesado exitosamente');
      await loadPayments();
    } catch (error) {
      console.error('Error processing payment:', error);
      showError('Error al procesar el pago. Por favor, intente de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaymentContext.Provider
      value={{
        payments,
        loading,
        hasActiveSubscription,
        isCheckingSubscription,
        processPayment,
        loadPayments,
        checkActiveSubscription,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayments = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayments debe ser usado dentro de un PaymentProvider');
  }
  return context;
};

export default PaymentContext;