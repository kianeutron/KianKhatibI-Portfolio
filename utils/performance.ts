// Performance utilities

export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

export const isLowPerformanceDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Check if device has limited hardware
  const isMobileDevice = isMobile();
  const hasLimitedMemory = (navigator as any).deviceMemory ? (navigator as any).deviceMemory < 4 : false;
  const hasLimitedCores = navigator.hardwareConcurrency ? navigator.hardwareConcurrency < 4 : false;
  
  return isMobileDevice || hasLimitedMemory || hasLimitedCores;
};

export const getOptimalParticleCount = (): number => {
  if (isLowPerformanceDevice()) {
    return 20; // Minimal particles for low-end devices
  }
  return isMobile() ? 30 : 50; // Moderate for mobile, more for desktop
};

export const shouldReduceMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  return mediaQuery.matches;
};

