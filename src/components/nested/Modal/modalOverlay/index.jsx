// components/generic/NestedModal/ModalOverlay.jsx
const ModalOverlay = ({ 
    children, 
    animationClass, 
    isFullscreen, 
    onClick 
  }) => {
    return (
      <div 
        className={`modal-overlay ${animationClass} ${isFullscreen ? 'modal-fullscreen-overlay' : ''}`}
        onClick={onClick}
      >
        {children}
      </div>
    );
  };
  
  export default ModalOverlay;