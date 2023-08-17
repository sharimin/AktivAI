import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Platform,Image } from 'react-native-web';
import axios from 'axios';
import { Svg, Rect } from 'react-native-svg';
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



  if (password !== confirmPassword) {
    setRegisterStatus('Kata laluan tidak sama');
    return;
  }
  const passwordValidationResult = isValidPassword(password);
  if (!passwordValidationResult.isValid) {
    let errorMessage = 'Sila masukkan kata laluan yang kuat dengan:';
    const { requirements } = passwordValidationResult;
    if (!requirements.length) errorMessage += ' sekurang-kurangnya 8 karakter,';
    if (!requirements.uppercase) errorMessage += ' sekurang-kurangnya satu huruf besar,';
    if (!requirements.lowercase) errorMessage += ' sekurang-kurangnya satu huruf kecil,';
    if (!requirements.number) errorMessage += ' sekurang-kurangnya satu nombor,';
    if (!requirements.specialCharacter) errorMessage += ' sekurang-kurangnya satu karakter khas (@$!%*?&_),';
 
 // Add form validation for password
if (password.length < 8) {
  setRegisterStatus('sekurang-kurangnya 8 karakter');
  return;
}

if (!/[A-Z]/.test(password)) {
  setRegisterStatus('sekurang-kurangnya satu huruf besar');
  return;
}

if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
  setRegisterStatus('sekurang-kurangnya satu karakter khas (@$!%*?&)');
  return;
}

if (password !== confirmPassword) {
  setRegisterStatus('Kata laluan tidak sama');
  return;
}
    // Remove the trailing comma
    errorMessage = errorMessage.replace(/,\s*$/, '');

    setRegisterStatus(errorMessage);
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
      <Text style={styles.sahkanKataLaluan}>
        Sahkan kata laluan
      </Text>
      <View style={styles.namaPertama3}>
        {/* <Lock /> */}
        <div>
      <img src="https://raw.githubusercontent.com/Nikizzuan/TempSaveFIle/5e9cf5d256e7855d488bbbe6b210f7424d857cac/vectors/Lock.svg"/>
    </div>
        <View style={styles.frame5138452}>
        <TextInput
        style={styles.input}
        placeholder="********"
        secureTextEntry
        value={confirmPassword}
        onChangeText={handleConfirmPasswordChange}
      />
          <View style={styles.eyeSlash2}>
            {/* <VuesaxLinearEyeSlash /> */}
          </View>
        </View>
      </View>
    </View>
    <View  style={styles.namaTerakhir}>
    <TouchableOpacity
    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    onPress={handleFirstRegister}>
    <Text style={styles.daftar}>Daftar</Text>
  </TouchableOpacity>
    </View>
    {registerStatus ? <Text style={styles.errorText}>{registerStatus}</Text> : null}

    <Text style={styles.denganMenekanButangDaftarAndaBersetujuDenganTermaDanSyaratAktivAiSertaMengakuiDasarPrivasiMereka}>
        Dengan Log Masuk atau pendaftaran, anda bersetuju dengan Terma Perkhidmatan dan Dasar Privasi kami.
    </Text>
  </View>
  );
};

// {/* <View style={styles.frame513846}>
// <Text style={styles.label}>
//   atau
// </Text>
// </View>
// <View style={styles.buttonGoogle}>
// <View style={styles.button}>
//   {/* <CommpanyIcon /> */}
//   <div>
// <img src="https://raw.githubusercontent.com/Nikizzuan/TempSaveFIle/5e9cf5d256e7855d488bbbe6b210f7424d857cac/vectors/CommpanyIcon.svg"/>
//  </div>
//   <Text style={styles.daftarDenganGoogle}>
//     Daftar dengan Google
//   </Text>
// </View>
// </View> */}

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
   errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 8,
  },
});

export default FirstRegister;