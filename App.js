import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './App/Pages/Login';
import { AuthContext } from './App/Context/AuthContext';
import { useEffect, useState } from 'react';
import Home from './App/Pages/Home';
import Services from './App/Shared/Services';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeNavigation from './App/Navigations/HomeNavigations';
import MaklumatProfil from './App/Pages/MaklumatProfil';
import FirstRegister from './App/Pages/FirstRegister';
import Profile from './App/Pages/Profile';
import LoginOp from './App/Pages/LoginOp';
import Success from './App/Pages/Success';
import SuccessNavigation from './App/Navigations/SuccessNavigation';
import RegisterNavigation from './App/Navigations/RegisterNavigation';


export default 
function App() {
  const Stack = createStackNavigator();
  const [userData, setUserData] = useState();

  useEffect(() => {
    Services.getUserAuth().then((resp) => {
      console.log(resp);
      if (resp) {
        setUserData(resp);
      } else {
        setUserData(null);
      }
    });
  }, []);

  const handleLogout = () => {
    Services.Logout(); // Call the logout function from the Services module
    setUserData(null); // Reset the user data to null
  };

  return (
    <View style={styles.container}>
      <AuthContext.Provider value={{ userData, setUserData, handleLogout }}>
        {userData ? (
          <NavigationContainer>
            <HomeNavigation />
          </NavigationContainer>
        ) : (
          <NavigationContainer>
            <Stack.Navigator>
            <Stack.Screen name="FirstRegister" component={FirstRegister} options={{ headerShown: false }} />
            <Stack.Screen name="MaklumatProfil" component={MaklumatProfil} />
            <Stack.Screen name="Success" component={Success} />
            </Stack.Navigator>
          </NavigationContainer>
          
          /*
          <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                
              </Stack.Navigator>
          </NavigationContainer>
          */
         //<Register />
        )}
      </AuthContext.Provider>
      {/* <Register />
      <LoginOp /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8FC',
  },
});
