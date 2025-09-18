import { useState, useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import { useReservation } from './contexts/ReservationContext';
import { useNestedModal } from './contexts/NestedModalContext';
import { useStoreState } from './hooks/useStore';

import Layout from './components/Layout';
import GenericHeader from './components/generic/GenericHeader';
import Dashboard from './pages/private/common/Dashboard';
import Home from './pages/public/Home';
import Auth from './pages/public/auth';
import Reservation from './pages/private/common/Appointment';
import Profile from './pages/private/common/Profile';
import { TreeViewer } from './tools/treeView';

import './App.css';

function App() {
  const { user, logout, isGuest } = useAuth();
  const { addReservation, getUserReservations } = useReservation();
  const appState = useStoreState();
  const { openModal, closeModal, isModalOpen } = useNestedModal();

  const [authModalMode, setAuthModalMode] = useState('login');
  const [pendingReservation, setPendingReservation] = useState(null);

  useEffect(() => {
    if (user)
      console.log(`User has ${getUserReservations().length} reservations`);
  }, [user, getUserReservations]);

  // --- Modales ---
  const openReservationModal = () => openModal('reservation');
  const closeReservationModal = () => {
    closeModal('reservation');
    setPendingReservation(null);
  };

  const openAuthModal = (mode = 'login') => {
    setAuthModalMode(mode);
    openModal('auth');
  };
  const closeAuthModal = () => closeModal('auth');

  const openProfile = () => openModal('profile');
  const closeProfile = () => closeModal('profile');

  const switchAuthMode = () =>
    setAuthModalMode((prev) => (prev === 'login' ? 'register' : 'login'));

  // --- Manejo de reservas ---
  const handleReservation = (reservationData) => {
    if (isGuest) {
      setPendingReservation(reservationData);
      closeReservationModal();
      openAuthModal('register');
      return false;
    }
    confirmUserReservation(reservationData);
    return true;
  };

  const confirmUserReservation = (reservationData) => {
    const reservation = addReservation({ ...reservationData, user });
    alert(`¡Reserva confirmada! Número de reserva: ${reservation.id}`);
    closeReservationModal();
  };

  const handleAuthSuccess = () => {
    closeAuthModal();
    if (pendingReservation) {
      setTimeout(() => {
        confirmUserReservation(pendingReservation);
        setPendingReservation(null);
      }, 500);
    }
  };

  const userReservations = user ? getUserReservations() : [];

  // --- Header condicional para Reservation ---
  const reservationHeader = !user ? (
    <GenericHeader
      title='Gran Potosí'
      user={user}
      onLogin={() => openAuthModal('login')}
      onRegister={() => openAuthModal('register')}
      onProfile={openProfile}
      onLogout={logout}
      theme='authenticated'
    />
  ) : null;

  return (
    <Layout
      user={user}
      onLogin={() => openAuthModal('login')}
      onRegister={() => openAuthModal('register')}
      onProfile={openProfile}
      onLogout={logout}
    >
      {user ? (
        <Dashboard
          user={user}
          reservations={userReservations}
          onNewReservation={openReservationModal}
        />
      ) : (
        <Home
          openReservationModal={openReservationModal}
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
        user={user}
        customHeader={reservationHeader} // ✅ Header condicional desde App
        openAuthModal={openAuthModal}
      />

      <Profile
        isOpen={isModalOpen('profile')}
        onClose={closeProfile}
      />

      {/* Dev Tool */}
      <TreeViewer state={appState} />
    </Layout>
  );
}

export default App;
