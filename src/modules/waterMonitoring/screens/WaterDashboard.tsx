import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import TankView from '../../../components/TankView';
import StatItem from '../../../components/StatItem';
import ChartCard from '../../../components/ChartCard';
import InfoCard from '../../../components/InfoCard';
import { useAppTheme } from '../../../app/theme/ThemeProvider';
import { getWaterStatus, WaterStatus } from '../api';

const WaterDashboard: React.FC = () => {
  const theme = useAppTheme();
  const [state, setState] = useState<WaterStatus | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = async () => {
    setRefreshing(true);
    const status = await getWaterStatus();
    setState(status);
    setRefreshing(false);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 20, gap: 16 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={load} />}
    >
      <LinearGradient
        colors={[...theme.gradients.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <Text style={styles.heroTitle}>Water Monitoring</Text>
        <Text style={styles.heroSubtitle}>Premium smart tank visibility</Text>
        {state && <TankView percentage={state.waterLevel} volumeLiters={state.volumeLiters} />}
      </LinearGradient>

      {state && (
        <View style={styles.row}>
          <InfoCard title="Volume" value={`${state.volumeLiters} L`} style={styles.flex} />
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
  );
};

const styles = StyleSheet.create({
  hero: {
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  heroTitle: { color: '#fff', fontSize: 22, fontWeight: '800' },
  heroSubtitle: { color: '#dceafe', marginBottom: 8 },
  row: { flexDirection: 'row', gap: 12 },
  flex: { flex: 1 },
  statGrid: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
});

export default WaterDashboard;

