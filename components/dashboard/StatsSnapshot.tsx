'use client';

import React from 'react';
import { Layers, FileText, CheckCircle2, Globe, TrendingUp } from 'lucide-react';

interface Stat {
  label: string;
  value: number;
  icon: React.ElementType;
  gradientFrom: string;
  gradientTo: string;
  change?: string;
}

const stats: Stat[] = [
  {
    label: 'Total Designs',
    value: 24,
    icon: Layers,
    gradientFrom: 'from-teal-500',
    gradientTo: 'to-cyan-500',
    change: '+3 this week',
  },
  {
    label: 'Drafts',
    value: 8,
    icon: FileText,
    gradientFrom: 'from-cyan-500',
    gradientTo: 'to-blue-500',
    change: '2 pending',
  },
  {
    label: 'Finalized',
    value: 16,
    icon: CheckCircle2,
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-purple-500',
    change: '67% completion',
  },
  {
    label: 'Community Presets',
    value: 12,
    icon: Globe,
    gradientFrom: 'from-purple-500',
    gradientTo: 'to-pink-500',
    change: '4 new',
  },
];

const StatsSnapshot: React.FC = () => {
  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-teal-400" />
          Stats Snapshot
        </h2>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const gradientClass = `bg-gradient-to-r ${stat.gradientFrom} ${stat.gradientTo}`;
          
          return (
            <div
              key={stat.label}
              className="group p-4 rounded-xl bg-[var(--background-secondary)] border border-[rgba(148,163,184,0.1)] hover:border-[rgba(20,184,166,0.2)] transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${gradientClass}`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold text-white block">{stat.value}</span>
                  <span className="text-xs text-[var(--foreground-muted)]">{stat.label}</span>
                </div>
              </div>
              
              {stat.change && (
                <div className="flex items-center gap-1 text-xs text-teal-400">
                  <TrendingUp className="w-3 h-3" />
                  {stat.change}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default StatsSnapshot;
