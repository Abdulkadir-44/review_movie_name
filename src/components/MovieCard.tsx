import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { MediaItem } from '../types';
import { getPosterUrl, formatRating, truncateText, formatDate } from '../utils';

interface MovieCardProps {
  movie: MediaItem;
  index: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, index }) => {
  return (
    <motion.div 
      className="movie-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
    >
      <Link to={`/movie/${movie.id}`} className="block">
        <div className="relative">
          <img 
            src={getPosterUrl(movie.poster_path)} 
            alt={`${movie.title || movie.name} poster`}
            className="w-full h-auto rounded-t-lg"
            loading="lazy"
          />
          <div className="absolute top-2 right-2 bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center">
            <span className="text-sm font-bold">{formatRating(movie.vote_average)}</span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-1 line-clamp-1">{movie.title || movie.name}</h3>
          <p className="text-sm text-gray-500 mb-2">{formatDate(movie.release_date || movie.first_air_date)}</p>
          <p className="text-sm line-clamp-2 text-gray-700 dark:text-gray-300">
            {truncateText(movie.overview, 120)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default MovieCard;
