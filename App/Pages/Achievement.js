import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Achievement = ({ navigation }) => {
  const navigateToProfile = () => {
    navigation.navigate('Profile'); // Replace 'Profile' with the actual screen name of your profile screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.congratsText}>Congratulations!</Text>
      <Text style={styles.messageText}>You have earned your first NFT.</Text>
      <TouchableOpacity onPress={navigateToProfile} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back to Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  congratsText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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

export default Achievement;
