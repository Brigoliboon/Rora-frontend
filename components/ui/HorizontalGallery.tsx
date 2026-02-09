'use client';

import React, { useState } from 'react';

interface GalleryOption {
  id: string;
  displayName: string;
  originalName: string|null|undefined;
}

interface HorizontalGalleryProps {
  options: GalleryOption[];
  onSelect?: (option: GalleryOption) => void;
}

const HorizontalGallery: React.FC<HorizontalGalleryProps> = ({
  options,
  onSelect,
}) => {
  const [selected, setSelected] = useState<string>(options[0]?.id);

  const handleSelect = (option: GalleryOption) => {
    setSelected(option.id);
    onSelect?.(option);
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => handleSelect(option)}
          className={`flex-shrink-0 w-32 p-3 rounded-lg border-2 transition-all ${
            selected === option.id
              ? 'border-blue-500 bg-blue-500/20'
              : 'border-gray-600 bg-gray-700 hover:bg-gray-650'
          }`}
          title={option.originalName?option.originalName:undefined}
        >
          <div className="text-xs font-semibold text-white text-center">
            {option.displayName}
          </div>
          <div className="text-xs text-gray-400 text-center mt-1">
            {option.originalName}
          </div>
        </button>
      ))}
    </div>
  );
};

export default HorizontalGallery;
