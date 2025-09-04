import { useState } from "react";

// Componente TreeViewer para React
export const TreeViewer = ({ state }) => {
    const [expandedPaths, setExpandedPaths] = useState(new Set());
    const [isVisible, setIsVisible] = useState(true);
    
    const togglePath = (path) => {
      const newExpandedPaths = new Set(expandedPaths);
      if (newExpandedPaths.has(path)) {
        newExpandedPaths.delete(path);
      } else {
        newExpandedPaths.add(path);
      }
      setExpandedPaths(newExpandedPaths);
    };
    
    const TreeNode = ({ data, path = '' }) => {
      if (typeof data !== 'object' || data === null) {
        return (
          <div style={{ marginLeft: '10px' }}>
            {path && `${path.split('.').pop()}: `}{JSON.stringify(data)}
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
            <span style={{ color: '#ffcc00' }}>
              {isExpanded ? '▼ ' : '▶ '}
            </span>
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
            top: '10px',
            right: '10px',
            fontSize: '20px',
            background: '#ffcc00',
            color: '#1e1e1e',
            padding: '6px 10px',
            borderRadius: '4px',
            cursor: 'pointer',
            zIndex: 10000,
          }}
          onClick={() => setIsVisible(true)}
        >
          🌳
        </button>
      );
    }
    
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '300px',
        background: '#222',
        color: 'white',
        fontFamily: 'monospace',
        fontSize: '13px',
        overflowY: 'auto',
        zIndex: 9999,
        borderLeft: '3px solid #888',
        height: '100vh'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#333',
          padding: '8px 10px',
          position: 'sticky',
          top: 0,
          zIndex: 10001,
        }}>
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
  