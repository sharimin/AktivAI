  import React, { useState, useEffect, useContext } from 'react';
  import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
  import { useNavigation, useRoute } from '@react-navigation/native';
  import axios from 'axios'; // Don't forget to import axios
  import Colors from '../Shared/Colors';
  import WelcomeHeader from '../Components/WelcomeHeader';
  import Clock from './Clock';
  import DateComponent from './DateComponent';
  import Logout from './Logout';
  import { UserContext } from '../Context/UserContext';

  const Home = () => {
    const { userData } = useContext(UserContext);
    const [userFirstName, setUserFirstName] = useState(userData.firstName);
 
    const navigation = useNavigation();
  
    useEffect(() => {
      if (userData) {
        setUserFirstName(userData.firstName);
      }
    }, [userData]);
  
    const determineGreeting = () => {
      const currentHour = new Date().getHours();
      if (currentHour >= 0 && currentHour < 12) {
        return 'Selamat Pagi';
      } else if (currentHour >= 12 && currentHour < 18) {
        return 'Selamat Petang';
      } else {
        return 'Selamat Malam';
      }
    };
  
    const greeting = determineGreeting();
  
    const navigateToScreen = (screenName) => {
      navigation.navigate(screenName);
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.greeting}>HAI, {userFirstName}</Text>
          <Text style={styles.greeting}>{greeting}</Text>
  
          <View style={styles.buttonGroupContainer}>
            <TouchableOpacity
              style={[styles.buttonWrapper, styles.buttonMargin]}
              onPress={() => navigateToScreen('Agenda')}
            >
              <View style={styles.roundedButton}>
                <Text style={styles.buttonLabel}>Agenda</Text>
              </View>
              <Text style={styles.buttonText}>Agenda</Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={[styles.buttonWrapper, styles.buttonMargin]}
              onPress={() => navigateToScreen('GameScreen')}
            >
              <View style={styles.roundedButton}>
                <Text style={styles.buttonLabel}>Aktiv World</Text>
              </View>
              <Text style={styles.buttonText}>Aktiv World</Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={() => navigateToScreen('Profile', { userEmail: userData.email })}
            >
              <View style={styles.roundedButton}>
                <Text style={styles.buttonLabel}>Profile</Text>
              </View>
              <Text style={styles.buttonText}>Profile</Text>
            </TouchableOpacity>
          </View>
  
          <Clock />
          <DateComponent />
          <TouchableOpacity
            style={styles.scanButtonContainer}
            onPress={() => navigateToScreen('Scanner')}
          >
            <Image
              source={require('../Assets/Image/daftar_scan.png')}
              style={styles.buttonImage}
            />
          </TouchableOpacity>
          <Logout />
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
    },
    scanButtonContainer: {
      marginTop: 20,
      width: 150,
      height: 150,
      borderRadius: 75,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      backgroundColor: 'transparent',
    },
    buttonImage: {
      width: '100%',
      height: '100%',
    },
    roundedButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      backgroundColor: Colors.primary,
    },
    buttonText: {
      color: Colors.black,
      fontSize: 12,
      fontWeight: 'normal',
    },
    buttonGroupContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    buttonWrapper: {
      alignItems: 'center',
    },
    buttonLabel: {
      fontSize: 12,
      fontWeight: 'normal',
    },
    buttonMargin: {
      marginHorizontal: 15,
    },
    backButton: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
    },
  });

  export default Home;
