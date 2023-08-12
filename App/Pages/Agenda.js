import React from 'react';
import { View, Text, Button } from 'react-native';

const Agenda = ({ navigation }) => {
  const navigateToHome = () => {
    navigation.navigate('Home'); // Replace 'Home' with the actual screen name of your Home screen
  };

  // Mock agenda data
  const agendaData = [
    {
      event: 'NFT Event 1',
      time: '10:00 AM',
      date: '2023-08-15',
      duration: '1 hour',
    },
    {
      event: 'NFT Event 2',
      time: '2:30 PM',
      date: '2023-08-16',
      duration: '2 hours',
    },
    // Add more events as needed
  ];

  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Agenda</Text>
      {agendaData.map((item, index) => (
        <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8 }}>
          <Text>{item.event}</Text>
          <Text>{item.time}</Text>
          <Text>{item.date}</Text>
          <Text>{item.duration}</Text>
        </View>
      ))}
      <Button title="Back to Home" onPress={navigateToHome} />
    </View>
  );
};

export default Agenda;
