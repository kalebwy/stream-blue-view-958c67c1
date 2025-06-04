
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Movie } from '../types';

interface MoviesContextType {
  movies: Movie[];
  addMovie: (movie: Omit<Movie, 'id'>) => void;
  updateMovie: (id: string, movie: Partial<Movie>) => void;
  deleteMovie: (id: string) => void;
  bulkDeleteMovies: (ids: string[]) => void;
  bulkUpdateGenre: (ids: string[], genre: string) => void;
  bulkToggleFeatured: (ids: string[]) => void;
  bulkToggleTrending: (ids: string[]) => void;
}

const MoviesContext = createContext<MoviesContextType | undefined>(undefined);

export const useMovies = () => {
  const context = useContext(MoviesContext);
  if (context === undefined) {
    throw new Error('useMovies must be used within a MoviesProvider');
  }
  return context;
};

// Sample movie data
const sampleMovies: Movie[] = [
  {
    id: '1',
    title: 'The Matrix',
    description: 'A computer programmer discovers that reality as he knows it might not be real.',
    youtubeId: 'vKQi3bBA1y8',
    posterUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=450&fit=crop',
    genre: 'Sci-Fi',
    rating: 8.7,
    year: 1999,
    isFeatured: true,
    isTrending: true,
    type: 'movie'
  },
  {
    id: '2',
    title: 'Stranger Things',
    description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments.',
    youtubeId: 'b9EkMc79ZSU',
    posterUrl: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=450&fit=crop',
    genre: 'Drama',
    rating: 8.8,
    year: 2016,
    isFeatured: true,
    isTrending: false,
    type: 'tv'
  },
  {
    id: '3',
    title: 'Ocean Waves',
    description: 'A beautiful documentary about the power and mystery of ocean waves.',
    youtubeId: '2wcI10CNuxU',
    posterUrl: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=300&h=450&fit=crop',
    genre: 'Documentary',
    rating: 7.5,
    year: 2020,
    isFeatured: false,
    isTrending: true,
    type: 'movie'
  },
  {
    id: '4',
    title: 'Forest Mysteries',
    description: 'An adventure through the world\'s most mysterious forests.',
    youtubeId: 'EngW7tLk6R8',
    posterUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=450&fit=crop',
    genre: 'Adventure',
    rating: 7.8,
    year: 2021,
    isFeatured: false,
    isTrending: false,
    type: 'movie'
  },
  {
    id: '5',
    title: 'Starry Night Chronicles',
    description: 'A cosmic journey through space and time.',
    youtubeId: 'YQHsXMglC9A',
    posterUrl: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=300&h=450&fit=crop',
    genre: 'Sci-Fi',
    rating: 8.2,
    year: 2022,
    isFeatured: false,
    isTrending: true,
    type: 'tv'
  }
];

interface MoviesProviderProps {
  children: ReactNode;
}

export const MoviesProvider: React.FC<MoviesProviderProps> = ({ children }) => {
  const [movies, setMovies] = useState<Movie[]>(sampleMovies);

  const addMovie = (movieData: Omit<Movie, 'id'>) => {
    const newMovie: Movie = {
      ...movieData,
      id: Date.now().toString()
    };
    setMovies(prev => [...prev, newMovie]);
  };

  const updateMovie = (id: string, movieData: Partial<Movie>) => {
    setMovies(prev => prev.map(movie => 
      movie.id === id ? { ...movie, ...movieData } : movie
    ));
  };

  const deleteMovie = (id: string) => {
    setMovies(prev => prev.filter(movie => movie.id !== id));
  };

  const bulkDeleteMovies = (ids: string[]) => {
    setMovies(prev => prev.filter(movie => !ids.includes(movie.id)));
  };

  const bulkUpdateGenre = (ids: string[], genre: string) => {
    setMovies(prev => prev.map(movie => 
      ids.includes(movie.id) ? { ...movie, genre } : movie
    ));
  };

  const bulkToggleFeatured = (ids: string[]) => {
    setMovies(prev => prev.map(movie => 
      ids.includes(movie.id) ? { ...movie, isFeatured: !movie.isFeatured } : movie
    ));
  };

  const bulkToggleTrending = (ids: string[]) => {
    setMovies(prev => prev.map(movie => 
      ids.includes(movie.id) ? { ...movie, isTrending: !movie.isTrending } : movie
    ));
  };

  return (
    <MoviesContext.Provider value={{
      movies,
      addMovie,
      updateMovie,
      deleteMovie,
      bulkDeleteMovies,
      bulkUpdateGenre,
      bulkToggleFeatured,
      bulkToggleTrending
    }}>
      {children}
    </MoviesContext.Provider>
  );
};
