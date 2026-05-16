import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  CreditCard, 
  Phone, 
  CheckCircle2, 
  LayoutGrid, 
  Armchair, 
  Luggage, 
  ShieldAlert, 
  ChevronRight
} from 'lucide-react';
import { StepIndicator } from '../components/StepIndicator';
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
    <div className="flex flex-col h-full bg-background text-on-surface font-body">
      {/* Header */}
      <header className="flex items-center px-gutter h-14 bg-white/90 backdrop-blur-md border-b border-outline/10 shrink-0 sticky top-0 z-40">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-primary hover:bg-surface-variant rounded-full transition-colors"
        >
          <ArrowLeft size={24} strokeWidth={1.5} />
        </button>
        <h1 className="ml-2 text-display-sm font-bold">选择座位</h1>
      </header>

      <StepIndicator currentStep={2} />

      {/* Scrollable Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar pb-36">
        <StaggeredList className="p-gutter space-y-stack-md" staggerDelay={0.08}>
          {/* Passenger Info Card */}
          <section className="bg-white rounded-xl p-5 shadow-uber-1 border border-outline/10">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-display-sm font-bold">乘客信息</h2>
              <button className="text-label-md font-bold text-primary active:opacity-70">
                编辑
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant">
                  <User size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-body-md font-bold">吴**</div>
                  <div className="text-label-sm text-on-surface-variant">乘机人 (本人)</div>
                </div>
              </div>
              <div className="flex items-center gap-4 pl-14">
                <CreditCard size={18} strokeWidth={1.5} className="text-on-surface-variant opacity-60" />
                <span className="text-label-md text-on-surface-variant font-medium">4403**********1234</span>
              </div>
              <div className="flex items-center gap-4 pl-14">
                <Phone size={18} strokeWidth={1.5} className="text-on-surface-variant opacity-60" />
                <span className="text-label-md text-on-surface-variant font-medium">138****6821</span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 bg-surface-variant p-3 rounded-lg">
              <CheckCircle2 size={16} className="text-on-surface" />
              <span className="text-[11px] font-bold text-on-surface">已通过实名身份校验</span>
            </div>
          </section>

          {/* Seat Preference Selection */}
          <section className="bg-white rounded-xl p-5 shadow-uber-1 border border-outline/10">
            <h2 className="text-display-sm font-bold mb-5">座位选择</h2>
            
            <div className="flex gap-3 mb-6">
              <button className="flex-1 flex items-center justify-center gap-2 h-12 bg-primary text-on-primary rounded-pill font-bold text-label-md active:scale-[0.98] transition-transform">
                <LayoutGrid size={18} strokeWidth={2} />
                靠窗优先
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 h-12 bg-surface-variant text-on-surface rounded-pill font-bold text-label-md active:scale-[0.98] transition-transform border border-outline/10">
                <Armchair size={18} strokeWidth={2} />
                自动分配
              </button>
            </div>

            {/* Visual Seat Map */}
            <div className="bg-surface-variant rounded-2xl p-8 flex flex-col items-center">
              <div className="relative w-40 h-56 bg-white rounded-t-[40px] rounded-b-xl shadow-uber-1 border border-outline/10 p-6 flex flex-col items-center">
                <div className="text-[10px] font-bold text-on-surface-variant mb-6 uppercase tracking-widest">机头方向</div>
                
                {/* 2x2 Layout */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-8 relative z-10">
                  {seats.map((seat) => {
                    const isSelected = selectedSeat === seat.id;
                    return (
                      <button
                        key={seat.id}
                        onClick={() => setSelectedSeat(seat.id)}
                        className={`
                          w-12 h-12 rounded-lg flex items-center justify-center text-label-md font-bold transition-all
                          ${isSelected 
                            ? 'bg-primary text-on-primary shadow-uber-2 scale-110' 
                            : 'bg-white text-on-surface border-2 border-outline/20'}
                          active:scale-90
                        `}
                      >
                        {seat.id}
                      </button>
                    );
                  })}
                </div>
                <div className="absolute left-1/2 top-14 bottom-6 w-[2px] bg-surface-variant -translate-x-1/2" />
              </div>
              
              <div className="mt-6 text-center">
                <span className="text-label-sm font-bold text-on-surface-variant">已选择座位: </span>
                <span className="text-display-md font-bold ml-1">{selectedSeat}</span>
              </div>
            </div>
          </section>

          {/* Additional Options */}
          <div className="space-y-stack-sm">
            <button className="w-full bg-white rounded-xl p-4 shadow-uber-1 border border-outline/10 flex items-center gap-4 active:bg-surface-variant transition-colors">
              <div className="w-10 h-10 bg-surface-variant rounded-full flex items-center justify-center text-on-surface shrink-0">
                <Luggage size={20} strokeWidth={1.5} />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-label-lg font-bold">行李额度</h3>
                <p className="text-[11px] font-medium text-on-surface-variant">1 件随身行李 / 7kg</p>
              </div>
              <ChevronRight size={20} className="text-outline" />
            </button>

            <button className="w-full bg-white rounded-xl p-4 shadow-uber-1 border border-outline/10 flex items-center gap-4 active:bg-surface-variant transition-colors">
              <div className="w-10 h-10 bg-surface-variant rounded-full flex items-center justify-center text-on-surface shrink-0">
                <ShieldAlert size={20} strokeWidth={1.5} />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-label-lg font-bold">紧急联系人</h3>
                <p className="text-[11px] font-medium text-on-surface-variant">未填写 / 可选</p>
              </div>
              <ChevronRight size={20} className="text-outline" />
            </button>
          </div>
        </StaggeredList>
      </main>

      {/* Footer CTA */}
      <footer className="fixed bottom-0 left-0 right-0 p-gutter bg-white/90 backdrop-blur-md border-t border-outline/10 shrink-0 z-40 pb-safe">
        <button
          onClick={() => navigate('/order-confirmation')}
          className="w-full h-14 bg-primary text-on-primary rounded-pill text-label-lg font-bold active:scale-[0.98] transition-transform shadow-uber-3 flex items-center justify-center gap-2"
        >
          <span>确认并生成订单</span>
          <ChevronRight size={20} strokeWidth={2.5} />
        </button>
      </footer>
    </div>
  );
}
