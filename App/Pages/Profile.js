
import axios from 'axios';
import DefaultProfilePicture from '../Assets/Image/aktivAI.png';
import { useRoute } from '@react-navigation/native';
import Clock from './Clock';
import DateComponent from './DateComponent';

import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../Context/UserContext';

const Profile = () => {
  const { userData } = useContext(UserContext);
  const [userFirstName, setUserFirstName] = useState(userData.firstName);
  const [email, setEmail] = useState(userData.email);
  const [bio, setBio] = useState(userData.bio);
  const [profilePicture, setProfilePicture] = useState(userData.profilePicture);
  const [userId, setUserid] = useState(userData.userId);
  const [dob, setDob] = useState(userData.dob);
  const [gender, setGender] = useState(userData.gender);
  const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber);
  const [city, setCity] = useState(userData.city);
  const [states, setStates] = useState(userData.states);
  const [lastName, setLastName] = useState(userData.lastName);
  const [walletAddress, setWalletAddress] = useState(userData.walletAddress);
  const [registerStatus, setRegisterStatus] = useState(userData.registerStatus);
  const [profession, setProfession] = useState(userData.profession);

  const navigation = useNavigation();

  useEffect(() => {
    if (userData) {
      console.log(userData);
      setUserFirstName(userData.firstName);
      setEmail(userData.email);
      setBio(userData.bio);
      setProfilePicture(userData.profilePicture);
      setUserid(userData.userId);
      setDob(userData.dob);
      setGender(userData.gender);
      setPhoneNumber(userData.phoneNumber);
      setCity(userData.city);
      setStates(userData.states);
      setLastName(userData.lastName);
      setWalletAddress(userData.walletAddress);
      setRegisterStatus(userData.registerStatus);
      setProfession(userData.profession);
    }
  }, [userData]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
        <View />
      </View>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: profilePicture }}
          style={styles.profilePicture}
        />
        <Text style={styles.name}>{userFirstName} {lastName}</Text>
        <Text style={styles.email}>{email}</Text>
        <Text style={styles.bio}>{bio}</Text>
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>123</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>456</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>789</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.editProfileButton}>
          <Text style={styles.editProfileButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    fontSize: 16,
    color: '#000',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  profileContainer: {
    alignItems: 'center',
    paddingVertical:32
  },
   profilePicture:{
     width:100,
     height:100,
     borderRadius:50,
     marginBottom:16
   },
   name:{
     fontSize:24,
     fontWeight:'bold'
   },
   email:{
     fontSize:16,
     color:'#777'
   },
   bio:{
     fontSize:16,
     color:'#555',
     marginTop:16
   },
   statsContainer:{
     flexDirection:'row',
     justifyContent:'space-between',
     width:'80%',
     marginTop:32
   },
   stat:{
     alignItems:'center'
   },
   statNumber:{
     fontSize:24,
     fontWeight:'bold'
   },
   statLabel:{
     fontSize:16,
     color:'#777'
   },
   editProfileButton:{
     backgroundColor:'#ff0',
     paddingHorizontal:32,
     paddingVertical:8,
     borderRadius:4,
     marginTop:32
   },
   editProfileButtonText:{
     fontSize:16,
     fontWeight:'bold'
   }
});

export default Profile;
