import { useCallback, useEffect } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import useForm from '../../../../hooks/useForm';

const validators = {
  name: (value) => {
    if (!value.trim()) return 'El nombre es requerido';
    if (value.length < 2) return 'El nombre debe tener al menos 2 caracteres';
    return '';
  },
  email: (value) => {
    if (!value) return 'El email es requerido';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Email inválido';
    return '';
  },
  phone: (value) => {
    if (!value) return 'El teléfono es requerido';
    const phoneRegex = /^[0-9+\-\s()]{10,}$/;
    if (!phoneRegex.test(value)) return 'Teléfono inválido';
    return '';
  },
  password: (value) => {
    if (!value) return 'La contraseña es requerida';
    if (value.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
    return '';
  },
  role: (value) => {
    if (!value) return 'Debe seleccionar un rol';
    return '';
  }
};

const Register = ({ onClose }) => {
  const { register, user, isLoading, error: authError } = useAuth();

  // Inicializamos role automáticamente según si hay usuario autenticado
  const initialValues = {
    name: '',
    email: '',
    password: '',
    phone: '',
    role: user ? '' : 'patient' // si no hay user, rol paciente por defecto
  };

  const { formValues, errors, handleInputChange, resetForm, validateForm } = useForm(
    initialValues,
    validators
  );

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await register({
        name: formValues.name,
        email: formValues.email,
        password: formValues.password,
        phone: formValues.phone,
        role: formValues.role
      });
      resetForm();
      onClose();
    } catch (error) {
      console.error('Register error:', error);
    }
  }, [formValues, register, validateForm, resetForm, onClose]);

  return (
    <form onSubmit={handleSubmit} noValidate>
      {authError && <div className="error-message">{authError}</div>}

      <div className="form-group">
        <label htmlFor="name">Nombre completo:</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formValues.name}
          onChange={handleInputChange}
          required
        />
        {errors.name && <span className="error-text">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleInputChange}
          required
        />
        {errors.email && <span className="error-text">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Teléfono:</label>
        <input
          id="phone"
          type="tel"
          name="phone"
          value={formValues.phone}
          onChange={handleInputChange}
          required
        />
        {errors.phone && <span className="error-text">{errors.phone}</span>}
      </div>

      {user && ( // solo si hay usuario autenticado se muestra el select
        <div className="form-group">
          <label htmlFor="role">Tipo de usuario:</label>
          <select
            id="role"
            name="role"
            value={formValues.role}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccione su rol</option>
            
            <option value="patient">Paciente</option>
            <option value="doctor">Médico/Especialista</option>
            <option value="manager">Gerente</option>
            <option value="admin">Administrador</option>
          </select>
          {errors.role && <span className="error-text">{errors.role}</span>}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="password">Contraseña:</label>
        <input
          id="password"
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleInputChange}
          required
        />
        {errors.password && <span className="error-text">{errors.password}</span>}
      </div>

      <button type="submit" className="confirm-button full-width" disabled={isLoading}>
        {isLoading ? 'Cargando...' : 'Registrarse'}
      </button>
    </form>
  );
};

export default Register;
