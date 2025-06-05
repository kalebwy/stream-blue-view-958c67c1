import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut, Settings, BarChart3 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminHeader: React.FC = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/admin" className="text-xl font-bold text-blue-400 hover:text-blue-300 transition-colors">
              BUZUTV Admin
            </Link>
            
            <nav className="flex items-center space-x-6">
              <Link
                to="/admin"
                className={`flex items-center space-x-2 text-sm font-medium transition-colors ${
                  isActive('/admin') 
                    ? 'text-blue-400' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <BarChart3 className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              
              <Link
                to="/admin/movies"
                className={`flex items-center space-x-2 text-sm font-medium transition-colors ${
                  isActive('/admin/movies') 
                    ? 'text-blue-400' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <Settings className="h-4 w-4" />
                <span>Manage Content</span>
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
            >
              View Site
            </Link>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
