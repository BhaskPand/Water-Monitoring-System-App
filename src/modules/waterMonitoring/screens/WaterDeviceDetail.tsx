import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch, Alert } from 'react-native';
import InfoCard from '../../../components/InfoCard';
import StatItem from '../../../components/StatItem';
import { useAppTheme } from '../../../app/theme/ThemeProvider';
import { getWaterStatus, toggleMotor } from '../api';

type Status = {
  motorOn: boolean;
  alerts: { type: string; severity: string; message: string }[];
  lastUpdated: string;
  waterLevel: number;
};

const WaterDeviceDetail: React.FC = () => {
  const { colors } = useAppTheme();
  const [status, setStatus] = useState<Status | null>(null);

  const load = async () => {
    const res = await getWaterStatus();
    setStatus({
      motorOn: res.motorOn,
      alerts: res.alerts ?? [],
      lastUpdated: res.lastUpdated,
      waterLevel: res.waterLevel,
    });
  };

  useEffect(() => {
    load();
  }, []);

  const handleToggle = async (value: boolean) => {
    setStatus((s) => (s ? { ...s, motorOn: value } : s));
    await toggleMotor(value);
    Alert.alert('Command sent', `Motor turned ${value ? 'ON' : 'OFF'}`);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <InfoCard title="Motor control">
        <View style={styles.row}>
          <StatItem label="Motor" value={status?.motorOn ? 'ON' : 'OFF'} />
          <Switch
            value={!!status?.motorOn}
            onValueChange={handleToggle}
            trackColor={{ true: colors.accent }}
          />
        </View>
      </InfoCard>
      <InfoCard title="Status">
        <StatItem label="Water level" value={`${status?.waterLevel ?? 0}%`} />
        <StatItem
          label="Last updated"
          value={status ? new Date(status.lastUpdated).toLocaleTimeString() : '--'}
          muted
        />
      </InfoCard>
      {status?.alerts?.length ? (
        <InfoCard title="Alerts">
          {status.alerts.map((alert) => (
            <Text key={alert.message} style={{ color: colors.warning, marginBottom: 6 }}>
              {alert.message}
            </Text>
          ))}
        </InfoCard>
      ) : (
        <InfoCard title="Alerts" value="No active alerts" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});

export default WaterDeviceDetail;

