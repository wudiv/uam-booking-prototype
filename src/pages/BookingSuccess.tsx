import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export function BookingSuccess() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-col bg-background text-on-background overflow-hidden relative">
      {/* Celebration Background Effect */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 2, opacity: 0.1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary rounded-full blur-[100px]"
        />
      </div>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-container-padding text-center">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 15, stiffness: 200 }}
          className="w-20 h-20 bg-primary text-on-primary rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-primary/30"
        >
          <span className="material-symbols-outlined text-[40px]">check</span>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-display-lg font-bold text-on-surface mb-2">预订成功！</h1>
          <p className="text-body-md text-on-surface-variant max-w-[240px] mx-auto">
            您的 UAM 航班已确认。请准时到达起降点办理登机手续。
          </p>
        </motion.div>

        {/* Order Details Mini Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-5 mt-10 text-left shadow-sm"
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-label-sm text-on-surface-variant">订单编号</span>
            <span className="text-label-sm font-bold text-on-surface">UAM20260515888</span>
          </div>
          <div className="h-px bg-outline-variant/20 mb-4"></div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-body-sm text-on-surface-variant">出发时间</span>
              <span className="text-body-sm font-bold text-on-surface">今天 14:20</span>
            </div>
            <div className="flex justify-between">
              <span className="text-body-sm text-on-surface-variant">起降点</span>
              <span className="text-body-sm font-bold text-on-surface">南山科技园 A1</span>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer Actions */}
      <motion.footer 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex-shrink-0 px-container-padding py-6 pb-safe flex flex-col gap-3 relative z-10"
      >
        <button 
          onClick={() => navigate('/questionnaire')}
          className="w-full h-[48px] bg-primary text-on-primary rounded-pill text-label-lg font-bold flex items-center justify-center hover:bg-primary/90 transition-all active:scale-[0.98] shadow-xl shadow-primary/20"
        >
          完成并反馈
        </button>
        <button 
          onClick={() => navigate('/')}
          className="w-full h-[48px] bg-surface text-primary border border-primary/20 rounded-pill text-label-lg font-bold flex items-center justify-center hover:bg-surface-container-low transition-all active:scale-[0.98]"
        >
          返回首页
        </button>
      </motion.footer>
    </div>
  );
}
