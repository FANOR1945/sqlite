import GenericModal from '../../../components/generic/GenericModal';
import Login from './Login'
import Register from './Register'

const Auth = ({ isOpen, onClose, mode = 'login', onSwitchMode }) => (
  <GenericModal
    isOpen={isOpen}
    onClose={onClose}
    title={mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
    size="medium"
  >
    {mode === 'login' ? <Login onClose={onClose} /> : <Register onClose={onClose} />}
    <p className="auth-switch">
      {mode === 'login' ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
      <button type="button" onClick={onSwitchMode} className="auth-link">
        {mode === 'login' ? 'Regístrate aquí' : 'Inicia sesión aquí'}
      </button>
    </p>
  </GenericModal>
);

export default Auth;
