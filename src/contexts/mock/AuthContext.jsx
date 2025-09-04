// contexts/AuthContext.jsx
import { createContext, useContext, useEffect } from 'react';
import { useDispatch, useStoreState } from '../hooks/useStore';

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
  const { user, loading, error } = auth;

  useEffect(() => {
    // Verificar si hay usuario logueado al cargar
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: JSON.parse(savedUser)
      });
    }
  }, [dispatch]);

  const login = async (email, password) => {
    try {
      dispatch({ type: 'LOGIN_REQUEST' });
      
      // Simulación de login
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === email && u.password === password);
      
      if (!user) {
        throw new Error('Credenciales inválidas');
      }
      
      const { password: _, ...userWithoutPassword } = user;
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: userWithoutPassword
      });
      
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      return userWithoutPassword;
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error.message
      });
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      dispatch({ type: 'REGISTER_REQUEST' });
      
      // Validar que el rol sea válido
      const validRoles = ['patient', 'doctor', 'manager', 'admin'];
      if (!validRoles.includes(userData.role)) {
        throw new Error('Rol de usuario inválido');
      }
      
      // Simulación de registro
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      if (users.some(u => u.email === userData.email)) {
        throw new Error('El usuario ya existe');
      }
      
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        createdAt: new Date().toISOString()
      };
      
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      const { password, ...userWithoutPassword } = newUser;
      
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: userWithoutPassword
      });
      
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      return userWithoutPassword;
    } catch (error) {
      dispatch({
        type: 'REGISTER_FAILURE',
        payload: error.message
      });
      throw error;
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    error,
    isGuest: !user,
    isPatient: user && user.role === 'patient',
    isDoctor: user && user.role === 'doctor',
    isManager: user && user.role === 'manager',
    isAdmin: user && user.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};