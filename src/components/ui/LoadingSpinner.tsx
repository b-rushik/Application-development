import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const LoadingSpinner = ({ 
  size = 'medium', 
  color = 'primary-600' 
}: LoadingSpinnerProps) => {
  const sizeMap = {
    small: 'w-5 h-5',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={`border-4 border-t-${color} border-r-${color}/30 border-b-${color}/10 border-l-${color}/60 rounded-full ${sizeMap[size]}`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          ease: "linear",
          repeat: Infinity,
        }}
      />
    </div>
  );
};

export default LoadingSpinner;