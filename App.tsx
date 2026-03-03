import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/store';
import RootNavigator from './src/navigation/RootNavigator';
import { useAppSelector } from './src/store/hooks';
import { useColorScheme } from './hooks/use-color-scheme';
import { themeColors } from './src/theme/colors';

function AppContent() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { checkingSession } = useAppSelector((state) => state.auth);

  const navTheme = isDark
    ? { ...DarkTheme, colors: { ...DarkTheme.colors, primary: themeColors.dark.primary } }
    : { ...DefaultTheme, colors: { ...DefaultTheme.colors, primary: themeColors.light.primary } };

  if (checkingSession) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={themeColors.light.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer theme={navTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
