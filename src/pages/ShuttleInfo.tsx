import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export function ShuttleInfo() {
  const navigate = useNavigate();

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
        <h1 className="text-display-sm font-bold text-on-surface">接驳详情</h1>
        <div className="w-10 h-10"></div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar">
        <div className="px-container-padding pt-6 flex flex-col gap-stack-lg pb-12">
          
          {/* Status Tracker */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-primary/5 rounded-xl border border-primary/20 p-5 flex flex-col gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">directions_car</span>
              </div>
              <div className="flex flex-col">
                <span className="text-label-lg font-bold text-primary">接驳车已就绪</span>
                <span className="text-label-sm text-on-surface-variant">预计 5 分钟后到达起降点</span>
              </div>
            </div>
            <div className="h-px bg-primary/10"></div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-label-sm text-on-surface-variant">车牌号</span>
                <span className="text-body-md font-bold text-on-surface">粤 B·88888</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-label-sm text-on-surface-variant">车型</span>
                <span className="text-body-md font-bold text-on-surface">特斯拉 Model Y</span>
              </div>
            </div>
          </motion.div>

          {/* Route Map Placeholder */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-surface-container-low aspect-[16/9] rounded-xl border border-outline-variant/30 flex items-center justify-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,104,121,0.05),transparent)]"></div>
            <span className="material-symbols-outlined text-outline-variant text-[48px]">map</span>
            <div className="absolute bottom-4 left-4 bg-surface/80 backdrop-blur-md px-3 py-1.5 rounded-pill border border-outline-variant/30 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
              <span className="text-label-sm font-bold text-on-surface">正在前往您的位置</span>
            </div>
          </motion.div>

          {/* Service Info */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-stack-md"
          >
            <h3 className="text-label-lg font-bold text-primary px-1">服务说明</h3>
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-4 flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-on-surface-variant text-[20px]">verified</span>
                <div className="flex flex-col">
                  <span className="text-body-md font-bold text-on-surface">尊享型接驳</span>
                  <span className="text-label-sm text-on-surface-variant leading-relaxed">提供瓶装水、手机充电及免费 Wi-Fi。</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-on-surface-variant text-[20px]"> luggage</span>
                <div className="flex flex-col">
                  <span className="text-body-md font-bold text-on-surface">行李协助</span>
                  <span className="text-label-sm text-on-surface-variant leading-relaxed">司机将协助您搬运行李至 UAM 值机口。</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Sticky Bottom Action */}
      <div className="flex-shrink-0 px-container-padding py-4 pb-safe bg-surface/80 backdrop-blur-md border-t border-outline-variant/20 fixed bottom-0 left-0 w-full z-20">
        <button 
          onClick={() => navigate('/order-confirmation')}
          className="w-full h-[48px] bg-primary text-on-primary rounded-pill text-label-lg font-bold flex items-center justify-center hover:bg-primary/90 transition-all active:scale-[0.98] shadow-xl shadow-primary/20"
        >
          确认接驳方案
        </button>
      </div>
    </div>
  );
}
