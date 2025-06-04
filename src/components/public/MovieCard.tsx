
import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Star } from 'lucide-react';
import { Movie } from '../../types';

interface MovieCardProps {
  movie: Movie;
  size?: 'small' | 'medium' | 'large';
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-32 md:w-40',
    medium: 'w-40 md:w-48',
    large: 'w-48 md:w-56'
  };

  return (
    <Link to={`/watch/${movie.id}`} className="group block">
      <div className={`${sizeClasses[size]} transition-all duration-300 group-hover:scale-105`}>
        <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-800 shadow-lg">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
            <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          {/* Rating Badge */}
          <div className="absolute top-2 right-2 bg-black bg-opacity-75 rounded-full px-2 py-1 flex items-center space-x-1">
            <Star className="h-3 w-3 text-yellow-400 fill-current" />
            <span className="text-xs text-white font-medium">{movie.rating}</span>
          </div>
          
          {/* Featured/Trending Badges */}
          {movie.isFeatured && (
            <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
              Featured
            </div>
          )}
          {movie.isTrending && !movie.isFeatured && (
            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full font-medium">
              Trending
            </div>
          )}
        </div>
        
        {/* Movie Info */}
        <div className="mt-3">
          <h3 className="text-white font-medium text-sm line-clamp-2 group-hover:text-blue-400 transition-colors">
            {movie.title}
          </h3>
          <p className="text-gray-400 text-xs mt-1">{movie.year} • {movie.type === 'movie' ? 'Movie' : 'TV Show'}</p>
        </div>
      </div>
    </Link>
  );
};
