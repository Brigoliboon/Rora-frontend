'use client';

import React from 'react';
import HorizontalGallery from '../ui/HorizontalGallery';
import { useSidebarValues } from '../../hooks/useSidebarValues';

interface SilhouetteSectionProps {
  sidebarValues: ReturnType<typeof useSidebarValues>;
}

const SilhouetteSection: React.FC<SilhouetteSectionProps> = ({ sidebarValues }) => {
  const { silhouette, updateSilhouetteValue } = sidebarValues;

  const upperOptions = [
    { id: 'fittedshirt', displayName: 'Fitted Shirt', originalName: 'FittedShirt' },
    { id: 'shirt', displayName: 'Shirt', originalName: 'Shirt' },
  ];

  const waistbandOptions = [
    { id: 'straightwb', displayName: 'Straight', originalName: 'StraightWB' },
    { id: 'fittedwb', displayName: 'Fitted', originalName: 'FittedWB' },
  ];

  const bottomOptions = [
    { id: 'skirtcircle', displayName: 'Circle', originalName: 'SkirtCircle' },
    { id: 'asymm', displayName: 'Asymmetric', originalName: 'AsymmSkirtCircle' },
    { id: 'godet', displayName: 'Godet', originalName: 'GodetSkirt' },
    { id: 'pants', displayName: 'Pants', originalName: 'Pants' },
    { id: 'skirt2', displayName: 'Skirt 2', originalName: 'Skirt2' },
    { id: 'panels', displayName: 'Many Panels', originalName: 'SkirtManyPanels' },
    { id: 'pencil', displayName: 'Pencil', originalName: 'PencilSkirt' },
    { id: 'levels', displayName: 'Levels', originalName: 'SkirtLevels' },
  ];

  const handleUpperSelect = (option: { originalName: string }) => {
    updateSilhouetteValue('upper', option.originalName);
  };

  const handleWaistbandSelect = (option: { originalName: string }) => {
    updateSilhouetteValue('wb', option.originalName);
  };

  const handleBottomSelect = (option: { originalName: string }) => {
    updateSilhouetteValue('bottom', option.originalName);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-gray-300 mb-2">
          Upper
        </label>
        <HorizontalGallery 
          options={upperOptions} 
          onSelect={handleUpperSelect}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-300 mb-2">
          Waistband
        </label>
        <HorizontalGallery 
          options={waistbandOptions} 
          onSelect={handleWaistbandSelect}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-300 mb-2">
          Bottom
        </label>
        <HorizontalGallery 
          options={bottomOptions} 
          onSelect={handleBottomSelect}
        />
      </div>
    </div>
  );
};

export default SilhouetteSection;
