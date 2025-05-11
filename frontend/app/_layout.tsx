import { useWindowDimensions, ActivityIndicator, View, Platform } from 'react-native';
import { Slot } from 'expo-router';
import DrawerNavigator from '../navigation/DrawerNavigator';
import TabNavigator from '../navigation/TabNavigator';
import { useAuth } from '../lib/useAuth';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Layout() {
  const { width } = useWindowDimensions();
  const isDesktop = Platform.OS === 'web' || width > 768;
  const { isAuthenticated, isLoading } = useAuth();
  const [initialAuthChecked, setInitialAuthChecked] = useState(false);
  
  // Do a simple initial auth check to avoid flickering
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await supabase.auth.getSession();
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setInitialAuthChecked(true);
      }
    };
    
    checkAuth();
  }, []);
  
  // Don't render anything until initial check is complete
  if (!initialAuthChecked) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  
  // When not authenticated, render the Slot (login screen)
  if (!isAuthenticated) {
    return <Slot />;
  }

  // When authenticated, show the appropriate navigator based on screen size
  return isDesktop ? <DrawerNavigator /> : <TabNavigator />;
}
