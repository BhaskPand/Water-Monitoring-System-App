import React, { createContext, useContext, useMemo, useState } from 'react';
import { Appearance } from 'react-native';
import { darkColors, gradients, lightColors } from './colors';

export type ThemeMode = 'light' | 'dark';

type Theme = {
  mode: ThemeMode;
  colors: typeof lightColors;
  gradients: typeof gradients;
  toggle: () => void;
};

const ThemeContext = createContext<Theme | null>(null);

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const systemPref = Appearance.getColorScheme();
  const [mode, setMode] = useState<ThemeMode>(systemPref === 'dark' ? 'dark' : 'light');

  const theme = useMemo<Theme>(
    () => ({
      mode,
      colors: mode === 'dark' ? darkColors : lightColors,
      gradients,
      toggle: () => setMode((prev) => (prev === 'dark' ? 'light' : 'dark')),
    }),
    [mode],
  );

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useAppTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useAppTheme must be used inside ThemeProvider');
  return ctx;
};

