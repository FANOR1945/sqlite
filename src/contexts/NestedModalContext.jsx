// contexts/NestedModalContext.jsx
import React, { createContext, useContext, useReducer } from 'react';

const NestedModalContext = createContext();

const modalReducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        modals: { ...state.modals, [action.payload]: true },
        history: [...state.history, action.payload]
      };
    
    case 'CLOSE_MODAL':
      return {
        ...state,
        modals: { ...state.modals, [action.payload]: false },
        history: state.history.filter(name => name !== action.payload)
      };
    
    case 'CLOSE_ALL_MODALS':
      return {
        ...state,
        modals: {},
        history: []
      };
    
    case 'GO_BACK':
      if (state.history.length > 1) {
        const previousModal = state.history[state.history.length - 2];
        const currentModal = state.history[state.history.length - 1];
        
        return {
          ...state,
          modals: {
            ...state.modals,
            [currentModal]: false,
            [previousModal]: true
          },
          history: state.history.slice(0, -1)
        };
      } else if (state.history.length === 1) {
        return {
          ...state,
          modals: { ...state.modals, [state.history[0]]: false },
          history: []
        };
      }
      return state;
    
    default:
      return state;
  }
};

export const NestedModalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(modalReducer, {
    modals: {},
    history: []
  });

  const openModal = (modalName) => {
    dispatch({ type: 'OPEN_MODAL', payload: modalName });
  };

  const closeModal = (modalName) => {
    dispatch({ type: 'CLOSE_MODAL', payload: modalName });
  };

  const closeAllModals = () => {
    dispatch({ type: 'CLOSE_ALL_MODALS' });
  };

  const goBack = () => {
    dispatch({ type: 'GO_BACK' });
  };

  const isModalOpen = (modalName) => {
    return !!state.modals[modalName];
  };

  const getCurrentModal = () => {
    return state.history.length > 0 ? state.history[state.history.length - 1] : null;
  };

  const value = {
    modals: state.modals,
    modalHistory: state.history,
    openModal,
    closeModal,
    closeAllModals,
    goBack,
    isModalOpen,
    getCurrentModal,
    hasOpenModals: state.history.length > 0
  };

  return (
    <NestedModalContext.Provider value={value}>
      {children}
    </NestedModalContext.Provider>
  );
};

export const useNestedModal = () => {
  const context = useContext(NestedModalContext);
  if (!context) {
    throw new Error('useNestedModal debe ser usado dentro de un NestedModalProvider');
  }
  return context;
};