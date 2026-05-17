import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Bus, 
  ChevronRight 
} from 'lucide-react';
import { MapBackground } from '../components/MapBackground';
import { Button } from '../components/Button';
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
  const { selectedFlight, fromPad, fromAddress } = useBookingStore();

  const departure = selectedFlight?.departureTime || '14:45';
  const timeStart = subtractMinutes(departure, 15);
  const timeArrival = subtractMinutes(departure, 7);
  const timeFlight = departure;

  return (
    <div className="w-full h-full flex flex-col bg-white text-on-surface font-body">
      {/* Header */}
      <header className="shrink-0 flex items-center justify-between px-4 h-14 border-b border-outline/5 z-20">
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
        <div className="h-[200px] w-full relative">
          <MapBackground mode="shuttle" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
        </div>

        {/* Content Details */}
        <div className="px-4 -mt-6 relative z-10 flex flex-col gap-4">
          {/* Real-time Status Card - Combined route + status */}
          <div className="bg-primary text-on-primary rounded-xl p-4 shadow-uber-2">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <Bus size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-caption font-medium opacity-80">专车接驳中</div>
                  <div className="text-body-md font-bold">前往{fromPad}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-display-sm font-bold">4</div>
                <div className="text-caption font-bold opacity-80">分钟到达</div>
              </div>
            </div>
            <div className="flex items-center justify-between text-caption opacity-80 border-t border-white/20 pt-2">
              <span>{fromAddress}</span>
              <span>→</span>
              <span>{fromPad}</span>
            </div>
          </div>
          {/* Timeline */}
          <section className="pb-4">
            <h2 className="text-caption font-bold text-on-surface-variant uppercase tracking-widest mb-4 px-1">后续行程</h2>
            <div className="relative pl-8 space-y-5">
              {/* Vertical Progress Line */}
              <div className="absolute left-[15px] top-2 bottom-2 w-[1.5px] bg-surface-variant"></div>
              
              {/* Step 1: Active */}
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center ring-3 ring-white">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-label-md font-bold">专车接驳上车</h3>
                    <p className="text-caption text-on-surface-variant">请在{fromAddress}等候</p>
                  </div>
                  <span className="text-label-sm font-bold">{timeStart}</span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative opacity-40">
                <div className="absolute -left-[21px] top-1 w-5 h-5 bg-white border-2 border-outline rounded-full ring-3 ring-white"></div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-label-md font-bold">到达起降点</h3>
                    <p className="text-caption">到达{fromPad}，完成登机准备</p>
                  </div>
                  <span className="text-label-sm font-bold">{timeArrival}</span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative opacity-40">
                <div className="absolute -left-[21px] top-1 w-5 h-5 bg-white border-2 border-outline rounded-full ring-3 ring-white"></div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-label-md font-bold">UAM 航班起飞</h3>
                    <p className="text-caption">{selectedFlight?.name || 'UAM-X 204'} 准时起飞</p>
                  </div>
                  <span className="text-label-sm font-bold">{timeFlight}</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Sticky Action Button */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 pb-safe bg-white border-t border-outline/10 z-30">
        <Button 
          size="full"
          shape="pill"
          onClick={() => navigate('/booking-success')}
          rightIcon={<ChevronRight size={20} strokeWidth={2.5} />}
        >
          查看电子登机牌
        </Button>
      </footer>
    </div>
  );
}
