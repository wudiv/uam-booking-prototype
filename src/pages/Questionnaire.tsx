import { ArrowRight, Check } from 'lucide-react';
import { Button } from '../components/Button';

const QUESTIONNAIRE_URL = 'https://v.wjx.cn/vm/mXsIrsF.aspx';

export function Questionnaire() {
  const handleReturnToQuestionnaire = () => {
    if (window.opener && !window.opener.closed) {
      window.opener.focus();
      window.close();

      window.setTimeout(() => {
        window.location.assign(QUESTIONNAIRE_URL);
      }, 300);
      return;
    }

    window.location.assign(QUESTIONNAIRE_URL);
  };

  return (
    <div className="w-full h-full flex flex-col bg-white text-on-surface font-body">
      <header className="shrink-0 flex items-center justify-between px-4 h-14 border-b border-outline/5">
        <div className="w-10"></div>
        <h1 className="text-display-sm font-bold">体验完成</h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 pb-16">
        <section className="w-full max-w-sm flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center shadow-uber-2 mb-7">
            <Check size={38} strokeWidth={2.5} aria-hidden="true" />
          </div>
          <h2 className="text-display-md font-bold leading-tight">原型体验已完成</h2>
          <p className="text-label-md font-medium text-on-surface-variant mt-3 leading-relaxed">
            请返回问卷页面，继续完成后续题目。
          </p>
        </section>
      </main>

      <footer className="shrink-0 p-4 pb-safe bg-white border-t border-outline/10">
        <Button 
          type="button"
          size="full"
          shape="pill"
          onClick={handleReturnToQuestionnaire}
          rightIcon={<ArrowRight size={20} strokeWidth={2.5} />}
        >
          返回问卷继续作答
        </Button>
      </footer>
    </div>
  );
}
