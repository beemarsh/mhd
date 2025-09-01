import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { 
  getCurrentUser, 
  loginWithEmail, 
  loginWithGoogle, 
  logout as firebaseLogout,
  onAuthStateChange,
  changePassword,
  sendEmailVerificationToUser,
  sendPasswordReset
} from '../services/auth';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      const userCredential = await loginWithEmail(email, password);
      return userCredential;
    } catch (error) {
      throw error;
    }
  };

  const loginWithGoogleAuth = async () => {
    try {
      const userCredential = await loginWithGoogle();
      return userCredential;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await firebaseLogout();
    } catch (error) {
      throw error;
    }
  };

  const updatePassword = async (newPassword) => {
    try {
      await changePassword(newPassword);
    } catch (error) {
      throw error;
    }
  };

  const verifyEmail = async () => {
    try {
      await sendEmailVerificationToUser();
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordReset(email);
    } catch (error) {
      throw error;
    }
  };

  const value = useMemo(() => ({
    user,
    loading,
    login,
    loginWithGoogle: loginWithGoogleAuth,
    logout,
    updatePassword,
    verifyEmail,
    resetPassword
  }), [user, loading]);

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}


