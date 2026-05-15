import { ReactNode } from 'react';

interface MobileWrapperProps {
  children: ReactNode;
}

export function MobileWrapper({ children }: MobileWrapperProps) {
  return (
    <div className="relative w-full max-w-[430px] h-[100dvh] mx-auto bg-background overflow-hidden shadow-2xl">
      {children}
    </div>
  );
}
