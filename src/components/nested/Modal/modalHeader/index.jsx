// components/generic/NestedModal/ModalHeader.jsx
const ModalHeader = ({ 
    title, 
    showCloseButton, 
    customCloseButton, 
    onClose, 
    isLoading, 
    isDisabled 
  }) => {
    return (
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
    );
  };
  
  export default ModalHeader;