'use client';

import React, { useState } from 'react';
import HorizontalGallery from '../ui/HorizontalGallery';
import Slider from '../ui/Slider';
import Toggle from '../ui/Toggle';
import CollapsibleSection from '../ui/CollapsibleSection';

const SleeveSection: React.FC = () => {
  const [isSleeveless, setIsSleeveless] = useState(false);
  const [length, setLength] = useState(50);
  const [cuff, setCuff] = useState(50);
  const [endWidth, setEndWidth] = useState(50);
  const [angle, setAngle] = useState(0);

  const armholeOptions = [
    { id: 'square', displayName: 'Square', originalName: 'ArmholeSquare' },
    { id: 'angle', displayName: 'Angle', originalName: 'ArmholeAngle' },
    { id: 'curve', displayName: 'Curve', originalName: 'ArmholeCurve' },
  ];

  const cuffOptions = [
    { id: 'band', displayName: 'Band', originalName: 'CuffBand' },
    { id: 'skirt', displayName: 'Skirt', originalName: 'CuffSkirt' },
    { id: 'band-skirt', displayName: 'Band & Skirt', originalName: 'CuffBandSkirt' },
  ];

  return (
    <div className="space-y-4">
      <Toggle
        label="Sleeveless"
        value={isSleeveless}
        onChange={setIsSleeveless}
      />

      <Slider
        label="Length"
        value={length}
        onChange={setLength}
        min={0}
        max={100}
      />

      <div>
        <label className="block text-xs font-semibold text-gray-300 mb-2">
          Armhole Shape
        </label>
        <HorizontalGallery options={armholeOptions} />
      </div>

      <CollapsibleSection title="Details">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-2">
              Cuff Type
            </label>
            <HorizontalGallery options={cuffOptions} />
          </div>

          <Slider
            label="End Width"
            value={endWidth}
            onChange={setEndWidth}
            min={0}
            max={100}
          />

          <Slider
            label="Angle"
            value={angle}
            onChange={setAngle}
            min={-90}
            max={90}
          />
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default SleeveSection;
