import React from 'react';

interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Accessible label for screen readers */
  ariaLabel?: string;
}

/**
 * Consistent button wrapper that adds ARIA label, focus outline, and smooth transition.
 */
export const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  ariaLabel,
  className = '',
  children,
  ...rest
}) => {
  const combinedClass = `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vantage-accent transition-colors ${className}`;
  return (
    <button aria-label={ariaLabel} className={combinedClass} {...rest}>
      {children}
    </button>
  );
};

export default AccessibleButton;
