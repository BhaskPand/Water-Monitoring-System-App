import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient as SvgGradient, Stop, Rect, Polygon } from 'react-native-svg';
import { useAppTheme } from '../app/theme/ThemeProvider';
import { getWaterStatus } from '../modules/waterMonitoring/api';

type Props = {
  percentage: number;
  volumeLiters: number;
};

const TankView: React.FC<Props> = ({ percentage: initialPercentage, volumeLiters: initialVolume }) => {
  const { gradients, colors } = useAppTheme();
  
  const [percentage, setPercentage] = useState(initialPercentage);
  const [volumeLiters, setVolumeLiters] = useState(initialVolume);

  useEffect(() => {
    setPercentage(initialPercentage);
    setVolumeLiters(initialVolume);
  }, [initialPercentage, initialVolume]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const status = await getWaterStatus();
        setPercentage(status.waterLevel);
        setVolumeLiters(status.volumeLiters);
      } catch (err) {
        console.log('Tank fetch error:', err);
      }
    }, 5000); // Only the tank refreshes every 5 seconds
    
    return () => clearInterval(interval);
  }, []);
  const clamped = Math.min(100, Math.max(0, percentage));
  const fillHeight = (clamped / 100) * 160;

  return (
    <View style={styles.container}>
      <Svg height="200" width="220" viewBox="0 0 220 200">
        <Defs>
          <SvgGradient id="tankGradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={gradients.primary[0]} stopOpacity="0.85" />
            <Stop offset="100%" stopColor={gradients.primary[1]} stopOpacity="0.95" />
          </SvgGradient>
          <SvgGradient id="glass" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor={colors.textPrimary} stopOpacity="0.08" />
            <Stop offset="100%" stopColor={colors.textPrimary} stopOpacity="0.01" />
          </SvgGradient>
        </Defs>
        <Polygon points="30,20 190,20 210,60 10,60" fill={colors.textPrimary} opacity="0.05" />
        <Rect
          x="10"
          y={200 - fillHeight}
          width="200"
          height={fillHeight}
          fill="url(#tankGradient)"
          rx="12"
        />
        <Rect x="10" y="20" width="200" height="180" stroke={colors.border} strokeWidth="2" rx="16" fill="url(#glass)" />
      </Svg>
      <Text style={[styles.value, { color: colors.textPrimary }]}>{clamped}%</Text>
      <Text style={[styles.label, { color: colors.textSecondary }]}>{volumeLiters} L stored</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', paddingVertical: 8 },
  value: { fontSize: 28, fontWeight: '700', marginTop: -12, letterSpacing: -0.5 },
  label: { fontSize: 13, fontWeight: '500', letterSpacing: 0.2, marginTop: 4 },
});

export default TankView;

