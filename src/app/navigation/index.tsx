import React, { useEffect } from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import HomeScreen from '../screens/Home/HomeScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import WaterDashboard from '../../modules/waterMonitoring/screens/WaterDashboard';
import WaterDeviceDetail from '../../modules/waterMonitoring/screens/WaterDeviceDetail';
import { useAuthStore } from '../store/useAuthStore';
import { useConfigStore } from '../store/useConfigStore';
import { useAppTheme } from '../theme/ThemeProvider';

type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const Placeholder = ({ label }: { label: string }) => (
  <Text style={{ padding: 16, fontSize: 16 }}>{label}</Text>
);

const moduleScreens: Record<string, React.ComponentType<any>> = {
  waterMonitoring: WaterDashboard,
  motorControl: WaterDeviceDetail,
  energyMonitoring: () => <Placeholder label="Energy monitoring coming soon" />,
  lighting: () => <Placeholder label="Lighting automation coming soon" />,
  security: () => <Placeholder label="Security controls coming soon" />,
  accessControl: () => <Placeholder label="Access control coming soon" />,
};

const AuthStack = () => {
  const Auth = createNativeStackNavigator();
  return (
    <Auth.Navigator screenOptions={{ headerShown: false }}>
      <Auth.Screen name="Login" component={LoginScreen} />
      <Auth.Screen name="Signup" component={SignupScreen} />
    </Auth.Navigator>
  );
};

const MainTabs = () => {
  const { enabledModules } = useConfigStore();
  const theme = useAppTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.textPrimary,
        tabBarStyle: { backgroundColor: theme.colors.card, borderTopColor: theme.colors.border },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      {enabledModules.map((key) => {
        const Component = moduleScreens[key];
        if (!Component) return null;
        return (
          <Tab.Screen
            key={key}
            name={key}
            component={Component}
            options={{ title: key.replace(/([A-Z])/g, ' $1') }}
          />
        );
      })}
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const RootNavigator = () => {
  const { isAuthenticated } = useAuthStore();
  const fetchConfig = useConfigStore((s) => s.fetchConfig);
  const theme = useAppTheme();

  useEffect(() => {
    if (isAuthenticated) {
      fetchConfig();
    }
  }, [isAuthenticated, fetchConfig]);

  return (
    <NavigationContainer theme={theme.mode === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthStack} />
        ) : (
          <Stack.Screen name="Main" component={MainTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;

