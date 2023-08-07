import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Platform } from 'react-native-web';
import Colors from '../Shared/Colors';
import axios from 'axios';
import { isValidEmail, isValidDateOfBirth, isValidPassword } from './Validation';
import { useNavigation } from '@react-navigation/native';
//import DatePicker from 'react-datepicker';
//import 'react-datepicker/dist/react-datepicker.css';
import DefaultProfilePicture from '../Assets/Image/aktivAI.png';


const FirstRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registerStatus, setRegisterStatus] = useState('');
  const navigation = useNavigation(); 


const handleConfirmPasswordChange = (text) => {
  setConfirmPassword(text);
};
  
 
const handleFirstRegister = () => {
  if (!email || !confirmPassword || !password) {
    setRegisterStatus('Sila lengkapkan semua medan');
    return;
  }
  if (!isValidEmail(email)) {
    setRegisterStatus('Sila masukkan alamat emel yang sah.');
    return;
  }

  // Add form validation for password
  if (password.length < 7) {
    setRegisterStatus('Password must be at least 8 characters long');
    return;
  }

  if (password !== confirmPassword) {
    setRegisterStatus('Passwords do not match');
    return;
  }

  axios
  .post('https://aktivai.web.app/register', {
    email: email,
    password: password,
  })
  .then((response) => {
    if (response.data.success) {
      // Registration was successful
      navigation.navigate('MaklumatProfil', {
        email,
        password,
      });
    } else {
      // An error occurred
      setRegisterStatus('An error occurred while registering. Please try again later.' + response.data.message);
    }
  })
  .catch((error) => {
    // Handle errors here
    console.error('Error occurred:', error);
    setRegisterStatus('An error occurred while registering. Please try again later.');
  });

};



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar AKTIVAI</Text>
      <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          <View style={styles.profilePictureFrame}>
            <img src={DefaultProfilePicture} alt="Default Profile Picture" style={styles.profilePicture} />
          </View>

      </View>
      <TextInput
        style={styles.input}
        placeholder="Alamat Emel"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Kata Laluan"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Sahkan Kata Laluan"
        secureTextEntry
        value={confirmPassword}
        onChangeText={handleConfirmPasswordChange}
      />
      
      <Button title="Register" onPress={handleFirstRegister} />
    {registerStatus ? <Text>{registerStatus}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
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
  radioLogo: {
    width: 20, 
    height: 20,
    marginRight: 8,
  }, 
  radioButtonSelected: {
    backgroundColor: Colors.primary,
    color: 'white',
  },
  'datepicker-input': {
    width: '80%',
    height: 40,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  chooseProfilePictureButton: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 5,
  },
  chooseProfilePictureButtonText: {
    color: Colors.primary,
    fontSize: 16,
  },
  
  profilePictureFrame: {
    border: '5px solid #ffffff', 
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', 
    borderRadius: '50%', 
    overflow: 'hidden', 
    marginBottom: 16,
    width: 150, // Adjust the width of the frame
    height: 150, // Adjust the height of the frame
  },
  profilePicture: {
    width: '100%',
    height: '100%',
    objectFit: 'cover', // Ensure the picture fills the frame without stretching
  }
});

export default FirstRegister;