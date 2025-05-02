import { StyleSheet } from 'react-native';

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
// Usage: import { layout } from '../ui/layout' 