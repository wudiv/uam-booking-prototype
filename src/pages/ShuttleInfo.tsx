import { useNavigate } from 'react-router-dom';
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
  const { selectedFlight, fromLocation, toLocation } = useBookingStore();

  const departure = selectedFlight?.departureTime || '14:45';
  const timeStart = subtractMinutes(departure, 15);
  const timeArrival = subtractMinutes(departure, 7);
  const timeVerify = subtractMinutes(departure, 5);

  return (
    <div className="w-full h-full min-h-[max(884px,100dvh)] flex flex-col relative bg-surface text-on-surface antialiased overflow-hidden select-none">
      {/* Map Base Layer */}
      <div className="absolute inset-0 z-0">
        <MapBackground mode="shuttle" />
        {/* Scrim for better top readability if needed */}
        <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-surface/80 to-transparent"></div>
      </div>

      {/* Task-Focused Header */}
      <header className="absolute top-0 left-0 w-full z-10 pt-safe px-container-padding flex items-center justify-between h-14 backdrop-blur-sm bg-surface/30">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-surface/80 shadow-sm text-on-surface backdrop-blur-md"
        >
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>arrow_back_ios_new</span>
        </button>
        <h1 className="text-headline-md font-headline-md text-on-surface drop-shadow-sm">前往起降点</h1>
        <div className="w-10 h-10"></div> {/* Spacer for center alignment */}
      </header>

      {/* Main Content Drawer — 约占屏幕 65%，留 35% 给地图 */}
      <div className="absolute bottom-0 left-0 w-full z-20 bg-surface rounded-t-[24px] shadow-[0_-12px_24px_0_rgba(0,0,0,0.08)] flex flex-col max-h-[65vh]">
        {/* Grabber */}
        <div className="w-full flex justify-center pt-3 pb-2 flex-shrink-0">
          <div className="w-8 h-1 bg-outline-variant rounded-full opacity-50"></div>
        </div>
        
        <div className="px-container-padding pb-safe flex-1 overflow-y-auto flex flex-col gap-stack-lg no-scrollbar">
          {/* Route Header */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex flex-col">
              <span className="text-label-sm font-label-sm text-on-surface-variant mb-1">当前位置</span>
              <span className="text-headline-md font-headline-md text-on-surface">{fromLocation?.name || '福田 CBD · 卓越中心'}</span>
            </div>
            <div className="flex-1 flex items-center justify-center px-4 opacity-40">
              <div className="h-[2px] border-b-2 border-dashed border-outline-variant w-full relative">
                <span className="material-symbols-outlined absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary bg-surface px-1">flight_takeoff</span>
              </div>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-label-sm font-label-sm text-on-surface-variant mb-1">目的地</span>
              <span className="text-headline-md font-headline-md text-primary">{toLocation?.name || '宝安机场起降点'}</span>
            </div>
          </div>

          {/* Shuttle Info Card */}
          <div className="bg-surface-container-low rounded-xl p-4 flex items-center justify-between border border-outline-variant/20 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-container/30 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">directions_bus</span>
              </div>
              <div>
                <div className="text-label-sm font-label-sm text-on-surface-variant">接驳点</div>
                <div className="text-body-lg font-body-lg text-on-surface font-medium">卓越中心东门</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-label-lg font-label-lg text-secondary">约 4 分钟</div>
              <div className="text-label-sm font-label-sm text-on-surface-variant">到达接驳点</div>
            </div>
          </div>

          {/* Timeline Module */}
          <div className="bg-surface-bright rounded-xl p-5 border border-surface-container-highest shadow-sm relative mt-2">
            {/* Vertical Line Base */}
            <div className="absolute left-[39px] top-8 bottom-8 w-[2px] bg-surface-container-highest"></div>
            
            <div className="flex flex-col gap-6">
              {/* Step 1: Active/Next Action */}
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-12 text-right pt-0.5">
                  <span className="text-label-lg font-label-lg text-primary">{timeStart}</span>
                </div>
                <div className="relative flex items-center justify-center w-6 h-6 mt-0.5">
                  {/* Glow effect */}
                  <div className="absolute w-6 h-6 bg-primary/20 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-primary rounded-full relative z-10 shadow-[0_0_0_4px_rgba(252,249,248,1)]"></div>
                </div>
                <div className="flex-1 pb-2">
                  <h3 className="text-label-lg font-label-lg text-on-surface">专车接驳上车</h3>
                  <p className="text-label-sm font-label-sm text-on-surface-variant mt-1">请在指定地点等候</p>
                </div>
              </div>

              {/* Step 2: Future */}
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-12 text-right pt-0.5">
                  <span className="text-label-lg font-label-lg text-on-surface-variant">{timeArrival}</span>
                </div>
                <div className="relative flex items-center justify-center w-6 h-6 mt-0.5">
                  <div className="w-2.5 h-2.5 rounded-full border-2 border-outline-variant bg-surface relative z-10 shadow-[0_0_0_4px_rgba(252,249,248,1)]"></div>
                </div>
                <div className="flex-1 pb-2">
                  <h3 className="text-label-lg font-label-lg text-on-surface-variant">到达起降点</h3>
                </div>
              </div>

              {/* Step 3: Future */}
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-12 text-right pt-0.5">
                  <span className="text-label-lg font-label-lg text-on-surface-variant">{timeVerify}</span>
                </div>
                <div className="relative flex items-center justify-center w-6 h-6 mt-0.5">
                  <div className="w-2.5 h-2.5 rounded-full border-2 border-outline-variant bg-surface relative z-10 shadow-[0_0_0_4px_rgba(252,249,248,1)]"></div>
                </div>
                <div className="flex-1 pb-2">
                  <h3 className="text-label-lg font-label-lg text-on-surface-variant">身份与安检核验</h3>
                </div>
              </div>

              {/* Step 4: Final */}
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-12 text-right pt-0.5">
                  <span className="text-label-lg font-label-lg text-on-surface-variant">{departure}</span>
                </div>
                <div className="relative flex items-center justify-center w-6 h-6 mt-0.5">
                  <span className="material-symbols-outlined text-outline-variant bg-surface rounded-full text-[16px] shadow-[0_0_0_4px_rgba(252,249,248,1)]">flight</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-label-lg font-label-lg text-on-surface-variant">航班起飞</h3>
                </div>
              </div>
            </div>
          </div>
          
          {/* Spacer for scroll padding */}
          <div className="h-6"></div>
        </div>

        {/* Sticky Bottom Action Area */}
        <div className="px-container-padding py-4 pb-safe bg-surface border-t border-outline-variant/10 flex-shrink-0">
          <button 
            onClick={() => navigate('/order-confirmation')}
            className="w-full h-12 bg-primary text-on-primary rounded-lg flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
          >
            <span className="text-label-lg font-label-lg">查看订单</span>
            <span className="material-symbols-outlined text-[18px]">receipt_long</span>
          </button>
        </div>
      </div>
    </div>
  );
}
