import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '../app/theme/ThemeProvider';

type Props = {
  label: string;
  value: string;
  muted?: boolean;
};

const StatItem: React.FC<Props> = ({ label, value, muted }) => {
  const { colors } = useAppTheme();
  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
      <Text
        style={[
          styles.value,
          { color: muted ? colors.textSecondary : colors.textPrimary },
        ]}
      >
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: 6 },
  label: { fontSize: 13, fontWeight: '600' },
  value: { fontSize: 18, fontWeight: '700' },
});

export default StatItem;

