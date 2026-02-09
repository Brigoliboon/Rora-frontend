'use client';

import React from 'react';
import { Clock, Play, MoreHorizontal, Shirt } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Design {
  id: string;
  title: string;
  imageUrl: string;
  status: 'draft' | 'final';
  lastEdited: string;
  type: string;
}

const activeDesigns: Design[] = [
  {
    id: '1',
    title: 'Oversized Tee',
    imageUrl: '/t_shirt_pattern.svg',
    status: 'draft',
    lastEdited: 'today',
    type: 'T-Shirt',
  },
  {
    id: '2',
    title: 'Summer Dress',
    imageUrl: '/samples/pencil_skirt/dress_pencil_texture.png',
    status: 'draft',
    lastEdited: '2 days ago',
    type: 'Dress',
  },
  {
    id: '3',
    title: 'Business Shirt',
    imageUrl: '/shirt_mean_pattern.svg',
    status: 'final',
    lastEdited: '1 week ago',
    type: 'Shirt',
  },
];

const ActiveDesigns: React.FC = () => {
  return (
    <section className="bg-[var(--background-secondary)] rounded-2xl border border-[rgba(148,163,184,0.1)] overflow-hidden">
      {/* Card Header */}
      <div className="px-6 py-4 border-b border-[rgba(148,163,184,0.1)] bg-gradient-to-r from-[rgba(20,184,166,0.05)] to-transparent">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Shirt className="w-5 h-5 text-teal-400" />
          Active Designs
        </h2>
      </div>

      {/* Designs List */}
      <div className="divide-y divide-[rgba(148,163,184,0.1)]">
        {activeDesigns.map((design) => (
          <div
            key={design.id}
            className="group p-4 hover:bg-[rgba(148,163,184,0.03)] transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              {/* Thumbnail */}
              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[var(--background-tertiary)] flex-shrink-0 border border-[rgba(148,163,184,0.1)]">
                <Image
                  src={design.imageUrl}
                  alt={design.title}
                  fill
                  className="object-contain p-2"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-white font-medium truncate">{design.title}</h3>
                  <span className={`
                    px-2 py-0.5 text-xs rounded-full flex-shrink-0
                    ${design.status === 'final' 
                      ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' 
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }
                  `}>
                    {design.status === 'final' ? 'Final' : 'Draft'}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm text-[var(--foreground-muted)]">
                  <Clock className="w-3 h-3" />
                  Last edited {design.lastEdited}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Link
                  href={`/canvas/${design.id}`}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/25"
                >
                  <Play className="w-3 h-3" />
                  Continue
                </Link>
                <button className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--foreground-muted)] hover:text-white hover:bg-[rgba(148,163,184,0.1)] transition-all duration-300">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Link */}
      <div className="px-6 py-3 border-t border-[rgba(148,163,184,0.1)] bg-[rgba(148,163,184,0.02)]">
        <Link 
          href="/canvas/my-designs"
          className="text-sm text-teal-400 hover:text-cyan-400 transition-colors"
        >
          View all designs →
        </Link>
      </div>
    </section>
  );
};

export default ActiveDesigns;
