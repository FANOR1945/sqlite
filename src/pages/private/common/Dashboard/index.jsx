import React from 'react';
import GenericHero from '../../../../components/generic/GenericHero';
import GenericSection from '../../../../components/generic/GenericSection';
import GenericCard from '../../../../components/generic/GenericCard';
import AdminDashboard from './AdminDashboard';
import ManagerDashboard from './ManagerDashboard';
import DoctorDashboard from './DoctorDashboard';
import PatientDashboard from './PatientDashboard';
import './styles.css';

const Dashboard = ({ onNewReservation, user, reservations }) => {
  // Determinar el dashboard a mostrar según el rol
  const renderDashboardByRole = () => {
    switch(user.role) {
      case 'admin':
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

  return (
    <div className="dashboard">
      {renderDashboardByRole()}
    </div>
  );
};

export default Dashboard;