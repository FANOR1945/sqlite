import { useCallback } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import GenericModal from '../../../components/generic/GenericModal';
import useForm from '../../../hooks/useForm';

// Validaciones
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
  }
};

const Auth = ({ isOpen, onClose, mode = 'login', onSwitchMode }) => {
  const { login, register, isLoading, error: authError } = useAuth();
  
  const { formValues, errors, handleInputChange, resetForm, validateForm } = useForm(
    { name: '', email: '', password: '', phone: '' },
    mode === 'login' ? { email: validators.email, password: validators.password } : validators
  );

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (mode === 'login') {
        await login(formValues.email, formValues.password);
      } else {
        await register({
          name: formValues.name,
          email: formValues.email,
          password: formValues.password,
          phone: formValues.phone
        });
      }
      resetForm();
      onClose();
    } catch (error) {
      console.error('Authentication error:', error);
    }
  }, [formValues, mode, login, register, validateForm, resetForm, onClose]);

  const handleClose = useCallback(() => {
    resetForm();
    onClose();
  }, [resetForm, onClose]);

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={handleClose}
      title={mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
      size="small"
    >
      {authError && <div className="error-message">{authError}</div>}

      <div className="auth-form-wrapper">
        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          {mode === 'register' && (
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
          )}

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

          {mode === 'register' && (
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

          <button 
            type="submit" 
            className="confirm-button full-width"
            disabled={isLoading}
          >
            {isLoading ? 'Cargando...' : mode === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
          </button>
        </form>
      </div>

      <p className="auth-switch">
        {mode === 'login' ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
        <button 
          type="button" 
          onClick={onSwitchMode} 
          className="auth-link"
          disabled={isLoading}
        >
          {mode === 'login' ? 'Regístrate aquí' : 'Inicia sesión aquí'}
        </button>
      </p>
    </GenericModal>
  );
};

export default Auth;
