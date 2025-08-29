import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe ser usado dentro de AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
    setLoading(false);
  }, []);

  const login = async ({ email, password, model }) => {
    const res = await fetch('https://nn-oe-jm-welcome.trycloudflare.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, model })
    });
    const data = await res.json();
    if (!data.ok) throw new Error(data.mensaje);
    setUser(data.user);
    localStorage.setItem('user', JSON.stringify(data.user));
  };

  const register = async (userData) => {
  // userData = { model, name, email, password, phone }
  const response = await fetch('https://nn-oe-jm-welcome.trycloudflare.com/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });

  if (!response.ok) throw new Error('Error al registrar');
  const data = await response.json();
  setUser(data.user);
  localStorage.setItem('user', JSON.stringify(data.user));
};

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, isGuest: !user }}>
      {children}
    </AuthContext.Provider>
  );
};
