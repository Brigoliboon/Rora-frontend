'use client';

import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronLeft,
  Palette,
  Shirt,
  Glasses,
  Hand,
  ShirtIcon,
  ArrowLeftRight,
  type IconNode,
  Icon
} from 'lucide-react';

import {trousers} from '@lucide/lab';

import SilhouetteSection from './sidebar-sections/SilhouetteSection';
import ShirtSection from './sidebar-sections/ShirtSection';
import CollarSection from './sidebar-sections/CollarSection';
import SleeveSection from './sidebar-sections/SleeveSection';
import SkirtSection from './sidebar-sections/SkirtSection';
import PantsSection from './sidebar-sections/PantsSection';
import AsymmetrySection from './sidebar-sections/AsymmetrySection';
import { useSidebarValues } from '../hooks/useSidebarValues';

interface DesignEditorSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const DesignEditorSidebar: React.FC<DesignEditorSidebarProps> = ({
  isOpen,
  onToggle,
}) => {
  // Initialize the sidebar values hook
  const sidebarValues = useSidebarValues({
    yamlPath: '/samples/pencil_skirt/dress_pencil_body_measurements.yaml',
    debounceMs: 500,
  });

  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    silhouette: true,
    shirt: true,
    collar: true,
    sleeve: true,
    skirt: true,
    pants: true,
    asymmetry: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const sections = [
    {
      id: 'silhouette',
      title: 'SILHOUETTE',
      icon: <Palette size={18}/>,
      component: <SilhouetteSection sidebarValues={sidebarValues} />,
    },
    {
      id: 'shirt',
      title: 'SHIRT',
      icon: <Shirt size={18}/>,
      component: <ShirtSection sidebarValues={sidebarValues} />,
    },
    {
      id: 'collar',
      title: 'COLLAR & NECKLINE',
      icon: <Glasses size={18}/>,
      component: <CollarSection sidebarValues={sidebarValues} />,
    },
    {
      id: 'sleeve',
      title: 'SLEEVES',
      icon: <Hand size={18}/>,
      component: <SleeveSection sidebarValues={sidebarValues} />,
    },
    {
      id: 'skirt',
      title: 'SKIRT',
      icon: <Shirt size={18}/>,
      component: <SkirtSection sidebarValues={sidebarValues} />,
    },
    {
      id: 'pants',
      title: 'PANTS',
      icon: '',
      component: <PantsSection sidebarValues={sidebarValues} />,
    },
    {
      id: 'asymmetry',
      title: 'ASYMMETRY',
      icon: <ArrowLeftRight size={18}/>,
      component: <AsymmetrySection sidebarValues={sidebarValues} />,
    },
  ];
  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="fixed left-0 top-4 z-40 bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-r-lg transition-all duration-300"
        aria-label="Toggle sidebar"
      >
        <ChevronLeft
          size={20}
          className={`transition-transform ${!isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-80 bg-gray-900 text-white overflow-y-auto transition-transform duration-300 z-30 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 border-b border-gray-700 sticky top-0 bg-gray-900">
          <h1 className="text-sm font-bold tracking-wider">DESIGN EDITOR</h1>
        </div>

        <div className="divide-y divide-gray-700">
          {sections.map((section) => {
            const isExpanded = expandedSections[section.id];

            return (
              <div key={section.id} className="bg-gray-800">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-700 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    {section.icon}
                    <span className="text-xs font-semibold tracking-wider">
                      {section.title}
                    </span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      isExpanded ? '' : '-rotate-90'
                    }`}
                  />
                </button>

                {isExpanded && (
                  <div className="px-4 py-3 border-t border-gray-700 space-y-4">
                    {section.component}
                  </div>
                )}
              </div>
            );
          })}
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
