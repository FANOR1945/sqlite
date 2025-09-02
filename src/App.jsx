// App.js
import { useAuth } from './contexts/AuthContext';
import { useReservation } from './contexts/ReservationContext';
import { useNestedModal } from './contexts/NestedModalContext';
import Auth from './pages/public/auth';
import Profile from './pages/private/common/Profile';
import Dashboard from './pages/private/common/Dashboard';
import Home from './pages/public/Home'; // Nueva página Home
import GenericHeader from './components/generic/GenericHeader';


import './App.css';
import { useState } from 'react';
import Reservation from './pages/private/common/Appointment';

function App() {
  const { user, logout, isGuest } = useAuth();
  const { addReservation, getUserReservations } = useReservation();
  
  // Usar el hook de modales anidados
  const { 
    openModal, 
    closeModal, 
    isModalOpen 
  } = useNestedModal();

  const [authModalMode, setAuthModalMode] = useState('login');
  const [pendingReservation, setPendingReservation] = useState(null);

  // Abrir modales usando el hook centralizado
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

  const openFullScreenModal = () => openModal('fullscreen');
  const closeFullScreenModal = () => closeModal('fullscreen');

  const switchAuthMode = () => {
    setAuthModalMode(prev => prev === 'login' ? 'register' : 'login');
  };

  // FUNCIÓN MODIFICADA - Cerrar reserva antes de abrir auth
  const handleReservation = (reservationData) => {
    if (isGuest) {
      setPendingReservation(reservationData);
      closeReservationModal(); // Primero cerrar reserva
      openAuthModal('register'); // Luego abrir auth
      return false;
    }

    confirmUserReservation(reservationData);
    return true;
  };

  const confirmUserReservation = (reservationData) => {
    const reservation = addReservation({
      ...reservationData,
      user: user
    });

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

  // Obtener reservas del usuario para el dashboard
  const userReservations = user ? getUserReservations() : [];

  return (
    <div className="App">
      {/* Header reutilizable */}
      <GenericHeader
        title='Gran Potosí'
        user={user}
        onLogin={() => openAuthModal('login')}
        onRegister={() => openAuthModal('register')}
        onProfile={openProfile}
        onLogout={logout}
        theme={user ? "authenticated" : "medical"}
      />

      {/* Contenido principal - Redirigir a Dashboard si está autenticado */}
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

      {/* Modal de Autenticación */}
      <Auth
        isOpen={isModalOpen('auth')}
        onClose={closeAuthModal}
        mode={authModalMode}
        onSwitchMode={switchAuthMode}
        onSuccess={handleAuthSuccess}
      />

      {/* Modal de Reserva */}
      <Reservation
        isOpen={isModalOpen('reservation')}
        onClose={closeReservationModal}
        onConfirm={handleReservation}
        isGuest={isGuest}
      />

      {/* Modal de Perfil */}
      <Profile 
        isOpen={isModalOpen('profile')} 
        onClose={closeProfile} 
      />

 
     
    </div>
  );
}

export default App;