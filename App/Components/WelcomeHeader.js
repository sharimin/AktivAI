import { View, Text, Image, StyleSheet } from 'react-native-web';
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import DefaultProfilePicture from '../Assets/Image/aktivAI.png';
import axios from 'axios';

export default function Hello() {
  const { userData, setUserData } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userEmail = 'xtest@gmail.com';
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

  // Extract the first name from userData or use a default value
  const firstName = userData?.data?.first_name || 'No First Name';

  // Render user profile information
  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : userData ? (
        <View>
          <Image
            source={{ uri: userData.data.picture || DefaultProfilePicture }}
            style={{ width: 70, height: 70, borderRadius: 100 }}
          />
          <Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>HAI,</Text>{' '}
            {firstName}
          </Text>
          <Text>{greeting}</Text>
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
});
