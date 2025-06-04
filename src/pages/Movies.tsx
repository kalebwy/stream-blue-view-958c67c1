
import React, { useState, useMemo } from 'react';
import { Header } from '../components/public/Header';
import { MovieRow } from '../components/public/MovieRow';
import { useMovies } from '../context/MoviesContext';

export const Movies: React.FC = () => {
  const { movies } = useMovies();
  const [searchQuery, setSearchQuery] = useState('');

  const moviesList = useMemo(() => {
    let filtered = movies.filter(movie => movie.type === 'movie');
    
    if (searchQuery) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.genre.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [movies, searchQuery]);

  const moviesByGenre = useMemo(() => {
    const genres = [...new Set(moviesList.map(movie => movie.genre))];
    return genres.map(genre => ({
      genre,
      movies: moviesList.filter(movie => movie.genre === genre)
    }));
  }, [moviesList]);

  const featuredMovies = useMemo(() => {
    return moviesList.filter(movie => movie.isFeatured);
  }, [moviesList]);

  const trendingMovies = useMemo(() => {
    return moviesList.filter(movie => movie.isTrending);
  }, [moviesList]);

  return (
    <div className="min-h-screen bg-gray-900">
      <Header onSearch={setSearchQuery} />
      
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-white text-3xl md:text-4xl font-bold mb-8">Movies</h1>
          
          {searchQuery && (
            <div className="mb-8">
              <h2 className="text-white text-xl mb-4">
                Search Results for "{searchQuery}" in Movies
              </h2>
              {moviesList.length === 0 && (
                <p className="text-gray-400">No movies found matching your search.</p>
              )}
            </div>
          )}
        </div>

        {featuredMovies.length > 0 && (
          <MovieRow title="Featured Movies" movies={featuredMovies} />
        )}

        {trendingMovies.length > 0 && (
          <MovieRow title="Trending Movies" movies={trendingMovies} />
        )}

        {moviesByGenre.map(({ genre, movies }) => (
          movies.length > 0 && (
            <MovieRow
              key={genre}
              title={`${genre} Movies`}
              movies={movies}
            />
          )
        ))}
      </div>
    </div>
  );
};
