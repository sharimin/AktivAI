import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Animated } from "react-native";
import DefaultProfilePicture from "../Assets/Image/aktivAI.png";
import Header from "../Assets/Image/Header.png";

const Introduction = ({ navigation }) => {
  const handleFirstRegister = () => {
    // Navigate to 'FirstRegister' screen
    navigation.navigate("FirstRegister");
  };

  const handleLogin = () => {
    // Navigate to 'Login' screen
    navigation.navigate("Login");
  };

  // Create an Animated.Value to control the opacity of the images
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start the fade-in animation when the component mounts
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();

    // Navigate to the login screen after a delay
    setTimeout(() => {
      navigation.navigate("Login");
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      {/* Use an Animated.Image and set its opacity to fadeAnim */}
      <Animated.Image source={Header} style={{ ...styles.headerstyle, opacity: fadeAnim }} />
      {/* Use an Animated.Image and set its opacity to fadeAnim */}
      <Animated.Image source={DefaultProfilePicture} style={{ ...styles.profilePicture, opacity: fadeAnim }} />
      {/* Use an Animated.Image and set its opacity to fadeAnim */}
      <Animated.Image source={Header} style={{ ...styles.headerstyle2, opacity: fadeAnim }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    margin: 20,
  },
  profilePicture: {
    width: 250, // Adjust the width of the image
    height: 250, // Adjust the height of the image
    marginBottom: 20,
  },
  headerstyle: {
    width: "100%",
    height: "20%", // Adjust the width of the image
    flex: 1, // Allow the image to grow and shrink
    
  },
  headerstyle2: {
    width: "100%",
    height: "20%", // Adjust the width of the image
    flex: 1, // Allow the image to grow and shrink
    transform: "scaleY(-1)",
  },
  buttonContainer: {
    flexDirection: "row", // Arrange buttons in a row
  },
  button: {
    backgroundColor: "blue",
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
