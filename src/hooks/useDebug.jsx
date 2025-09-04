// hooks/useDebug.js
import { useState, useRef, useCallback, useEffect } from 'react';

export const useDebug = () => {
  const [debugMode, setDebugMode] = useState(false);
  const [logs, setLogs] = useState([]);
  const logsRef = useRef(logs);
  
  // Mantener la referencia actualizada
  useEffect(() => {
    logsRef.current = logs;
  }, [logs]);

  const debugLog = useCallback((message, type = 'log') => {
    const timestamp = new Date().toLocaleTimeString();
    const newLog = { message, type, timestamp, id: Date.now() };
    
    // Usar el callback de setLogs para evitar problemas de actualización
    setLogs(prevLogs => {
      const updatedLogs = [...prevLogs, newLog];
      // Mantener un máximo de logs para evitar problemas de memoria
      return updatedLogs.slice(-100);
    });
    
    // También log a la consola real
    const consoleMethod = console[type] || console.log;
    consoleMethod(`[${timestamp}] ${message}`);
  }, []);

  const toggleDebug = useCallback(() => {
    setDebugMode(prev => !prev);
  }, []);

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  return {
    debugLog,
    debugMode,
    toggleDebug,
    logs,
    clearLogs
  };
};