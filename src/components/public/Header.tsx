
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, User, LogIn, UserPlus, LogOut } from 'lucide-react';
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
    <header className="bg-black fixed top-0 w-full z-50 border-b border-gray-800">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-500 hover:text-blue-400 transition-colors">
            BUZUTV
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 ml-12">
            <Link 
              to="/" 
              className={`text-white hover:text-gray-300 transition-colors font-medium ${
                isActive('/') ? 'text-white' : 'text-gray-300'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/movies" 
              className={`text-white hover:text-gray-300 transition-colors font-medium ${
                isActive('/movies') ? 'text-white' : 'text-gray-300'
              }`}
            >
              Movies
            </Link>
            <Link 
              to="/tv-shows" 
              className={`text-white hover:text-gray-300 transition-colors font-medium ${
                isActive('/tv-shows') ? 'text-white' : 'text-gray-300'
              }`}
            >
              Series
            </Link>
            <Link 
              to="/favorites" 
              className={`text-white hover:text-gray-300 transition-colors font-medium ${
                isActive('/favorites') ? 'text-white' : 'text-gray-300'
              }`}
            >
              My List
            </Link>
          </nav>

          {/* Search Bar and Profile */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="flex items-center">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search videos..."
                  className="bg-black text-white px-4 py-2 rounded border border-gray-600 focus:outline-none focus:border-white transition-colors w-80 placeholder-gray-400"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </form>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-8 w-8 rounded-full bg-transparent hover:bg-gray-800 text-white"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-56 bg-black border-gray-700 text-white"
              >
                {isAuthenticated ? (
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="hover:bg-gray-800 focus:bg-gray-800 cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link 
                        to="/admin/login" 
                        className="hover:bg-gray-800 focus:bg-gray-800 cursor-pointer flex items-center"
                      >
                        <LogIn className="mr-2 h-4 w-4" />
                        <span>Log in</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-700" />
                    <DropdownMenuItem asChild>
                      <Link 
                        to="/admin/login" 
                        className="hover:bg-gray-800 focus:bg-gray-800 cursor-pointer flex items-center"
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
            className="md:hidden text-white hover:text-gray-300 transition-colors p-2"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-800">
            <nav className="flex flex-col space-y-4 mt-4">
              <Link 
                to="/" 
                className={`text-white hover:text-gray-300 transition-colors font-medium py-2 ${
                  isActive('/') ? 'text-white' : 'text-gray-300'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/movies" 
                className={`text-white hover:text-gray-300 transition-colors font-medium py-2 ${
                  isActive('/movies') ? 'text-white' : 'text-gray-300'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Movies
              </Link>
              <Link 
                to="/tv-shows" 
                className={`text-white hover:text-gray-300 transition-colors font-medium py-2 ${
                  isActive('/tv-shows') ? 'text-white' : 'text-gray-300'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Series
              </Link>
              <Link 
                to="/favorites" 
                className={`text-white hover:text-gray-300 transition-colors font-medium py-2 ${
                  isActive('/favorites') ? 'text-white' : 'text-gray-300'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                My List
              </Link>
            </nav>
            
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mt-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search videos..."
                  className="bg-black text-white px-4 py-2 rounded border border-gray-600 focus:outline-none focus:border-white transition-colors w-full placeholder-gray-400"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </form>

            {/* Mobile Profile Options */}
            <div className="mt-4 pt-4 border-t border-gray-800">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-white hover:text-gray-300 transition-colors font-medium py-2 flex items-center"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </button>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/admin/login"
                    className="w-full text-left text-white hover:text-gray-300 transition-colors font-medium py-2 flex items-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Log in
                  </Link>
                  <Link
                    to="/admin/login"
                    className="w-full text-left text-white hover:text-gray-300 transition-colors font-medium py-2 flex items-center"
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
