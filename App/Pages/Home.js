import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native-web';
import { useNavigation } from '@react-navigation/native';
import Colors from '../Shared/Colors';
import { AuthContext } from '../Context/AuthContext';
import WelcomeHeader from '../Components/WelcomeHeader';
import Slider from '../Components/Slider';
import SearchBar from '../Components/SearchBar';
import Scanner from '../Components/Scanner';
import Logout from './Logout';
import Clock from './Clock';
import DateComponent from './DateComponent';

const Home = ({ route }) => {
  const { userEmail } = route.params;
  const determineGreeting = () => {
    const currentHour = new Date().getHours();
    let greeting;

    if (currentHour >= 0 && currentHour < 12) {
      greeting = 'Selamat Pagi';
    } else if (currentHour >= 12 && currentHour < 18) {
      greeting = 'Selamat Petang';
    } else {
      greeting = 'Selamat Malam';
    }

    return greeting;
  };

  const greeting = determineGreeting();

  const navigation = useNavigation(); // Moved navigation hook to this component

  const navigateToProfile = () => {
    if (userData && userData.email) {
      navigation.navigate('Profile', { userEmail: userData.email });
    } else {
      console.warn("userData is not available");
    }
  };
  
  const navigateToAgenda = () => {
    navigation.navigate('Agenda');
  };
  const navigateToAchievement = () => {
    navigation.navigate('Achievement');
  };
  const navigateToScan = () => {
    navigation.navigate('HtmlScanner'); // Navigate to the 'Home' screen
  };
  const { userData, setUserData } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
       {/* <WelcomeHeader /> */}
       <Text style={styles.greeting}>HAI, {userEmail}</Text>
       <Text style={styles.greeting}>{greeting}</Text>
       
        {/* Button Group: Agenda, Achievement, Profile */}
        <View style={styles.buttonGroupContainer}>
          {/* Button: Agenda */}
          <TouchableOpacity style={[styles.buttonWrapper, styles.buttonMargin]} onPress={navigateToAgenda}>
            <View style={styles.roundedButton}>
              <Text style={styles.buttonLabel}>Agenda</Text>
            </View>
            <Text style={styles.buttonText}>Agenda</Text>
          </TouchableOpacity>
          
          {/* Button: Achievement */}
          <TouchableOpacity style={[styles.buttonWrapper, styles.buttonMargin]} onPress={navigateToAchievement}>
            <View style={styles.roundedButton}>
              <Text style={styles.buttonLabel}>Achievement</Text>
            </View>
            <Text style={styles.buttonText}>Achievement</Text>
          </TouchableOpacity>

          {/* Button: Profile */}
          <TouchableOpacity style={styles.buttonWrapper} onPress={navigateToProfile}>
            <View style={styles.roundedButton}>
              <Text style={styles.buttonLabel}>Profile</Text>
            </View>
            <Text style={styles.buttonText}>Profile</Text>
          </TouchableOpacity>
        </View>

        <Clock/>
        <DateComponent/>
        <TouchableOpacity style={styles.scanButtonContainer} onPress={navigateToScan}>
          <Image
            source={require('../Assets/Image/daftar_scan.png')}
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
  backButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
});

export default Home;
