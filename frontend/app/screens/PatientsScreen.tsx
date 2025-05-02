import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useResponsiveContainerStyle } from '../../ui/layout';

export default function PatientsScreen() {
  const containerStyle = useResponsiveContainerStyle();
  return (
    <View style={containerStyle}>
      <Text>Patients Screen</Text>
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