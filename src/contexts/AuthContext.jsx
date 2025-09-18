// contexts/AuthContext.jsx
import { createContext, useContext, useEffect } from 'react';
import { useDispatch, useStoreState } from '../hooks/useStore';
import { apiFetch } from '../utils/apiFetch';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { auth } = useStoreState();
  const { user, isAuthenticated, roles, loading, error } = auth;

  // 🔹 Restaurar sesión desde localStorage al montar
  useEffect(() => {
    const savedSession = localStorage.getItem('user');
    if (savedSession) {
      const sessionData = JSON.parse(savedSession);

      if (sessionData.token) {
        localStorage.setItem('token', sessionData.token);
      }

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: sessionData.user,
          isAuthenticated: sessionData.isAuthenticated ?? true,
          roles: sessionData.roles || [],
        },
      });
    }
  }, [dispatch]);

  // 🔹 Login con API real
  const login = async (email, password) => {
    try {
      dispatch({ type: 'LOGIN_REQUEST' });

      const response = await apiFetch('/auth/login', 'POST', {
        email,
        password,
      });
      const { user, token, isAuthenticated } = response;
      const userRoles = user?.roles || [];

      const sessionData = { user, token, isAuthenticated, roles: userRoles };
      localStorage.setItem('user', JSON.stringify(sessionData));
      localStorage.setItem('token', token);

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user, isAuthenticated, roles: userRoles },
      });

      return sessionData;
    } catch (err) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: err.message,
      });
      throw err;
    }
  };

  // 🔹 Registro con API real
  const register = async (userData) => {
    try {
      dispatch({ type: 'REGISTER_REQUEST' });

      const response = await apiFetch('/auth/register', 'POST', userData);
      const { user, token, isAuthenticated } = response;
      const userRoles = user?.roles || [];

      const sessionData = { user, token, isAuthenticated, roles: userRoles };
      localStorage.setItem('user', JSON.stringify(sessionData));
      localStorage.setItem('token', token);

      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: { user, isAuthenticated, roles: userRoles },
      });

      return sessionData;
    } catch (err) {
      dispatch({
        type: 'REGISTER_FAILURE',
        payload: err.message,
      });
      throw err;
    }
  };

  // 🔹 Logout
  const logout = async () => {
    try {
      if (user?.token) {
        await apiFetch('/auth/logout', 'POST', null, user.token);
      }
    } catch (_) {
      // ignoramos errores
    }

    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // 🔹 Helper para endpoints protegidos
  const authorizedFetch = async (url, method = 'GET', data = null) => {
    if (!user?.token) throw new Error('No hay sesión activa');
    return apiFetch(url, method, data, user.token);
  };

  // 🔹 Comparación de roles exacta
  const value = {
    user,
    isAuthenticated,
    roles,
    login,
    register,
    logout,
    authorizedFetch,
    loading,
    error,
    isGuest: !isAuthenticated,
    isPatient: roles[0] === 'patient',
    isDoctor: roles[0] === 'doctor',
    isManager: roles[0] === 'manager',
    isAdmin: roles[0] === 'administrador',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
