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
import DefaultProfilePicture from '../Assets/Image/aktivAI.png';


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
  borderColor: Colors.primary,
  borderWidth: 1,
  borderRadius: 5,
  paddingHorizontal: 10,
  marginBottom: 12,
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
    <View style={styles.container}>
      <Text style={styles.title}>Maklumat Diri</Text>
      <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {imagePreview ? (
      <View style={styles.profilePictureFrame}>
        <img src={imagePreview} alt="Profile Preview" style={styles.profilePicture} />
        </View>
        ) : (
          <View style={styles.profilePictureFrame}>
            <img src={DefaultProfilePicture} alt="Default Profile Picture" style={styles.profilePicture} />
          </View>
        )}
      <input 
        id="profilePictureInput"
        title = "Set Profile Picture"
        style={styles.input}
        type="file" 
        onChange={handleChooseProfilePicture} 
      />
      </View>

      <TextInput
        style={styles.bigInput} // Use styles.bigInput for a bigger multiline input
        placeholder={`Bio (Maksimum 120 patah perkataan)`}
        value={bio}
        onChangeText={setBio}
        multiline={true} // Enable multiline for the bio input
      />
      <TextInput
      style={styles.input}
      placeholder="Alamat Emel"
      value={email}
      onChangeText={setEmail}
    />
    <TextInput
      style={styles.input}
      placeholder="Nama Pengguna"
      value={userId}
      onChangeText={setUserid}
    />
    <TextInput
      style={styles.input}
      placeholder="Nama Pertama"
      value={firstName}
      onChangeText={setFirstName}
    />
    <TextInput
      style={styles.input}
      placeholder="Nama Terakhir"
      value={lastName}
      onChangeText={setLastName}
    />
    
    <DatePicker
      selected={dob}
      onChange={(date) => setDob(date)}
      dateFormat="MM/dd/yyyy"
      placeholderText="Tarikh Lahir (MM/DD/YYYY)"
      showYearDropdown
      scrollableYearDropdown
      yearDropdownItemNumber={100}
      style={dropdownStyles} // Apply the updated style to the DatePicker component
  />
    
    
    
    
    <select
    style={dropdownStyles} // Apply the updated style to the select element
    value={gender}
    onChange={(e) => setGender(e.target.value)}
    className={styles.gender}
  >
    <option value="">Jantina</option>
    {listOfGenders.map((gender) => (
      <option key={gender} value={gender}>
        {gender}
      </option>
    ))}
  </select>

    <TextInput
      style={styles.input}
      placeholder="No. Telefon"
      value={phoneNumber}
      onChangeText={setPhoneNumber}
    />
    
      <select
        style={dropdownStyles} 
        value={states}
        onChange={(e) => setStates(e.target.value)}
        className={styles.states} // Apply the style to the select element
      >
        <option value="">Negeri</option>
        {listOfStates.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
    
    <TextInput
      style={styles.input}
      placeholder="Bandar"
      value={city}
      onChangeText={setCity}
    />
    {/* Add the dropdown for profession */}
  
    <select
      style={dropdownStyles} 
      value={profession}
      onChange={(e) => setProfession(e.target.value)}
    >
      <option value="">Kerjaya</option>
      {listOfProfessions.map((prof) => (
        <option key={prof} value={prof}>
          {prof}
        </option>
      ))}
    </select>
  
    <Button title="Kemaskini" onPress={handleRegister} />
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
  bigInput: {
    width: '80%',
    height: 80,
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
  radioLogo: {
    width: 20, 
    height: 20,
    marginRight: 8,
  }, 
  radioButtonSelected: {
    backgroundColor: Colors.primary,
    color: 'white',
  },
  
  'datepicker-input': {
    width: '80%',
    height: 40,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  chooseProfilePictureButton: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 5,
  },
  chooseProfilePictureButtonText: {
    color: Colors.primary,
    fontSize: 16,
  },
  
  profilePictureFrame: {
    border: '5px solid #ffffff', 
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', 
    borderRadius: '50%', 
    overflow: 'hidden', 
    marginBottom: 16,
    width: 150, // Adjust the width of the frame
    height: 150, // Adjust the height of the frame
  },
  profilePicture: {
    width: '100%',
    height: '100%',
    objectFit: 'cover', // Ensure the picture fills the frame without stretching
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dropdownLabel: {
    marginRight: 8,
  },
  dropdown: {
    width: '100%',
    height: 40,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  
  
});

export default MaklumatProfil;