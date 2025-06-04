
import React from 'react';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { useMovies } from '../../context/MoviesContext';
import { BarChart3, Film, Tv, Star, TrendingUp } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { movies } = useMovies();

  const stats = {
    totalMovies: movies.filter(m => m.type === 'movie').length,
    totalTvShows: movies.filter(m => m.type === 'tv').length,
    featuredContent: movies.filter(m => m.isFeatured).length,
    trendingContent: movies.filter(m => m.isTrending).length,
    totalContent: movies.length,
    genres: [...new Set(movies.map(m => m.genre))].length,
    averageRating: movies.length > 0 ? (movies.reduce((sum, m) => sum + m.rating, 0) / movies.length).toFixed(1) : 0
  };

  const genreStats = [...new Set(movies.map(m => m.genre))].map(genre => ({
    genre,
    count: movies.filter(m => m.genre === genre).length
  })).sort((a, b) => b.count - a.count);

  const recentContent = [...movies]
    .sort((a, b) => b.year - a.year)
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-900">
      <AdminHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Overview of your streaming platform</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Movies</p>
                <p className="text-2xl font-bold text-white">{stats.totalMovies}</p>
              </div>
              <Film className="h-8 w-8 text-blue-400" />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total TV Shows</p>
                <p className="text-2xl font-bold text-white">{stats.totalTvShows}</p>
              </div>
              <Tv className="h-8 w-8 text-blue-400" />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Featured Content</p>
                <p className="text-2xl font-bold text-white">{stats.featuredContent}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-400" />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Trending Content</p>
                <p className="text-2xl font-bold text-white">{stats.trendingContent}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-red-400" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Content Overview */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Content Overview
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Total Content</span>
                <span className="text-white font-medium">{stats.totalContent}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Genres</span>
                <span className="text-white font-medium">{stats.genres}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Average Rating</span>
                <span className="text-white font-medium">{stats.averageRating}/10</span>
              </div>
            </div>
          </div>

          {/* Genre Breakdown */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Genre Breakdown</h3>
            <div className="space-y-3">
              {genreStats.map((stat, index) => (
                <div key={stat.genre} className="flex justify-between items-center">
                  <span className="text-gray-300">{stat.genre}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(stat.count / stats.totalContent) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-white font-medium w-8 text-right">{stat.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Content */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Content</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-gray-300 font-medium py-3">Title</th>
                  <th className="text-left text-gray-300 font-medium py-3">Type</th>
                  <th className="text-left text-gray-300 font-medium py-3">Genre</th>
                  <th className="text-left text-gray-300 font-medium py-3">Year</th>
                  <th className="text-left text-gray-300 font-medium py-3">Rating</th>
                  <th className="text-left text-gray-300 font-medium py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentContent.map((content) => (
                  <tr key={content.id} className="border-b border-gray-700">
                    <td className="py-3 text-white">{content.title}</td>
                    <td className="py-3 text-gray-300 capitalize">{content.type}</td>
                    <td className="py-3 text-gray-300">{content.genre}</td>
                    <td className="py-3 text-gray-300">{content.year}</td>
                    <td className="py-3 text-gray-300">{content.rating}/10</td>
                    <td className="py-3">
                      <div className="flex space-x-2">
                        {content.isFeatured && (
                          <span className="bg-yellow-600 text-white text-xs px-2 py-1 rounded">
                            Featured
                          </span>
                        )}
                        {content.isTrending && (
                          <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">
                            Trending
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
