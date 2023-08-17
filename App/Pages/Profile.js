import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import DefaultProfilePicture from '../Assets/Image/aktivAI.png';
import { useRoute } from '@react-navigation/native';
import Clock from './Clock';
import DateComponent from './DateComponent';
const Profile = ({ navigation }) => {

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

  const route = useRoute(); // Add this line at the beginning of the component
  
  const navigateToHome = () => {
    navigation.navigate('Home'); // Navigate to the 'Home' screen
  };
  const navigateToScan = () => {
    navigation.navigate('HtmlScanner'); // Navigate to the 'Home' screen
  };
  const [userData, setUserData] = useState(null);
  const [showClockAndDate, setShowClockAndDate] = useState(false); // New state

  useEffect(() => {
    if (route.params && route.params.userEmail) {
      const userEmail = route.params.userEmail || '';  
  
      axios
        .get('https://aktivai.web.app/GetUserProfile', {
          params: {
            email: userEmail,
          },
        })
        .then((response) => {
          console.log('API response:', response.data);
  
          // Check if the response has the expected structure
          if (response.data.success && response.data.data) {
            setUserData(response.data.data);
          } else {
            console.warn('API response does not have the expected structure');
          }
        })
        .catch((error) => {
          console.error('Error retrieving user data:', error);
        });
    }
  }, [route.params]);

  console.log('userData:', userData);
  const toggleClockAndDate = () => {
    setShowClockAndDate(prevState => !prevState);
  };

  return (
    <View style={styles.container}>
      {userData ? (
        <>
          <View style={styles.profilePictureContainer}>
            <Image
              source={{ uri: userData.profile_picture || DefaultProfilePicture }}
              style={styles.profilePicture}
            />
          </View>
          <Text style={styles.greeting}>{greeting}</Text>
          <Text style={styles.name}>{`${userData.first_name} ${userData.last_name}`}</Text>
          <Text style={styles.profession}>{userData.profession}</Text>
          <Text style={styles.location}>{`${userData.city}, ${userData.states}`}</Text>
          <Text style={styles.bio}>{userData.bio}</Text>
        </>
      ) : (
        <Text style={styles.messageText}>Loading...</Text>
      )}
      {showClockAndDate && (
        <>
          <Clock />
          <DateComponent />
        </>
      )}
        <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={navigateToHome} style={[styles.backButton, styles.buttonMargin]}>
        <Text style={styles.backButtonText}>Home</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={navigateToScan} style={[styles.backButton, styles.buttonMargin]}>
        <Text style={styles.backButtonText}>Scan</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={toggleClockAndDate} style={styles.backButton}>
        <Text style={styles.backButtonText}>Clock</Text>
      </TouchableOpacity>
    </View>

      
    </View>
  );
};

const styles = StyleSheet.create({
   container: {
    padding: 20,
    backgroundColor: '#f0f0f0',
  }, 
  profilePictureContainer: {
    width: 70,
    height: 70,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#888',
    overflow: 'hidden',
    marginBottom: 10,
  },
  profilePicture: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profession: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 8,
  },
  bio: {
    fontSize: 16,
  },
  messageText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row', // Align buttons horizontally
    justifyContent: 'center', // Center buttons horizontally
    marginTop: 20,
  },
  buttonMargin: {
    marginRight: 10, // Add spacing between buttons
  },
  /* container: {
    flex: 1, // Expand the container to take the entire screen
    padding: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'flex-end', // Align content at the bottom
  }, */
});

export default Profile;
