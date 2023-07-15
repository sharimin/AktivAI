import { View, Button, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../Context/AuthContext';
import Services from '../Shared/Services';
import Colors from '../Shared/Colors';

const Logout = () => {
    const { handleLogout } = useContext(AuthContext);
  
    const logout = () => {
      handleLogout();
    };
  
    return (
      <View>
        <Button title="Logout" onPress={logout} />
      </View>
    );
  };
  
  export default Logout;