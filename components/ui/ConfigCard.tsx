'use client';

import React, { useState, ReactNode } from 'react';
import { ChevronDown, ChevronRight, LucideIcon } from 'lucide-react';

interface ConfigCardProps {
  title: string;
  icon?: LucideIcon;
  iconColor?: string;
  isOpen?: boolean;
  defaultOpen?: boolean;
  children: ReactNode;
  onToggle?: (isOpen: boolean) => void;
  badge?: string | number;
}

const ConfigCard: React.FC<ConfigCardProps> = ({
  title,
  icon: Icon,
  iconColor = 'text-blue-400',
  isOpen: controlledOpen,
  defaultOpen = true,
  children,
  onToggle,
  badge,
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  
  const handleToggle = () => {
    const newState = !isOpen;
    if (controlledOpen === undefined) {
      setInternalOpen(newState);
    }
    onToggle?.(newState);
  };

  return (
    <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden transition-all duration-200 hover:border-gray-600/50">
      <button
        onClick={handleToggle}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-700/30 transition-colors group"
      >
        <div className="flex items-center gap-3">
          {Icon && (
            <div className={`p-1.5 rounded-lg bg-gray-700/50 group-hover:bg-gray-600/50 transition-colors`}>
              <Icon size={16} className={iconColor} />
            </div>
          )}
          <span className="text-sm font-semibold text-white tracking-wide">
            {title}
          </span>
          {badge !== undefined && (
            <span className="px-2 py-0.5 text-xs font-medium bg-blue-500/20 text-blue-300 rounded-full">
              {badge}
            </span>
          )}
        </div>
        <div className={`transition-transform duration-200 ${isOpen ? '' : 'text-gray-500'}`}>
          {isOpen ? (
            <ChevronDown size={16} className="text-gray-400" />
          ) : (
            <ChevronRight size={16} className="text-gray-400" />
          )}
        </div>
      </button>
      
      <div 
        className={`transition-all duration-300 ease-out overflow-hidden ${
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-4 pt-1 border-t border-gray-700/30">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ConfigCard;
