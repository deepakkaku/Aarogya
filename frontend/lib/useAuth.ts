import { useState, useEffect, useRef } from 'react';
import { supabase } from './supabase';
import { useRouter, useSegments } from 'expo-router';
import { clearAuthToken } from './authUtils';
import { Session } from '@supabase/supabase-js';
import { navigateTo } from './navigation';

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();
  
  // Use refs to track navigation status and prevent infinite redirects
  const isNavigatingRef = useRef(false);
  const initialCheckDoneRef = useRef(false);
  
  useEffect(() => {
    // Check for session on mount
    const checkSession = async () => {
      if (initialCheckDoneRef.current) return;
      
      setIsLoading(true);
      try {
        const { data } = await supabase.auth.getSession();
        setSession(data.session);
        
        const isLoginRoute = segments[0] === 'login';
        // Only redirect if not on login route and not authenticated
        if (!data.session && !isLoginRoute && !isNavigatingRef.current) {
          isNavigatingRef.current = true;
          navigateToLogin();
        }
        
        initialCheckDoneRef.current = true;
      } catch (error) {
        console.error("Error checking session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, updatedSession) => {
      const previousSessionStatus = !!session;
      const currentSessionStatus = !!updatedSession;
      
      // Only update state if session status has changed
      if (previousSessionStatus !== currentSessionStatus) {
        setSession(updatedSession);
        
        const isLoginRoute = segments[0] === 'login';
        
        // Only redirect when session status changes and we're not already navigating
        if (!updatedSession && !isLoginRoute && !isNavigatingRef.current) {
          isNavigatingRef.current = true;
          navigateToLogin();
        } else if (updatedSession && isLoginRoute && !isNavigatingRef.current) {
          isNavigatingRef.current = true;
          navigateToHome();
        }
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [segments]);

  // Use our dedicated navigation utility for login navigation
  const navigateToLogin = async () => {
    console.log('Navigating to login screen...');
    
    try {
      // Try to navigate using our robust utility
      const success = await navigateTo('/login', router);
      
      if (!success) {
        // If all navigation methods fail, at least update local UI state
        console.log('Navigation failed, forcing UI update');
        setSession(null);
      }
    } catch (error) {
      console.error('Login navigation error:', error);
      // Force UI update as a last resort
      setSession(null);
    }
    
    // Reset navigation flag after a delay to prevent multiple redirects
    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 1000);
  };

  // Use our dedicated navigation utility for home navigation
  const navigateToHome = async () => {
    console.log('Navigating to home screen...');
    
    try {
      // Try to navigate using our robust utility
      const success = await navigateTo('/', router);
      
      if (!success) {
        // If all navigation methods fail, at least update local UI state
        console.log('Navigation failed, attempting UI refresh');
      }
    } catch (error) {
      console.error('Home navigation error:', error);
    }
    
    // Reset navigation flag after a delay to prevent multiple redirects
    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 1000);
  };

  // Logout function with multiple fallbacks
  const logout = async () => {
    if (isNavigatingRef.current) return; // Prevent multiple logout attempts
    
    try {
      isNavigatingRef.current = true;
      
      console.log('Logging out...');
      
      // First, clear the stored auth token
      await clearAuthToken();
      
      // Then sign out from Supabase
      await supabase.auth.signOut();
      
      console.log('Supabase signOut complete, redirecting to login...');
      
      // Force UI update first
      setSession(null);
      
      // Then try navigation with a slight delay to allow state updates
      setTimeout(async () => {
        await navigateToLogin();
      }, 100);
      
    } catch (error) {
      console.error("Error during logout:", error);
      isNavigatingRef.current = false;
      
      // Even with errors, force UI update and try to navigate away
      setSession(null);
      
      setTimeout(async () => {
        await navigateToLogin();
      }, 100);
    }
  };

  return {
    session,
    isLoading,
    isAuthenticated: !!session,
    logout,
  };
} 