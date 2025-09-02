import React, { useState } from 'react';
import GenericHero from '../../../../components/generic/GenericHero';
import GenericSection from '../../../../components/generic/GenericSection';
import GenericCard from '../../../../components/generic/GenericCard';

const DoctorDashboard = ({ user, reservations }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Filtrar citas para este doctor
  const doctorAppointments = reservations.filter(r => 
    r.doctor?.id === user.id || r.doctorId === user.id
  );
  
  // Citas de hoy
  const todayAppointments = doctorAppointments.filter(a => {
    const appointmentDate = new Date(a.date);
    return appointmentDate.toDateString() === selectedDate.toDateString();
  });
  
  // Próximas citas
  const upcomingAppointments = doctorAppointments.filter(a => {
    const appointmentDate = new Date(a.date);
    return appointmentDate > selectedDate && 
           appointmentDate.toDateString() !== selectedDate.toDateString();
  }).slice(0, 5); // Mostrar solo las próximas 5

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return timeString.substring(0, 5); // Formato HH:MM
  };

  return (
    <>
      <GenericHero
        title={`Panel del Doctor`}
        subtitle={`Bienvenido, Dr. ${user.name}. Gestiona tus consultas y pacientes.`}
        image="👨‍⚕️"
        imagePosition="right"
        theme="doctor"
        size="medium"
      />

      {/* Citas de hoy */}
      <GenericSection
        title={`Citas para Hoy (${selectedDate.toLocaleDateString('es-ES')})`}
        subtitle="Tu agenda para hoy"
        theme="light"
      >
        {todayAppointments.length > 0 ? (
          <div className="appointments-container">
            {todayAppointments.map(appointment => (
              <GenericCard
                key={appointment.id}
                icon="🕒"
                title={`Cita con ${appointment.patient?.name || 'Paciente'}`}
                content={
                  <div className="card-content-container">
                    <p>Hora: {formatTime(appointment.time)}</p>
                    <p>Servicio: {appointment.service?.name || 'Consulta'}</p>
                    <p>Notas: {appointment.notes || 'Sin notas adicionales'}</p>
                  </div>
                }
                actions={[
                  { text: 'Ver historial', onClick: () => alert('Ver historial médico') },
                  { text: 'Iniciar consulta', onClick: () => alert('Iniciar consulta') }
                ]}
                theme="doctor"
              />
            ))}
          </div>
        ) : (
          <div className="no-appointments">
            <p>No tienes citas programadas para hoy</p>
          </div>
        )}
      </GenericSection>

      {/* Próximas citas */}
      {upcomingAppointments.length > 0 && (
        <GenericSection
          title="Próximas Citas"
          subtitle="Tus próximas consultas programadas"
          theme="light"
        >
          <div className="appointments-container">
            {upcomingAppointments.map(appointment => (
              <GenericCard
                key={appointment.id}
                icon="📅"
                title={`Cita con ${appointment.patient?.name || 'Paciente'}`}
                content={
                  <div className="card-content-container">
                    <p>Fecha: {formatDate(appointment.date)}</p>
                    <p>Hora: {formatTime(appointment.time)}</p>
                    <p>Servicio: {appointment.service?.name || 'Consulta'}</p>
                  </div>
                }
                theme="doctor-light"
              />
            ))}
          </div>
        </GenericSection>
      )}

      {/* Herramientas médicas */}
      <GenericSection
        title="Herramientas Médicas"
        subtitle="Accesos rápidos para tu práctica médica"
        columns={3}
      >
        <GenericCard
          icon="📋"
          title="Historiales Médicos"
          content="Accede a historiales de tus pacientes"
          onClick={() => alert('Ir a historiales médicos')}
          theme="doctor"
        />
        <GenericCard
          icon="💊"
          title="Recetas y Prescripciones"
          content="Gestiona recetas médicas"
          onClick={() => alert('Ir a recetas')}
          theme="doctor"
        />
        <GenericCard
          icon="📊"
          title="Mis Estadísticas"
          content="Revisa tu rendimiento y métricas"
          onClick={() => alert('Ir a estadísticas')}
          theme="doctor"
        />
        <GenericCard
          icon="📅"
          title="Mi Calendario"
          content="Gestiona tu disponibilidad y horarios"
          onClick={() => alert('Ir a calendario')}
          theme="doctor"
        />
        <GenericCard
          icon="👥"
          title="Mis Pacientes"
          content="Lista de pacientes asignados"
          onClick={() => alert('Ir a pacientes')}
          theme="doctor"
        />
        <GenericCard
          icon="🔔"
          title="Notificaciones"
          content="Revisa tus alertas y mensajes"
          onClick={() => alert('Ir a notificaciones')}
          theme="doctor"
        />
      </GenericSection>
    </>
  );
};

export default DoctorDashboard;