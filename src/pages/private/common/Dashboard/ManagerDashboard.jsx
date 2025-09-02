import React from 'react';
import GenericHero from '../../../../components/generic/GenericHero';
import GenericSection from '../../../../components/generic/GenericSection';
import GenericCard from '../../../../components/generic/GenericCard';

const ManagerDashboard = ({ user }) => {
  // Datos de ejemplo para métricas de gerencia
  const metrics = {
    monthlyRevenue: '$8,450',
    appointmentsThisMonth: 124,
    patientSatisfaction: '4.8/5',
    availableDoctors: 12,
    occupancyRate: '78%'
  };

  return (
    <>
      <GenericHero
        title={`Panel Gerencial`}
        subtitle={`Bienvenido, ${user.name}. Supervisa el rendimiento de la institución.`}
        image="📊"
        imagePosition="right"
        theme="manager"
        size="medium"
      />

      {/* Métricas de rendimiento */}
      <GenericSection
        title="Métricas de Rendimiento"
        subtitle="Indicadores clave de la institución"
        columns={4}
      >
        <GenericCard
          icon="💰"
          title="Ingresos Mensuales"
          content={metrics.monthlyRevenue}
          theme="manager"
        />
        <GenericCard
          icon="📅"
          title="Citas este Mes"
          content={metrics.appointmentsThisMonth.toString()}
          theme="manager"
        />
        <GenericCard
          icon="⭐"
          title="Satisfacción de Pacientes"
          content={metrics.patientSatisfaction}
          theme="manager"
        />
        <GenericCard
          icon="🏥"
          title="Médicos Disponibles"
          content={metrics.availableDoctors.toString()}
          theme="manager"
        />
      </GenericSection>

      {/* Gestión operativa */}
      <GenericSection
        title="Gestión Operativa"
        subtitle="Herramientas para la gestión diaria"
        columns={3}
      >
        <GenericCard
          icon="👨‍⚕️"
          title="Gestión de Médicos"
          content="Administra el personal médico y sus horarios"
          onClick={() => alert('Ir a gestión de médicos')}
          theme="manager"
        />
        <GenericCard
          icon="📋"
          title="Programación de Citas"
          content="Visualiza y gestiona el calendario de citas"
          onClick={() => alert('Ir a programación')}
          theme="manager"
        />
        <GenericCard
          icon="💰"
          title="Control de Finanzas"
          content="Monitorea ingresos, gastos y rentabilidad"
          onClick={() => alert('Ir a finanzas')}
          theme="manager"
        />
        <GenericCard
          icon="📦"
          title="Inventario y Suministros"
          content="Gestiona inventario de medicamentos y suministros"
          onClick={() => alert('Ir a inventario')}
          theme="manager"
        />
        <GenericCard
          icon="📝"
          title="Reportes Gerenciales"
          content="Genera reportes de rendimiento institucional"
          onClick={() => alert('Ir a reportes gerenciales')}
          theme="manager"
        />
        <GenericCard
          icon="🔔"
          title="Alertas y Notificaciones"
          content="Configura alertas del sistema"
          onClick={() => alert('Ir a alertas')}
          theme="manager"
        />
      </GenericSection>
    </>
  );
};

export default ManagerDashboard;