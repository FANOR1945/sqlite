import { useCallback } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import useForm from '../../../../hooks/useForm';

const validators = {
  email: (value) => {
    if (!value) return 'El email es requerido';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Email inválido';
    return '';
  },
  password: (value) => {
    if (!value) return 'La contraseña es requerida';
    if (value.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
    return '';
  }
};

const Login = ({ onClose }) => {
  const { login, isLoading, error: authError } = useAuth();
  const { formValues, errors, handleInputChange, resetForm, validateForm } = useForm(
    { email: '', password: '' },
    validators
  );

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await login(formValues.email, formValues.password);
      resetForm();
      onClose();
    } catch (error) {
      console.error('Login error:', error);
    }
  }, [formValues, login, validateForm, resetForm, onClose]);

  return (
    <form onSubmit={handleSubmit} noValidate>
      {authError && <div className="error-message">{authError}</div>}

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
        {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
      </button>
    </form>
  );
};

export default Login;
