import { useState, useEffect } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import './styles.css';

const Profile = ({ isOpen, onClose }) => {
  const { user, logout, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialty: '',
    licenseNumber: '',
    department: '',
    notifications: true,
    reminders: true
  });

  // Efecto para cargar los datos del usuario cuando se abre el modal
  useEffect(() => {
    if (isOpen && user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        specialty: user.specialty || '',
        licenseNumber: user.licenseNumber || '',
        department: user.department || ''
      }));
    }
  }, [isOpen, user]);

  // Si el modal no está abierto o el usuario no existe, no renderizar nada
  if (!isOpen || !user) return null;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    updateUser(formData);
    alert('Cambios guardados correctamente');
    onClose();
  };

  // Función para obtener el nombre del rol en español
  const getRoleName = (role) => {
    const roles = {
      patient: 'Paciente',
      doctor: 'Médico',
      manager: 'Gerente',
      admin: 'Administrador'
    };
    return roles[role] || 'Usuario';
  };

  // Renderizar campos específicos según el rol
  const renderRoleSpecificFields = () => {
    switch(user.role) {
      case 'doctor':
        return (
          <>
            <div className="form-group">
              <label>Especialidad</label>
              <input
                type="text"
                name="specialty"
                value={formData.specialty}
                onChange={handleInputChange}
                placeholder="Ej: Cardiología, Pediatría, etc."
              />
            </div>
            <div className="form-group">
              <label>Número de Licencia</label>
              <input
                type="text"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleInputChange}
                placeholder="Número de colegiado/licencia"
              />
            </div>
          </>
        );
      case 'manager':
        return (
          <div className="form-group">
            <label>Departamento</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              placeholder="Ej: Administración, Recursos Humanos, etc."
            />
          </div>
        );
      case 'admin':
        return (
          <div className="form-group">
            <label>Nivel de Acceso</label>
            <input
              type="text"
              value="Acceso Completo al Sistema"
              disabled
              className="disabled-field"
            />
          </div>
        );
      default:
        return (
          <div className="form-group">
            <label>Historial Médico</label>
            <button 
              type="button" 
              className="view-history-btn"
              onClick={() => alert('Redirigiendo al historial médico completo')}
            >
              Ver Historial Completo
            </button>
          </div>
        );
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal profile-modal">
        <div className="modal-header">
          <h2>Mi Perfil</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="profile-body">
          {/* Información del usuario */}
          <div className="user-info-section">
            <div className="user-avatar">
              {user.name.charAt(0).toUpperCase()}
              <span className={`role-badge role-${user.role}`}>
                {getRoleName(user.role)}
              </span>
            </div>
            <div className="user-details">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              {user.phone && <p>{user.phone}</p>}
              {user.specialty && <p>Especialidad: {user.specialty}</p>}
            </div>
          </div>

          {/* Pestañas de navegación */}
          <div className="profile-tabs">
            <button
              className={`tab-button ${activeTab === 'basic' ? 'active' : ''}`}
              onClick={() => setActiveTab('basic')}
            >
              Información {user.role === 'doctor' ? 'Profesional' : 'Básica'}
            </button>
            <button
              className={`tab-button ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              Seguridad
            </button>
            <button
              className={`tab-button ${activeTab === 'preferences' ? 'active' : ''}`}
              onClick={() => setActiveTab('preferences')}
            >
              Preferencias
            </button>
          </div>

          {/* Contenido de las pestañas */}
          <div className="tab-content">
            {activeTab === 'basic' && (
              <div className="basic-tab">
                <h3>
                  {user.role === 'doctor' ? 'Información Profesional' : 
                   user.role === 'manager' ? 'Información de Gerencia' :
                   user.role === 'admin' ? 'Información de Administrador' :
                   'Información Personal'}
                </h3>

                <div className="form-group">
                  <label>Nombre Completo</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Teléfono</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+34 123 456 789"
                  />
                </div>

                {/* Campos específicos por rol */}
                {renderRoleSpecificFields()}
              </div>
            )}

            {activeTab === 'security' && (
              <div className="security-tab">
                <h3>Seguridad de la Cuenta</h3>

                <div className="form-group">
                  <label>Contraseña Actual</label>
                  <input type="password" placeholder="Ingresa tu contraseña actual" />
                </div>

                <div className="form-group">
                  <label>Nueva Contraseña</label>
                  <input type="password" placeholder="Ingresa tu nueva contraseña" />
                </div>

                <div className="form-group">
                  <label>Confirmar Nueva Contraseña</label>
                  <input type="password" placeholder="Confirma tu nueva contraseña" />
                </div>

                <button className="update-password-btn">
                  Actualizar Contraseña
                </button>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="preferences-tab">
                <h3>Preferencias de Notificaciones</h3>

                <div className="preference-item">
                  <label>
                    <input
                      type="checkbox"
                      name="notifications"
                      checked={formData.notifications}
                      onChange={handleInputChange}
                    />
                    Notificaciones por email
                  </label>
                </div>

                <div className="preference-item">
                  <label>
                    <input
                      type="checkbox"
                      name="reminders"
                      checked={formData.reminders}
                      onChange={handleInputChange}
                    />
                    Recordatorios de citas
                  </label>
                </div>

                {/* Preferencias específicas para médicos */}
                {user.role === 'doctor' && (
                  <div className="preference-item">
                    <label>
                      <input type="checkbox" defaultChecked />
                      Notificaciones de citas canceladas
                    </label>
                  </div>
                )}

                {/* Preferencias específicas para gerentes */}
                {user.role === 'manager' && (
                  <div className="preference-item">
                    <label>
                      <input type="checkbox" defaultChecked />
                      Alertas de reportes mensuales
                    </label>
                  </div>
                )}

                <div className="preference-item">
                  <label>
                    <input type="checkbox" defaultChecked />
                    Noticias y actualizaciones
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Botones de acción */}
          <div className="profile-actions">
            <button className="cancel-btn" onClick={onClose}>
              Cancelar
            </button>
            <button className="save-btn" onClick={handleSave}>
              Guardar Cambios
            </button>
          </div>

          <div className="logout-section">
            <button className="logout-btn" onClick={logout}>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;