'use client';

import React, { useState } from 'react';
import Slider from '../ui/Slider';
import CollapsibleSection from '../ui/CollapsibleSection';
import HorizontalGallery from '../ui/HorizontalGallery';

const PantsSection: React.FC = () => {
  const [length, setLength] = useState(50);
  const [width, setWidth] = useState(50);

  const cuffOptions = [
    { id: 'band', displayName: 'Band', originalName: 'CuffBand' },
    { id: 'skirt', displayName: 'Skirt', originalName: 'CuffSkirt' },
    { id: 'band-skirt', displayName: 'Band & Skirt', originalName: 'CuffBandSkirt' },
  ];

  return (
    <div className="space-y-4">
      <Slider
        label="Length"
        value={length}
        onChange={setLength}
        min={0}
        max={100}
      />

      <Slider
        label="Width"
        value={width}
        onChange={setWidth}
        min={0}
        max={100}
      />

      <CollapsibleSection title="Details">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-2">
              Cuff Type
            </label>
            <HorizontalGallery options={cuffOptions} />
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default PantsSection;
