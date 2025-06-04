
import React, { useState, useMemo } from 'react';
import { Header } from '../components/public/Header';
import { MovieRow } from '../components/public/MovieRow';
import { useMovies } from '../context/MoviesContext';

export const Favorites: React.FC = () => {
  const { movies } = useMovies();
  const [searchQuery, setSearchQuery] = useState('');

  // For now, we'll show featured content as "favorites"
  // In a real app, this would be user-specific favorites
  const favoritesList = useMemo(() => {
    let filtered = movies.filter(movie => movie.isFeatured || movie.isTrending);
    
    if (searchQuery) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.genre.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [movies, searchQuery]);

  const favoriteMovies = useMemo(() => {
    return favoritesList.filter(movie => movie.type === 'movie');
  }, [favoritesList]);

  const favoriteTvShows = useMemo(() => {
    return favoritesList.filter(movie => movie.type === 'tv');
  }, [favoritesList]);

  const favoritesByGenre = useMemo(() => {
    const genres = [...new Set(favoritesList.map(movie => movie.genre))];
    return genres.map(genre => ({
      genre,
      movies: favoritesList.filter(movie => movie.genre === genre)
    }));
  }, [favoritesList]);

  return (
    <div className="min-h-screen bg-gray-900">
      <Header onSearch={setSearchQuery} />
      
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-white text-3xl md:text-4xl font-bold mb-8">My Favorites</h1>
          
          {searchQuery && (
            <div className="mb-8">
              <h2 className="text-white text-xl mb-4">
                Search Results for "{searchQuery}" in Favorites
              </h2>
              {favoritesList.length === 0 && (
                <p className="text-gray-400">No favorites found matching your search.</p>
              )}
            </div>
          )}

          {!searchQuery && favoritesList.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">You haven't added any favorites yet.</p>
              <p className="text-gray-500 mt-2">Browse movies and shows to start building your favorites list!</p>
            </div>
          )}
        </div>

        {favoriteMovies.length > 0 && (
          <MovieRow title="Favorite Movies" movies={favoriteMovies} />
        )}

        {favoriteTvShows.length > 0 && (
          <MovieRow title="Favorite TV Shows" movies={favoriteTvShows} />
        )}

        {favoritesByGenre.map(({ genre, movies }) => (
          movies.length > 0 && (
            <MovieRow
              key={genre}
              title={`${genre} Favorites`}
              movies={movies}
            />
          )
        ))}
      </div>
    </div>
  );
};
