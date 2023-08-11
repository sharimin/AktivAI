import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import DefaultProfilePicture from '../Assets/Image/aktivAI.png';

const Introduction = ({ navigation }) => {
  const handleFirstRegister = () => {
    // Navigate to 'FirstRegister' screen
    navigation.navigate('FirstRegister');
  };

  const handleLogin = () => {
    // Navigate to 'Login' screen
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Image source={DefaultProfilePicture} style={styles.profilePicture} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleFirstRegister}>
          <Text style={styles.buttonText}>Daftar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log Masuk</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profilePicture: {
    width: 250, // Adjust the width of the image
    height: 250, // Adjust the height of the image
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row', // Arrange buttons in a row
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10, // Add horizontal margin between buttons
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Introduction;
