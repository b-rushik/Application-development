import React from 'react';
import { BookOpen } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-8 w-8" }) => {
  return (
    <div className={`${className} relative flex items-center justify-center`}>
      <BookOpen className="absolute text-primary-600" />
      <div className="absolute w-3 h-3 bg-accent-500 rounded-full -right-1 -top-1" />
    </div>
  );
};

export default Logo;