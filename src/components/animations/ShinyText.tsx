import React from 'react';
import './ShinyText.css';

interface ShinyTextProps {
  text: string;
  className?: string;
  shimmerWidth?: number;
  speed?: number;
}

const ShinyText: React.FC<ShinyTextProps> = ({ 
  text, 
  className = '', 
  shimmerWidth = 100, 
  speed = 2 
}) => {
  return (
    <span 
      className={`shiny-text ${className}`}
      style={{
        '--shimmer-width': `${shimmerWidth}px`,
        '--shimmer-speed': `${speed}s`
      } as React.CSSProperties}
    >
      {text}
    </span>
  );
};

export default ShinyText;
