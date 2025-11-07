// Simple helper that works in React Native
const getEnvVar = (key: string, defaultValue: string = ''): string => {
  // Try React Native Config first
  try {
    // @ts-ignore - Dynamic require
    const RNConfig = require('react-native-config');
    if (RNConfig && RNConfig.default && RNConfig.default[key]) {
      return RNConfig.default[key];
    }
    if (RNConfig && RNConfig[key]) {
      return RNConfig[key];
    }
  } catch (e) {
    // Not in React Native, that's ok
  }
  
  // Fallback to process.env
  try {
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
      return process.env[key];
    }
  } catch (e) {
    // No process.env available
  }
  
  return defaultValue;
};

export const config = {
  api: {
    baseUrl: getEnvVar('BACKEND_BASE_URL', 'http://localhost:8083'),
    authServiceUrl: getEnvVar('AUTH_SERVICE_URL', 'http://localhost:8083/api/auth'),
    trackServiceUrl: getEnvVar('TRACK_SERVICE_URL', 'http://localhost:8084/api/tracks'),
    socialServiceUrl: getEnvVar('SOCIAL_SERVICE_URL', 'http://localhost:8085/api/social'),
    ingestServiceUrl: getEnvVar('INGEST_SERVICE_URL', 'http://localhost:8080/api/ingest'),
    timeout: 30000,
  },
  auth: {
    tokenStorageKey: 'auth_tokens',
    userStorageKey: 'user_data',
    sessionTimeout: 7 * 24 * 60 * 60 * 1000,
  },
  validation: {
    minPasswordLength: 6,
    minUsernameLength: 3,
    maxUsernameLength: 20,
  },
  map: {
    defaultLocation: [
      parseFloat(getEnvVar('DEFAULT_LON', '-122.084')),
      parseFloat(getEnvVar('DEFAULT_LAT', '37.4219983'))
    ] as [number, number],
    defaultZoom: 15,
    tileUrl: getEnvVar('MAP_TILE_URL', 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'),
  },
  tracking: {
    updateInterval: 5000,
    minDistance: 10,
    flushInterval: 60000,
    maxBufferSize: 100,
  },
  app: {
    name: getEnvVar('APP_NAME', 'TrackSter'),
    version: getEnvVar('APP_VERSION', '1.0.0'),
  },
};

export type Config = typeof config;