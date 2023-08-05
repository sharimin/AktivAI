import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Platform } from 'react-native-web';
import Colors from '../Shared/Colors';
import axios from 'axios';
import { isValidEmail, isValidDateOfBirth } from './Validation';
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
  const [lastName, setLastName] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [registerStatus, setRegisterStatus] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const { email: routeEmail } = route.params;

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
    if (!email || !firstName || !lastName || !dob || !gender || !phoneNumber) {
      setRegisterStatus('Please fill in all fields');
      return;
    }

    // Add form validation for phone number
  if (phoneNumber.length <= 9) {
    setRegisterStatus('Phone number must be more than 9 digits long with or without +6');
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
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
      />
       <TextInput
        style={styles.input}
        placeholder="Username"
        value={userId}
        onChangeText={setUserid}
      />
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
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
        <Text>Gender:</Text>
        <TouchableOpacity onPress={() => setGender('Male')}>
          <Text style={[styles.radioButton, gender === 'Male' && styles.radioButtonSelected]}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setGender('Female')}>
          <Text style={[styles.radioButton, gender === 'Female' && styles.radioButtonSelected]}>Female</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
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
  }
});

export default MaklumatProfil;