'use client';

import React, { useState } from 'react';
import {
  Palette,
  Shirt,
  Settings2,
  X,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';

import SilhouetteSection from './sidebar-sections/SilhouetteSection';
import ShirtSection from './sidebar-sections/ShirtSection';
import CollarSection from './sidebar-sections/CollarSection';
import SleeveSection from './sidebar-sections/SleeveSection';
import SkirtSection from './sidebar-sections/SkirtSection';
import PantsSection from './sidebar-sections/PantsSection';
import AsymmetrySection from './sidebar-sections/AsymmetrySection';
import ConfigCard from './ui/ConfigCard';
import { useSidebarValues } from '../hooks/useSidebarValues';

type SidebarTab = 'garments' | 'config';

interface DesignEditorSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  sessionToken: string | null;
  mannequinData?: any;
}

const DesignEditorSidebar: React.FC<DesignEditorSidebarProps> = ({
  isOpen,
  onToggle,
  sessionToken,
  mannequinData
}) => {
  // Initialize the sidebar values hook
  const sidebarValues = useSidebarValues({
    yamlPath: '/samples/pencil_skirt/dress_pencil_body_measurements.yaml',
    debounceMs: 500,
    sessionToken,
    mannequinData,
  });

  const { silhouette, asymmetry } = sidebarValues;

  // Determine which sections should be visible based on silhouette selection
  const hasUpper = silhouette?.upper?.v !== null && silhouette?.upper?.v !== undefined;
  const hasBottom = silhouette?.bottom?.v !== null && silhouette?.bottom?.v !== undefined;
  const bottomType = silhouette?.bottom?.v;

  // Check specific bottom types
  const isSkirt = hasBottom && bottomType && ['SkirtCircle', 'AsymmSkirtCircle', 'GodetSkirt', 'Skirt2', 'PencilSkirt', 'SkirtManyPanels', 'SkirtLevels'].includes(bottomType);
  const isPants = hasBottom && bottomType === 'Pants';

  const isAsymmetryEnabled = asymmetry?.enable_asym?.v ?? false;

  // Tab state - defaults to garments, switches to config when garment is selected
  const [activeTab, setActiveTab] = useState<SidebarTab>('garments');

  // Count active config sections for badges
  const activeSectionCount = [
    hasUpper ? 1 : 0,  // Shirt
    hasUpper ? 1 : 0,  // Collar
    hasUpper ? 1 : 0,  // Sleeve
    isSkirt ? 1 : 0,   // Skirt
    isPants ? 1 : 0,   // Pants
  ].reduce((a, b) => a + b, 0);

  // Check if we can show config (needs at least one garment selected)
  const canShowConfig = hasUpper || hasBottom;

  const handleGarmentSelect = () => {
    if (canShowConfig) {
      setActiveTab('config');
    }
  };

  const handleBackToGarments = () => {
    setActiveTab('garments');
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-gray-900 text-white overflow-hidden transition-all duration-300 z-30 flex flex-col ${
          isOpen ? 'w-[320px]' : 'w-0'
        }`}
      >
        {/* Header with Tabs */}
        <div className="flex-shrink-0 border-b border-gray-700 bg-gray-900">
          {/* Tab Buttons */}
          <div className="flex">
            <button
              onClick={() => setActiveTab('garments')}
              className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                activeTab === 'garments'
                  ? 'text-white border-b-2 border-blue-500 bg-gray-800'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <Palette size={16} />
              Garments
            </button>
            <button
              onClick={() => canShowConfig && setActiveTab('config')}
              disabled={!canShowConfig}
              className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                activeTab === 'config'
                  ? 'text-white border-b-2 border-blue-500 bg-gray-800'
                  : canShowConfig
                    ? 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    : 'text-gray-600 cursor-not-allowed'
              }`}
            >
              <Settings2 size={16} />
              Config
              {activeSectionCount > 0 && (
                <span className="px-1.5 py-0.5 text-xs bg-blue-500/20 text-blue-300 rounded-full">
                  {activeSectionCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          {/* GARMENTS TAB */}
          {activeTab === 'garments' && (
            <div className="p-4 space-y-4">
              {/* Back button when garment is selected */}
              {canShowConfig && (
                <button
                  onClick={() => setActiveTab('config')}
                  className="w-full mb-4 py-2 px-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <ArrowRight size={14} />
                  Continue to Config
                </button>
              )}

              <SilhouetteSection 
                sidebarValues={sidebarValues} 
                onSelect={handleGarmentSelect}
              />

              <div className="border-t border-gray-700/50 pt-4">
                <AsymmetrySection sidebarValues={sidebarValues} />
              </div>
            </div>
          )}

          {/* CONFIG TAB */}
          {activeTab === 'config' && (
            <div className="p-4 space-y-3">
              {/* Back button */}
              <button
                onClick={handleBackToGarments}
                className="w-full mb-2 py-2 px-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <ArrowLeft size={14} />
                Back to Garments
              </button>

              {/* Current Selection Summary */}
              <div className="mb-4 p-3 bg-gray-800/50 rounded-lg">
                <div className="text-xs text-gray-400 mb-2">Current Selection</div>
                <div className="flex flex-wrap gap-1.5">
                  {hasUpper && (
                    <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded">
                      {silhouette?.upper?.v}
                    </span>
                  )}
                  {silhouette?.wb?.v && (
                    <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded">
                      {silhouette?.wb?.v}
                    </span>
                  )}
                  {hasBottom && (
                    <span className="px-2 py-1 text-xs bg-pink-500/20 text-pink-300 rounded">
                      {silhouette?.bottom?.v}
                    </span>
                  )}
                </div>
              </div>

              {/* Shirt Section - shows when upper is selected */}
              {hasUpper && (
                <ConfigCard
                  title="Shirt"
                  icon={Shirt}
                  iconColor="text-blue-400"
                  defaultOpen={true}
                >
                  <ShirtSection sidebarValues={sidebarValues} />
                </ConfigCard>
              )}

              {/* Collar Section - shows when upper is selected */}
              {hasUpper && (
                <ConfigCard
                  title="Collar & Neckline"
                  icon={Palette}
                  iconColor="text-purple-400"
                  defaultOpen={true}
                >
                  <CollarSection sidebarValues={sidebarValues} />
                </ConfigCard>
              )}

              {/* Sleeve Section - shows when upper is selected */}
              {hasUpper && (
                <ConfigCard
                  title="Sleeves"
                  icon={Shirt}
                  iconColor="text-green-400"
                  defaultOpen={true}
                >
                  <SleeveSection sidebarValues={sidebarValues} />
                </ConfigCard>
              )}

              {/* Skirt Section - shows when bottom is a skirt type */}
              {isSkirt && (
                <ConfigCard
                  title="Skirt"
                  icon={Shirt}
                  iconColor="text-pink-400"
                  defaultOpen={true}
                >
                  <SkirtSection sidebarValues={sidebarValues} />
                </ConfigCard>
              )}

              {/* Pants Section - shows when bottom is pants */}
              {isPants && (
                <ConfigCard
                  title="Pants"
                  icon={Settings2}
                  iconColor="text-orange-400"
                  defaultOpen={true}
                >
                  <PantsSection sidebarValues={sidebarValues} />
                </ConfigCard>
              )}

              {/* Asymmetry in Config */}
              {isAsymmetryEnabled && (
                <ConfigCard
                  title="Asymmetry"
                  icon={Settings2}
                  iconColor="text-yellow-400"
                  defaultOpen={true}
                >
                  <div className="text-xs text-gray-400">
                    Asymmetry configuration options will appear here
                  </div>
                </ConfigCard>
              )}
            </div>
          )}
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onToggle}
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
        />
      )}
    </>
  );
};

export default DesignEditorSidebar;
