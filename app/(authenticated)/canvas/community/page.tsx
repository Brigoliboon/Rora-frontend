'use client';

import React, { useState } from 'react';
import CanvasSidebar from '@/components/canvas/CanvasSidebar';
import CanvasHeader from '@/components/canvas/CanvasHeader';
import CommunityGallery from '@/components/canvas/CommunityGallery';
import { useAuth } from '@/components/AuthProvider';

export default function CommunityPage() {
  const { token } = useAuth();
  const [activeCategory, setActiveCategory] = useState('community');

  if (!token) return;

  return (
    <div className="min-h-screen bg-[var(--background)] aurora-bg">
      {/* Sidebar */}
      <CanvasSidebar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Main Content */}
      <main className="ml-64 min-h-screen">
        <div className="max-w-7xl mx-auto px-8 pb-12">
          {/* Header with Search */}
          <CanvasHeader />

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[rgba(148,163,184,0.2)] to-transparent mb-8" />

          {/* Community Gallery Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Community Designs</h2>
            <p className="text-[var(--foreground-muted)] text-sm">
              Explore designs created by the community
            </p>
          </div>

          <CommunityGallery token={token} />
        </div>
      </main>
    </div>
  );
}
