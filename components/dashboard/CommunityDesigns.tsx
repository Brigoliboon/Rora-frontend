'use client';

import React from 'react';
import { Users, Heart, Eye, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CommunityDesign {
  id: string;
  title: string;
  designer: string;
  imageUrl: string;
  likes: number;
  views: number;
  category: string;
}

const communityDesigns: CommunityDesign[] = [
  {
    id: '1',
    title: 'Summer Breeze Dress',
    designer: 'Maria Chen',
    imageUrl: '/samples/pencil_skirt/dress_pencil_texture.png',
    likes: 234,
    views: 1205,
    category: 'Dress',
  },
  {
    id: '2',
    title: 'Urban Streetwear Tee',
    designer: 'Alex Kim',
    imageUrl: '/t_shirt_pattern.svg',
    likes: 189,
    views: 892,
    category: 'T-Shirt',
  },
  {
    id: '3',
    title: 'Business Casual Shirt',
    designer: 'Sarah Johnson',
    imageUrl: '/shirt_mean_pattern.svg',
    likes: 156,
    views: 743,
    category: 'Shirt',
  },
  {
    id: '4',
    title: 'Evening Gown',
    designer: 'Elena Rossi',
    imageUrl: '/dress_pencil_pattern.svg',
    likes: 312,
    views: 1567,
    category: 'Dress',
  },
  {
    id: '5',
    title: 'Minimalist Blazer',
    designer: 'James Wilson',
    imageUrl: '/shirt_mean_pattern.svg',
    likes: 98,
    views: 445,
    category: 'Outerwear',
  },
  {
    id: '6',
    title: 'Bohemian Skirt',
    designer: 'Luna Park',
    imageUrl: '/samples/pencil_skirt/dress_pencil_texture.png',
    likes: 267,
    views: 1089,
    category: 'Skirt',
  },
  {
    id: '7',
    title: 'Athletic Wear Set',
    designer: 'Mike Chen',
    imageUrl: '/t_shirt_pattern.svg',
    likes: 145,
    views: 678,
    category: 'Activewear',
  },
  {
    id: '8',
    title: 'Vintage Jacket',
    designer: 'Emma Davis',
    imageUrl: '/shirt_mean_pattern.svg',
    likes: 203,
    views: 934,
    category: 'Outerwear',
  },
];

const CommunityDesigns: React.FC = () => {
  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-teal-400" />
          Community Designs
        </h2>
        <Link 
          href="/canvas/community"
          className="text-sm text-teal-400 hover:text-cyan-400 transition-colors flex items-center gap-1"
        >
          View all
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {communityDesigns.map((design) => (
          <Link
            key={design.id}
            href={`/canvas/community/${design.id}`}
            className="group relative rounded-xl overflow-hidden bg-[var(--background-secondary)] border border-[rgba(148,163,184,0.1)] hover:border-[rgba(20,184,166,0.3)] transition-all duration-300"
          >
            {/* Image Container */}
            <div className="relative aspect-[3/4] overflow-hidden bg-[var(--background-tertiary)]">
              <Image
                src={design.imageUrl}
                alt={design.title}
                fill
                className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="flex items-center justify-between text-white text-xs">
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3 text-pink-400" />
                      {design.likes}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3 text-cyan-400" />
                      {design.views}
                    </div>
                  </div>
                </div>
              </div>

              {/* Category Badge */}
              <div className="absolute top-2 left-2">
                <span className="px-2 py-1 text-xs rounded-full bg-black/50 text-white backdrop-blur-sm border border-white/10">
                  {design.category}
                </span>
              </div>
            </div>

            {/* Info Section */}
            <div className="p-3">
              <h3 className="text-sm font-medium text-white truncate group-hover:aurora-gradient-text transition-all duration-300">
                {design.title}
              </h3>
              <p className="text-xs text-[var(--foreground-muted)] mt-1">
                by {design.designer}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CommunityDesigns;
