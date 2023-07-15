import { View, Text, Button, StyleSheet, Linking, TouchableOpacity } from 'react-native-web';
import React, { useEffect, useState } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function Scanner() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Bar Code With Type ${type} and data ${Linking.openURL(`${data}`)} has been scanned`);
    };

    if (hasPermission === null) {
        return <Text>Requesting for Camera Permission</Text>;
    }

    if (hasPermission === false) {
        return <Text>No Access to Camera</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.scannerContainer}>
                <View style={styles.scannerBorder}>
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={StyleSheet.absoluteFillObject}
                    />
                </View>
            </View>
            {scanned && (
                <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
                    <Text style={styles.buttonText}>Tap to Scan Again</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

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
