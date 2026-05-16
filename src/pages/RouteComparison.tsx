import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Bell, 
  Clock, 
  PlaneTakeoff, 
  Car, 
  Train,
  ChevronRight
} from 'lucide-react';
import { MapBackground } from '../components/MapBackground';
import { useBookingStore } from '../store/useBookingStore';
import { StaggeredList } from '../components/animations/StaggeredList';
import { RouteCard } from '../components/RouteCard';

export function RouteComparison() {
  const navigate = useNavigate();
  const { bookingDate, passengerCount } = useBookingStore();
  const timeString = `${bookingDate.getHours().toString().padStart(2, '0')}:${bookingDate.getMinutes().toString().padStart(2, '0')}`;

  return (
    <div className="bg-background text-on-surface w-full h-full overflow-hidden relative font-body">
      {/* Background Map Layer */}
      <div className="absolute inset-0 z-0">
        <MapBackground mode="comparison" />
        <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
      </div>
      
      {/* TopAppBar - Minimalist */}
      <header className="bg-white/95 backdrop-blur-md border-b border-outline/5 absolute top-0 left-0 w-full z-50 flex flex-col">
        <div className="flex items-center justify-between px-gutter h-14">
          <button 
            onClick={() => navigate(-1)}
            aria-label="返回上一页"
            className="p-2 -ml-2 text-primary hover:bg-surface-variant transition-colors rounded-full"
          >
            <ArrowLeft size={24} strokeWidth={1.5} />
          </button>
          <h1 className="text-display-sm font-bold tracking-tight">方案对比</h1>
          <button 
            aria-label="打开通知"
            className="p-2 -mr-2 text-primary hover:bg-surface-variant transition-colors rounded-full"
          >
            <Bell size={22} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* Main Content as a Shorter Bottom Sheet */}
      <main className="absolute inset-x-0 bottom-0 top-[55%] z-10 flex flex-col items-center">
        <div className="w-full h-full bg-white shadow-uber-3 rounded-t-3xl flex flex-col relative overflow-hidden border-t border-outline/10">
          {/* Drag Handle */}
          <div className="w-full flex justify-center pt-3 pb-1 shrink-0">
            <div className="w-10 h-1 bg-surface-variant rounded-full"></div>
          </div>
          
          <div className="px-gutter pt-4 pb-6 shrink-0">
            <h2 className="text-display-md font-bold">选择出行方案</h2>
            <div className="flex items-center gap-2 mt-2 text-on-surface-variant">
              <Clock size={16} strokeWidth={2} />
              <p className="text-label-md font-medium">今天 {timeString} · {passengerCount} 名乘客</p>
            </div>
          </div>
          
          {/* Scrollable List */}
          <StaggeredList className="flex-1 overflow-y-auto px-gutter space-y-stack-md pb-32 no-scrollbar" staggerDelay={0.08}>
            <RouteCard
              icon={PlaneTakeoff}
              title="UAM 空中快线"
              badge="最快方案"
              duration="18分钟"
              price={268}
              isHighlight
              savingsLabel="节省 46m"
              onClick={() => navigate('/flight-selection')}
            />
            
            <RouteCard
              icon={Car}
              title="网约车直达"
              category="地面"
              duration="52分钟"
              price={96}
              onClick={() => {}}
            />
            
            <RouteCard
              icon={Train}
              title="地铁+机场快线"
              category="经济"
              duration="64分钟"
              price={37}
              onClick={() => {}}
            />
          </StaggeredList>
          
          {/* Footer CTA */}
          <div className="absolute bottom-0 left-0 w-full bg-white/95 backdrop-blur-sm border-t border-outline/10 px-gutter py-5 pb-safe z-20">
            <button 
              onClick={() => navigate('/flight-selection')}
              aria-label="选择 UAM 空中快线，进入订票流程"
              className="w-full h-14 bg-primary text-on-primary rounded-pill text-label-lg font-bold flex items-center justify-center gap-2 shadow-uber-3 active:scale-[0.98] transition-transform"
            >
              <span>进入 UAM 订票流程</span>
              <ChevronRight size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
