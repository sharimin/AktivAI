import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native-web';

export default function DateComponent() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  const formattedDate = currentDate.toLocaleDateString('ms-MY', options);

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{formattedDate}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
