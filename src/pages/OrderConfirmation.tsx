import { useNavigate, Navigate } from 'react-router-dom';
import { useBookingStore } from '../store/useBookingStore';

export function OrderConfirmation() {
  const navigate = useNavigate();
  const { selectedFlight } = useBookingStore();

  if (!selectedFlight) {
    return <Navigate to="/flight-selection" replace />;
  }

  return (
    <div className="w-full h-full flex flex-col relative bg-background text-on-background font-body-lg">
      {/* TopAppBar Semantic Shell */}
      <header className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-container-padding h-12 bg-surface/80 dark:bg-surface-dim/80 backdrop-blur-md border-b border-outline-variant/30">
        <button 
          onClick={() => navigate(-1)}
          aria-label="Go Back" 
          className="text-on-surface-variant hover:bg-surface-container-high transition-colors opacity-80 duration-150 p-2 rounded-full"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-headline-md font-headline-md text-primary dark:text-primary-fixed-dim tracking-tight">确认订单</h1>
        <div className="w-10"></div> {/* Placeholder for balance */}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pt-16 pb-[100px] px-container-padding flex flex-col gap-stack-md justify-between">
        
        {/* Top Section: Flight Details */}
        <section className="flex flex-col gap-stack-md">
          {/* Flight Route Card */}
          <article className="bg-surface-container-lowest rounded-xl p-4 shadow-[0_12px_24px_rgba(0,0,0,0.05)] border border-outline-variant/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>airlines</span>
                <span className="text-label-lg font-label-lg text-on-surface">{selectedFlight.name}</span>
              </div>
              <span className="bg-secondary-container text-on-secondary-container px-2 py-1 rounded-md text-label-sm font-label-sm">直飞</span>
            </div>
            
            <div className="flex items-center justify-between relative">
              {/* Origin */}
              <div className="flex flex-col">
                <span className="text-display-lg font-display-lg text-on-surface">{selectedFlight.departureTime}</span>
                <span className="text-body-md font-body-md text-on-surface-variant">深圳平安金融中心</span>
              </div>
              
              {/* Path */}
              <div className="flex-1 px-4 flex flex-col items-center relative">
                <div className="w-full border-t-2 border-dashed border-outline-variant absolute top-1/2 -translate-y-1/2"></div>
                <span className="material-symbols-outlined text-primary bg-surface-container-lowest px-2 relative z-10" style={{ transform: 'rotate(90deg)' }}>flight</span>
                <span className="text-label-sm font-label-sm text-outline mt-1 relative z-10">{selectedFlight.duration}</span>
              </div>
              
              {/* Destination */}
              <div className="flex flex-col text-right">
                <span className="text-display-lg font-display-lg text-on-surface">{selectedFlight.arrivalTime}</span>
                <span className="text-body-md font-body-md text-on-surface-variant">香港国际机场 T1</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-outline-variant/20 flex gap-stack-md text-body-md font-body-md text-on-surface-variant">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px]">person</span>
                <span>张三 (成人)</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px]">luggage</span>
                <span>1件 登机箱 (7kg)</span>
              </div>
            </div>
          </article>

          {/* Trust & Safety Section (3 equal width cards) */}
          <section className="flex gap-gutter w-full">
            {/* Card 1 */}
            <div className="flex-1 bg-surface-container-low rounded-lg p-3 border border-outline-variant/10 flex flex-col items-center text-center gap-1">
              <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center mb-1">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
              </div>
              <h3 className="text-label-sm font-label-sm text-on-surface leading-tight">登机时间提醒</h3>
              <p className="text-[10px] leading-[14px] text-on-surface-variant font-medium">请在起飞前 8 分钟到达起降点，并完成登机确认。</p>
            </div>
            {/* Card 2 */}
            <div className="flex-1 bg-surface-container-low rounded-lg p-3 border border-outline-variant/10 flex flex-col items-center text-center gap-1">
              <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mb-1">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
              <h3 className="text-label-sm font-label-sm text-on-surface leading-tight">接驳信息</h3>
              <p className="text-[10px] leading-[14px] text-on-surface-variant font-medium">订单包含从机场低空前往T3的接驳服务。</p>
            </div>
            {/* Card 3 */}
            <div className="flex-1 bg-surface-container-low rounded-lg p-3 border border-outline-variant/10 flex flex-col items-center text-center gap-1">
              <div className="w-8 h-8 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center mb-1">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>radar</span>
              </div>
              <h3 className="text-label-sm font-label-sm text-on-surface leading-tight">行李提示</h3>
              <p className="text-[10px] leading-[14px] text-on-surface-variant font-medium">本次行程可携带 1 件不超过 7kg 的随身行李。</p>
            </div>
          </section>
        </section>

        {/* Bottom Section: Price & Payment */}
        <section className="flex flex-col gap-stack-sm mt-6">
          {/* Price Breakdown */}
          <article className="bg-surface-container-lowest rounded-xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.02)] border border-outline-variant/20">
            <div className="flex justify-between items-center mb-2">
              <span className="text-body-md font-body-md text-on-surface-variant">空中快线</span>
              <span className="text-body-md font-body-md text-on-surface">¥{Math.max(0, selectedFlight.price - 30)}</span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-body-md font-body-md text-on-surface-variant">专属接驳</span>
              <span className="text-body-md font-body-md text-on-surface">¥30</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-outline-variant/20">
              <span className="text-label-lg font-label-lg text-on-surface">合计</span>
              <span className="text-price-tag font-price-tag text-primary">¥{selectedFlight.price}</span>
            </div>
          </article>
          
          {/* Payment Method */}
          <article className="bg-surface-container-lowest rounded-xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.02)] border border-outline-variant/20 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#09B83E]" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
              <span className="text-label-lg font-label-lg text-on-surface">微信支付</span>
            </div>
            <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
            </div>
          </article>
        </section>
      </main>

      {/* Fixed Bottom Payment Bar */}
      <div className="absolute bottom-0 left-0 w-full bg-surface-container-lowest p-4 pb-8 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] border-t border-outline-variant/10 z-50">
        <button 
          onClick={() => navigate('/booking-success')}
          className="w-full bg-primary text-on-primary h-12 rounded-lg flex items-center justify-center text-label-lg font-label-lg shadow-md hover:bg-surface-tint transition-colors"
        >
          支付 ¥{selectedFlight.price}
        </button>
      </div>
    </div>
  );
}
