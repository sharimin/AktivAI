import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const Profile = () => {
  const [userData, setUserData] = useState(null); // State to store user data

  useEffect(() => {
    // Replace with the actual user's email
    const userEmail = 'sharimin.rashid@gmail.com';

    // Make the Axios GET request
    axios.get('https://aktivai.web.app/GetUserProfile', {
      params: {
        email: userEmail,
      },
    })
    .then(response => {
      // Handle successful response
      setUserData(response.data); // Assuming the API returns user data
    })
    .catch(error => {
      // Handle error
      console.error('Error retrieving user data:', error);
    });
  }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount

  // Render user profile information
  return (
    <View style={styles.container}>
      {/* Display user data */}
      {userData && (
        <>
          <Text style={styles.name}>{`${userData.firstName} ${userData.lastName}`}</Text>
          <Text style={styles.profession}>{userData.profession}</Text>
          <Text style={styles.location}>{`${userData.city}, ${userData.state}`}</Text>
          <Text style={styles.bio}>{userData.bio}</Text>
        </>
      )}
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
});

export default Profile;
