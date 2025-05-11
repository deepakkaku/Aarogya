import { supabase } from './supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const AUTH_TOKEN_KEY = 'aarogyadesk_auth_token';

// In-memory fallback storage for simulators or when AsyncStorage fails
let memoryStorage: { [key: string]: string } = {};

/**
 * Stores the session token in AsyncStorage for use with FAST API calls
 */
export const storeSessionToken = async () => {
  try {
    const { data } = await supabase.auth.getSession();
    
    if (data.session?.access_token) {
      try {
        await AsyncStorage.setItem(AUTH_TOKEN_KEY, data.session.access_token);
      } catch (storageError) {
        console.log('AsyncStorage failed, using memory storage:', storageError);
        // Fallback to memory storage if AsyncStorage fails (common in simulators)
        memoryStorage[AUTH_TOKEN_KEY] = data.session.access_token;
      }
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error storing token:', error);
    return false;
  }
};

/**
 * Gets the stored auth token for API requests
 */
export const getAuthToken = async (): Promise<string | null> => {
  try {
    // Try AsyncStorage first
    const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    if (token) return token;
    
    // Fallback to memory storage
    return memoryStorage[AUTH_TOKEN_KEY] || null;
  } catch (error) {
    console.log('AsyncStorage get failed, using memory storage:', error);
    // If AsyncStorage fails, try memory storage
    return memoryStorage[AUTH_TOKEN_KEY] || null;
  }
};

/**
 * Clears the stored auth token (used during logout)
 */
export const clearAuthToken = async (): Promise<void> => {
  try {
    // Clear from AsyncStorage
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
  } catch (error) {
    console.log('AsyncStorage remove failed:', error);
  }
  
  // Always clear from memory storage too
  delete memoryStorage[AUTH_TOKEN_KEY];
};

/**
 * Returns authorization headers for FAST API calls
 */
export const getAuthHeaders = async () => {
  const token = await getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}; 