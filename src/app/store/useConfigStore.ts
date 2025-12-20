import { create } from 'zustand';
import { fetchUserConfig } from '../services/mockApi';

export type ModuleKey =
  | 'waterMonitoring'
  | 'motorControl'
  | 'energyMonitoring'
  | 'lighting'
  | 'security'
  | 'accessControl';

type ConfigState = {
  enabledModules: ModuleKey[];
  loading: boolean;
  lastUpdated?: string;
  fetchConfig: () => Promise<void>;
};

export const useConfigStore = create<ConfigState>((set) => ({
  enabledModules: [],
  loading: false,
  lastUpdated: undefined,
  fetchConfig: async () => {
    set({ loading: true });
    const config = await fetchUserConfig();
    set({
      enabledModules: config.enabledModules,
      lastUpdated: new Date().toISOString(),
      loading: false,
    });
  },
}));

