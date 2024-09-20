export function Container({
  children,
  maxWidth,
  bgColor,
  padding
}: {
  children: React.ReactNode;
  maxWidth?: number;
  bgColor?: string;
  padding?: boolean;
}) {
  return (
    <div className={`relative flex h-full w-full flex-row justify-center ${bgColor} ${padding ? 'px-4 md:px-12' : ''}`}>
      <div className={`w-full ${maxWidth ? `max-w-[${maxWidth}px]` : 'max-w-[--global-max-width]'}`}>{children}</div>
    </div>
  );
}
