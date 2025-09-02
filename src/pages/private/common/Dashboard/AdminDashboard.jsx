import React from 'react';
import GenericHero from '../../../../components/generic/GenericHero';
import GenericSection from '../../../../components/generic/GenericSection';
import GenericCard from '../../../../components/generic/GenericCard';

const AdminDashboard = ({ user }) => {
  // Datos de ejemplo para estadísticas
  const stats = {
    totalUsers: 1245,
    newUsersThisMonth: 45,
    totalAppointments: 3789,
    pendingAppointments: 23,
    revenue: '$15,670'
  };

  return (
    <>
      <GenericHero
        title={`Panel de Administración`}
        subtitle={`Bienvenido, ${user.name}. Gestiona todos los aspectos del sistema.`}
        image="⚙️"
        imagePosition="right"
        theme="admin"
        size="medium"
      />

      {/* Estadísticas rápidas */}
      <GenericSection
        title="Resumen del Sistema"
        subtitle="Métricas clave de MediReserva"
        columns={4}
      >
        <GenericCard
          icon="👥"
          title="Usuarios Totales"
          content={stats.totalUsers.toString()}
          theme="admin"
        />
        <GenericCard
          icon="📈"
          title="Nuevos este mes"
          content={stats.newUsersThisMonth.toString()}
          theme="admin"
        />
        <GenericCard
          icon="📅"
          title="Citas Totales"
          content={stats.totalAppointments.toString()}
          theme="admin"
        />
        <GenericCard
          icon="⏳"
          title="Citas Pendientes"
          content={stats.pendingAppointments.toString()}
          theme="admin"
        />
      </GenericSection>

      {/* Acciones de administración */}
      <GenericSection
        title="Herramientas de Administración"
        subtitle="Gestiona usuarios, contenidos y configuraciones"
        columns={3}
      >
        <GenericCard
          icon="👥"
          title="Gestión de Usuarios"
          content="Administra usuarios, roles y permisos"
          onClick={() => alert('Ir a gestión de usuarios')}
          theme="admin"
        />
        <GenericCard
          icon="🏥"
          title="Gestión de Centros"
          content="Administra centros médicos y sus recursos"
          onClick={() => alert('Ir a gestión de centros')}
          theme="admin"
        />
        <GenericCard
          icon="📊"
          title="Reportes y Analytics"
          content="Genera reportes y visualiza métricas"
          onClick={() => alert('Ir a reportes')}
          theme="admin"
        />
        <GenericCard
          icon="⚙️"
          title="Configuración del Sistema"
          content="Ajusta configuraciones globales de la plataforma"
          onClick={() => alert('Ir a configuración')}
          theme="admin"
        />
        <GenericCard
          icon="🔒"
          title="Permisos y Roles"
          content="Gestiona permisos de acceso y roles de usuario"
          onClick={() => alert('Ir a permisos')}
          theme="admin"
        />
        <GenericCard
          icon="📝"
          title="Contenidos y Páginas"
          content="Gestiona contenidos estáticos y páginas informativas"
          onClick={() => alert('Ir a contenidos')}
          theme="admin"
        />
      </GenericSection>
    </>
  );
};

export default AdminDashboard;