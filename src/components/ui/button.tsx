import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 max-h-[--max-button-height] w-[144px] max-w-[192px] [&.active]:bg-white [&.active]:text-black',
  {
    variants: {
      variant: {
        default: 'bg-ob-grey-light text-primary-foreground hover:bg-white/5 border border-ob-grey-light capitalize',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground border-zinc-700 bg-zinc-900 text-zinc-400 transition-colors hover:bg-zinc-800 *:grayscale *:hover:grayscale-0',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:text-accent-foreground text-ob-white-40 hover:text-ob-white-80',
        link: 'text-primary underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-[--button-height-md] px-8 min-w-[80px] max-w-[160px] w-auto',
        sm: 'h-[--button-height-sm] px-3 text-sm max-w-[120px]',
        lg: 'h-[--button-height-lg] px-8 text-lg',
        icon: `
          xs:max-h-[--button-height-sm] xs:w-[--button-height-sm]
          xs:max-w-[--button-height-sm] 
          sm:max-h-[--button-height-md] sm:w-[--button-height-md]
          sm:max-w-[--button-height-md] 
          md:max-h-[--button-height-md] md: min-h-[--button-height-md] h-[--button-height-md]
          md:min-w-[--button-height-md] md:max-w-[--button-height-md] md:w-[--button-height-md]
        `
      }
    },
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
