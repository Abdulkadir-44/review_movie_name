// API configuration
export const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
export const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
export const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;
export const LANGUAGE = import.meta.env.VITE_TMDB_LANGUAGE;

// Image sizes
export const POSTER_SIZES = {
  small: 'w185',
  medium: 'w342',
  large: 'w500',
  original: 'original'
};

export const BACKDROP_SIZES = {
  small: 'w300',
  medium: 'w780',
  large: 'w1280',
  original: 'original'
};

// API endpoints
export const ENDPOINTS = {
  search: '/search/multi',
  movie: '/movie',
  tv: '/tv',
  trending: '/trending/all/week',
  popular: '/movie/popular',
  topRated: '/movie/top_rated',
  upcoming: '/movie/upcoming',
  nowPlaying: '/movie/now_playing'
};



export const DEFAULT_IMAGES = {
  poster: '/images/no-poster.png',
  backdrop: '/images/no-backdrop.png',
  profile: '/images/no-profile.png'
};
