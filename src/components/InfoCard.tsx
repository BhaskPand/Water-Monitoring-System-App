import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useAppTheme } from '../app/theme/ThemeProvider';

type Props = {
  title: string;
  value?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
};

const InfoCard: React.FC<Props> = ({ title, value, children, style }) => {
  const { colors } = useAppTheme();
  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }, style]}>
      <Text style={[styles.title, { color: colors.textSecondary }]}>{title}</Text>
      {value && <Text style={[styles.value, { color: colors.textPrimary }]}>{value}</Text>}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    shadowColor: '#0F172A',
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  title: { fontSize: 13, fontWeight: '600', marginBottom: 6, letterSpacing: 0.3 },
  value: { fontSize: 24, fontWeight: '700', letterSpacing: -0.5 },
});

export default InfoCard;

