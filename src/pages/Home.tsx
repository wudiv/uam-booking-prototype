import { useNavigate } from 'react-router-dom';
import { MapBackground } from '../components/MapBackground';
import { useBookingStore } from '../store/useBookingStore';

export function Home() {
  const navigate = useNavigate();
  const { destination, setDestination } = useBookingStore();

  return (
    <div className="bg-background text-on-surface w-full h-full min-h-[max(884px,100dvh)] overflow-hidden relative font-body-lg">
      {/* TopAppBar — Stitch 使用 fixed */}
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-container-padding h-12 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30">
        <button className="text-on-surface-variant hover:bg-surface-container-high transition-colors opacity-80 duration-150 p-1 rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <h1 className="text-headline-md font-headline-md text-primary tracking-tight">空行 UAM</h1>
        <button className="text-on-surface-variant hover:bg-surface-container-high transition-colors opacity-80 duration-150 p-1 rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </header>

      {/* Map Canvas (Ground Layer Level 0) */}
      <main className="absolute inset-0 w-full h-full z-0">
        <MapBackground />
        
        {/* Map Overlay Gradients for Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-surface/40 via-transparent to-surface/20 pointer-events-none"></div>
        

      </main>

      {/* Floating Bottom Sheet (Drawer Level 2) */}
      <div className="absolute bottom-[72px] left-0 w-full px-container-padding z-40 pb-stack-md">
        <div className="bg-surface-container-lowest rounded-t-xl rounded-b-xl shadow-lg border border-outline-variant/20 flex flex-col">
          {/* Grabber */}
          <div className="w-full flex justify-center pt-3 pb-2">
            <div className="w-8 h-1 bg-outline-variant/50 rounded-full"></div>
          </div>
          
          {/* Transport Categories */}
          <div className="flex items-center px-4 overflow-x-auto no-scrollbar border-b border-surface-variant">
            <button className="px-4 py-3 text-label-lg font-label-lg text-on-surface-variant whitespace-nowrap">网约车</button>
            <button className="px-4 py-3 text-label-lg font-label-lg text-on-surface-variant whitespace-nowrap">地铁</button>
            <button className="px-4 py-3 text-label-lg font-label-lg text-on-surface-variant whitespace-nowrap">预约</button>
            <button className="px-4 py-3 text-label-lg font-label-lg text-primary border-b-2 border-primary whitespace-nowrap">UAM</button>
          </div>
          
            {/* Content Area */}
          <div className="p-container-padding flex flex-col gap-stack-md">
            {/* Origin / Destination Inputs */}
            <div className="flex relative bg-surface-container-low rounded-lg p-3">
              {/* Timeline Connector */}
              <div className="absolute left-6 top-8 bottom-8 w-px border-l-2 border-dashed border-outline-variant"></div>
              
              <div className="flex flex-col gap-4 w-full">
                {/* Origin */}
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>
                  </div>
                  <div className="flex-1 pb-3 border-b border-surface-variant">
                    <span className="text-body-lg font-body-lg text-on-surface">福田 CBD · 卓越中心</span>
                  </div>
                </div>
                
                {/* Destination */}
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full border-2 border-primary"></div>
                  </div>
                  <div className="flex-1">
                    <input 
                      className="w-full bg-transparent border-none p-0 text-display-lg font-display-lg text-on-surface placeholder:text-outline focus:ring-0 outline-none" 
                      placeholder="你要去哪儿？" 
                      type="text" 
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Frequent Locations Chips */}
            <div className="flex gap-3 overflow-x-auto no-scrollbar">
              <button 
                onClick={() => setDestination('宝安机场 T3')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container rounded-full text-label-sm font-label-sm text-on-surface-variant hover:bg-surface-variant transition-colors border border-outline-variant/30 flex-shrink-0"
              >
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                宝安机场 T3
              </button>
              <button 
                onClick={() => setDestination('深圳北站')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container rounded-full text-label-sm font-label-sm text-on-surface-variant hover:bg-surface-variant transition-colors border border-outline-variant/30 flex-shrink-0"
              >
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                深圳北站
              </button>
            </div>
            
            {/* Main Action Button */}
            <button 
              onClick={() => {
                if (destination) navigate('/route-comparison');
              }}
              disabled={!destination}
              className="w-full h-[48px] bg-primary text-on-primary rounded-lg flex items-center justify-center text-label-lg font-label-lg mt-2 shadow-sm hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
            >
              查看出行方案
            </button>
          </div>
        </div>
      </div>

      {/* BottomNavBar — Stitch 使用 fixed + pb-safe */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center pt-2 pb-safe px-4 bg-surface rounded-t-xl shadow-[0_-4px_12px_0_rgba(0,0,0,0.05)]">
        <button className="flex flex-col items-center justify-center text-primary font-bold scale-95 duration-200 w-16 pb-1">
          <div className="px-4 py-1 rounded-full bg-primary-container/20 mb-1">
            <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>home</span>
          </div>
          <span className="text-label-sm font-label-sm">首页</span>
        </button>
        <button className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-all duration-200 w-16 pb-1">
          <div className="px-4 py-1 mb-1">
            <span className="material-symbols-outlined">flight_takeoff</span>
          </div>
          <span className="text-label-sm font-label-sm">行程</span>
        </button>
        <button className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-all duration-200 w-16 pb-1">
          <div className="px-4 py-1 mb-1">
            <span className="material-symbols-outlined">hub</span>
          </div>
          <span className="text-label-sm font-label-sm">社区</span>
        </button>
        <button className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-all duration-200 w-16 pb-1">
          <div className="px-4 py-1 mb-1">
            <span className="material-symbols-outlined">person</span>
          </div>
          <span className="text-label-sm font-label-sm">我的</span>
        </button>
      </nav>
    </div>
  );
}
