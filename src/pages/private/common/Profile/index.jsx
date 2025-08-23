import { useState } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import './styles.css';

const Profile = ({ isOpen, onClose }) => {
  const { user, logout, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    notifications: true,
    reminders: true
  });

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
            </div>
            <div className="user-details">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              {user.phone && <p>{user.phone}</p>}
            </div>
          </div>

          {/* Pestañas de navegación */}
          <div className="profile-tabs">
            <button
              className={`tab-button ${activeTab === 'basic' ? 'active' : ''}`}
              onClick={() => setActiveTab('basic')}
            >
              Información Básica
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
                <h3>Información Personal</h3>

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