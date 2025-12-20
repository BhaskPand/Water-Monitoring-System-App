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
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  title: { fontSize: 14, fontWeight: '600', marginBottom: 6 },
  value: { fontSize: 20, fontWeight: '700' },
});

export default InfoCard;

