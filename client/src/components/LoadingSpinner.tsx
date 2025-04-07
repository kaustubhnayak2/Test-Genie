import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
  size?: 'small' | 'medium' | 'large';
  text?: string;
}

const LoadingSpinner = ({ 
  fullScreen = false, 
  size = 'medium',
  text
}: LoadingSpinnerProps) => {
  const spinnerSizes = {
    small: 'h-6 w-6 border-2',
    medium: 'h-10 w-10 border-3',
    large: 'h-16 w-16 border-4'
  };

  const spinnerClasses = `animate-spin rounded-full border-t-blue-600 border-r-transparent border-b-blue-600 border-l-transparent ${spinnerSizes[size]}`;
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-80 flex flex-col items-center justify-center z-50">
        <div className={spinnerClasses}></div>
        {text && <p className="mt-4 text-blue-600 font-medium">{text}</p>}
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className={spinnerClasses}></div>
      {text && <p className="mt-2 text-blue-600 text-sm font-medium">{text}</p>}
    </div>
  );
};

export default LoadingSpinner; 