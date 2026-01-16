import React, { memo } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../context/ThemeContext'; // Используем контекст для получения темы
import { CryptoMarket } from '../types/crypto';
import { formatVolume } from '../utils/formatNumber';
import SparklineChart from './SparklineChart';

interface CryptoItemProps {
  crypto: CryptoMarket;
  index: number;
}

const { width } = Dimensions.get('window');

const CryptoItem: React.FC<CryptoItemProps> = memo(({ crypto, index }) => {
  const { theme } = useTheme(); // Получаем текущую тему из контекста

  const price = crypto.current_price ?? 0;
  const change24h = crypto.price_change_percentage_24h ?? 0;
  const volume24h = crypto.market_cap ?? 0;
  const sparkline = crypto.sparkline_in_7d?.price ?? [];
  const isPositive = change24h >= 0;

  return (
    <View style={[styles.container, { backgroundColor: theme.cardBg }]}>
      {/* Верхняя строка: индекс + изображение + название */}
      <View style={styles.row}>
        <Text style={[styles.index, { color: theme.text }]}>{index + 1}.</Text>

        <Image
          source={{ uri: crypto.image }}
          style={styles.image}
        />

        <Text style={[styles.name, { color: theme.text }]}>
          {crypto.name} ({crypto.symbol.toUpperCase()})
        </Text>
      </View>

      {/* Вторая строка: цена + изменение */}
      <View style={styles.row}>
        <Text style={[styles.price, { color: theme.text }]}>
          ${price.toLocaleString()}
        </Text>
        <Text
          style={[
            styles.change,
            { color: isPositive ? theme.priceUp : theme.priceDown },
          ]}
        >
          {change24h.toFixed(2)}%
        </Text>
      </View>

      {/* Sparkline график */}
      <SparklineChart data={sparkline} />

      {/* Объём */}
      <Text style={[styles.volume, { color: theme.text }]}>
        Vol (24h): ${formatVolume(volume24h)}
      </Text>
    </View>
  );
});

export default CryptoItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  index: {
    width: 24,
    fontSize: 14,
  },
  image: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    flexShrink: 1, // чтобы длинное название не вылазило за экран
  },
  price: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 12,
  },
  change: {
    fontSize: 14,
    fontWeight: '500',
  },
  chart: {
    marginTop: 6,
    width: width - 32, // чтобы график помещался по ширине контейнера
    height: 40,
  },
  volume: {
    marginTop: 6,
    fontSize: 12,
  },
});
