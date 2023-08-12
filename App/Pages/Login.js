import { View, Text, Image, StyleSheet, TextInput, Button } from 'react-native';
import React, { useContext, useState } from 'react';
import Colors from '../Shared/Colors';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { TouchableOpacity } from 'react-native-web';
import { AuthContext } from '../Context/AuthContext';
import Services from '../Shared/Services';
import MaklumatProfil from './MaklumatProfil';
import axios from 'axios';
 
const Login = ({ navigation }) => {
  const navigateToHome = () => {
    navigation.navigate('Home'); // Navigate to the 'Home' screen
  };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [registerMode, setRegisterMode] = useState(false);

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

  const handleLogin = async () => {
    if (!email || !password) {
      setLoginStatus('Please fill in all fields');
      return;
    }
  
    // Add form empty email
    if (!email) {
      setLoginStatus('Username cannot be empty');
      return;
    }
    // Add form empty password
    if (!password) {
      setLoginStatus('Password cannot be empty');
      return;
    }
  
    if (registerMode) {
      // Assuming you want to perform registration logic
      if (!isValidEmail(email)) {
        setLoginStatus('Please enter a valid email address.');
        return;
      }
  
      if (!isValidPassword(password)) {
        setLoginStatus('Please enter a valid password.');
        return;
      }
  
      // Add axios registration request here
      axios
        .post('https://aktivai.web.app/login', {
          email: email,
          password: password,
        })
        .then((response) => {
          if (response.data.success) {
            // Login was successful
            setLoginStatus('Login successful!'); // You can customize the success message
            // Set user data and perform necessary actions
            setUserData(response.data.user); // Assuming the response contains user data
            // Clear the email and password fields after successful login
            setEmail('');
            setPassword('');
            // Navigate to the Home screen or perform other actions
            navigation.navigate('Home');
            navigateToHome();
          } else {
            // Login failed
            setLoginStatus('Invalid email or password. Please try again.');
          }
        })
        .catch((error) => {
          // Handle errors here
          console.error('Error occurred:', error);
          setLoginStatus('An error occurred while logging in. Please try again later.');
        });
    }
  };

  return (
    <View>
      <Image source={require('./../Assets/Image/login.png')} />
      <View style={styles.container}>
      <Text style={styles.welcomeTextTop}>Selamat Datang</Text>
        <Text style={styles.welcomeTextBottom}>AktivAI</Text>
        
        <TextInput
          style={[styles.input, { alignSelf: 'center' }]}
          placeholder="Alamat Emel"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={[styles.input, { alignSelf: 'center' }]}
          placeholder="Kata Laluan"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        
        
        <Button title="Login" onPress={() => { handleLogin()  }} />
        <Text style={{ textAlign: 'center', marginTop: 80, fontSize: 20 }}>Atau</Text>
        <TouchableOpacity style={styles.button} onPress={() => promptAsync()}>
          <Ionicons name="logo-google" size={24} color="white" style={{ marginRight: 10 }} />
          <Text style={{ color: Colors.white }}>Log Masuk dengan Google</Text>
        </TouchableOpacity>
        <Text style={styles.registerText}>Belum ada Akaun? Tekan bawah</Text>
        <Button title="Register" onPress={() => navigation.navigate('FirstRegister')} />
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
  welcomeTextTop: {
    fontSize: 35,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 8,
  },

  welcomeTextBottom: {
    fontSize: 35,
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.darkYellow, // Set the color to dark yellow
    marginBottom: 40, // Adjust the margin as needed
  },
  buttonContainer: {
    marginTop: 20, // Adjust the margin as needed
    alignItems: 'center', // Center the button horizontally
  },
  registerText: {
    color: Colors.black,
    textAlign: 'center',
    marginBottom: 8, // Adjust the margin as needed
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
export default Login;