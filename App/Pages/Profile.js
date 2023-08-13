import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const Profile = ({ navigation }) => {
  const navigateToHome = () => {
    navigation.navigate('Home'); // Navigate to the 'Home' screen
  };
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userEmail = 'xtest@gmail.com';

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
          console.warn('API response does not have expected structure');
        }
      })
      .catch((error) => {
        console.error('Error retrieving user data:', error);
      });
  }, []);

  console.log('userData:', userData);


  return (
    <View style={styles.container}>
      {userData ? (
        <>
          <Text style={styles.name}>{`${userData.first_name} ${userData.last_name}`}</Text>
          <Text style={styles.profession}>{userData.profession}</Text>
          <Text style={styles.location}>{`${userData.city}, ${userData.states}`}</Text>
          <Text style={styles.bio}>{userData.bio}</Text>
        </>
      ) : (
        <Text style={styles.messageText}>Loading...</Text>
      )}
      <TouchableOpacity onPress={navigateToHome} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f0f0',
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
});

export default Profile;
