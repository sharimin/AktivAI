import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import Register from '../Pages/Register';


const Stack = createStackNavigator();
export default function SuccessNavigation() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Success" component={Success} />
    </Stack.Navigator>
  )
}