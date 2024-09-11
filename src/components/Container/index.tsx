export function Container({ children, maxWidth }: { children: React.ReactNode; maxWidth?: number }) {
  return (
    <div className={'w-full h-full flex justify-center '}>
      <div className={`w-full ${maxWidth ? `max-w-[${maxWidth}px]` : 'max-w-[--global-max-width]'}`}>
        {children}
      </div>
    </div>
  );
}
