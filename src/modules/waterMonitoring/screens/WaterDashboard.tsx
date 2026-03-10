import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import TankView from '../../../components/TankView';
import ChartCard from '../../../components/ChartCard';
import InfoCard from '../../../components/InfoCard';
import { useAppTheme } from '../../../app/theme/ThemeProvider';
import { getWaterStatus, WaterStatus } from '../api';

const WaterDashboard: React.FC = () => {
  const theme = useAppTheme();
  const [state, setState] = useState<WaterStatus | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const load = useCallback(async () => {
    try {
      setRefreshing(true);
      const status = await getWaterStatus();
      setState(status);
    } catch (error) {
      console.log('Water Dashboard Error:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20, gap: 16, maxWidth: 600, width: '100%', alignSelf: 'center' }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={load} />
        }
      >
      <LinearGradient
        colors={[...theme.gradients.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <Text style={styles.heroTitle}>Water Monitoring</Text>
        <Text style={styles.heroSubtitle}>
          Premium smart tank visibility
        </Text>

        {state && (
          <TankView
            percentage={state.waterLevel}
            volumeLiters={state.volumeLiters}
          />
        )}
      </LinearGradient>

      {state && (
        <View style={styles.row}>
          <InfoCard
            title="Volume"
            value={`${state.volumeLiters} L`}
            style={styles.flex}
          />
          <InfoCard
            title="Distance from bottom"
            value={`${state.distanceFromBottomCm} cm`}
            style={styles.flex}
          />
        </View>
      )}

      {state && (
        <ChartCard
          title="Last 24h usage"
          data={state.usage}
          labels={['2a', '4a', '6a', '8a', '10a', '12p', '2p']}
        />
      )}

      {state && (
        <InfoCard title="Last updated">
          <Text style={{ color: theme.colors.textSecondary }}>
            {new Date(state.lastUpdated).toLocaleTimeString()}
          </Text>
        </InfoCard>
      )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  hero: {
    borderRadius: 24,
    padding: 24,
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
  },
  heroTitle: {
    color: '#F8FAFC',
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    color: '#E0F2FE',
    marginBottom: 12,
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  flex: {
    flex: 1,
  },
});

export default WaterDashboard;
