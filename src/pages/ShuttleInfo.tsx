import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Bus, 
  Plane,
  Info,
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
  const { selectedFlight, selectedSeat, fromPad, fromAddress } = useBookingStore();

  const departure = selectedFlight?.departureTime || '14:45';
  const timeStart = subtractMinutes(departure, 15);
  const timeArrival = subtractMinutes(departure, 7);
  const timeFlight = departure;

  return (
    <div className="w-full h-full flex flex-col bg-white text-on-surface font-body">
      {/* Header */}
      <header className="shrink-0 flex items-center justify-between px-4 h-14 border-b border-outline/5 z-20">
        <button 
          type="button"
          onClick={() => navigate(-1)}
          aria-label="返回上一页"
          className="p-2 -ml-2 hover:bg-surface-variant transition-colors rounded-full"
        >
          <ArrowLeft size={24} strokeWidth={1.5} />
        </button>
        <h1 className="text-display-sm font-bold">预订已确认</h1>
        <div className="w-10"></div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto no-scrollbar pb-24">
        {/* Map Background Container */}
        <div className="h-[220px] w-full relative">
          <MapBackground mode="shuttle" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
        </div>

        {/* Content Details */}
        <div className="px-4 -mt-6 relative z-10 flex flex-col gap-4">
          {/* Real-time Status Card */}
          <div className="bg-primary text-on-primary rounded-xl p-4 shadow-uber-2">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <Bus size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-caption font-medium opacity-80">专车接驳中</div>
                  <div className="text-body-md font-bold">正在前往您的位置</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-display-sm font-bold">4</div>
                <div className="text-caption font-bold opacity-80">分钟到达</div>
              </div>
            </div>
            <div className="flex items-center justify-between text-caption opacity-80 border-t border-white/20 pt-2">
              <span>粤B·A8821</span>
              <span>黑色 · 比亚迪汉</span>
            </div>
          </div>

          {/* Timeline */}
          <section className="pb-2">
            <h2 className="text-caption font-bold text-on-surface-variant uppercase tracking-widest mb-4 px-1">后续行程</h2>
            <div className="relative pl-8 space-y-5">
              <div className="absolute left-[9px] top-[22px] bottom-[22px] w-[1.5px] bg-surface-variant"></div>
              
              {/* Step 1: Active */}
              <div className="relative">
                <div className="absolute -left-8 top-[1px] w-5 h-5 bg-primary rounded-full flex items-center justify-center ring-[3px] ring-white">
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
                <div className="absolute -left-8 top-[1px] w-5 h-5 bg-white border-2 border-outline rounded-full ring-[3px] ring-white"></div>
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
                <div className="absolute -left-8 top-[1px] w-5 h-5 bg-white border-2 border-outline rounded-full ring-[3px] ring-white"></div>
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

          {/* Boarding Pass Card */}
          <section className="bg-white rounded-2xl shadow-uber-2 overflow-hidden border border-outline/10">
            {/* Pass Header */}
            <div className="bg-primary px-4 py-3 text-on-primary relative overflow-hidden">
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <div className="text-caption font-bold opacity-60 uppercase tracking-widest">电子登机牌</div>
                  <div className="text-body-md font-bold">{selectedFlight?.name || 'UAM-X 204'}</div>
                </div>
                <Plane size={28} className="opacity-20 rotate-45" strokeWidth={1} />
              </div>
            </div>

            {/* Pass Body */}
            <div className="p-4 relative bg-white">
              {/* Decorative Cutouts */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white"></div>
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white"></div>

              {/* Seat + Time Row */}
              <div className="flex justify-between items-center border-b border-dashed border-outline/20 pb-3 mb-3">
                <div>
                  <div className="text-caption font-bold text-on-surface-variant uppercase tracking-widest">座位</div>
                  <div className="text-display-sm font-bold">{selectedSeat || '2A'}</div>
                </div>
                <div className="text-center">
                  <div className="text-caption font-bold text-on-surface-variant uppercase tracking-widest">登机时间</div>
                  <div className="text-display-sm font-bold">{departure}</div>
                </div>
                <div className="text-right">
                  <div className="text-caption font-bold text-on-surface-variant uppercase tracking-widest">起降点</div>
                  <div className="text-label-sm font-bold">{fromPad}</div>
                </div>
              </div>

              {/* QR Code */}
              <div className="flex items-start gap-4">
                <div className="w-24 h-24 bg-white rounded-lg p-2 border border-outline/10 shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <rect width="100" height="100" fill="white"/>
                    <rect x="5" y="5" width="25" height="25" fill="black"/>
                    <rect x="10" y="10" width="15" height="15" fill="white"/>
                    <rect x="13" y="13" width="9" height="9" fill="black"/>
                    <rect x="70" y="5" width="25" height="25" fill="black"/>
                    <rect x="75" y="10" width="15" height="15" fill="white"/>
                    <rect x="78" y="13" width="9" height="9" fill="black"/>
                    <rect x="5" y="70" width="25" height="25" fill="black"/>
                    <rect x="10" y="75" width="15" height="15" fill="white"/>
                    <rect x="13" y="78" width="9" height="9" fill="black"/>
                    <rect x="35" y="5" width="5" height="5" fill="black"/>
                    <rect x="45" y="5" width="5" height="5" fill="black"/>
                    <rect x="55" y="5" width="5" height="5" fill="black"/>
                    <rect x="35" y="15" width="5" height="5" fill="black"/>
                    <rect x="50" y="15" width="5" height="5" fill="black"/>
                    <rect x="35" y="25" width="5" height="5" fill="black"/>
                    <rect x="45" y="25" width="5" height="5" fill="black"/>
                    <rect x="60" y="25" width="5" height="5" fill="black"/>
                    <rect x="5" y="35" width="5" height="5" fill="black"/>
                    <rect x="15" y="35" width="5" height="5" fill="black"/>
                    <rect x="25" y="35" width="5" height="5" fill="black"/>
                    <rect x="40" y="35" width="5" height="5" fill="black"/>
                    <rect x="55" y="35" width="5" height="5" fill="black"/>
                    <rect x="70" y="35" width="5" height="5" fill="black"/>
                    <rect x="85" y="35" width="5" height="5" fill="black"/>
                    <rect x="5" y="45" width="5" height="5" fill="black"/>
                    <rect x="20" y="45" width="5" height="5" fill="black"/>
                    <rect x="35" y="45" width="5" height="5" fill="black"/>
                    <rect x="50" y="45" width="5" height="5" fill="black"/>
                    <rect x="65" y="45" width="5" height="5" fill="black"/>
                    <rect x="80" y="45" width="5" height="5" fill="black"/>
                    <rect x="10" y="55" width="5" height="5" fill="black"/>
                    <rect x="25" y="55" width="5" height="5" fill="black"/>
                    <rect x="40" y="55" width="5" height="5" fill="black"/>
                    <rect x="55" y="55" width="5" height="5" fill="black"/>
                    <rect x="75" y="55" width="5" height="5" fill="black"/>
                    <rect x="90" y="55" width="5" height="5" fill="black"/>
                    <rect x="35" y="65" width="5" height="5" fill="black"/>
                    <rect x="50" y="65" width="5" height="5" fill="black"/>
                    <rect x="60" y="65" width="5" height="5" fill="black"/>
                    <rect x="80" y="65" width="5" height="5" fill="black"/>
                    <rect x="35" y="75" width="5" height="5" fill="black"/>
                    <rect x="45" y="75" width="5" height="5" fill="black"/>
                    <rect x="70" y="75" width="5" height="5" fill="black"/>
                    <rect x="85" y="75" width="5" height="5" fill="black"/>
                    <rect x="40" y="85" width="5" height="5" fill="black"/>
                    <rect x="55" y="85" width="5" height="5" fill="black"/>
                    <rect x="70" y="85" width="5" height="5" fill="black"/>
                    <rect x="80" y="85" width="5" height="5" fill="black"/>
                    <rect x="90" y="85" width="5" height="5" fill="black"/>
                  </svg>
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-start gap-1.5 text-on-surface-variant mb-1">
                    <Info size={12} className="text-primary shrink-0 mt-[2px]" />
                    <span className="text-caption font-bold leading-tight">请在起飞前 8 分钟到达起降点</span>
                  </div>
                  <p className="text-caption text-on-surface-variant pl-[18px]">出示此二维码完成登机</p>
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
          onClick={() => navigate('/questionnaire')}
          rightIcon={<ChevronRight size={20} strokeWidth={2.5} />}
        >
          下一步：填写问卷
        </Button>
      </footer>
    </div>
  );
}
