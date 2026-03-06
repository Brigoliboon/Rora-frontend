'use client';

import React, { useState } from 'react';

export interface GalleryOption {
  id: string;
  displayName: string;
  originalName: string | null | undefined;
}

interface HorizontalGalleryProps<T extends GalleryOption> {
  options: T[];
  onSelect?: (option: T) => void;
  renderItem?: (option: T, isSelected: boolean) => React.ReactNode;
  selectedId?: string | null;
}

const HorizontalGallery = <T extends GalleryOption>({
  options,
  onSelect,
  renderItem,
  selectedId,
}: HorizontalGalleryProps<T>) => {
  const [internalSelected, setInternalSelected] = useState<string>(options[0]?.id);

  const activeId = selectedId !== undefined ? selectedId : internalSelected;

  const handleSelect = (option: T) => {
    if (selectedId === undefined) {
      setInternalSelected(option.id);
    }
    onSelect?.(option);
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {options.map((option) => (
        <div key={option.id} onClick={() => handleSelect(option)} className="cursor-pointer">
          {renderItem ? (
            renderItem(option, activeId === option.id)
          ) : (
            <div
              className={`flex-shrink-0 w-32 p-3 rounded-lg border-2 transition-all ${activeId === option.id
                  ? 'border-blue-500 bg-blue-500/20'
                  : 'border-gray-600 bg-gray-700 hover:bg-gray-650'
                }`}
              title={option.originalName ? option.originalName : undefined}
            >
              <div className="text-xs font-semibold text-white text-center">
                {option.displayName}
              </div>
              <div className="text-xs text-gray-400 text-center mt-1">
                {option.originalName}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HorizontalGallery;
