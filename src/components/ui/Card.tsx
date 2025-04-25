import React from 'react';

interface CardProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  children,
  footer,
  className = '',
  hoverable = false,
}) => {
  const hoverClass = hoverable ? 'transition-transform duration-200 transform hover:-translate-y-1 hover:shadow-lg' : '';
  
  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden ${hoverClass} ${className}`}>
      {(title || description) && (
        <div className="px-6 pt-5 pb-3">
          {title && (
            typeof title === 'string' 
              ? <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              : title
          )}
          {description && (
            typeof description === 'string'
              ? <p className="mt-1 text-sm text-gray-500">{description}</p>
              : description
          )}
        </div>
      )}
      <div className="px-6 py-4">{children}</div>
      {footer && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;