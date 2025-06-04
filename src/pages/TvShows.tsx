
import React, { useState, useMemo } from 'react';
import { Header } from '../components/public/Header';
import { MovieRow } from '../components/public/MovieRow';
import { useMovies } from '../context/MoviesContext';

export const TvShows: React.FC = () => {
  const { movies } = useMovies();
  const [searchQuery, setSearchQuery] = useState('');

  const tvShowsList = useMemo(() => {
    let filtered = movies.filter(movie => movie.type === 'tv');
    
    if (searchQuery) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.genre.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [movies, searchQuery]);

  const showsByGenre = useMemo(() => {
    const genres = [...new Set(tvShowsList.map(show => show.genre))];
    return genres.map(genre => ({
      genre,
      movies: tvShowsList.filter(show => show.genre === genre)
    }));
  }, [tvShowsList]);

  const featuredShows = useMemo(() => {
    return tvShowsList.filter(show => show.isFeatured);
  }, [tvShowsList]);

  const trendingShows = useMemo(() => {
    return tvShowsList.filter(show => show.isTrending);
  }, [tvShowsList]);

  return (
    <div className="min-h-screen bg-gray-900">
      <Header onSearch={setSearchQuery} />
      
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-white text-3xl md:text-4xl font-bold mb-8">TV Shows</h1>
          
          {searchQuery && (
            <div className="mb-8">
              <h2 className="text-white text-xl mb-4">
                Search Results for "{searchQuery}" in TV Shows
              </h2>
              {tvShowsList.length === 0 && (
                <p className="text-gray-400">No TV shows found matching your search.</p>
              )}
            </div>
          )}
        </div>

        {featuredShows.length > 0 && (
          <MovieRow title="Featured TV Shows" movies={featuredShows} />
        )}

        {trendingShows.length > 0 && (
          <MovieRow title="Trending TV Shows" movies={trendingShows} />
        )}

        {showsByGenre.map(({ genre, movies }) => (
          movies.length > 0 && (
            <MovieRow
              key={genre}
              title={`${genre} TV Shows`}
              movies={movies}
            />
          )
        ))}
      </div>
    </div>
  );
};
