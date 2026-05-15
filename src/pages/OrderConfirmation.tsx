import { useNavigate } from 'react-router-dom';
import { useBookingStore } from '../store/useBookingStore';
import { motion } from 'framer-motion';

export function OrderConfirmation() {
  const navigate = useNavigate();
  const { selectedFlight, fromPad, toPad, fromAddress, toAddress } = useBookingStore();

  if (!selectedFlight) return null;

  return (
    <div className="w-full h-full flex flex-col bg-background text-on-background overflow-hidden relative">
      {/* Header */}
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
        <h1 className="text-display-sm font-bold text-on-surface">确认订单</h1>
        <div className="w-10 h-10"></div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar pb-32">
        <div className="px-container-padding pt-6 flex flex-col gap-stack-lg">
          
          {/* Flight Summary Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-5 shadow-sm"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex flex-col">
                <span className="text-display-lg font-bold text-on-surface">{selectedFlight.departureTime}</span>
                <span className="text-label-sm text-on-surface-variant font-bold">{fromPad}</span>
              </div>
              <div className="flex flex-col items-center px-4 flex-1">
                <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>flight</span>
                <div className="w-full h-[1px] bg-outline-variant/50 my-1"></div>
                <span className="text-label-sm text-outline-variant italic">{selectedFlight.duration}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-display-lg font-bold text-on-surface">{selectedFlight.arrivalTime}</span>
                <span className="text-label-sm text-on-surface-variant font-bold">{toPad}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-on-surface-variant text-label-md">
              <span className="material-symbols-outlined text-[18px]">airplane_ticket</span>
              <span>{selectedFlight.name} · 经济舱</span>
            </div>
          </motion.div>

          {/* Transfer Info */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-stack-md"
          >
            <h3 className="text-label-lg font-bold text-primary px-1">地面接驳服务</h3>
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-4 flex flex-col gap-4">
              <div className="flex gap-3">
                <span className="material-symbols-outlined text-on-surface-variant text-[20px]">trip_origin</span>
                <div className="flex flex-col">
                  <span className="text-label-sm text-on-surface-variant">出发接送</span>
                  <span className="text-body-md font-bold text-on-surface">{fromAddress}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="material-symbols-outlined text-primary text-[20px]">location_on</span>
                <div className="flex flex-col">
                  <span className="text-label-sm text-on-surface-variant">到达送达</span>
                  <span className="text-body-md font-bold text-on-surface">{toAddress}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Price Breakdown */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-stack-md"
          >
            <h3 className="text-label-lg font-bold text-primary px-1">价格明细</h3>
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-4 flex flex-col gap-3">
              <div className="flex justify-between text-body-md text-on-surface-variant">
                <span>成人票 x 1</span>
                <span>¥{selectedFlight.price}</span>
              </div>
              <div className="flex justify-between text-body-md text-on-surface-variant">
                <span>机场建设费 / 燃油费</span>
                <span>¥0</span>
              </div>
              <div className="flex justify-between text-body-md text-on-surface-variant">
                <span>地面接驳 (尊享型)</span>
                <span className="text-primary font-bold">已包含</span>
              </div>
              <div className="h-px bg-outline-variant/20 my-1"></div>
              <div className="flex justify-between items-center">
                <span className="text-display-sm font-bold text-on-surface">总计</span>
                <span className="text-display-md font-bold text-primary">¥{selectedFlight.price}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Sticky Bottom Action */}
      <div className="flex-shrink-0 px-container-padding py-4 pb-safe bg-surface/80 backdrop-blur-md border-t border-outline-variant/20 fixed bottom-0 left-0 w-full z-20">
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex flex-col">
            <span className="text-label-sm text-on-surface-variant">支付总额</span>
            <span className="text-display-md font-bold text-primary">¥{selectedFlight.price}</span>
          </div>
          <div className="flex items-center gap-2 text-on-surface-variant">
            <span className="text-label-sm">微信支付</span>
            <span className="material-symbols-outlined text-[18px]">radio_button_checked</span>
          </div>
        </div>
        <button 
          onClick={() => navigate('/booking-success')}
          className="w-full h-[48px] bg-primary text-on-primary rounded-pill text-label-lg font-bold flex items-center justify-center hover:bg-primary/90 transition-all active:scale-[0.98] shadow-xl shadow-primary/20"
        >
          立即支付
        </button>
      </div>
    </div>
  );
}
