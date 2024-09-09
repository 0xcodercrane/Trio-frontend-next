export function Container({ children, maxWidth }: { children: React.ReactNode; maxWidth?: number }) {
  return <div className={`max-w-[${maxWidth ? maxWidth : '--global-max-width'}] h-full`}>{children}</div>;
}
