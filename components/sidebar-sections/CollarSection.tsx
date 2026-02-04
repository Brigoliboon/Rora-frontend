'use client';

import React, { useState } from 'react';
import HorizontalGallery from '../ui/HorizontalGallery';
import Slider from '../ui/Slider';
import CollapsibleSection from '../ui/CollapsibleSection';

const CollarSection: React.FC = () => {
  const [collarWidth, setCollarWidth] = useState(50);
  const [depth, setDepth] = useState(50);
  const [angle, setAngle] = useState(0);
  const [bezier, setBezier] = useState(50);

  const necklineOptions = [
    { id: 'circle', displayName: 'Circle', originalName: 'CircleNeckHalf' },
    { id: 'curvy', displayName: 'Curvy', originalName: 'CurvyNeckHalf' },
    { id: 'v-neck', displayName: 'V-Neck', originalName: 'VNeckHalf' },
    { id: 'square', displayName: 'Square', originalName: 'SquareNeckHalf' },
    { id: 'trapezoid', displayName: 'Trapezoid', originalName: 'TrapezoidNeckHalf' },
    { id: 'arc', displayName: 'Arc', originalName: 'CircleArcNeckHalf' },
    { id: 'bezier', displayName: 'Bezier', originalName: 'Bezier2NeckHalf' },
  ];

  const collarStyleOptions = [
    { id: 'turtle', displayName: 'Turtle', originalName: 'Turtle' },
    { id: 'lapel', displayName: 'Simple Lapel', originalName: 'SimpleLapel' },
    { id: 'hood', displayName: 'Hood 2-Panel', originalName: 'Hood2Panels' },
  ];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-gray-300 mb-2">
          Front Style
        </label>
        <HorizontalGallery options={necklineOptions} />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-300 mb-2">
          Back Style
        </label>
        <HorizontalGallery options={necklineOptions} />
      </div>

      <Slider
        label="Width"
        value={collarWidth}
        onChange={setCollarWidth}
        min={0}
        max={100}
      />

      <div>
        <label className="block text-xs font-semibold text-gray-300 mb-2">
          Collar Style
        </label>
        <HorizontalGallery options={collarStyleOptions} />
      </div>

      <CollapsibleSection title="Details">
        <div className="space-y-4">
          <Slider
            label="Depth"
            value={depth}
            onChange={setDepth}
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

          <Slider
            label="Bezier"
            value={bezier}
            onChange={setBezier}
            min={0}
            max={100}
          />
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default CollarSection;
