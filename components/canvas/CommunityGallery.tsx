'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Sparkles, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { paginate, getPageNumbers, DEFAULT_PAGINATION, PaginatedResponse } from '@/lib/utils/pagination';
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

interface CommunityGalleryProps {
  token: string;
}

export default function CommunityGallery({ token }: CommunityGalleryProps) {
  const [presets, setPresets] = useState<GalleryOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGINATION.page);
  const itemsPerPage = 12;

  useEffect(() => {
    async function loadPresets() {
      try {
        if (!token) return;
        const res = await fetch('/api/presets');
        if (!res.ok) throw new Error('Failed to fetch presets');
        const data = await res.json();

        const mappedPresets = data.map((p: any) => {
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
      } catch (err) {
        console.error('Error loading presets:', err);
      } finally {
        setLoading(false);
      }
    }

    loadPresets();
  }, [token]);

  // Paginate filtered results
  const paginatedData: PaginatedResponse<GalleryOption> = useMemo(() => {
    return paginate(presets, currentPage, itemsPerPage);
  }, [presets, currentPage, itemsPerPage]);

  const pageNumbers = getPageNumbers(currentPage, paginatedData.pagination.totalPages);

  const handlePageChange = (page: number | string) => {
    if (typeof page === 'number') {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderCard = (option: GalleryOption) => (
    <a
      href={`/canvas/edit/${option.garment_id}`}
      className="block relative rounded-xl border border-[rgba(148,163,184,0.1)] bg-[var(--background-secondary)] hover:border-teal-500/30 hover:bg-[var(--background-elevated)] transition-all duration-300 group overflow-hidden"
    >
      {/* Image / Placeholder */}
      <div className={`w-full aspect-[4/5] overflow-hidden relative bg-black/20`}>
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
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Heart className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-semibold text-sm truncate text-white">
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
              className="text-[10px] px-1.5 py-0.5 rounded-md border border-white/10 text-[var(--foreground-muted)] bg-white/5"
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
      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
        </div>
      ) : presets.length === 0 ? (
        <div className="text-center py-20 text-[var(--foreground-muted)]">
          No community designs found.
        </div>
      ) : (
        <>
          {/* Gallery Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {paginatedData.data.map((preset) => (
              <div key={preset.id}>
                {renderCard(preset)}
              </div>
            ))}
          </div>

          {/* Pagination */}
          {paginatedData.pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={!paginatedData.pagination.hasPrev}
                className="p-2 rounded-lg border border-[rgba(148,163,184,0.1)] bg-[var(--background-secondary)] text-white hover:border-teal-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {pageNumbers.map((page: number | string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => handlePageChange(page)}
                    disabled={typeof page !== 'number'}
                    className={`
                      min-w-[40px] h-10 px-3 rounded-lg text-sm font-medium transition-all
                      ${page === currentPage
                        ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white'
                        : typeof page === 'number'
                          ? 'border border-[rgba(148,163,184,0.1)] bg-[var(--background-secondary)] text-white hover:border-teal-500/30'
                          : 'text-[var(--foreground-muted)] cursor-default'
                      }
                    `}
                  >
                    {page}
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!paginatedData.pagination.hasNext}
                className="p-2 rounded-lg border border-[rgba(148,163,184,0.1)] bg-[var(--background-secondary)] text-white hover:border-teal-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
