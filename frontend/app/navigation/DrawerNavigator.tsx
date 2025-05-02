import React from 'react';
import { View, Text, StyleSheet, Pressable, useWindowDimensions, Platform, Image } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import OPDScreen from '../screens/OPDScreen';
import PatientsScreen from '../screens/PatientsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LogoutScreen from '../screens/LogoutScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { colors } from '../../ui/colors';

const Drawer = createDrawerNavigator();

const drawerItemsTop = [
  { label: 'Home', icon: 'home-outline', screen: 'Home' },
  { label: 'OPD', icon: 'medkit-outline', screen: 'OPD' },
  { label: 'Patients', icon: 'people-outline', screen: 'Patients' },
];
const drawerItemsBottom = [
  { label: 'Profile', icon: 'person-outline', screen: 'Profile' },
  { label: 'Settings', icon: 'settings-outline', screen: 'Settings' },
  { label: 'Logout', icon: 'log-out-outline', screen: 'Logout' },
];

function PersistentDrawerContent({ navigation, state }: any) {
  const { width } = useWindowDimensions();
  const isPersistent = Platform.OS === 'web' || width > 768;

  return (
    <View style={styles.drawerContent}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.section}>
        {drawerItemsTop.map(item => {
          const isActive = state?.routeNames[state.index] === item.screen;
          return (
            <Pressable
              key={item.label}
              style={[styles.drawerItem, isActive && styles.activeDrawerItem]}
              onPress={() => navigation.navigate(item.screen)}
            >
              <Ionicons
                name={item.icon}
                size={22}
                color={isActive ? '#fff' : 'rgba(255,255,255,0.7)'}
                style={styles.icon}
              />
              <Text
                style={[
                  styles.drawerLabel,
                  isActive && styles.activeDrawerLabel,
                ]}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <View style={styles.sectionBottom}>
        {drawerItemsBottom.map(item => {
          const isActive = state?.routeNames[state.index] === item.screen;
          return (
            <Pressable
              key={item.label}
              style={[styles.drawerItem, isActive && styles.activeDrawerItem]}
              onPress={() => navigation.navigate(item.screen)}
            >
              <Ionicons
                name={item.icon}
                size={22}
                color={isActive ? '#fff' : 'rgba(255,255,255,0.7)'}
                style={styles.icon}
              />
              <Text
                style={[
                  styles.drawerLabel,
                  isActive && styles.activeDrawerLabel,
                ]}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default function DrawerNavigator() {
  const { width } = useWindowDimensions();
  const isPersistent = Platform.OS === 'web' || width > 768;

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: !isPersistent,
        drawerType: isPersistent ? 'permanent' : 'front',
        overlayColor: isPersistent ? 'transparent' : undefined,
        drawerStyle: isPersistent ? styles.persistentDrawer : undefined,
      }}
      drawerContent={props => <PersistentDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="OPD" component={OPDScreen} />
      <Drawer.Screen name="Patients" component={PatientsScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Logout" component={LogoutScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 0,
  },
  persistentDrawer: {
    width: 230,
    borderRadius: 24,
    top: 12,
    left: 12,
    bottom: 12,
    borderRightWidth: 1,
    borderRightColor: '#eee',
    position: 'absolute',
    zIndex: 100,
    elevation: 4,
    backgroundColor: colors.primary,
  },
  drawerContent: {
    flex: 1,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 8,
    paddingRight: 12,
    backgroundColor: 'transparent',
  },
  logoContainer: {
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    marginBottom: 8,
  },
  logoImage: {
    width: '100%',
    height: 45,
    marginBottom: 8,
    alignSelf: 'center',
  },
  section: {
    marginTop: 16,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginVertical: 24,
    marginRight: 8,
  },
  sectionBottom: {
    marginTop: 'auto',
    
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingLeft: 12,
    paddingRight: 18,
    borderRadius: 8,
  },
  activeDrawerItem: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 12
  },
  icon: {
    marginRight: 16,
  },
  drawerLabel: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '400',
  },
  activeDrawerLabel: {
    color: '#fff',
    fontWeight: 'bold',
  },
}); 