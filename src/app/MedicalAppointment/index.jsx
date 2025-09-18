import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNestedModal } from '../../contexts/NestedModalContext';
import Home from '../../pages/public/Home';
import Reservation from '../../pages/private/common/Appointment';
import GenericHero from '../../components/generic/GenericHero';

function MedicalAppointment({ onOpenAuthModal, onAuthSuccess, commonFooter }) {
  const { isGuest } = useAuth();
  const { openModal, closeModal, isModalOpen } = useNestedModal();
  const [pendingReservation, setPendingReservation] = useState(null);

  const openReservationModal = () => openModal('reservation');
  const closeReservationModal = () => closeModal('reservation');

  const handleReservation = (reservationData) => {
    if (isGuest) {
      setPendingReservation(reservationData);
      closeReservationModal();
      onOpenAuthModal('register');
      return false;
    }
    // La reserva real se maneja desde App
    onAuthSuccess?.(reservationData);
    return true;
  };

  return (
    <Home>
      <div style={{ padding: '2rem' }} />

      <GenericHero
        title='Reserva tu Cita Médica'
        subtitle='Encuentra al especialista perfecto para tus necesidades de salud'
        ctaText='Comenzar'
        onCtaClick={openReservationModal}
        image='🩺'
        imagePosition='right'
        theme='medical'
      >
        {isGuest && (
          <p className='guest-notice'>
            Puedes explorar como invitado, pero necesitarás{' '}
            <button
              className='text-link'
              onClick={() => onOpenAuthModal('register')}
            >
              registrarte
            </button>{' '}
            para confirmar tu cita
          </p>
        )}
      </GenericHero>

      <Reservation
        isOpen={isModalOpen('reservation')}
        onClose={closeReservationModal}
        onConfirm={handleReservation}
        isGuest={isGuest}
      />

      {commonFooter}
    </Home>
  );
}

export default MedicalAppointment;
