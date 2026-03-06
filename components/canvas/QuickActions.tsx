'use client';

import React from 'react';
import { Plus, Clock, Star } from 'lucide-react';
import Link from 'next/link';

interface QuickAction {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  href?: string;
  onClick?: () => void;
  auroraGradient: string;
}

interface QuickActionsProps {
  onCreateCanvas?: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onCreateCanvas }) => {
  const quickActions: QuickAction[] = [
    {
      id: 'new',
      label: 'New Garment',
      description: 'Start from scratch',
      icon: Plus,
      onClick: onCreateCanvas,
      auroraGradient: 'from-teal-500 to-cyan-500',
    },
    {
      id: 'recents',
      label: 'Recents',
      description: 'Continue editing',
      icon: Clock,
      href: '/canvas/my-designs',
      auroraGradient: 'from-violet-500 to-purple-500',
    },
    {
      id: 'favorites',
      label: 'Favorites',
      description: 'saved designs',
      icon: Star,
      href: '/canvas/favorites',
      auroraGradient: 'from-amber-400 to-orange-500',
    },
  ];

  return (
    <section className="py-6">
      <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {quickActions.map((action) => {
          const Icon = action.icon;

          const content = (
            <div className={`
              relative flex items-center gap-4 px-6 py-4 rounded-2xl
              bg-[var(--background-secondary)] border border-[rgba(148,163,184,0.1)]
              transition-all duration-500 overflow-hidden
              hover:border-[rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.1)]
              group-hover:transform group-hover:scale-105
            `}>
              {/* Aurora gradient background on hover */}
              <div className={`
                absolute inset-0 bg-gradient-to-r ${action.auroraGradient} opacity-0 
                transition-opacity duration-500 group-hover:opacity-5
              `} />

              {/* Icon container */}
              <div className={`
                relative w-12 h-12 rounded-xl flex items-center justify-center
                bg-gradient-to-r ${action.auroraGradient} bg-opacity-10
                border border-[rgba(255,255,255,0.1)]
                transition-all duration-300 group-hover:scale-110
                shadow-lg
              `}>
                <Icon className={"w-5 h-5 text-white"} />
              </div>

              {/* Text content */}
              <div className="relative">
                <h3 className="text-white font-semibold text-sm">{action.label}</h3>
                <p className="text-[var(--foreground-muted)] text-xs">{action.description}</p>
              </div>

              {/* Arrow indicator */}
              <div className="relative ml-2 w-6 h-6 rounded-full bg-[rgba(148,163,184,0.1)] 
                            flex items-center justify-center opacity-0 group-hover:opacity-100 
                            transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                <Plus className="w-3 h-3 text-teal-400 rotate-45" />
              </div>
            </div>
          );

          if (action.onClick) {
            return (
              <button
                key={action.id}
                onClick={action.onClick}
                className="group flex-shrink-0 text-left"
              >
                {content}
              </button>
            );
          }

          return (
            <Link
              key={action.id}
              href={action.href!}
              className="group flex-shrink-0"
            >
              {content}
            </Link>
          );
        })}


      </div>
    </section>
  );
};

export default QuickActions;
