'use client';

import React, { useMemo } from 'react';
import Slider from '../ui/Slider';
import Toggle from '../ui/Toggle';
import { useSidebarValues } from '../../hooks/useSidebarValues';

interface ShirtSectionProps {
  sidebarValues: ReturnType<typeof useSidebarValues>;
}

const ShirtSection: React.FC<ShirtSectionProps> = ({ sidebarValues }) => {
  const { shirt, updateShirtValue } = sidebarValues;

  const isStrapless = shirt?.strapless?.v ?? false;
  const length = shirt?.length?.v ?? 1.2;
  const width = shirt?.width?.v ?? 1.05;
  const flare = shirt?.flare?.v ?? 1.0;

  // Convert YAML to UI ranges (0-100)
  // length: 0.5-3.5 -> 0-100
  const lengthUI = useMemo(() => {
    const min = 0.5, max = 3.5;
    return ((length - min) / (max - min)) * 100;
  }, [length]);

  // width: 1.0-1.3 -> 0-100
  const widthUI = useMemo(() => {
    const min = 1.0, max = 1.3;
    return ((width - min) / (max - min)) * 100;
  }, [width]);

  // flare: 0.7-1.6 -> 0-100
  const flareUI = useMemo(() => {
    const min = 0.7, max = 1.6;
    return ((flare - min) / (max - min)) * 100;
  }, [flare]);

  const handleLengthChange = (uiValue: number) => {
    const min = 0.5, max = 3.5;
    const yamlValue = min + (uiValue / 100) * (max - min);
    updateShirtValue('length', yamlValue);
  };

  const handleWidthChange = (uiValue: number) => {
    const min = 1.0, max = 1.3;
    const yamlValue = min + (uiValue / 100) * (max - min);
    updateShirtValue('width', yamlValue);
  };

  const handleFlareChange = (uiValue: number) => {
    const min = 0.7, max = 1.6;
    const yamlValue = min + (uiValue / 100) * (max - min);
    updateShirtValue('flare', yamlValue);
  };

  return (
    <div className="space-y-4">
      <Toggle
        label="Strapless"
        value={isStrapless}
        onChange={(value) => updateShirtValue('strapless', value)}
      />

      <Slider
        label="Length"
        value={lengthUI}
        onChange={handleLengthChange}
        min={0}
        max={100}
      />

      <Slider
        label="Width"
        value={widthUI}
        onChange={handleWidthChange}
        min={0}
        max={100}
      />

      <Slider
        label="Flare"
        value={flareUI}
        onChange={handleFlareChange}
        min={0}
        max={100}
      />
    </div>
  );
};

export default ShirtSection;
