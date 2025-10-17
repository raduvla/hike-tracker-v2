export const config = {
  api: {
    baseUrl: process.env.BACKEND_BASE_URL || 'http://localhost:3000',
    timeout: 30000,
  },
  // tracking: {
  //   updateInterval: 30000, // 30 seconds
  //   minDistance: 30, // 30 meters
  //   flushInterval: 60000, // 1 minute
  //   maxBufferSize: 100, // Maximum points before forced flush
  // },
  auth: {
    tokenStorageKey: 'auth_tokens',
    userStorageKey: 'user_data',
    sessionTimeout: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
  validation: {
    minPasswordLength: 6,
    minUsernameLength: 3,
    maxUsernameLength: 20,
  },
  map: {
    defaultLocation: [-122.084, 37.4219983] as [number, number],
    defaultZoom: 15,
    tileUrl: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  },
};

export type Config = typeof config;