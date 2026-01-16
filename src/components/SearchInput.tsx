import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext'; // Импортируем контекст для темы

interface SearchInputProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Поиск криптовалюты...',
  onSearch,
}) => {
  const [query, setQuery] = useState('');
  const { theme } = useTheme(); // Получаем текущую тему из контекста

  const handleChange = (text: string) => {
    setQuery(text);
    onSearch(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={query}
        onChangeText={handleChange}
        placeholder={placeholder}
        style={[styles.input, { backgroundColor: theme.cardBg, color: theme.text }]}
        placeholderTextColor={theme.text}
      />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
});
