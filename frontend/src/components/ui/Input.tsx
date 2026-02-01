/**
 * Fashion AI - Input Component
 * 
 * Input fields với nhiều types và states
 * Focus: Gold border, accessible, error handling
 */

'use client';

import { forwardRef, type InputHTMLAttributes, type ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const inputSizes = {
  sm: 'h-10 text-sm px-3',
  md: 'h-12 text-sm px-4',
  lg: 'h-14 text-base px-5',
};

/**
 * Input component với label, error, và icon support
 * 
 * @example
 * <Input label="Email" type="email" placeholder="example@email.com" />
 * <Input type="password" error="Mật khẩu không đúng" />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      size = 'md',
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    // State cho password visibility toggle
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    // Generate ID nếu không có
    const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`;

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-text-main dark:text-white mb-2"
          >
            {label}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative">
          {/* Left icon */}
          {leftIcon && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary">
              {leftIcon}
            </span>
          )}

          {/* Input field */}
          <input
            ref={ref}
            id={inputId}
            type={inputType}
            className={cn(
              // Base styles
              'w-full rounded-xl border bg-transparent',
              'outline-none transition-all duration-200',
              'placeholder:text-secondary/60',
              // Focus states
              'focus:border-primary focus:ring-2 focus:ring-primary/20',
              // Size
              inputSizes[size],
              // Border color
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                : 'border-gray-300 dark:border-gray-600',
              // Disabled state
              disabled && 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed opacity-60',
              // Padding cho icons
              leftIcon && 'pl-11',
              (rightIcon || isPassword) && 'pr-11',
              className
            )}
            disabled={disabled}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />

          {/* Right icon hoặc Password toggle */}
          {isPassword ? (
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary hover:text-text-main transition-colors"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
              aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          ) : rightIcon ? (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary">
              {rightIcon}
            </span>
          ) : null}
        </div>

        {/* Error message */}
        {error && (
          <p id={`${inputId}-error`} className="mt-2 text-sm text-red-500" role="alert">
            {error}
          </p>
        )}

        {/* Hint text */}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="mt-2 text-sm text-secondary">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
