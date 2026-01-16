import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import CryptoItem from './CryptoItem';
import SearchInput from './SearchInput';
import { getCryptoPrices } from '../services/cryptoApi';
import { CryptoMarket } from '../types/crypto';
import { useTheme } from '../context/ThemeContext'; // Импортируем контекст для темы

const CryptoList: React.FC = () => {
  const [cryptos, setCryptos] = useState<CryptoMarket[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState<string>('');

  const { theme } = useTheme(); // Получаем текущую тему из контекста

  // Получение данных с API
  const fetchData = async () => {
    try {
      if (!refreshing) setLoading(true);
      const data = await getCryptoPrices();
      setCryptos(data);
    } catch (error) {
      console.error('Error fetching crypto list:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
  };

  // Фильтр по поиску
  const filteredCryptos = useMemo(() => {
    if (!query) return cryptos;
    return cryptos.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(query.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, cryptos]);

  // Индикатор загрузки
  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.text} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Поисковое поле */}
      <SearchInput onSearch={setQuery} />

      {filteredCryptos.length === 0 ? (
        <Text style={[styles.noResults, { color: theme.text }]}>Криптовалюты не найдены</Text>
      ) : (
        <FlatList
          data={filteredCryptos}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <CryptoItem crypto={item} index={index} />
          )}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          contentContainerStyle={[styles.listContainer, { backgroundColor: theme.background }]}
        />
      )}
    </View>
  );
};

export default CryptoList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  noResults: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
});
