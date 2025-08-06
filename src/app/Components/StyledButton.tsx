"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StyledButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  className?: string;
}

const StyledButton: React.FC<StyledButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  loadingText = 'Loading...',
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
}) => {
  const baseClasses = `
    inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 font-montserrat
    focus:outline-none focus:ring-4 focus:ring-offset-2
    disabled:cursor-not-allowed disabled:opacity-50
    transform hover:scale-[1.02] active:scale-[0.98]
  `;

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-4 text-base',
    lg: 'px-8 py-5 text-lg',
  };

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-blue-500 to-purple-600 
      hover:from-blue-600 hover:to-purple-700 
      text-white shadow-lg hover:shadow-xl
      focus:ring-blue-100
    `,
    secondary: `
      bg-gradient-to-r from-gray-500 to-gray-600 
      hover:from-gray-600 hover:to-gray-700 
      text-white shadow-lg hover:shadow-xl
      focus:ring-gray-100
    `,
    outline: `
      border-2 border-gray-200 text-gray-700 
      hover:bg-gray-50 hover:border-gray-300 
      focus:ring-gray-100
    `,
    ghost: `
      text-gray-600 hover:text-gray-800 
      hover:bg-gray-100
      focus:ring-gray-100
    `,
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${widthClass}
        ${className}
      `}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
    >
      {loading ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2"></div>
          {loadingText}
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && (
            <Icon size={20} className="mr-2" />
          )}
          {children}
          {Icon && iconPosition === 'right' && (
            <Icon size={20} className="ml-2" />
          )}
        </>
      )}
    </motion.button>
  );
};

export default StyledButton; 