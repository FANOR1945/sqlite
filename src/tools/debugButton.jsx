import { useState,useRef,useEffect } from "react";

// Componente mejorado del botón de debug con dropdown
export const DebugButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [debugOptions, setDebugOptions] = useState({
    console: true,
    treeView: true
  });
  const dropdownRef = useRef(null);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleOption = (option) => {
    setDebugOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  return (
    <div 
      ref={dropdownRef}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '10px',
        zIndex: 2501,
      }}
    >
      {/* Botón principal */}
      <button
        onClick={toggleDropdown}
        style={{
          padding: '10px 15px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '5px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '5px'
        }}
      >
        🐛 Debug
        <span style={{ fontSize: '12px' }}>
          {isOpen ? '▲' : '▼'}
        </span>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            bottom: '100%',
            right: 0,
            backgroundColor: '#222',
            border: '1px solid #444',
            borderRadius: '5px',
            padding: '10px',
            marginBottom: '5px',
            minWidth: '150px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
          }}
        >
          <div style={{ marginBottom: '10px', fontWeight: 'bold', color: 'white' }}>
            Opciones de Debug
          </div>
          
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '8px',
              cursor: 'pointer'
            }}
            onClick={() => toggleOption('console')}
          >
            <div style={{
              width: '16px',
              height: '16px',
              borderRadius: '3px',
              border: '2px solid #ccc',
              backgroundColor: debugOptions.console ? '#4CAF50' : 'transparent',
              marginRight: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {debugOptions.console && '✓'}
            </div>
            <span style={{ color: 'white' }}>Consola Debug</span>
          </div>
          
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '8px',
              cursor: 'pointer'
            }}
            onClick={() => toggleOption('treeView')}
          >
            <div style={{
              width: '16px',
              height: '16px',
              borderRadius: '3px',
              border: '2px solid #ccc',
              backgroundColor: debugOptions.treeView ? '#4CAF50' : 'transparent',
              marginRight: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {debugOptions.treeView && '✓'}
            </div>
            <span style={{ color: 'white' }}>Árbol de Estado</span>
          </div>
          
          <div style={{ 
            height: '1px', 
            backgroundColor: '#444', 
            margin: '8px 0' 
          }} />
          
          <div 
            style={{ 
              color: '#ffcc00', 
              cursor: 'pointer',
              padding: '5px',
              borderRadius: '3px'
            }}
            onClick={() => {
              // Limpiar logs
              if (window.clearDebugLogs) {
                window.clearDebugLogs();
              }
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#333'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            🗑️ Limpiar Consola
          </div>
        </div>
      )}
    </div>
  );
};
