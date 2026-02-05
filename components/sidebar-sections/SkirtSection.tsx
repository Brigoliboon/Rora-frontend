'use client';

import React, { useMemo } from 'react';
import HorizontalGallery from '../ui/HorizontalGallery';
import Slider from '../ui/Slider';
import CollapsibleSection from '../ui/CollapsibleSection';
import { useSidebarValues } from '../../hooks/useSidebarValues';

interface SkirtSectionProps {
  sidebarValues: ReturnType<typeof useSidebarValues>;
}

const SkirtSection: React.FC<SkirtSectionProps> = ({ sidebarValues }) => {
  const { skirt, updateSkirtValue, updateValue } = sidebarValues;

  const length = skirt?.length?.v ?? 0.2;
  const rise = skirt?.rise?.v ?? 1;
  const flare = skirt?.flare?.v ?? 0;
  const ruffle = skirt?.ruffle?.v ?? 1.3;
  const bottomCut = skirt?.bottom_cut?.v ?? 0;

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

  // Convert YAML to UI ranges
  // length: -0.2 to 0.95 -> 0-100
  const lengthUI = useMemo(() => {
    const min = -0.2, max = 0.95;
    return ((length - min) / (max - min)) * 100;
  }, [length]);

  // rise: 0.5-1 -> 0-100
  const riseUI = useMemo(() => {
    const min = 0.5, max = 1;
    return ((rise - min) / (max - min)) * 100;
  }, [rise]);

  // flare: 0-20 -> 0-100
  const flareUI = useMemo(() => {
    const min = 0, max = 20;
    return ((flare - min) / (max - min)) * 100;
  }, [flare]);

  // ruffle: 1-2 -> 0-100
  const ruffleUI = useMemo(() => {
    const min = 1, max = 2;
    return ((ruffle - min) / (max - min)) * 100;
  }, [ruffle]);

  // bottom_cut: 0-0.9 -> 0-100
  const bottomCutUI = useMemo(() => {
    const min = 0, max = 0.9;
    return ((bottomCut - min) / (max - min)) * 100;
  }, [bottomCut]);

  const handleLengthChange = (uiValue: number) => {
    const min = -0.2, max = 0.95;
    const yamlValue = min + (uiValue / 100) * (max - min);
    updateSkirtValue('length', yamlValue);
  };

  const handleRiseChange = (uiValue: number) => {
    const min = 0.5, max = 1;
    const yamlValue = min + (uiValue / 100) * (max - min);
    updateSkirtValue('rise', yamlValue);
  };

  const handleFlareChange = (uiValue: number) => {
    const min = 0, max = 20;
    const yamlValue = min + (uiValue / 100) * (max - min);
    updateSkirtValue('flare', Math.round(yamlValue));
  };

  const handleRuffleChange = (uiValue: number) => {
    const min = 1, max = 2;
    const yamlValue = min + (uiValue / 100) * (max - min);
    updateSkirtValue('ruffle', yamlValue);
  };

  const handleBottomCutChange = (uiValue: number) => {
    const min = 0, max = 0.9;
    const yamlValue = min + (uiValue / 100) * (max - min);
    updateSkirtValue('bottom_cut', yamlValue);
  };

  const handleSkirtStyleSelect = (option: { originalName: string }) => {
    sidebarValues.updateSilhouetteValue('bottom', option.originalName);
  };

  const handlePanelCurveSelect = (option: { originalName: string }) => {
    updateValue(['design', 'skirt-many-panels', 'panel_curve'], parseFloat(option.originalName));
  };

  const handleSideCutSelect = (option: { originalName: string }) => {
    updateValue(['design', 'pencil-skirt', 'style_side_cut'], option.originalName);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-gray-300 mb-2">
          Style
        </label>
        <HorizontalGallery 
          options={skirtStyleOptions} 
          onSelect={handleSkirtStyleSelect}
        />
      </div>

      <Slider
        label="Length"
        value={lengthUI}
        onChange={handleLengthChange}
        min={0}
        max={100}
      />

      <Slider
        label="Rise"
        value={riseUI}
        onChange={handleRiseChange}
        min={0}
        max={100}
      />

      <CollapsibleSection title="Details">
        <div className="space-y-4">
          <Slider
            label="Flare"
            value={flareUI}
            onChange={handleFlareChange}
            min={0}
            max={100}
          />

          <Slider
            label="Ruffle"
            value={ruffleUI}
            onChange={handleRuffleChange}
            min={0}
            max={100}
          />

          <Slider
            label="Slits"
            value={bottomCutUI}
            onChange={handleBottomCutChange}
            min={0}
            max={100}
          />

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-2">
              Panel Curve
            </label>
            <HorizontalGallery 
              options={panelCurveOptions} 
              onSelect={handlePanelCurveSelect}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-2">
              Side Cut
            </label>
            <HorizontalGallery 
              options={sideCutOptions} 
              onSelect={handleSideCutSelect}
            />
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default SkirtSection;
