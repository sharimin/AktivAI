import React from 'react';
import Scanner from '../Components/Scanner';
import Profile from '../Pages/Profile';
import Agenda from '../Pages/Agenda';
import Achievement from '../Pages/Achievement';
import Logout from '../Pages/Logout';
import Success from '../Pages/Success';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Pages/Home';

const Stack = createStackNavigator();

export default function HomeNavigation() {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Scanner" component={Scanner} />
      <Stack.Screen name="Logout" component={Logout} />
      <Stack.Screen name="Success" component={Success} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Agenda" component={Agenda} />
      <Stack.Screen name="Achievement" component={Achievement} />

    </Stack.Navigator>
  );
}
