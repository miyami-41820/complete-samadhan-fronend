import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'react-native'

function AuthLayout() {
  return (
    <>
    <Stack>
        <Stack.Screen name='number-verify' options={{headerShown: false}} />
        <Stack.Screen name='otp-verify'  options={{headerShown: false}}  />
    </Stack>
    <StatusBar backgroundColor="#161622"/>
    </>
  )
}

export default AuthLayout