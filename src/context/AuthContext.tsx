
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
    console.log('Expected options:', [
      { username: 'admin', password: 'admin123' },
      { username: 'kalebadmin', password: '@admin' }
    ]);
    console.log('Username matches admin:', username === 'admin');
    console.log('Username matches kalebadmin:', username === 'kalebadmin');
    console.log('Password matches admin123:', password === 'admin123');
    console.log('Password matches @admin:', password === '@admin');
    
    if ((username === 'admin' && password === 'admin123') || 
        (username === 'kalebadmin' && password === '@admin')) {
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
