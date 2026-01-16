import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext'; // Используем useTheme для получения текущей темы
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const { isDarkMode, theme } = useTheme(); // Получаем тему и переключатель из контекста

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.cardBg },
      ]}
    >
      <Text style={[styles.title, { color: theme.text }]}>
        Crypto Price Tracker
      </Text>
      <ThemeToggle /> {/* Кнопка для переключения темы */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
});

export default Header;
