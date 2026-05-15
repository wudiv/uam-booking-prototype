import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export function Questionnaire() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);

  const questions = [
    "预订流程是否顺畅？",
    "价格是否在您的预期内？",
    "您是否愿意再次使用 UAM？"
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
        <h1 className="text-display-sm font-bold text-on-surface">意见反馈</h1>
        <div className="w-10 h-10"></div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar">
        <div className="px-container-padding pt-8 flex flex-col gap-stack-lg pb-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-display-md font-bold text-on-surface mb-2">感谢您的信任</h2>
            <p className="text-body-md text-on-surface-variant">您的反馈将帮助我们提供更好的飞行服务</p>
          </motion.div>

          {/* Rating Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="flex gap-3 my-4"
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                  rating >= star ? 'bg-primary text-on-primary scale-110 shadow-lg shadow-primary/20' : 'bg-surface-container text-outline-variant'
                }`}
              >
                <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: rating >= star ? "'FILL' 1" : "'FILL' 0" }}>star</span>
              </button>
            ))}
          </motion.div>

          {/* Questions */}
          <div className="w-full flex flex-col gap-4 mt-6">
            {questions.map((q, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="bg-surface-container-lowest border border-outline-variant/30 p-4 rounded-xl flex flex-col gap-3 shadow-sm"
              >
                <p className="text-label-lg font-bold text-on-surface">{q}</p>
                <div className="flex gap-2">
                  <button className="flex-1 h-9 rounded-pill border border-outline-variant text-label-sm font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors">不满意</button>
                  <button className="flex-1 h-9 rounded-pill bg-primary/10 text-primary border border-primary/20 text-label-sm font-bold hover:bg-primary/20 transition-colors">满意</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Sticky Bottom Action */}
      <div className="flex-shrink-0 px-container-padding py-4 pb-safe bg-surface/80 backdrop-blur-md border-t border-outline-variant/20 fixed bottom-0 left-0 w-full z-20">
        <button 
          onClick={() => navigate('/')}
          className="w-full h-[48px] bg-primary text-on-primary rounded-pill text-label-lg font-bold flex items-center justify-center hover:bg-primary/90 transition-all active:scale-[0.98] shadow-xl shadow-primary/20"
        >
          提交反馈
        </button>
      </div>
    </div>
  );
}
