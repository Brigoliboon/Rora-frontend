'use client';

import React from 'react';
import Image from 'next/image';

interface HistoryCardProps {
  id: string;
  title: string;
  imageUrl: string;
  onClick?: () => void;
  isSelected?: boolean;
  className?: string;
}

const HistoryCard: React.FC<HistoryCardProps> = ({
  title,
  imageUrl,
  onClick,
  isSelected = false,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col w-40 overflow-hidden rounded-lg border-2 transition-all duration-200
        ${isSelected 
          ? 'border-blue-500 bg-blue-500/20' 
          : 'border-gray-600 bg-gray-800 hover:border-gray-500 hover:bg-gray-700'
        }
        ${className}
      `}
    >
      {/* Image Container - Upward rectangle style */}
      <div className="relative w-full h-48 overflow-hidden bg-gray-700">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="160px"
        />
      </div>
      
      {/* Title Container */}
      <div className="p-3 bg-gray-800">
        <span className="block text-xs font-semibold text-white text-center truncate">
          {title}
        </span>
      </div>
    </button>
  );
};

export default HistoryCard;
