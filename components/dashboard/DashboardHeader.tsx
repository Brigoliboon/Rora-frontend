'use client';

import React from 'react';
import { Sparkles, ArrowRight, Plus } from 'lucide-react';
import Link from 'next/link';

interface DashboardHeaderProps {
  userName?: string;
  lastDesignName?: string;
  lastDesignId?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  userName = 'Designer',
  lastDesignName = 'Summer Collection',
  lastDesignId = '1'
}) => {
  return (
    <header className="py-8 mb-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        {/* Greeting Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-teal-400">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wider uppercase">Dashboard</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Welcome back, <span className="aurora-gradient-text">{userName}</span>
          </h1>
          <p className="text-[var(--foreground-muted)] text-lg">
            Continue shaping your next garment.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href={`/canvas/${lastDesignId}`}
            className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/25"
          >
            Continue Last Design
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          
          <Link
            href="/canvas/new"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--background-secondary)] border border-[rgba(148,163,184,0.2)] text-white font-medium transition-all duration-300 hover:border-teal-500/30 hover:bg-[rgba(20,184,166,0.05)]"
          >
            <Plus className="w-4 h-4" />
            Create New
          </Link>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
