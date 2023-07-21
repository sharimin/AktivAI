import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native-web';
import Colors from '../Shared/Colors';
import axios from 'axios';
import { isValidEmail, isValidDateOfBirth } from './Validation';
import { NavigationContainer } from '@react-navigation/native';
import SuccessNavigation from '../Navigations/SuccessNavigation';
const Register = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [lastName, setLastName] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [registerStatus, setRegisterStatus] = useState('');
 
  const handleRegister = () => {
    if (!email || !firstName || !lastName || !dob || !password || !gender || !phoneNumber) {
      setRegisterStatus('Please fill in all fields');
      return;
    }
    if (!isValidEmail(email)) {
      setRegisterStatus('Please enter a valid email address');
      return;
    }
    if (!isValidDateOfBirth(dob)) {
      setRegisterStatus('Please enter a valid date of birth in MM/DD/YYYY format');
      return;
    }

    // // Add form validation for email
    //if (!email.includes('@')) {
    //   setRegisterStatus('Please enter a valid email address');
    //   return;
    // }

    // Add form validation for password
    if (password.length < 7) {
      setRegisterStatus('Password must be at least 8 characters long');
      return;
    }

    // Add form validation for phone number
    if (phoneNumber.length <= 9) {
      setRegisterStatus('Phone number must be more 9 digits long With with out +6');
      return;
    }

    axios.post("https://aktivai.web.app/register", {
        email: email,
        first_name: firstName,
        password: password,
        profile_picture: profilePicture,
        dob: dob,
        gender: gender,
        phone_number: phoneNumber,
        last_name: lastName,
        wallet_address: walletAddress
    }).then((response) => {
        if(response.data.message){
            setRegisterStatus(response.data.message);
            console.log(response.data.message);
        }else{
            setRegisterStatus("BERJAYA CIPTA AKAUN");
            setRegisterStatus("Terima kasih kerana menyertai AKTIVAI. Sila hubungi kami untuk sebarang pertanyaan. Teruskan bersama kami untuk Agenda yang akan datang");
            
            
            //navigation.navigate('Success')
            console.log("BERJAYA CIPTA AKAUN");
            console.log(response.data.message);
        }
    })
    
  };

  const handleChooseProfilePicture = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <input 
      style={styles.input}
      type="file" onChange={handleChooseProfilePicture} 
      />
      <TextInput
        style={styles.input}
        placeholder="Date of Birth (MM/DD/YYYY)"
        value={dob}
        onChangeText={setDob}
      />
      <View style={styles.radioButtonsContainer}>
        <Text>Gender:</Text>
        <TouchableOpacity onPress={() => setGender('Male')}>
          <Text style={[styles.radioButton, gender === 'Male' && styles.radioButtonSelected]}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setGender('Female')}>
          <Text style={[styles.radioButton, gender === 'Female' && styles.radioButtonSelected]}>Female</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      {/*
      <TextInput
        style={styles.input}
        placeholder="Wallet Address"
        value={walletAddress}
        onChangeText={setWalletAddress}
      />
      */}
      <Button title="Register" onPress={handleRegister} />
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
  radioButtonSelected: {
    backgroundColor: Colors.primary,
    color: 'white',
  },
});

export default Register;
