import { useState, useEffect } from 'react';
import { usePayments } from '../context/PaymentContext';
import { useNotification } from '../context/NotificationContext';

const PaymentForm = () => {
  const { processPayment, loading } = usePayments();
  const { success: showSuccess, error: showError } = useNotification();
  const [formData, setFormData] = useState({
    amount: '',
    // ... other form fields
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await processPayment(formData);
      // Show success message
      showSuccess('Pago registrado exitosamente');
      // Reset form
      setFormData({ amount: '' });
    } catch (error) {
      console.error('Error:', error);
      showError('Error al procesar el formulario');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form fields */}
      <button type="submit" disabled={loading}>
        {loading ? 'Procesando...' : 'Enviar pago'}
      </button>
    </form>
  );
};

export default PaymentForm;