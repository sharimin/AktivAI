import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(timerID);
    };
  }, []);

  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{currentTime.toLocaleTimeString(undefined, options)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
