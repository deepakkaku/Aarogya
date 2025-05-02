import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useResponsiveContainerStyle } from '../../ui/layout';

export default function OPDScreen() {
  const containerStyle = useResponsiveContainerStyle();
  return (
    <View style={containerStyle}>
      <Text>OPD Screen</Text>
    </View>
  );
}

// (Optional) Remove unused styles if not needed 