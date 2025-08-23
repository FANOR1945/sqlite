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

const Reservation = ({ isOpen, onClose, onConfirm, isGuest }) => {
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
    const reservationData = {
      doctor: selectedDoctor,
      specialty: selectedSpecialty,
      service: selectedService,
      time: selectedTime,
      date: new Date().toLocaleDateString()
    };
    
    const success = onConfirm(reservationData);
    if (success) {
      resetSelections();
    }
  };

  const handleGoBack = () => {
    if (selectedTime) {
      setSelectedTime(null);
    } else if (showDoctorSchedule) {
      setShowDoctorSchedule(false);
      setSelectedDoctor(null);
    } else if (selectedDoctor) {
      setSelectedDoctor(null);
    } else if (selectedSpecialty || selectedService) {
      setSelectedSpecialty(null);
      setSelectedService(null);
    } else {
      setActiveOption(null);
    }
    
    if (!activeOption && !selectedSpecialty && !selectedDoctor && 
        !selectedTime && !selectedService && !showDoctorSchedule) {
      goBack();
    }
  };

  const selectSpecialty = (specialty) => {
    setSelectedSpecialty(specialty);
  };

  const selectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setShowDoctorSchedule(true);
  };

  const selectTime = (time) => {
    setSelectedTime(time);
  };

  const selectService = (service) => {
    setSelectedService(service);
  };

  const openOption = (option) => {
    setActiveOption(option);
  };

  const continueToTimeSelection = () => {
    setShowDoctorSchedule(false);
  };

  const openAuthModal = () => {
    const currentState = {
      activeOption,
      selectedSpecialty,
      selectedDoctor,
      selectedTime: null,
      selectedService,
      showDoctorSchedule: false
    };
    
    localStorage.setItem('reservationState', JSON.stringify(currentState));
    
    onClose();
    openModal('auth');
  };

  const getModalContent = () => {
    // Pantalla inicial de selección de opción
    if (!activeOption && !selectedSpecialty && !selectedDoctor && !selectedTime && !selectedService && !showDoctorSchedule) {
      return <OptionSelection openOption={openOption} />;
    }

    // Búsqueda por especialidad - seleccionar especialidad
    if (activeOption === 'Especialidad' && !selectedSpecialty && !selectedDoctor && !selectedTime && !showDoctorSchedule) {
      return <SpecialtySelection selectSpecialty={selectSpecialty} />;
    }

    // Búsqueda por especialidad - seleccionar doctor
    if (activeOption === 'Especialidad' && selectedSpecialty && !selectedDoctor && !selectedTime && !showDoctorSchedule) {
      return <DoctorSelection 
               selectedSpecialty={selectedSpecialty} 
               selectDoctor={selectDoctor} 
             />;
    }

    // Búsqueda por médico - seleccionar médico
    if (activeOption === 'Médico' && !selectedDoctor && !selectedTime && !showDoctorSchedule) {
      return <DoctorSelection selectDoctor={selectDoctor} />;
    }

    // Búsqueda por servicio - seleccionar servicio
    if (activeOption === 'Servicio' && !selectedService && !selectedDoctor && !selectedTime && !showDoctorSchedule) {
      return <ServiceSelection selectService={selectService} />;
    }

    // Búsqueda por servicio - seleccionar doctor para el servicio
    if (activeOption === 'Servicio' && selectedService && !selectedDoctor && !selectedTime && !showDoctorSchedule) {
      return <DoctorSelection 
               selectedService={selectedService} 
               selectDoctor={selectDoctor} 
             />;
    }

    // Mostrar horarios de atención del doctor seleccionado
    if (selectedDoctor && showDoctorSchedule) {
      return <ScheduleDisplay 
               selectedDoctor={selectedDoctor} 
               continueToTimeSelection={continueToTimeSelection} 
             />;
    }

    // Seleccionar horario (después de elegir doctor y ver sus horarios)
    if (selectedDoctor && !selectedTime && !showDoctorSchedule) {
      return <TimeSelection 
               selectedDoctor={selectedDoctor} 
               selectedTime={selectedTime} 
               selectTime={selectTime} 
               isGuest={isGuest} 
               openAuthModal={openAuthModal} 
               handleConfirm={handleConfirm} 
             />;
    }

    // Confirmación final
    if (selectedTime) {
      return <Confirmation 
               selectedDoctor={selectedDoctor} 
               selectedSpecialty={selectedSpecialty} 
               selectedService={selectedService} 
               selectedTime={selectedTime} 
               isGuest={isGuest} 
               setSelectedTime={setSelectedTime} 
               openAuthModal={openAuthModal} 
               handleConfirm={handleConfirm} 
             />;
    }
  };

  const getModalTitle = () => {
    if (selectedTime) return "Confirmar Cita";
    if (showDoctorSchedule) return "Horarios de Atención";
    if (selectedDoctor && !showDoctorSchedule) return "Seleccionar Horario";
    if (selectedSpecialty || selectedService) return "Seleccionar Doctor";
    if (activeOption) return `Búsqueda por ${activeOption}`;
    return "¿Cómo quieres buscar tu cita?";
  };

  const showBackButton = activeOption || selectedSpecialty || selectedDoctor || 
                        selectedTime || selectedService || showDoctorSchedule;

  return (
    <NestedModal
      isOpen={isOpen}
      onClose={handleClose}
      title={getModalTitle()}
      showBackButton={showBackButton}
      onBack={handleGoBack}
      size="fullscreen"
      theme="medical"
      overlayClose={false}
      animation="slide"
    >
      {getModalContent()}
    </NestedModal>
  );
};

export default Reservation;