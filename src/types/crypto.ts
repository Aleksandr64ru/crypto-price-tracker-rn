export interface CryptoMarket {
    id: string;
    name: string;
    symbol: string;
    image: string;
    current_price: number;
    price_change_percentage_24h: number;
    market_cap: number;
    sparkline_in_7d?: {
      price: number[];
    };
  }
  