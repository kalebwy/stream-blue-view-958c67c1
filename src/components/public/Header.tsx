
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Play, User, LogIn, UserPlus, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-opacity-95 backdrop-blur-md fixed top-0 w-full z-50 border-b border-gray-700 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300 transform group-hover:scale-105">
              <Play className="h-6 w-6 text-white" fill="currentColor" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 bg-clip-text text-transparent hover:from-blue-300 hover:via-purple-300 hover:to-blue-400 transition-all duration-300">
              BUZUTV
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`relative text-white hover:text-blue-400 transition-all duration-300 font-medium group ${
                isActive('/') ? 'text-blue-400' : ''
              }`}
            >
              Home
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:w-full ${
                isActive('/') ? 'w-full' : ''
              }`}></span>
            </Link>
            <Link 
              to="/movies" 
              className={`relative text-white hover:text-blue-400 transition-all duration-300 font-medium group ${
                isActive('/movies') ? 'text-blue-400' : ''
              }`}
            >
              Movies
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:w-full ${
                isActive('/movies') ? 'w-full' : ''
              }`}></span>
            </Link>
            <Link 
              to="/tv-shows" 
              className={`relative text-white hover:text-blue-400 transition-all duration-300 font-medium group ${
                isActive('/tv-shows') ? 'text-blue-400' : ''
              }`}
            >
              TV Shows
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:w-full ${
                isActive('/tv-shows') ? 'w-full' : ''
              }`}></span>
            </Link>
            <Link 
              to="/favorites" 
              className={`relative text-white hover:text-blue-400 transition-all duration-300 font-medium group ${
                isActive('/favorites') ? 'text-blue-400' : ''
              }`}
            >
              Favorites
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:w-full ${
                isActive('/favorites') ? 'w-full' : ''
              }`}></span>
            </Link>
          </nav>

          {/* Search Bar and Profile */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="flex items-center space-x-2">
              <div className="relative group">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search movies, shows..."
                  className="bg-gray-800/80 backdrop-blur-sm text-white px-4 py-2.5 rounded-full pl-12 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-700/80 transition-all duration-300 border border-gray-600 hover:border-gray-500 group-hover:w-72"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-300" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
            </form>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="relative h-10 w-10 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 border border-gray-600 hover:border-gray-500 transition-all duration-300"
                >
                  <User className="h-5 w-5 text-white" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-56 bg-gray-800/95 backdrop-blur-sm border-gray-700 text-white"
              >
                {isAuthenticated ? (
                  <>
                    <DropdownMenuItem 
                      onClick={handleLogout}
                      className="hover:bg-gray-700/50 focus:bg-gray-700/50 cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link 
                        to="/admin/login" 
                        className="hover:bg-gray-700/50 focus:bg-gray-700/50 cursor-pointer flex items-center"
                      >
                        <LogIn className="mr-2 h-4 w-4" />
                        <span>Log in</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-700" />
                    <DropdownMenuItem asChild>
                      <Link 
                        to="/admin/login" 
                        className="hover:bg-gray-700/50 focus:bg-gray-700/50 cursor-pointer flex items-center"
                      >
                        <UserPlus className="mr-2 h-4 w-4" />
                        <span>Sign up</span>
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-gray-800/50"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-700 bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-lg">
            <nav className="flex flex-col space-y-4 mt-4 px-4">
              <Link 
                to="/" 
                className={`text-white hover:text-blue-400 transition-colors font-medium py-2 px-3 rounded-lg hover:bg-gray-700/50 ${
                  isActive('/') ? 'text-blue-400 bg-gray-700/50' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/movies" 
                className={`text-white hover:text-blue-400 transition-colors font-medium py-2 px-3 rounded-lg hover:bg-gray-700/50 ${
                  isActive('/movies') ? 'text-blue-400 bg-gray-700/50' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Movies
              </Link>
              <Link 
                to="/tv-shows" 
                className={`text-white hover:text-blue-400 transition-colors font-medium py-2 px-3 rounded-lg hover:bg-gray-700/50 ${
                  isActive('/tv-shows') ? 'text-blue-400 bg-gray-700/50' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                TV Shows
              </Link>
              <Link 
                to="/favorites" 
                className={`text-white hover:text-blue-400 transition-colors font-medium py-2 px-3 rounded-lg hover:bg-gray-700/50 ${
                  isActive('/favorites') ? 'text-blue-400 bg-gray-700/50' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Favorites
              </Link>
            </nav>
            
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mt-4 px-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search movies, shows..."
                  className="bg-gray-800/80 backdrop-blur-sm text-white px-4 py-2.5 rounded-full pl-12 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all border border-gray-600"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </form>

            {/* Mobile Profile Options */}
            <div className="mt-4 px-4 pt-4 border-t border-gray-700">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-white hover:text-blue-400 transition-colors font-medium py-2 px-3 rounded-lg hover:bg-gray-700/50 flex items-center"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </button>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/admin/login"
                    className="w-full text-left text-white hover:text-blue-400 transition-colors font-medium py-2 px-3 rounded-lg hover:bg-gray-700/50 flex items-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Log in
                  </Link>
                  <Link
                    to="/admin/login"
                    className="w-full text-left text-white hover:text-blue-400 transition-colors font-medium py-2 px-3 rounded-lg hover:bg-gray-700/50 flex items-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
