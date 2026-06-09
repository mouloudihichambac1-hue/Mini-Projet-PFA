import React, { createContext, useState, useContext, useEffect } from 'react';

// Création du contexte
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Vérification  si un utilisateur est déjà connecté au chargement de la page
  useEffect(() => {
    const savedUser = localStorage.getItem('immoUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Fonction pour se connecter 
  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('immoUser', JSON.stringify(userData));
    localStorage.setItem('token', token); // Stockage du JWT
  };

  // Fonction pour se déconnecter
  const logout = () => {
    setUser(null);
    localStorage.removeItem('immoUser');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);