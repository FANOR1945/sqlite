import React from 'react';
import GenericHero from '../../../../components/generic/GenericHero';
import GenericSection from '../../../../components/generic/GenericSection';
import GenericCard from '../../../../components/generic/GenericCard';
import './styles.css';

const Dashboard = ({ onNewReservation, user, reservations }) => {
  // Filtrar reservas por estado
  const upcomingAppointments = reservations.filter(r =>
    r.status === 'pending' || r.status === 'confirmed'
  );

  const completedAppointments = reservations.filter(r =>
    r.status === 'completed'
  );

  const cancelledAppointments = reservations.filter(r =>
    r.status === 'cancelled'
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: 'status-pending',
      confirmed: 'status-confirmed',
      completed: 'status-completed',
      cancelled: 'status-cancelled'
    };

    const statusText = {
      pending: 'Pendiente',
      confirmed: 'Confirmada',
      completed: 'Completada',
      cancelled: 'Cancelada'
    };

    return <span className={`status-badge ${statusClasses[status]}`}>{statusText[status]}</span>;
  };

  return (
    <div className="dashboard">
      {/* Hero personalizado para usuarios autenticados */}
      <GenericHero
        title={`Bienvenido, ${user.name}`}
        subtitle="Gestiona tus citas médicas de forma sencilla"
        ctaText="Nueva Reserva"
        onCtaClick={onNewReservation}
        image="👨‍⚕️"
        imagePosition="right"
        theme="medical"
        size="medium"
      />

      {/* Sección de próximas citas */}
      <GenericSection
        title="Tus Próximas Citas"
        subtitle="Revisa y gestiona tus próximas visitas médicas"
        theme="light"
      >
        {upcomingAppointments.length > 0 ? (
          <div className="appointments-container">
            {upcomingAppointments.map(appointment => (
              <GenericCard
                key={appointment.id}
                icon="📅"
                title={`Cita con ${appointment.doctor?.name || 'Especialista'}`}
                content={
                  <div className="card-content-container">
                    <p>Especialidad: {appointment.specialty?.name || appointment.service?.name}</p>
                    <p>Fecha: {formatDate(appointment.date)} a las {appointment.time}</p>
                    {getStatusBadge(appointment.status)}
                  </div>
                }
                actions={[
                  { text: 'Ver detalles', onClick: () => alert('Detalles de cita') },
                  { text: 'Cancelar', onClick: () => alert('Cancelar cita') }
                ]}
                theme="medical"
              />
            ))}
          </div>
        ) : (
          <div className="no-appointments">
            <p>No tienes citas programadas</p>
            <button onClick={onNewReservation} className="cta-button">
              Reservar mi primera cita
            </button>
          </div>
        )}
      </GenericSection>

      {/* Sección de historial de citas */}
      {completedAppointments.length > 0 && (
        <GenericSection
          title="Historial de Citas Completadas"
          subtitle="Tus visitas médicas anteriores"
          theme="light"
        >
          <div className="appointments-container">
            {completedAppointments.map(appointment => (
              <GenericCard
                key={appointment.id}
                icon="✅"
                title={`Cita con ${appointment.doctor?.name || 'Especialista'}`}
                // En el contenido de GenericCard dentro del Dashboard
                content={
                  <div className="card-content-container">
                    <p>Especialidad: {appointment.specialty?.name || appointment.service?.name}</p>
                    <p>Fecha: {formatDate(appointment.date)} a las {appointment.time}</p>
                    {getStatusBadge(appointment.status)}
                  </div>
                }
                theme="medical-light"
              />
            ))}
          </div>
        </GenericSection>
      )}

      {/* Sección de accesos rápidos */}
      <GenericSection
        title="Accesos Rápidos"
        subtitle="Gestiona tu experiencia en MediReserva"
        columns={3}
      >
        <GenericCard
          icon="👤"
          title="Mi Perfil"
          content="Actualiza tu información personal y preferencias"
          onClick={() => window.location.reload()}
        />
        <GenericCard
          icon="📋"
          title="Historial Médico"
          content="Revisa tu historial de citas y tratamientos"
          onClick={() => alert('Ir a historial médico completo')}
        />
        <GenericCard
          icon="🏥"
          title="Centros Médicos"
          content="Encuentra centros cerca de tu ubicación"
          onClick={() => alert('Ir a centros médicos')}
        />
      </GenericSection>
    </div>
  );
};

export default Dashboard;