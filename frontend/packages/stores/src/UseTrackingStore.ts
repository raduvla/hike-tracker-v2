import { create } from 'zustand';
import type { Point } from '@hike-tracker/shared-types';
type TrackingMode = 'REAL_TIME' | 'MODERATE' | 'BATTERY_EFFICIENT';

type TrackingState = {
  hikerId: string;
  isTracking: boolean;
  buffer: Point[];
  sessionId: string | null;
  startTime: Date | null;
  trackingMode: TrackingMode;
  setHikerId: (id: string) => void;
  setTrackingMode: (mode: TrackingMode) => void;
  start: (sessionId?: string) => void;
  stop: () => void;
  pushPoint: (p: Point) => void;
  drainBuffer: () => Point[];
  reset: () => void;
};

export const useTrackingStore = create<TrackingState>((set, get) => ({
  hikerId: '',
  isTracking: false,
  buffer: [],
  sessionId: null,
  startTime: null,
  trackingMode: 'MODERATE',

  setHikerId: (id) => set({ hikerId: id }),

  setTrackingMode: (mode) => set({ trackingMode: mode }),

  start: (sessionId) =>
    set({
      isTracking: true,
      sessionId: sessionId || `session-${Date.now()}`,
      startTime: new Date(),
    }),

  stop: () =>
    set({
      isTracking: false,
      startTime: null,
    }),

  pushPoint: (p) =>
    set((state) => ({
      buffer: [...state.buffer, p],
    })),

  drainBuffer: () => {
    const out = get().buffer;
    set({ buffer: [] });
    return out;
  },

  reset: () =>
    set({
      hikerId: '',
      isTracking: false,
      buffer: [],
      sessionId: null,
      startTime: null,
      trackingMode: 'MODERATE',
    }),
}));