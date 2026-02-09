'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FunctionalityCardProps {
  id: string;
  name: string;
  icon: LucideIcon;
  onClick?: () => void;
  isSelected?: boolean;
  className?: string;
}

const FunctionalityCard: React.FC<FunctionalityCardProps> = ({
  name,
  icon: Icon,
  onClick,
  isSelected = false,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-3 w-full p-4 rounded-xl border-2 transition-all duration-200
        ${isSelected 
          ? 'border-blue-500 bg-blue-500/20 text-white' 
          : 'border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:border-gray-500 hover:text-white'
        }
        ${className}
      `}
    >
      <div className={`
        flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center
        ${isSelected ? 'bg-blue-500/30' : 'bg-gray-700'}
      `}>
        <Icon size={20} className={isSelected ? 'text-blue-400' : 'text-gray-400'} />
      </div>
      <span className="font-semibold text-sm">{name}</span>
    </button>
  );
};

export default FunctionalityCard;
