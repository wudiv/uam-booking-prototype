import { useNavigate, Navigate } from 'react-router-dom';
import { 
  X, 
  CheckCircle2, 
  Plane, 
  MapPin, 
  Badge, 
  Ticket, 
  ChevronRight,
  Info
} from 'lucide-react';
import { useBookingStore } from '../store/useBookingStore';
import { StaggeredList } from '../components/animations/StaggeredList';

export function BookingSuccess() {
  const navigate = useNavigate();
  const { selectedFlight, selectedSeat } = useBookingStore();

  if (!selectedFlight) return <Navigate to="/" replace />;

  return (
    <div className="w-full h-full flex flex-col bg-background text-on-surface font-body">
      {/* Minimalist Header */}
      <header className="flex-shrink-0 flex items-center justify-between px-gutter h-14 bg-white/90 backdrop-blur-md sticky top-0 z-10 border-b border-outline/5">
        <button 
          onClick={() => navigate('/')}
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
      <main className="flex-1 overflow-y-auto px-gutter py-8 flex flex-col gap-stack-lg no-scrollbar">
        <StaggeredList className="space-y-stack-lg" staggerDelay={0.1}>
          {/* Uber-style Boarding Pass Card */}
          <div className="bg-white rounded-2xl shadow-uber-2 overflow-hidden flex flex-col border border-outline/10">
            {/* Pass Header */}
            <div className="bg-primary px-6 py-6 text-on-primary relative overflow-hidden">
              <div className="relative z-10">
                <div className="text-[10px] font-bold opacity-60 uppercase tracking-widest mb-1">您的航班</div>
                <div className="text-display-md font-bold">{selectedFlight.name}</div>
              </div>
              <Plane 
                size={120} 
                className="absolute -right-8 -bottom-8 opacity-10 rotate-45" 
                strokeWidth={1}
              />
            </div>

            {/* Pass Body with Cutout Effect */}
            <div className="p-6 grid grid-cols-2 gap-y-8 relative bg-white">
              {/* Decorative Cutouts */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-background border border-outline/10"></div>
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-background border border-outline/10"></div>
              
              <div className="col-span-2 border-b border-dashed border-outline/20 mb-2"></div>

              <div>
                <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">选定座位</div>
                <div className="text-display-lg font-bold">{selectedSeat || '1A'}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">登机时间</div>
                <div className="text-display-lg font-bold">{selectedFlight.departureTime}</div>
              </div>

              <div className="col-span-2 flex flex-col items-center py-4">
                <div className="w-44 h-44 bg-surface-variant rounded-xl p-2 border border-outline/10 shadow-inner">
                  <img 
                    alt="QR Code" 
                    className="w-full h-full object-contain grayscale mix-blend-multiply" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqwCSM3U2ij1Z4-493D0SfvG-QH2j6XR2SMert7UEBCCkV0eIr0OKSctghNVjUNe4sb7LNHTHEZHFIZL3rw8iZoMlv4Xt5Lb3_teVE5AGe1mEh8o50QYFkzij5Y8QsnrNICBo4SQ4rxpYoW-IAjqFaoqgce9lBUm2B2EK_5m3yO2T4WT16ceio4zp5KJC8qfxkI2FzsUWpDVvJ0c4zcIy8hpKQo49xih7fPnS4NUdy5lyb_IN803RQynu-0peJgIl2WMPAV56wBpc"
                  />
                </div>
                <div className="mt-4 flex items-center gap-2 text-on-surface-variant">
                  <Info size={14} className="text-primary" />
                  <span className="text-[11px] font-bold">请在起飞前 8 分钟到达起降点</span>
                </div>
              </div>
            </div>
          </div>

          {/* Journey Tracking Section */}
          <section className="bg-white rounded-2xl p-6 shadow-uber-1 border border-outline/10">
            <h2 className="text-label-lg font-bold mb-8 flex items-center gap-2">
              <MapPin size={18} className="text-primary" />
              行程追踪
            </h2>
            <div className="relative pl-8 space-y-10">
              <div className="absolute left-[7px] top-1 bottom-1 w-[2px] bg-surface-variant"></div>
              
              {/* Steps */}
              {[
                { label: '接驳车到达', desc: '预计 4 分钟后到达', icon: <MapPin size={14} />, active: true },
                { label: '到达起降点', desc: '完成初步核验', icon: <CheckCircle2 size={14} /> },
                { label: '实名核验', desc: '进行安检与身份确认', icon: <Badge size={14} /> },
                { label: '登机', desc: '准备进入 UAM 垂直起降器', icon: <Ticket size={14} /> },
                { label: '航班起飞', desc: `预计 ${selectedFlight.departureTime} 起飞`, icon: <Plane size={14} /> }
              ].map((step, idx) => (
                <div key={idx} className={`relative ${!step.active ? 'opacity-30' : ''}`}>
                  <div className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full flex items-center justify-center ring-4 ring-white
                    ${step.active ? 'bg-primary shadow-uber-1' : 'bg-surface-variant'}
                  `}>
                    {step.active && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-label-md font-bold">{step.label}</h3>
                      <p className="text-[11px] font-medium">{step.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </StaggeredList>
      </main>

      {/* Footer CTA */}
      <footer className="flex-shrink-0 p-gutter pb-safe bg-white/90 backdrop-blur-md border-t border-outline/5 z-10">
        <button 
          onClick={() => navigate('/questionnaire')}
          className="w-full h-14 bg-primary text-on-primary rounded-pill text-label-lg font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-uber-3"
        >
          下一步：填写问卷
          <ChevronRight size={20} strokeWidth={2.5} />
        </button>
      </footer>
    </div>
  );
}
