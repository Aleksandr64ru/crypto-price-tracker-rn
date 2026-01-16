import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext'; // Используем ThemeContext для получения темы

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme(); // Получаем isDarkMode и toggleTheme из контекста

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: isDarkMode ? '#333' : '#eee' }, // Цвет кнопки в зависимости от темы
      ]}
      onPress={toggleTheme} // Вызываем toggleTheme при нажатии
    >
      <Text style={styles.emoji}>{isDarkMode ? '🌞' : '🌜'}</Text>
      <Text style={[styles.text, { color: isDarkMode ? '#fff' : '#000' }]}>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </Text>
    </TouchableOpacity>
  );
};

export default ThemeToggle;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  emoji: {
    fontSize: 18,
    marginRight: 6,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
});
