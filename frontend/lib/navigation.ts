import { Platform, Linking, Dimensions } from 'react-native';
import * as ExpoLinking from 'expo-linking';

// Detect if the device is a tablet
export const isTablet = () => {
  const { width, height } = Dimensions.get('window');
  return (width > 600 || height > 600);
};

// Detect if we're on iOS tablet
export const isIOSTablet = () => {
  return Platform.OS === 'ios' && isTablet();
};

/**
 * A robust navigation utility that tries multiple methods to navigate
 * Works across different platforms (web, iOS, Android) and device types (phone, tablet)
 */
export const navigateTo = async (path: string, router: any): Promise<boolean> => {
  console.log(`Attempting to navigate to: ${path}`);
  
  try {
    // Web platform
    if (Platform.OS === 'web') {
      window.location.href = path.startsWith('/') ? path : `/${path}`;
      return true;
    }
    
    // Create both URL formats (for different navigation methods)
    const routerPath = path.startsWith('/') ? path : `/${path}`;
    const linkingPath = `aarogyadesk://${path.replace(/^\//, '')}`;
    
    // iOS iPad specific - try multiple methods in sequence
    if (isIOSTablet()) {
      console.log(`iPad navigation to: ${path}`);
      
      // Try all methods one by one
      const methods = [
        {
          name: 'router.navigate',
          fn: () => router.navigate(routerPath)
        },
        {
          name: 'router.replace', 
          fn: () => router.replace(routerPath)
        },
        {
          name: 'ExpoLinking.openURL',
          fn: () => ExpoLinking.openURL(linkingPath)
        },
        {
          name: 'Linking.openURL',
          fn: () => Linking.openURL(linkingPath)
        }
      ];
      
      for (const method of methods) {
        try {
          console.log(`Trying navigation method: ${method.name}`);
          await method.fn();
          console.log(`Navigation succeeded with: ${method.name}`);
          return true;
        } catch (error) {
          console.log(`Navigation method ${method.name} failed:`, error);
          // Continue to next method
        }
      }
    } 
    // Phone or Android tablet
    else {
      try {
        // Try router first (expo-router)
        if (path === 'login' || path === '/login') {
          router.replace(routerPath);
        } else {
          router.navigate(routerPath);
        }
        return true;
      } catch (routerError) {
        console.log('Router navigation failed:', routerError);
        
        // Fallback to Expo Linking
        try {
          await ExpoLinking.openURL(linkingPath);
          return true;
        } catch (linkingError) {
          console.log('Expo Linking failed:', linkingError);
          
          // Last resort: React Native Linking
          await Linking.openURL(linkingPath);
          return true;
        }
      }
    }
    
    // If we get here, all navigation methods failed
    console.error('All navigation methods failed');
    return false;
  } catch (error) {
    console.error('Critical navigation error:', error);
    return false;
  }
}; 