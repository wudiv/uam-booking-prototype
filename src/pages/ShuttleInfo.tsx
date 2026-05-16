import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Bus, 
  ChevronRight 
} from 'lucide-react';
import { MapBackground } from '../components/MapBackground';
import { useBookingStore } from '../store/useBookingStore';

function subtractMinutes(timeStr: string, minsToSubtract: number) {
  const [hours, mins] = timeStr.split(':').map(Number);
  let totalMins = hours * 60 + mins - minsToSubtract;
  if (totalMins < 0) totalMins += 24 * 60;
  const h = Math.floor(totalMins / 60);
  const m = totalMins % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

export function ShuttleInfo() {
  const navigate = useNavigate();
  const { selectedFlight, fromPad } = useBookingStore();

  const departure = selectedFlight?.departureTime || '14:45';
  const timeStart = subtractMinutes(departure, 15);
  const timeArrival = subtractMinutes(departure, 7);
  const timeVerify = subtractMinutes(departure, 5);

  const timeFlight = departure;

  return (
    <div className="w-full h-full flex flex-col bg-white text-on-surface font-body">
      {/* Header */}
      <header className="shrink-0 flex items-center justify-between px-gutter h-14 border-b border-outline/5 z-20">
        <button 
          onClick={() => navigate(-1)}
          aria-label="返回上一页"
          className="p-2 -ml-2 hover:bg-surface-variant transition-colors rounded-full"
        >
          <ArrowLeft size={24} strokeWidth={1.5} />
        </button>
        <h1 className="text-display-sm font-bold">行程追踪</h1>
        <div className="w-10"></div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto no-scrollbar pb-24">
        {/* Map Background Container */}
        <div className="h-[300px] w-full relative">
          <MapBackground mode="shuttle" />
          {/* Bottom fade out to content */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
        </div>

        {/* Content Details */}
        <div className="px-gutter -mt-10 relative z-10 flex flex-col gap-6">
          {/* Route Summary Card */}
          <div className="bg-white border border-outline/10 rounded-xl p-5 shadow-uber-1 flex items-center justify-between">
            <div className="flex flex-col flex-1">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">接驳起点</span>
              <span className="text-display-sm font-bold leading-tight">福田 CBD</span>
            </div>
            
            <div className="flex-1 flex flex-col items-center px-4">
              <div className="w-full border-t border-dashed border-outline/30"></div>
              <div className="w-2 h-2 bg-primary rounded-full mt-[-5px]"></div>
            </div>
            
            <div className="flex flex-col flex-1 text-right">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">起降点</span>
              <span className="text-display-sm font-bold leading-tight text-primary">{fromPad || '福田起降点'}</span>
            </div>
          </div>

          {/* Real-time Status Card */}
          <div className="bg-primary text-on-primary rounded-xl p-5 flex items-center justify-between shadow-uber-2">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Bus size={24} strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-label-sm font-medium opacity-80 uppercase tracking-widest">接驳车状态</div>
                <div className="text-display-sm font-bold">专车已派往起点</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-display-md font-bold">4</div>
              <div className="text-[10px] font-bold opacity-80">分钟到达</div>
            </div>
          </div>

          {/* Timeline Module */}
          <section className="mt-2 pb-10">
            <h2 className="text-label-sm font-bold text-on-surface-variant uppercase tracking-widest mb-6 px-1">后续行程</h2>
            <div className="relative pl-10 space-y-8">
              {/* Vertical Progress Line */}
              <div className="absolute left-[19px] top-2 bottom-2 w-[2px] bg-surface-variant"></div>
              
              {/* Step 1: Active Tracking */}
              <div className="relative">
                <div className="absolute -left-[26px] top-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-uber-1 ring-4 ring-white">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-body-md font-bold">专车接驳上车</h3>
                    <p className="text-label-sm text-on-surface-variant">请在福田卓越中心 A1 门等候</p>
                  </div>
                  <span className="text-label-md font-bold">{timeStart}</span>
                </div>
              </div>

              {/* Step 2: Upcoming */}
              <div className="relative opacity-40">
                <div className="absolute -left-[26px] top-1 w-6 h-6 bg-white border-2 border-outline rounded-full flex items-center justify-center ring-4 ring-white">
                  <div className="w-2 h-2 bg-outline rounded-full"></div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-body-md font-bold">到达起降点</h3>
                    <p className="text-label-sm">预计准点到达福田起降点</p>
                  </div>
                  <span className="text-label-md font-bold">{timeArrival}</span>
                </div>
              </div>

              {/* Step 3: Upcoming */}
              <div className="relative opacity-40">
                <div className="absolute -left-[26px] top-1 w-6 h-6 bg-white border-2 border-outline rounded-full flex items-center justify-center ring-4 ring-white">
                  <div className="w-2 h-2 bg-outline rounded-full"></div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-body-md font-bold">身份与安检核验</h3>
                    <p className="text-label-sm">请提前准备好有效身份证件</p>
                  </div>
                  <span className="text-label-md font-bold">{timeVerify}</span>
                </div>
              </div>

              {/* Step 4: Final Leg */}
              <div className="relative opacity-40">
                <div className="absolute -left-[26px] top-1 w-6 h-6 bg-white border-2 border-outline rounded-full flex items-center justify-center ring-4 ring-white">
                  <div className="w-2 h-2 bg-outline rounded-full"></div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-body-md font-bold">UAM 航班起飞</h3>
                    <p className="text-label-sm">UAM-B302 航班准时起飞</p>
                  </div>
                  <span className="text-label-md font-bold">{timeFlight}</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Sticky Action Button */}
      <footer className="fixed bottom-0 left-0 right-0 p-gutter pb-safe bg-white border-t border-outline/10 z-30">
        <button 
          onClick={() => navigate('/booking-success')}
          className="w-full h-14 bg-primary text-on-primary rounded-pill flex items-center justify-center gap-3 active:scale-[0.98] transition-transform shadow-uber-3"
        >
          <span className="text-label-lg font-bold">查看电子登机牌</span>
          <ChevronRight size={20} strokeWidth={2.5} />
        </button>
      </footer>
    </div>
  );
}
