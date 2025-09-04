// debug.js (versión corregida)
import React, { useEffect, useState, useRef } from 'react';

// Configuración global de debug
const APP_CONFIG = {
  debugMode: true
};

// Almacenamiento global para los logs
let globalLogs = [];
let logListeners = [];

const addLog = (message, type = 'log') => {
  const now = new Date();
  const logEntry = {
    message,
    type,
    timestamp: now,
    timeString: now.toLocaleTimeString()
  };
  
  globalLogs.push(logEntry);
  
  // Notificar a todos los listeners
  logListeners.forEach(listener => {
    listener([...globalLogs]);
  });
};

// Hook para usar el debug en componentes React
export const useDebug = () => {
  const [debugMode, setDebugMode] = useState(APP_CONFIG.debugMode);
  
  const debugLog = (message, type = 'log') => {
    if (!debugMode) return;
    
    addLog(message, type);
    
    // También enviar a la consola real
    const now = new Date().toLocaleTimeString();
    console[type](`[${now}] ${message}`);
  };
  
  const toggleDebug = () => {
    const newMode = !debugMode;
    setDebugMode(newMode);
    APP_CONFIG.debugMode = newMode;
    debugLog(`Debug ${newMode ? 'activado' : 'desactivado'}`, 'info');
  };
  
  return { debugLog, debugMode, toggleDebug };
};

// Componente DebugConsole para React
export const DebugConsole = () => {
  const { debugMode } = useDebug();
  const [logs, setLogs] = useState([]);
  
  useEffect(() => {
    if (!debugMode) return;
    
    // Suscribirse a nuevos logs
    const handleNewLogs = (newLogs) => {
      setLogs(newLogs);
    };
    
    logListeners.push(handleNewLogs);
    setLogs([...globalLogs]);
    
    return () => {
      // Limpiar suscripción
      logListeners = logListeners.filter(listener => listener !== handleNewLogs);
    };
  }, [debugMode]);
  
  if (!debugMode) return null;
  
  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      maxHeight: '200px',
      overflowY: 'auto',
      backgroundColor: '#111',
      color: '#0f0',
      padding: '10px',
      fontFamily: 'monospace',
      zIndex: 2500,
      borderTop: '1px solid #333'
    }}>
      {logs.map((log, index) => (
        <div key={index} style={{
          color: log.type === 'error' ? 'red' : 
                 log.type === 'warn' ? 'yellow' : 
                 log.type === 'info' ? 'cyan' : 'lime'
        }}>
          [{log.timeString}] {log.message}
        </div>
      ))}
    </div>
  );
};