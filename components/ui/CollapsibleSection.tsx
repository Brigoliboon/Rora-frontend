'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  children,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-t border-gray-700 pt-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-xs font-semibold text-gray-300 hover:text-white transition-colors"
      >
        <span>{title}</span>
        <ChevronDown
          size={14}
          className={`transition-transform ${isOpen ? '' : '-rotate-90'}`}
        />
      </button>

      {isOpen && <div className="mt-3 space-y-4">{children}</div>}
    </div>
  );
};

export default CollapsibleSection;
