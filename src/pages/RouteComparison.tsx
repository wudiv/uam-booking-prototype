import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ChevronRight,
  Car,
  Plane
} from 'lucide-react';
import { MapBackground } from '../components/MapBackground';
import { Button } from '../components/Button';
import { useBookingStore } from '../store/useBookingStore';

export function RouteComparison() {
  const navigate = useNavigate();
  const { bookingDate, toPad } = useBookingStore();
  const timeString = `${bookingDate.getHours().toString().padStart(2, '0')}:${bookingDate.getMinutes().toString().padStart(2, '0')}`;

  // 根据 toPad 映射到 destinationId
  const getDestinationId = () => {
    if (toPad.includes('机场')) return 'airport';
    if (toPad.includes('北站')) return 'north_station';
    if (toPad.includes('蛇口')) return 'shekou';
    return 'airport';
  };
  const destinationId = getDestinationId();

  // 基于真实距离的路线数据
  const routeData: Record<string, { 
    flightMin: number; pickupMin: number; dropoffMin: number; 
    uamPrice: number; carPrice: string; carMin: number; blackPrice: number; blackMin: number;
    distance: string;
  }> = {
    airport: {
      // 福田→宝安机场：直线~15km
      flightMin: 11, pickupMin: 6, dropoffMin: 4,
      uamPrice: 268, carPrice: '91-115', carMin: 52, blackPrice: 156, blackMin: 45,
      distance: '15km',
    },
    north_station: {
      // 福田→深圳北站：直线~8km
      flightMin: 6, pickupMin: 4, dropoffMin: 3,
      uamPrice: 168, carPrice: '35-50', carMin: 25, blackPrice: 78, blackMin: 20,
      distance: '8km',
    },
    shekou: {
      // 福田→蛇口邮轮中心：直线~17km
      flightMin: 12, pickupMin: 5, dropoffMin: 5,
      uamPrice: 298, carPrice: '95-130', carMin: 55, blackPrice: 168, blackMin: 48,
      distance: '17km',
    },
  };

  const route = routeData[destinationId] || routeData.airport;
  const totalUamMin = route.pickupMin + route.flightMin + route.dropoffMin;

  // 计算网约车预计接客时间（正确处理分钟进位）
  const carPickupDate = new Date(bookingDate);
  carPickupDate.setMinutes(carPickupDate.getMinutes() + 5);
  const carPickupTime = `${carPickupDate.getHours().toString().padStart(2, '0')}:${carPickupDate.getMinutes().toString().padStart(2, '0')}`;

  return (
    <div className="bg-background text-on-surface w-full h-full flex flex-col overflow-hidden font-body">
      
      {/* === 上半部分：地图区域 === */}
      <div className="relative h-[42%] shrink-0">
        <MapBackground mode="comparison" destinationId={destinationId} />
        
        {/* 浮动返回按钮 */}
        <button 
          onClick={() => navigate(-1)}
          aria-label="返回上一页"
          className="absolute left-4 z-50 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-uber-2 active:scale-95 transition-transform"
          style={{ top: 'calc(var(--safe-area-top) + 12px)' }}
        >
          <ArrowLeft size={20} strokeWidth={2.5} />
        </button>
      </div>

      {/* === 下半部分：选择列表 === */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        
        {/* 标题 */}
        <div className="text-center py-4 shrink-0">
          <h2 className="text-body-lg font-bold">选择出行方案</h2>
        </div>

        {/* 可滚动列表 */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-4">
          
          {/* UAM Air 卡片 (选中态) */}
          <div 
            onClick={() => navigate('/flight-selection')}
            className="w-full text-left rounded-xl p-4 border-2 border-primary cursor-pointer active:scale-[0.99] transition-transform mb-2"
          >
            {/* 第一行：图标 + 名称 + 价格 */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shrink-0">
                <Plane size={16} strokeWidth={2} className="text-white rotate-45" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-body-md font-bold">UAM 空中快线</h3>
                  <span className="text-body-md font-bold">¥{route.uamPrice}</span>
                </div>
                <p className="text-label-sm text-on-surface-variant mt-0.5">
                  {timeString} 起乘 · eVTOL 飞行
                </p>
              </div>
            </div>
            
            {/* 第二行：行程段落 */}
            <div className="mt-3 flex items-center gap-1 text-label-sm text-on-surface-variant">
              <Car size={14} strokeWidth={2} />
              <span>{route.pickupMin}分钟</span>
              <ChevronRight size={12} className="text-outline" />
              <span className="font-bold text-on-surface">✈ {route.flightMin}分钟</span>
              <ChevronRight size={12} className="text-outline" />
              <Car size={14} strokeWidth={2} />
              <span>{route.dropoffMin}分钟</span>
            </div>
            <p className="text-caption text-on-surface-variant mt-1">
              eVTOL 飞行 + 专车接送 · 全程约{totalUamMin}分钟
            </p>
          </div>

          {/* 分割线 */}
          <div className="h-px bg-outline-variant mx-2"></div>

          {/* 网约车 */}
          <div className="w-full flex items-center gap-3 py-4 px-2 cursor-pointer active:bg-surface-variant/50 transition-colors rounded-lg">
            <div className="w-9 h-9 rounded-full bg-surface-variant flex items-center justify-center shrink-0">
              <Car size={16} strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-body-md font-bold">网约车</h3>
                <span className="text-body-md font-bold">¥{route.carPrice}</span>
              </div>
              <p className="text-label-sm text-on-surface-variant mt-0.5">
                {carPickupTime} 接客 · {route.carMin}分钟
              </p>
            </div>
          </div>

          {/* 分割线 */}
          <div className="h-px bg-outline-variant mx-2"></div>

          {/* 豪华车 */}
          <div className="w-full flex items-center gap-3 py-4 px-2 cursor-pointer active:bg-surface-variant/50 transition-colors rounded-lg">
            <div className="w-9 h-9 rounded-full bg-on-surface flex items-center justify-center shrink-0">
              <Car size={16} strokeWidth={2} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-body-md font-bold">豪华车</h3>
                <span className="text-body-md font-bold">¥{route.blackPrice}</span>
              </div>
              <p className="text-label-sm text-on-surface-variant mt-0.5">
                {carPickupTime} 接客 · {route.blackMin}分钟
              </p>
            </div>
          </div>
        </div>

        {/* === 底部固定区域 === */}
        <div className="shrink-0 border-t border-outline-variant px-4 py-4 pb-safe">
          {/* CTA 按钮 */}
          <Button 
            size="full"
            shape="pill"
            onClick={() => navigate('/flight-selection')}
          >
            选择 UAM 空中快线 · ¥{route.uamPrice}
          </Button>
        </div>
      </div>
    </div>
  );
}
