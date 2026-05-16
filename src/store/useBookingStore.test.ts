import { describe, it, expect, beforeEach } from 'vitest';
import { useBookingStore } from './useBookingStore';

describe('useBookingStore', () => {
  // 每个测试前重置 store
  beforeEach(() => {
    useBookingStore.getState().resetBooking();
  });

  describe('初始化', () => {
    it('应该使用默认值初始化', () => {
      const state = useBookingStore.getState();
      
      expect(state.fromAddress).toBe('福田 CBD · 卓越中心');
      expect(state.toAddress).toBe('深圳宝安国际机场 T3');
      expect(state.passengerCount).toBe(1);
      expect(state.selectedFlight).toBeNull();
      expect(state.selectedSeat).toBe('2A');
    });

    it('应该使用默认的接驳服务', () => {
      const state = useBookingStore.getState();
      
      expect(state.pickupService.type).toBe('pickup');
      expect(state.pickupService.mode).toBe('none');
      expect(state.dropoffService.type).toBe('dropoff');
      expect(state.dropoffService.mode).toBe('none');
    });
  });

  describe('setDestination', () => {
    it('应该设置机场目的地', () => {
      const { setDestination } = useBookingStore.getState();
      
      setDestination('宝安机场 T3');
      
      const state = useBookingStore.getState();
      expect(state.toAddress).toBe('宝安机场 T3');
      expect(state.toPad).toBe('宝安机场起降点');
    });

    it('应该设置深圳北站目的地', () => {
      const { setDestination } = useBookingStore.getState();
      
      setDestination('深圳北站');
      
      const state = useBookingStore.getState();
      expect(state.toAddress).toBe('深圳北站');
      expect(state.toPad).toBe('深圳北站起降点');
    });

    it('应该设置蛇口目的地', () => {
      const { setDestination } = useBookingStore.getState();
      
      setDestination('蛇口邮轮母港');
      
      const state = useBookingStore.getState();
      expect(state.toAddress).toBe('蛇口邮轮母港');
      expect(state.toPad).toBe('蛇口邮轮母港起降点');
    });

    it('其他目的地应使用默认起降点', () => {
      const { setDestination } = useBookingStore.getState();
      
      setDestination('未知地点');
      
      const state = useBookingStore.getState();
      expect(state.toAddress).toBe('未知地点');
      expect(state.toPad).toBe('大中华起降点');
    });
  });

  describe('setSelectedFlight', () => {
    it('应该设置选中的航班', () => {
      const flight = {
        id: 'UAM-001',
        name: 'UAM 空中快线',
        departureTime: '10:00',
        arrivalTime: '10:18',
        duration: '18分钟',
        price: 268,
        seats: 4,
      };
      
      useBookingStore.getState().setSelectedFlight(flight);
      
      const state = useBookingStore.getState();
      expect(state.selectedFlight).toEqual(flight);
    });
  });

  describe('passengerCount', () => {
    it('应该设置乘客数量', () => {
      useBookingStore.getState().setPassengerCount(3);
      
      expect(useBookingStore.getState().passengerCount).toBe(3);
    });
  });

  describe('接驳服务', () => {
    it('应该设置接机服务', () => {
      const pickup = { type: 'pickup' as const, mode: 'car' as const, price: 50 };
      
      useBookingStore.getState().setPickupService(pickup);
      
      const state = useBookingStore.getState();
      expect(state.pickupService.mode).toBe('car');
      expect(state.pickupService.price).toBe(50);
    });

    it('应该设置送机服务', () => {
      const dropoff = { type: 'dropoff' as const, mode: 'walk' as const };
      
      useBookingStore.getState().setDropoffService(dropoff);
      
      const state = useBookingStore.getState();
      expect(state.dropoffService.mode).toBe('walk');
    });
  });

  describe('selectedSeat', () => {
    it('应该设置选中的座位', () => {
      useBookingStore.getState().setSelectedSeat('3B');
      
      expect(useBookingStore.getState().selectedSeat).toBe('3B');
    });
  });

  describe('experimentalGroup', () => {
    it('应该设置实验组 (0)', () => {
      useBookingStore.getState().setExperimentalGroup(0);
      
      expect(useBookingStore.getState().experimentalGroup).toBe(0);
    });

    it('应该设置实验组 (7)', () => {
      useBookingStore.getState().setExperimentalGroup(7);
      
      expect(useBookingStore.getState().experimentalGroup).toBe(7);
    });

    it('应该设置实验组 (3)', () => {
      useBookingStore.getState().setExperimentalGroup(3);
      
      expect(useBookingStore.getState().experimentalGroup).toBe(3);
    });
  });

  describe('resetBooking', () => {
    it('应该重置预订数据但保留实验组', () => {
      // 设置自定义数据
      const store = useBookingStore.getState();
      store.setExperimentalGroup(5);
      store.setDestination('深圳北站');
      store.setPassengerCount(3);
      store.setPickupService({ type: 'pickup', mode: 'car' });
      
      // 重置
      useBookingStore.getState().resetBooking();
      
      const state = useBookingStore.getState();
      expect(state.toAddress).toBe('深圳宝安国际机场 T3'); // 重置为默认
      expect(state.passengerCount).toBe(1);                // 重置为默认
      expect(state.pickupService.mode).toBe('none');       // 重置为默认
      expect(state.experimentalGroup).toBe(5);             // 保留实验组
    });

    it('重置后 selectedFlight 应为 null', () => {
      const flight = {
        id: 'UAM-001',
        name: 'UAM',
        departureTime: '10:00',
        arrivalTime: '10:18',
        duration: '18m',
        price: 268,
        seats: 4,
      };
      
      useBookingStore.getState().setSelectedFlight(flight);
      useBookingStore.getState().resetBooking();
      
      expect(useBookingStore.getState().selectedFlight).toBeNull();
    });
  });
});
