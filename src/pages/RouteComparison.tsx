import { useNavigate } from 'react-router-dom';
import { MapBackground } from '../components/MapBackground';

export function RouteComparison() {
  const navigate = useNavigate();

  return (
    <div className="bg-surface font-body-lg text-on-surface antialiased overflow-hidden w-full h-full relative">
      {/* Background Map Layer */}
      <div className="absolute inset-0 z-0">
        <MapBackground />
        {/* Map Overlay Gradients for Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-surface/40 via-transparent to-surface/20 pointer-events-none"></div>
      </div>
      
      {/* TopAppBar */}
      <header className="bg-surface/80 dark:bg-surface-dim/80 backdrop-blur-md border-b border-outline-variant/30 absolute top-0 left-0 w-full z-50 flex items-center justify-between px-container-padding h-12">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center justify-center opacity-80 hover:bg-surface-container-high transition-colors rounded-full w-8 h-8"
        >
          <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim" style={{fontVariationSettings: "'FILL' 0"}}>arrow_back</span>
        </button>
        <h1 className="text-headline-md font-headline-md text-primary dark:text-primary-fixed-dim tracking-tight">空行 UAM</h1>
        <button className="flex items-center justify-center opacity-80 hover:bg-surface-container-high transition-colors rounded-full w-8 h-8">
          <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim" style={{fontVariationSettings: "'FILL' 0"}}>notifications</span>
        </button>
      </header>

      {/* Main Content as a Floating Bottom Sheet / Card overlay */}
      <main className="absolute inset-x-0 bottom-0 top-[64px] z-10 flex flex-col items-center">
        {/* Container for max width on larger screens */}
        <div className="w-full max-w-lg h-full bg-surface shadow-[0_-12px_24px_rgba(0,0,0,0.05)] rounded-t-[24px] flex flex-col relative">
          {/* Grabber for visual affordance */}
          <div className="w-full flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 bg-outline-variant/50 rounded-full"></div>
          </div>
          <div className="px-container-padding pt-4 pb-6 flex-shrink-0">
            <h2 className="text-headline-lg font-headline-lg text-on-surface">选择出行方案</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="material-symbols-outlined text-[16px] text-primary">schedule</span>
              <p className="text-body-md font-body-md text-on-surface-variant">今天 14:30 出发 · 1名乘客</p>
            </div>
          </div>
          
          {/* Scrollable Cards Area */}
          <div className="flex-1 overflow-y-auto px-container-padding space-y-stack-md pb-[100px] no-scrollbar">
            {/* Card 1: UAM (Selected State) */}
            <button 
              onClick={() => navigate('/order-confirmation')}
              className="w-full text-left bg-surface-container-lowest border-2 border-primary rounded-xl p-4 shadow-sm relative overflow-hidden transition-all hover:shadow-md flex flex-col gap-3 group"
            >
              <div className="absolute top-0 right-0 bg-primary text-on-primary text-[10px] font-bold px-2 py-1 rounded-bl-lg">最快</div>
              <div className="flex items-start justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>flight_takeoff</span>
                  </div>
                  <div>
                    <h3 className="text-label-lg font-label-lg text-on-surface">UAM空中快线</h3>
                    <div className="text-body-md font-body-md text-primary mt-0.5">18分钟</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-price-tag font-price-tag text-on-surface">¥268</div>
                </div>
              </div>
            </button>
            
            {/* Card 2: Ride-hailing */}
            <button className="w-full text-left bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-4 shadow-sm relative transition-all hover:bg-surface-container-low flex flex-col gap-3">
              <div className="flex items-start justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-on-surface-variant">directions_car</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-label-lg font-label-lg text-on-surface">网约车直达</h3>
                      <span className="bg-surface-container-high text-on-surface-variant text-[10px] px-1.5 py-0.5 rounded">地面交通</span>
                    </div>
                    <div className="text-body-md font-body-md text-on-surface-variant mt-0.5">52分钟</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-price-tag font-price-tag text-on-surface">¥96</div>
                </div>
              </div>
            </button>
            
            {/* Card 3: Subway */}
            <button className="w-full text-left bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-4 shadow-sm relative transition-all hover:bg-surface-container-low flex flex-col gap-3">
              <div className="flex items-start justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-on-surface-variant">subway</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-label-lg font-label-lg text-on-surface">地铁+机场快线</h3>
                      <span className="bg-[#EDF2F4] text-on-surface-variant text-[10px] px-1.5 py-0.5 rounded">经济</span>
                    </div>
                    <div className="text-body-md font-body-md text-on-surface-variant mt-0.5">64分钟</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-price-tag font-price-tag text-on-surface">¥37</div>
                </div>
              </div>
            </button>
          </div>
          
          {/* Fixed Bottom Action Area */}
          <div className="absolute bottom-0 left-0 w-full bg-surface/95 backdrop-blur-sm border-t border-outline-variant/20 px-container-padding py-4 pb-safe z-20">
            <button 
              onClick={() => navigate('/flight-selection')}
              className="w-full h-[48px] bg-primary hover:bg-surface-tint active:scale-[0.98] transition-all text-on-primary rounded-lg text-label-lg font-label-lg flex items-center justify-center shadow-lg shadow-primary/20"
            >
              选择 UAM 空中快线
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
