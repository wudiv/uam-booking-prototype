import { create } from 'zustand';

/**
 * 用户信息相关的数据类型
 */
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

/**
 * 接驳服务配置
 */
export interface ShuttleService {
  type: 'pickup' | 'dropoff';
  mode: 'car' | 'walk' | 'none';
  price?: number;
  duration?: string;
  distance?: string;
}

/**
 * 2×2×2 实验设计配置
 * 
 * 用于 A/B 测试的实验分组，共 8 组 (0-7):
 * 
 * **维度 1: 路线推荐策略** (最快 vs 最省钱)
 * - 组 0, 1, 2, 3: 显示最快路线为首选
 * - 组 4, 5, 6, 7: 显示最省钱路线为首选
 * 
 * **维度 2: 支付时机** (预付 vs 后付)
 * - 组 0, 1, 4, 5: 显示预付选项 (支付页面)
 * - 组 2, 3, 6, 7: 显示后付选项 (完成后付费)
 * 
 * **维度 3: UI 信息密度** (紧凑 vs 宽松)
 * - 组 0, 2, 4, 6: 紧凑布局 (移动优化)
 * - 组 1, 3, 5, 7: 宽松布局 (信息充分)
 * 
 * @example
 * // 用户被分配到组 3
 * // 维度 1: 最快 (位 0 = 0)
 * // 维度 2: 后付 (位 1 = 1)
 * // 维度 3: 宽松 (位 2 = 1)
 * // 二进制: 011 = 3
 * 
 * @see ExperimentVariant 了解具体的变量设置
 */
export type ExperimentGroup = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

/**
 * 预订状态接口
 * 
 * 使用 Zustand 存储应用级别的预订数据
 * 确保整个预订流程中的数据一致性
 */
interface BookingState {
  // ============ 地点信息 ============
  /** 出发地址 */
  fromAddress: string;
  /** 出发地起降点 */
  fromPad: string;
  /** 目的地地址 */
  toAddress: string;
  /** 目的地起降点 */
  toPad: string;
  /** 设置目的地 */
  setDestination: (dest: string) => void;
  
  // ============ 航班信息 ============
  /** 用户选择的航班 */
  selectedFlight: Flight | null;
  /** 设置选中的航班 */
  setSelectedFlight: (flight: Flight) => void;
  
  // ============ 乘客和出行信息 ============
  /** 乘客数量 (1-4) */
  passengerCount: number;
  /** 设置乘客数量 */
  setPassengerCount: (count: number) => void;
  
  // ============ 日期信息 ============
  /** 预订日期 */
  bookingDate: Date;
  
  // ============ 接驳服务偏好 ============
  /** 接机服务配置 */
  pickupService: ShuttleService;
  /** 设置接机服务 */
  setPickupService: (service: ShuttleService) => void;
  /** 送机服务配置 */
  dropoffService: ShuttleService;
  /** 设置送机服务 */
  setDropoffService: (service: ShuttleService) => void;

  // ============ 选座信息 ============
  /** 选中的座位号 (如 "2A") */
  selectedSeat: string;
  /** 设置选中的座位 */
  setSelectedSeat: (seat: string) => void;

  // ============ 实验控制 ============
  /**
   * 用户被分配的实验组 (0-7)
   * @see ExperimentGroup 了解分组详情
   */
  experimentalGroup: ExperimentGroup;
  /** 设置实验组 (通常从 URL 参数读取) */
  setExperimentalGroup: (group: ExperimentGroup) => void;

  // ============ 操作 ============
  /** 重置预订信息 (保留实验组) */
  resetBooking: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  // 默认值
  fromAddress: '福田 CBD · 卓越中心',
  fromPad: '福田起降点',
  toAddress: '深圳宝安国际机场 T3',
  toPad: '宝安机场起降点',
  
  setDestination: (dest) => {
    let pad = '大中华起降点';
    if (dest.includes('机场') || dest.includes('T3')) {
      pad = '宝安机场起降点';
    } else if (dest.includes('北站')) {
      pad = '深圳北站起降点';
    } else if (dest.includes('蛇口')) {
      pad = '蛇口邮轮母港起降点';
    }
    set({ toAddress: dest, toPad: pad });
  },
  
  selectedFlight: null,
  setSelectedFlight: (flight) => set({ selectedFlight: flight }),
  
  passengerCount: 1,
  setPassengerCount: (count) => set({ passengerCount: count }),
  
  bookingDate: new Date(),
  
  pickupService: { type: 'pickup', mode: 'none' },
  setPickupService: (service) => set({ pickupService: service }),
  
  dropoffService: { type: 'dropoff', mode: 'none' },
  setDropoffService: (service) => set({ dropoffService: service }),

  selectedSeat: '2A',
  setSelectedSeat: (seat) => set({ selectedSeat: seat }),

  experimentalGroup: 0,
  setExperimentalGroup: (group) => set({ experimentalGroup: group }),
  
  resetBooking: () => set((state) => ({
    toAddress: '深圳宝安国际机场 T3',
    toPad: '宝安机场起降点',
    selectedFlight: null,
    pickupService: { type: 'pickup', mode: 'none' },
    dropoffService: { type: 'dropoff', mode: 'none' },
    passengerCount: 1,
    bookingDate: new Date(),
    selectedSeat: '2A',
    // 实验组在重置时保持不变，除非重新从 URL 加载
    experimentalGroup: state.experimentalGroup
  })),
}));
