import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { ThemeProvider, useTheme } from './src/context/ThemeContext'; // Импортируем ThemeContext
import Header from './src/components/Header';
import CryptoList from './src/components/CryptoList';

const AppContent = () => {
  const { isDarkMode, theme } = useTheme(); // Получаем тему из контекста

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Header />
      <View style={styles.listContainer}>
        <CryptoList />
      </View>
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  listContainer: { flex: 1, paddingHorizontal: 16 },
});
