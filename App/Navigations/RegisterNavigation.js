import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import Register from '../Pages/MaklumatProfil';


const Stack = createStackNavigator();
export default function RegisterNavigation() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  )
}