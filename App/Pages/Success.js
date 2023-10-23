import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Colors from '../Shared/Colors';

const Success = ({ navigation }) => {
  const navigateToProfile = () => {
    navigation.navigate('Profile'); // Navigate to the 'Profile' screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tahniah!</Text>
      <Text style={styles.message}>
        Anda telah berjaya mendaftar akaun AKTIVAI.
      </Text>
      <Button title="View Profile" onPress={navigateToProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 16,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Success;
