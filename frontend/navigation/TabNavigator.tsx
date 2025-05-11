import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../app/screens/HomeScreen';
import OPDScreen from '../app/screens/OPDScreen';
import PatientsScreen from '../app/screens/PatientsScreen';
import ProfileScreen from '../app/screens/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Image, TouchableOpacity, Platform } from 'react-native';
import { useAuth } from '../lib/useAuth';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { logout } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Profile') {
            return (
              <Image
                source={require('../assets/images/avatar.png')}
                style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: '#fff' }}
              />
            );
          }
          let iconName = '';
          if (route.name === 'Home') iconName = 'home-outline';
          else if (route.name === 'OPD') iconName = 'medkit-outline';
          else if (route.name === 'Patients') iconName = 'people-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerRight: () => (
          <TouchableOpacity onPress={logout} style={{ marginRight: 15 }}>
            <Ionicons name="log-out-outline" size={24} color="#555" />
          </TouchableOpacity>
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="OPD" component={OPDScreen} />
      <Tab.Screen name="Patients" component={PatientsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
} 