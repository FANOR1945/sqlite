// Reservation.jsx - Componente principal de reserva
import { useState } from 'react';
import { specialties, doctors, services } from '../mock/data';
import { useNestedModal } from '../contexts/NestedModalContext';
import NestedModal from './nested/Modal';
import DateTimeSelection from '../pages/private/common/DataTimeSelection';

const Reservation = ({ isOpen, onClose, onConfirm, isGuest }) => {
  const [activeOption, setActiveOption] = useState(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showDoctorSchedule, setShowDoctorSchedule] = useState(false);

  const { openModal, goBack } = useNestedModal();

  const resetSelections = () => {
    setActiveOption(null);
    setSelectedSpecialty(null);
    setSelectedDoctor(null);
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedTime(null);
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
      date: selectedDate,
      time: selectedTime,
    };
    
    const success = onConfirm(reservationData);
    if (success) {
      resetSelections();
    }
  };

  const handleGoBack = () => {
    if (selectedTime) {
      setSelectedTime(null);
    } else if (selectedDate) {
      setSelectedDate(null);
    } else if (showDoctorSchedule) {
      setShowDoctorSchedule(false);
    } else if (selectedDoctor) {
      setSelectedDoctor(null);
    } else if (selectedSpecialty || selectedService) {
      setSelectedSpecialty(null);
      setSelectedService(null);
    } else {
      setActiveOption(null);
    }
    
    if (!activeOption && !selectedSpecialty && !selectedDoctor && 
        !selectedDate && !selectedTime && !selectedService && !showDoctorSchedule) {
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
      selectedDate,
      selectedTime: null,
      selectedService,
      showDoctorSchedule: false
    };
    
    localStorage.setItem('reservationState', JSON.stringify(currentState));
    onClose();
    openModal('auth');
  };

  const getModalContent = () => {
    if (!activeOption && !selectedSpecialty && !selectedDoctor && !selectedDate && !selectedTime && !selectedService && !showDoctorSchedule) {
      return (
        <div className="options-grid">
          <div className="option-card" onClick={() => openOption('Médico')}>
            <div className="option-icon">👨‍⚕️</div>
            <h3>Por Médico</h3>
            <p>Busca por nombre de doctor</p>
          </div>
          <div className="option-card" onClick={() => openOption('Especialidad')}>
            <div className="option-icon">🏥</div>
            <h3>Por Especialidad</h3>
            <p>Encuentra por tipo de especialidad médica</p>
          </div>
          <div className="option-card" onClick={() => openOption('Servicio')}>
            <div className="option-icon">📋</div>
            <h3>Por Servicio</h3>
            <p>Selecciona por tipo de servicio</p>
          </div>
        </div>
      );
    }

    if (activeOption === 'Especialidad' && !selectedSpecialty && !selectedDoctor && !selectedDate && !selectedTime && !showDoctorSchedule) {
      return (
        <div className="list-container">
          <h3>Selecciona una especialidad</h3>
          <div className="items-list">
            {specialties.map(specialty => (
              <div key={specialty.id} className="list-item" onClick={() => selectSpecialty(specialty)}>
                <div className="item-info">
                  <h4>{specialty.name}</h4>
                  <p>{specialty.doctors.length} doctores disponibles</p>
                </div>
                <div className="item-arrow">→</div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeOption === 'Especialidad' && selectedSpecialty && !selectedDoctor && !selectedDate && !selectedTime && !showDoctorSchedule) {
      return (
        <div className="list-container">
          <h3>Doctores de {selectedSpecialty.name}</h3>
          <div className="items-list">
            {doctors.filter(d => d.specialty === selectedSpecialty.name).map(doctor => (
              <div key={doctor.id} className="list-item" onClick={() => selectDoctor(doctor)}>
                <div className="item-info">
                  <h4>{doctor.name}</h4>
                  <p>⭐ {doctor.rating} - {doctor.specialty}</p>
                </div>
                <div className="item-arrow">→</div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeOption === 'Médico' && !selectedDoctor && !selectedDate && !selectedTime && !showDoctorSchedule) {
      return (
        <div className="list-container">
          <h3>Selecciona un médico</h3>
          <div className="items-list">
            {doctors.map(doctor => (
              <div key={doctor.id} className="list-item" onClick={() => selectDoctor(doctor)}>
                <div className="item-info">
                  <h4>{doctor.name}</h4>
                  <p>⭐ {doctor.rating} - {doctor.specialty}</p>
                </div>
                <div className="item-arrow">→</div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeOption === 'Servicio' && !selectedService && !selectedDoctor && !selectedDate && !selectedTime && !showDoctorSchedule) {
      return (
        <div className="list-container">
          <h3>Selecciona un servicio</h3>
          <div className="items-list">
            {services.map(service => (
              <div key={service.id} className="list-item" onClick={() => selectService(service)}>
                <div className="item-info">
                  <h4>{service.name}</h4>
                  <p>{service.duration} - {service.price}</p>
                </div>
                <div className="item-arrow">→</div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeOption === 'Servicio' && selectedService && !selectedDoctor && !selectedDate && !selectedTime && !showDoctorSchedule) {
      let relatedSpecialty = "General";
      if (selectedService.name.includes("Dental")) relatedSpecialty = "Odontología";
      
      return (
        <div className="list-container">
          <h3>Doctores para {selectedService.name}</h3>
          <div className="items-list">
            {doctors.filter(d => d.specialty === relatedSpecialty || relatedSpecialty === "General").map(doctor => (
              <div key={doctor.id} className="list-item" onClick={() => selectDoctor(doctor)}>
                <div className="item-info">
                  <h4>{doctor.name}</h4>
                  <p>⭐ {doctor.rating} - {doctor.specialty}</p>
                </div>
                <div className="item-arrow">→</div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (selectedDoctor && showDoctorSchedule) {
      return (
        <NestedModal.Section>
          <h3>Horarios de Atención - {selectedDoctor.name}</h3>
          <div className="doctor-schedule">
            {selectedDoctor.schedule.map((daySchedule, index) => (
              <div key={index} className="schedule-day">
                <h4>{daySchedule.day}</h4>
                <p>{daySchedule.hours}</p>
              </div>
            ))}
          </div>
          <NestedModal.Actions align="center">
            <button className="confirm-button" onClick={continueToTimeSelection}>
              Ver Horarios Disponibles
            </button>
          </NestedModal.Actions>
        </NestedModal.Section>
      );
    }

    if (selectedDoctor && !selectedTime && !showDoctorSchedule) {
      return (
        <NestedModal.Section>
          <h3>Selecciona fecha y horario con {selectedDoctor.name}</h3>
          {isGuest && (
            <p className="schedule-notice">
              ⚠️ Deberás registrarte para confirmar tu cita
            </p>
          )}
          
          <DateTimeSelection 
            selectedDoctor={selectedDoctor}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onDateSelect={setSelectedDate}
            onTimeSelect={setSelectedTime}
            isGuest={isGuest}
          />
          
          {selectedTime && (
            <NestedModal.Actions align="center">
              <button 
                className="confirm-button" 
                onClick={isGuest ? openAuthModal : handleConfirm}
              >
                {isGuest ? 'Continuar como Invitado' : 'RESERVAR'}
              </button>
            </NestedModal.Actions>
          )}
        </NestedModal.Section>
      );
    }

    if (selectedTime) {
      return (
        <div className="confirmation-container">
          <NestedModal.Section>
            <h3>Resumen de tu cita</h3>
            <div className="reservation-summary">
              <p><strong>Doctor:</strong> {selectedDoctor.name}</p>
              {selectedSpecialty && <p><strong>Especialidad:</strong> {selectedSpecialty.name}</p>}
              {selectedService && <p><strong>Servicio:</strong> {selectedService.name}</p>}
              <p><strong>Fecha:</strong> {selectedDate.toLocaleDateString()}</p>
              <p><strong>Horario:</strong> {selectedTime}</p>
              <p><strong>Estado:</strong> {isGuest ? 'Pendiente de registro' : 'Confirmada'}</p>
              
              {isGuest && (
                <div className="guest-warning">
                  <p>⚠️ Reservarás como invitado. Deberás:</p>
                  <ol>
                    <li>Completar el registro en los próximos minutos</li>
                    <li>Confirmar tu cita con tus datos personales</li>
                    <li>Si no confirmas, tu cita se liberará en 24 horas</li>
                  </ol>
                </div>
              )}
            </div>
          </NestedModal.Section>
          
          <NestedModal.Actions align="space-between">
            <button className="back-button" onClick={() => setSelectedTime(null)}>
              ← Volver
            </button>
            <button 
              className="confirm-button" 
              onClick={isGuest ? openAuthModal : handleConfirm}
            >
              {isGuest ? 'Continuar como Invitado' : 'RESERVAR'}
            </button>
          </NestedModal.Actions>
        </div>
      );
    }
  };

  const getModalTitle = () => {
    if (selectedTime) return "Confirmar Cita";
    if (selectedDate) return "Seleccionar Horario";
    if (showDoctorSchedule) return "Horarios de Atención";
    if (selectedDoctor) return "Seleccionar Fecha";
    if (selectedSpecialty || selectedService) return "Seleccionar Doctor";
    if (activeOption) return `Búsqueda por ${activeOption}`;
    return "¿Cómo quieres buscar tu cita?";
  };

  const showBackButton = activeOption || selectedSpecialty || selectedDoctor || 
                        selectedDate || selectedTime || selectedService || showDoctorSchedule;

  return (
    <NestedModal
      isOpen={isOpen}
      onClose={handleClose}
      title={getModalTitle()}
      showBackButton={showBackButton}
      onBack={handleGoBack}
      size="xlarge"
      theme="medical"
      overlayClose={false}
      animation="slide"
    >
      {getModalContent()}
    </NestedModal>
  );
};

export default Reservation;