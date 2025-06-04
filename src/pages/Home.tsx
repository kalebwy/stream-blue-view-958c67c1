
import React, { useState, useMemo } from 'react';
import { Header } from '../components/public/Header';
import { HeroSection } from '../components/public/HeroSection';
import { MovieRow } from '../components/public/MovieRow';
import { useMovies } from '../context/MoviesContext';

export const Home: React.FC = () => {
  const { movies } = useMovies();
  const [searchQuery, setSearchQuery] = useState('');

  const featuredMovie = useMemo(() => {
    return movies.find(movie => movie.isFeatured) || movies[0];
  }, [movies]);

  const filteredMovies = useMemo(() => {
    if (!searchQuery) return movies;
    
    return movies.filter(movie =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [movies, searchQuery]);

  const trendingMovies = useMemo(() => {
    return filteredMovies.filter(movie => movie.isTrending);
  }, [filteredMovies]);

  const moviesByGenre = useMemo(() => {
    const genres = [...new Set(filteredMovies.map(movie => movie.genre))];
    return genres.map(genre => ({
      genre,
      movies: filteredMovies.filter(movie => movie.genre === genre)
    }));
  }, [filteredMovies]);

  const recentMovies = useMemo(() => {
    return [...filteredMovies]
      .sort((a, b) => b.year - a.year)
      .slice(0, 10);
  }, [filteredMovies]);

  return (
    <div className="min-h-screen bg-gray-900">
      <Header onSearch={setSearchQuery} />
      
      {!searchQuery && featuredMovie && (
        <HeroSection movie={featuredMovie} />
      )}

      <div className={`${!searchQuery ? 'mt-0' : 'mt-20 pt-8'}`}>
        {searchQuery && (
          <div className="container mx-auto px-4 mb-8">
            <h1 className="text-white text-2xl md:text-3xl font-bold">
              Search Results for "{searchQuery}"
            </h1>
            {filteredMovies.length === 0 && (
              <p className="text-gray-400 mt-4">No movies or shows found matching your search.</p>
            )}
          </div>
        )}

        {trendingMovies.length > 0 && (
          <MovieRow title="Trending Now" movies={trendingMovies} />
        )}

        {!searchQuery && (
          <MovieRow title="Recently Added" movies={recentMovies} />
        )}

        {moviesByGenre.map(({ genre, movies }) => (
          movies.length > 0 && (
            <MovieRow
              key={genre}
              title={genre}
              movies={movies}
            />
          )
        ))}
      </div>
    </div>
  );
};
