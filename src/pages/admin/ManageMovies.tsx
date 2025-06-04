
import React, { useState, useMemo } from 'react';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { useMovies } from '../../context/MoviesContext';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';
import { PreviewModal } from '../../components/admin/PreviewModal';
import { Movie } from '../../types';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Star, 
  TrendingUp,
  Filter,
  ChevronDown,
  Check
} from 'lucide-react';

const genres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Documentary', 'Romance', 'Thriller'];

export const ManageMovies: React.FC = () => {
  const { movies, deleteMovie, bulkDeleteMovies, bulkUpdateGenre, bulkToggleFeatured, bulkToggleTrending, addMovie, updateMovie } = useMovies();
  
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGenre, setFilterGenre] = useState('');
  const [filterType, setFilterType] = useState('');
  const [selectedMovies, setSelectedMovies] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({ isOpen: false, title: '', message: '', onConfirm: () => {} });
  const [previewModal, setPreviewModal] = useState<{
    isOpen: boolean;
    youtubeId: string;
    title: string;
  }>({ isOpen: false, youtubeId: '', title: '' });
  const [showBulkActions, setShowBulkActions] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    youtubeId: '',
    posterUrl: '',
    genre: '',
    rating: '',
    year: '',
    type: 'movie' as 'movie' | 'tv',
    isFeatured: false,
    isTrending: false
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Filtered movies
  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           movie.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = !filterGenre || movie.genre === filterGenre;
      const matchesType = !filterType || movie.type === filterType;
      
      return matchesSearch && matchesGenre && matchesType;
    });
  }, [movies, searchQuery, filterGenre, filterType]);

  // Form validation
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (!formData.youtubeId.trim()) errors.youtubeId = 'YouTube ID is required';
    if (!formData.posterUrl.trim()) errors.posterUrl = 'Poster URL is required';
    if (!formData.genre) errors.genre = 'Genre is required';
    
    const rating = parseFloat(formData.rating);
    if (!formData.rating || isNaN(rating) || rating < 0 || rating > 10) {
      errors.rating = 'Rating must be between 0 and 10';
    }
    
    const year = parseInt(formData.year);
    if (!formData.year || isNaN(year) || year < 1900 || year > new Date().getFullYear() + 5) {
      errors.year = 'Please enter a valid year';
    }

    // URL validation
    try {
      new URL(formData.posterUrl);
    } catch {
      errors.posterUrl = 'Please enter a valid URL';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Form handlers
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const movieData = {
      ...formData,
      rating: parseFloat(formData.rating),
      year: parseInt(formData.year)
    };

    if (editingMovie) {
      updateMovie(editingMovie.id, movieData);
    } else {
      addMovie(movieData);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      youtubeId: '',
      posterUrl: '',
      genre: '',
      rating: '',
      year: '',
      type: 'movie',
      isFeatured: false,
      isTrending: false
    });
    setFormErrors({});
    setShowForm(false);
    setEditingMovie(null);
  };

  const handleEdit = (movie: Movie) => {
    setFormData({
      title: movie.title,
      description: movie.description,
      youtubeId: movie.youtubeId,
      posterUrl: movie.posterUrl,
      genre: movie.genre,
      rating: movie.rating.toString(),
      year: movie.year.toString(),
      type: movie.type,
      isFeatured: movie.isFeatured,
      isTrending: movie.isTrending
    });
    setEditingMovie(movie);
    setShowForm(true);
  };

  // Selection handlers
  const handleSelectAll = () => {
    if (selectedMovies.length === filteredMovies.length) {
      setSelectedMovies([]);
    } else {
      setSelectedMovies(filteredMovies.map(m => m.id));
    }
  };

  const handleSelectMovie = (movieId: string) => {
    setSelectedMovies(prev => 
      prev.includes(movieId) 
        ? prev.filter(id => id !== movieId)
        : [...prev, movieId]
    );
  };

  // Bulk actions
  const handleBulkDelete = () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Selected Content',
      message: `Are you sure you want to delete ${selectedMovies.length} selected item(s)? This action cannot be undone.`,
      onConfirm: () => {
        bulkDeleteMovies(selectedMovies);
        setSelectedMovies([]);
        setConfirmDialog(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const handleBulkGenreChange = (genre: string) => {
    bulkUpdateGenre(selectedMovies, genre);
    setSelectedMovies([]);
    setShowBulkActions(false);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <AdminHeader />
      
      <div className="container mx-auto px-4 py-8">
        {!showForm ? (
          <>
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Manage Content</h1>
                <p className="text-gray-400">Add, edit, and organize your movies and TV shows</p>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors mt-4 sm:mt-0"
              >
                <Plus className="h-5 w-5" />
                <span>Add Content</span>
              </button>
            </div>

            {/* Filters and Search */}
            <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <select
                  value={filterGenre}
                  onChange={(e) => setFilterGenre(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded-lg text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Genres</option>
                  {genres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>

                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded-lg text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Types</option>
                  <option value="movie">Movies</option>
                  <option value="tv">TV Shows</option>
                </select>

                <div className="text-gray-300 flex items-center">
                  {filteredMovies.length} item(s) found
                </div>
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedMovies.length > 0 && (
              <div className="bg-blue-900 border border-blue-700 rounded-lg p-4 mb-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <span className="text-blue-200">
                    {selectedMovies.length} item(s) selected
                  </span>
                  
                  <div className="flex flex-wrap items-center space-x-2">
                    <div className="relative">
                      <button
                        onClick={() => setShowBulkActions(!showBulkActions)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                      >
                        <span>Bulk Actions</span>
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      
                      {showBulkActions && (
                        <div className="absolute top-full mt-2 right-0 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10 min-w-48">
                          <div className="p-2">
                            <div className="text-gray-300 text-sm mb-2 px-2">Change Genre:</div>
                            {genres.map(genre => (
                              <button
                                key={genre}
                                onClick={() => handleBulkGenreChange(genre)}
                                className="w-full text-left px-3 py-2 text-gray-300 hover:bg-gray-700 rounded text-sm"
                              >
                                {genre}
                              </button>
                            ))}
                            <hr className="border-gray-700 my-2" />
                            <button
                              onClick={() => {
                                bulkToggleFeatured(selectedMovies);
                                setSelectedMovies([]);
                                setShowBulkActions(false);
                              }}
                              className="w-full text-left px-3 py-2 text-gray-300 hover:bg-gray-700 rounded text-sm"
                            >
                              Toggle Featured
                            </button>
                            <button
                              onClick={() => {
                                bulkToggleTrending(selectedMovies);
                                setSelectedMovies([]);
                                setShowBulkActions(false);
                              }}
                              className="w-full text-left px-3 py-2 text-gray-300 hover:bg-gray-700 rounded text-sm"
                            >
                              Toggle Trending
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <button
                      onClick={handleBulkDelete}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Delete Selected</span>
                    </button>
                    
                    <button
                      onClick={() => setSelectedMovies([])}
                      className="text-gray-300 hover:text-white px-4 py-2 transition-colors"
                    >
                      Clear Selection
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Content Table */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="text-left p-4">
                        <input
                          type="checkbox"
                          checked={selectedMovies.length === filteredMovies.length && filteredMovies.length > 0}
                          onChange={handleSelectAll}
                          className="rounded bg-gray-600 border-gray-500 text-blue-600 focus:ring-blue-500"
                        />
                      </th>
                      <th className="text-left text-gray-300 font-medium p-4">Poster</th>
                      <th className="text-left text-gray-300 font-medium p-4">Title</th>
                      <th className="text-left text-gray-300 font-medium p-4">Type</th>
                      <th className="text-left text-gray-300 font-medium p-4">Genre</th>
                      <th className="text-left text-gray-300 font-medium p-4">Year</th>
                      <th className="text-left text-gray-300 font-medium p-4">Rating</th>
                      <th className="text-left text-gray-300 font-medium p-4">Status</th>
                      <th className="text-left text-gray-300 font-medium p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMovies.map((movie) => (
                      <tr key={movie.id} className="border-b border-gray-700 hover:bg-gray-750">
                        <td className="p-4">
                          <input
                            type="checkbox"
                            checked={selectedMovies.includes(movie.id)}
                            onChange={() => handleSelectMovie(movie.id)}
                            className="rounded bg-gray-600 border-gray-500 text-blue-600 focus:ring-blue-500"
                          />
                        </td>
                        <td className="p-4">
                          <img
                            src={movie.posterUrl}
                            alt={movie.title}
                            className="w-12 h-16 object-cover rounded"
                          />
                        </td>
                        <td className="p-4 text-white font-medium">{movie.title}</td>
                        <td className="p-4 text-gray-300 capitalize">{movie.type}</td>
                        <td className="p-4 text-gray-300">{movie.genre}</td>
                        <td className="p-4 text-gray-300">{movie.year}</td>
                        <td className="p-4 text-gray-300">{movie.rating}/10</td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            {movie.isFeatured && (
                              <span className="bg-yellow-600 text-white text-xs px-2 py-1 rounded flex items-center">
                                <Star className="h-3 w-3 mr-1" />
                                Featured
                              </span>
                            )}
                            {movie.isTrending && (
                              <span className="bg-red-600 text-white text-xs px-2 py-1 rounded flex items-center">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                Trending
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setPreviewModal({
                                isOpen: true,
                                youtubeId: movie.youtubeId,
                                title: movie.title
                              })}
                              className="text-gray-400 hover:text-blue-400 transition-colors"
                              title="Preview"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleEdit(movie)}
                              className="text-gray-400 hover:text-yellow-400 transition-colors"
                              title="Edit"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => setConfirmDialog({
                                isOpen: true,
                                title: 'Delete Content',
                                message: `Are you sure you want to delete "${movie.title}"? This action cannot be undone.`,
                                onConfirm: () => {
                                  deleteMovie(movie.id);
                                  setConfirmDialog(prev => ({ ...prev, isOpen: false }));
                                }
                              })}
                              className="text-gray-400 hover:text-red-400 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredMovies.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-lg">No content found</p>
                  <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Add/Edit Form */
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-white">
                {editingMovie ? 'Edit Content' : 'Add New Content'}
              </h1>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-6 border border-gray-700 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className={`w-full px-4 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      formErrors.title ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Enter title"
                  />
                  {formErrors.title && (
                    <p className="text-red-400 text-sm mt-1">{formErrors.title}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as 'movie' | 'tv' })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="movie">Movie</option>
                    <option value="tv">TV Show</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className={`w-full px-4 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formErrors.description ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="Enter description"
                />
                {formErrors.description && (
                  <p className="text-red-400 text-sm mt-1">{formErrors.description}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    YouTube ID *
                  </label>
                  <input
                    type="text"
                    value={formData.youtubeId}
                    onChange={(e) => setFormData({ ...formData, youtubeId: e.target.value })}
                    className={`w-full px-4 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      formErrors.youtubeId ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="e.g., dQw4w9WgXcQ"
                  />
                  {formErrors.youtubeId && (
                    <p className="text-red-400 text-sm mt-1">{formErrors.youtubeId}</p>
                  )}
                  {formData.youtubeId && (
                    <button
                      type="button"
                      onClick={() => setPreviewModal({
                        isOpen: true,
                        youtubeId: formData.youtubeId,
                        title: formData.title || 'Preview'
                      })}
                      className="mt-2 text-blue-400 hover:text-blue-300 text-sm flex items-center space-x-1"
                    >
                      <Eye className="h-4 w-4" />
                      <span>Preview Video</span>
                    </button>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Poster URL *
                  </label>
                  <input
                    type="url"
                    value={formData.posterUrl}
                    onChange={(e) => setFormData({ ...formData, posterUrl: e.target.value })}
                    className={`w-full px-4 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      formErrors.posterUrl ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="https://example.com/poster.jpg"
                  />
                  {formErrors.posterUrl && (
                    <p className="text-red-400 text-sm mt-1">{formErrors.posterUrl}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Genre *
                  </label>
                  <select
                    value={formData.genre}
                    onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                    className={`w-full px-4 py-2 bg-gray-700 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      formErrors.genre ? 'border-red-500' : 'border-gray-600'
                    }`}
                  >
                    <option value="">Select Genre</option>
                    {genres.map(genre => (
                      <option key={genre} value={genre}>{genre}</option>
                    ))}
                  </select>
                  {formErrors.genre && (
                    <p className="text-red-400 text-sm mt-1">{formErrors.genre}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Rating (0-10) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                    className={`w-full px-4 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      formErrors.rating ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="8.5"
                  />
                  {formErrors.rating && (
                    <p className="text-red-400 text-sm mt-1">{formErrors.rating}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Year *
                  </label>
                  <input
                    type="number"
                    min="1900"
                    max={new Date().getFullYear() + 5}
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className={`w-full px-4 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      formErrors.year ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="2023"
                  />
                  {formErrors.year && (
                    <p className="text-red-400 text-sm mt-1">{formErrors.year}</p>
                  )}
                </div>
              </div>

              <div className="flex space-x-6">
                <label className="flex items-center space-x-2 text-gray-300">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="rounded bg-gray-600 border-gray-500 text-blue-600 focus:ring-blue-500"
                  />
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span>Featured Content</span>
                </label>

                <label className="flex items-center space-x-2 text-gray-300">
                  <input
                    type="checkbox"
                    checked={formData.isTrending}
                    onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
                    className="rounded bg-gray-600 border-gray-500 text-blue-600 focus:ring-blue-500"
                  />
                  <TrendingUp className="h-4 w-4 text-red-400" />
                  <span>Trending Content</span>
                </label>
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                >
                  <Check className="h-4 w-4" />
                  <span>{editingMovie ? 'Update' : 'Add'} Content</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmDialog.onConfirm}
        title={confirmDialog.title}
        message={confirmDialog.message}
      />

      {/* Preview Modal */}
      <PreviewModal
        isOpen={previewModal.isOpen}
        onClose={() => setPreviewModal(prev => ({ ...prev, isOpen: false }))}
        youtubeId={previewModal.youtubeId}
        title={previewModal.title}
      />
    </div>
  );
};
