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
    { id: 'none', displayName: 'None', originalName: null },
    { id: 'fittedshirt', displayName: 'Fitted Shirt', originalName: 'FittedShirt' },
    { id: 'shirt', displayName: 'Shirt', originalName: 'Shirt' },
  ];

  const waistbandOptions = [
    { id: 'none', displayName: 'None', originalName: null },
    { id: 'straightwb', displayName: 'Straight', originalName: 'StraightWB' },
    { id: 'fittedwb', displayName: 'Fitted', originalName: 'FittedWB' },
  ];

  const bottomOptions = [
    { id: 'none', displayName: 'None', originalName: null },
    { id: 'skirtcircle', displayName: 'Circle', originalName: 'SkirtCircle' },
    { id: 'asymm', displayName: 'Asymmetric', originalName: 'AsymmSkirtCircle' },
    { id: 'godet', displayName: 'Godet', originalName: 'GodetSkirt' },
    { id: 'pants', displayName: 'Pants', originalName: 'Pants' },
    { id: 'skirt2', displayName: 'Skirt 2', originalName: 'Skirt2' },
    { id: 'panels', displayName: 'Many Panels', originalName: 'SkirtManyPanels' },
    { id: 'pencil', displayName: 'Pencil', originalName: 'PencilSkirt' },
    { id: 'levels', displayName: 'Levels', originalName: 'SkirtLevels' },
  ];

  const handleUpperSelect = (option: { id: string; displayName: string; originalName: string | null | undefined }) => {
    updateSilhouetteValue('upper', option.originalName as string | null);
  };

  const handleWaistbandSelect = (option: { id: string; displayName: string; originalName: string | null | undefined }) => {
    updateSilhouetteValue('wb', option.originalName as string | null);
  };

  const handleBottomSelect = (option: { id: string; displayName: string; originalName: string | null | undefined }) => {
    updateSilhouetteValue('bottom', option.originalName as string | null);
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
