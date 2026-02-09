'use client';

import React, { useState } from 'react';
import { Clock, MoreVertical, Play, Copy, Trash2, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Design {
  id: string;
  title: string;
  imageUrl: string;
  status: 'draft' | 'final';
  timestamp: string;
  type: string;
}

const recentDesigns: Design[] = [
  {
    id: '1',
    title: 'Summer Evening Dress',
    imageUrl: '/samples/pencil_skirt/dress_pencil_texture.png',
    status: 'draft',
    timestamp: '2 hours ago',
    type: 'Dress',
  },
  {
    id: '2',
    title: 'Business Casual Shirt',
    imageUrl: '/shirt_mean_pattern.svg',
    status: 'final',
    timestamp: '5 hours ago',
    type: 'Shirt',
  },
  {
    id: '3',
    title: 'A-Line Skirt',
    imageUrl: '/dress_pencil_pattern.svg',
    status: 'draft',
    timestamp: '1 day ago',
    type: 'Skirt',
  },
  {
    id: '4',
    title: 'Formal Trousers',
    imageUrl: '/t_shirt_pattern.svg',
    status: 'final',
    timestamp: '2 days ago',
    type: 'Pants',
  },
  {
    id: '5',
    title: 'Casual Blouse',
    imageUrl: '/model_outline.svg',
    status: 'draft',
    timestamp: '3 days ago',
    type: 'Blouse',
  },
];

const RecentDesigns: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-teal-500/20 to-cyan-500/20 flex items-center justify-center">
            <Clock className="w-5 h-5 text-teal-400" />
          </div>
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

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {recentDesigns.map((design) => (
          <div
            key={design.id}
            className="group relative"
            onMouseEnter={() => setHoveredId(design.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[var(--background-secondary)] border border-[rgba(148,163,184,0.1)] transition-all duration-500 group-hover:border-[rgba(20,184,166,0.3)] group-hover:shadow-[0_0_30px_rgba(20,184,166,0.1)]">
              {/* Image */}
              <div className="absolute inset-0 p-4">
                <div className="w-full h-full relative rounded-xl overflow-hidden bg-[var(--background-tertiary)]">
                  <Image
                    src={design.imageUrl}
                    alt={design.title}
                    fill
                    className="object-contain p-2 transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Status Badge */}
              <div className="absolute top-3 left-3">
                <span className={`
                  px-2 py-1 text-xs font-medium rounded-full
                  ${design.status === 'final' 
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' 
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }
                `}>
                  {design.status === 'final' ? 'Final' : 'Draft'}
                </span>
              </div>

              {/* More options button */}
              <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[rgba(0,0,0,0.5)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[rgba(0,0,0,0.7)]">
                <MoreVertical className="w-4 h-4 text-white" />
              </button>

              {/* Hover Overlay with Actions */}
              <div className={`
                absolute inset-0 bg-gradient-to-t from-[rgba(10,15,26,0.95)] via-[rgba(10,15,26,0.5)] to-transparent
                flex flex-col justify-end p-4 transition-all duration-500
                ${hoveredId === design.id ? 'opacity-100' : 'opacity-0'}
              `}>
                <div className="space-y-3">
                  {/* Title */}
                  <div>
                    <p className="text-xs text-teal-400 font-medium mb-1">{design.type}</p>
                    <h3 className="text-white font-semibold text-sm line-clamp-2">{design.title}</h3>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Link
                      href={`/canvas/${design.id}`}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/25"
                    >
                      <Play className="w-4 h-4" />
                      Continue
                    </Link>
                    <button className="w-10 h-10 rounded-xl bg-[rgba(148,163,184,0.2)] flex items-center justify-center text-white hover:bg-[rgba(148,163,184,0.3)] transition-all duration-300">
                      <Copy className="w-4 h-4" />
                    </button>
                    <button className="w-10 h-10 rounded-xl bg-[rgba(148,163,184,0.2)] flex items-center justify-center text-white hover:bg-red-500/20 hover:text-red-400 transition-all duration-300">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Timestamp - shown when not hovered */}
              <div className={`
                absolute bottom-3 left-3 right-3 flex items-center gap-1 text-xs text-[var(--foreground-muted)]
                transition-all duration-300
                ${hoveredId === design.id ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}
              `}>
                <Clock className="w-3 h-3" />
                {design.timestamp}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentDesigns;
