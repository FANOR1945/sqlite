// components/generic/NestedModal/ModalFooter.jsx
const ModalFooter = ({ 
    showBackButton, 
    showCloseButton, 
    onBack, 
    onClose, 
    isLoading, 
    isDisabled 
  }) => {
    return (
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
    );
  };
  
  export default ModalFooter;