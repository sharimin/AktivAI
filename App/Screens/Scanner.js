import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native-web';
import { Camera } from 'expo-camera';
import jsQR from 'jsqr';


const Scanner = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [canvasRendered, setCanvasRendered] = useState(false); // add a new state variable to track if the canvas is rendered
  
    const handleScan = (data) => {
      console.log(JSON.stringify(data));
      setScanned(true);
    };
  
    useEffect(() => {
      const requestPermission = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      };
      requestPermission();
    }, []);
  
    useEffect(() => {
      if (canvasRendered) { // only execute this code if the canvas is rendered
        const canvasElement = document.getElementById('qr-canvas');
        const canvasContext = canvasElement.getContext('2d');
  
        const scan = async () => {
            const stream = await navigator.mediaDevices.getUserMedia({
              video: true,
              audio: false,
            });
            setHasPermission(true);
      
            const videoElement = document.createElement('video');
            videoElement.srcObject = stream;
            videoElement.setAttribute('playsinline', true);
            videoElement.play();
      
            setInterval(() => {
              if (videoElement.readyState === videoElement.HAVE_ENOUGH_DATA) {
                canvasElement.height = videoElement.videoHeight;
                canvasElement.width = videoElement.videoWidth;
                canvasContext.drawImage(
                  videoElement,
                  0,
                  0,
                  canvasElement.width,
                  canvasElement.height
                );
                const imageData = canvasContext.getImageData(
                  0,
                  0,
                  canvasElement.width,
                  canvasElement.height
                );
                const code = jsQR(imageData.data, imageData.width, imageData.height, {
                  inversionAttempts: 'dontInvert',
                });
                if (code) {
                  handleScan(code.data);
                }
              }
            }, 500);
          };
      
          scan();
      }
    }, [canvasRendered]); // add canvasRendered as a dependency

    if (hasPermission === null) {
        return <View />;
      }
      if (hasPermission === false) {
        return <Text>No access to camera</Text>;
      }
  
    return (
      <View style={styles.container}>
        <View style={styles.scannerContainer}>
          <View style={styles.scannerBorder}>
            <canvas
              id="qr-canvas"
              style={{ display: 'none' }}
              onLoad={() => setCanvasRendered(true)} // set canvasRendered to true when the canvas is loaded
            />
          </View>
        </View>
        {scanned && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => setScanned(false)}
          >
            <Text style={styles.buttonText}>Tap to Scan Again</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  scannerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scannerBorder: {
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 10,
    overflow: 'hidden',
    width: '80%',
    aspectRatio: 1,
  },
  button: {
    marginTop: 16,
    backgroundColor: '#DDDDDD',
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Scanner;
