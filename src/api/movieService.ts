import axios from 'axios';
import { API_KEY, BASE_URL, ENDPOINTS, LANGUAGE } from './config';
import type { SearchResponse, MediaDetails, SearchParams } from '../types';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: LANGUAGE,
  },
});

// Varsayılan görsel yolları
export const DEFAULT_IMAGES = {
  poster: '/images/no-poster.png',
  backdrop: '/images/no-backdrop.png',
  profile: '/images/no-profile.png'
};

// API service functions
export const movieService = {
  
  searchMovies: async ({ query, page = 1 }: SearchParams): Promise<SearchResponse> => {
    try {
      const response = await api.get(ENDPOINTS.search, {
        params: {
          query,
          page
        }
      });
      return response.data;
    } catch (error) {
      console.error('Arama hatası:', error);
      throw error;
    }
  },

  // Get trending movies
  getTrending: async (): Promise<SearchResponse> => {
    try {
      const response = await api.get(ENDPOINTS.trending);
      return response.data;
    } catch (error) {
      console.error('Trend içerik hatası:', error);
      throw error;
    }
  },

  // Get popular movies
  getPopular: async (page = 1): Promise<SearchResponse> => {
    try {
      const response = await api.get(ENDPOINTS.popular, {
        params: { page }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw error;
    }
  },

  // Get movie details by ID
  getMovieDetails: async (id: number): Promise<MediaDetails> => {
    try {
      const response = await api.get(`${ENDPOINTS.movie}/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        // 404 hatası durumunda varsayılan bir MediaDetails objesi döndür
        return {
          id,
          title: 'Film bulunamadı',
          overview: 'Bu film için detay bilgisi mevcut değil.',
          poster_path: DEFAULT_IMAGES.poster,
          backdrop_path: DEFAULT_IMAGES.backdrop,
          media_type: 'movie',
          adult: false,
          original_language: 'tr',
          genre_ids: [],
          popularity: 0,
          vote_average: 0,
          vote_count: 0,
          genres: []
        };
      }
      console.error('Film detayları hatası:', error);
      throw error;
    }
  },

  // Get TV details by ID
  getTVDetails: async (id: number): Promise<MediaDetails> => {
    try {
      const response = await api.get(`${ENDPOINTS.tv}/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        // 404 hatası durumunda varsayılan bir MediaDetails objesi döndür
        return {
          id,
          name: 'Dizi bulunamadı',
          overview: 'Bu dizi için detay bilgisi mevcut değil.',
          poster_path: DEFAULT_IMAGES.poster,
          backdrop_path: DEFAULT_IMAGES.backdrop,
          media_type: 'tv',
          adult: false,
          original_language: 'tr',
          genre_ids: [],
          popularity: 0,
          vote_average: 0,
          vote_count: 0,
          genres: []
        };
      }
      console.error('Dizi detayları hatası:', error);
      throw error;
    }
  }
};
