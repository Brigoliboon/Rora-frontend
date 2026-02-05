'use client';

import React, { useMemo } from 'react';
import Slider from '../ui/Slider';
import CollapsibleSection from '../ui/CollapsibleSection';
import HorizontalGallery from '../ui/HorizontalGallery';
import { useSidebarValues } from '../../hooks/useSidebarValues';

interface PantsSectionProps {
  sidebarValues: ReturnType<typeof useSidebarValues>;
}

const PantsSection: React.FC<PantsSectionProps> = ({ sidebarValues }) => {
  const { pants, updatePantsValue, updateValue } = sidebarValues;

  const length = pants?.length?.v ?? 0.3;
  const width = pants?.width?.v ?? 1.0;
  const cuffType = pants?.cuff?.type?.v ?? null;

  const cuffOptions = [
    { id: 'band', displayName: 'Band', originalName: 'CuffBand' },
    { id: 'skirt', displayName: 'Skirt', originalName: 'CuffSkirt' },
    { id: 'band-skirt', displayName: 'Band & Skirt', originalName: 'CuffBandSkirt' },
  ];

  // Convert YAML to UI ranges
  // length: 0.2-0.9 -> 0-100
  const lengthUI = useMemo(() => {
    const min = 0.2, max = 0.9;
    return ((length - min) / (max - min)) * 100;
  }, [length]);

  // width: 1.0-1.5 -> 0-100
  const widthUI = useMemo(() => {
    const min = 1.0, max = 1.5;
    return ((width - min) / (max - min)) * 100;
  }, [width]);

  const handleLengthChange = (uiValue: number) => {
    const min = 0.2, max = 0.9;
    const yamlValue = min + (uiValue / 100) * (max - min);
    updatePantsValue('length', yamlValue);
  };

  const handleWidthChange = (uiValue: number) => {
    const min = 1.0, max = 1.5;
    const yamlValue = min + (uiValue / 100) * (max - min);
    updatePantsValue('width', yamlValue);
  };

  const handleCuffSelect = (option: { originalName: string }) => {
    updateValue(['design', 'pants', 'cuff', 'type'], option.originalName);
  };

  return (
    <div className="space-y-4">
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

      <CollapsibleSection title="Details">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-2">
              Cuff Type
            </label>
            <HorizontalGallery 
              options={cuffOptions} 
              onSelect={handleCuffSelect}
            />
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default PantsSection;
