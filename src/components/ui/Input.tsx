import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="mb-4">
        {label && (
          <label htmlFor={props.id} className="form-label">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`form-input ${error ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''} ${className}`}
          {...props}
        />
        {error && <p className="form-error">{error}</p>}
        {helperText && !error && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;