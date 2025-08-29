import { useCallback } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import GenericModal from '../../../components/generic/GenericModal';
import useForm from '../../../hooks/useForm';

// Validaciones simplificadas pero completas
const validators = {
  name: v => !v.trim() ? 'Requerido' : v.length < 2 ? 'Mínimo 2 caracteres' : '',
  email: v => !v ? 'Requerido' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Email inválido' : '',
  phone: v => !v ? 'Requerido' : !/^[0-9+\-\s()]{10,}$/.test(v) ? 'Teléfono inválido' : '',
  password: v => !v ? 'Requerido' : v.length < 6 ? 'Mínimo 6 caracteres' : ''
};

const Auth = ({ isOpen, onClose, mode = 'login', onSwitchMode }) => {
  const { login, register, isLoading, error: authError } = useAuth();

  const { formValues, errors, handleInputChange, validateForm, resetForm } = useForm(
    { name: '', email: '', password: '', phone: '' },
    mode === 'login' 
      ? { email: validators.email, password: validators.password } 
      : validators
  );

  const handleSubmit = useCallback(async e => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (mode === 'login') {
        await login({ email: formValues.email, password: formValues.password });
      } else {
        await register({ ...formValues });
      }
      resetForm();
      onClose();
    } catch (err) {
      alert(err.message);
    }
  }, [formValues, mode, login, register, validateForm, resetForm, onClose]);

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={() => { resetForm(); onClose(); }}
      title={mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
      size="small"
    >
      {authError && <div className="error-message">{authError}</div>}

      <form onSubmit={handleSubmit} className="auth-form">
        {mode === 'register' && (
          <div className="form-group">
            <label>Nombre completo:</label>
            <input name="name" value={formValues.name} onChange={handleInputChange} />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>
        )}

        <div className="form-group">
          <label>Email:</label>
          <input name="email" value={formValues.email} onChange={handleInputChange} />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        {mode === 'register' && (
          <div className="form-group">
            <label>Teléfono:</label>
            <input name="phone" value={formValues.phone} onChange={handleInputChange} />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>
        )}

        <div className="form-group">
          <label>Contraseña:</label>
          <input type="password" name="password" value={formValues.password} onChange={handleInputChange} />
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>

        <button type="submit" disabled={isLoading} className="confirm-button full-width">
          {isLoading ? 'Cargando...' : mode === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
        </button>
      </form>

      <p className="auth-switch">
        {mode === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
        <button type="button" onClick={onSwitchMode} disabled={isLoading} className="auth-link">
          {mode === 'login' ? 'Registrarse' : 'Iniciar Sesión'}
        </button>
      </p>
    </GenericModal>
  );
};

export default Auth;
