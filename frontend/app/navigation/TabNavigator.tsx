import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import OPDScreen from '../screens/OPDScreen';
import PatientsScreen from '../screens/PatientsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = '';
          if (route.name === 'Home') iconName = 'home-outline';
          else if (route.name === 'OPD') iconName = 'medkit-outline';
          else if (route.name === 'Patients') iconName = 'people-outline';
          else if (route.name === 'Profile') iconName = 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="OPD" component={OPDScreen} />
      <Tab.Screen name="Patients" component={PatientsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
} 