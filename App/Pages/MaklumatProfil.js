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
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [dob, setDob] = useState(null);
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [lastName, setLastName] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [registerStatus, setRegisterStatus] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [image, setImage] = useState(null);
  const navigation = useNavigation(); 
  

  const route = useRoute();
  const { email: routeEmail, password: routePassword } = route.params;

  // Populate the fields with the received data
useEffect(() => {
  setEmail(routeEmail);
  setPassword(routePassword);
}, [routeEmail, routePassword]);

// Function to format the date to "MM/DD/YYYY" format
const formatDate = (date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
};

const handleConfirmPasswordChange = (text) => {
  setConfirmPassword(text);
};
  

 
  const handleRegister = () => {

    if (!email || !firstName || !lastName || !dob  || !password || !gender || !phoneNumber) {
      setRegisterStatus('Please fill in all fields');

      return;
    }
    if (!isValidEmail(email)) {
      setRegisterStatus('Please enter a valid email address');
      return;
    }
    
    // Add form validation for password
    if (password.length < 7) {
      setRegisterStatus('Password must be at least 8 characters long');
      return;
    }

    
    // Add form validation for phone number
    if (phoneNumber.length <= 9) {
      setRegisterStatus('Phone number must be more 9 digits long With with out +6');
      return;
    }

    axios.put("https://aktivai.web.app/register", {
        email: email,
        first_name: firstName,
        password: password,
        profile_picture: profilePicture,
        dob: dob ? formatDate(dob) : null,
        gender: gender,
        phone_number: phoneNumber,
        last_name: lastName,
        wallet_address: walletAddress
    }).then((response) => {
        if(response.data.message){
            setRegisterStatus(response.data.message);
            console.log(response.data.message);
        }else{
            setRegisterStatus("BERJAYA CIPTA AKAUN");
            setRegisterStatus("Terima kasih kerana menyertai AKTIVAI. Sila hubungi kami untuk sebarang pertanyaan. Teruskan bersama kami untuk Agenda yang akan datang");
          
            
           // navigation.navigate('Success', {
              /*
              email,
              firstName,
              lastName,
              dob: dob ? formatDate(dob) : null,
              gender,
              phoneNumber,
              profilePicture,
              walletAddress,
              */
           // });
            
            //}
            console.log("BERJAYA CIPTA AKAUN");
            console.log(response.data.message);
        }
    })
    
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
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
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