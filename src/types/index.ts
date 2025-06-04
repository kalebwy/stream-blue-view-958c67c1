
export interface Movie {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  posterUrl: string;
  genre: string;
  rating: number;
  year: number;
  isFeatured: boolean;
  isTrending: boolean;
  type: 'movie' | 'tv';
}

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export interface Genre {
  id: string;
  name: string;
}
