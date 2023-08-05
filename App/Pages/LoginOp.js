/* import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native-web';
import Colors from '../Shared/Colors';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { TouchableOpacity } from 'react-native-web';

const LoginOp = () => {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [loginStatus, setLoginStatus] = useState('');

const handleLogin = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:5000//login", {
        username: username,
        password: password,
    }).then((response) => {
        if(response.data.message){
            setLoginStatus(response.data.message);
        }else{
            setLoginStatus(response.data[0].email);
        }
    })
console.log('Logging in with:', username, password);
};

return (
<View style={styles.container}>
<Text style={styles.title}>Login</Text>
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
<Button title="Login" onPress={handleLogin} />
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

export default LoginOp; */