// components/generic/NestedModal.jsx
import './styles.css';

const NestedModal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  // Configuración de botones
  showBackButton = false,
  onBack,
  showCloseButton = true,
  customCloseButton = null,
  // Configuración de tamaño y estilo
  size = 'medium', // 'xs', 'small', 'medium', 'large', 'xl', 'fullscreen'
  theme = 'default', // 'default', 'medical', 'auth'
  // Configuración de header y footer personalizados
  customHeader = null,
  customFooter = null,
  // Estados de carga y deshabilitación
  isLoading = false,
  isDisabled = false,
  // Configuración de overlay
  overlayClose = true,
  // Animaciones
  animation = 'scale' // 'scale', 'fade', 'slide'
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && overlayClose) {
      onClose();
    }
  };

  const getSizeClass = () => {
    const sizes = {
      xs: 'modal-xs',
      small: 'modal-small',
      medium: 'modal-medium',
      large: 'modal-large',
      xl: 'modal-xl',
      fullscreen: 'modal-fullscreen'
    };
    return sizes[size] || 'modal-medium';
  };

  const getThemeClass = () => {
    const themes = {
      default: 'theme-default',
      medical: 'theme-medical',
      auth: 'theme-auth'
    };
    return themes[theme] || 'theme-default';
  };

  const getAnimationClass = () => {
    const animations = {
      scale: 'animate-scale',
      fade: 'animate-fade',
      slide: 'animate-slide'
    };
    return animations[animation] || 'animate-scale';
  };

  return (
    <div 
      className={`modal-overlay ${getAnimationClass()} ${size === 'fullscreen' ? 'modal-fullscreen-overlay' : ''}`}
      onClick={handleOverlayClick}
    >
      <div className={`modal ${getSizeClass()} ${getThemeClass()} ${size === 'fullscreen' ? 'modal-fullscreen-content' : ''}`}>
        
        {/* Header personalizado o por defecto */}
        {customHeader ? (
          customHeader
        ) : (
          <div className="modal-header">
            <h2>{title}</h2>
            {showCloseButton && (
              customCloseButton || (
                <button 
                  className="close-button" 
                  onClick={onClose}
                  disabled={isLoading || isDisabled}
                  aria-label="Cerrar modal"
                >
                  ×
                </button>
              )
            )}
          </div>
        )}

        {/* Body del modal */}
        <div className={`modal-body ${size === 'fullscreen' ? 'modal-fullscreen-body' : ''}`}>
          {isLoading ? (
            <div className="modal-loading">
              <div className="loading-spinner"></div>
              <p>Cargando...</p>
            </div>
          ) : (
            children
          )}
        </div>

        {/* Footer personalizado o por defecto */}
        {customFooter ? (
          customFooter
        ) : (
          <div className="modal-footer">
            <div className="modal-footer-content">
              {showBackButton && (
                <button 
                  className="back-button"
                  onClick={onBack}
                  disabled={isLoading || isDisabled}
                >
                  ← Volver
                </button>
              )}
              <div className="modal-footer-actions">
                {showCloseButton && (
                  <button 
                    className="close-modal-button"
                    onClick={onClose}
                    disabled={isLoading || isDisabled}
                  >
                    Olvidar
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Componentes adicionales para modales anidados
NestedModal.Section = ({ children, className = '' }) => (
  <div className={`modal-section ${className}`}>{children}</div>
);

NestedModal.Title = ({ children, level = 2 }) => {
  const Tag = `h${level}`;
  return <Tag className="modal-title">{children}</Tag>;
};

NestedModal.Content = ({ children }) => (
  <div className="modal-content">{children}</div>
);

NestedModal.Actions = ({ children, align = 'right' }) => (
  <div className={`modal-actions modal-actions-${align}`}>{children}</div>
);

export default NestedModal;