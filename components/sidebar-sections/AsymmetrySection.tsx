'use client';

import React from 'react';
import Toggle from '../ui/Toggle';
import CollapsibleSection from '../ui/CollapsibleSection';
import { useSidebarValues } from '../../hooks/useSidebarValues';

interface AsymmetrySectionProps {
  sidebarValues: ReturnType<typeof useSidebarValues>;
}

const AsymmetrySection: React.FC<AsymmetrySectionProps> = ({ sidebarValues }) => {
  const { asymmetry, updateAsymmetryValue } = sidebarValues;

  const isEnabled = asymmetry?.enable_asym?.v ?? false;

  return (
    <div className="space-y-4">
      <Toggle
        label="Enable Asymmetry"
        value={isEnabled}
        onChange={(value) => updateAsymmetryValue('enable_asym', value)}
      />

      {isEnabled && (
        <CollapsibleSection title="Details">
          <div className="text-xs text-gray-400">
            Asymmetry options and details will appear here
          </div>
        </CollapsibleSection>
      )}
    </div>
  );
};

export default AsymmetrySection;
