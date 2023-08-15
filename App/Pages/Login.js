// import { View, Text, Image, StyleSheet, TextInput, Button } from 'react-native';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Platform,Image } from 'react-native-web';
import React, { useContext, useState } from 'react';
import Colors from '../Shared/Colors';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { AuthContext } from '../Context/AuthContext';
import Services from '../Shared/Services';
import MaklumatProfil from './MaklumatProfil';
import axios from 'axios';
import { isValidEmail, isValidDateOfBirth, isValidPassword } from './Validation';
import { useNavigation } from '@react-navigation/native';
import Vector from '../Assets/vectors/Vector.svg';
import Vector2 from '../Assets/vectors/Vector2.svg';
import logo5122 from '../Assets/Image/logo5122.png';
import User from '../Assets/vectors/User.svg';
import Lock from '../Assets/vectors/Lock.svg';
import VuesaxLinearEyeSlash from '../Assets/vectors/VuesaxLinearEyeSlash.svg';
import CommpanyIcon from '../Assets/vectors/CommpanyIcon.svg';
import theme from '../theme.ts';
 
const Login = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [registerMode, setRegisterMode] = useState(false);
  const [registerStatus, setRegisterStatus] = useState('');
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

  const NavigateFirstRegister = () => {
    // Navigate to 'FirstRegister' screen
    navigation.navigate("FirstRegister");
  };

  const navigateToHome = () => {
    navigation.navigate('Home'); // Navigate to the 'Home' screen
  };

  // Function to store the session token locally
const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('sessionToken', token);
  } catch (error) {
    // Handle error
  }
}

// Function to get the session token from local storage
const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('sessionToken');
    return token;
  } catch (error) {
    // Handle error
  }
}

// Function to store the user data locally
const storeUserData = async (userData) => {
  try {
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
  } catch (error) {
    // Handle error
  }
}

// Function to get the user data from local storage
const getUserDataFromEmail = async () => {
  try {
    const userData = await AsyncStorage.getItem('userData');
    return JSON.parse(userData);
  } catch (error) {
    // Handle error
  }
}

