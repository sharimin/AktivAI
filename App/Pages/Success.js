import React from 'react';
import { View, Text, StyleSheet } from 'react-native-web';
import Colors from '../Shared/Colors';

const Success = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Created Successfully</Text>
      <Text style={styles.message}>
        Thank you for choosing aktiv.io for your event management needs. We hope to see you around with us in the future at all of our upcoming events.
      </Text>
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
