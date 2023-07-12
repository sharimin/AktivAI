import { View, Text, StyleSheet, Linking } from 'react-native-web'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../Shared/Colors';
import { TextInput, TouchableOpacity } from 'react-native-web';

export default function SearchBar() {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    if (searchText.trim() !== '') {
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchText)}`;
      Linking.openURL(searchUrl); // Open the search URL in a browser or WebView
      console.log('Searching:', searchUrl);
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons name="search" size={24} color={Colors.gray} style={{ marginRight: 10 }} />
      <TextInput
        placeholder='Search'
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={handleSearch}
        style={styles.textInput}
      />
      <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
        <Ionicons name="arrow-forward" size={24} color={Colors.gray} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    marginTop: 10,
    alignItems: 'center'
  },
  textInput: {
    flex: 1
  },
  searchButton: {
    marginLeft: 10
  }
})
