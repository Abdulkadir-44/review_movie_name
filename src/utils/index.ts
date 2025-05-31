import { IMAGE_BASE_URL, POSTER_SIZES, BACKDROP_SIZES, DEFAULT_IMAGES } from '../api/config';

// Format date to a more readable format
export const formatDate = (dateString?: string): string => {
  if (!dateString) return 'N/A';
  
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  return new Date(dateString).toLocaleDateString('tr-TR', options);
};

// Format runtime from minutes to hours and minutes
export const formatRuntime = (minutes: number): string => {
  if (!minutes) return 'N/A';
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  return `${hours}s ${remainingMinutes}dk`;
};

// Format number to include commas for thousands
export const formatNumber = (num: number): string => {
  if (!num && num !== 0) return 'N/A';
  return num.toLocaleString('tr-TR');
};

// Format currency to USD
export const formatCurrency = (amount: number): string => {
  if (!amount && amount !== 0) return 'N/A';
  
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
};

// Get poster URL with specified size
export const getPosterUrl = (path: string | null, size: keyof typeof POSTER_SIZES = 'medium'): string => {
  if (!path) return DEFAULT_IMAGES.poster;
  return `${IMAGE_BASE_URL}/${POSTER_SIZES[size]}${path}`;
};

// Get backdrop URL with specified size
export const getBackdropUrl = (path: string | null, size: keyof typeof BACKDROP_SIZES = 'large'): string => {
  if (!path) return DEFAULT_IMAGES.backdrop;
  return `${IMAGE_BASE_URL}/${BACKDROP_SIZES[size]}${path}`;
};

// Format rating to display with one decimal place
export const formatRating = (rating: number): string => {
  if (rating === undefined || rating === null) return 'N/A';
  return rating.toFixed(1);
};

// Truncate text with ellipsis if it exceeds the specified length
export const truncateText = (text: string, maxLength: number): string => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  
  return text.slice(0, maxLength) + '...';
};
