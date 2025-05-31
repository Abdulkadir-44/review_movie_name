import axios from 'axios';
import { API_KEY, BASE_URL } from './config';

const testSearch = async (query: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/multi`, {
      params: {
        api_key: API_KEY,
        query,
        language: 'tr-TR'
      }
    });
    console.log(`${query} için API yanıtı:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`${query} için hata:`, error);
    throw error;
  }
};

// Test fonksiyonunu çalıştır
const runTests = async () => {
  console.log('API Testleri Başlıyor...');
  
  try {
    await testSearch('Sopranos');
    await testSearch('Lost');
    await testSearch('Breaking Bad');
  } catch (error) {
    console.error('Test sırasında hata:', error);
  }
};

runTests(); 