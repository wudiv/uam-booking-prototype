import { useNavigate } from 'react-router-dom';
import { useMemo, useEffect } from 'react';
import { useBookingStore } from '../store/useBookingStore';
import { StaggeredList } from '../components/animations/StaggeredList';
import { 
  ArrowLeft, 
  Plane, 
  Check, 
  Info, 
  Car,
  MapPin
} from 'lucide-react';
import { StepIndicator } from '../components/StepIndicator';

function addMinutesToDate(date: Date, minutes: number) {
  const newDate = new Date(date);
  newDate.setMinutes(newDate.getMinutes() + minutes);
  return `${newDate.getHours().toString().padStart(2, '0')}:${newDate.getMinutes().toString().padStart(2, '0')}`;
}

export function FlightSelection() {
  const navigate = useNavigate();
  const { selectedFlight, setSelectedFlight, fromPad, toPad, bookingDate } = useBookingStore();

  const tomorrow = new Date(bookingDate);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const formatDate = (date: Date) => `${date.getMonth() + 1}月${date.getDate()}日`;

  const flights = useMemo(() => {
    return [
      { id: '1', name: 'UAM-X 204', departureTime: addMinutesToDate(bookingDate, 20), arrivalTime: addMinutesToDate(bookingDate, 38), duration: '18分钟', price: 268, seats: 2, onTimeRate: '98%', recommended: true },
      { id: '2', name: 'UAM-X 208', departureTime: addMinutesToDate(bookingDate, 45), arrivalTime: addMinutesToDate(bookingDate, 63), duration: '18分钟', price: 238, seats: 4, onTimeRate: '', recommended: false },
      { id: '3', name: 'UAM-X 216', departureTime: addMinutesToDate(bookingDate, 80), arrivalTime: addMinutesToDate(bookingDate, 99), duration: '19分钟', price: 218, seats: 4, onTimeRate: '', recommended: false },
    ];
  }, [bookingDate]);

  useEffect(() => {
    if (!selectedFlight) {
      setSelectedFlight(flights[0]);
    }
  }, [selectedFlight, setSelectedFlight, flights]);

  return (
    <div className="bg-background text-on-surface font-body w-full h-full flex flex-col">
      {/* Header - Uber Style */}
      <header className="flex-shrink-0 sticky top-0 z-40 bg-white/90 backdrop-blur-md flex items-center px-gutter h-14 border-b border-outline/10">
        <button 
          onClick={() => navigate(-1)}
          aria-label="返回上一页"
          className="p-2 -ml-2 text-primary hover:bg-surface-variant rounded-full transition-colors"
        >
          <ArrowLeft size={24} strokeWidth={1.5} />
        </button>
        <h1 className="ml-2 text-display-sm font-bold">预订航班</h1>
      </header>

      <StepIndicator currentStep={1} />

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto no-scrollbar">
        {/* Route Summary Panel */}
        <div className="bg-white px-gutter py-stack-lg border-b border-outline/10">
          <div className="flex items-center justify-between bg-surface-variant/30 rounded-2xl p-4 border border-outline/5">
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-on-surface-variant mb-1">
                <MapPin size={12} strokeWidth={2.5} />
                <span className="text-[10px] font-bold uppercase tracking-wider">出发</span>
              </div>
              <span className="text-display-md font-black tracking-tight">{fromPad.replace('起降点', '')}</span>
            </div>
            
            <div className="flex flex-col items-center px-4">
              <Plane size={18} className="text-primary/40 rotate-90 mb-1" />
              <div className="w-12 h-[1px] bg-outline/20"></div>
            </div>

            <div className="flex flex-col text-right">
              <div className="flex items-center justify-end gap-1.5 text-on-surface-variant mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider">目的地</span>
                <MapPin size={12} strokeWidth={2.5} />
              </div>
              <span className="text-display-md font-black tracking-tight">{toPad.replace('起降点', '')}</span>
            </div>
          </div>
          
          <div className="mt-8 flex gap-2 overflow-x-auto no-scrollbar">
            <button className="flex-shrink-0 bg-primary text-on-primary px-5 py-2.5 rounded-pill text-label-sm font-bold">
              今天 ({formatDate(bookingDate)})
            </button>
            <button className="flex-shrink-0 bg-surface-variant text-on-surface px-5 py-2.5 rounded-pill text-label-sm font-bold border border-outline/10">
              明天 ({formatDate(tomorrow)})
            </button>
          </div>
        </div>

        {/* Flight List */}
        <StaggeredList className="px-gutter pt-stack-md pb-8 flex flex-col gap-stack-md">
          {flights.map((flight) => {
            const isSelected = selectedFlight?.id === flight.id;
            return (
              <button 
                key={flight.id}
                onClick={() => setSelectedFlight(flight)}
                className={`w-full text-left bg-white rounded-xl p-5 relative transition-all active:scale-[0.99] border-2 ${
                  isSelected 
                    ? 'border-primary shadow-uber-2' 
                    : 'border-outline/10 shadow-uber-1'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 right-0 bg-primary text-on-primary rounded-bl-xl p-1.5">
                    <Check size={16} strokeWidth={3} />
                  </div>
                )}
                
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-label-lg font-bold">
                      {flight.name}
                    </span>
                    {flight.seats <= 2 && (
                      <div className="bg-primary text-on-primary px-2 py-0.5 rounded text-[10px] font-bold">
                        仅剩 {flight.seats} 席
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex flex-col">
                    <span className="text-display-lg font-bold">{flight.departureTime}</span>
                  </div>
                  <div className="flex flex-col items-center px-4 flex-1">
                    <span className="text-[10px] font-bold text-on-surface-variant mb-2">
                      {flight.duration}
                    </span>
                    <div className="w-full h-[2px] bg-outline/20 relative rounded-full">
                      <div className={`absolute top-0 left-0 h-full bg-primary transition-all duration-500 ${isSelected ? 'w-full' : 'w-0'}`} />
                    </div>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-display-lg font-bold">{flight.arrivalTime}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center border-t border-outline/10 pt-4">
                  <div className="flex items-center gap-3">
                    {flight.onTimeRate && (
                      <span className="text-[11px] font-bold text-on-surface-variant flex items-center gap-1.5">
                        <Info size={14} strokeWidth={2} />
                        准点率 {flight.onTimeRate}
                      </span>
                    )}
                  </div>
                  <span className="text-display-sm font-bold">
                    ¥{flight.price}
                  </span>
                </div>
              </button>
            );
          })}
        </StaggeredList>
      </main>

      {/* Footer - Sticky Actions */}
      <div className="flex-shrink-0 bg-white border-t border-outline/10 p-container-padding pb-safe shadow-uber-2">
        <div className="flex justify-center items-center gap-2 mb-4 text-on-surface-variant opacity-80">
          <Car size={16} strokeWidth={2} />
          <span className="text-label-sm font-bold">票价包含地面接驳服务</span>
        </div>
        <button 
          onClick={() => navigate('/seat-selection')}
          className="w-full h-14 bg-primary text-on-primary rounded-pill text-label-lg font-bold flex items-center justify-center active:scale-[0.98] transition-transform shadow-uber-3"
        >
          下一步：选择座位
        </button>
      </div>
    </div>
  );
}
