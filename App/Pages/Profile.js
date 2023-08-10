import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Colors from '../Shared/Colors';
import axios from 'axios';

const DefaultProfilePicture = require('../Assets/Image/aktivAI.png'); // Import the default profile picture

const Profile = ({ route }) => {
  const {
    firstName,
    lastName,
    profilePicture, // Profile picture passed from Register screen
  } = route.params;
  const [userInfo, setUserInfo] = useState({
    bio: '',
    profession: '',
    city: '',
    states: '',
  });


  useEffect(() => {
    // Retrieve user profile information using axios GET request
    axios.get('https://aktivai.web.app/GetUserProfile', {
      params: {
        email: 'user@example.com', // Replace with the actual user's email
      },
    })
    .then(response => {
      const userData = response.data.data;
      setUserInfo(userData);
    })
    .catch(error => {
      console.error(error);
    });
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.profileInfo}>
        <View style={styles.profilePictureContainer}>
          <Image
            source={profilePicture ? { uri: profilePicture } : DefaultProfilePicture}
            style={styles.profilePicture}
          />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.fullName}>{`${firstName} ${lastName}`}</Text>
          <Text style={styles.bio}>{userInfo.bio}</Text>
          <Text style={styles.profession}>{userInfo.profession}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  profilePictureContainer: {
    borderColor: Colors.primary,
    borderWidth: 2,
    borderRadius: 75, // Half of width and height to create a circular shape
    overflow: 'hidden',
  },
  profilePicture: {
    width: 150,
    height: 150,
  },
  userInfo: {
    flex: 1,
    marginLeft: 20,
  },
  fullName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  bio: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 5,
  },
  profession: {
    fontSize: 18,
    color: 'black',
  },
  editButton: {
    backgroundColor: Colors.primary,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
});

export default Profile;
