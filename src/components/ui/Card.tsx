import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg ${className}`}>
      {children}
    </div>
  );
}
