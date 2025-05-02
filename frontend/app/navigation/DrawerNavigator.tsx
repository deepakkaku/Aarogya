import React from 'react';
import { View, Text, StyleSheet, Pressable, useWindowDimensions, Platform } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import OPDScreen from '../screens/OPDScreen';
import PatientsScreen from '../screens/PatientsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LogoutScreen from '../screens/LogoutScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createDrawerNavigator } from '@react-navigation/drawer';

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
    <View style={[styles.drawer, isPersistent && styles.persistentDrawer]}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>AarogyaDesk</Text>
      </View>
      <View style={styles.section}>
        {drawerItemsTop.map(item => (
          <Pressable
            key={item.label}
            style={[styles.drawerItem, state?.routeNames[state.index] === item.screen && styles.activeDrawerItem]}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Ionicons name={item.icon} size={22} color={state?.routeNames[state.index] === item.screen ? '#2a7be4' : '#555'} style={styles.icon} />
            <Text style={[styles.drawerLabel, state?.routeNames[state.index] === item.screen && styles.activeDrawerLabel]}>{item.label}</Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.sectionBottom}>
        {drawerItemsBottom.map(item => (
          <Pressable
            key={item.label}
            style={styles.drawerItem}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Ionicons name={item.icon} size={22} color="#555" style={styles.icon} />
            <Text style={styles.drawerLabel}>{item.label}</Text>
          </Pressable>
        ))}
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
    width: 260,
    borderRightWidth: 1,
    borderRightColor: '#eee',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 100,
    elevation: 4,
  },
  logoContainer: {
    padding: 32,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  logoText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2a7be4',
  },
  section: {
    marginTop: 32,
  },
  sectionBottom: {
    marginTop: 'auto',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingBottom: 24,
    paddingTop: 16,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 28,
  },
  activeDrawerItem: {
    backgroundColor: '#eaf2fb',
    borderRadius: 8,
  },
  icon: {
    marginRight: 16,
  },
  drawerLabel: {
    fontSize: 16,
    color: '#555',
  },
  activeDrawerLabel: {
    color: '#2a7be4',
    fontWeight: 'bold',
  },
}); 