import React, { useState, useEffect, useContext } from "react";
import QRScanner from "react-qr-scanner";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Platform,Image } from 'react-native-web'; 
import { check, request, PERMISSIONS } from "react-native-permissions";
import { UserContext } from '../Context/UserContext';
import { showAlert } from '../Components/showAlert';

const Scanner = () => {
  const [cameraPermissionGranted, setCameraPermissionGranted] = useState(false);
  const [scannedCode, setScannedCode] = useState(null);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    if (Platform.OS === "web") {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        setCameraPermissionGranted(true);
      } catch (err) {
        console.error(err);
      }
    } else {
      const permission =
        Platform.OS === "ios"
          ? PERMISSIONS.IOS.CAMERA
          : PERMISSIONS.ANDROID.CAMERA;
      const status = await check(permission);
      if (status === "granted") {
        setCameraPermissionGranted(true);
      } else {
        const status = await request(permission);
        if (status === "granted") {
          setCameraPermissionGranted(true);
        }
      }
    }
  };

 const onScan = async (result) => {
  if (result === null) {
    // showAlert("No valid QR code detected");
    // No valid QR code detected
    // You can display an error message or perform other actions here
    return;
  }

  setScannedCode(result);
  

  // Extract the event_id from the scanned QR code string
  let event_id;
  console.log(result.text);
  if (typeof result === 'string') {
    [event_id] = result.text.split(':');
  } else {
    [event_id] = result.text.toString().split(':');
  }
  console.log(event_id);

  // Send a POST request to the /attendEvent endpoint with the scanned QR code string and extracted event_id
  showAlert("event_id : " + event_id + " scanned_qr_code_string : " + result.text);
  try {
    console.log('user_id :'+ userData.user_id + 'event_id :' + event_id + 'scanned_qr_code_string :' + result.text + 'attendance_date :' + new Date().toISOString().slice(0, 10));
    const response = await fetch('/attendEvent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: userData.user_id, // Replace with the actual user ID
        event_id,
        scanned_qr_code_string: result.text,
        attendance_date: new Date().toISOString().slice(0, 10)
      })
    });
    const responseBody = await response.text();
    console.log(responseBody);
    const data = JSON.parse(responseBody);
    console.log(data);
    if (data.success) {
      showAlert("Attendance recorded successfully");
      // Attendance recorded successfully
      // You can display a success message or perform other actions here
    } else {
      showAlert("An error occurred while recording attendance");
      // An error occurred while recording attendance
      // You can display an error message or perform other actions here
    }
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div>
      {!cameraPermissionGranted && <p>Waiting for camera permission...</p>}
      {cameraPermissionGranted && (
        <QRScanner onScan={onScan} scannedCode={scannedCode} />
      )}
    </div>
  );
};



// const Scanner = () => {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [scanned, setScanned] = useState(false);
//   const [canvasRendered, setCanvasRendered] = useState(false);

//   const handleScan = (data) => {
//     console.log(JSON.stringify(data));
//     setScanned(true);
//   };

//   useEffect(() => {
//     const requestPermission = async () => {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: false,
//       });
//       setHasPermission(true);
//     };
//     requestPermission();
//   }, []);

//   useEffect(() => {
//     if (canvasRendered) {
//       const canvasElement = document.getElementById('qr-canvas');
//       const canvasContext = canvasElement.getContext('2d');

//       const scan = async () => {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//           audio: false,
//         });
//         setHasPermission(true);

//         const videoElement = document.createElement('video');
//         videoElement.srcObject = stream;
//         videoElement.setAttribute('playsinline', true);
//         videoElement.play();

//         setInterval(() => {
//           if (videoElement.readyState === videoElement.HAVE_ENOUGH_DATA) {
//             canvasElement.height = videoElement.videoHeight;
//             canvasElement.width = videoElement.videoWidth;
//             canvasContext.drawImage(
//               videoElement,
//               0,
//               0,
//               canvasElement.width,
//               canvasElement.height
//             );
//             const imageData = canvasContext.getImageData(
//               0,
//               0,
//               canvasElement.width,
//               canvasElement.height
//             );
//             const code = jsQR(imageData.data, imageData.width, imageData.height, {
//               inversionAttempts: 'dontInvert',
//             });
//             if (code) {
//               handleScan(code.data);
//             }
//           }
//         }, 500);
//       };

//       scan();
//     }
//   }, [canvasRendered]);

//   if (hasPermission === null) {
//     return <View />;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.scannerContainer}>
//         <View style={styles.scannerBorder}>
//           <canvas
//             id="qr-canvas"
//             style={{ display: 'none' }}
//             onLoad={() => setCanvasRendered(true)}
//           />
//         </View>
//       </View>
//       {scanned && (
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => setScanned(false)}
//         >
//           <Text style={styles.buttonText}>Tap to Scan Again</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };


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
});
export default Scanner;