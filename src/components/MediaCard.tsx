import { motion } from 'framer-motion';
import { IMAGE_BASE_URL, DEFAULT_IMAGES } from '../api/config';
import type { MediaItem } from '../types';

interface MediaCardProps {
  item: MediaItem;
  onClick: (item: MediaItem) => void;
}

export const MediaCard = ({ item, onClick }: MediaCardProps) => {
  const title = item.title || item.name || 'İsimsiz';
  const releaseDate = item.release_date || item.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : '';
  const posterPath = item.poster_path ? `${IMAGE_BASE_URL}/w500${item.poster_path}` : DEFAULT_IMAGES.poster;
  const rating = item.vote_average ? item.vote_average.toFixed(1) : 'N/A';

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer"
      onClick={() => onClick(item)}
    >
      <div className="relative aspect-[2/3]">
        <img
          src={posterPath}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = DEFAULT_IMAGES.poster;
          }}
        />
        <div className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded-full text-sm font-bold">
          {rating}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {year} • {item.media_type === 'movie' ? 'Film' : 'Dizi'}
        </p>
      </div>
    </motion.div>
  );
}; 