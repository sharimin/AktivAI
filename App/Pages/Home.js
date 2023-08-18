import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios'; // Don't forget to import axios
import Colors from '../Shared/Colors';
import WelcomeHeader from '../Components/WelcomeHeader';
import Clock from './Clock';
import DateComponent from './DateComponent';
import Logout from './Logout';

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [userFirstName, setUserFirstName] = useState('');
  const route = useRoute();
  const navigation = useNavigation();
  const userEmail = route.params ? route.params.userEmail : '';

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


  

  const navigateToAgenda = () => {
    navigation.navigate('Agenda');
  };
  
  const navigateToAchievement = () => {
    navigation.navigate('Achievement');
  };
  
  const navigateToScan = () => {
    navigation.navigate('HtmlScanner'); // Navigate to the 'HtmlScanner' screen
  };

  const [isLoading, setIsLoading] = useState(true);

  const handleProfileNavigation = () => {
    if (userData) {
      console.log('Home userData:', userData);
      navigation.navigate('Profile', { userEmail: userData.email });
    } else {
      console.warn('Home userData is not available');
    }
  };
  
  
  
  
  
  
  useEffect(() => {
    if (userEmail) {
      axios
        .get('https://aktivai.web.app/GetUserProfile', {
          params: {
            email: userEmail,
          },
        })
        .then((response) => {
          console.log('Home API response:', response.data);

          if (response.data.success && response.data.data) {
            setUserData(response.data.data);
            setUserFirstName(response.data.data.first_name);
          } else {
            console.warn('API response does not have the expected structure');
          }
        })
        .catch((error) => {
          console.error('Error retrieving user data:', error);
        });
    }
  }, [userEmail]);

  /* useEffect(() => {
    if (userData) {
      handleProfileNavigation(); // Call the function here when userData is updated
    }
  }, [userData]); */
  

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {/* <WelcomeHeader /> */}
        <Text style={styles.greeting}>HAI, {userFirstName}</Text>
        <Text style={styles.greeting}>{greeting}</Text>

        <View style={styles.buttonGroupContainer}>
          <TouchableOpacity style={[styles.buttonWrapper, styles.buttonMargin]} onPress={navigateToAgenda}>
            <View style={styles.roundedButton}>
              <Text style={styles.buttonLabel}>Agenda</Text>
            </View>
            <Text style={styles.buttonText}>Agenda</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.buttonWrapper, styles.buttonMargin]} onPress={navigateToAchievement}>
            <View style={styles.roundedButton}>
              <Text style={styles.buttonLabel}>Achievement</Text>
            </View>
            <Text style={styles.buttonText}>Achievement</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonWrapper} onPress={handleProfileNavigation}>
            <View style={styles.roundedButton}>
              <Text style={styles.buttonLabel}>Profile</Text>
            </View>
            <Text style={styles.buttonText}>Profile</Text>
          </TouchableOpacity>

        </View>

        <Clock />
        <DateComponent />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  scanButtonContainer: {
    marginTop: 20,
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  buttonImage: {
    width: '100%',
    height: '100%',
  },
  roundedButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: Colors.primary,
  },
  buttonText: {
    color: Colors.black,
    fontSize: 12,
    fontWeight: 'normal',
  },
  buttonGroupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buttonWrapper: {
    alignItems: 'center',
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: 'normal',
  },
  buttonMargin: {
    marginHorizontal: 15,
  },
  backButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
});

export default Home;
