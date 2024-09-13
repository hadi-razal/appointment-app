import {  DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { NativeWindStyleSheet } from 'nativewind';

// Prevent auto-hiding the splash screen
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Load custom font
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Set NativeWind output
  NativeWindStyleSheet.setOutput({
    default: "native",
  });

  // Hide SplashScreen after fonts are loaded
  useEffect(() => {
    async function hideSplashScreen() {
      if (fontsLoaded) {
        try {
          await SplashScreen.hideAsync();
        } catch (e) {
          console.log("Error hiding splash screen", e);
        }
      }
    }

    hideSplashScreen();
  }, [fontsLoaded]);

  // If fonts are not loaded, return null to avoid rendering issues
  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
