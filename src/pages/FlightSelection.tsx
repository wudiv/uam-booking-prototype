import { useNavigate } from 'react-router-dom';
import { useMemo, useEffect } from 'react';
import { useBookingStore } from '../store/useBookingStore';

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
    /* 弹性三段式布局 */
    <div className="bg-surface text-on-surface font-body-lg w-full h-full flex flex-col">
      {/* Header - 固定高度，Stitch 使用 sticky */}
      <header className="flex-shrink-0 sticky top-0 z-40 bg-surface/90 backdrop-blur-md flex items-center justify-between px-container-padding h-14 border-b border-outline-variant/30">
        <button 
          onClick={() => navigate(-1)}
          aria-label="返回" 
          className="w-10 h-10 flex items-center justify-center text-on-surface hover:bg-surface-container-low rounded-full transition-colors"
        >
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
        <h1 className="text-display-sm font-bold text-on-surface">Select flight</h1>
        <div className="w-10 h-10"></div>
      </header>

      {/* Content - 自动填充，可滚动 */}
      <main className="flex-1 overflow-y-auto no-scrollbar">
        {/* Route Summary Panel */}
        <div className="bg-surface-container-lowest px-container-padding py-stack-lg shadow-[0_4px_12px_rgba(0,0,0,0.02)] border-b border-surface-variant">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center flex-1">
              <span className="text-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">From</span>
              <span className="text-display-md font-bold text-on-surface text-center">{fromPad}</span>
            </div>
            <div className="px-4 flex flex-col items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[28px]" style={{fontVariationSettings: "'FILL' 0"}}>flight_takeoff</span>
              <div className="w-full h-[1px] bg-outline-variant mt-2 border-t border-dashed border-outline-variant"></div>
            </div>
            <div className="flex flex-col items-center flex-1">
              <span className="text-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">To</span>
              <span className="text-display-md font-bold text-on-surface text-center">{toPad}</span>
            </div>
          </div>
          <div className="mt-stack-md flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            <div className="flex-shrink-0 bg-primary text-on-primary px-4 py-2 rounded-pill text-label-sm">
              今天 ({formatDate(bookingDate)})
            </div>
            <div className="flex-shrink-0 bg-surface-container text-on-surface-variant px-4 py-2 rounded-pill text-label-sm border border-outline-variant/30">
              明天 ({formatDate(tomorrow)})
            </div>
          </div>
        </div>

        {/* Flight List */}
        <div className="px-container-padding pt-stack-md pb-4 flex flex-col gap-stack-md">
          {flights.map((flight) => {
            const isSelected = selectedFlight?.id === flight.id;
            return (
              <button 
                key={flight.id}
                onClick={() => setSelectedFlight(flight)}
                className={`w-full text-left bg-surface-container-lowest rounded-xl p-4 relative overflow-hidden transition-all ${
                  isSelected 
                    ? 'border-2 border-primary shadow-[0_4px_12px_rgba(0,96,113,0.1)]' 
                    : 'border border-outline-variant shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-primary/50'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 right-0 bg-primary text-on-primary rounded-bl-lg px-2 py-1 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  </div>
                )}
                
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <span className={`font-label-lg text-label-lg ${isSelected ? 'text-on-surface' : 'text-on-surface-variant'}`}>
                      {flight.name}
                    </span>
                    {flight.seats <= 2 && (
                      <div className="bg-error-container text-on-error-container px-2 py-0.5 rounded font-label-sm text-label-sm">
                        剩{flight.seats}席
                      </div>
                    )}
                  </div>
                </div>
                
                <div className={`flex items-center justify-between mb-4 ${isSelected ? '' : 'text-on-surface-variant'}`}>
                  <div className="flex flex-col">
                    <span className="font-display-lg text-display-lg text-on-surface">{flight.departureTime}</span>
                  </div>
                  <div className="flex flex-col items-center px-4">
                    <span className={`font-label-sm text-label-sm mb-1 ${isSelected ? 'text-on-surface-variant' : 'text-outline'}`}>
                      {flight.duration}
                    </span>
                    <div className={`w-[60px] h-[1px] rounded-full relative ${isSelected ? 'bg-primary h-[2px]' : 'bg-outline-variant'}`}>
                      <div className={`absolute -right-1 -top-1 w-2.5 h-2.5 rounded-full border-2 bg-surface-container-lowest ${isSelected ? 'border-primary' : 'border-outline-variant w-2 h-2'}`}></div>
                      <div className={`absolute -left-1 -top-1 w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-primary' : 'bg-outline-variant w-2 h-2'}`}></div>
                    </div>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="font-display-lg text-display-lg text-on-surface">{flight.arrivalTime}</span>
                  </div>
                </div>
                
                <div className={`flex justify-${isSelected ? 'between' : 'end'} items-center border-t border-outline-variant/30 pt-3`}>
                  {isSelected && flight.onTimeRate && (
                    <span className="font-label-sm text-label-sm text-primary flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">info</span>
                      准点率 {flight.onTimeRate}
                    </span>
                  )}
                  <span className={`font-price-tag text-price-tag ${isSelected ? 'text-primary' : 'text-on-surface'}`}>
                    ¥{flight.price}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </main>

      {/* Footer - 固定底部，Stitch 匹配 */}
      <div className="flex-shrink-0 bg-surface-container-lowest shadow-[0_-8px_24px_rgba(0,0,0,0.08)] pt-4 px-container-padding pb-safe rounded-t-xl">
        <div className="flex justify-center items-center gap-1 mb-3 text-on-surface-variant">
          <span className="material-symbols-outlined text-[16px]">airport_shuttle</span>
          <span className="font-label-sm text-label-sm">票价包含接驳服务</span>
        </div>
        <button 
          onClick={() => navigate('/shuttle-info')}
          className="w-full h-12 bg-primary text-on-primary rounded-pill text-body-lg font-bold flex items-center justify-center hover:bg-primary/90 transition-colors shadow-sm mb-2"
        >
          继续
        </button>
      </div>
    </div>
  );
}
