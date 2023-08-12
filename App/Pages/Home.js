import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native-web';
import { useNavigation } from '@react-navigation/native';
import Colors from '../Shared/Colors';
import { AuthContext } from '../Context/AuthContext';
import WelcomeHeader from '../Components/WelcomeHeader';
import Slider from '../Components/Slider';
import SearchBar from '../Components/SearchBar';
import Scanner from '../Screens/Scanner';
import Logout from './Logout';
import Clock from './Clock';
import DateComponent from './DateComponent';

const Home = () => {
  const navigation = useNavigation(); // Moved navigation hook to this component

  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };
  const navigateToAgenda = () => {
    navigation.navigate('Agenda');
  };
  const navigateToAchievement = () => {
    navigation.navigate('Achievement');
  };
  const { userData, setUserData } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
       <WelcomeHeader />

        {/* Button Group: Agenda, Achievement, Profile */}
        <View style={styles.buttonGroupContainer}>
          {/* Button: Agenda */}
          <TouchableOpacity style={[styles.buttonWrapper, styles.buttonMargin]} onPress={() => navigation.navigate('Agenda')}>
            <View style={styles.roundedButton}>
              <Text style={styles.buttonLabel}>Agenda</Text>
            </View>
            <Text style={styles.buttonText}>Agenda</Text>
          </TouchableOpacity>
          
          {/* Button: Achievement */}
          <TouchableOpacity style={[styles.buttonWrapper, styles.buttonMargin]} onPress={() => navigation.navigate('Achievement')}>
            <View style={styles.roundedButton}>
              <Text style={styles.buttonLabel}>Achievement</Text>
            </View>
            <Text style={styles.buttonText}>Achievement</Text>
          </TouchableOpacity>

          {/* Button: Profile */}
          <TouchableOpacity style={styles.buttonWrapper} onPress={() => navigation.navigate('Profile')}>
            <View style={styles.roundedButton}>
              <Text style={styles.buttonLabel}>Profile</Text>
            </View>
            <Text style={styles.buttonText}>Profile</Text>
          </TouchableOpacity>
        </View>

        <Clock/>
        <DateComponent/>
        <TouchableOpacity style={styles.scanButtonContainer} onPress={() => navigation.navigate('Scanner')}>
          <Image
            source={require('../Assets/Image/scan_button_pattern.png')}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
        <Logout />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center', // Center horizontally
  },
  scanButtonContainer: {
    marginTop: 20, // Add margin
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  logoutButtonContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonImage: {
    width: '100%',
    height: '100%',
  },
  roundedButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: Colors.primary,
  },
  buttonText: {
    color: Colors.black,
    fontSize: 12,
    fontWeight: 'light',
  },
  buttonGroupContainer: {
    flexDirection: 'row', // Stack buttons horizontally
    alignItems: 'center', // Center horizontally
    justifyContent: 'space-between', // Space evenly
    marginTop: 20,
  },
  buttonWrapper: {
    alignItems: 'center', // Center horizontally
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: 'light',
  },
  buttonMargin: {
    marginHorizontal: 15, // Add horizontal margin between buttons
  },
});

export default Home;
