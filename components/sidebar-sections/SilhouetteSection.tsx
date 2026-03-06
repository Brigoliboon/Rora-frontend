'use client';

import React from 'react';
import { useSidebarValues } from '../../hooks/useSidebarValues';

interface SilhouetteSectionProps {
  sidebarValues: ReturnType<typeof useSidebarValues>;
  onSelect?: () => void;
}

interface Option {
  id: string;
  displayName: string;
  originalName: string | null | undefined;
}

const SilhouetteSection: React.FC<SilhouetteSectionProps> = ({ sidebarValues, onSelect }) => {
  const { silhouette, updateSilhouetteValue } = sidebarValues;

  // Get current selections
  const currentUpper = silhouette?.upper?.v;
  const currentWb = silhouette?.wb?.v;
  const currentBottom = silhouette?.bottom?.v;

  const upperOptions: Option[] = [
    { id: 'none', displayName: 'None', originalName: null },
    { id: 'fittedshirt', displayName: 'Fitted', originalName: 'FittedShirt' },
    { id: 'shirt', displayName: 'Shirt', originalName: 'Shirt' },
  ];

  const waistbandOptions: Option[] = [
    { id: 'none', displayName: 'None', originalName: null },
    { id: 'straightwb', displayName: 'Straight', originalName: 'StraightWB' },
    { id: 'fittedwb', displayName: 'Fitted', originalName: 'FittedWB' },
  ];

  const bottomOptions: Option[] = [
    { id: 'none', displayName: 'None', originalName: null },
    { id: 'skirtcircle', displayName: 'Circle', originalName: 'SkirtCircle' },
    { id: 'asymm', displayName: 'Asymm', originalName: 'AsymmSkirtCircle' },
    { id: 'godet', displayName: 'Godet', originalName: 'GodetSkirt' },
    { id: 'pants', displayName: 'Pants', originalName: 'Pants' },
    { id: 'skirt2', displayName: 'Skirt2', originalName: 'Skirt2' },
    { id: 'panels', displayName: 'Panels', originalName: 'SkirtManyPanels' },
    { id: 'pencil', displayName: 'Pencil', originalName: 'PencilSkirt' },
    { id: 'levels', displayName: 'Levels', originalName: 'SkirtLevels' },
  ];

  const handleUpperSelect = (option: Option) => {
    updateSilhouetteValue('upper', option.originalName as string | null);
    onSelect?.();
  };

  const handleWaistbandSelect = (option: Option) => {
    updateSilhouetteValue('wb', option.originalName as string | null);
    onSelect?.();
  };

  const handleBottomSelect = (option: Option) => {
    updateSilhouetteValue('bottom', option.originalName as string | null);
    onSelect?.();
  };

  const isSelected = (option: Option, currentValue: string | null | undefined) => {
    return option.originalName === currentValue;
  };

  const renderButtonGroup = (
    options: Option[],
    currentValue: string | null | undefined,
    onSelect: (option: Option) => void
  ) => {
    return (
      <div className="flex flex-wrap gap-1.5">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option)}
            className={`
              px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-150
              ${isSelected(option, currentValue)
                ? 'bg-blue-500 text-white shadow-md shadow-blue-500/25'
                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600 hover:text-white'
              }
            `}
          >
            {option.displayName}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Upper Garment */}
      <div>
        <label className="block text-xs font-medium text-gray-400 mb-2">
          Upper Body
        </label>
        {renderButtonGroup(upperOptions, currentUpper, handleUpperSelect)}
      </div>

      {/* Waistband */}
      <div>
        <label className="block text-xs font-medium text-gray-400 mb-2">
          Waistband
        </label>
        {renderButtonGroup(waistbandOptions, currentWb, handleWaistbandSelect)}
      </div>

      {/* Bottom */}
      <div>
        <label className="block text-xs font-medium text-gray-400 mb-2">
          Bottom
        </label>
        {renderButtonGroup(bottomOptions, currentBottom, handleBottomSelect)}
      </div>
    </div>
  );
};

export default SilhouetteSection;
