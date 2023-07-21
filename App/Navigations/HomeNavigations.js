import React from 'react'
import Scanner from '../Screens/Scanner';
import Logout from '../Pages/Logout';
import Success from '../Pages/Success';
import { createStackNavigator } from '@react-navigation/stack';


import Home from '../Pages/Home';
//import Logout from '../Pages/Logout';


const Stack = createStackNavigator();
export default function HomeNavigation() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Scanner" component={Scanner} />
        <Stack.Screen name="Logout" component={Logout} />
        <Stack.Screen name="Success" component={Success} />
    </Stack.Navigator>
  )
}