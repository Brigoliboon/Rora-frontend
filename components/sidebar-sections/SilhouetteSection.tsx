'use client';

import React, { useState } from 'react';
import HorizontalGallery from '../ui/HorizontalGallery';

const SilhouetteSection: React.FC = () => {
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

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-gray-300 mb-2">
          Upper
        </label>
        <HorizontalGallery options={upperOptions} />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-300 mb-2">
          Waistband
        </label>
        <HorizontalGallery options={waistbandOptions} />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-300 mb-2">
          Bottom
        </label>
        <HorizontalGallery options={bottomOptions} />
      </div>
    </div>
  );
};

export default SilhouetteSection;
