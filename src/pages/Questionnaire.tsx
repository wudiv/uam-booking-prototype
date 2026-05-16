import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Send } from 'lucide-react';

function StarRating({ value, onChange }: { value: number, onChange: (val: number) => void }) {
  return (
    <div className="flex gap-3">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onChange(star)}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
            star <= value 
              ? 'bg-black text-white shadow-uber-1 scale-105' 
              : 'bg-surface-variant text-on-surface-variant hover:bg-outline/10'
          }`}
        >
          <Star 
            size={24} 
            strokeWidth={2} 
            fill={star <= value ? "currentColor" : "none"} 
          />
        </button>
      ))}
    </div>
  );
}

export function Questionnaire() {
  const navigate = useNavigate();
  
  const [trustScore, setTrustScore] = useState(0);
  const [riskScore, setRiskScore] = useState(0);
  const [intentScore, setIntentScore] = useState(0);

  const isFormComplete = trustScore > 0 && riskScore > 0 && intentScore > 0;

  const handleSubmit = () => {
    if (isFormComplete) {
      console.log('Survey results:', { trustScore, riskScore, intentScore });
      navigate('/');
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-white text-on-surface font-body">
      {/* Header */}
      <header className="shrink-0 flex items-center justify-between px-gutter h-14 border-b border-outline/5">
        <div className="w-10"></div>
        <h1 className="text-display-sm font-bold">原型测试反馈</h1>
        <div className="w-10"></div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-gutter py-8 flex flex-col gap-8 no-scrollbar">
        
        <div>
          <h2 className="text-display-md font-bold leading-tight">感谢体验！</h2>
          <p className="text-label-md font-medium text-on-surface-variant mt-2">
            请根据刚才的 UAM 预订流程，评价你对该服务的感受。
          </p>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {/* Question 1 */}
          <div className="bg-white border border-outline/10 rounded-2xl p-6 shadow-uber-1 flex flex-col items-center text-center">
            <h3 className="text-label-lg font-bold">初始信任</h3>
            <p className="text-label-sm font-medium text-on-surface-variant mt-1 mb-6">你认为目前的 UAM 服务值得信赖吗？</p>
            <StarRating value={trustScore} onChange={setTrustScore} />
          </div>

          {/* Question 2 */}
          <div className="bg-white border border-outline/10 rounded-2xl p-6 shadow-uber-1 flex flex-col items-center text-center">
            <h3 className="text-label-lg font-bold">风险感知</h3>
            <p className="text-label-sm font-medium text-on-surface-variant mt-1 mb-6">你觉得乘坐该飞行器安全吗？（星级越高越安全）</p>
            <StarRating value={riskScore} onChange={setRiskScore} />
          </div>

          {/* Question 3 */}
          <div className="bg-white border border-outline/10 rounded-2xl p-6 shadow-uber-1 flex flex-col items-center text-center">
            <h3 className="text-label-lg font-bold">使用意向</h3>
            <p className="text-label-sm font-medium text-on-surface-variant mt-1 mb-6">未来如果有机会，你会实际使用该服务吗？</p>
            <StarRating value={intentScore} onChange={setIntentScore} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="shrink-0 p-gutter pb-safe bg-white border-t border-outline/10">
        <button 
          onClick={handleSubmit}
          disabled={!isFormComplete}
          className={`w-full h-14 rounded-pill text-label-lg font-bold flex items-center justify-center gap-2 transition-all shadow-uber-3 ${
            isFormComplete 
              ? 'bg-primary text-on-primary active:scale-[0.98]' 
              : 'bg-surface-variant text-on-surface-variant opacity-40 cursor-not-allowed'
          }`}
        >
          <span>提交反馈并返回首页</span>
          {isFormComplete && <Send size={20} />}
        </button>
      </footer>
    </div>
  );
}
