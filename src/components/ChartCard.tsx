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
          color: (opacity = 1) => `${colors.textPrimary}${Math.round(opacity * 255).toString(16)}`,
          labelColor: () => colors.textSecondary,
          propsForDots: { r: '4', strokeWidth: '2', stroke: gradients.primary[0] },
          propsForBackgroundLines: { stroke: colors.border },
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
    borderRadius: 16,
    borderWidth: 1,
  },
  title: { fontSize: 16, fontWeight: '700' },
});

export default ChartCard;

