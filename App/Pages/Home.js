import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../Shared/Colors';
import { AuthContext } from '../Context/AuthContext';
import WelcomeHeader from '../Components/WelcomeHeader';
import Slider from '../Components/Slider';
import SearchBar from '../Components/SearchBar';
import Scanner from '../Screens/Scanner';
import Logout from './Logout';

export default function Home() {
  const { userData, setUserData } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <WelcomeHeader />
        <SearchBar />
        <Slider />
      </View>
      <TouchableOpacity style={styles.scanButtonContainer} onPress={() => navigation.navigate('Scanner')}>
        <Image
          source={require('../Assets/Image/scan_button_pattern.png')}
          style={styles.buttonImage}
        />
      </TouchableOpacity>
      <Logout />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between'
  },
  contentContainer: {
    flex: 1
  },
  scanButtonContainer: {

    width:150,
    height:150,
    borderRadius:75,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: 'transparent'
  },
  logoutButtonContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonImage: {
    width: '100%',
    height: '100%'
  }
});
