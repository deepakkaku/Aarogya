import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function OPDScreen() {
  return (
    <View style={styles.container}>
      <Text>OPD Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 