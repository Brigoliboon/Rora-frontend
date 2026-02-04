'use client';

import React, { useState } from 'react';
import HorizontalGallery from '../ui/HorizontalGallery';
import Slider from '../ui/Slider';
import CollapsibleSection from '../ui/CollapsibleSection';

const SkirtSection: React.FC = () => {
  const [length, setLength] = useState(50);
  const [rise, setRise] = useState(50);
  const [flare, setFlare] = useState(0);
  const [ruffle, setRuffle] = useState(0);
  const [slits, setSlits] = useState(0);

  const skirtStyleOptions = [
    { id: 'circle', displayName: 'Circle', originalName: 'SkirtCircle' },
    { id: 'asymm', displayName: 'Asymmetric', originalName: 'AsymmSkirtCircle' },
    { id: 'godet', displayName: 'Godet', originalName: 'GodetSkirt' },
    { id: 'skirt2', displayName: 'Skirt 2', originalName: 'Skirt2' },
    { id: 'pencil', displayName: 'Pencil', originalName: 'PencilSkirt' },
    { id: 'panels', displayName: 'Many Panels', originalName: 'SkirtManyPanels' },
    { id: 'levels', displayName: 'Levels', originalName: 'SkirtLevels' },
  ];

  const panelCurveOptions = [
    { id: 'curve-035', displayName: '-0.35', originalName: '-0.35' },
    { id: 'curve-025', displayName: '-0.25', originalName: '-0.25' },
    { id: 'curve-015', displayName: '-0.15', originalName: '-0.15' },
    { id: 'curve-0', displayName: '0', originalName: '0' },
    { id: 'curve-015p', displayName: '0.15', originalName: '0.15' },
    { id: 'curve-025p', displayName: '0.25', originalName: '0.25' },
    { id: 'curve-035p', displayName: '0.35', originalName: '0.35' },
    { id: 'curve-045p', displayName: '0.45', originalName: '0.45' },
  ];

  const sideCutOptions = [
    { id: 'sun', displayName: 'Sun', originalName: 'Sun' },
    { id: 'siggraph', displayName: 'SIGGRAPH', originalName: 'SIGGRAPH_logo' },
  ];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-gray-300 mb-2">
          Style
        </label>
        <HorizontalGallery options={skirtStyleOptions} />
      </div>

      <Slider
        label="Length"
        value={length}
        onChange={setLength}
        min={0}
        max={100}
      />

      <Slider
        label="Rise"
        value={rise}
        onChange={setRise}
        min={0}
        max={100}
      />

      <CollapsibleSection title="Details">
        <div className="space-y-4">
          <Slider
            label="Flare"
            value={flare}
            onChange={setFlare}
            min={-50}
            max={50}
          />

          <Slider
            label="Ruffle"
            value={ruffle}
            onChange={setRuffle}
            min={0}
            max={100}
          />

          <Slider
            label="Slits"
            value={slits}
            onChange={setSlits}
            min={0}
            max={100}
          />

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-2">
              Panel Curve
            </label>
            <HorizontalGallery options={panelCurveOptions} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-2">
              Side Cut
            </label>
            <HorizontalGallery options={sideCutOptions} />
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default SkirtSection;
