import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  variant = 'default',
  hover = true,
  ...props 
}) => {
  const variants = {
    default: 'bg-dark-800/50 backdrop-blur-sm border border-dark-700',
    glass: 'bg-white/5 backdrop-blur-md border border-white/10',
    solid: 'bg-dark-800 border border-dark-700',
    gradient: 'bg-gradient-to-br from-dark-800/80 to-dark-900/80 border border-dark-600',
  };

  const baseClasses = `rounded-xl p-6 transition-all duration-300 ${variants[variant]}`;
  const hoverClasses = hover ? 'hover:bg-dark-800/70 hover:border-primary-500/30 hover:shadow-lg hover:shadow-primary-500/10' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`${baseClasses} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
