import React, { useState, createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usuarioRecuperado = localStorage.getItem('user');
    if (usuarioRecuperado) {
      setUser(JSON.parse(usuarioRecuperado));
    }

    setLoading(false);
  }, []);

  const login = (email, password) => {
    console.log('login auth', { email, password });

    // ir na api criar uma session
    const usuarioLogado = {
      id: '123',
      email,
    };

    localStorage.setItem('user', JSON.stringify(usuarioLogado));

    if (password === '12345') {
      setUser(usuarioLogado);
      navigate('/dashboard');
    }

    setUser({ id: '123', email })
  };

  const logout = () => {
    console.log('logout');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{ authenticated: !!user, user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}