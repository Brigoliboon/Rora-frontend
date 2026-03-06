'use client';

import React from 'react';
import { Clock, ArrowUpRight, Sparkles, FileEdit, MoreVertical } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import HorizontalGallery, { GalleryOption } from '../ui/HorizontalGallery';

interface Design extends GalleryOption {
  imageUrl: string;
  status: 'draft' | 'final';
  timestamp: string;
  type: string;
}

const recentDesigns: Design[] = [
  {
    id: '1',
    displayName: 'Summer Evening Dress',
    originalName: 'Dress',
    imageUrl: '/samples/pencil_skirt/dress_pencil_texture.png',
    status: 'draft',
    timestamp: '2 hours ago',
    type: 'Dress',
  },
  {
    id: '2',
    displayName: 'Business Casual Shirt',
    originalName: 'Shirt',
    imageUrl: '/shirt_mean_pattern.svg',
    status: 'final',
    timestamp: '5 hours ago',
    type: 'Shirt',
  },
  {
    id: '3',
    displayName: 'A-Line Skirt',
    originalName: 'Skirt',
    imageUrl: '/dress_pencil_pattern.svg',
    status: 'draft',
    timestamp: '1 day ago',
    type: 'Skirt',
  },
  {
    id: '4',
    displayName: 'Formal Trousers',
    originalName: 'Pants',
    imageUrl: '/t_shirt_pattern.svg',
    status: 'final',
    timestamp: '2 days ago',
    type: 'Pants',
  },
  {
    id: '5',
    displayName: 'Casual Blouse',
    originalName: 'Blouse',
    imageUrl: '/model_outline.svg',
    status: 'draft',
    timestamp: '3 days ago',
    type: 'Blouse',
  },
];

const RecentDesigns: React.FC = () => {
  const router = useRouter();

  const handleSelect = (option: GalleryOption) => {
    router.push(`/canvas/${option.id}`);
  };

  const renderCard = (option: GalleryOption, isSelected: boolean) => {
    const design = option as Design;
    return (
      <div
        className={`relative w-48 p-3 rounded-xl border transition-all duration-300 group overflow-hidden ${isSelected
          ? 'border-teal-500/50 bg-gradient-to-b from-teal-500/10 to-teal-900/20 shadow-[0_0_20px_-5px_var(--color-teal-500)]'
          : 'border-[var(--border-primary)] bg-[var(--background-secondary)] hover:border-teal-500/30 hover:bg-[var(--background-elevated)]'
          }`}
      >
        {/* Image / Placeholder */}
        <div className={`w-full aspect-[4/5] rounded-lg mb-3 overflow-hidden relative ${isSelected ? 'bg-teal-900/20' : 'bg-[var(--background-tertiary)]'
          }`}>
          {design.imageUrl ? (
            <img
              src={design.imageUrl}
              alt={design.displayName}
              className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center flex-col gap-2 text-[var(--foreground-muted)] group-hover:text-teal-400 transition-colors">
              <div className="p-3 rounded-full bg-white/5 group-hover:bg-teal-500/10 transition-colors">
                <Sparkles className="w-6 h-6" />
              </div>
            </div>
          )}

          {/* Status Badge */}
          <div className="absolute top-2 left-2">
            <span className={`
              px-1.5 py-0.5 text-[10px] font-medium rounded-md backdrop-blur-md border
              ${design.status === 'final'
                ? 'bg-teal-500/20 text-teal-200 border-teal-500/30'
                : 'bg-amber-500/20 text-amber-200 border-amber-500/30'
              }
            `}>
              {design.status === 'final' ? 'Final' : 'Draft'}
            </span>
          </div>

          {/* Edit Overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="px-3 py-1.5 rounded-full bg-teal-500 text-white text-xs font-medium flex items-center gap-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <FileEdit className="w-3 h-3" />
              Edit
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h4 className={`font-semibold text-sm truncate ${isSelected ? 'text-teal-100' : 'text-white'}`}>
              {design.displayName}
            </h4>
            <button className="text-[var(--foreground-muted)] hover:text-white transition-colors">
              <MoreVertical className="w-3 h-3" />
            </button>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-[var(--foreground-muted)]">
            <Clock className="w-3 h-3" />
            <span>{design.timestamp}</span>
            <span className="w-0.5 h-0.5 rounded-full bg-[var(--foreground-muted)]" />
            <span>{design.type}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Clock className="w-6 h-6 text-teal-400" />
          <div>
            <h2 className="text-2xl font-bold text-white">Recent Designs</h2>
            <p className="text-[var(--foreground-muted)] text-sm">Continue where you left off</p>
          </div>
        </div>
        <Link
          href="/canvas/my-designs"
          className="text-sm text-teal-400 hover:text-cyan-400 transition-colors flex items-center gap-1"
        >
          View all <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-6">
        <HorizontalGallery
          options={recentDesigns}
          onSelect={handleSelect}
          renderItem={renderCard}
        />
      </div>
    </section>
  );
};

export default RecentDesigns;
