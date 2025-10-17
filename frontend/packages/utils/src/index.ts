// Validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string, minLength: number = 6): boolean => {
  return password.length >= minLength;
};

export const validateUsername = (username: string, minLength: number = 3, maxLength: number = 20): boolean => {
  return username.length >= minLength && username.length <= maxLength;
};

// Formatting utilities
export const formatCoordinates = (lat: number, lon: number, alt: number): string => {
  return `${lat.toFixed(6)}, ${lon.toFixed(6)}, ${alt.toFixed(3)}`;
};

export const formatDistance = (meters: number): string => {
  if (meters < 1000) {
    return `${Math.round(meters)}m`;
  }
  return `${(meters / 1000).toFixed(2)}km`;
};

export const formatDuration = (milliseconds: number): string => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  }
  return `${seconds}s`;
};

// Distance calculation using Haversine formula (with altitude)
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
  alt1: number = 0,
  alt2: number = 0
): number => {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  // Haversine distance on Earth's surface
  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const surfaceDistance = R * c;

  // Include altitude difference
  const heightDiff = alt2 - alt1;
  const totalDistance = Math.sqrt(surfaceDistance ** 2 + heightDiff ** 2);

  return totalDistance; // in meters
};

// Calculate total path distance (with altitude)
export const calculatePathDistance = (
  points: Array<{ latitude: number; longitude: number; altitude?: number }>
): number => {
  if (points.length < 2) return 0;

  let totalDistance = 0;
  for (let i = 1; i < points.length; i++) {
    totalDistance += calculateDistance(
      points[i - 1].latitude,
      points[i - 1].longitude,
      points[i].latitude,
      points[i].longitude,
      points[i - 1].altitude ?? 0,
      points[i].altitude ?? 0
    );
  }
  return totalDistance;
};

// Calculate speed (m/s or km/h)
export const calculateSpeed = (distanceMeters: number, durationMs: number, unit: 'm/s' | 'km/h' = 'm/s'): number => {
  if (durationMs <= 0) return 0;
  const speedMps = distanceMeters / (durationMs / 1000); // meters per second
  return unit === 'km/h' ? speedMps * 3.6 : speedMps;
};

// Date utilities
export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString();
};

export const formatDateTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString();
};

// Storage utilities (generic, not platform-specific)
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};