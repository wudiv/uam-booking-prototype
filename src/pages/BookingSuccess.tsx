import { useNavigate, Navigate } from 'react-router-dom';
import { 
  X, 
  CheckCircle2, 
  Plane, 
  MapPin, 
  ChevronRight,
  Info
} from 'lucide-react';
import { useBookingStore } from '../store/useBookingStore';
import { Button } from '../components/Button';
import { StaggeredList } from '../components/animations/StaggeredList';

export function BookingSuccess() {
  const navigate = useNavigate();
  const { selectedFlight, selectedSeat } = useBookingStore();

  if (!selectedFlight) return <Navigate to="/" replace />;

  return (
    <div className="w-full h-full flex flex-col bg-background text-on-surface font-body">
      {/* Minimalist Header */}
      <header className="flex-shrink-0 flex items-center justify-between px-4 h-14 bg-white/90 backdrop-blur-md sticky top-0 z-10 border-b border-outline/5">
        <button 
          onClick={() => navigate('/')}
          aria-label="关闭"
          className="p-2 -ml-2 text-primary hover:bg-surface-variant rounded-full transition-colors"
        >
          <X size={24} strokeWidth={1.5} />
        </button>
        <div className="flex items-center gap-2">
          <CheckCircle2 size={18} className="text-primary" />
          <h1 className="text-display-sm font-bold">预订已确认</h1>
        </div>
        <div className="w-10"></div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4 no-scrollbar">
        <StaggeredList className="space-y-4" staggerDelay={0.1}>
          {/* Boarding Pass Card - Compact */}
          <div className="bg-white rounded-2xl shadow-uber-2 overflow-hidden flex flex-col border border-outline/10">
            {/* Pass Header */}
            <div className="bg-primary px-4 py-4 text-on-primary relative overflow-hidden">
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <div className="text-caption font-bold opacity-60 uppercase tracking-widest">您的航班</div>
                  <div className="text-body-lg font-bold">{selectedFlight.name}</div>
                </div>
                <Plane size={32} className="opacity-20 rotate-45" strokeWidth={1} />
              </div>
            </div>

            {/* Pass Body */}
            <div className="p-4 relative bg-white">
              {/* Decorative Cutouts */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-background"></div>
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-background"></div>

              {/* Seat + Time Row */}
              <div className="flex justify-between items-center border-b border-dashed border-outline/20 pb-3 mb-3">
                <div>
                  <div className="text-caption font-bold text-on-surface-variant uppercase tracking-widest">座位</div>
                  <div className="text-display-sm font-bold">{selectedSeat || '2A'}</div>
                </div>
                <div className="text-center">
                  <div className="text-caption font-bold text-on-surface-variant uppercase tracking-widest">登机时间</div>
                  <div className="text-display-sm font-bold">{selectedFlight.departureTime}</div>
                </div>
                <div className="text-right">
                  <div className="text-caption font-bold text-on-surface-variant uppercase tracking-widest">起降点</div>
                  <div className="text-label-sm font-bold">福田起降点</div>
                </div>
              </div>

              {/* QR Code */}
              <div className="flex items-start gap-4">
                <div className="w-28 h-28 bg-white rounded-lg p-2 border border-outline/10 shrink-0 flex items-center justify-center">
                  {/* SVG QR Code placeholder */}
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <rect width="100" height="100" fill="white"/>
                    {/* QR pattern simulation */}
                    <rect x="5" y="5" width="25" height="25" fill="black"/>
                    <rect x="10" y="10" width="15" height="15" fill="white"/>
                    <rect x="13" y="13" width="9" height="9" fill="black"/>
                    <rect x="70" y="5" width="25" height="25" fill="black"/>
                    <rect x="75" y="10" width="15" height="15" fill="white"/>
                    <rect x="78" y="13" width="9" height="9" fill="black"/>
                    <rect x="5" y="70" width="25" height="25" fill="black"/>
                    <rect x="10" y="75" width="15" height="15" fill="white"/>
                    <rect x="13" y="78" width="9" height="9" fill="black"/>
                    {/* Data modules */}
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
                <div className="flex-1 pt-2">
                  <div className="flex items-start gap-1.5 text-on-surface-variant mb-1">
                    <Info size={12} className="text-primary shrink-0 mt-[2px]" />
                    <span className="text-caption font-bold leading-tight">请在起飞前 8 分钟到达起降点</span>
                  </div>
                  <p className="text-caption text-on-surface-variant pl-[18px]">出示此二维码完成登机</p>
                </div>
              </div>
            </div>
          </div>

          {/* Journey Tracking Section - Compact */}
          <section className="bg-white rounded-xl p-4 shadow-uber-1 border border-outline/10">
            <h2 className="text-label-md font-bold mb-4 flex items-center gap-2">
              <MapPin size={16} className="text-primary shrink-0" />
              <span>行程追踪</span>
            </h2>
            <div className="relative pl-7 space-y-4">
              <div className="absolute left-[7px] top-[18px] bottom-[18px] w-[1.5px] bg-surface-variant"></div>
              
              {[
                { label: '接驳车到达', desc: '预计 4 分钟后到达', active: true },
                { label: '到达起降点', desc: '完成登机准备' },
                { label: '出示证件', desc: '完成登记' },
                { label: '登机', desc: '进入 eVTOL 飞行器' },
                { label: '航班起飞', desc: `预计 ${selectedFlight.departureTime} 起飞` }
              ].map((step, idx) => (
                <div key={idx} className={`relative ${idx > 0 ? 'opacity-35' : ''}`}>
                  <div className={`absolute -left-7 top-[2px] w-4 h-4 rounded-full flex items-center justify-center ring-[2px] ring-white
                    ${idx === 0 ? 'bg-primary' : 'bg-surface-variant'}
                  `}>
                    {idx === 0 && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                  </div>
                  <div>
                    <h3 className="text-label-sm font-bold leading-tight">{step.label}</h3>
                    <p className="text-caption text-on-surface-variant mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </StaggeredList>
      </main>

      {/* Footer CTA */}
      <footer className="flex-shrink-0 p-4 pb-safe bg-white/90 backdrop-blur-md border-t border-outline/5 z-10">
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
