import { motion, AnimatePresence } from 'framer-motion';
import { IMAGE_BASE_URL, DEFAULT_IMAGES } from '../api/config';
import type { MediaDetails as MediaDetailsType } from '../types';

interface MediaDetailsProps {
  details: MediaDetailsType | null;
  onClose: () => void;
  isLoading?: boolean;
}

export const MediaDetails = ({ details, onClose, isLoading = false }: MediaDetailsProps) => {
  if (!details) return null;

  const title = details.title || details.name || 'İsimsiz';
  const releaseDate = details.release_date || details.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : '';
  const backdropPath = details.backdrop_path ? `${IMAGE_BASE_URL}/original${details.backdrop_path}` : DEFAULT_IMAGES.backdrop;
  const rating = details.vote_average ? details.vote_average.toFixed(1) : 'N/A';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              <div className="relative">
                <img
                  src={backdropPath}
                  alt={title}
                  className="w-full h-64 object-cover rounded-t-lg"
                  onError={(e) => {
                    e.currentTarget.src = DEFAULT_IMAGES.backdrop;
                  }}
                />
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {title} ({year})
                    </h2>
                    <div className="flex items-center mt-2">
                      <span className="bg-yellow-400 text-black px-2 py-1 rounded-full text-sm font-bold">
                        {rating}
                      </span>
                      {details.genres && (
                        <span className="ml-4 text-gray-600 dark:text-gray-300">
                          {details.genres.map((genre) => genre.name).join(', ')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-gray-600 dark:text-gray-300">{details.overview}</p>

                {details.credits?.cast && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Oyuncular</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {details.credits.cast.slice(0, 8).map((actor) => (
                        <div key={actor.id} className="text-center">
                          <img
                            src={actor.profile_path ? `${IMAGE_BASE_URL}/w185${actor.profile_path}` : DEFAULT_IMAGES.profile}
                            alt={actor.name}
                            className="w-24 h-24 rounded-full object-cover mx-auto"
                            onError={(e) => {
                              e.currentTarget.src = DEFAULT_IMAGES.profile;
                            }}
                          />
                          <p className="mt-2 text-sm font-medium text-gray-900 dark:text-white">{actor.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{actor.character}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}; 