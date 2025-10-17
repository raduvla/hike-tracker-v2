// User types
export type User = {
  id: string;
  username: string;
  email: string;
  createdAt?: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type LoginRequest = {
  username: string;
  password: string;
};

export type SignupRequest = {
  username: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  user: User;
  tokens: AuthTokens;
};

// Location/Tracking types
export type Point = {
  hikerId: string;
  latitude: number;
  longitude: number;
  altitude?: number;
  recordedAt: string;
};

export type LocationUpdate = {
  latitude: number;
  longitude: number;
  altitude?: number;
  accuracy: number;
  timestamp: number;
};

export type TrackingSession = {
  id: string;
  userId: string;
  startTime: string;
  endTime?: string;
  points: Point[];
  distance?: number;
};

// API request/response types
export type IngestBatchRequest = {
  deviceId: string;
  batchId: string;
  idempotencyKey: string;
  points: Point[];
};

export type ApiError = {
  code: string;
  message: string;
  details?: any;
};

// Social auth types
export type SocialProvider = 'google' | 'facebook' | 'instagram';

export type SocialAuthRequest = {
  provider: SocialProvider;
  token: string;
};

// Legacy types for backward compatibility
export type LocationEvent = {
  hikerId: string;
  latitude: number;
  longitude: number;
  altitude?: number
  timestamp: string;
};

export type AlertEvent = {
  hikerId: string;
  type: string;
  message: string;
  timestamp: string;
};