'use client';

import React from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Preset {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  popularity: 'trending' | 'new' | 'popular';
}

const suggestedPresets: Preset[] = [
  {
    id: '1',
    name: 'Summer Breeze Dress',
    imageUrl: '/samples/pencil_skirt/dress_pencil_texture.png',
    category: 'Dress',
    popularity: 'trending',
  },
  {
    id: '2',
    name: 'Classic Business Shirt',
    imageUrl: '/shirt_mean_pattern.svg',
    category: 'Shirt',
    popularity: 'popular',
  },
  {
    id: '3',
    name: 'Casual Weekend Tee',
    imageUrl: '/t_shirt_pattern.svg',
    category: 'T-Shirt',
    popularity: 'new',
  },
];

const SuggestedPresets: React.FC = () => {
  return (
    <section className="bg-[var(--background-secondary)] rounded-2xl border border-[rgba(148,163,184,0.1)] p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-teal-400" />
          Suggested for You
        </h2>
        <Link 
          href="/canvas/community"
          className="text-sm text-teal-400 hover:text-cyan-400 transition-colors"
        >
          Browse all
        </Link>
      </div>

      <div className="space-y-3">
        {suggestedPresets.map((preset) => (
          <Link
            key={preset.id}
            href={`/canvas/new?preset=${preset.id}`}
            className="group flex items-center gap-4 p-3 rounded-xl hover:bg-[rgba(148,163,184,0.05)] transition-all duration-300"
          >
            {/* Thumbnail */}
            <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-[var(--background-tertiary)] flex-shrink-0 border border-[rgba(148,163,184,0.1)]">
              <Image
                src={preset.imageUrl}
                alt={preset.name}
                fill
                className="object-contain p-2"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-white font-medium text-sm truncate group-hover:aurora-gradient-text transition-all duration-300">
                  {preset.name}
                </h3>
                {preset.popularity === 'trending' && (
                  <span className="px-2 py-0.5 text-xs rounded-full bg-gradient-to-r from-teal-500/20 to-cyan-500/20 text-teal-300 border border-teal-500/30">
                    Trending
                  </span>
                )}
                {preset.popularity === 'new' && (
                  <span className="px-2 py-0.5 text-xs rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30">
                    New
                  </span>
                )}
              </div>
              <p className="text-xs text-[var(--foreground-muted)]">{preset.category}</p>
            </div>

            {/* Arrow */}
            <ArrowUpRight className="w-4 h-4 text-[var(--foreground-muted)] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:text-teal-400" />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SuggestedPresets;
