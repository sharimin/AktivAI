import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native-web';
import Colors from '../Shared/Colors';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { TouchableOpacity } from 'react-native-web';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registerStatus, setRegisterStatus] = useState('');

  const handleRegister = () => {
    
    axios.post("http://localhost:5000//register", {
        email: email,
        username: username,
        password: password,
    }).then((response) => {
        if(response.data.message){
            setRegisterStatus(response.data.message);
            console.log(response.data.message);
        }else{
            setRegisterStatus("ACCOUNT CREATED SUCCESSFULLY");
            console.log('ACCOUNT CREATED SUCCESSFULLY');
        }
    })
    console.log('Registering with:', email, username, password);
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
      <Button title="Register" onPress={handleRegister} />
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
});

export default Register;