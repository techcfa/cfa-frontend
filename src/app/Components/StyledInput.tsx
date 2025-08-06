"use client";

import React, { forwardRef } from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface StyledInputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: LucideIcon;
  rightIcon?: LucideIcon;
  onRightIconClick?: () => void;
  label?: string;
  error?: string;
  disabled?: boolean;
  maxLength?: number;
  className?: string;
  autoComplete?: string;
}

const StyledInput = forwardRef<HTMLInputElement, StyledInputProps>(
  (
    {
      type = "text",
      placeholder,
      value,
      onChange,
      icon: Icon,
      rightIcon: RightIcon,
      onRightIconClick,
      label,
      error,
      disabled = false,
      maxLength,
      className = "",
      autoComplete,
      ...props
    },
    ref
  ) => {
    return (
      <div className={`space-y-2 ${className}`}>
        {label && (
          <label className="block text-sm font-semibold text-gray-700 font-lato">
            {label}
          </label>
        )}
        
        <div className="relative group">
          {/* Left Icon */}
          {Icon && (
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
              <Icon 
                size={20} 
                className={`transition-colors duration-200 ${
                  error 
                    ? 'text-red-400' 
                    : 'text-gray-400 group-focus-within:text-blue-500'
                }`} 
              />
            </div>
          )}
          
          {/* Input Field */}
          <motion.input
            ref={ref}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={maxLength}
            autoComplete={autoComplete}
            className={`
              w-full py-4 border-2 rounded-xl transition-all duration-200 text-lg font-lato
              ${Icon ? 'pl-12' : 'pl-4'}
              ${RightIcon ? 'pr-12' : 'pr-4'}
              ${error 
                ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100'
              }
              focus:ring-4 focus:outline-none
              disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
              ${type === 'password' ? 'tracking-wider' : ''}
              ${type === 'tel' && value.length === 10 ? 'border-green-300' : ''}
              ${type === 'text' && maxLength === 6 ? 'text-center text-2xl tracking-widest font-mono' : ''}
            `}
            whileFocus={{ scale: 1.01 }}
            whileHover={{ scale: 1.005 }}
            {...props}
          />
          
          {/* Right Icon */}
          {RightIcon && (
            <button
              type="button"
              onClick={onRightIconClick}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors z-10"
            >
              <RightIcon size={20} />
            </button>
          )}
          
          {/* Success Indicator for Mobile */}
          {type === 'tel' && value.length === 10 && !error && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
              >
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </motion.div>
            </div>
          )}
        </div>
        
        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center text-red-600 text-sm"
          >
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2 animate-pulse"></div>
            {error}
          </motion.div>
        )}
        
        {/* Character Counter for OTP */}
        {maxLength === 6 && (
          <div className="text-right text-xs text-gray-500">
            {value.length}/{maxLength}
          </div>
        )}
      </div>
    );
  }
);

StyledInput.displayName = 'StyledInput';

export default StyledInput; 