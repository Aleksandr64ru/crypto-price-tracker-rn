import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface SparklineChartProps {
  data: number[];
  width?: number;
  height?: number;
}

const SparklineChart: React.FC<SparklineChartProps> = ({
  data,
  width = 150,
  height = 40,
}) => {
  if (!data || data.length === 0) return null;

  // Проверка, растет ли график (последнее значение больше первого)
  const isGrowing = data[data.length - 1] > data[0];
  const lineColor = isGrowing ? '#4caf50' : '#f44336';

  // Нормализация данных, чтобы они уместились по высоте графика
  const minValue = Math.min(...data);
  const maxValue = Math.max(...data);

  // Вычисление масштаба данных по оси Y
  const scaleY = (value: number) => {
    const normalizedValue = (value - minValue) / (maxValue - minValue);
    return normalizedValue * height;
  };

  // Построение точек для линии
  const points = data.map((point, index) => ({
    x: (index / (data.length - 1)) * width, // Распределение точек по ширине
    y: scaleY(point),
  }));

  // Путь для линии
  const linePath = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ');

  return (
    <View style={[styles.container, { width }]}>
      <Svg width={width} height={height}>
        <Path d={linePath} stroke={lineColor} fill="none" strokeWidth={2} />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SparklineChart;
