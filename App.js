import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './App/Pages/Login';
import { AuthContext } from './App/Context/AuthContext';
import { useEffect, useState } from 'react';
import Home from './App/Pages/Home';
import Services from './App/Shared/Services';
import { NavigationContainer } from '@react-navigation/native';
import HomeNavigation from './App/Navigations/HomeNavigations';
import Register from './App/Pages/Register';
import LoginOp from './App/Pages/LoginOp';


export default 
function App() {
  
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
          <Login />
        )}
      </AuthContext.Provider>
      <Register />
      <LoginOp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8FC',
  },
});
