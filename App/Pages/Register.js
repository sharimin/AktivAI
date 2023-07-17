import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native-web';
import Colors from '../Shared/Colors';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [ic, setIc] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [universityEmail, setUniversityEmail] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [registerStatus, setRegisterStatus] = useState('');

  const handleRegister = () => {
    if (!email || !username || !password || !gender || !phoneNumber) {
      setRegisterStatus('Please fill in all fields');
      return;
    }

    // // Add form validation for email
    // if (!email.includes('@')) {
    //   setRegisterStatus('Please enter a valid email address');
    //   return;
    // }

    // Add form validation for password
    if (password.length < 8) {
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
        username: username,
        password: password,
        profile_picture: profilePicture,
        ic: ic,
        gender: gender,
        phone_number: phoneNumber,
        university_email: universityEmail,
        wallet_address: walletAddress
    }).then((response) => {
        if(response.data.message){
            setRegisterStatus(response.data.message);
            console.log(response.data.message);
        }else{
            setRegisterStatus("ACCOUNT CREATED SUCCESSFULLY");
            setRegisterStatus("Thank you for choosing aktiv.io for your event management needs. We hope to see you around with us in the future at all of our upcoming events.");
            navigation.navigate('Success')
            console.log('ACCOUNT CREATED SUCCESSFULLY');
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
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <input type="file" onChange={handleChooseProfilePicture} />
      <TextInput
        style={styles.input}
        placeholder="IC/Passport"
        value={ic}
        onChangeText={setIc}
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
      <TextInput
        style={styles.input}
        placeholder="University Email"
        value={universityEmail}
        onChangeText={setUniversityEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Wallet Address"
        value={walletAddress}
        onChangeText={setWalletAddress}
      />
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
