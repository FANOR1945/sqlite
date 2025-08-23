// index.js (CORREGIDO)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { ReservationProvider } from './contexts/ReservationContext';
import { NestedModalProvider } from './contexts/NestedModalContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* AuthProvider primero porque ReservationProvider lo necesita */}
    <AuthProvider>
      {/* Luego ReservationProvider porque depende de AuthProvider */}
      <ReservationProvider>
        {/* Finalmente NestedModalProvider (no depende de los otros) */}
        <NestedModalProvider>
          <App />
        </NestedModalProvider>
      </ReservationProvider>
    </AuthProvider>
  </React.StrictMode>
);