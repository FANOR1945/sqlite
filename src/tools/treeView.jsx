import { useEffect, useRef, useState } from 'react';

export const TreeViewer = ({ state }) => {
  const [expandedPaths, setExpandedPaths] = useState(new Set());
  const [isVisible, setIsVisible] = useState(false); // 🔹 sidebar cerrado al inicio
  const [changeCounter, setChangeCounter] = useState(0);
  const [prevState, setPrevState] = useState(null);

  const [isBlinking, setIsBlinking] = useState(false);
  const blinkRef = useRef(null);

  const togglePath = (path) => {
    const newExpandedPaths = new Set(expandedPaths);
    if (newExpandedPaths.has(path)) {
      newExpandedPaths.delete(path);
    } else {
      newExpandedPaths.add(path);
    }
    setExpandedPaths(newExpandedPaths);
  };

  // Detectar cambios en el estado
  useEffect(() => {
    const isChanged = JSON.stringify(prevState) !== JSON.stringify(state);

    if (isChanged) {
      setPrevState(state);
      if (!isVisible) {
        setChangeCounter((c) => c + 1);
        setIsBlinking(true);

        // Parpadeo limitado
        if (blinkRef.current) clearTimeout(blinkRef.current);
        blinkRef.current = setTimeout(() => {
          setIsBlinking(false);
        }, 3000); // 3s de parpadeo
      }
    }
  }, [state, prevState, isVisible]);

  const TreeNode = ({ data, path = '' }) => {
    if (typeof data !== 'object' || data === null) {
      return (
        <div style={{ marginLeft: '10px' }}>
          {path && `${path.split('.').pop()}: `}
          {JSON.stringify(data)}
        </div>
      );
    }

    const isArray = Array.isArray(data);
    const currentPath = path || (isArray ? '[...]' : '{...}');
    const isExpanded = expandedPaths.has(currentPath);

    return (
      <div>
        <div
          style={{ cursor: 'pointer', margin: '2px 0' }}
          onClick={() => togglePath(currentPath)}
        >
          <span style={{ color: '#ffcc00' }}>{isExpanded ? '▼ ' : '▶ '}</span>
          {path && `${path.split('.').pop()}: `}
          {isArray ? '[...]' : '{...}'}
        </div>
        {isExpanded && (
          <div style={{ marginLeft: '15px' }}>
            {Object.entries(data).map(([key, value]) => (
              <TreeNode
                key={key}
                data={value}
                path={path ? `${path}.${key}` : key}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  if (!isVisible) {
    return (
      <button
        style={{
          position: 'fixed',
          bottom: '10px',
          left: '10px',
          fontSize: '20px',
          background: isBlinking ? '#ff6f00' : '#ffcc00', // 🔹 alterna colores
          color: '#1e1e1e',
          padding: '6px 10px',
          borderRadius: '4px',
          cursor: 'pointer',
          zIndex: 10000,
          transition: 'background-color 0.5s ease',
        }}
        onClick={() => {
          setIsVisible(true);
          setChangeCounter(0);
          setIsBlinking(false);
        }}
      >
        🌳
        {changeCounter > 0 && (
          <span
            style={{
              marginLeft: '6px',
              fontSize: '12px',
              fontWeight: 'bold',
              background: 'white',
              color: '#1e1e1e',
              padding: '2px 6px',
              borderRadius: '50%',
            }}
          >
            {changeCounter}
          </span>
        )}
      </button>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '300px',
        background: '#222',
        color: 'white',
        fontFamily: 'monospace',
        fontSize: '13px',
        overflowY: 'auto',
        zIndex: 9999,
        borderRight: '3px solid #888',
        height: '100vh',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#333',
          padding: '8px 10px',
          position: 'sticky',
          top: 0,
          zIndex: 10001,
        }}
      >
        <span style={{ fontWeight: 'bold' }}>🌳 State Viewer</span>
        <span
          style={{ cursor: 'pointer', fontSize: '18px', color: '#ffcc00' }}
          onClick={() => setIsVisible(false)}
        >
          🗙
        </span>
      </div>
      <div style={{ padding: '10px', background: '#1e1e1e' }}>
        <TreeNode data={state} />
      </div>
    </div>
  );
};
