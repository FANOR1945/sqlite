import { useEffect } from 'react';
import './styles.css';

const GenericModal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  showBackButton = false,
  onBack,
  showCloseButton = false,
  size = 'medium', // 'small', 'medium', 'large', 'xlarge'
  closeOnOverlayClick = true
}) => {
  // Deshabilitar scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; }
  }, [isOpen]);

  // Cerrar modal con Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen && onClose) onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && closeOnOverlayClick && onClose) onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className={`modal modal-${size}`} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          {showBackButton && (
            <button className="modal-back-button" onClick={onBack}>←</button>
          )}
          <h2 className="modal-title">{title}</h2>
          {showCloseButton && (
            <button className="modal-close-button" onClick={onClose}>×</button>
          )}
        </div>

        {/* Body */}
        <div className="modal-body">
          {children}
        </div>

        {/* Footer */}
        {(showBackButton || showCloseButton) && (
          <div className="modal-footer">
            {showBackButton && (
              <button className="modal-button back-button" onClick={onBack}>
                Volver
              </button>
            )}
            {showCloseButton && (
              <button className="modal-button close-button" onClick={onClose}>
                Cerrar
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GenericModal;
