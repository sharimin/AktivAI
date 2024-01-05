import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Platform,Image } from 'react-native-web';
import React, { useContext, useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import axios from 'axios';
import logo5122 from '../Assets/Image/logo5122.png';
import theme from '../theme.ts';
import { UserContext } from '../Context/UserContext';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const navigation = useNavigation();
  const { setUserData } = useContext(UserContext);

  const NavigateFirstRegister = () => {
    navigation.navigate("FirstRegister");
  };

  useEffect(() => {
    validateSessionOnStart();
  }, []);

  const validateSessionOnStart = async () => {
    const sessionToken = await getSessionToken();
    if (sessionToken && await isSessionTokenValid(sessionToken)) {
      await getUserProfile(email);
      navigation.navigate('Home');
    }
  };

  const getSessionToken = async () => {
    try {
      return await AsyncStorage.getItem('sessionToken');
    } catch (error) {
      console.error('Error fetching session token:', error);
      return null;
    }
  };

  const isSessionTokenValid = async (token) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
  
      const response = await axios.get('https://aktivai.web.app/validateSessionToken', config);
      return response.data.success;
    } catch (error) {
      console.error('Error validating session token:', error);
      return false;
    }
  };
  

  const getUserProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('sessionToken');
      if (!token) {
        throw new Error('No session token found');
      }
  
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
  
      const userProfileResponse = await axios.get('https://aktivai.web.app/getUserProfile', config);
  
      if (userProfileResponse.data.success) {
        setUserData(userProfileResponse.data.data);
      } else {
        throw new Error('Failed to fetch user profile');
      }
    } catch (error) {
      console.error('Error retrieving user profile:', error);
    }
  };
  

  const handleLogin = async () => {
    if (!email || !password) {
      setLoginStatus('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('https://aktivai.web.app/login', { email, password });
      if (response.data.success) {
        setLoginStatus('Login successful!');
        await AsyncStorage.setItem('sessionToken', response.data.token);
        setUserData({ email, token: response.data.token });
        navigation.navigate('Home');
      } else {
        setLoginStatus(response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginStatus('An error occurred while logging in. Please try again later.');
    }
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
    {loginStatus ? <Text>{loginStatus}</Text> : null}

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
    width: '100%',
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

});
export default Login;