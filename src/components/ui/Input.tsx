import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
  className?: string;
  inputClassName?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helpText,
  className = '',
  inputClassName = '',
  fullWidth = true,
  icon,
  ...props
}) => {
  const id = props.id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;
  
  const baseInputClasses = 'block bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm px-3 py-2';
  const widthClass = fullWidth ? 'w-full' : '';
  const errorClass = error ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : 'border-gray-300';
  const iconClass = icon ? 'pl-10' : '';
  
  return (
    <div className={`${widthClass} ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
            {icon}
          </div>
        )}
        <input
          id={id}
          className={`${baseInputClasses} ${widthClass} ${errorClass} ${iconClass} ${inputClassName}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-error-500">
          {error}
        </p>
      )}
      {helpText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helpText}</p>
      )}
    </div>
  );
};

export default Input;