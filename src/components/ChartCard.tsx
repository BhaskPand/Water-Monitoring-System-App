import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useAppTheme } from '../app/theme/ThemeProvider';

type Props = {
  title: string;
  data: number[];
  labels: string[];
};

const ChartCard: React.FC<Props> = ({ title, data, labels }) => {
  const { colors, gradients } = useAppTheme();
  const width = Dimensions.get('window').width - 48;

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
      <LineChart
        data={{
          labels,
          datasets: [{ data }],
        }}
        width={width}
        height={180}
        withShadow
        chartConfig={{
          backgroundColor: colors.card,
          backgroundGradientFrom: colors.card,
          backgroundGradientTo: colors.card,
          decimalPlaces: 0,
          color: (opacity = 1) => gradients.primary[0] + Math.round(opacity * 255).toString(16).padStart(2, '0'),
          labelColor: () => colors.textSecondary,
          propsForDots: { r: '4', strokeWidth: '3', stroke: gradients.primary[1], fill: colors.card },
          propsForBackgroundLines: { stroke: colors.border, strokeDasharray: '4' },
        }}
        bezier
        style={{ marginVertical: 8, borderRadius: 12 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    shadowColor: '#0F172A',
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  title: { fontSize: 15, fontWeight: '600', letterSpacing: 0.3, marginBottom: 8 },
});

export default ChartCard;

