import { View, Text, Image, StyleSheet, TextInput } from 'react-native-web';
import React, { useContext, useState } from 'react';
import Colors from '../Shared/Colors';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { TouchableOpacity } from 'react-native-web';
import { AuthContext } from '../Context/AuthContext';
import Services from '../Shared/Services';

export default 
function Login() {

  WebBrowser.maybeCompleteAuthSession();
  const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState();
  const { userData, setUserData } = useContext(AuthContext);
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: '589953723916-gb6t3l6f3q2ga5vvl940unndjvqglevq.apps.googleusercontent.com',
    expoClientId: '589953723916-gb6t3l6f3q2ga5vvl940unndjvqglevq.apps.googleusercontent.com'
  });

  const getUserData = async () => {
    try {
      const resp = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${response.authentication.accessToken}` },
      });

      const user = await resp.json();
      console.log("user Details", user);
      setUserInfo(user);
      setUserData(user);
      await Services.setUserAuth(user);
    } catch (error) {
      // Add your own error handler here
    }
  }

  const handleLogin = () => {
    if (!email || !password) {
      setLoginStatus('Please fill in all fields');
      return;
    }

    // Add form empty email
    if (email == null) {
      setLoginStatus('Email cannot be empty');
      return;
    }
    // Add form empty password
    if (password == null) {
      setLoginStatus('Password cannot be empty');
      return;
    }
  }

  return (
    <View>
      <Image source={require('./../Assets/Image/login.png')} />
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome to AktivAI</Text>
        <Text style={{ textAlign: 'center', marginTop: 80, fontSize: 20 }}>Login/Signup</Text>
        <TouchableOpacity style={styles.button} onPress={() => promptAsync()}>
          <Ionicons name="logo-google" size={24} color="white" style={{ marginRight: 10 }} />
          <Text style={{ color: Colors.white }}>Sign In with Google</Text>
        </TouchableOpacity>
        
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    marginTop: -25,
    backgroundColor: '#fff',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 35,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 10,
    margin: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  radioButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  radioButton: {
    marginLeft: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 5,
  },
  radioButtonSelected: {
    backgroundColor: Colors.primary,
    color: 'white',
  },
});

// Additional code for the Register section
const registerStyles = StyleSheet.create({
  title: {
    // Your styles for the title component
  },
  input: {
    // Your styles for the input component
  }
});