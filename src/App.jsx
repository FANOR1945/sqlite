// App.js
import { useAuth } from './contexts/AuthContext';
import { useReservation } from './contexts/ReservationContext';
import { useNestedModal } from './contexts/NestedModalContext';
import Auth from './pages/public/auth';
import Profile from './pages/private/common/Profile';
import Dashboard from './pages/private/common/Dashboard';
import Home from './pages/public/Home';
import GenericHeader from './components/generic/GenericHeader';

import './App.css';
import { useState, useEffect } from 'react';
import Reservation from './pages/private/common/Appointment';

// Debug tools
import { useDebug, DebugConsole } from './debug';
import { useStoreState } from './hooks/useStore';
import { TreeViewer } from './tools/treeView';

function App() {
  const { user, logout, isGuest } = useAuth();
  const { addReservation, getUserReservations } = useReservation();

  // Debug
  const { debugLog, debugMode, toggleDebug } = useDebug();

  // Redux global state
  const appState = useStoreState();

  // Modales
  const { openModal, closeModal, isModalOpen } = useNestedModal();

  // Local state
  const [authModalMode, setAuthModalMode] = useState('login');
  const [pendingReservation, setPendingReservation] = useState(null);

  // Logs iniciales y dependientes de `user`
  useEffect(() => {
    debugLog('App component mounted', 'info');
    debugLog(`User state: ${JSON.stringify(user)}`, 'log');

    if (user) {
      const userReservations = getUserReservations();
      debugLog(`User has ${userReservations.length} reservations`, 'log');
    }
  }, [user, debugLog, getUserReservations]);

  // Funciones de modales
  const openReservationModal = () => {
    debugLog('Opening reservation modal', 'info');
    openModal('reservation');
  };

  const closeReservationModal = () => {
    debugLog('Closing reservation modal', 'info');
    closeModal('reservation');
    setPendingReservation(null);
  };

  const openAuthModal = (mode = 'login') => {
    debugLog(`Opening auth modal in mode: ${mode}`, 'info');
    setAuthModalMode(mode);
    openModal('auth');
  };

  const closeAuthModal = () => {
    debugLog('Closing auth modal', 'info');
    closeModal('auth');
  };

  const openProfile = () => {
    debugLog('Opening profile modal', 'info');
    openModal('profile');
  };

  const closeProfile = () => {
    debugLog('Closing profile modal', 'info');
    closeModal('profile');
  };

  const openFullScreenModal = () => {
    debugLog('Opening fullscreen modal', 'info');
    openModal('fullscreen');
  };

  const closeFullScreenModal = () => {
    debugLog('Closing fullscreen modal', 'info');
    closeModal('fullscreen');
  };

  const switchAuthMode = () => {
    debugLog('Switching auth mode', 'info');
    setAuthModalMode((prev) => (prev === 'login' ? 'register' : 'login'));
  };

  // Manejo de reservas
  const handleReservation = (reservationData) => {
    debugLog('Handling reservation', 'info');
    if (isGuest) {
      debugLog('User is guest, redirecting to auth', 'info');
      setPendingReservation(reservationData);
      closeReservationModal();
      openAuthModal('register');
      return false;
    }

    confirmUserReservation(reservationData);
    return true;
  };

  const confirmUserReservation = (reservationData) => {
    debugLog('Confirming user reservation', 'info');
    const reservation = addReservation({
      ...reservationData,
      user: user,
    });

    debugLog(`Reservation confirmed with ID: ${reservation.id}`, 'success');
    alert(`¡Reserva confirmada! Número de reserva: ${reservation.id}`);
    closeReservationModal();
  };

  const handleAuthSuccess = () => {
    debugLog('Auth success, closing modal', 'info');
    closeAuthModal();

    if (pendingReservation) {
      debugLog('Pending reservation found, processing after auth', 'info');
      setTimeout(() => {
        confirmUserReservation(pendingReservation);
        setPendingReservation(null);
      }, 500);
    }
  };

  // Reservas del usuario
  const userReservations = user ? getUserReservations() : [];

  return (
    <div className="App">
      {/* Botón debug */}
      <button
        onClick={toggleDebug}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '10px',
          padding: '10px 15px',
          backgroundColor: debugMode ? '#4CAF50' : '#333',
          color: 'white',
          zIndex: 2500,
          border: 'none',
          cursor: 'pointer',
          borderRadius: '5px',
          fontWeight: 'bold',
        }}
      >
        Debug {debugMode ? 'ON' : 'OFF'}
      </button>

      {/* Header */}
      <GenericHeader
        title="Gran Potosí"
        user={user}
        onLogin={() => openAuthModal('login')}
        onRegister={() => openAuthModal('register')}
        onProfile={openProfile}
        onLogout={logout}
        theme={user ? 'authenticated' : 'medical'}
      />

      {/* Contenido principal */}
      {user ? (
        <Dashboard
          onNewReservation={openReservationModal}
          user={user}
          reservations={userReservations}
        />
      ) : (
        <Home
          openReservationModal={openReservationModal}
          openFullScreenModal={openFullScreenModal}
          isGuest={isGuest}
        />
      )}

      {/* Modales */}
      <Auth
        isOpen={isModalOpen('auth')}
        onClose={closeAuthModal}
        mode={authModalMode}
        onSwitchMode={switchAuthMode}
        onSuccess={handleAuthSuccess}
      />

      <Reservation
        isOpen={isModalOpen('reservation')}
        onClose={closeReservationModal}
        onConfirm={handleReservation}
        isGuest={isGuest}
      />

      <Profile isOpen={isModalOpen('profile')} onClose={closeProfile} />

      {/* Debug tools */}
      {debugMode && <DebugConsole />}
      {debugMode && <TreeViewer state={appState} />}
    </div>
  );
}

export default App;
