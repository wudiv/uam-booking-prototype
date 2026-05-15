import { useNavigate } from 'react-router-dom';
import { useMemo, useEffect, useState } from 'react';
import { useBookingStore } from '../store/useBookingStore';
import { motion, AnimatePresence } from 'framer-motion';

function addMinutesToDate(date: Date, minutes: number) {
  const newDate = new Date(date);
  newDate.setMinutes(newDate.getMinutes() + minutes);
  return `${newDate.getHours().toString().padStart(2, '0')}:${newDate.getMinutes().toString().padStart(2, '0')}`;
}

export function FlightSelection() {
  const navigate = useNavigate();
  const { selectedFlight, setSelectedFlight, fromPad, toPad, bookingDate } = useBookingStore();
  const [activeTab, setActiveTab] = useState('推荐');

  const flights = useMemo(() => {
    return [
      { id: '1', name: 'UAM-X 204', departureTime: addMinutesToDate(bookingDate, 20), arrivalTime: addMinutesToDate(bookingDate, 38), duration: '18分钟', price: 268, seats: 2, onTimeRate: '98%', recommended: true },
      { id: '2', name: 'UAM-X 208', departureTime: addMinutesToDate(bookingDate, 45), arrivalTime: addMinutesToDate(bookingDate, 63), duration: '18分钟', price: 238, seats: 4, onTimeRate: '95%', recommended: false },
      { id: '3', name: 'UAM-X 216', departureTime: addMinutesToDate(bookingDate, 80), arrivalTime: addMinutesToDate(bookingDate, 99), duration: '19分钟', price: 218, seats: 4, onTimeRate: '92%', recommended: false },
    ];
  }, [bookingDate]);

  useEffect(() => {
    if (!selectedFlight) {
      setSelectedFlight(flights[0]);
    }
  }, [selectedFlight, setSelectedFlight, flights]);

  return (
    <div className="w-full h-full flex flex-col bg-background text-on-background overflow-hidden">
      {/* Header - M3 Slide Down */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex-shrink-0 flex items-center justify-between px-container-padding h-14 bg-surface z-10"
      >
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center text-on-surface hover:bg-surface-container-high rounded-full transition-colors"
        >
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
        <h1 className="text-display-sm font-bold text-on-surface">选择 UAM 航班</h1>
        <div className="w-10 h-10"></div>
      </motion.header>

      {/* Flight List - Content Area */}
      <main className="flex-1 overflow-y-auto no-scrollbar pb-32">
        {/* Route Summary - Sticky Style */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-surface-container-lowest px-container-padding py-stack-lg shadow-[0_4px_12px_rgba(0,0,0,0.02)] border-b border-surface-variant"
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center flex-1">
              <span className="text-label-sm text-on-surface-variant mb-1">起点</span>
              <span className="text-display-md font-bold text-on-surface text-center leading-tight">{fromPad}</span>
            </div>
            <div className="px-4 flex flex-col items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>flight</span>
              <div className="w-[40px] h-[1px] bg-outline-variant mt-2 border-t border-dashed border-outline-variant"></div>
            </div>
            <div className="flex flex-col items-center flex-1">
              <span className="text-label-sm text-on-surface-variant mb-1">终点</span>
              <span className="text-display-md font-bold text-on-surface text-center leading-tight">{toPad}</span>
            </div>
          </div>
          
          {/* Quick Filter Tabs - M3 Chips */}
          <div className="flex gap-2 mt-6 overflow-x-auto no-scrollbar">
            {['推荐', '最快', '价格最低'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-pill text-label-md font-bold whitespace-nowrap transition-all ${
                  activeTab === tab 
                    ? 'bg-primary text-on-primary shadow-md' 
                    : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Flight Cards - React Bits List Animation */}
        <div className="px-container-padding py-6 flex flex-col gap-4">
          <AnimatePresence mode="popLayout">
            {flights.map((flight, index) => {
              const isSelected = selectedFlight?.id === flight.id;
              return (
                <motion.div
                  key={flight.id}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 300, damping: 30 }}
                  onClick={() => setSelectedFlight(flight)}
                  className={`group relative bg-surface-container-lowest rounded-xl border p-4 transition-all active:scale-[0.98] cursor-pointer ${
                    isSelected 
                      ? 'border-primary ring-1 ring-primary shadow-xl bg-primary/[0.02]' 
                      : 'border-outline-variant/30 hover:border-outline shadow-sm'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>airlines</span>
                      <span className="text-label-lg font-bold text-on-surface">{flight.name}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-display-sm font-bold text-primary">¥{flight.price}</span>
                      <span className="text-label-sm text-on-surface-variant">余 {flight.seats} 座</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col">
                      <span className="text-display-lg font-bold text-on-surface">{flight.departureTime}</span>
                      <span className="text-label-sm text-on-surface-variant">起飞</span>
                    </div>
                    <div className="flex flex-col items-center flex-1 px-4">
                      <span className="text-label-sm text-outline-variant mb-1">{flight.duration}</span>
                      <div className="w-full h-[1px] bg-outline-variant/50 relative">
                        <div className="absolute -top-[2px] right-0 w-1.5 h-1.5 rounded-full bg-outline-variant"></div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-display-lg font-bold text-on-surface">{flight.arrivalTime}</span>
                      <span className="text-label-sm text-on-surface-variant">到达</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 border-t border-outline-variant/20 pt-3">
                    <span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container rounded-md text-label-sm">直飞</span>
                    <span className="px-2 py-0.5 bg-tertiary-container text-on-tertiary-container rounded-md text-label-sm">准点率 {flight.onTimeRate}</span>
                  </div>

                  {isSelected && (
                    <motion.div 
                      layoutId="selection-check"
                      className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-lg border-2 border-surface"
                    >
                      <span className="material-symbols-outlined text-[16px]">check</span>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </main>

      {/* Sticky Bottom Action - Consistent 48px Pill Button */}
      <div className="flex-shrink-0 px-container-padding py-4 pb-safe bg-surface/80 backdrop-blur-md border-t border-outline-variant/20 fixed bottom-0 left-0 w-full z-20">
        <button 
          onClick={() => navigate('/shuttle-info')}
          className="w-full h-[48px] bg-primary text-on-primary rounded-pill text-label-lg font-bold flex items-center justify-center hover:bg-primary/90 transition-all active:scale-[0.98] shadow-xl shadow-primary/20"
        >
          确认并继续
        </button>
      </div>
    </div>
  );
}
