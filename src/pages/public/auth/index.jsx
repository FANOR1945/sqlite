import NestedModal from '../../../components/nested/Modal';
import Login from './Login';
import Register from './Register';

const Auth = ({
  isOpen,
  onClose,
  mode = 'login',
  title,
  size,
  theme,
  showCloseButton,
  onSwitchMode,
  onSuccess,
}) => (
  <NestedModal
    isOpen={isOpen}
    onClose={onClose}
    title={title}
    size={size}
    theme={theme}
    showCloseButton={showCloseButton}
  >
    {mode === 'login' ? (
      <Login
        onClose={onClose}
        onSuccess={onSuccess}
      />
    ) : (
      <Register
        onClose={onClose}
        onSuccess={onSuccess}
      />
    )}
    <p className='auth-switch'>
      {mode === 'login' ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
      <button
        type='button'
        onClick={onSwitchMode}
        className='auth-link'
      >
        {mode === 'login' ? 'Regístrate aquí' : 'Inicia sesión aquí'}
      </button>
    </p>
  </NestedModal>
);

export default Auth;
