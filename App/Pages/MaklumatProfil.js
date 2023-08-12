import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Platform } from 'react-native-web';
import Colors from '../Shared/Colors';
import axios from 'axios';
import { isValidEmail, isValidDateOfBirth, isValidPassword } from './Validation';
import { listOfStates } from './States';
import { listOfProfessions, listOfGenders } from './Professions';
import {  useNavigation, useRoute } from '@react-navigation/native';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DefaultProfilePicture from '../Assets/Image/ProfilePic.png';
import theme from '../theme';


import Vector from '../Assets/vectors/Vector.svg';
import Vector2 from '../Assets/vectors/Vector2.svg';
import $1 from '../Assets//vectors/$1.svg';
import Frame513827 from '../Assets/vectors/Frame513827.svg';
import Vector3 from '../Assets/vectors/Vector3.svg';
import Vector4 from '../Assets/vectors/Vector4.svg';
import Vector5 from '../Assets/vectors/Vector5.svg';
import Layer1 from '../Assets/vectors/Layer1.svg';
import Vector6 from '../Assets/vectors/Vector6.svg';
import IsolationMode from '../Assets/vectors/IsolationMode.svg';
import GraphicElements from '../Assets/vectors/GraphicElements.svg';
import IsolationMode2 from '../Assets/vectors/IsolationMode2.svg';
import IsolationMode3 from '../Assets/vectors/IsolationMode3.svg';


