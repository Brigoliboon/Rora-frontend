'use client';

import React from 'react';
import { Shirt, Sparkles, Scissors, ArrowUpRight, User } from 'lucide-react';
import Link from 'next/link';


interface CreateCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  items: string[];
  auroraGradient: string;
  glowColor: string;
}

const categories: CreateCategory[] = [
  {
    id: 'upper',
    title: 'Upper Wear',
    description: 'Shirts, tees, blouses, and more',
    icon: Shirt,
    items: ['T-Shirt', 'Shirt', 'Blouse', 'Tank Top', 'Sweater'],
    auroraGradient: 'from-teal-400 via-cyan-400 to-blue-400',
    glowColor: 'rgba(20, 184, 166, 0.3)',
  },
  {
    id: 'lower',
    title: 'Lower Wear',
    description: 'Pants, skirts, shorts, and more',
    icon: Scissors,
    items: ['Pants', 'Skirt', 'Shorts', 'Jeans', 'Leggings'],
    auroraGradient: 'from-cyan-400 via-blue-400 to-purple-400',
    glowColor: 'rgba(6, 182, 212, 0.3)',
  },
  {
    id: 'blank',
    title: 'Blank Pattern',
    description: 'Start with a clean canvas',
    icon: Sparkles,
    items: ['Custom Shape', 'Import SVG', 'Draw Freehand', 'Use Template'],
    auroraGradient: 'from-purple-400 via-pink-400 to-rose-400',
    glowColor: 'rgba(139, 92, 246, 0.3)',
  },
  {
    id: 'mannequin',
    title: 'New Mannequin',
    description: 'Create custom body models',
    icon: User,
    items: ['Body Measurements', '3D Preview', 'Save & Reuse', 'Multiple Sizes'],
    auroraGradient: 'from-blue-400 via-indigo-400 to-purple-400',
    glowColor: 'rgba(59, 130, 246, 0.3)',
  },
];


interface CreateNewSectionProps {
  onCreateMannequin?: () => void;
}

const CreateNewSection: React.FC<CreateNewSectionProps> = ({ onCreateMannequin }) => {

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Create New</h2>
          <p className="text-[var(--foreground-muted)] text-sm">Choose a category to begin</p>
        </div>
        <Link 
          href="/canvas/new"
          className="text-sm text-teal-400 hover:text-cyan-400 transition-colors flex items-center gap-1"
        >
          View all <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => {
          const Icon = category.icon;
          const isMannequin = category.id === 'mannequin';
          
          const CardWrapper = isMannequin ? 'button' : Link;
          const cardProps = isMannequin ? {
            onClick: onCreateMannequin,
            className: "group relative text-left w-full"
          } : {
            href: `/canvas/new?category=${category.id}`,
            className: "group relative"
          };
          
          return (
            <CardWrapper
              key={category.id}
              {...cardProps}
            >

              <div className="relative h-full p-6 rounded-3xl overflow-hidden bg-[var(--background-secondary)] border border-[rgba(148,163,184,0.1)] transition-all duration-500 hover:border-[rgba(20,184,166,0.3)]">
                <div className={`absolute inset-0 bg-gradient-to-br ${category.auroraGradient} opacity-0 transition-all duration-700 group-hover:opacity-10`} />
                
                <div 
                  className="absolute -inset-1 rounded-3xl opacity-0 blur-xl transition-all duration-700 group-hover:opacity-30"
                  style={{ background: category.glowColor }}
                />
                
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl mb-4 flex items-center justify-center bg-gradient-to-r ${category.auroraGradient} bg-opacity-20 border border-[rgba(255,255,255,0.1)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:aurora-gradient-text transition-all duration-300">
                    {category.title}
                  </h3>
                  <p className="text-[var(--foreground-muted)] text-sm mb-4">
                    {category.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 text-xs rounded-full bg-[rgba(148,163,184,0.1)] text-[var(--foreground-muted)] border border-[rgba(148,163,184,0.1)] transition-all duration-300 group-hover:bg-[rgba(20,184,166,0.1)] group-hover:text-teal-300 group-hover:border-teal-500/30"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  
                  <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[rgba(148,163,184,0.1)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </CardWrapper>
          );
        })}
      </div>

    </section>
  );
};

export default CreateNewSection;
