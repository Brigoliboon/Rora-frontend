'use client';

import React, { useState } from 'react';
import { Bell, X, Sparkles, Users, Zap } from 'lucide-react';

interface Update {
  id: string;
  type: 'preset' | 'feature' | 'community';
  title: string;
  description: string;
  date: string;
}

const updates: Update[] = [
  {
    id: '1',
    type: 'preset',
    title: 'New Summer Collection',
    description: '12 new dress patterns added to community presets',
    date: '2 days ago',
  },
  {
    id: '2',
    type: 'feature',
    title: 'AI Pattern Generation',
    description: 'Describe your design and let AI create the pattern',
    date: '1 week ago',
  },
  {
    id: '3',
    type: 'community',
    title: 'Community Spotlight',
    description: 'Check out trending designs from top creators',
    date: '3 days ago',
  },
];

const PlatformUpdates: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);

  const handleDismiss = (id: string) => {
    setDismissedIds([...dismissedIds, id]);
  };

  const visibleUpdates = updates.filter(u => !dismissedIds.includes(u.id));

  if (!isVisible || visibleUpdates.length === 0) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'preset':
        return <Sparkles className="w-4 h-4 text-teal-400" />;
      case 'feature':
        return <Zap className="w-4 h-4 text-amber-400" />;
      case 'community':
        return <Users className="w-4 h-4 text-purple-400" />;
      default:
        return <Bell className="w-4 h-4 text-teal-400" />;
    }
  };

  return (
    <section className="bg-[var(--background-secondary)] rounded-2xl border border-[rgba(148,163,184,0.1)] p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Bell className="w-5 h-5 text-teal-400" />
          What's New
        </h2>
        <button 
          onClick={() => setIsVisible(false)}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--foreground-muted)] hover:text-white hover:bg-[rgba(148,163,184,0.1)] transition-all duration-300"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3">
        {visibleUpdates.map((update) => (
          <div
            key={update.id}
            className="group p-3 rounded-xl bg-[var(--background-tertiary)] border border-[rgba(148,163,184,0.1)] hover:border-[rgba(20,184,166,0.2)] transition-all duration-300"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[rgba(148,163,184,0.1)] flex items-center justify-center flex-shrink-0">
                {getIcon(update.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-medium text-white">{update.title}</h3>
                  <button 
                    onClick={() => handleDismiss(update.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[var(--foreground-muted)] hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-xs text-[var(--foreground-muted)] mb-1">{update.description}</p>
                <p className="text-xs text-teal-400">{update.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlatformUpdates;
