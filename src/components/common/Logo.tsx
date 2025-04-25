import React from 'react';
import { BrainCircuit } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'icon';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  variant = 'full',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const iconSizes = {
    sm: 20,
    md: 24,
    lg: 28,
  };

  return (
    <div className={`flex items-center ${className}`}>
      <BrainCircuit
        size={iconSizes[size]}
        className="text-primary-700"
      />
      {variant === 'full' && (
        <div className="ml-2 flex flex-col">
          <span className={`font-bold ${sizeClasses[size]} text-primary-700 leading-tight`}>
            Gyaan Kriti
          </span>
          <span className="text-xs text-gray-600">Exam Paper Management</span>
        </div>
      )}
    </div>
  );
};

export default Logo;