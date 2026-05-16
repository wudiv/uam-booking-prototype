import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const steps = [
    { label: '对比' },
    { label: '航班' },
    { label: '座位' },
    { label: '支付' }
  ];

  return (
    <div className="w-full px-12 py-3 flex items-center justify-between bg-white/50 backdrop-blur-sm relative border-b border-outline/5 shrink-0"
      role="navigation" aria-label="订票步骤"
    >
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        
        return (
          <React.Fragment key={step.label}>
            <div className="flex flex-col items-center relative z-10">
              <div 
                className={`
                  w-2 h-2 rounded-full transition-all duration-500
                  ${isCurrent ? 'bg-primary scale-150 shadow-[0_0_8px_rgba(0,0,0,0.3)]' : isCompleted ? 'bg-black' : 'bg-outline/30'}
                `}
              />
              <span className={`
                text-[9px] mt-1.5 font-bold uppercase tracking-tighter transition-colors duration-500
                ${isCurrent ? 'text-primary' : 'text-on-surface-variant opacity-40'}
              `}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-[1px] mx-2 bg-outline/10 relative -mt-3">
                <div className={`
                  absolute inset-0 bg-primary transition-all duration-700
                  ${index < currentStep ? 'w-full' : 'w-0'}
                `} />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
