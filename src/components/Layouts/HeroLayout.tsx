import { ReactNode } from 'react';

export default function HeroLayout({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`flex h-[calc(100vh-var(--header-height))] w-full flex-col items-center justify-center ${className ? className : ''}`}
    >
      {children}
    </div>
  );
}
