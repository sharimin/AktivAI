import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../Context/UserContext';

const GameScreen= () => {
  const { userData } = useContext(UserContext);
  const navigation = useNavigation();

  const runFirst = `
    window.ReactNativeWebView.postMessage('${userData.token}');
  `;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Aktiv World</Text>
        {
          Platform.OS === 'web' ?
          <iframe src="https://aktiv.ai/Scan/Webgl/index.html" style={{ flex: 1, width: '100%', height: '720px' }} /> :
          <WebView
            source={{ html: '<div id="unityContainer" style="width: 100%; height: 100%;"></div>' }}
            injectedJavaScript={runFirst}
            style={{ flex: 1 }}
          />
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 50,
        paddingBottom: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
      },
      backButton: {
        fontSize: 16,
        color: '#000',
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
      },
});

export default GameScreen;
