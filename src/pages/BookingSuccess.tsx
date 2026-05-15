import { useNavigate, Navigate } from 'react-router-dom';
import { useBookingStore } from '../store/useBookingStore';

export function BookingSuccess() {
  const navigate = useNavigate();
  const { selectedFlight } = useBookingStore();

  if (!selectedFlight) return <Navigate to="/" replace />;

  return (
    /* 弹性三段式布局：header + scrollable content + footer */
    <div className="w-full h-full flex flex-col bg-background text-on-background">
      {/* Header - 固定高度 */}
      <header className="flex-shrink-0 flex items-center justify-between px-container-padding h-12 bg-surface/80 backdrop-blur-md z-10">
        <button 
          onClick={() => navigate('/')}
          className="w-12 h-12 flex items-center justify-start text-on-surface-variant"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>close</span>
        </button>
        <h1 className="text-headline-md font-headline-md text-primary tracking-tight">预订成功</h1>
        <div className="w-12 h-12"></div>
      </header>

      {/* Content - 自动填充剩余空间，可滚动 */}
      <main className="flex-1 overflow-y-auto px-container-padding py-6 flex flex-col gap-stack-lg no-scrollbar">
        {/* Status Card (Boarding Pass Style) */}
        <div className="bg-surface-container-lowest rounded-[24px] shadow-lg overflow-hidden flex flex-col border border-outline-variant/30">
          {/* Header section */}
          <div className="bg-primary px-container-padding py-stack-md text-on-primary flex justify-between items-center relative overflow-hidden">
            <div className="z-10">
              <div className="text-label-sm font-label-sm opacity-80 uppercase tracking-wider mb-1">Flight</div>
              <div className="text-headline-lg font-headline-lg">{selectedFlight.name}</div>
            </div>
            <div className="z-10 text-right">
              <span className="inline-flex items-center gap-1 bg-on-primary/20 px-3 py-1 rounded-full text-label-sm font-label-sm mb-2">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                已出票
              </span>
            </div>
            {/* Decorative pattern */}
            <span className="material-symbols-outlined absolute -right-6 -bottom-8 text-[120px] opacity-10" style={{ fontVariationSettings: "'FILL' 1" }}>flight</span>
          </div>

          {/* Details Section */}
          <div className="p-container-padding grid grid-cols-2 gap-stack-md border-b border-dashed border-outline-variant/50 relative">
            {/* Cutouts */}
            <div className="absolute left-[-12px] bottom-[-12px] w-6 h-6 rounded-full bg-background border border-outline-variant/30"></div>
            <div className="absolute right-[-12px] bottom-[-12px] w-6 h-6 rounded-full bg-background border border-outline-variant/30"></div>
            
            <div>
              <div className="text-label-sm font-label-sm text-on-surface-variant mb-1">Seat</div>
              <div className="text-display-lg font-display-lg text-primary">2A</div>
            </div>
            <div className="text-right">
              <div className="text-label-sm font-label-sm text-on-surface-variant mb-1">Take-off</div>
              <div className="text-display-lg font-display-lg text-on-surface">{selectedFlight.departureTime}</div>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="p-container-padding flex flex-col items-center justify-center pt-stack-lg relative">
            <div className="w-48 h-48 bg-surface-container-low rounded-xl flex items-center justify-center shadow-inner mb-stack-sm relative border border-outline-variant/20 p-2">
              <img 
                alt="QR Code" 
                className="w-full h-full object-cover rounded-lg opacity-80 mix-blend-multiply" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqwCSM3U2ij1Z4-493D0SfvG-QH2j6XR2SMert7UEBCCkV0eIr0OKSctghNVjUNe4sb7LNHTHEZHFIZL3rw8iZoMlv4Xt5Lb3_teVE5AGe1mEh8o50QYFkzij5Y8QsnrNICBo4SQ4rxpYoW-IAjqFaoqgce9lBUm2B2EK_5m3yO2T4WT16ceio4zp5KJC8qfxkI2FzsUWpDVvJ0c4zcIy8hpKQo49xih7fPnS4NUdy5lyb_IN803RQynu-0peJgIl2WMPAV56wBpc"
              />
              <div className="absolute inset-0 border-2 border-primary rounded-xl opacity-50 m-2"></div>
            </div>
            <div className="text-label-sm font-label-sm text-on-surface-variant text-center max-w-[80%]">
              <span className="material-symbols-outlined text-[16px] align-middle mr-1 text-primary">info</span>
              请在起飞前 8 分钟到达起降点以完成核验
            </div>
          </div>
        </div>

        {/* Dispatch Timeline */}
        <div className="bg-surface-container-lowest rounded-[24px] shadow-lg p-container-padding border border-outline-variant/30">
          <h2 className="text-headline-md font-headline-md text-on-surface mb-stack-lg">行程追踪</h2>
          <div className="relative pl-6 border-l-2 border-outline-variant/30 pb-4">
            
            {/* Step 1: Active */}
            <div className="relative mb-stack-lg">
              <div className="absolute -left-[35px] w-4 h-4 rounded-full bg-primary ring-4 ring-primary-container/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-on-primary"></div>
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-label-lg font-label-lg text-primary">接驳车到达</h3>
                  <p className="text-body-md font-body-md text-on-surface-variant">预计 4 分钟后到达您的当前位置</p>
                </div>
                <span className="material-symbols-outlined text-primary">directions_car</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative mb-stack-lg opacity-60">
              <div className="absolute -left-[35px] w-4 h-4 rounded-full bg-surface-container-highest border-2 border-outline flex items-center justify-center"></div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-label-lg font-label-lg text-on-surface">到达起降点</h3>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant">location_on</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative mb-stack-lg opacity-60">
              <div className="absolute -left-[35px] w-4 h-4 rounded-full bg-surface-container-highest border-2 border-outline flex items-center justify-center"></div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-label-lg font-label-lg text-on-surface">实名核验</h3>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant">badge</span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative mb-stack-lg opacity-60">
              <div className="absolute -left-[35px] w-4 h-4 rounded-full bg-surface-container-highest border-2 border-outline flex items-center justify-center"></div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-label-lg font-label-lg text-on-surface">登机</h3>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant">airplane_ticket</span>
              </div>
            </div>

            {/* Step 5 */}
            <div className="relative opacity-60">
              <div className="absolute -left-[35px] w-4 h-4 rounded-full bg-surface-container-highest border-2 border-outline flex items-center justify-center"></div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-label-lg font-label-lg text-on-surface">起飞</h3>
                  <p className="text-body-md font-body-md text-on-surface-variant">预计 {selectedFlight.departureTime}</p>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant">flight_takeoff</span>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Footer - 固定高度 */}
      <div className="flex-shrink-0 p-container-padding bg-surface/90 backdrop-blur-md border-t border-outline-variant/20" style={{ paddingBottom: 'calc(16px + env(safe-area-inset-bottom, 0px))' }}>
        <button 
          onClick={() => navigate('/questionnaire')}
          className="w-full h-12 bg-primary text-on-primary rounded-lg text-label-lg font-label-lg flex items-center justify-center gap-2 hover:bg-primary-container transition-colors shadow-md"
        >
          下一步：填写问卷
        </button>
      </div>
    </div>
  );
}
