import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'react-native'

function PagesLayout() {
  return (
    <>
    <Stack>
        <Stack.Screen name='add-profile'  options={{headerShown: false}}  />
        <Stack.Screen name='admin'  options={{headerShown: false}}  />
        <Stack.Screen name='profile'  options={{headerShown: false}} />
        <Stack.Screen name='services'  options={{headerShown: false}} />
        <Stack.Screen name='logout' options={{headerShown: false}} />
        <Stack.Screen name='requested-services' options={{headerShown: false}}/>
    </Stack>
    <StatusBar backgroundColor="#161622"/>
    </>
  )
}

export default PagesLayout