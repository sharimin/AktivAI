import { View, Button, Text, TouchableOpacity, StyleSheet } from 'react-native-web';
import React, { useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from '../Context/UserContext';
import Services from '../Shared/Services';
import Colors from '../Shared/Colors';

const Logout = () => {
    const { handleLogout } = useContext(UserContext);

    const handleLogoutNEW = async () => {
      // Clear the session token from the cookie
      document.cookie = 'sessionToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
      // Navigate to the login screen or perform other actions
      // ...
    };
  
    const logout = () => {
      handleLogoutNEW();
      handleLogout();
   
    };
  
    return (
      <View>
        <Button title="Logout" onPress={logout} />
      </View>
    );
  };
  
  export default Logout;