import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { getCurrentUser, loginPlaceholder, logoutPlaceholder } from '../services/auth';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const value = useMemo(() => ({
    user,
    login: (email) => {
      const u = loginPlaceholder(email);
      setUser(u);
      return u;
    },
    logout: () => {
      logoutPlaceholder();
      setUser(null);
    }
  }), [user]);

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}


