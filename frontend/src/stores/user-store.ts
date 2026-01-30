/**
 * User Store - Fashion AI
 * Extended user information and measurements
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Measurements {
  height?: number;
  weight?: number;
  chest?: number;
  bust?: number;
  waist?: number;
  hips?: number;
  shoeSize?: number;
}

interface Preferences {
  style?: string[];
  styles?: string[];
  colors?: string[];
  favoriteColors?: string[];
  preferredSizes?: string[];
  occasions?: string[];
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

interface UserState {
  measurements: Measurements;
  preferences: Preferences;
  setMeasurements: (measurements: Partial<Measurements>) => void;
  setPreferences: (preferences: Partial<Preferences>) => void;
  clearUserData: () => void;
}

const defaultPreferences: Preferences = {
  style: [],
  favoriteColors: [],
  preferredSizes: [],
  notifications: {
    email: true,
    push: true,
    sms: false,
  },
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      measurements: {},
      preferences: defaultPreferences,
      setMeasurements: (measurements) =>
        set((state) => ({
          measurements: { ...state.measurements, ...measurements },
        })),
      setPreferences: (preferences) =>
        set((state) => ({
          preferences: { ...state.preferences, ...preferences },
        })),
      clearUserData: () =>
        set({
          measurements: {},
          preferences: defaultPreferences,
        }),
    }),
    {
      name: 'user-storage',
    }
  )
);
