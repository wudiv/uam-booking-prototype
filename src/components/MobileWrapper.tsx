import type { ReactNode } from 'react';

interface MobileWrapperProps {
  children: ReactNode;
}

export function MobileWrapper({ children }: MobileWrapperProps) {
  return (
    // 手机上直接铺满全屏；桌面上居中显示 430px 宽的模拟器
    <div className="relative w-full h-[100dvh] mx-auto bg-background overflow-hidden
                    sm:max-w-[430px] sm:shadow-2xl">
      {children}
    </div>
  );
}
