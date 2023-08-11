import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Introduction = ({ navigation }) => {
  const handleExplore = () => {
    // Navigate to 'FirstRegister' screen
    navigation.navigate('FirstRegister');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeTitle}>Selamat Datang ke AktivAI</Text>
      <Text style={styles.title}>Tuntut NFT Anda</Text>
      <Text style={styles.subtitle}>Daftar sekarang untuk menuntut NFT unik anda dan sertai dunia yang menarik dalam koleksi digital!</Text>
      <TouchableOpacity style={styles.exploreButton} onPress={handleExplore}>
        <Text style={styles.buttonText}>Terokai</Text>
      </TouchableOpacity>
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
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  exploreButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Introduction;
