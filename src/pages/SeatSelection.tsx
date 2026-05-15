import { useNavigate } from 'react-router-dom';
import { ChevronLeft, User, CreditCard, Phone, CheckCircle2, LayoutGrid, Armchair, Luggage, ShieldAlert, ChevronRight } from 'lucide-react';
import { useBookingStore } from '../store/useBookingStore';
import { StaggeredList } from '../components/animations/StaggeredList';

export function SeatSelection() {
  const navigate = useNavigate();
  const { selectedSeat, setSelectedSeat } = useBookingStore();

  const seats = [
    { id: '1A', type: 'window' }, { id: '1B', type: 'window' },
    { id: '2A', type: 'window' }, { id: '2B', type: 'window' }
  ];

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <header className="flex items-center px-container-padding h-14 bg-surface/90 backdrop-blur-md border-b border-outline-variant/30 shrink-0 sticky top-0 z-40">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center text-on-surface hover:bg-surface-container-low rounded-full transition-colors active:scale-90"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="flex-1 text-center text-display-sm font-bold text-on-surface mr-10">乘客与座位</h1>
      </header>

      {/* Scrollable Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar pb-32">
        <StaggeredList className="p-container-padding space-y-stack-md" staggerDelay={0.08}>
          {/* Passenger Info */}
          <section className="bg-surface-container-lowest rounded-xl p-4 shadow-m3-1 border border-outline-variant/20">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-headline-sm font-bold text-on-surface">乘客信息</h2>
              <button className="text-label-md font-bold text-primary active:opacity-70">
                编辑
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-outline" />
                <span className="text-body-lg font-medium text-on-surface">吴**</span>
              </div>
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-outline" />
                <span className="text-body-md text-on-surface-variant font-mono">4403**********1234</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-outline" />
                <span className="text-body-md text-on-surface-variant font-mono">138****6821</span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 bg-surface-container-low p-3 rounded-lg border border-outline-variant/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="text-label-sm text-on-surface-variant">已通过平台实名信息校验</span>
            </div>
          </section>

          {/* Seat Preference */}
          <section className="bg-surface-container-lowest rounded-xl p-4 shadow-m3-1 border border-outline-variant/20">
            <h2 className="text-headline-sm font-bold text-on-surface mb-4">座位偏好</h2>
            
            <div className="flex gap-3 mb-4">
              <button className="flex-1 flex items-center justify-center gap-2 h-12 bg-primary text-on-primary rounded-pill active:scale-[0.98] transition-transform shadow-sm">
                <LayoutGrid className="w-5 h-5" />
                <span className="text-label-lg font-bold">靠窗优先</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 h-12 bg-surface-container-high text-on-surface-variant rounded-pill active:scale-[0.98] transition-transform">
                <Armchair className="w-5 h-5" />
                <span className="text-label-lg font-bold">自动分配</span>
              </button>
            </div>

            <div className="bg-surface-container-low p-4 rounded-xl flex items-center justify-between border border-outline-variant/10">
              <div className="flex items-center gap-3 text-on-surface-variant">
                <Armchair className="w-5 h-5 opacity-60" />
                <span className="text-body-md font-medium">当前预分配座位:</span>
              </div>
              <span className="text-display-md font-bold text-primary tracking-tight">{selectedSeat}</span>
            </div>

            {/* Seat Map Visual */}
            <div className="mt-6 flex justify-center pb-2">
              <div className="relative w-44 h-60 bg-surface-container rounded-[40px] p-6 shadow-inner border border-outline-variant/20 overflow-hidden">
                {/* Nose area */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-14 h-8 bg-surface-container-high rounded-t-full border-t border-outline-variant/30" />
                
                {/* Windows effect */}
                <div className="absolute inset-y-10 left-2 w-1 flex flex-col justify-around gap-2 py-4">
                  {[1,2,3,4].map(i => <div key={i} className="h-4 bg-white/40 rounded-full w-1" />)}
                </div>
                <div className="absolute inset-y-10 right-2 w-1 flex flex-col justify-around gap-2 py-4">
                  {[1,2,3,4].map(i => <div key={i} className="h-4 bg-white/40 rounded-full w-1" />)}
                </div>

                {/* 4 Seats Layout (2x2) */}
                <div className="grid grid-cols-2 gap-x-10 gap-y-10 mt-6 relative z-10">
                  {seats.map((seat) => (
                    <button
                      key={seat.id}
                      onClick={() => setSelectedSeat(seat.id)}
                      className={`
                        w-11 h-11 rounded-lg flex items-center justify-center text-label-md font-bold transition-all duration-300
                        ${selectedSeat === seat.id 
                          ? 'bg-primary text-on-primary shadow-m3-2 scale-110' 
                          : 'bg-surface-container-lowest text-outline border border-outline-variant/40'}
                        active:scale-90
                      `}
                    >
                      {seat.id}
                    </button>
                  ))}
                </div>

                {/* Center aisle hint */}
                <div className="absolute left-1/2 top-10 bottom-10 w-[1px] bg-outline-variant/20 -translate-x-1/2" />
              </div>
            </div>
          </section>

          {/* Luggage Allowance */}
          <section className="bg-surface-container-lowest rounded-xl p-4 shadow-m3-1 border border-outline-variant/20 flex items-center gap-4 active:bg-surface-container-low transition-colors">
            <div className="w-12 h-12 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center shrink-0">
              <Luggage className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-body-lg font-bold text-on-surface">行李额度</h3>
              <p className="text-label-sm text-on-surface-variant font-medium">1 件随身行李 / 不超过 7kg</p>
            </div>
          </section>

          {/* Emergency Contact */}
          <section className="bg-surface-container-lowest rounded-xl p-4 shadow-m3-1 border border-outline-variant/20 flex items-center gap-4 active:bg-surface-container-low transition-colors group">
            <div className="w-12 h-12 bg-tertiary-container text-on-tertiary-container rounded-full flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-body-lg font-bold text-on-surface">紧急联系人</h3>
              <p className="text-label-sm text-on-surface-variant font-medium">未填写 / 可选</p>
            </div>
            <ChevronRight className="w-5 h-5 text-outline group-hover:translate-x-1 transition-transform" />
          </section>
        </StaggeredList>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 p-container-padding bg-surface-container-lowest/80 backdrop-blur-md border-t border-outline-variant/20 shrink-0 z-40 pb-safe sm:absolute sm:bottom-0 sm:left-0 sm:right-0">
        <button
          onClick={() => navigate('/shuttle-info')}
          className="w-full h-14 bg-primary text-on-primary rounded-pill text-headline-md font-bold active:scale-[0.98] transition-transform shadow-m3-2 flex items-center justify-center gap-2"
        >
          <span>确认并安排接驳</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </footer>
    </div>
  );
}
