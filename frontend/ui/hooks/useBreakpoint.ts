import { useWindowDimensions } from 'react-native';
import { breakpoints } from '../breakpoints';

// Hook to determine current device breakpoint (mobile, tablet, desktop)
export function useBreakpoint() {
  const { width } = useWindowDimensions();
  return {
    isMobile: width < breakpoints.tablet,
    isTablet: width >= breakpoints.tablet && width < breakpoints.desktop,
    isDesktop: width >= breakpoints.desktop,
  };
}
// Usage: const { isMobile, isTablet, isDesktop } = useBreakpoint(); 