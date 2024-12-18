import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

export const variants = {
  variant: {
    default: 'bg-ob-yellow text-black hover:bg-ob-yellow/80',
    success: 'bg-ob-green-light border border-ob-green text-ob-black',
    caution: 'bg-ob-yellow border border-ob-yellow text-ob-black',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline: 'border-2 border-input bg-transparent hover:bg-ob-yellow/20 border-ob-yellow text-ob-yellow transition-colors',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost:
      'hover:text-accent-foreground text-ob-white-40 hover:text-ob-white-80 *:grayscale *:hover:grayscale-0 border border-zinc-400',
    faint: 'bg-white/5 hover:text-accent-foreground text-ob-white-20 hover:text-ob-white-80 *:grayscale *:hover:grayscale-0',
    link: 'text-primary underline-offset-4 hover:underline',
    tab: 'bg-ob-purple-dark text-white hover:bg-ob-purple-darkest [&.active]:text-white [&.active]:bg-ob-purple-light',
    icon: 'bg-white text-black hover:bg-ob-white/80 rounded-full',
    cta: 'bg-ob-yellow text-black hover:bg-ob-yellow/80 rounded-lg'
  },
  size: {
    default: 'h-[--button-height-md] px-8 min-w-[80px] w-auto max-w-[160px]',
    sm: 'h-[--button-height-sm] px-5 text-sm max-w-[120px]',
    lg: 'h-[--button-height-lg] px-8 text-lg',
    icon: `
      xs:max-h-[--button-height-sm] xs:w-[--button-height-sm]
      xs:max-w-[--button-height-sm] 
      sm:max-h-[--button-height-md] sm:w-[--button-height-md]
      sm:max-w-[--button-height-md] 
      md:max-h-[--button-height-md] md: min-h-[--button-height-md] h-[--button-height-md]
      md:min-w-[--button-height-md] md:max-w-[--button-height-md] md:w-[--button-height-md]
    `,
    'icon-xs': 'h-[--button-height-xs] w-[--button-height-xs]'
  }
};

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-sm rounded-lg font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 max-h-[--max-button-height] w-[144px] max-w-[192px] [&.active]:bg-white [&.active]:text-black',
  {
    variants,
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
