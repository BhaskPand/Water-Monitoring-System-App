import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ModuleCard from '../../../components/ModuleCard';
import InfoCard from '../../../components/InfoCard';
import { useConfigStore } from '../../store/useConfigStore';
import { useModules } from '../../hooks/useModules';
import { useAppTheme } from '../../theme/ThemeProvider';

const HomeScreen: React.FC = () => {
  const { colors } = useAppTheme();
  const navigation = useNavigation<any>();
  const enabled = useConfigStore((s) => s.enabledModules);
  const modules = useModules(enabled);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ padding: 20, gap: 16 }}
    >
      <Text style={[styles.welcome, { color: colors.textPrimary }]}>Your Spaces</Text>
      {modules.length === 0 && (
        <InfoCard title="No modules enabled" value="Contact KLS to activate services" />
      )}
      {modules.map((module) => (
        <ModuleCard
          key={module.key}
          title={module.label}
          description={module.description}
          accent={module.accent}
          onPress={() => navigation.navigate(module.key)}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  welcome: { fontSize: 24, fontWeight: '800' },
});

export default HomeScreen;

