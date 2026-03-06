'use client';

import React, { useState } from 'react';
import { 
  Plus, 
  Eye, 
  Shirt, 
  Palette, 
  Sparkles, 
  History,
  LucideIcon 
} from 'lucide-react';
import FunctionalityCard from './ui/FunctionalityCard';
import VerticalGallery from './ui/VerticalGallery';
import HistoryCard from './ui/HistoryCard';

// Types
interface FunctionalityItem {
  id: string;
  name: string;
  icon: LucideIcon;
  action: () => void;
}

interface PresetItem {
  id: string;
  name: string;
  icon: LucideIcon;
}

interface HistoryItem {
  id: string;
  title: string;
  imageUrl: string;
  timestamp?: string;
}

interface GalleryProps {
  // Functionality cards data
  functionalityItems?: FunctionalityItem[];
  
  // Presets data
  presets?: PresetItem[];
  onPresetSelect?: (preset: PresetItem) => void;
  
  // Recent edits data
  recentEdits?: HistoryItem[];
  onRecentEditSelect?: (item: HistoryItem) => void;
  
  // View models data
  viewModels?: HistoryItem[];
  onViewModelSelect?: (item: HistoryItem) => void;
  
  className?: string;
}

const Gallery: React.FC<GalleryProps> = ({
  functionalityItems,
  presets,
  onPresetSelect,
  recentEdits,
  onRecentEditSelect,
  viewModels,
  onViewModelSelect,
  className = '',
}) => {
  const [selectedFunctionality, setSelectedFunctionality] = useState<string | null>(null);

  // Default functionality items if none provided
  const defaultFunctionalityItems: FunctionalityItem[] = [
    { 
      id: 'create', 
      name: 'Create Canvas', 
      icon: Plus, 
      action: () => console.log('Create Canvas clicked') 
    },
    { 
      id: 'view', 
      name: 'View Models', 
      icon: Eye, 
      action: () => console.log('View Models clicked') 
    },
    { 
      id: 'design', 
      name: 'Design Editor', 
      icon: Palette, 
      action: () => console.log('Design Editor clicked') 
    },
  ];

  // Default presets if none provided
  const defaultPresets: PresetItem[] = [
    { id: 'tshirt', name: 'T-Shirt', icon: Shirt },
    { id: 'shirt', name: 'Shirt', icon: Shirt },
    { id: 'dress', name: 'Dress', icon: Sparkles },
    { id: 'skirt', name: 'Skirt', icon: Sparkles },
    { id: 'pants', name: 'Pants', icon: Shirt },
  ];

  // Default recent edits if none provided
  const defaultRecentEdits: HistoryItem[] = [
    { 
      id: '1', 
      title: 'Summer Dress', 
      imageUrl: '/samples/pencil_skirt/dress_pencil_texture.png',
      timestamp: '2 hours ago'
    },
    { 
      id: '2', 
      title: 'Casual Shirt', 
      imageUrl: '/shirt_mean_pattern.svg',
      timestamp: '5 hours ago'
    },
    { 
      id: '3', 
      title: 'Evening Gown', 
      imageUrl: '/dress_pencil_pattern.svg',
      timestamp: '1 day ago'
    },
    { 
      id: '4', 
      title: 'Business Suit', 
      imageUrl: '/t_shirt_pattern.svg',
      timestamp: '2 days ago'
    },
  ];

  // Default view models if none provided
  const defaultViewModels: HistoryItem[] = [
    { 
      id: 'model1', 
      title: 'Mannequin A', 
      imageUrl: '/samples/pencil_skirt/dress_pencil_texture.png',
    },
    { 
      id: 'model2', 
      title: 'Mannequin B', 
      imageUrl: '/samples/pencil_skirt/dress_pencil_pattern.png',
    },
    { 
      id: 'model3', 
      title: 'Custom Model', 
      imageUrl: '/model_outline.svg',
    },
  ];

  const activeFunctionalityItems = functionalityItems || defaultFunctionalityItems;
  const activePresets = presets || defaultPresets;
  const activeRecentEdits = recentEdits || defaultRecentEdits;
  const activeViewModels = viewModels || defaultViewModels;

  const handleFunctionalityClick = (item: FunctionalityItem) => {
    setSelectedFunctionality(item.id);
    item.action();
  };

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Section 1: Functionality Cards */}
      <section>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Plus className="text-blue-400" size={24} />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeFunctionalityItems.map((item) => (
            <FunctionalityCard
              key={item.id}
              id={item.id}
              name={item.name}
              icon={item.icon}
              isSelected={selectedFunctionality === item.id}
              onClick={() => handleFunctionalityClick(item)}
            />
          ))}
        </div>
      </section>

      <hr className="border-gray-700" />

      {/* Section 2: Presets (Vertical Gallery) */}
      <section>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Sparkles className="text-purple-400" size={24} />
          Presets
        </h2>
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
          <VerticalGallery
            items={activePresets}
            onSelect={onPresetSelect}
          />
        </div>
      </section>

      <hr className="border-gray-700" />

      {/* Section 3: Recent Edits (Horizontal Gallery) */}
      <section>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <History className="text-green-400" size={24} />
          Recent Edits
        </h2>
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {activeRecentEdits.map((item) => (
              <HistoryCard
                key={item.id}
                id={item.id}
                title={item.title}
                imageUrl={item.imageUrl}
                onClick={() => onRecentEditSelect?.(item)}
              />
            ))}
          </div>
        </div>
      </section>

      <hr className="border-gray-700" />

      {/* Section 4: View Models (Horizontal Gallery) */}
      <section>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Eye className="text-orange-400" size={24} />
          Your Models
        </h2>
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {activeViewModels.map((item) => (
              <HistoryCard
                key={item.id}
                id={item.id}
                title={item.title}
                imageUrl={item.imageUrl}
                onClick={() => onViewModelSelect?.(item)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
