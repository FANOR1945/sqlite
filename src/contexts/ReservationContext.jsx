// contexts/ReservationContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ReservationContext = createContext();

export const useReservation = () => {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error('useReservation debe ser usado dentro de un ReservationProvider');
  }
  return context;
};

export const ReservationProvider = ({ children }) => {
  const [reservations, setReservations] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    // Cargar reservas desde localStorage
    const savedReservations = JSON.parse(localStorage.getItem('reservations') || '[]');

    // Filtrar reservas expiradas
    const validReservations = savedReservations.filter(res => {
      if (res.status === 'pending') {
        const now = new Date();
        const expiresAt = new Date(res.expiresAt);
        return now < expiresAt;
      }
      return true;
    });

    setReservations(validReservations);

    // Actualizar localStorage con reservas válidas
    if (savedReservations.length !== validReservations.length) {
      localStorage.setItem('reservations', JSON.stringify(validReservations));
    }
  }, []);

  const getUserReservations = () => {
    if (!user) return [];
    return reservations.filter(res => res.user.email === user.email);
  };

  const addReservation = (reservationData) => {
    const newReservation = {
      ...reservationData,
      id: Date.now(),
      status: user ? 'confirmed' : 'pending',
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 horas
    };

    setReservations(prev => [...prev, newReservation]);

    // Guardar en localStorage
    const savedReservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    savedReservations.push(newReservation);
    localStorage.setItem('reservations', JSON.stringify(savedReservations));

    return newReservation;
  };

  const confirmReservation = (reservationId) => {
    setReservations(prev =>
      prev.map(res =>
        res.id === reservationId
          ? { ...res, status: 'confirmed' }
          : res
      )
    );

    // Actualizar en localStorage
    const savedReservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    const updatedReservations = savedReservations.map(res =>
      res.id === reservationId
        ? { ...res, status: 'confirmed' }
        : res
    );
    localStorage.setItem('reservations', JSON.stringify(updatedReservations));
  };

  const completeReservation = (reservationId) => {
    setReservations(prev =>
      prev.map(res =>
        res.id === reservationId
          ? { ...res, status: 'completed' }
          : res
      )
    );

    // Actualizar en localStorage
    const savedReservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    const updatedReservations = savedReservations.map(res =>
      res.id === reservationId
        ? { ...res, status: 'completed' }
        : res
    );
    localStorage.setItem('reservations', JSON.stringify(updatedReservations));
  };

  const cancelReservation = (reservationId) => {
    setReservations(prev => prev.filter(res => res.id !== reservationId));

    // Actualizar en localStorage
    const savedReservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    const updatedReservations = savedReservations.filter(res => res.id !== reservationId);
    localStorage.setItem('reservations', JSON.stringify(updatedReservations));
  };

  const value = {
    reservations,
    getUserReservations,
    addReservation,
    confirmReservation,
    completeReservation,
    cancelReservation
  };

  return (
    <ReservationContext.Provider value={value}>
      {children}
    </ReservationContext.Provider>
  );
};