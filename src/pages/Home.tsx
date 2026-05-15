import { useNavigate } from 'react-router-dom';
import { useBookingStore } from '../store/useBookingStore';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedBackground } from '../components/AnimatedBackground';

export function Home() {
  const navigate = useNavigate();
  const { fromAddress, toAddress, setDestination, setOrigin } = useBookingStore();

  return (
    <div className="w-full h-full flex flex-col bg-background text-on-background overflow-hidden relative">
      <AnimatedBackground />

      {/* Header - M3 Surface Backdrop */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 flex-shrink-0 flex items-center justify-between px-container-padding h-14 bg-surface/30 backdrop-blur-md"
      >
        <button className="text-on-surface-variant hover:bg-surface-container-high transition-colors p-1 rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <h1 className="text-display-sm font-bold text-primary tracking-tight">空行 UAM</h1>
        <button className="text-on-surface-variant hover:bg-surface-container-high transition-colors p-1 rounded-full flex items-center justify-center relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full ring-2 ring-surface"></span>
        </button>
      </motion.header>

      {/* Content Area */}
      <main className="relative z-10 flex-1 overflow-y-auto no-scrollbar">
        <div className="px-container-padding pt-6 pb-12 flex flex-col gap-stack-lg">
          
          {/* Hero Section - React Bits Style Fade-in */}
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-display-lg font-bold text-on-surface leading-tight tracking-tight">
              随时随地<br />
              开启云端旅程
            </h2>
            <p className="text-body-md text-on-surface-variant mt-2 max-w-[80%]">
              避开拥堵，体验下一代城市空中交通，让出行像呼吸一样自由。
            </p>
          </motion.div>

          {/* Booking Card - M3 Elevation + Glassmorphism */}
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", damping: 25 }}
            className="bg-surface-container-lowest/80 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 p-5"
          >
            {/* Form Fields */}
            <div className="flex flex-col gap-stack-md">
              {/* Departure */}
              <div className="group transition-all">
                <div className="flex items-center gap-3 px-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-primary/10"></div>
                  <div className="flex-1">
                    <span className="text-label-sm font-bold text-primary block mb-0.5">从哪里出发？</span>
                    <input 
                      className="w-full bg-transparent border-none p-0 text-headline-sm font-medium text-on-surface placeholder:text-outline focus:ring-0 outline-none" 
                      placeholder="当前位置" 
                      type="text" 
                      value={fromAddress}
                      onChange={(e) => setOrigin(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Connector Line */}
              <div className="ml-[5px] h-4 border-l-2 border-dashed border-outline-variant/40"></div>

              {/* Destination */}
              <div className="group transition-all">
                <div className="flex items-start gap-3 px-1">
                  <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">location_on</span>
                  <div className="flex-1">
                    <span className="text-label-sm font-bold text-primary block mb-0.5">你要去哪儿？</span>
                    <input 
                      className="w-full bg-transparent border-none p-0 text-display-md font-bold text-on-surface placeholder:text-outline focus:ring-0 outline-none" 
                      placeholder="搜索起降点" 
                      type="text" 
                      value={toAddress}
                      onChange={(e) => setDestination(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button - Standardized 48px Height */}
            <button 
              onClick={() => {
                if (toAddress) navigate('/route-comparison');
              }}
              disabled={!toAddress}
              className="w-full h-[48px] bg-primary text-on-primary rounded-pill flex items-center justify-center text-label-lg font-bold mt-6 shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-30 disabled:grayscale"
            >
              查看出行方案
            </button>
          </motion.div>

          {/* Quick Actions / Recent */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 gap-stack-md"
          >
            <div 
              onClick={() => setDestination('宝安机场 T3')}
              className="bg-surface-container/40 backdrop-blur-md p-4 rounded-xl border border-outline-variant/10 active:scale-95 transition-transform cursor-pointer"
            >
              <span className="material-symbols-outlined text-primary mb-2">work</span>
              <div className="text-label-lg font-bold">去公司</div>
              <div className="text-label-sm text-on-surface-variant">约 12 分钟</div>
            </div>
            <div 
              onClick={() => setDestination('深圳北站')}
              className="bg-surface-container/40 backdrop-blur-md p-4 rounded-xl border border-outline-variant/10 active:scale-95 transition-transform cursor-pointer"
            >
              <span className="material-symbols-outlined text-primary mb-2">home</span>
              <div className="text-label-lg font-bold">回大本营</div>
              <div className="text-label-sm text-on-surface-variant">约 8 分钟</div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Navigation Bar - M3 Standard */}
      <footer className="flex-shrink-0 h-[64px] bg-surface/80 backdrop-blur-md border-t border-outline-variant/20 flex items-center justify-around px-4 pb-safe relative z-10">
        <button className="flex flex-col items-center gap-1 text-primary">
          <div className="px-5 py-1 rounded-full bg-primary-container/20 mb-1">
            <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>explore</span>
          </div>
          <span className="text-label-sm font-bold">探索</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-on-surface-variant/60">
          <div className="px-5 py-1">
            <span className="material-symbols-outlined text-[24px]">history</span>
          </div>
          <span className="text-label-sm">行程</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-on-surface-variant/60">
          <div className="px-5 py-1">
            <span className="material-symbols-outlined text-[24px]">account_circle</span>
          </div>
          <span className="text-label-sm">我的</span>
        </button>
      </footer>
    </div>
  );
}
