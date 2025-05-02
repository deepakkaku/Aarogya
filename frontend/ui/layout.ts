import { StyleSheet, Platform, useWindowDimensions } from 'react-native';
import { colors } from './colors';

// Sidebar width for persistent drawer
export const SIDEBAR_WIDTH = 260;

// Common layout styles for containers and centralized content
export const layout = StyleSheet.create({
  // Standard container with padding and background
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF9EC', // Use colors.background if importing colors
  },
  // Centered content (both vertically and horizontally)
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// Responsive container style hook for main content
export function useResponsiveContainerStyle() {
  const { width } = useWindowDimensions();
  const isDesktop = Platform.OS === 'web' || width > 768;
  return [
    {
      flex: 1,
      marginTop: isDesktop ? 24 : 0,
      marginRight: isDesktop ? 24 : 0,
      marginBottom: isDesktop ? 24 : 0,
      marginLeft: isDesktop ? SIDEBAR_WIDTH + 24 : 0,
      backgroundColor: colors.background,
    },
  ];
}
// Usage: const containerStyle = useResponsiveContainerStyle(); 