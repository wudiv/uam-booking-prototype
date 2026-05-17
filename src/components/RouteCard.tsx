import React from 'react';
import type { LucideProps } from 'lucide-react';

export interface RouteCardProps {
  icon: React.ComponentType<LucideProps>;
  title: string;
  badge?: string;
  category?: string;
  duration: string;
  price: number;
  isHighlight?: boolean;
  savingsLabel?: string;
  onClick: () => void;
  className?: string;
}

export const RouteCard = React.forwardRef<HTMLButtonElement, RouteCardProps>(
  ({
    icon: Icon,
    title,
    badge,
    category,
    duration,
    price,
    isHighlight = false,
    savingsLabel,
    onClick,
    className = '',
  }, ref) => {
    // 推荐卡片：更大更突出
    const highlightStyles = 'w-full text-left bg-white rounded-2xl p-6 transition-all active:scale-[0.98] flex flex-col gap-5 border-2 border-primary shadow-uber-2 relative overflow-hidden';
    
    // 普通卡片：紧凑布局
    const normalStyles = 'w-full text-left bg-white rounded-xl p-4 transition-all active:scale-[0.99] flex flex-col gap-3 border border-outline/10 shadow-uber-1 hover:bg-surface-variant';
    
    const containerClasses = isHighlight ? highlightStyles : normalStyles;

    return (
      <button
        ref={ref}
        onClick={onClick}
        aria-label={`${title}，${duration}，¥${price}`}
        className={containerClasses + ` ${className}`}
      >
        {/* Badge - 只在推荐卡片显示 */}
        {badge && isHighlight && (
          <div className="absolute top-0 right-0 bg-primary text-on-primary text-[10px] font-bold px-3 py-1 rounded-bl-2xl uppercase tracking-wider">
            {badge}
          </div>
        )}

        {/* Content */}
        <div className={`flex items-center justify-between w-full ${isHighlight ? '' : 'gap-2'}`}>
          {/* Left: Icon + Text */}
          <div className={`flex items-center ${isHighlight ? 'gap-4' : 'gap-3'}`}>
            {/* Icon Circle */}
            <div className={`rounded-full flex items-center justify-center flex-shrink-0 ${
              isHighlight 
                ? 'w-14 h-14 bg-primary shadow-uber-1' 
                : 'w-10 h-10 bg-surface-variant'
            }`}>
              <Icon 
                size={isHighlight ? 28 : 20} 
                className={isHighlight ? 'text-on-primary' : 'text-on-surface'} 
                strokeWidth={1.5} 
              />
            </div>

            {/* Title + Details */}
            <div className="flex-1 min-w-0">
              {/* Title + Category */}
              <div className={`flex items-center gap-2 ${isHighlight ? '' : 'flex-wrap'}`}>
                <h3 className={isHighlight ? 'text-label-lg font-bold text-on-surface' : 'text-label-md font-bold text-on-surface'}>
                  {title}
                </h3>
                {category && (
                  <span className="bg-surface-variant text-on-surface-variant text-[9px] px-1.5 py-0.5 rounded font-bold shrink-0">
                    {category}
                  </span>
                )}
              </div>

              {/* Duration + Savings */}
              <div className={`flex items-center gap-2 ${isHighlight ? 'mt-2' : 'mt-1'}`}>
                <span className={`font-bold whitespace-nowrap ${isHighlight ? 'text-label-lg text-primary' : 'text-label-sm text-on-surface-variant'}`}>
                  {duration}
                </span>
                {savingsLabel && (
                  <span className="text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-bold shrink-0">
                    {savingsLabel}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right: Price */}
          <div className={`text-right flex-shrink-0 ${isHighlight ? 'ml-4' : 'ml-2'}`}>
            <div className={`font-bold whitespace-nowrap ${isHighlight ? 'text-display-sm text-primary' : 'text-label-lg text-on-surface'}`}>
              ¥{price}
            </div>
          </div>
        </div>
      </button>
    );
  }
);

RouteCard.displayName = 'RouteCard';
