
import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Info } from 'lucide-react';
import { Movie } from '../../types';

interface HeroSectionProps {
  movie: Movie;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ movie }) => {
  return (
    <div className="relative h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
            {movie.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-6 line-clamp-3 animate-fade-in">
            {movie.description}
          </p>
          
          <div className="flex items-center space-x-4 mb-8 animate-fade-in">
            <span className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium">
              {movie.type === 'movie' ? 'Movie' : 'TV Show'}
            </span>
            <span className="text-gray-300">{movie.year}</span>
            <span className="text-gray-300">⭐ {movie.rating}</span>
          </div>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in">
            <Link
              to={`/watch/${movie.id}`}
              className="bg-white text-black px-8 py-3 rounded-lg font-medium flex items-center space-x-2 hover:bg-gray-200 transition-colors justify-center sm:justify-start"
            >
              <Play className="h-5 w-5" />
              <span>Play</span>
            </Link>
            
            <Link
              to={`/watch/${movie.id}`}
              className="bg-gray-600 bg-opacity-70 text-white px-8 py-3 rounded-lg font-medium flex items-center space-x-2 hover:bg-opacity-50 transition-colors justify-center sm:justify-start"
            >
              <Info className="h-5 w-5" />
              <span>More Info</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
