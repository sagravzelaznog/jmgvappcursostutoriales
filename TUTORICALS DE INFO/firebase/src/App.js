import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes';
import './styles/base.css';

function App() {
  return (
    <React.StrictMode>
      <Router>
        <AuthProvider>
          <div className="min-h-screen bg-gray-50">
            <AppRoutes />
          </div>
        </AuthProvider>
      </Router>
    </React.StrictMode>
  );
}

export default App;
