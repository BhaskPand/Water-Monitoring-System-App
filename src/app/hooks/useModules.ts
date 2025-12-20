import { useMemo } from 'react';
import { ModuleKey } from '../store/useConfigStore';

export type ModuleDefinition = {
  key: ModuleKey;
  label: string;
  description: string;
  accent: string;
};

const MODULES: Record<ModuleKey, ModuleDefinition> = {
  waterMonitoring: {
    key: 'waterMonitoring',
    label: 'Water',
    description: 'Tank levels, usage, and pump control',
    accent: '#0EA5E9',
  },
  motorControl: {
    key: 'motorControl',
    label: 'Motor',
    description: 'Start/stop motors with safety checks',
    accent: '#22C55E',
  },
  energyMonitoring: {
    key: 'energyMonitoring',
    label: 'Energy',
    description: 'Energy meters and load analytics',
    accent: '#F59E0B',
  },
  lighting: {
    key: 'lighting',
    label: 'Lighting',
    description: 'Scenes, schedules, and occupancy',
    accent: '#A855F7',
  },
  security: {
    key: 'security',
    label: 'Security',
    description: 'Sensors, arming, and audit logs',
    accent: '#EF4444',
  },
  accessControl: {
    key: 'accessControl',
    label: 'Access',
    description: 'Doors, locks, and visitor flows',
    accent: '#38BDF8',
  },
};

export const useModules = (enabledModules: ModuleKey[]) => {
  return useMemo(
    () => enabledModules.map((key) => MODULES[key]).filter(Boolean),
    [enabledModules],
  );
};

