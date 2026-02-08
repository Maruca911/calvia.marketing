import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  hover?: boolean;
  className?: string;
}

export default function Card({ children, hover = true, className = '' }: CardProps) {
  const hoverStyles = hover
    ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer'
    : '';

  return (
    <div
      className={`bg-white rounded-lg shadow-md transition-all duration-300 ${hoverStyles} ${className}`}
    >
      {children}
    </div>
  );
}