const MaklumatProfil = () => {
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [firstName, setFirstName] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [userId, setUserid] = useState('');
  const [dob, setDob] = useState(null);
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [states, setStates] = useState('');
  const [lastName, setLastName] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [registerStatus, setRegisterStatus] = useState('');
  const [profession, setProfession] = useState('');
  const listOfGenders = ['Lelaki', 'Wanita']; // Add more options if needed

  const navigation = useNavigation();
  const route = useRoute();
  const { email: routeEmail } = route.params;

  // Populate the fields with the received data
  useEffect(() => {
    setEmail(routeEmail);
  }, [routeEmail]);
const datePickerStyles = {
  width: '80%',
  height: 40,
  borderColor: Colors.primary,
  borderWidth: 1,
  borderRadius: 5,
  paddingHorizontal: 10,
  marginBottom: 12,
};
const dropdownStyles = {
  width: '80%',
  height: 40,
  backgroundColor: "transparent",
  color: "#EFC52E",
  border: "none",
  display: "flex",
  alignItems: "center",
};
  // Function to format the date to "MM/DD/YYYY" format
  const formatDate = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
  };
  const validateBio = (text) => {
    const wordCount = text.trim().split(/\s+/).length;
    return wordCount <= 120;
  };
  const handleRegister = () => {
    if (!email || !firstName || !lastName || !dob || !gender || !phoneNumber  || !city || !states || !profession) {
      setRegisterStatus('Sila lengkapkan semua medan');
      return;
    }

    // Add form validation for phone number
  if (phoneNumber.length <= 9) {
    setRegisterStatus('Nombor telefon mestilah lebih daripada 9 digit dengan atau tanpa +6');
    return;
  }
  // Validation for city and states (begin with a capital letter)
  if (!/^[A-Z][a-zA-Z\s]*$/.test(city)) {
    setRegisterStatus('Bandar mesti bermula dengan huruf besar');
    return;
  }

  if (!/^[A-Z][a-zA-Z\s]*$/.test(states)) {
    setRegisterStatus('Negeri mesti bermula dengan huruf besar');
    return;
  }
  if (!isValidEmail(email)) {
    setRegisterStatus('Sila masukkan alamat emel yang sah.');
    return;
  }
// Validation for bio field word count
if (!validateBio(bio)) {
setRegisterStatus('Bio mesti kurang daripada 120 patah perkataan.');
  return;  
}
  
    axios
      .post('https://aktivai.web.app/UpdateProfile', {
        email: email,
        bio: bio,
        user_id: userId,
        profile_picture: profilePicture,
        first_name: firstName,
        dob: dob ? formatDate(dob) : null,
        gender: gender,
        phone_number: phoneNumber,
        last_name: lastName,
        city: city,
        states: states,
        profession: profession,
      })
      .then((response) => {
        if (response.data.success) {
          // Profile update was successful
          navigation.navigate('Success', {});
        } else {
          // An error occurred
          setRegisterStatus(response.data.message);
        }
      });
  };

  const [imagePreview, setImagePreview] = useState(null);

  const handleChooseProfilePicture = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target.result);
        setImagePreview(URL.createObjectURL(file)); // Store the temporary URL for image preview
      };
      reader.readAsDataURL(file);
    }
  };
  

  return (
    <View style={styles.root}>
      <View style={styles.frame162509}>
        <View style={styles.group513845}>
          {/* <Vector/>
          <Vector2/> */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img src="https://github.com/Nikizzuan/TempSaveFIle/blob/main/Header.png?raw=true" style={{ width: '100%' }} />
      </div>
        </View>
      </View>
      <View style={styles.frame513825}>
        <Text style={styles.suntingProfil}>
          Sunting Profil
        </Text>
      </View>
      <View style={styles.profileBio}>
        {/* <$1/> */}
        <View style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
  <label htmlFor="profilePictureInput">
    {imagePreview ? (
      <View style={styles.profilePictureFrame}>
        <img src={imagePreview} alt="Profile Preview" style={{ ...styles.profilePicture, width: 100, height: 100 }} />
      </View>
    ) : (
      <View style={styles.profilePictureFrame}>
        <img src={DefaultProfilePicture} alt="Default Profile Picture" style={{ ...styles.profilePicture, width: 100, height: 100 }} />
      </View>
    )}
  </label>
  <input
    id="profilePictureInput"
    title="Set Profile Picture"
    style={{ ...styles.input, display: "none" }}
    type="file"
    onChange={handleChooseProfilePicture}
  />
</View>


        <View style={styles.frame513826}>
          <View style={styles.frame513828}>
            {/* <Text style={styles.masukkanBiografiAndaDiSini}>
              Masukkan biografi anda di sini
            </Text> */}
            <TextInput
        style={styles.bigInput} // Use styles.bigInput for a bigger multiline input
        placeholder={`Masukkan biografi anda di sini`}
        value={bio}
        onChangeText={setBio}
        multiline={true} // Enable multiline for the bio input
      />
          </View>
          {/* <Frame513827/> */}
          <View style={styles.frame513829}>
            <Text style={styles.maksimum120Aksara}>
              Maksimum 120 Aksara
            </Text>
          </View>
    
        </View>
      </View>
      <View style={styles.progressBar}>
        
      </View>
      <View style={styles.maklumatProfilForm}>
        <Text style={styles.maklumatProfil}>
          Maklumat Profil
        </Text>
        <View style={styles.namaPertama2}>
          {/* <Text style={styles.namaPertama}>
            Nama pertama
          </Text> */}
          <TextInput
      style={styles.input}
      placeholder="Nama Pertama"
      value={firstName}
      onChangeText={setFirstName}
    />
        </View>
        <View style={styles.namaTerakhir2}>
          {/* <Text style={styles.namaTerakhir}>
            Nama terakhir
          </Text> */}
          <TextInput
      style={styles.input}
      placeholder="Nama Terakhir"
      value={lastName}
      onChangeText={setLastName}
    />
        </View>
        <View style={styles.noTel}>
          {/* <Text style={styles.namaPengguna}>
            Nama pengguna
          </Text> */}
          <TextInput
      style={styles.input}
      placeholder="Nama Pengguna"
      value={userId}
      onChangeText={setUserid}
    />
        </View>
        <View style={styles.janina}>
          <View style={styles.frame513837}>
            <Text style={styles.$60}>
              +60
            </Text>
            {/* <IconFontAwesomeFreeSolidAAngleDown/> */}
      
          </View>
          <View style={styles.frame513836}>
            {/* <Text style={styles.noTelefon}>
              No Telefon
            </Text> */}
            <TextInput
      style={styles.input}
      placeholder="No. Telefon"
      value={phoneNumber}
      onChangeText={setPhoneNumber}
    />
          </View>
        </View>
        <View style={styles.textInput}>
          <View style={styles.frame5138372}>
            <Text style={styles.jantina}>
              Jantina
            </Text>
          </View>
          <select
    style={dropdownStyles} // Apply the updated style to the select element
    value={gender}
    onChange={(e) => setGender(e.target.value)}
    className={styles.gender}
  >
    <option value=""></option>
    {listOfGenders.map((gender) => (
      <option key={gender} value={gender}>
        {gender}
      </option>
    ))}
  </select>
          <View style={styles.frame5138362}>
            {/* <IconFontAwesomeFreeSolidAAngleDown/> */}

          </View>
        </View>
        <View style={styles.noTel2}>
          <Text style={styles.tarikhLahir}>
            Tarikh lahir
          </Text>
          <DatePicker
      selected={dob}
      onChange={(date) => setDob(date)}
      dateFormat="MM/dd/yyyy"
      placeholderText=""
      showYearDropdown
      scrollableYearDropdown
      yearDropdownItemNumber={100}
      style={dropdownStyles} // Apply the updated style to the DatePicker component
  />
          {/* <Vector6/> */}
               <div>
      <img src="https://raw.githubusercontent.com/Nikizzuan/TempSaveFIle/5e9cf5d256e7855d488bbbe6b210f7424d857cac/vectors/Vector6.svg"/>
    </div>
        
        </View>
        <View style={styles.textInput2}>
          <View style={styles.frame5138373}>
            <Text style={styles.negeri}>
              Negeri
            </Text>
          
          </View>
          <select
        style={dropdownStyles} 
        value={states}
        onChange={(e) => setStates(e.target.value)}
        className={styles.states} // Apply the style to the select element
      >
        <option value=""></option>
        {listOfStates.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
          <View style={styles.frame5138363}>
            {/* <IconFontAwesomeFreeSolidAAngleDown/> */}
   
          </View>
        </View>
        <View style={styles.textInput3}>
          <View style={styles.frame5138374}>
            <Text style={styles.bandar}>
              Bandar
            </Text>
          
          </View>
    
          <View style={styles.frame5138364}>
          <TextInput
      style={styles.input}
      placeholder=""
      value={city}
      onChangeText={setCity}
       />
          </View>
        </View>
      </View>
   
      <View style={styles.frame513840}>
        <View style={styles.maklumatProfilForm3}>
          <View style={styles.textInput8}>
            <View style={styles.frame5138369}>
              <Text style={styles.kerjaya}>
                Kerjaya
              </Text>
              <select
      style={dropdownStyles} 
      value={profession}
      onChange={(e) => setProfession(e.target.value)}
    >
      <option value=""></option>
      {listOfProfessions.map((prof) => (
        <option key={prof} value={prof}>
          {prof}
        </option>
      ))}
    </select>
              {/* <IconFontAwesomeFreeSolidAAngleDown/> */}
 
            </View>
          </View>
        </View>
      </View>
      <View  style={styles.namaTerakhir7}>
    <TouchableOpacity
    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    onPress={handleRegister}>
    <Text style={styles.daftar}>Kemaskini</Text>
  </TouchableOpacity>
    </View>
    {registerStatus ? <Text>{registerStatus}</Text> : null}
      <View/>
    </View>
  );


//   <View style={styles.maklumatProfilForm2}>
//   <Text style={styles.mediaSosial}>
//     Media Sosial
//   </Text>
//   <View style={styles.textInput4}>
//     <View style={styles.frame5138375}>
//       {/* <IsolationMode/> */}
//     </View>
//     <View style={styles.frame5138365}>
//       <Text style={styles.httpWwwFacebookCom}>
//         http://www.facebook.com/@
//       </Text>
//     </View>
//   </View>
//   <View style={styles.textInput5}>
//     <View style={styles.frame5138376}>
//       {/* <GraphicElements/> */}
//     </View>
//     <View style={styles.frame5138366}>
//       <Text style={styles.httpWwwLinkedinCom}>
//         http://www.linkedin.com/@
//       </Text>
//     </View>
//   </View>
//   <View style={styles.textInput6}>
//     <View style={styles.frame5138377}>
//       <View style={styles.graphicElements2}>
//         {/* <IsolationMode2/> */}
//       </View>
//     </View>
//     <View style={styles.frame5138367}>
//       <Text style={styles.httpWwwTwitterCom}>
//         http://www.twitter.com/@
//       </Text>
//     </View>
//   </View>
//   <View style={styles.textInput7}>
//     <View style={styles.frame5138378}>
//       {/* <IsolationMode3/> */}
//     </View>
//     <View style={styles.frame5138368}>
//       <Text style={styles.httpWwwTiktokCom}>
//         http://www.tiktok.com/@
//       </Text>
//     </View>
//   </View>
// </View>

  //   <View style={styles.container}>
  //     <Text style={styles.title}>Maklumat Diri</Text>
  //     <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  //     {imagePreview ? (
  //     <View style={styles.profilePictureFrame}>
  //       <img src={imagePreview} alt="Profile Preview" style={styles.profilePicture} />
  //       </View>
  //       ) : (
  //         <View style={styles.profilePictureFrame}>
  //           <img src={DefaultProfilePicture} alt="Default Profile Picture" style={styles.profilePicture} />
  //         </View>
  //       )}
  //     <input 
  //       id="profilePictureInput"
  //       title = "Set Profile Picture"
  //       style={styles.input}
  //       type="file" 
  //       onChange={handleChooseProfilePicture} 
  //     />
  //     </View>

  //     <TextInput
  //       style={styles.bigInput} // Use styles.bigInput for a bigger multiline input
  //       placeholder={`Bio (Maksimum 120 patah perkataan)`}
  //       value={bio}
  //       onChangeText={setBio}
  //       multiline={true} // Enable multiline for the bio input
  //     />
  //     <TextInput
  //     style={styles.input}
  //     placeholder="Alamat Emel"
  //     value={email}
  //     onChangeText={setEmail}
  //   />
  //   <TextInput
  //     style={styles.input}
  //     placeholder="Nama Pengguna"
  //     value={userId}
  //     onChangeText={setUserid}
  //   />
  //   <TextInput
  //     style={styles.input}
  //     placeholder="Nama Pertama"
  //     value={firstName}
  //     onChangeText={setFirstName}
  //   />
  //   <TextInput
  //     style={styles.input}
  //     placeholder="Nama Terakhir"
  //     value={lastName}
  //     onChangeText={setLastName}
  //   />
    
  //   <DatePicker
  //     selected={dob}
  //     onChange={(date) => setDob(date)}
  //     dateFormat="MM/dd/yyyy"
  //     placeholderText="Tarikh Lahir (MM/DD/YYYY)"
  //     showYearDropdown
  //     scrollableYearDropdown
  //     yearDropdownItemNumber={100}
  //     style={dropdownStyles} // Apply the updated style to the DatePicker component
  // />
    
    
    
    
  //   <select
  //   style={dropdownStyles} // Apply the updated style to the select element
  //   value={gender}
  //   onChange={(e) => setGender(e.target.value)}
  //   className={styles.gender}
  // >
  //   <option value="">Jantina</option>
  //   {listOfGenders.map((gender) => (
  //     <option key={gender} value={gender}>
  //       {gender}
  //     </option>
  //   ))}
  // </select>

  //   <TextInput
  //     style={styles.input}
  //     placeholder="No. Telefon"
  //     value={phoneNumber}
  //     onChangeText={setPhoneNumber}
  //   />
    
  //     <select
  //       style={dropdownStyles} 
  //       value={states}
  //       onChange={(e) => setStates(e.target.value)}
  //       className={styles.states} // Apply the style to the select element
  //     >
  //       <option value="">Negeri</option>
  //       {listOfStates.map((state) => (
  //         <option key={state} value={state}>
  //           {state}
  //         </option>
  //       ))}
  //     </select>
    
  //   <TextInput
  //     style={styles.input}
  //     placeholder="Bandar"
  //     value={city}
  //     onChangeText={setCity}
  //   />
  //   {/* Add the dropdown for profession */}
  
  //   <select
  //     style={dropdownStyles} 
  //     value={profession}
  //     onChange={(e) => setProfession(e.target.value)}
  //   >
  //     <option value="">Kerjaya</option>
  //     {listOfProfessions.map((prof) => (
  //       <option key={prof} value={prof}>
  //         {prof}
  //       </option>
  //     ))}
  //   </select>
  
  //   <Button title="Kemaskini" onPress={handleRegister} />
  //   {registerStatus ? <Text>{registerStatus}</Text> : null}
  // </View>sad

  // <View style={styles.frame513832}>
  //         <View style={styles.frame513844}>
  //           <Text style={styles.lengkapkanProfil}>
  //             Lengkapkan profil
  //           </Text>
  //           {/* <IconFontAwesomeFreeSolidIInfoCircle/> */}
  //           <div>
  //     <img src="https://raw.githubusercontent.com/Nikizzuan/TempSaveFIle/1e210e6bb46291fac343ba9a6838faa469079651/vectors/info-circle.svg"/>
  //   </div>
  //         </View>
  //         <Text style={styles.$80Lengkap}>
  //           80% lengkap
  //         </Text>
  //       </View>
  //       <View style={styles.frame513834}>
  //         <View style={styles.frame513831}>
  //           <View style={styles.group}>
  //             {/* <Vector3/>
  //             <Vector4/> */}
  //           </View>
  //           {/* <Vector5/> */}
  //         </View>
  //         {/* <Layer1/> */}
  //         <div>
  //     <img src="https://raw.githubusercontent.com/Nikizzuan/TempSaveFIle/5e9cf5d256e7855d488bbbe6b210f7424d857cac/vectors/Layer1.svg"/>
  //   </div>
  //       </View>
  
};

const styles = StyleSheet.create({

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
  suntingProfil: {
    color: theme.colors.black.$01,
    fontFamily: 'Avenir',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '800',
    lineHeight: '130% /* 20.8px */',
  },
  frame513825: {
    paddingTop: 72,
    alignItems: 'center',
    gap: 12,
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  $1: {
    width: 49,
    height: 49,
  },
  masukkanBiografiAndaDiSini: {
    color: '#7F879E',
    textAlign: 'center',
    fontFamily: 'Avenir',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '350',
    lineHeight: 'normal',
  },
  profileBio: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  frame513826: {
    width: 256,
    height: 84,
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: 'rgba(217, 217, 217, 0.24)',
    flexDirection: 'row',
    padding: 12,
    borderRadius: 16,
  },
  frame513828: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 10,
    flexDirection: 'row',
  },
  frame513827: {
    width: 12,
    height: 12,
    position: 'absolute',
    right: 12.5,
    top: 14,
  },
  maksimum120Aksara: {
    color: '#7F879E',
    textAlign: 'center',
    fontFamily: 'Avenir',
    fontSize: 8,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 'normal',
  },
  frame513829: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 10,
    position: 'absolute',
    right: 12,
    bottom: 9,
    flexDirection: 'row',
  },
  lengkapkanProfil: {
    color: '#36455A',
    fontFamily: 'Avenir',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 'normal',
  },
  progressBar: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 4,
    alignSelf: 'stretch',
  },
  frame513832: {
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  frame513844: {
    alignItems: 'center',
    gap: 4,
    flexDirection: 'row',
  },
  $80Lengkap: {
    color: '#36455A',
    fontFamily: 'Avenir',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 'normal',
  },
  frame513834: {
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  frame513831: {
    width: 326,
    height: 16.485,
  },
  group: {
    width: 326,
    height: 5.511,
    flexShrink: 0,
  },
  layer1: {
    width: 15,
    height: 17,
  },
  maklumatProfil: {
    color: theme.colors.black.$01,
    fontFamily: 'Avenir',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '800',
    lineHeight: '130% /* 18.2px */',
  },
  namaPertama: {
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
  namaPertama2: {
    height: 51,
    alignItems: 'flex-start',
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
  namaTerakhir: {
    color: theme.colors.grayscale.light_text,
    fontFamily: 'Avenir',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '24px /* 171.429% */',
  },
  namaTerakhir7: {
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
  namaTerakhir2: {
    height: 51,
    alignItems: 'flex-start',
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
  namaPengguna: {
    color: theme.colors.grayscale.light_text,
    fontFamily: 'Avenir',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '24px /* 171.429% */',
  },
  noTel: {
    height: 51,
    alignItems: 'flex-start',
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
  $60: {
    color: theme.colors.grayscale.light_text,
    fontFamily: 'Avenir',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '24px /* 171.429% */',
  },
  janina: {
    height: 51,
    alignItems: 'center',
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: theme.colors.grayscale.gray_bg,
    borderStyle: 'solid',
    backgroundColor: theme.colors.grayscale.white,
    flexDirection: 'row',
    borderRadius: 50,
  },
  frame513837: {
    alignItems: 'center',
    gap: 6,
    alignSelf: 'stretch',
    borderRightWidth: 1,
    borderRightColor: '#EFEFEF',
    flexDirection: 'row',
    paddingVertical: 0,
    paddingHorizontal: 16,
  },
  noTelefon: {
    color: theme.colors.grayscale.light_text,
    fontFamily: 'Avenir',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '24px /* 171.429% */',
  },
  frame513836: {
    alignItems: 'center',
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingVertical: 0,
    paddingHorizontal: 16,
  },
  jantina: {
    color: theme.colors.grayscale.light_text,
    
    fontFamily: 'Avenir',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '24px /* 171.429% */',
  },
  textInput: {
    height: 51,
    alignItems: 'center',
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: theme.colors.grayscale.gray_bg,
    borderStyle: 'solid',
    backgroundColor: theme.colors.grayscale.white,
    flexDirection: 'row',
    borderRadius: 50,
  },
  frame5138372: {
    alignItems: 'center',
    gap: 6,
    alignSelf: 'stretch',
    borderRightWidth: 1,
    borderRightColor: '#EFEFEF',
    flexDirection: 'row',
    paddingVertical: 0,
    paddingHorizontal: 16,
  },
  frame5138362: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingVertical: 0,
    paddingHorizontal: 16,
  },
  tarikhLahir: {
    color: theme.colors.grayscale.light_text,
    fontFamily: 'Avenir',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '24px /* 171.429% */',
  },
  noTel2: {
    height: 51,
    alignItems: 'flex-start',
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
  negeri: {
    color: theme.colors.grayscale.light_text,
    fontFamily: 'Avenir',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '24px /* 171.429% */',
  },
  textInput2: {
    height: 51,
    alignItems: 'center',
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: theme.colors.grayscale.gray_bg,
    borderStyle: 'solid',
    backgroundColor: theme.colors.grayscale.white,
    flexDirection: 'row',
    borderRadius: 50,
  },
  frame5138373: {
    alignItems: 'center',
    gap: 6,
    alignSelf: 'stretch',
    borderRightWidth: 1,
    borderRightColor: '#EFEFEF',
    flexDirection: 'row',
    paddingVertical: 0,
    paddingHorizontal: 16,
  },
  frame5138363: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingVertical: 0,
    paddingHorizontal: 16,
  },
  bandar: {
    color: theme.colors.grayscale.light_text,
    fontFamily: 'Avenir',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '24px /* 171.429% */',
  },
  textInput3: {
    height: 51,
    alignItems: 'center',
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: theme.colors.grayscale.gray_bg,
    borderStyle: 'solid',
    backgroundColor: theme.colors.grayscale.white,
    flexDirection: 'row',
    borderRadius: 50,
  },
  frame5138374: {
    alignItems: 'center',
    gap: 6,
    alignSelf: 'stretch',
    borderRightWidth: 1,
    borderRightColor: '#EFEFEF',
    flexDirection: 'row',
    paddingVertical: 0,
    paddingHorizontal: 16,
  },
  frame5138364: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingVertical: 0,
    paddingHorizontal: 16,
  },
  mediaSosial: {
    color: theme.colors.black.$01,
    fontFamily: 'Avenir',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '800',
    lineHeight: '130% /* 18.2px */',
  },
  isolationMode: {
    width: 24,
    height: 24,
  },
  maklumatProfilForm2: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 12,
    alignSelf: 'stretch',
    paddingVertical: 8,
    paddingHorizontal: 0,
  },
  textInput4: {
    height: 51,
    alignItems: 'center',
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: theme.colors.grayscale.gray_bg,
    borderStyle: 'solid',
    backgroundColor: theme.colors.grayscale.white,
    flexDirection: 'row',
    borderRadius: 50,
  },
  frame5138375: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'stretch',
    borderRightWidth: 1,
    borderRightColor: '#EFEFEF',
    flexDirection: 'row',
    paddingVertical: 0,
    paddingHorizontal: 16,
  },
  httpWwwFacebookCom: {
    color: theme.colors.grayscale.light_text,
    fontFamily: 'Avenir',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '24px /* 171.429% */',
  },
  frame5138365: {
    alignItems: 'center',
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingVertical: 0,
    paddingHorizontal: 16,
  },
  graphicElements: {
    width: 24,
    height: 24,
  },
  textInput5: {
    height: 51,
    alignItems: 'center',
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: theme.colors.grayscale.gray_bg,
    borderStyle: 'solid',
    backgroundColor: theme.colors.grayscale.white,
    flexDirection: 'row',
    borderRadius: 50,
  },
  frame5138376: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'stretch',
    borderRightWidth: 1,
    borderRightColor: '#EFEFEF',
    flexDirection: 'row',
    paddingVertical: 0,
    paddingHorizontal: 16,
  },
  httpWwwLinkedinCom: {
    color: theme.colors.grayscale.light_text,
    fontFamily: 'Avenir',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '24px /* 171.429% */',
  },
  frame5138366: {
    alignItems: 'center',
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingVertical: 0,
    paddingHorizontal: 16,
  },
  isolationMode2: {
    width: 22.957,
    height: 22.957,
    flexShrink: 0,
  },
  textInput6: {
    height: 51,
    alignItems: 'center',
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: theme.colors.grayscale.gray_bg,
    borderStyle: 'solid',
    backgroundColor: theme.colors.grayscale.white,
    flexDirection: 'row',
    borderRadius: 50,
  },
  frame5138377: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'stretch',
     borderRightWidth: 1,
    borderRightColor: '#EFEFEF',
    flexDirection: 'row',
    paddingVertical: 0,
    paddingHorizontal: 16,
  },
  graphicElements2: {
    width: 24,
    height: 24,
    paddingTop: 0,
    paddingBottom: 1.043,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 0,
  },
  httpWwwTwitterCom: {
    color: theme.colors.grayscale.light_text,
    fontFamily: 'Avenir',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '24px /* 171.429% */',
  },
  frame5138367: {
    alignItems: 'center',
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingVertical: 0,
    paddingHorizontal: 16,
  },
  isolationMode3: {
    width: 24,
    height: 24,
  },
  textInput7: {
    height: 51,
    alignItems: 'center',
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: theme.colors.grayscale.gray_bg,
    borderStyle: 'solid',
    backgroundColor: theme.colors.grayscale.white,
    flexDirection: 'row',
    borderRadius: 50,
  },
  frame5138378: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'stretch',
    borderRightWidth: 1,
    borderRightColor: '#EFEFEF',
    flexDirection: 'row',
    paddingVertical: 0,
    paddingHorizontal: 16,
  },
  httpWwwTiktokCom: {
    color: theme.colors.grayscale.light_text,
    fontFamily: 'Avenir',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '24px /* 171.429% */',
  },
  frame5138368: {
    alignItems: 'center',
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingVertical: 0,
    paddingHorizontal: 16,
  },
  kerjaya: {
    color: theme.colors.grayscale.light_text,
    fontFamily: 'Avenir',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '24px /* 171.429% */',
  },
  frame513840: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 4,
    alignSelf: 'stretch',
  },
  maklumatProfilForm3: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 12,
    alignSelf: 'stretch',
    paddingVertical: 8,
    paddingHorizontal: 0,
  },
  textInput8: {
    height: 51,
    alignItems: 'center',
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: theme.colors.grayscale.gray_bg,
    borderStyle: 'solid',
    backgroundColor: theme.colors.grayscale.white,
    flexDirection: 'row',
    borderRadius: 50,
  },
  frame5138369: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingVertical: 0,
    paddingHorizontal: 16,
  },
  group2: {
    width: 24,
    height: 24,
  },

    input: {
    width: '100%',
    placeholderTextColor: theme.colors.grayscale.light_text,
    border: "none",
    flex: 1,
     justifyContent: 'center', 
     alignItems: 'center'
  
  },
  bigInput: {
    width: '100%',
    placeholderTextColor: theme.colors.grayscale.light_text,
    border: "none",
    display: "flex",
    alignItems: "center",
  },
  profilePicture: {
    width: '100%',
    height: '100%',
    objectFit: 'cover', // Ensure the picture fills the frame without stretching
  },
  

  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // title: {
  //   fontSize: 24,
  //   fontWeight: 'bold',
  //   marginBottom: 16,
  // },
  // input: {
  //   width: '80%',
  //   height: 40,
  //   borderColor: Colors.primary,
  //   borderWidth: 1,
  //   borderRadius: 5,
  //   paddingHorizontal: 10,
  //   marginBottom: 12,
  // },
  // bigInput: {
  //   width: '80%',
  //   height: 80,
  //   borderColor: Colors.primary,
  //   borderWidth: 1,
  //   borderRadius: 5,
  //   paddingHorizontal: 10,
  //   marginBottom: 12,
  // },
  // radioButtonsContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginBottom: 12,
  // },
  // radioButton: {
  //   marginLeft: 8,
  //   paddingVertical: 4,
  //   paddingHorizontal: 8,
  //   borderColor: Colors.primary,
  //   borderWidth: 1,
  //   borderRadius: 5,
  // },
  // radioLogo: {
  //   width: 20, 
  //   height: 20,
  //   marginRight: 8,
  // }, 
  // radioButtonSelected: {
  //   backgroundColor: Colors.primary,
  //   color: 'white',
  // },
  
  // 'datepicker-input': {
  //   width: '80%',
  //   height: 40,
  //   borderColor: Colors.primary,
  //   borderWidth: 1,
  //   borderRadius: 5,
  //   paddingHorizontal: 10,
  //   marginBottom: 12,
  // },
  // chooseProfilePictureButton: {
  //   width: 200,
  //   height: 200,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#f0f0f0',
  //   borderWidth: 1,
  //   borderColor: Colors.primary,
  //   borderRadius: 5,
  // },
  // chooseProfilePictureButtonText: {
  //   color: Colors.primary,
  //   fontSize: 16,
  // },
  
  // profilePictureFrame: {
  //   border: '5px solid #ffffff', 
  //   boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', 
  //   borderRadius: '50%', 
  //   overflow: 'hidden', 
  //   marginBottom: 16,
  //   width: 150, // Adjust the width of the frame
  //   height: 150, // Adjust the height of the frame
  // },
  // profilePicture: {
  //   width: '100%',
  //   height: '100%',
  //   objectFit: 'cover', // Ensure the picture fills the frame without stretching
  // },
  // dropdownContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginBottom: 12,
  // },
  // dropdownLabel: {
  //   marginRight: 8,
  // },
  // dropdown: {
  //   width: '100%',
  //   height: 40,
  //   borderColor: Colors.primary,
  //   borderWidth: 1,
  //   borderRadius: 5,
  //   paddingHorizontal: 10,
  // },
  
  
});

export default MaklumatProfil;