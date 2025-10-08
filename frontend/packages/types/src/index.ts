export type LocationEvent = {
  hikerId: string;
  latitude: number;
  longitude: number;
  timestamp: string; // ISO
};

export type AlertEvent = {
  hikerId: string;
  type: string;
  message: string;
  timestamp: string; // ISO
};
