import React from 'react';
import { View, Text, StyleSheet } from 'react-native-web';
import Colors from '../Shared/Colors';

const Success = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tahniah!</Text>
      <Text style={styles.message}>
        Anda telah berjaya mendaftar akaun AKTIVAI.
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
