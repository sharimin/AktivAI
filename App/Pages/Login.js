import { View, Text, Image, StyleSheet } from 'react-native-web'
import React, { useContext, useEffect, useState } from 'react'
import Colors from '../Shared/Colors'
import { Ionicons } from '@expo/vector-icons'; 
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { TouchableOpacity } from 'react-native-web';
import { AuthContext } from '../Context/AuthContext';
import Services from '../Shared/Services';
//export const isAndroid = () => Platform.OS === 'android';
export default function Login() {
    WebBrowser.maybeCompleteAuthSession();
    const [accessToken,setAccessToken]=useState();
    const [userInfo,setUserInfo]=useState();
    const {userData,setUserData}=useContext(AuthContext);
    const [request, response, promptAsync] = Google.useAuthRequest({
      webClientId: '669317642456-ro2uo5am9f5v32sh95nji40tuvu5r1e4.apps.googleusercontent.com',
         androidClientId: '669317642456-26d1p0s0uk9d79qlts6qlm608jh8ti6k.apps.googleusercontent.com',
         expoClientId:'669317642456-ro2uo5am9f5v32sh95nji40tuvu5r1e4.apps.googleusercontent.com'
        
      });

      useEffect(()=>{
        if(response?.type=='success')
        {
            setAccessToken(response.authentication.accessToken);
           
            getUserData();
        }
      },[response]);

      const getUserData=async()=>{
        try {
            const resp = await fetch(
              "https://www.googleapis.com/userinfo/v2/me",
              {
                headers: { Authorization: `Bearer ${response.authentication.accessToken}` },
              }
            );
      
            const user = await resp.json();
            console.log("user Details",user) 
            setUserInfo(user); 
            setUserData(user);
            await Services.setUserAuth(user);
          } catch (error) {
            // Add your own error handler here
          }
      }
      

  return (
    <View>
      <Image source={require('./../Assets/Image/login.png')}/>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome to AktivAI</Text>
        <Text style={{textAlign:'center',
        marginTop:80,fontSize:20}}>Login/Signup</Text>
            <TouchableOpacity style={styles.button} 
            onPress={()=>promptAsync()}>
            <Ionicons name="logo-google" size={24}
             color="white" style={{marginRight:10}} />
                <Text style={{color:Colors.white}}>Sign In with Google</Text>
            </TouchableOpacity>
      </View>
    </View>
  )
  }

const styles = StyleSheet.create({
    container:{
        paddingTop:40,
        marginTop:-25,
        backgroundColor:'#fff',
        borderTopRightRadius:30,
        borderTopLeftRadius:30
    },
    welcomeText:{
        fontSize:35,
        textAlign:'center',
        fontWeight:'bold'
    },
    button:{
        backgroundColor:Colors.primary,
        padding:10,
        margin:30,
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10
    }
})