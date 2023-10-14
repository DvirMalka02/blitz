import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import axios from 'axios';

export default function App() {
  const [location, setLocation] = useState();

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log("Please grant location permissions");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      console.log("Location:");
      console.log(currentLocation);

    };
    getPermissions();
  }, []);

  let latitude = null;
  let longitude = null;
  if (location) {
    latitude = location.coords.latitude;
    longitude = location.coords.longitude;
  }

  const url = `http://localhost/get_cards?lat=${latitude}&long=${longitude}`;

  console.log(url);
  axios.get(url)
    .then(response => {
      // Handle the response data
      console.log('Response:', response.data);
    })
    .catch(error => {
      // Handle errors
      console.error('Error:', error);
    });

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Latitude: {latitude}</Text>
      <Text>Longitude: {longitude}</Text>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});