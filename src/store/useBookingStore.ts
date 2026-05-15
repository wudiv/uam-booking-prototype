import { create } from 'zustand';

export interface Flight {
  id: string;
  name: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  seats: number;
  onTimeRate?: string;
  recommended?: boolean;
}

export interface ShuttleService {
  type: 'pickup' | 'dropoff';
  mode: 'car' | 'walk' | 'none';
  price?: number;
  duration?: string;
  distance?: string;
}

interface BookingState {
  // Origin & Destination
  origin: string;
  destination: string;
  setDestination: (dest: string) => void;
  
  // Selected Flight
  selectedFlight: Flight | null;
  setSelectedFlight: (flight: Flight) => void;
  
  // Shuttle Preferences
  pickupService: ShuttleService;
  setPickupService: (service: ShuttleService) => void;
  dropoffService: ShuttleService;
  setDropoffService: (service: ShuttleService) => void;
  
  // Passengers
  passengerCount: number;
  setPassengerCount: (count: number) => void;

  // Actions
  resetBooking: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  origin: '福田 CBD · 卓越中心',
  destination: '',
  setDestination: (dest) => set({ destination: dest }),
  
  selectedFlight: null,
  setSelectedFlight: (flight) => set({ selectedFlight: flight }),
  
  pickupService: { type: 'pickup', mode: 'none' },
  setPickupService: (service) => set({ pickupService: service }),
  
  dropoffService: { type: 'dropoff', mode: 'none' },
  setDropoffService: (service) => set({ dropoffService: service }),
  
  passengerCount: 1,
  setPassengerCount: (count) => set({ passengerCount: count }),
  
  resetBooking: () => set({
    destination: '',
    selectedFlight: null,
    pickupService: { type: 'pickup', mode: 'none' },
    dropoffService: { type: 'dropoff', mode: 'none' },
    passengerCount: 1,
  }),
}));
