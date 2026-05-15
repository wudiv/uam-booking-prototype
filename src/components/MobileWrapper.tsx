import type { ReactNode } from 'react';

interface MobileWrapperProps {
  children: ReactNode;
}

export function MobileWrapper({ children }: MobileWrapperProps) {
  return (
    <>
      {/* 手机端：fixed 全屏铺满，完全不留空隙 */}
      {/* 桌面端：relative 容器 + 430px 限宽 + 固定高度模拟手机 */}
      <div className="
        max-sm:fixed max-sm:inset-0
        sm:relative sm:w-[430px] sm:h-[932px] sm:rounded-[40px] sm:shadow-2xl sm:border sm:border-gray-200
        bg-background overflow-hidden
      ">
        {children}
      </div>
    </>
  );
}
