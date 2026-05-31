import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import toast from 'react-hot-toast';

// In-memory user map for demo purposes
const USERS: Record<string, { password: string; profile: UserProfile }> = {
  'nalalie@example.com': {
    password: 'password123',
    profile: {
      ...DEFAULT_PROFILE,
      firstName: 'Nalalie',
      lastName: 'User',
      email: 'nalalie@example.com',
    },
  },
};

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  passportNumber: string;
  passportExpiry: string;
  tsaPreCheck: string;
  frequentFlyerNumber: string;
  tier: 'Silver' | 'Gold' | 'Platinum' | 'General';
  milesBalance: number;
  dietaryPreference: string;
  savedCard: {
    brand: string;
    last4: string;
    expiry: string;
  } | null;
}

export interface UserStore {
  profile: UserProfile;
  isLoggedIn: boolean;
  updateProfile: (updates: Partial<UserProfile>) => void;
  addMiles: (miles: number) => void;
  login: (creds: { email: string; password: string }) => void;
  logout: () => void;
}

const DEFAULT_PROFILE: UserProfile = {
  firstName: 'Laurence',
  lastName: 'Vantage',
  email: 'CAPSTONE@CONSULTANT.COM',
  phone: '+1 (555) 019-2834',
  passportNumber: 'P9847120',
  passportExpiry: '2031-10-15',
  tsaPreCheck: 'TSA9837120A',
  frequentFlyerNumber: 'VF-88371-20',
  tier: 'Gold',
  milesBalance: 84250,
  dietaryPreference: 'Vegetarian (VGML)',
  savedCard: {
    brand: 'Visa',
    last4: '4120',
    expiry: '12/28',
  },
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      profile: DEFAULT_PROFILE,
      isLoggedIn: false, // default to logged out

      updateProfile: (updates) =>
        set((state) => ({
          profile: { ...state.profile, ...updates },
        })),

      addMiles: (miles) =>
        set((state) => ({
          profile: {
            ...state.profile,
            milesBalance: state.profile.milesBalance + miles,
          },
        })),

      login: ({ email, password }) => {
  const entry = USERS[email];
  if (entry && entry.password === password) {
    set({ isLoggedIn: true, profile: entry.profile });
    toast.success('Logged in successfully');
  } else {
    toast.error('Invalid email or password');
  }
},
      logout: () => set({ isLoggedIn: false }),
    }),
    {
      name: 'vantage-user-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
