import { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { useNestedModal } from './contexts/NestedModalContext';
import { useDebug } from './debug';
import { useStoreState } from './hooks/useStore';
import { useReservation } from './contexts/ReservationContext';

import MedicalAppointment from './app/MedicalAppointment';
import NestedModal from './components/nested/Modal';
import GenericHeader from './components/generic/GenericHeader';
import GenericFooter from './components/generic/GenericFooter';
import GenericSection from './components/generic/GenericSection';
import GenericCard from './components/generic/GenericCard';
import Home from './pages/public/Home';
import Auth from './pages/public/auth';
import Dashboard from './pages/private/common/Dashboard';
import Reservation from './pages/private/common/Appointment';
import { TreeViewer } from './tools/treeView';
import './App.css';

function App() {
  const { debugMode } = useDebug();
  const appState = useStoreState();
  const { user, isGuest } = useAuth();
  const { addReservation } = useReservation();
  const { openModal, closeModal, isModalOpen, closeAllModals } =
    useNestedModal();

  const [authModalMode, setAuthModalMode] = useState('login');
  const [pendingReservation, setPendingReservation] = useState(null);

  // 🔹 Funciones para abrir/cerrar modales
  const openAuthModalApp = (mode = 'login') => {
    setAuthModalMode(mode);
    openModal('auth');
  };
  const closeAuthModalApp = () => closeModal('auth');

  const openMedicalApp = () => openModal('medicalApp');
  const closeMedicalApp = () => closeModal('medicalApp');

  // 🔹 Función común para reservas
  const handleReservation = (reservationData) => {
    if (!user || isGuest) {
      setPendingReservation(reservationData);
      openAuthModalApp('register');
      return false;
    }
    const reservation = addReservation({ ...reservationData });
    alert(`¡Reserva confirmada! Número de reserva: ${reservation.id}`);
    closeModal('reservation');
    return true;
  };

  // 🔹 Función al login/registro exitoso
  const handleAuthSuccess = () => {
    closeAllModals();
    if (pendingReservation) {
      setTimeout(() => {
        handleReservation(pendingReservation);
        setPendingReservation(null);
      }, 500);
    }
  };

  const headerItemsPublic = [
    { label: 'Inicio', type: 'link', sectionId: 'inicio' },
    { label: 'Servicios', type: 'link', sectionId: 'servicios' },
    { label: '¿Cómo Funciona?', type: 'link', sectionId: 'como-funciona' },
    {
      label: 'Iniciar Sesión',
      type: 'button',
      onClick: () => openAuthModalApp('login'),
    },
  ];

  const headerItemsModal = [
    {
      label: 'Iniciar Sesión',
      type: 'button',
      onClick: () => openAuthModalApp('login'),
    },
    {
      label: 'Registrarse',
      type: 'button',
      onClick: () => openAuthModalApp('register'),
    },
  ];

  const commonFooter = (
    <GenericFooter
      companyName='MediReserva'
      tagline='Tu salud es nuestra prioridad'
      contact={{ phone: '(123) 456-7890', email: 'info@medireserva.com' }}
      hours={{
        weekdays: 'Lunes a Viernes: 8:00 - 20:00',
        weekends: 'Sábados: 9:00 - 14:00',
      }}
      copyright='© 2025 MediReserva. Todos los derechos reservados.'
    />
  );

  return (
    <div className='App'>
      <GenericHeader
        title='Sistema Médico Gran Potosí'
        items={headerItemsPublic}
        theme='medical'
      />

      {user ? (
        <Dashboard
          user={user}
          reservations={appState.reservations ?? []}
          onNewReservation={openMedicalApp}
        />
      ) : (
        <Home>
          <div
            id='inicio'
            className='banner-section'
          >
            <div className='banner-content'>
              <h2>Bienvenido a nuestro servicio médico</h2>
              <p>Encuentra la mejor atención para tu salud</p>
              <div className='banner-buttons'>
                <button
                  className='banner-btn primary'
                  onClick={openMedicalApp}
                >
                  Reservar Cita
                </button>
                <button
                  className='banner-btn secondary'
                  onClick={() =>
                    document
                      .getElementById('servicios')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                >
                  Ver Servicios
                </button>
              </div>
            </div>
          </div>

          <GenericSection
            id='servicios'
            title='Especialidades Destacadas'
            subtitle='Contamos con los mejores especialistas en cada área'
            columns={4}
          >
            <GenericCard
              icon='❤️'
              title='Cardiología'
              content='Expertos en salud cardiovascular'
            />
            <GenericCard
              icon='🦷'
              title='Odontología'
              content='Cuidado dental integral'
            />
            <GenericCard
              icon='👶'
              title='Pediatría'
              content='Especialistas en salud infantil'
            />
            <GenericCard
              icon='👁️'
              title='Dermatología'
              content='Cuidado de la piel especializado'
            />
          </GenericSection>
        </Home>
      )}

      {/* 🔹 Invitados: Modal MedicalAppointment */}
      {!user && (
        <NestedModal
          isOpen={isModalOpen('medicalApp')}
          onClose={closeMedicalApp}
          title='Sistema Médico Gran Potosí'
          size='fullscreen'
          theme='medical'
          animation='slide'
          customHeader={
            <GenericHeader
              title='Gran Potosí'
              items={headerItemsModal}
              theme='medical'
            />
          }
        >
          <MedicalAppointment
            onClose={closeMedicalApp}
            onOpenAuthModal={openAuthModalApp}
            onAuthSuccess={handleAuthSuccess}
            commonFooter={commonFooter}
          />
        </NestedModal>
      )}

      {/* 🔹 Usuario autenticado: Modal Reservation */}
      {user && (
        <Reservation
          isOpen={isModalOpen('reservation')}
          onClose={() => closeModal('reservation')}
          onConfirm={handleReservation}
          isGuest={false}
        />
      )}

      {/* 🔹 Modal Auth */}
      <Auth
        isOpen={isModalOpen('auth')}
        onClose={closeAuthModalApp}
        title={authModalMode === 'register' ? 'Registro' : 'Iniciar Sesión'}
        size='medium'
        theme='medical'
        showCloseButton={false}
        mode={authModalMode}
        onSwitchMode={() =>
          setAuthModalMode((prev) => (prev === 'login' ? 'register' : 'login'))
        }
        onSuccess={handleAuthSuccess}
      />

      {commonFooter}

      {debugMode && <TreeViewer state={appState} />}
    </div>
  );
}

export default App;
