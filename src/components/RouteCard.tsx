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
    const baseStyles = 'w-full text-left bg-white rounded-xl p-5 transition-all active:scale-[0.99] flex flex-col gap-4';
    const borderStyles = isHighlight 
      ? 'border-2 border-primary shadow-uber-2' 
      : 'border border-outline/10 shadow-uber-1 hover:bg-surface-variant';
    const containerClasses = `${baseStyles} ${borderStyles} ${className}`;

    return (
      <button
        ref={ref}
        onClick={onClick}
        aria-label={`${title}，${duration}，¥${price}`}
        className={containerClasses}
      >
        {/* Badge */}
        {badge && (
          <div className="absolute top-0 right-0 bg-primary text-on-primary text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
            {badge}
          </div>
        )}

        {/* Content */}
        <div className="flex items-center justify-between w-full">
          {/* Left: Icon + Text */}
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isHighlight 
                ? 'bg-primary shadow-uber-1' 
                : 'bg-surface-variant'
            }`}>
              <Icon 
                size={24} 
                className={isHighlight ? 'text-on-primary' : 'text-on-surface'} 
                strokeWidth={1.5} 
              />
            </div>

            <div>
              {/* Title + Category */}
              <div className="flex items-center gap-2">
                <h3 className={isHighlight ? 'text-display-sm font-bold' : 'text-label-lg font-bold'}>
                  {title}
                </h3>
                {category && (
                  <span className="bg-surface-variant text-on-surface-variant text-[10px] px-1.5 py-0.5 rounded font-bold">
                    {category}
                  </span>
                )}
              </div>

              {/* Duration + Savings */}
              <div className="flex items-center gap-2 mt-1">
                <span className={isHighlight ? 'text-display-sm font-bold text-primary' : 'text-label-md font-bold text-on-surface-variant'}>
                  {duration}
                </span>
                {savingsLabel && (
                  <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-bold">
                    {savingsLabel}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right: Price */}
          <div className="text-right">
            <div className={isHighlight ? 'text-display-md font-bold' : 'text-display-sm font-bold'}>
              ¥{price}
            </div>
          </div>
        </div>
      </button>
    );
  }
);

RouteCard.displayName = 'RouteCard';
