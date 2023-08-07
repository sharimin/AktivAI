import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Platform } from 'react-native-web';
import Colors from '../Shared/Colors';
import axios from 'axios';
import { isValidEmail, isValidDateOfBirth, isValidPassword } from './Validation';
import { listOfProfessions } from './Professions';
import {  useNavigation, useRoute } from '@react-navigation/native';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DefaultProfilePicture from '../Assets/Image/aktivAI.png';


const MaklumatProfil = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
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
  const navigation = useNavigation();
  const route = useRoute();
  const { email: routeEmail } = route.params;
  const professions = ['Engineer', 'Medical', 'Teacher', 'Lawyer', 'Artist', 'Chef', 'Writer', 'Entrepreneur'];
  // Populate the fields with the received data
  useEffect(() => {
    setEmail(routeEmail);
  }, [routeEmail]);

  // Function to format the date to "MM/DD/YYYY" format
  const formatDate = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
  };

  const handleRegister = () => {
    if (!email || !firstName || !lastName || !dob || !gender || !phoneNumber || !profession || !city || !states) {
      setRegisterStatus('Sila lengkapkan semua medan');
      return;
    }

    // Add form validation for phone number
  if (phoneNumber.length >= 9) {
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

  
    axios
      .post('https://aktivai.web.app/UpdateProfile', {
        email: email,
        user_id: userId,
        first_name: firstName,
        dob: dob ? formatDate(dob) : null,
        gender: gender,
        phone_number: phoneNumber,
        last_name: lastName,
        profession: profession,
        city: city,
        states: states,
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
        placeholderText="Date of Birth (MM/DD/YYYY)"
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={100}
        className="datepicker-input"
      />

      <View style={styles.radioButtonsContainer}>
        <Text>Jantina:</Text>
        <TouchableOpacity onPress={() => setGender('Male')}>
          <Text style={[styles.radioButton, gender === 'Male' && styles.radioButtonSelected]}>Lelaki</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setGender('Female')}>
          <Text style={[styles.radioButton, gender === 'Female' && styles.radioButtonSelected]}>Wanita</Text>
        </TouchableOpacity>
      </View>
      {/* Add the dropdown for profession */}
      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownLabel}>Kerjaya:</Text>
        <select
          style={styles.dropdown}
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
        >
          <option value="">Sila Pilih Kerjaya</option>
          {listOfProfessions.map((prof) => (
            <option key={prof} value={prof}>
              {prof}
            </option>
          ))}
        </select>
      </View>
      <TextInput
        style={styles.input}
        placeholder="No. Telefon"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Bandar"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="Negeri"
        value={states}
        onChangeText={setStates}
      />
      
      <Button title="Kemaskini" onPress={handleRegister} />
      {registerStatus ? <Text>{registerStatus}</Text> : null}

      {/* <Button title="Kemaskini" onPress={handleRegister} />
        <Text>{registerStatus && registerStatus}</Text> */}
        
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
    width: '80%',
    height: 40,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  
});

export default MaklumatProfil;