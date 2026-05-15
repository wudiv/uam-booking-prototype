import { useNavigate } from 'react-router-dom';
import { useBookingStore } from '../store/useBookingStore';
import { motion } from 'framer-motion';

export function RouteComparison() {
  const navigate = useNavigate();
  const { fromAddress, toAddress } = useBookingStore();

  const options = [
    {
      id: 'uam',
      title: '空行 UAM',
      desc: '垂直起降，飞越拥堵',
      time: '18 分钟',
      price: '¥268',
      tag: '最快',
      icon: 'flight_takeoff',
      primary: true
    },
    {
      id: 'car',
      title: '网约车 (尊享型)',
      desc: '地面行驶，交通预测中',
      time: '65 分钟',
      price: '¥185',
      tag: '舒适',
      icon: 'directions_car',
      primary: false
    },
    {
      id: 'subway',
      title: '地铁 + 接驳',
      desc: '绿色出行，多次换乘',
      time: '85 分钟',
      price: '¥12',
      tag: '最低价',
      icon: 'subway',
      primary: false
    }
  ];

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
        <h1 className="text-display-sm font-bold text-on-surface">方案对比</h1>
        <div className="w-10 h-10"></div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar">
        <div className="px-container-padding pt-6 flex flex-col gap-stack-lg pb-12">
          
          {/* Route Info */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-2 px-1"
          >
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span className="text-body-md font-bold text-on-surface">{fromAddress || '我的位置'}</span>
            </div>
            <div className="ml-1 h-3 border-l border-outline-variant/50 border-dashed"></div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[18px]">location_on</span>
              <span className="text-body-md font-bold text-on-surface">{toAddress || '目的地'}</span>
            </div>
          </motion.div>

          {/* Options List */}
          <div className="flex flex-col gap-4">
            {options.map((opt, index) => (
              <motion.div
                key={opt.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => opt.id === 'uam' && navigate('/flight-selection')}
                className={`group relative p-4 rounded-xl border transition-all cursor-pointer active:scale-[0.98] ${
                  opt.primary 
                    ? 'bg-primary/5 border-primary shadow-lg shadow-primary/5' 
                    : 'bg-surface-container-lowest border-outline-variant/30 hover:border-outline-variant'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${opt.primary ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant'}`}>
                      <span className="material-symbols-outlined text-[20px]">{opt.icon}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className={`text-label-lg font-bold ${opt.primary ? 'text-primary' : 'text-on-surface'}`}>{opt.title}</span>
                      <span className="text-label-sm text-on-surface-variant">{opt.desc}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-display-sm font-bold text-on-surface">{opt.time}</span>
                    <span className="text-label-sm text-on-surface-variant font-bold">{opt.price}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded-md text-label-sm ${opt.primary ? 'bg-primary text-on-primary' : 'bg-secondary-container text-on-secondary-container'}`}>
                    {opt.tag}
                  </span>
                  {opt.primary && (
                    <div className="flex items-center gap-1 text-primary text-label-sm font-bold animate-pulse">
                      <span>立即出发</span>
                      <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
