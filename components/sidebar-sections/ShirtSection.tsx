'use client';

import React, { useState } from 'react';
import Slider from '../ui/Slider';
import Toggle from '../ui/Toggle';

const ShirtSection: React.FC = () => {
  const [isStrapless, setIsStrapless] = useState(false);
  const [length, setLength] = useState(50);
  const [width, setWidth] = useState(50);
  const [flare, setFlare] = useState(0);

  return (
    <div className="space-y-4">
      <Toggle
        label="Strapless"
        value={isStrapless}
        onChange={setIsStrapless}
      />

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

      <Slider
        label="Flare"
        value={flare}
        onChange={setFlare}
        min={-50}
        max={50}
      />
    </div>
  );
};

export default ShirtSection;
