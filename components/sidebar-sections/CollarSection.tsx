'use client';

import React, { useMemo } from 'react';
import HorizontalGallery from '../ui/HorizontalGallery';
import Slider from '../ui/Slider';
import CollapsibleSection from '../ui/CollapsibleSection';
import { useSidebarValues } from '../../hooks/useSidebarValues';

interface CollarSectionProps {
  sidebarValues: ReturnType<typeof useSidebarValues>;
}

const CollarSection: React.FC<CollarSectionProps> = ({ sidebarValues }) => {
  const { collar, updateCollarValue, updateValue } = sidebarValues;

  const collarWidth = collar?.width?.v ?? 0.2;
  const depth = collar?.fc_depth?.v ?? 0.4;
  const angle = collar?.fc_angle?.v ?? 95;
  const bezier = collar?.f_bezier_x?.v ?? 0.3;
  const frontCollar = collar?.f_collar?.v ?? 'CircleNeckHalf';
  const backCollar = collar?.b_collar?.v ?? 'CircleNeckHalf';
  const collarStyle = collar?.component?.style?.v ?? null;

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

  // Convert YAML to UI ranges
  // width: -0.5 to 1 -> 0-100
  const widthUI = useMemo(() => {
    const min = -0.5, max = 1;
    return ((collarWidth - min) / (max - min)) * 100;
  }, [collarWidth]);

  // depth: 0.3-2 -> 0-100
  const depthUI = useMemo(() => {
    const min = 0.3, max = 2;
    return ((depth - min) / (max - min)) * 100;
  }, [depth]);

  // angle: 70-110 -> 0-100
  const angleUI = useMemo(() => {
    const min = 70, max = 110;
    return ((angle - min) / (max - min)) * 100;
  }, [angle]);

  // bezier: 0.05-0.95 -> 0-100
  const bezierUI = useMemo(() => {
    const min = 0.05, max = 0.95;
    return ((bezier - min) / (max - min)) * 100;
  }, [bezier]);

  const handleWidthChange = (uiValue: number) => {
    const min = -0.5, max = 1;
    const yamlValue = min + (uiValue / 100) * (max - min);
    updateCollarValue('width', yamlValue);
  };

  const handleDepthChange = (uiValue: number) => {
    const min = 0.3, max = 2;
    const yamlValue = min + (uiValue / 100) * (max - min);
    updateCollarValue('fc_depth', yamlValue);
  };

  const handleAngleChange = (uiValue: number) => {
    const min = 70, max = 110;
    const yamlValue = min + (uiValue / 100) * (max - min);
    updateCollarValue('fc_angle', Math.round(yamlValue));
  };

  const handleBezierChange = (uiValue: number) => {
    const min = 0.05, max = 0.95;
    const yamlValue = min + (uiValue / 100) * (max - min);
    updateCollarValue('f_bezier_x', yamlValue);
  };

  const handleFrontCollarSelect = (option: { originalName: string }) => {
    updateCollarValue('f_collar', option.originalName);
  };

  const handleBackCollarSelect = (option: { originalName: string }) => {
    updateCollarValue('b_collar', option.originalName);
  };

  const handleCollarStyleSelect = (option: { originalName: string }) => {
    updateValue(['design', 'collar', 'component', 'style'], option.originalName);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-gray-300 mb-2">
          Front Style
        </label>
        <HorizontalGallery 
          options={necklineOptions} 
          onSelect={handleFrontCollarSelect}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-300 mb-2">
          Back Style
        </label>
        <HorizontalGallery 
          options={necklineOptions} 
          onSelect={handleBackCollarSelect}
        />
      </div>

      <Slider
        label="Width"
        value={widthUI}
        onChange={handleWidthChange}
        min={0}
        max={100}
      />

      <div>
        <label className="block text-xs font-semibold text-gray-300 mb-2">
          Collar Style
        </label>
        <HorizontalGallery 
          options={collarStyleOptions} 
          onSelect={handleCollarStyleSelect}
        />
      </div>

      <CollapsibleSection title="Details">
        <div className="space-y-4">
          <Slider
            label="Depth"
            value={depthUI}
            onChange={handleDepthChange}
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

          <Slider
            label="Bezier"
            value={bezierUI}
            onChange={handleBezierChange}
            min={0}
            max={100}
          />
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default CollarSection;
