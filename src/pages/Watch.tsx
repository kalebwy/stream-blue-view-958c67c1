
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Calendar, Tag } from 'lucide-react';
import { useMovies } from '../context/MoviesContext';

export const Watch: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { movies } = useMovies();
  const [movie, setMovie] = useState(movies.find(m => m.id === id));

  useEffect(() => {
    setMovie(movies.find(m => m.id === id));
  }, [id, movies]);

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-2xl mb-4">Movie not found</h1>
          <Link to="/" className="text-blue-400 hover:text-blue-300">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-black bg-opacity-50 p-4">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-white hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Browse</span>
        </Link>
      </div>

      {/* Video Player */}
      <div className="aspect-video bg-black">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${movie.youtubeId}?autoplay=1&modestbranding=1&rel=0`}
          title={movie.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>

      {/* Movie Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl">
          <h1 className="text-white text-3xl md:text-4xl font-bold mb-4">
            {movie.title}
          </h1>
          
          <div className="flex flex-wrap items-center space-x-6 mb-6">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="text-white font-medium">{movie.rating}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-400" />
              <span className="text-gray-300">{movie.year}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Tag className="h-5 w-5 text-gray-400" />
              <span className="text-gray-300">{movie.genre}</span>
            </div>
            
            <span className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium">
              {movie.type === 'movie' ? 'Movie' : 'TV Show'}
            </span>
            
            {movie.isFeatured && (
              <span className="bg-yellow-600 text-white px-3 py-1 rounded text-sm font-medium">
                Featured
              </span>
            )}
            
            {movie.isTrending && (
              <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-medium">
                Trending
              </span>
            )}
          </div>
          
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            {movie.description}
          </p>
          
          {/* Poster Image */}
          <div className="w-64 rounded-lg overflow-hidden shadow-lg">
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
