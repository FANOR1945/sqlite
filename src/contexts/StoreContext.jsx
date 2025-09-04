// contexts/StoreContext.jsx
import { createContext, useContext } from 'react';

const StoreContext = createContext(null);

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore debe ser usado dentro de un StoreProvider');
  }
  return context;
};

export const StoreProvider = ({ store, children }) => {
  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};