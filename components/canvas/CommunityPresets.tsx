'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Sparkles, Heart } from 'lucide-react';
import Link from 'next/link';
import HorizontalGallery from '../ui/HorizontalGallery';
import { useEffect } from 'react';
import { useAuth } from '../AuthProvider';

interface GalleryOption {
  id: string;
  garment_id: string;
  displayName: string;
  originalName: string | null | undefined;
  image?: string;
  tags?: string[];
  likes?: number;
}

interface CommunityPresetsProps {
  token: string;
}

export default function CommunityPresets({ token }: CommunityPresetsProps) {
  const [presets, setPresets] = useState<GalleryOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    async function loadPresets() {
      try {
        if (!token) return;
        const res = await fetch('/api/presets');
        console.log(res.headers)
        if (!res.ok) throw new Error('Failed to fetch presets');
        const data = await res.json();

        console.log(data);
        const mappedPresets = data.map((p: any) => {
          // Find an image file (png or svg) in the files list
          const imageFile = p.files?.find((f: any) =>
            f.object_path?.endsWith('.png') ||
            f.object_path?.endsWith('.svg') ||
            f.object_path?.endsWith('.jpg')
          );

          const imageUrl = imageFile
            ? `/api/file?batch=${p.garment_batch_id}&filename=${'preview_front.png'}&bucket=garments`
            : undefined;

          return {
            id: p.id,
            garment_id: p.garment_batch_id,
            displayName: p.name,
            originalName: p.name,
            tags: p.description ? [p.description] : [],
            likes: 0,
            image: imageUrl
          };
        });

        setPresets(mappedPresets);
        if (mappedPresets.length > 0) setSelectedId(mappedPresets[0].id);
      } catch (err) {
        console.error('Error loading presets:', err);
      } finally {
        setLoading(false);
      }
    }

    loadPresets();
  }, []);


  const handleSelect = (option: GalleryOption) => {
    setSelectedId(option.id);
    // Navigation is handled by Link wrapper in renderCard
  };
  const renderCard = (option: GalleryOption, isSelected: boolean) => (
    
    <a
      href={`/canvas/edit/${option.garment_id}`}
      className={`block relative w-48 p-3 rounded-xl border transition-all duration-300 group overflow-hidden ${isSelected
        ? 'border-teal-500/50 bg-gradient-to-b from-teal-500/10 to-teal-900/20 shadow-[0_0_20px_-5px_var(--color-teal-500)]'
        : 'border-[var(--border-primary)] bg-[var(--background-secondary)] hover:border-teal-500/30 hover:bg-[var(--background-elevated)]'
        }`}
    >
      {/* Image / Placeholder */}
      <div className={`w-full aspect-[4/5] rounded-lg mb-3 overflow-hidden relative ${isSelected ? 'bg-teal-900/20' : 'bg-black/20'
        }`}>
        {option.image ? (
          <img
            src={option.image}
            alt={option.displayName}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center flex-col gap-2 text-[var(--foreground-muted)] group-hover:text-teal-400 transition-colors">
            <div className="p-3 rounded-full bg-white/5 group-hover:bg-teal-500/10 transition-colors">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>
        )}

        {/* Like Button Overlay */}
        <button
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-red-400 hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
          onClick={(e) => {
            e.preventDefault(); // Prevent navigation
            e.stopPropagation();
            // Handle like logic here
          }}
        >
          <Heart className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h4 className={`font-semibold text-sm truncate ${isSelected ? 'text-teal-100' : 'text-white'}`}>
            {option.displayName}
          </h4>
          <div className="flex items-center gap-1 text-[10px] text-[var(--foreground-muted)] bg-white/5 px-1.5 py-0.5 rounded-full">
            <Heart className="w-3 h-3 fill-white/10" />
            <span>{option.likes || 0}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {option.tags?.slice(0, 2).map((tag, idx) => (
            <span
              key={idx}
              className={`text-[10px] px-1.5 py-0.5 rounded-md border ${isSelected
                ? 'border-teal-500/30 text-teal-200 bg-teal-500/10'
                : 'border-white/10 text-[var(--foreground-muted)] bg-white/5'
                }`}
            >
              {tag}
            </span>
          ))}
          {(option.tags?.length || 0) > 2 && (
            <span className="text-[10px] text-[var(--foreground-muted)] px-1">+{(option.tags?.length || 0) - 2}</span>
          )}
        </div>
      </div>
    </a>
  );

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-teal-400" />
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Community Presets</h2>
            <p className="text-[var(--foreground-muted)] text-sm">Choose from community-contributed garment patterns</p>
          </div>
        </div>
        <Link
          href="/canvas/community"
          className="text-sm text-teal-400 hover:text-cyan-400 transition-colors flex items-center gap-1"
        >
          View all <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
          </div>
        ) : presets.length === 0 ? (
          <div className="text-center py-12 text-[var(--foreground-muted)]">
            No community presets found.
          </div>
        ) : (
          <>
            <HorizontalGallery
              options={presets}
              onSelect={handleSelect}
              renderItem={renderCard}
              selectedId={selectedId}
            />
          </>
        )}
      </div>
    </section>
  );
};

