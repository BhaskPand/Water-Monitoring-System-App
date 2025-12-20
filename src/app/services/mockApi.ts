import { ModuleKey } from '../store/useConfigStore';

export const fetchUserConfig = async (): Promise<{ enabledModules: ModuleKey[] }> => {
  // Simulate backend-driven features; swap with real GET /api/user/config
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          enabledModules: ['waterMonitoring', 'motorControl'],
        }),
      250,
    ),
  );
};

export interface DeviceStatus {
  id: string;
  motorOn: boolean;
  waterLevel: number;
  lastUpdated: string;
  volumeLiters: number;
  distanceFromBottomCm: number;
  alerts: Array<{ type: string; severity: string; message: string }>;
}

export const fetchDeviceStatus = async (): Promise<DeviceStatus> => {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          id: 'device-1',
          motorOn: true,
          waterLevel: 68,
          lastUpdated: new Date().toISOString(),
          volumeLiters: 4200,
          distanceFromBottomCm: 42,
          alerts: [{ type: 'level', severity: 'warning', message: 'Tank below 30%' }],
        }),
      250,
    ),
  );
};

export const postDeviceCommand = async (command: { motorOn: boolean }) => {
  // mimic POST /api/device/command
  return new Promise((resolve) => setTimeout(() => resolve({ ok: true, ...command }), 180));
};

