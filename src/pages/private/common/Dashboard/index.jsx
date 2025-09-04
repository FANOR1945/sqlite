import React from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import AdminDashboard from './AdminDashboard';
import ManagerDashboard from './ManagerDashboard';
import DoctorDashboard from './DoctorDashboard';
import PatientDashboard from './PatientDashboard';
import './styles.css';

const Dashboard = ({ onNewReservation, reservations }) => {
  // 🔹 Usar AuthContext para obtener usuario y roles
  const { user, roles } = useAuth();

  const renderDashboardByRole = () => {
    // Tomamos solo el primer rol principal
    const role = roles[0];

    switch (role) {
      case 'administrador':
        return <AdminDashboard user={user} />;
      case 'manager':
        return <ManagerDashboard user={user} />;
      case 'doctor':
        return <DoctorDashboard user={user} reservations={reservations} />;
      case 'patient':
      default:
        return (
          <PatientDashboard
            user={user}
            reservations={reservations}
            onNewReservation={onNewReservation}
          />
        );
    }
  };

  return <div className="dashboard">{renderDashboardByRole()}</div>;
};

export default Dashboard;
