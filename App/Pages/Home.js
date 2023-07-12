import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'

import Colors from '../Shared/Colors'
import { AuthContext } from '../Context/AuthContext'
import WelcomeHeader from '../Components/WelcomeHeader'
import Slider from '../Components/Slider'
import SearchBar from '../Components/SearchBar'
import Scanner from '../../screens/Scanner'
import Logout from './Logout'

export default function Home() {
  const { userData, setUserData } = useContext(AuthContext)
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <WelcomeHeader />
      <SearchBar />
      <Slider />
      <View style={styles.buttonContainer}>
        <Button title='Scan' onPress={() => navigation.navigate('Scanner')} />
      </View>
      <Logout />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  buttonContainer: {
    marginVertical: 30
  }
});
