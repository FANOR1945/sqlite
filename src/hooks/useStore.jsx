// hooks/useStore.js
import { useState, useEffect } from 'react';
import { useStore } from '../contexts/StoreContext';

export const useStoreState = () => {
  const store = useStore();
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      // Asegúrate de que se actualice el estado correctamente
      setState(store.getState());
    });

    return unsubscribe;
  }, [store]);

  return state;
};

export const useDispatch = () => {
  const store = useStore();
  return store.dispatch;
};