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
    <div className="flex flex-col h-full bg-[#F7F7F7]">
      {/* Header */}
      <header className="flex items-center px-4 h-14 bg-white border-b border-gray-100 shrink-0">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 active:scale-95 transition-transform"
        >
          <ChevronLeft className="w-6 h-6 text-black" />
        </button>
        <h1 className="flex-1 text-center text-[17px] font-semibold text-black mr-8">乘客与座位</h1>
      </header>

      {/* Scrollable Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        <StaggeredList className="p-4 space-y-4" staggerDelay={0.08}>
          {/* Passenger Info */}
          <section className="bg-white rounded-2xl p-4 shadow-m3-1">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[17px] font-bold text-black">乘客信息</h2>
              <button className="text-[13px] font-medium text-blue-600 flex items-center gap-1">
                编辑
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-400" />
                <span className="text-[15px] font-medium text-black">吴**</span>
              </div>
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-gray-400" />
                <span className="text-[15px] text-gray-600 font-mono">4403**********1234</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-[15px] text-gray-600">138****6821</span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="text-[13px] text-gray-500">已通过平台实名信息校验</span>
            </div>
          </section>

          {/* Seat Preference */}
          <section className="bg-white rounded-2xl p-4 shadow-m3-1">
            <h2 className="text-[17px] font-bold text-black mb-4">座位偏好</h2>
            
            <div className="flex gap-3 mb-4">
              <button className="flex-1 flex items-center justify-center gap-2 h-12 bg-black text-white rounded-xl active:scale-[0.98] transition-transform">
                <LayoutGrid className="w-5 h-5" />
                <span className="text-[15px] font-medium">靠窗优先</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 h-12 bg-gray-100 text-gray-500 rounded-xl active:scale-[0.98] transition-transform">
                <Armchair className="w-5 h-5" />
                <span className="text-[15px] font-medium">自动分配</span>
              </button>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl flex items-center justify-between border border-gray-100">
              <div className="flex items-center gap-3 text-gray-500">
                <Armchair className="w-5 h-5" />
                <span className="text-[15px]">当前预分配:</span>
              </div>
              <span className="text-xl font-bold text-black">{selectedSeat}</span>
            </div>

            {/* Seat Map Visual */}
            <div className="mt-6 flex justify-center">
              <div className="relative w-48 h-64 bg-white border-[3px] border-gray-200 rounded-[40px] p-6 shadow-inner">
                {/* Nose of the eVTOL */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-gray-200 rounded-t-full border-t border-gray-300" />
                
                {/* 4 Seats Layout (2x2) */}
                <div className="grid grid-cols-2 gap-x-10 gap-y-8 mt-4">
                  {seats.map((seat) => (
                    <button
                      key={seat.id}
                      onClick={() => setSelectedSeat(seat.id)}
                      className={`
                        w-12 h-12 rounded-lg flex items-center justify-center text-[13px] font-bold transition-all duration-200
                        ${selectedSeat === seat.id 
                          ? 'bg-gray-500 text-white shadow-m3-2' 
                          : 'bg-gray-100 text-transparent border-2 border-transparent'}
                        active:scale-90
                      `}
                    >
                      {seat.id}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Luggage Allowance */}
          <section className="bg-white rounded-2xl p-4 shadow-m3-1 flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
              <Luggage className="w-6 h-6 text-black" />
            </div>
            <div className="flex-1">
              <h3 className="text-[15px] font-bold text-black">行李额度</h3>
              <p className="text-[13px] text-gray-500">1 件随身行李 / 不超过 7kg</p>
            </div>
          </section>

          {/* Emergency Contact */}
          <section className="bg-white rounded-2xl p-4 shadow-m3-1 flex items-center gap-4 active:bg-gray-50 transition-colors">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6 text-black" />
            </div>
            <div className="flex-1">
              <h3 className="text-[15px] font-bold text-black">紧急联系人</h3>
              <p className="text-[13px] text-gray-500">未填写 / 可选</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </section>
        </StaggeredList>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 sm:absolute sm:bottom-0 sm:left-0 sm:right-0">
        <button
          onClick={() => navigate('/shuttle-info')}
          className="w-full h-14 bg-black text-white rounded-full text-[17px] font-bold active:scale-[0.98] transition-transform shadow-m3-2"
        >
          确认并安排接驳
        </button>
      </footer>
    </div>
  );
}
