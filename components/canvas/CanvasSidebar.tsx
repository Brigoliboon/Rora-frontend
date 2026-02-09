'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Shirt, 
  FolderOpen, 
  Globe, 
  Star,
  User,
  LucideIcon 
} from 'lucide-react';


interface SidebarCategory {
  id: string;
  label: string;
  icon: LucideIcon;
  auroraColor: string;
}

interface CanvasSidebarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories: SidebarCategory[] = [
  { 
    id: 'for-you', 
    label: 'For You', 
    icon: Sparkles,
    auroraColor: 'from-teal-400 to-cyan-400'
  },
  { 
    id: 'my-designs', 
    label: 'My Designs', 
    icon: Shirt,
    auroraColor: 'from-cyan-400 to-blue-400'
  },
  { 
    id: 'my-models', 
    label: 'My Models', 
    icon: User,
    auroraColor: 'from-blue-400 to-indigo-400'
  },
  { 
    id: 'drafts', 
    label: 'Drafts', 
    icon: FolderOpen,
    auroraColor: 'from-indigo-400 to-purple-400'
  },
  { 
    id: 'community', 
    label: 'Community Presets', 
    icon: Globe,
    auroraColor: 'from-purple-400 to-pink-400'
  },
  { 
    id: 'featured', 
    label: 'Featured', 
    icon: Star,
    auroraColor: 'from-amber-400 to-orange-400'
  },
];


const CanvasSidebar: React.FC<CanvasSidebarProps> = ({ 
  activeCategory, 
  onCategoryChange 
}) => {
  return (
    <aside className="w-64 h-screen bg-[#0a0f1a]/80 backdrop-blur-xl border-r border-[rgba(148,163,184,0.1)] flex flex-col fixed left-0 top-0 z-40">
      {/* Logo Area */}
      <div className="p-6 border-b border-[rgba(148,163,184,0.1)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl aurora-gradient-bg flex items-center justify-center glow-subtle">
            <Sparkles className="w-5 h-5 text-teal-400" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white tracking-tight">Rora</h1>
            <p className="text-xs text-[var(--foreground-muted)]">Digital Fashion</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
                ${isActive 
                  ? 'bg-gradient-to-r ' + category.auroraColor + ' bg-opacity-10 text-white' 
                  : 'text-[var(--foreground-muted)] hover:text-white hover:bg-[rgba(148,163,184,0.05)]'
                }
              `}
            >
              <div className={`
                w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300
                ${isActive 
                  ? 'bg-white/20 shadow-lg' 
                  : 'bg-[rgba(148,163,184,0.1)] group-hover:bg-[rgba(148,163,184,0.2)]'
                }
              `}>
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[var(--foreground-muted)]'}`} />
              </div>
              <span className="text-sm font-medium">{category.label}</span>
              
              {/* Active indicator */}
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-[rgba(148,163,184,0.1)]">
        <div className="p-4 rounded-xl aurora-gradient-purple border border-[rgba(139,92,246,0.2)]">
          <p className="text-xs text-[var(--foreground-muted)] mb-2">Pro Tip</p>
          <p className="text-sm text-white font-medium">Start with a preset to save time</p>
        </div>
      </div>
    </aside>
  );
};

export default CanvasSidebar;
