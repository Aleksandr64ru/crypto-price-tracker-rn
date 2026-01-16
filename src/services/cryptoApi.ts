import axios from 'axios';
import { CryptoMarket } from '../types/crypto';

const api = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
  timeout: 10000,
});

// Функция для получения данных о нескольких криптовалютах
export const getCryptoPrices = async (): Promise<CryptoMarket[]> => {
  try {
    const response = await api.get<CryptoMarket[]>('/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 15,
        page: 1,
        sparkline: true,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    return [];
  }
};
