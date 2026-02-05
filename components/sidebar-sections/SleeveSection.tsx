'use client';

import React, { useMemo } from 'react';
import HorizontalGallery from '../ui/HorizontalGallery';
import Slider from '../ui/Slider';
import Toggle from '../ui/Toggle';
import CollapsibleSection from '../ui/CollapsibleSection';
import { useSidebarValues } from '../../hooks/useSidebarValues';

interface SleeveSectionProps {
  sidebarValues: ReturnType<typeof useSidebarValues>;
}

const SleeveSection: React.FC<SleeveSectionProps> = ({ sidebarValues }) => {
  const { sleeve, updateSleeveValue, getValue } = sidebarValues;

  // Get current values from YAML or use defaults
  const isSleeveless = sleeve?.sleeveless?.v ?? false;
  const length = sleeve?.length?.v ?? 0.3;
  const endWidth = sleeve?.end_width?.v ?? 1.0;
  const angle = sleeve?.sleeve_angle?.v ?? 10;
  const armholeShape = sleeve?.armhole_shape?.v ?? 'ArmholeCurve';
  const cuffType = sleeve?.cuff?.type?.v ?? null;

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

  // Convert YAML values to UI ranges (0-100 for sliders)
  // YAML length: 0.1-1.15, UI: 0-100
  const lengthUI = useMemo(() => {
    const min = 0.1, max = 1.15;
    return ((length - min) / (max - min)) * 100;
  }, [length]);

  // YAML end_width: 0.2-2, UI: 0-100
  const endWidthUI = useMemo(() => {
    const min = 0.2, max = 2;
    return ((endWidth - min) / (max - min)) * 100;
  }, [endWidth]);

  // YAML sleeve_angle: 10-50, UI: -90 to 90 (but we'll map 10-50 to 0-100)
  const angleUI = useMemo(() => {
    const min = 10, max = 50;
    return ((angle - min) / (max - min)) * 100;
  }, [angle]);

  // Convert UI values back to YAML ranges
  const handleLengthChange = (uiValue: number) => {
    const min = 0.1, max = 1.15;
    const yamlValue = min + (uiValue / 100) * (max - min);
    updateSleeveValue('length', yamlValue);
  };

  const handleEndWidthChange = (uiValue: number) => {
    const min = 0.2, max = 2;
    const yamlValue = min + (uiValue / 100) * (max - min);
    updateSleeveValue('end_width', yamlValue);
  };

  const handleAngleChange = (uiValue: number) => {
    const min = 10, max = 50;
    const yamlValue = min + (uiValue / 100) * (max - min);
    updateSleeveValue('sleeve_angle', Math.round(yamlValue));
  };

  const handleArmholeSelect = (option: { originalName: string }) => {
    updateSleeveValue('armhole_shape', option.originalName);
  };

  const handleCuffSelect = (option: { originalName: string }) => {
    sidebarValues.updateValue(['design', 'sleeve', 'cuff', 'type'], option.originalName);
  };

  return (
    <div className="space-y-4">
      <Toggle
        label="Sleeveless"
        value={isSleeveless}
        onChange={(value) => updateSleeveValue('sleeveless', value)}
      />

      <Slider
        label="Length"
        value={lengthUI}
        onChange={handleLengthChange}
        min={0}
        max={100}
      />

      <div>
        <label className="block text-xs font-semibold text-gray-300 mb-2">
          Armhole Shape
        </label>
        <HorizontalGallery 
          options={armholeOptions} 
          onSelect={handleArmholeSelect}
        />
      </div>

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

          <Slider
            label="End Width"
            value={endWidthUI}
            onChange={handleEndWidthChange}
            min={0}
            max={100}
          />

          <Slider
            label="Angle"
            value={angleUI}
            onChange={handleAngleChange}
            min={0}
            max={100}
          />
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default SleeveSection;
