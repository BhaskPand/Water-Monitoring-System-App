import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '../app/theme/ThemeProvider';

type Props = {
  title: string;
  description: string;
  accent: string;
  onPress?: () => void;
  style?: ViewStyle;
};

const ModuleCard: React.FC<Props> = ({ title, description, accent, onPress, style }) => {
  const { colors } = useAppTheme();
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={style}>
      <LinearGradient
        colors={[accent, colors.card]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.card, { borderColor: colors.border }]}
      >
        <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
        <Text style={[styles.desc, { color: colors.textSecondary }]}>{description}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
  },
  title: { fontSize: 18, fontWeight: '700' },
  desc: { marginTop: 6, fontSize: 14, lineHeight: 18 },
});

export default ModuleCard;

