// index.js (ACTUALIZADO)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { ReservationProvider } from './contexts/ReservationContext';
import { NestedModalProvider } from './contexts/NestedModalContext';
import { StoreProvider } from './contexts/StoreContext';
import { store } from './redux/store'; // Importa tu store personalizado

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* StoreProvider primero para que todos los componentes tengan acceso */}
    <StoreProvider store={store}>
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
    </StoreProvider>
  </React.StrictMode>
);