import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useResponsiveContainerStyle } from '../../ui/layout';

export default function LogoutScreen() {
  const containerStyle = useResponsiveContainerStyle();
  return (
    <View style={containerStyle}>
      <Text>Logout Screen</Text>
    </View>
  );
}

// (Optional) Remove unused styles if not needed 