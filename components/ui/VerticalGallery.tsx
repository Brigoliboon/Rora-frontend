'use client';

import React, { useState } from 'react';
import { LucideIcon } from 'lucide-react';
import FunctionalityCard from './FunctionalityCard';

interface GalleryItem {
  id: string;
  name: string;
  icon: LucideIcon;
}

interface VerticalGalleryProps {
  items: GalleryItem[];
  onSelect?: (item: GalleryItem) => void;
  className?: string;
}

const VerticalGallery: React.FC<VerticalGalleryProps> = ({
  items,
  onSelect,
  className = '',
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (item: GalleryItem) => {
    setSelectedId(item.id);
    onSelect?.(item);
  };

  return (
    <div className={`flex flex-col gap-3 overflow-y-auto max-h-96 pr-2 scrollbar-hide ${className}`}>
      {items.map((item) => (
        <FunctionalityCard
          key={item.id}
          id={item.id}
          name={item.name}
          icon={item.icon}
          isSelected={selectedId === item.id}
          onClick={() => handleSelect(item)}
        />
      ))}
    </div>
  );
};

export default VerticalGallery;
