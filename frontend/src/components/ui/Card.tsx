/**
 * Fashion AI - Card Component
 * 
 * Reusable card component với các variants
 */

'use client';

import { forwardRef } from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  clickable?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className = '', 
    variant = 'default', 
    padding = 'md',
    hoverable = false,
    clickable = false,
    children, 
    ...props 
  }, ref) => {
    // Base styles
    const baseStyles = 'rounded-2xl transition-all duration-300';
    
    // Variant styles
    const variants = {
      default: 'bg-white dark:bg-[#25221d] border border-gray-200 dark:border-gray-700',
      outlined: 'border-2 border-gray-300 dark:border-gray-600 bg-transparent',
      elevated: 'bg-white dark:bg-[#25221d] shadow-lg',
      glass: 'bg-white/80 dark:bg-[#25221d]/80 backdrop-blur-lg border border-white/20',
    };

    // Padding styles
    const paddings = {
      none: '',
      sm: 'p-3',
      md: 'p-6',
      lg: 'p-8',
    };

    // Interactive styles
    const interactiveStyles = clickable || hoverable
      ? 'cursor-pointer hover:shadow-lg hover:border-primary/30 hover:-translate-y-1'
      : '';

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${paddings[padding]} ${interactiveStyles} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// Card Header subcomponent
export const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', children, ...props }, ref) => (
    <div 
      ref={ref} 
      className={`mb-4 pb-4 border-b border-gray-200 dark:border-gray-700 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
);
CardHeader.displayName = 'CardHeader';

// Card Title subcomponent
export const CardTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className = '', children, ...props }, ref) => (
    <h3 
      ref={ref} 
      className={`text-lg font-bold ${className}`}
      {...props}
    >
      {children}
    </h3>
  )
);
CardTitle.displayName = 'CardTitle';

// Card Description subcomponent
export const CardDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className = '', children, ...props }, ref) => (
    <p 
      ref={ref} 
      className={`text-sm text-secondary mt-1 ${className}`}
      {...props}
    >
      {children}
    </p>
  )
);
CardDescription.displayName = 'CardDescription';

// Card Content subcomponent
export const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', children, ...props }, ref) => (
    <div 
      ref={ref} 
      className={className}
      {...props}
    >
      {children}
    </div>
  )
);
CardContent.displayName = 'CardContent';

// Card Footer subcomponent
export const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', children, ...props }, ref) => (
    <div 
      ref={ref} 
      className={`mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center gap-3 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
);
CardFooter.displayName = 'CardFooter';

export default Card;
