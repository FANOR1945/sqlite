import { useState, useEffect } from "react";
import NestedModal from "../../../../components/nested/Modal";
import GenericModal from "../../../../components/generic/GenericModal";

import "./styles.css";

const TimeSelection = ({ selectedDoctor, selectedTime, selectTime, isGuest, openAuthModal, handleConfirm }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [unavailableDays, setUnavailableDays] = useState([]);
  
  // Horarios disponibles base
  const baseTimeSlots = [
    '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM'
  ];

  useEffect(() => {
    // Cuando cambia el doctor seleccionado, actualizar días no disponibles
    if (selectedDoctor) {
      generateUnavailableDays(selectedDoctor);
    }
  }, [selectedDoctor]);

  useEffect(() => {
    // Cuando se selecciona una fecha, actualizar los horarios disponibles
    if (selectedDate) {
      generateAvailableTimeSlots(selectedDate);
      // Abrir modal de selección de hora
      setShowTimeModal(true);
    }
  }, [selectedDate]);

  const generateUnavailableDays = (doctor) => {
    const today = new Date();
    const unavailable = [];
    
    // Obtener los días que el doctor NO trabaja según su horario
    const workingDays = doctor.schedule.map(item => {
      const dayMap = {
        "Lunes": 1, "Martes": 2, "Miércoles": 3, 
        "Jueves": 4, "Viernes": 5, "Sábado": 6, "Domingo": 0
      };
      return dayMap[item.day];
    });
    
    // Generar los próximos 60 días
    for (let i = 0; i < 60; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Si el día de la semana no está en los días que trabaja, marcarlo como no disponible
      if (!workingDays.includes(date.getDay())) {
        unavailable.push(new Date(date));
      }
    }
    
    setUnavailableDays(unavailable);
  };

  const generateAvailableTimeSlots = (date) => {
    if (!selectedDoctor) return;
    
    const dayOfWeek = date.getDay();
    const dayMap = {
      1: "Lunes", 2: "Martes", 3: "Miércoles", 
      4: "Jueves", 5: "Viernes", 6: "Sábado", 0: "Domingo"
    };
    const dayName = dayMap[dayOfWeek];
    
    // Encontrar el horario del doctor para este día
    const daySchedule = selectedDoctor.schedule.find(s => s.day === dayName);
    
    if (!daySchedule) {
      setAvailableSlots([]);
      return;
    }
    
    // Parsear las horas del doctor para este día
    const timeRanges = daySchedule.hours.split(', ');
    const availableTimes = [];
    
    timeRanges.forEach(range => {
      const [start, end] = range.split(' - ');
      availableTimes.push(...generateSlotsBetweenTimes(start, end));
    });
    
    // Combinar con los slots base y marcar disponibilidad
    const slotsWithAvailability = baseTimeSlots.map(slot => ({
      time: slot,
      available: availableTimes.includes(slot)
    }));
    
    setAvailableSlots(slotsWithAvailability);
  };

  const generateSlotsBetweenTimes = (startTime, endTime) => {
    const slots = [];
    const [startHour, startMinute] = parseTime(startTime);
    const [endHour, endMinute] = parseTime(endTime);
    
    let currentHour = startHour;
    let currentMinute = startMinute;
    
    while (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute)) {
      const timeString = formatTime(currentHour, currentMinute);
      slots.push(timeString);
      
      // Avanzar 30 minutos
      currentMinute += 30;
      if (currentMinute >= 60) {
        currentMinute -= 60;
        currentHour += 1;
      }
    }
    
    return slots;
  };

  const parseTime = (timeStr) => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    
    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
    
    return [hours, minutes || 0];
  };

  const formatTime = (hours, minutes) => {
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const isDayAvailable = (date) => {
    // Comprobar si el día está en los días no disponibles del doctor
    const isUnavailable = unavailableDays.some(unavailableDate => 
      unavailableDate.getDate() === date.getDate() &&
      unavailableDate.getMonth() === date.getMonth() &&
      unavailableDate.getFullYear() === date.getFullYear()
    );

    // Comprobar si es una fecha pasada
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const isPast = date < today;

    return !(isUnavailable || isPast);
  };

  const handleDateSelect = (date) => {
    if (isDayAvailable(date)) {
      setSelectedDate(date);
    }
  };

  const handleTimeSelect = (time) => {
    selectTime(time);
    setShowTimeModal(false);
  };

  const closeTimeModal = () => {
    setShowTimeModal(false);
    setSelectedDate(null);
  };

  const renderCalendar = () => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    
    // Obtener el primer día del mes y la cantidad de días
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Ajustar para que la semana comience en lunes
    let startDay = firstDay === 0 ? 6 : firstDay - 1;

    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const days = [];
    
    // Agregar días vacíos al inicio si es necesario
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="day empty"></div>);
    }

    // Agregar los días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const available = isDayAvailable(date);
      const isSelected = selectedDate && 
        selectedDate.getDate() === date.getDate() &&
        selectedDate.getMonth() === date.getMonth() &&
        selectedDate.getFullYear() === date.getFullYear();

      days.push(
        <div 
          key={`day-${day}`}
          className={`day ${available ? 'available' : 'unavailable'} ${isSelected ? 'selected' : ''}`}
          onClick={() => handleDateSelect(date)}
        >
          {day}
        </div>
      );
    }

    return (
      <div className="calendar-section">
        <div className="calendar-navigation">
          <button className="nav-button" onClick={() => navigateMonth(-1)}>←</button>
          <h2 className="current-month">{`${monthNames[month]} ${year}`}</h2>
          <button className="nav-button" onClick={() => navigateMonth(1)}>→</button>
        </div>

        <div className="week-days">
          <div className="week-day">Lun</div>
          <div className="week-day">Mar</div>
          <div className="week-day">Mié</div>
          <div className="week-day">Jue</div>
          <div className="week-day">Vie</div>
          <div className="week-day">Sáb</div>
          <div className="week-day">Dom</div>
        </div>

        <div className="days-grid">
          {days}
        </div>
      </div>
    );
  };

  const renderTimeSlotsModal = () => {
    if (!selectedDate) return null;

    const dateString = selectedDate.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    return (
      <GenericModal
        isOpen={showTimeModal}
        onClose={closeTimeModal}
        title="Seleccionar horario"
        showCloseButton={true}
        size="medium"
      >
        <div className="time-slots-modal">
          <h3>Horarios disponibles para el {dateString}</h3>
          {availableSlots.filter(slot => slot.available).length > 0 ? (
            <div className="slots-grid">
              {availableSlots.map((slot, index) => (
                <div 
                  key={index}
                  className={`time-slot ${slot.available ? '' : 'unavailable'} ${selectedTime === slot.time ? 'selected' : ''}`}
                  onClick={() => slot.available && handleTimeSelect(slot.time)}
                >
                  {slot.time}
                </div>
              ))}
            </div>
          ) : (
            <p className="no-slots-message">No hay horarios disponibles para esta fecha</p>
          )}
        </div>
      </GenericModal>
    );
  };

  return (
    <NestedModal.Section>
    {selectedDoctor && (
  <div className="doctor-info">
    <h3>{selectedDoctor.name}</h3>
    <p className="doctor-specialty">{selectedDoctor.specialty}</p>
  </div>
)}

      
      {renderCalendar()}
      {renderTimeSlotsModal()}

      {selectedTime && (
        <NestedModal.Actions align="center">
          <div className="selected-time-info">
            <p>Cita seleccionada: {selectedDate?.toLocaleDateString('es-ES')} a las {selectedTime}</p>
          </div>
          <button 
            className="confirm-button" 
            onClick={isGuest ? openAuthModal : handleConfirm}
          >
            {isGuest ? 'Continuar' : 'Reservar'}
          </button>
        </NestedModal.Actions>
      )}
    </NestedModal.Section>
  );
};

export default TimeSelection;