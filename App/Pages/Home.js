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

        {/* Button Group: Agenda, Pencapaian, Profil */}
        <View style={styles.buttonGroupContainer}>
          {/* Rounded Button: Agenda */}
          <View style={styles.buttonWrapper}>
              <TouchableOpacity style={styles.roundedButton} onPress={navigateToAgenda}>
            {/* Rounded Button: Agenda */}
            
          </TouchableOpacity>
          <Text style={styles.buttonLabel}>Agenda</Text>
          </View>
          
          {/* Rounded Button: Pencapaian */}
          <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.roundedButton} onPress={navigateToAchievement}>
        {/* Rounded Button: Achievement */}
        
      </TouchableOpacity>
      <Text style={styles.buttonLabel}>Achievement</Text>
          </View>
          
          {/* Rounded Button: Profil */}
          <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.roundedButton} onPress={navigateToProfile}>
        {/* Rounded Button: Agenda */}
        
      </TouchableOpacity>
      <Text style={styles.buttonLabel}>Profile</Text>
          </View>
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
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row', // Stack buttons horizontally
    justifyContent: 'space-between', // Space evenly
    marginTop: 20,
    width: '100%', // Make the container full width
  },
  buttonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonGroupContainer: {
    flexDirection: 'column', // Stack buttons vertically
    alignItems: 'center', // Center horizontally
    marginTop: 20,
  },
  buttonWrapper: {
    alignItems: 'center', // Center horizontally
    marginVertical: 10,
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: 'light',
  },


});


export default Home;