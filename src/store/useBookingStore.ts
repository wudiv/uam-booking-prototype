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
  // 地点信息
  fromAddress: string;
  fromPad: string;
  toAddress: string;
  toPad: string;
  setDestination: (dest: string) => void;
  setOrigin: (origin: string) => void;
  
  // 航班信息
  selectedFlight: Flight | null;
  setSelectedFlight: (flight: Flight) => void;
  
  // 乘客和出行信息
  passengerCount: number;
  setPassengerCount: (count: number) => void;
  
  // 日期信息（获取当前真实日期）
  bookingDate: Date;
  
  // 接驳偏好
  pickupService: ShuttleService;
  setPickupService: (service: ShuttleService) => void;
  dropoffService: ShuttleService;
  setDropoffService: (service: ShuttleService) => void;

  // 操作
  resetBooking: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  fromAddress: '福田 CBD · 卓越中心',
  fromPad: '福田起降点',
  toAddress: '',
  toPad: '',
  
  setDestination: (dest) => {
    // 简单的起降点推导逻辑
    let pad = '大中华起降点'; // 默认
    if (dest.includes('机场') || dest.includes('T3')) {
      pad = '宝安机场起降点';
    } else if (dest.includes('北站')) {
      pad = '深圳北站起降点';
    } else if (dest.includes('蛇口')) {
      pad = '蛇口邮轮母港起降点';
    }
    set({ toAddress: dest, toPad: pad });
  },
  
  setOrigin: (origin) => set({ fromAddress: origin }),
  
  selectedFlight: null,
  setSelectedFlight: (flight) => set({ selectedFlight: flight }),
  
  passengerCount: 1,
  setPassengerCount: (count) => set({ passengerCount: count }),
  
  bookingDate: new Date(),
  
  pickupService: { type: 'pickup', mode: 'none' },
  setPickupService: (service) => set({ pickupService: service }),
  
  dropoffService: { type: 'dropoff', mode: 'none' },
  setDropoffService: (service) => set({ dropoffService: service }),
  
  resetBooking: () => set({
    toAddress: '',
    toPad: '',
    selectedFlight: null,
    pickupService: { type: 'pickup', mode: 'none' },
    dropoffService: { type: 'dropoff', mode: 'none' },
    passengerCount: 1,
    bookingDate: new Date(),
  }),
}));
