import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import Colors from '../Shared/Colors';
import axios from 'axios';

const DefaultProfilePicture = require('../Assets/Image/aktivAI.png'); // Import the default profile picture

const Profile = ({ route }) => {
  const {
    email,
    firstName,
    lastName,
    dob,
    gender,
    phoneNumber,
    profilePicture, // Profile picture passed from Register screen
    walletAddress,
  } = route.params;

  // States to handle bio and profession fields
  const [bio, setBio] = useState('');
  const [profession, setProfession] = useState('');

  const handleProfileUpdate = () => {
    axios.post("https://aktivai.web.app/register", {
      bio: bio,
      profession: profession
    });
  };

  return (
    <View style={styles.container}>
      {/* Top Left: Display user's first name */}
      <View style={styles.firstNameContainer}>
        <Text style={styles.name}>{firstName}</Text>
      </View>

      {/* Top Left: Display user's last name */}
      <View style={styles.lastNameContainer}>
        <Text style={styles.name}>{lastName}</Text>
      </View>

      {/* Top Right: Display user's profile picture */}
      <View style={styles.profilePictureContainer}>
        <Image
          source={profilePicture ? { uri: profilePicture } : DefaultProfilePicture}
          style={styles.profilePicture}
        />
      </View>

      {/* Bio and Profession */}
      <View style={styles.bioContainer}>
        <Text style={styles.bioTitle}>Bio:</Text>
        <TextInput
          style={styles.bioInput}
          placeholder="Edit your bio..."
          value={bio}
          onChangeText={setBio}
          multiline
        />
        <Text style={styles.bioTitle}>Profession:</Text>
        <TextInput
          style={styles.bioInput}
          placeholder="Edit your profession..."
          value={profession}
          onChangeText={setProfession}
        />
      </View>

      <Button title="Save Profile" onPress={handleProfileUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstNameContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  lastNameContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  profilePictureContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
    borderColor: Colors.primary,
    borderWidth: 2,
    borderRadius: 50,
    overflow: 'hidden',
  },
  profilePicture: {
    width: 100,
    height: 100,
  },
  bioContainer: {
    marginTop: 150, // Adjust the margin as needed to position the bio and profession fields
    width: '80%',
  },
  bioTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bioInput: {
    height: 100,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
});

export default Profile;
