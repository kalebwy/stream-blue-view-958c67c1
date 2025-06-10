
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (username: string, password: string): boolean => {
    console.log('Login attempt:', { username, password });
    console.log('Expected:', { username: 'admin', password: 'admin123' });
    console.log('Username match:', username === 'admin');
    console.log('Password match:', password === 'admin123');
    
    if (username === 'admin' && password === 'admin123') {
      console.log('Login successful');
      setIsAuthenticated(true);
      return true;
    }
    console.log('Login failed');
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
