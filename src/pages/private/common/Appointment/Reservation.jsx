import { useState } from 'react';
import { useNestedModal } from '../../../../contexts/NestedModalContext';
import NestedModal from '../../../../components/nested/Modal';
import OptionSelection from './OptionSelection';
import SpecialtySelection from './SpecialtySelection';
import DoctorSelection from './DoctorSelection';
import ServiceSelection from './ServiceSelection';
import ScheduleDisplay from './ScheduleDisplay';
import TimeSelection from './TimeSelection';
import Confirmation from './Confirmation';

const Reservation = ({
  isOpen,
  onClose,
  onConfirm,
  isGuest,
  user,
  customHeader,
}) => {
  const [activeOption, setActiveOption] = useState(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [showDoctorSchedule, setShowDoctorSchedule] = useState(false);

  const { openModal, goBack } = useNestedModal();

  const resetSelections = () => {
    setActiveOption(null);
    setSelectedSpecialty(null);
    setSelectedDoctor(null);
    setSelectedTime(null);
    setSelectedService(null);
    setShowDoctorSchedule(false);
  };

  const handleClose = () => {
    resetSelections();
    onClose();
  };

  const handleConfirm = () => {
    // 🔐 Si es invitado -> forzar login
    if (isGuest) {
      openAuthModal();
      return;
    }

    const reservationData = {
      doctor: selectedDoctor,
      specialty: selectedSpecialty,
      service: selectedService,
      time: selectedTime,
      date: new Date().toLocaleDateString(),
    };

    const success = onConfirm(reservationData);
    if (success) resetSelections();
  };

  const handleGoBack = () => {
    if (selectedTime) setSelectedTime(null);
    else if (showDoctorSchedule) {
      setShowDoctorSchedule(false);
      setSelectedDoctor(null);
    } else if (selectedDoctor) setSelectedDoctor(null);
    else if (selectedSpecialty || selectedService) {
      setSelectedSpecialty(null);
      setSelectedService(null);
    } else setActiveOption(null);

    if (
      !activeOption &&
      !selectedSpecialty &&
      !selectedDoctor &&
      !selectedTime &&
      !selectedService &&
      !showDoctorSchedule
    ) {
      goBack();
    }
  };

  // 👇 función para guardar el estado y abrir login
  const openAuthModal = () => {
    const currentState = {
      activeOption,
      selectedSpecialty,
      selectedDoctor,
      selectedTime: null,
      selectedService,
      showDoctorSchedule: false,
    };

    localStorage.setItem('reservationState', JSON.stringify(currentState));

    onClose();
    openModal('auth');
  };

  const getModalContent = () => {
    if (
      !activeOption &&
      !selectedSpecialty &&
      !selectedDoctor &&
      !selectedTime &&
      !selectedService &&
      !showDoctorSchedule
    ) {
      return <OptionSelection openOption={setActiveOption} />;
    }
    if (activeOption === 'Especialidad' && !selectedSpecialty) {
      return <SpecialtySelection selectSpecialty={setSelectedSpecialty} />;
    }
    if (
      activeOption === 'Especialidad' &&
      selectedSpecialty &&
      !selectedDoctor
    ) {
      return (
        <DoctorSelection
          selectedSpecialty={selectedSpecialty}
          selectDoctor={setSelectedDoctor}
        />
      );
    }
    if (activeOption === 'Médico' && !selectedDoctor) {
      return <DoctorSelection selectDoctor={setSelectedDoctor} />;
    }
    if (activeOption === 'Servicio' && !selectedService) {
      return <ServiceSelection selectService={setSelectedService} />;
    }
    if (activeOption === 'Servicio' && selectedService && !selectedDoctor) {
      return (
        <DoctorSelection
          selectedService={selectedService}
          selectDoctor={setSelectedDoctor}
        />
      );
    }
    if (selectedDoctor && showDoctorSchedule) {
      return (
        <ScheduleDisplay
          selectedDoctor={selectedDoctor}
          continueToTimeSelection={() => setShowDoctorSchedule(false)}
        />
      );
    }
    if (selectedDoctor && !selectedTime && !showDoctorSchedule) {
      return (
        <TimeSelection
          selectedDoctor={selectedDoctor}
          selectTime={setSelectedTime}
          isGuest={isGuest}
          openAuthModal={openAuthModal}
          handleConfirm={handleConfirm}
        />
      );
    }
    if (selectedTime) {
      return (
        <Confirmation
          selectedDoctor={selectedDoctor}
          selectedSpecialty={selectedSpecialty}
          selectedService={selectedService}
          selectedTime={selectedTime}
          isGuest={isGuest}
          setSelectedTime={setSelectedTime}
          openAuthModal={openAuthModal}
          handleConfirm={handleConfirm}
        />
      );
    }
  };

  const getModalTitle = () => {
    if (selectedTime) return 'Confirmar Cita';
    if (showDoctorSchedule) return 'Horarios de Atención';
    if (selectedDoctor && !showDoctorSchedule) return 'Seleccionar Horario';
    if (selectedSpecialty || selectedService) return 'Seleccionar Doctor';
    if (activeOption) return `Búsqueda por ${activeOption}`;
    return '¿Cómo quieres buscar tu cita?';
  };

  const showBackButton =
    activeOption ||
    selectedSpecialty ||
    selectedDoctor ||
    selectedTime ||
    selectedService ||
    showDoctorSchedule;

  return (
    <NestedModal
      isOpen={isOpen}
      onClose={handleClose}
      title={getModalTitle()}
      showBackButton={showBackButton}
      onBack={handleGoBack}
      size='fullscreen'
      theme='medical'
      overlayClose={false}
      animation='slide'
      customHeader={customHeader}
    >
      {getModalContent()}
    </NestedModal>
  );
};

export default Reservation;
