import { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { MediaCard } from './components/MediaCard';
import { MediaDetails } from './components/MediaDetails';
import { movieService } from './api/movieService';
import type { MediaItem, MediaDetails as MediaDetailsType } from './types';

function App() {
  const [searchResults, setSearchResults] = useState<MediaItem[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<MediaDetailsType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTrending();
  }, []);

  const loadTrending = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await movieService.getTrending();
      if (data.results && data.results.length > 0) {
        setSearchResults(data.results);
      } else {
        setError('Trend içerikler bulunamadı.');
      }
    } catch (error) {
      console.error('Trend içerikler yüklenirken hata:', error);
      setError('Trend içerikler yüklenirken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await movieService.searchMovies({ query });
      if (data.results && data.results.length > 0) {
        setSearchResults(data.results);
      } else {
        setError('Aramanızla eşleşen sonuç bulunamadı.');
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Arama yapılırken hata:', error);
      setError('Arama yapılırken bir hata oluştu.');
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMediaClick = async (item: MediaItem) => {
    try {
      setIsLoading(true);
      setError(null);
      const details = item.media_type === 'movie'
        ? await movieService.getMovieDetails(item.id)
        : await movieService.getTVDetails(item.id);
      setSelectedMedia(details);
    } catch (error) {
      console.error('Detaylar yüklenirken hata:', error);
      setError('Detaylar yüklenirken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-gradient-to-r from-sky-400 via-indigo-400 to-violet-400 text-white py-6 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-3">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-10 w-10 text-white" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M7 4v16M17 4v16M3 8h18M3 16h18" 
              />
            </svg>
            <h1 className="text-3xl font-bold tracking-wide">Film ve Dizi Arama</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <SearchBar onSearch={handleSearch} />

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        {isLoading && !selectedMedia ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {searchResults.map((item) => (
              <MediaCard
                key={item.id}
                item={item}
                onClick={handleMediaClick}
              />
            ))}
          </div>
        )}

        {selectedMedia && (
          <MediaDetails
            details={selectedMedia}
            onClose={() => setSelectedMedia(null)}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}

export default App;
