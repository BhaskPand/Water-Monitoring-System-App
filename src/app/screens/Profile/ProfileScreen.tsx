import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import InfoCard from '../../../components/InfoCard';
import { useAuthStore } from '../../store/useAuthStore';
import { useConfigStore } from '../../store/useConfigStore';
import { useAppTheme } from '../../theme/ThemeProvider';

const ProfileScreen: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { enabledModules } = useConfigStore();
  const theme = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <InfoCard title="User" value={user?.name ?? 'Guest'} />
      <InfoCard title="Enabled Services">
        <Text style={{ color: theme.colors.textPrimary, fontWeight: '600' }}>
          {enabledModules.join(', ') || 'None'}
        </Text>
      </InfoCard>
      <InfoCard title="Theme">
        <View style={styles.row}>
          <Text style={{ color: theme.colors.textPrimary, fontWeight: '600' }}>
            {theme.mode === 'dark' ? 'Dark' : 'Light'}
          </Text>
          <Switch
            value={theme.mode === 'dark'}
            onValueChange={theme.toggle}
            trackColor={{ true: theme.colors.accent }}
          />
        </View>
      </InfoCard>
      <Text style={[styles.logout, { color: theme.colors.warning }]} onPress={logout}>
        Logout
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 16 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  logout: { fontWeight: '700', marginTop: 8 },
});

export default ProfileScreen;

