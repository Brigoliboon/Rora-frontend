'use client';

import React, { useState } from 'react';
import { 
  User, 
  Plus, 
  Edit2, 
  Copy, 
  Trash2, 
  Check,
  Clock,
  MoreVertical
} from 'lucide-react';
import Link from 'next/link';

interface MannequinModel {
  id: string;
  name: string;
  isDefault: boolean;
  lastModified?: string;
  thumbnail?: string;
  measurements: {
    height: number;
    bust: number;
    waist: number;
    hips: number;
  };
}

const defaultModels: MannequinModel[] = [
  {
    id: 'default-female',
    name: 'Standard Female',
    isDefault: true,
    measurements: { height: 168, bust: 88, waist: 70, hips: 96 }
  },
  {
    id: 'default-male',
    name: 'Standard Male',
    isDefault: true,
    measurements: { height: 178, bust: 96, waist: 82, hips: 94 }
  }
];

const customModels: MannequinModel[] = [
  {
    id: 'custom-1',
    name: 'My Measurements',
    isDefault: false,
    lastModified: '2 days ago',
    measurements: { height: 165, bust: 86, waist: 68, hips: 92 }
  }
];

interface ModelsViewProps {
  onCreateNew: () => void;
  onEditModel: (model: MannequinModel) => void;
  onSelectModel: (model: MannequinModel) => void;
}

const ModelsView: React.FC<ModelsViewProps> = ({ 
  onCreateNew, 
  onEditModel,
  onSelectModel 
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showActionsFor, setShowActionsFor] = useState<string | null>(null);

  const handleSelect = (model: MannequinModel) => {
    setSelectedId(model.id);
    onSelectModel(model);
  };

  const ModelCard: React.FC<{ model: MannequinModel }> = ({ model }) => {
    const isSelected = selectedId === model.id;
    const showActions = showActionsFor === model.id;

    return (
      <div 
        className={`
          group relative rounded-2xl border-2 transition-all duration-300 overflow-hidden
          ${isSelected 
            ? 'border-teal-500 bg-teal-500/10' 
            : 'border-[rgba(148,163,184,0.2)] bg-[rgba(148,163,184,0.05)] hover:border-[rgba(148,163,184,0.3)]'
          }
        `}
      >
        {/* Thumbnail Area */}
        <div className="aspect-[3/4] relative bg-gradient-to-b from-[rgba(148,163,184,0.1)] to-[rgba(148,163,184,0.05)] flex items-center justify-center">
          {/* 3D Preview Placeholder */}
          <div className="relative">
            <div className={`
              w-24 h-32 rounded-full border-2 flex items-center justify-center transition-all duration-300
              ${isSelected 
                ? 'border-teal-500/50 bg-teal-500/10' 
                : 'border-[rgba(148,163,184,0.3)] bg-[rgba(148,163,184,0.1)]'
              }
            `}>
              <User className={`
                w-12 h-12 transition-colors
                ${isSelected ? 'text-teal-400' : 'text-[rgba(148,163,184,0.5)]'}
              `} />
            </div>
            
            {/* Selection indicator */}
            {isSelected && (
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </div>

          {/* Hover overlay with quick actions */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(model);
              }}
              className="px-4 py-2 rounded-lg bg-teal-500 text-white text-sm font-medium hover:bg-teal-600 transition-colors"
            >
              Select
            </button>
          </div>
        </div>

        {/* Info Area */}
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white mb-1">{model.name}</h3>
              <div className="flex items-center gap-2">
                <span className={`
                  px-2 py-0.5 rounded text-xs font-medium
                  ${model.isDefault 
                    ? 'bg-blue-500/20 text-blue-400' 
                    : 'bg-purple-500/20 text-purple-400'
                  }
                `}>
                  {model.isDefault ? 'Default' : 'Custom'}
                </span>
                {model.lastModified && (
                  <span className="flex items-center gap-1 text-xs text-[var(--foreground-muted)]">
                    <Clock className="w-3 h-3" />
                    {model.lastModified}
                  </span>
                )}
              </div>
            </div>
            
            {/* Actions menu */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowActionsFor(showActionsFor === model.id ? null : model.id);
                }}
                className="p-1.5 rounded-lg hover:bg-[rgba(148,163,184,0.2)] transition-colors"
              >
                <MoreVertical className="w-4 h-4 text-[var(--foreground-muted)]" />
              </button>
              
              {showActions && (
                <div className="absolute right-0 top-full mt-1 w-40 rounded-xl bg-[#1e293b] border border-[rgba(148,163,184,0.2)] shadow-xl z-20 py-1">
                  {!model.isDefault && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditModel(model);
                        setShowActionsFor(null);
                      }}
                      className="w-full px-3 py-2 flex items-center gap-2 text-sm text-white hover:bg-[rgba(148,163,184,0.1)] transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowActionsFor(null);
                    }}
                    className="w-full px-3 py-2 flex items-center gap-2 text-sm text-white hover:bg-[rgba(148,163,184,0.1)] transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    Duplicate
                  </button>
                  {!model.isDefault && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowActionsFor(null);
                      }}
                      className="w-full px-3 py-2 flex items-center gap-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Quick measurements preview */}
          <div className="mt-3 pt-3 border-t border-[rgba(148,163,184,0.1)] grid grid-cols-2 gap-2 text-xs">
            <div className="text-[var(--foreground-muted)]">
              Height: <span className="text-white">{model.measurements.height}cm</span>
            </div>
            <div className="text-[var(--foreground-muted)]">
              Bust: <span className="text-white">{model.measurements.bust}cm</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">My Models</h2>
          <p className="text-[var(--foreground-muted)]">
            Manage your mannequin models for precise garment fitting
          </p>
        </div>
        <button
          onClick={onCreateNew}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          Create New Mannequin
        </button>
      </div>

      {/* Default Models */}
      <section>
        <h3 className="text-sm font-semibold text-[var(--foreground-muted)] uppercase tracking-wider mb-4">
          Default Models
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {defaultModels.map(model => (
            <ModelCard key={model.id} model={model} />
          ))}
        </div>
      </section>

      {/* Custom Models */}
      <section>
        <h3 className="text-sm font-semibold text-[var(--foreground-muted)] uppercase tracking-wider mb-4">
          Your Custom Models
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {customModels.map(model => (
            <ModelCard key={model.id} model={model} />
          ))}
          
          {/* Create New Card */}
          <button
            onClick={onCreateNew}
            className="group rounded-2xl border-2 border-dashed border-[rgba(148,163,184,0.3)] hover:border-teal-500/50 bg-[rgba(148,163,184,0.02)] hover:bg-[rgba(20,184,166,0.05)] transition-all duration-300 flex flex-col items-center justify-center gap-4 min-h-[280px]"
          >
            <div className="w-16 h-16 rounded-full border-2 border-[rgba(148,163,184,0.3)] group-hover:border-teal-500/50 flex items-center justify-center transition-colors">
              <Plus className="w-8 h-8 text-[rgba(148,163,184,0.5)] group-hover:text-teal-400 transition-colors" />
            </div>
            <span className="text-sm font-medium text-[var(--foreground-muted)] group-hover:text-teal-400 transition-colors">
              Create New Mannequin
            </span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default ModelsView;