// Function to get the user data from the server using the session token
const getUserDataFromServer = async (sessionToken) => {
  try {
    // Make API call to get the user data using the session token
    const response = await fetch('https://aktivai.web.app/login', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionToken}`
      }
    });
    const userData = await response.json();
    return userData;
  } catch (error) {
    // Handle error
  }
}

  const handleLogin = async () => {
    if (!email || !password) {
      setRegisterStatus('Please fill in all fields');
      return;
    }
  
    // Add form empty email
    if (!email) {
      setRegisterStatus('Username cannot be empty');
      return;
    }
    // Add form empty password
    if (!password) {
      setRegisterStatus('Password cannot be empty');
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
    setRegisterStatus('Login successful!'); // You can customize the success message
    //const sessionToken = data.sessionToken;

    // Store the session token locally
   // await storeToken(sessionToken);

    // Get the user data using the session token
    //const userData = await getUserDataFromServer(sessionToken);

    // Store the user data locally
    //await storeUserData(userData);

    // Clear the email and password fields after successful login
    setEmail('');
    setPassword('');

    // Navigate to the Home screen or perform other actions
          navigateToHome();
    } else {
          // Login failed
          setRegisterStatus(response.data.message); // You can customize the error message
        }
        })
        .catch((error) => {
          // Handle errors here
          console.error('Error occurred:', error);
          setRegisterStatus('An error occurred while logging in. Please try again later.');
        });
    
  };

  return (
    <View style={styles.root}>
    <View style={styles.frame162509}>
      <View style={styles.group513845}>
        {/* <Vector />
        <Vector2 /> */}
       <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img src="https://github.com/Nikizzuan/TempSaveFIle/blob/main/Header.png?raw=true" style={{ width: '100%' }} />
      </div>
      </View>
    </View>
    <View style={styles.frame513825}>
    </View>
    <Image source={{uri: logo5122}} style={{width: 123, height: 123}} contentFit="cover"/>
    <View style={styles.maklumatProfilForm}>
      <Text style={styles.emel}>
        Emel
      </Text>
      <View style={styles.namaPertama}>
        {/* <User /> */}
        <div>
      <img src="https://raw.githubusercontent.com/Nikizzuan/TempSaveFIle/5e9cf5d256e7855d488bbbe6b210f7424d857cac/vectors/User.svg"/>
    </div>
        
        <TextInput
        style={styles.input}
        
        placeholder="ahmad@contoh.com"
        value={email}
        onChangeText={setEmail}
      />
      </View>
      <Text style={styles.kataLaluan}>
        Kata laluan
      </Text>
      <View style={styles.namaPertama2}>
        {/* <Lock /> */}
        <div>
      <img src="https://raw.githubusercontent.com/Nikizzuan/TempSaveFIle/5e9cf5d256e7855d488bbbe6b210f7424d857cac/vectors/Lock.svg"/>
    </div>
        <View style={styles.frame513845}>
        <TextInput
        style={styles.input}
        placeholder="********"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
          <View style={styles.eyeSlash}>
            {/* <VuesaxLinearEyeSlash /> */}
            
          </View>
        </View>
      </View>
   
     
    </View>
    <View  style={styles.namaTerakhir}>
    <TouchableOpacity
    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    onPress={handleLogin}>
    <Text style={styles.daftar}>Log Masuk</Text>
  </TouchableOpacity>
    </View>
    {registerStatus ? <Text>{registerStatus}</Text> : null}

    <Text style={styles.denganMenekanButangDaftarAndaBersetujuDenganTermaDanSyaratAktivAiSertaMengakuiDasarPrivasiMereka}>
    Belum ada Akaun? Tekan bawah
    </Text>
    <View  style={styles.namaTerakhir}>
    <TouchableOpacity
    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    onPress={NavigateFirstRegister}>
    <Text style={styles.daftar}>Daftar</Text>
  </TouchableOpacity>
  </View>
  </View>
  );
}
const emailInputStyle = {
  flex: 1,
  justifyContent: 'center', 
  alignItems: 'center',
  color: 'gray', // Set the text color to gray
};

const passwordInputStyle = {
  flex: 1,
  justifyContent: 'center', 
  alignItems: 'center',
  color: 'gray', // Set the text color to gray
};
const styles = StyleSheet.create({

  input:  {
    flex: 1,
     justifyContent: 'center', 
     alignItems: 'center'
  },

  root: {
    width: 375,
    paddingTop: 0,
    paddingBottom: 56,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
  },
  frame162509: {
    width: 375,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
    position: 'absolute',
    top: -12,
  },
  group513845: {
    width: 529,
    height: 121,
  },
  frame513825: {
    height: 93,
    paddingTop: 72,
    alignItems: 'center',
    gap: 12,
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  logo5122: {
    width: 123,
    height: 123,
  },
  emel: {
    color: theme.colors.black.$01,
    fontFamily: 'Avenir',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '130% /* 18.2px */',
  },
  user: {
    width: 24,
    height: 24,
  },
  masukkanEmel: {
    color: theme.colors.grayscale.light_text,
    fontFamily: 'Avenir',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '24px /* 171.429% */',
  },
  maklumatProfilForm: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 12,
    alignSelf: 'stretch',
    paddingVertical: 8,
    paddingHorizontal: 0,
  },
  namaPertama: {
    height: 51,
    alignItems: 'center',
    gap: 8,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: theme.colors.grayscale.gray_bg,
    borderStyle: 'solid',
    backgroundColor: theme.colors.grayscale.white,
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 50,
  },
  kataLaluan: {
    color: theme.colors.black.$01,
    fontFamily: 'Avenir',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '130% /* 18.2px */',
  },
  lock: {
    width: 24,
    height: 24,
  },
  $1691770592471: {
    color: theme.colors.grayscale.light_text,
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '160% /* 22.4px */',
  },
  vuesaxLinearEyeSlash: {
    width: 24,
    height: 24,
  },
  namaPertama2: {
    height: 51,
    alignItems: 'center',
    gap: 8,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: theme.colors.grayscale.gray_bg,
    borderStyle: 'solid',
    backgroundColor: theme.colors.grayscale.white,
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 50,
  },
  frame513845: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    flexDirection: 'row',
  },
  eyeSlash: {
    alignItems: 'flex-start',
    gap: 10,
    flexDirection: 'row',
  },
  sahkanKataLaluan: {
    color: theme.colors.black.$01,
    fontFamily: 'Avenir',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '130% /* 18.2px */',
  },
  lock2: {
    width: 24,
    height: 24,
  },
  $1691770592596: {
    color: theme.colors.grayscale.light_text,
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '160% /* 22.4px */',
  },
  vuesaxLinearEyeSlash2: {
    width: 24,
    height: 24,
  },
  namaPertama3: {
    height: 51,
    alignItems: 'center',
    gap: 8,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: theme.colors.grayscale.gray_bg,
    borderStyle: 'solid',
    backgroundColor: theme.colors.grayscale.white,
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 50,
  },
  frame5138452: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    flexDirection: 'row',
  },
  eyeSlash2: {
    alignItems: 'flex-start',
    gap: 10,
    flexDirection: 'row',
  },
  daftar: {
    color: '#FFF',
    fontFamily: 'Avenir',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '800',
    lineHeight: '24px /* 171.429% */',
  },
  namaTerakhir: {
    height: 51,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: theme.colors.grayscale.gray_bg,
    borderStyle: 'solid',
    backgroundColor: '#EFC52E',
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 50,
  },
  label: {
    color: theme.colors.black.$60,
    textAlign: 'center',
    fontFeatureSettings: '\'clig\' off, \'liga\' off',
    fontFamily: 'Avenir',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '24px /* 171.429% */',
    letterSpacing: 0.014,
  },
  frame513846: {
    alignItems: 'center',
    gap: 8,
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  commpanyIcon: {
    width: 24,
    height: 24,
  },
  daftarDenganGoogle: {
    color: theme.colors.black.$01,
    textAlign: 'center',
    fontFamily: 'Avenir',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '800',
    lineHeight: '130% /* 18.2px */',
  },
  buttonGoogle: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 15,
  },
  button: {
    paddingRight: 89,
    paddingLeft: 14,
    alignItems: 'center',
    gap: 52,
    borderWidth: 1.5,
    borderColor: '#F2F2F2',
    borderStyle: 'solid',
    flexDirection: 'row',
    paddingVertical: 12,
    borderRadius: 40,
  },
  denganMenekanButangDaftarAndaBersetujuDenganTermaDanSyaratAktivAiSertaMengakuiDasarPrivasiMereka: {
    width: 304,
    height: 63,
    color: theme.colors.additional.colors_light_text_1,
    textAlign: 'center',
    fontFamily: 'Avenir',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '800',
    lineHeight: 20,
  },
//   container: {
//     paddingTop: 40,
//     marginTop: -25,
//     backgroundColor: '#fff',
//     borderTopRightRadius: 30,
//     borderTopLeftRadius: 30
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   welcomeText: {
//     fontSize: 35,
//     textAlign: 'center',
//     fontWeight: 'bold'
//   },
//   button: {
//     backgroundColor: Colors.primary,
//     padding: 10,
//     margin: 30,
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 10
//   },
//   input: {
//     width: '80%',
//     height: 40,
//     borderColor: Colors.primary,
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     marginBottom: 12,
//   },
//   radioButtonsContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   radioButton: {
//     marginLeft: 8,
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//     borderColor: Colors.primary,
//     borderWidth: 1,
//     borderRadius: 5,
//   },
//   radioButtonSelected: {
//     backgroundColor: Colors.primary,
//     color: 'white',
//   },
//   welcomeTextTop: {
//     fontSize: 35,
//     textAlign: 'center',
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },

//   welcomeTextBottom: {
//     fontSize: 35,
//     textAlign: 'center',
//     fontWeight: 'bold',
//     color: Colors.darkYellow, // Set the color to dark yellow
//     marginBottom: 40, // Adjust the margin as needed
//   },
//   buttonContainer: {
//     marginTop: 20, // Adjust the margin as needed
//     alignItems: 'center', // Center the button horizontally
//   },
//   registerText: {
//     color: Colors.black,
//     textAlign: 'center',
//     marginBottom: 8, // Adjust the margin as needed
//   },
// });

// // Additional code for the Register section
// const registerStyles = StyleSheet.create({
//   title: {
//     // Your styles for the title component
//   },
//   input: {
//     // Your styles for the input component
//   }
});
export default Login;