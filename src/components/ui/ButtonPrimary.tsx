import React from 'react';
import { motion } from 'framer-motion';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: 'primary' | 'ghost';
};

export const ButtonPrimary: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  ...rest
}) => {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2';

  const styles =
    variant === 'primary'
      ? 'bg-vantage-accent text-white px-5 py-3 shadow-sm hover:brightness-95 active:scale-95'
      : 'bg-transparent text-white/90 px-3 py-2';

  return (
    <motion.button whileTap={{ scale: 0.98 }} className={`${base} ${styles}`} {...rest}>
      {children}
    </motion.button>
  );
};

export default ButtonPrimary;
