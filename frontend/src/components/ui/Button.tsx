/**
 * Fashion AI - Button Component
 * 
 * Button với nhiều variants cho các use cases khác nhau
 * Phong cách: Rounded-full, shadows, hover effects
 */

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

// Định nghĩa variants và sizes
const buttonVariants = {
  primary: 'bg-primary hover:bg-primary-600 text-white shadow-lg shadow-primary/20',
  accent: 'bg-accent hover:bg-accent-600 text-white shadow-lg shadow-accent/20',
  outline: 'border border-gray-300 dark:border-gray-600 hover:bg-white dark:hover:bg-white/5 text-text-main dark:text-white',
  ghost: 'hover:bg-black/5 dark:hover:bg-white/10 text-text-main dark:text-white',
  danger: 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20',
};

const buttonSizes = {
  sm: 'h-9 px-4 text-sm gap-1.5',
  md: 'h-11 px-6 text-sm gap-2',
  lg: 'h-14 px-8 text-base gap-2',
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

/**
 * Button component với variants: primary, accent, outline, ghost, danger
 * 
 * @example
 * <Button variant="primary" size="lg">Mua ngay</Button>
 * <Button variant="accent" leftIcon={<Sparkles />}>Thử đồ AI</Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center rounded-full font-bold',
          'transition-all duration-300 transform',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
          // Hover lift effect
          'hover:-translate-y-0.5',
          // Variant styles
          buttonVariants[variant],
          // Size styles
          buttonSizes[size],
          // States
          isDisabled && 'opacity-50 cursor-not-allowed hover:translate-y-0',
          fullWidth && 'w-full',
          className
        )}
        disabled={isDisabled}
        {...props}
      >
        {/* Loading spinner */}
        {isLoading ? (
          <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
