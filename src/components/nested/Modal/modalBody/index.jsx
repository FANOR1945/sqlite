// components/generic/NestedModal/ModalBody.jsx
const ModalBody = ({ 
    children, 
    isFullscreen, 
    isLoading 
  }) => {
    return (
      <div className={`modal-body ${isFullscreen ? 'modal-fullscreen-body' : ''}`}>
        {isLoading ? (
          <div className="modal-loading">
            <div className="loading-spinner"></div>
            <p>Cargando...</p>
          </div>
        ) : (
          children
        )}
      </div>
    );
  };
  
  export default ModalBody;