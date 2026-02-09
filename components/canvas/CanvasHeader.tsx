'use client';

import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';

interface CanvasHeaderProps {
  onSearch?: (query: string) => void;
}

const CanvasHeader: React.FC<CanvasHeaderProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <header className="w-full py-8 px-8">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        {/* Title with Aurora Gradient */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Sparkles className="w-6 h-6 text-teal-400 animate-pulse" />
            <span className="text-sm font-medium text-teal-400 tracking-wider uppercase">Canvas Hub</span>
            <Sparkles className="w-6 h-6 text-teal-400 animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold aurora-gradient-text tracking-tight">
            Create a garment
          </h1>
          <p className="text-[var(--foreground-muted)] text-lg max-w-xl mx-auto">
            Design your next piece with precision and creativity
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
          <div className={`
            relative flex items-center transition-all duration-500
            ${isFocused ? 'transform scale-105' : ''}
          `}>
            {/* Glow effect behind search */}
            <div className={`
              absolute inset-0 rounded-2xl transition-opacity duration-500 blur-xl
              ${isFocused ? 'opacity-100 bg-gradient-to-r from-teal-500/20 via-cyan-500/20 to-purple-500/20' : 'opacity-0'}
            `} />
            
            {/* Search input container */}
            <div className={`
              relative w-full flex items-center bg-[var(--background-secondary)] rounded-2xl 
              border transition-all duration-300 overflow-hidden
              ${isFocused 
                ? 'border-teal-500/50 shadow-[0_0_30px_rgba(20,184,166,0.15)]' 
                : 'border-[rgba(148,163,184,0.1)] hover:border-[rgba(148,163,184,0.2)]'
              }
            `}>
              <div className="pl-5">
                <Search className={`
                  w-5 h-5 transition-colors duration-300
                  ${isFocused ? 'text-teal-400' : 'text-[var(--foreground-muted)]'}
                `} />
              </div>
              
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="What would you like to create?"
                className="
                  w-full py-4 px-4 bg-transparent text-white placeholder-[var(--foreground-muted)]
                  focus:outline-none text-lg
                "
              />
              
              {/* Search button */}
              <button
                type="submit"
                className={`
                  mr-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300
                  ${searchQuery 
                    ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg hover:shadow-teal-500/25' 
                    : 'bg-[rgba(148,163,184,0.1)] text-[var(--foreground-muted)] cursor-not-allowed'
                  }
                `}
                disabled={!searchQuery}
              >
                Search
              </button>
            </div>
          </div>
          
          {/* Quick suggestions */}
          <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
            <span className="text-xs text-[var(--foreground-muted)]">Try:</span>
            {['Summer dress', 'Business shirt', 'Casual pants', 'Evening gown'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setSearchQuery(suggestion)}
                className="px-3 py-1 text-xs rounded-full bg-[rgba(148,163,184,0.1)] 
                         text-[var(--foreground-muted)] hover:text-white hover:bg-[rgba(148,163,184,0.2)]
                         transition-all duration-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </form>
      </div>
    </header>
  );
};

export default CanvasHeader;
