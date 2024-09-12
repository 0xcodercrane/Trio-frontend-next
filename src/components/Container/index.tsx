export function Container({
  children,
  maxWidth,
}: {
  children: React.ReactNode;
  maxWidth?: number;
}) {
  return (
    <div className={'flex h-full w-full justify-center'}>
      <div
        className={`w-full ${maxWidth ? `max-w-[${maxWidth}px]` : 'max-w-[--global-max-width]'}`}
      >
        {children}
      </div>
    </div>
  );
}
