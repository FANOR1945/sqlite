import { useState, useEffect } from 'react';
import { generateTimeSlotsForDoctor } from '../../../../data';

const TimeSelection = ({ 
  selectedDoctor, 
  selectedDate, 
  selectDate,
  selectedTime, 
  selectTime, 
  isGuest, 
  openAuthModal, 
  handleConfirm 
}) => {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [unavailableSlots, setUnavailableSlots] = useState([]);

  // Cargar horarios disponibles cuando cambie el doctor o la fecha
  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      const slots = generateTimeSlotsForDoctor(selectedDoctor, selectedDate);
      setAvailableSlots(slots);
      
      // Simular que algunos horarios están ocupados (en una app real, esto vendría de una API)
      const simulatedUnavailable = [];
      if (slots.length > 2) simulatedUnavailable.push(slots[2]);
      if (slots.length > 5) simulatedUnavailable.push(slots[5]);
      if (slots.length > 8) simulatedUnavailable.push(slots[8]);
      
      setUnavailableSlots(simulatedUnavailable);
    }
  }, [selectedDoctor, selectedDate]);

  // Función para formatear la fecha en español
  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Función para cambiar la fecha (día anterior)
  const goToPreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    selectDate(newDate);
  };

  // Función para cambiar la fecha (día siguiente)
  const goToNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    selectDate(newDate);
  };

  return (
    <div className="time-selection">
      <h3>Selecciona un horario con {selectedDoctor.name}</h3>
      {isGuest && (
        <p className="schedule-notice">
          ⚠️ Deberás registrarte para confirmar tu cita
        </p>
      )}
      
      {selectedDate && (
        <div className="date-navigation">
          <button onClick={goToPreviousDay} className="nav-button">←</button>
          <span className="selected-date-info">
            {formatDate(selectedDate)}
          </span>
          <button onClick={goToNextDay} className="nav-button">→</button>
        </div>
      )}
      
      {availableSlots.length === 0 ? (
        <div className="no-slots-message">
          {selectedDate ? 
            "El doctor no tiene horarios disponibles para esta fecha" : 
            "Selecciona una fecha para ver los horarios disponibles"}
        </div>
      ) : (
        <>
          <div className="schedule-grid">
            {availableSlots.map((time, index) => {
              const isUnavailable = unavailableSlots.includes(time);
              const isSelected = selectedTime === time;
              
              return (
                <div 
                  key={index} 
                  className={`time-slot ${isSelected ? 'selected' : ''} ${isUnavailable ? 'unavailable' : ''}`}
                  onClick={() => !isUnavailable && selectTime(time)}
                >
                  {time}
                  {isUnavailable && <span className="slot-status">No disponible</span>}
                </div>
              );
            })}
          </div>
          
          {selectedTime && (
            <div className="time-selection-actions">
              <button 
                className="confirm-button" 
                onClick={isGuest ? openAuthModal : handleConfirm}
              >
                {isGuest ? 'Continuar' : 'Reservar'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TimeSelection;