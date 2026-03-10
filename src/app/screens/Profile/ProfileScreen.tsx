import React from 'react';
import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import InfoCard from '../../../components/InfoCard';
import { useAuthStore } from '../../store/useAuthStore';
import { useConfigStore } from '../../store/useConfigStore';
import { useAppTheme } from '../../theme/ThemeProvider';

const ProfileScreen: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { enabledModules } = useConfigStore();
  const theme = useAppTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.container, { paddingBottom: 40 }]}
      >
        <View style={styles.headerContainer}>
          <LinearGradient
            colors={[...theme.gradients.primary]}
            style={styles.avatarContainer}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.avatarText}>
              {(user?.name ?? 'Guest').charAt(0).toUpperCase()}
            </Text>
          </LinearGradient>
          
          <Text style={[styles.userName, { color: theme.colors.textPrimary }]}>
            {user?.name ?? 'Guest User'}
          </Text>
          <Text style={[styles.userRole, { color: theme.colors.textSecondary }]}>
            Administrator • {user?.name?.toLowerCase().replace(' ', '') || 'guest'}@watermonitor.app
          </Text>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>
          Account Details
        </Text>
        <InfoCard title="Profile Status" value="Active" style={styles.card} />
        <InfoCard title="Enabled Services" style={styles.card}>
          <Text style={[styles.cardContent, { color: theme.colors.textPrimary }]}>
            {enabledModules.join(', ') || 'None configuration'}
          </Text>
        </InfoCard>

        <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>
          App Preferences
        </Text>
        <InfoCard title="Appearance" style={styles.card}>
          <View style={styles.row}>
            <Text style={[styles.cardContent, { color: theme.colors.textPrimary }]}>
              {theme.mode === 'dark' ? 'Dark Mode' : 'Light Mode'}
            </Text>
            <Switch
              value={theme.mode === 'dark'}
              onValueChange={theme.toggle}
              trackColor={{ true: theme.colors.accent, false: theme.colors.border }}
              thumbColor={theme.colors.card}
            />
          </View>
        </InfoCard>
        
        <InfoCard title="Notifications" style={styles.card}>
          <View style={styles.row}>
            <Text style={[styles.cardContent, { color: theme.colors.textPrimary }]}>
              Push Alerts
            </Text>
            <Switch
              value={true}
              onValueChange={() => {}}
              trackColor={{ true: theme.colors.accent, false: theme.colors.border }}
              thumbColor={theme.colors.card}
            />
          </View>
        </InfoCard>

        <View style={styles.logoutWrapper}>
          <Text style={[styles.logout, { color: theme.colors.warning }]} onPress={logout}>
            Sign Out
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    padding: 24, 
    gap: 16, 
    maxWidth: 600, 
    width: '100%', 
    alignSelf: 'center' 
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 12,
  },
  avatarContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#0F172A',
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '800',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
    marginTop: 8,
    marginBottom: 4,
  },
  card: {
    marginBottom: 2,
  },
  cardContent: {
    fontWeight: '600',
    fontSize: 15,
  },
  row: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    marginTop: 4,
  },
  logoutWrapper: {
    marginTop: 24,
    alignItems: 'center',
  },
  logout: { 
    fontWeight: '700', 
    fontSize: 16, 
    paddingVertical: 12, 
    paddingHorizontal: 24,
  },
});

export default ProfileScreen;

