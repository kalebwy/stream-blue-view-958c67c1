
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-gray-900 bg-opacity-95 backdrop-blur-sm fixed top-0 w-full z-50 border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-500 hover:text-blue-400 transition-colors">
            BUZUTV
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-white hover:text-blue-400 transition-colors ${isActive('/') ? 'text-blue-400' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/movies" 
              className={`text-white hover:text-blue-400 transition-colors ${isActive('/movies') ? 'text-blue-400' : ''}`}
            >
              Movies
            </Link>
            <Link 
              to="/tv-shows" 
              className={`text-white hover:text-blue-400 transition-colors ${isActive('/tv-shows') ? 'text-blue-400' : ''}`}
            >
              TV Shows
            </Link>
            <Link 
              to="/favorites" 
              className={`text-white hover:text-blue-400 transition-colors ${isActive('/favorites') ? 'text-blue-400' : ''}`}
            >
              Favorites
            </Link>
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center space-x-2">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies, shows..."
                className="bg-gray-800 text-white px-4 py-2 rounded-lg pl-10 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </form>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white hover:text-blue-400 transition-colors"
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
                className={`text-white hover:text-blue-400 transition-colors ${isActive('/') ? 'text-blue-400' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/movies" 
                className={`text-white hover:text-blue-400 transition-colors ${isActive('/movies') ? 'text-blue-400' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Movies
              </Link>
              <Link 
                to="/tv-shows" 
                className={`text-white hover:text-blue-400 transition-colors ${isActive('/tv-shows') ? 'text-blue-400' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                TV Shows
              </Link>
              <Link 
                to="/favorites" 
                className={`text-white hover:text-blue-400 transition-colors ${isActive('/favorites') ? 'text-blue-400' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Favorites
              </Link>
            </nav>
            
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mt-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search movies, shows..."
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg pl-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};
