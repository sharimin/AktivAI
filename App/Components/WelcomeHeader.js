import { View, Text, Image, StyleSheet } from 'react-native-web';
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import DefaultProfilePicture from '../Assets/Image/aktivAI.png';
import axios from 'axios';

export default function Hello() {
  const { userData, setUserData } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userEmail = 'sharimin.rashid@gmail.com';
    axios
      .get('https://aktivai.web.app/GetUserProfile', {
        params: {
          email: userEmail,
        },
      })
      .then(response => {
        console.log('API response:', response.data);
        setUserData(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error retrieving user data:', error);
        setIsLoading(false);
      });
  }, [setUserData]);

  // Determine the greeting based on the time
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  let greeting;

  if (currentHour >= 0 && currentHour < 12) {
    greeting = 'Selamat Pagi';
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = 'Selamat Petang';
  } else {
    greeting = 'Selamat Malam';
  }

  // Extract the first name and profile picture from userData or use default values
  const firstName = userData?.data?.first_name || 'No First Name';
  const profilePicture = userData?.data?.profile_picture || DefaultProfilePicture;

  // Render user profile information
  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : userData ? (
        <View style={styles.userInfo}>
          <View style={styles.greetingContainer}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              HAI, {firstName}
            </Text>
            <Text style={styles.greeting}>{greeting}</Text>
          </View>
          <View style={styles.profilePictureContainer}>
            <Image
              source={{ uri: profilePicture }}
              style={styles.profilePicture}
            />
          </View>
        </View>
      ) : (
        <Text>No user data available</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  greetingContainer: {
    marginRight: 16, // Adjust the margin as needed
  },
  greeting: {
    fontSize: 16,
    color: 'gray',
  },
  profilePictureContainer: {
    borderWidth: 3, // Border width
    borderColor: '#888', // Border color
    borderRadius: 100, // Border radius for circular shape
    overflow: 'hidden', // Ensure the image is clipped within the border
  },
  profilePicture: {
    width: 70,
    height: 70,
  },
});
