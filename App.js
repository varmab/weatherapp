import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WeatherNow from './containers/WeatherNow';

export default function App() {
  return (
    <View style={styles.container}>
      <WeatherNow/>
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
