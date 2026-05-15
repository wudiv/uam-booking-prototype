import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function StarRating({ value, onChange }: { value: number, onChange: (val: number) => void }) {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onChange(star)}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            star <= value 
              ? 'bg-primary text-on-primary scale-110 shadow-sm' 
              : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
          }`}
        >
          <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: `'FILL' ${star <= value ? 1 : 0}` }}>
            star
          </span>
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
    /* 弹性三段式布局 */
    <div className="w-full h-full flex flex-col bg-surface text-on-surface antialiased">
      {/* Header - 固定高度 */}
      <header className="flex-shrink-0 px-container-padding flex items-center justify-between h-14 bg-surface border-b border-outline-variant/30 z-10">
        <div className="w-10"></div>
        <h1 className="text-headline-md font-headline-md text-on-surface">原型测试反馈</h1>
        <div className="w-10"></div>
      </header>

      {/* Content - 自动填充，可滚动 */}
      <main className="flex-1 overflow-y-auto px-container-padding py-6 flex flex-col gap-stack-lg no-scrollbar">
        
        <div className="mb-4">
          <h2 className="text-display-sm font-display-sm text-on-surface mb-2">感谢体验！</h2>
          <p className="text-body-lg font-body-lg text-on-surface-variant">
            请根据刚才的 UAM 预订流程，评价你对该服务的感受。
          </p>
        </div>

        {/* Question 1 */}
        <div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/30 shadow-sm flex flex-col items-center text-center">
          <h3 className="text-label-lg font-label-lg text-on-surface mb-1">初始信任</h3>
          <p className="text-body-md font-body-md text-on-surface-variant mb-4">你认为目前的 UAM 服务值得信赖吗？</p>
          <StarRating value={trustScore} onChange={setTrustScore} />
        </div>

        {/* Question 2 */}
        <div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/30 shadow-sm flex flex-col items-center text-center">
          <h3 className="text-label-lg font-label-lg text-on-surface mb-1">风险感知</h3>
          <p className="text-body-md font-body-md text-on-surface-variant mb-4">你觉得乘坐该飞行器安全吗？（星级越高越安全）</p>
          <StarRating value={riskScore} onChange={setRiskScore} />
        </div>

        {/* Question 3 */}
        <div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/30 shadow-sm flex flex-col items-center text-center">
          <h3 className="text-label-lg font-label-lg text-on-surface mb-1">使用意向</h3>
          <p className="text-body-md font-body-md text-on-surface-variant mb-4">未来如果有机会，你会实际使用该服务吗？</p>
          <StarRating value={intentScore} onChange={setIntentScore} />
        </div>
        
      </main>

      {/* Footer - 固定高度 */}
      <div className="flex-shrink-0 p-container-padding pb-safe bg-surface border-t border-outline-variant/20">
        <button 
          onClick={handleSubmit}
          disabled={!isFormComplete}
          className={`w-full h-[48px] rounded-pill text-label-lg font-bold flex items-center justify-center transition-all shadow-md ${
            isFormComplete 
              ? 'bg-primary text-on-primary hover:bg-primary/90 active:scale-[0.98]' 
              : 'bg-surface-container-highest text-on-surface-variant opacity-50 cursor-not-allowed'
          }`}
        >
          提交反馈并返回首页
        </button>
      </div>
    </div>
  );
}
