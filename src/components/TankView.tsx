import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient as SvgGradient, Stop, Rect, Polygon } from 'react-native-svg';
import { useAppTheme } from '../app/theme/ThemeProvider';

type Props = {
  percentage: number;
  volumeLiters: number;
};

const TankView: React.FC<Props> = ({ percentage, volumeLiters }) => {
  const { gradients, colors } = useAppTheme();
  const clamped = Math.min(100, Math.max(0, percentage));
  const fillHeight = (clamped / 100) * 160;

  return (
    <View style={styles.container}>
      <Svg height="200" width="220" viewBox="0 0 220 200">
        <Defs>
          <SvgGradient id="tankGradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={gradients.primary[0]} stopOpacity="0.9" />
            <Stop offset="100%" stopColor={gradients.primary[1]} stopOpacity="0.9" />
          </SvgGradient>
          <SvgGradient id="glass" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
            <Stop offset="100%" stopColor="#ffffff" stopOpacity="0.02" />
          </SvgGradient>
        </Defs>
        <Polygon points="30,20 190,20 210,60 10,60" fill="#0B132B" opacity="0.25" />
        <Rect
          x="10"
          y={200 - fillHeight}
          width="200"
          height={fillHeight}
          fill="url(#tankGradient)"
          rx="12"
        />
        <Rect x="10" y="20" width="200" height="180" stroke={colors.border} strokeWidth="3" rx="16" fill="url(#glass)" />
      </Svg>
      <Text style={[styles.value, { color: colors.textPrimary }]}>{clamped}%</Text>
      <Text style={[styles.label, { color: colors.textSecondary }]}>{volumeLiters} L stored</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', paddingVertical: 8 },
  value: { fontSize: 24, fontWeight: '800', marginTop: -12 },
  label: { fontSize: 14, fontWeight: '600' },
});

export default TankView;

