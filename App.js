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
import Introduction from './App/Pages/Introduction';
import Scanner from './App/Components/Scanner';
import Achievement from './App/Pages/Achievement';
import Agenda from './App/Pages/Agenda';
import HtmlScanner from './App/Components/HtmlScanner';

function isMobileDevice() {
  const maxMobileWidth = 767; // maximum screen width for mobile devices
  const screenWidth = window.screen.width;
  return (
    /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) &&
   // !/Tablet|Pad|Mobile/i.test(navigator.userAgent) &&
    screenWidth <= maxMobileWidth
  );
}


export default function App() {
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

  // if (!isMobileDevice()) {
  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.text}>
  //         Please use a mobile device to access this app.
  //       </Text>
  //     </View>
  //   );
  // }

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
            
            <Stack.Screen name="Introduction" component={Introduction} options={{ headerShown: false }}/>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
            {/* <Stack.Screen name="Profile" component={Profile} /> */}
            
            <Stack.Screen name="Home">
            {props => <Profile {...props} />} 
            </Stack.Screen>  
                {/* <Stack.Screen name="Home" component={Home} options={{ headerShown: true }}/>  */}
              <Stack.Screen name="FirstRegister" component={FirstRegister}  />
              <Stack.Screen name="MaklumatProfil" component={MaklumatProfil} />
              <Stack.Screen name="Success" component={Success} />
              <Stack.Screen name="HtmlScanner" component={HtmlScanner} />
              <Stack.Screen name="Scanner" component={Scanner} />
              <Stack.Screen name="Achievement" component={Achievement} />
              <Stack.Screen name="Agenda" component={Agenda} />
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
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
  },
});
