import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import {Stack} from 'expo-router'
import { StatusBar } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  useEffect(() => {
      SplashScreen.hideAsync();
  });

  return (
    <>
    <Stack>
      <Stack.Screen name='index' options={{headerShown: false}}/>
      <Stack.Screen name='(auth)' options={{headerShown: false}}/>
      <Stack.Screen name='(pages)' options={{headerShown: false}}/>
    </Stack>
    <StatusBar backgroundColor="#161622" />
    </>
  );
}
