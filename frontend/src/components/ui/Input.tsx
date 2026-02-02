/**
 * Fashion AI - Input Component
 * 
 * Reusable input component với các variants
 */

'use client';

import { forwardRef, useState } from 'react';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isPassword?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className = '', 
    label,
    error,
    success,
    helperText,
    leftIcon,
    rightIcon,
    isPassword,
    type = 'text',
    disabled,
    ...props 
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    
    // Determine input type
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;
    
    // Status styles
    const getStatusStyles = () => {
      if (error) return 'border-error focus:border-error focus:ring-error/20';
      if (success) return 'border-success focus:border-success focus:ring-success/20';
      return 'border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary/20';
    };

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label className="block text-sm font-medium mb-2">
            {label}
          </label>
        )}
        
        {/* Input wrapper */}
        <div className="relative">
          {/* Left icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}
          
          {/* Input */}
          <input
            ref={ref}
            type={inputType}
            disabled={disabled}
            className={`
              w-full h-12 px-4 rounded-xl border bg-white dark:bg-[#2c2822]
              text-sm outline-none transition-all duration-200
              focus:ring-2
              disabled:opacity-50 disabled:cursor-not-allowed
              ${leftIcon ? 'pl-10' : ''}
              ${(rightIcon || isPassword) ? 'pr-10' : ''}
              ${getStatusStyles()}
              ${className}
            `}
            {...props}
          />
          
          {/* Right icon / Password toggle */}
          {(rightIcon || isPassword) && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {isPassword ? (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              ) : (
                <span className="text-gray-400">{rightIcon}</span>
              )}
            </div>
          )}
          
          {/* Status icon */}
          {(error || success) && !rightIcon && !isPassword && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {error ? (
                <AlertCircle className="w-5 h-5 text-error" />
              ) : (
                <CheckCircle className="w-5 h-5 text-success" />
              )}
            </div>
          )}
        </div>
        
        {/* Helper text / Error / Success */}
        {(helperText || error || success) && (
          <p className={`mt-1.5 text-xs ${
            error ? 'text-error' : success ? 'text-success' : 'text-secondary'
          }`}>
            {error || success || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
