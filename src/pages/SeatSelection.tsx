import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  CreditCard, 
  Phone, 
  CheckCircle2, 
  Luggage, 
  ShieldAlert, 
  ChevronRight
} from 'lucide-react';
import { Button } from '../components/Button';
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
      <header className="flex items-center px-4 h-14 bg-white/90 backdrop-blur-md border-b border-outline/10 shrink-0 sticky top-0 z-40">
        <button 
          onClick={() => navigate(-1)}
          aria-label="返回上一页"
          className="p-2 -ml-2 text-primary hover:bg-surface-variant rounded-full transition-colors"
        >
          <ArrowLeft size={24} strokeWidth={1.5} />
        </button>
        <h1 className="ml-2 text-display-sm font-bold">选择座位</h1>
      </header>

      {/* Scrollable Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar pb-36">
        <StaggeredList className="p-gutter space-y-4" staggerDelay={0.08}>
          {/* Passenger Info Card */}
          <section className="bg-white rounded-xl p-4 shadow-uber-1 border border-outline/10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-body-md font-bold">乘客信息</h2>
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
              <span className="text-caption font-bold text-on-surface">证件信息已填写</span>
            </div>
          </section>

          {/* Seat Selection */}
          <section className="bg-white rounded-xl p-4 shadow-uber-1 border border-outline/10">
            <h2 className="text-body-md font-bold mb-3">座位选择</h2>

            {/* Compact Seat Map */}
            <div className="bg-surface-variant rounded-lg p-3 flex items-center justify-between">
              <div className="grid grid-cols-2 gap-2 flex-1">
                {seats.map((seat) => {
                  const isSelected = selectedSeat === seat.id;
                  const isOccupied = seat.id === '1A' || seat.id === '1B';
                  return (
                    <button
                      key={seat.id}
                      onClick={() => !isOccupied && setSelectedSeat(seat.id)}
                      disabled={isOccupied}
                      className={`
                        h-9 rounded-md flex items-center justify-center text-label-sm font-bold transition-all
                        ${isOccupied
                          ? 'bg-outline/30 text-on-surface-variant/50 cursor-not-allowed'
                          : isSelected 
                            ? 'bg-primary text-on-primary shadow-uber-2' 
                            : 'bg-white text-on-surface border border-outline/20 active:scale-95'}
                      `}
                    >
                      {isOccupied ? '已售' : seat.id}
                    </button>
                  );
                })}
              </div>
              <div className="ml-4 text-center">
                <span className="text-caption text-on-surface-variant block">已选</span>
                <span className="text-display-sm font-bold">{selectedSeat}</span>
              </div>
            </div>
          </section>

          {/* Additional Options */}
          <div className="space-y-2">
            <button className="w-full bg-white rounded-xl p-4 shadow-uber-1 border border-outline/10 flex items-center gap-4 active:bg-surface-variant transition-colors">
              <div className="w-10 h-10 bg-surface-variant rounded-full flex items-center justify-center text-on-surface shrink-0">
                <Luggage size={20} strokeWidth={1.5} />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-label-lg font-bold">行李额度</h3>
                <p className="text-caption font-medium text-on-surface-variant">1 件随身行李 / 7kg</p>
              </div>
              <ChevronRight size={20} className="text-outline" />
            </button>

            <button className="w-full bg-white rounded-xl p-4 shadow-uber-1 border border-outline/10 flex items-center gap-4 active:bg-surface-variant transition-colors">
              <div className="w-10 h-10 bg-surface-variant rounded-full flex items-center justify-center text-on-surface shrink-0">
                <ShieldAlert size={20} strokeWidth={1.5} />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-label-lg font-bold">紧急联系人</h3>
                <p className="text-caption font-medium text-on-surface-variant">未填写 / 可选</p>
              </div>
              <ChevronRight size={20} className="text-outline" />
            </button>
          </div>
        </StaggeredList>
      </main>

      {/* Footer CTA */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-outline/10 shrink-0 z-40 pb-safe">
        <Button
          size="full"
          shape="pill"
          onClick={() => navigate('/order-confirmation')}
          rightIcon={<ChevronRight size={20} strokeWidth={2.5} />}
        >
          确认并生成订单
        </Button>
      </footer>
    </div>
  );
}
