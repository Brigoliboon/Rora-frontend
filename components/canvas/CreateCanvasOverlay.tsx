'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { 
  X, 
  Plus, 
  Check, 
  User,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamic import for ThreeDCanvas to avoid SSR issues
const ThreeDCanvas = dynamic(() => import('@/components/sections/ThreeDCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-teal-500/30 border-t-teal-500 rounded-full animate-spin" />
    </div>
  )
});


interface Model {
  id: string;
  name: string;
  type: 'default' | 'custom';
  thumbnail?: string;
  measurements?: Record<string, number>;
}

interface CreateCanvasOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  models?: Model[];
}

// Default models
const defaultModels: Model[] = [
  {
    id: 'default-female',
    name: 'Standard Female',
    type: 'default',
    thumbnail: '/samples/mannequin/mean_all.obj',
  },
  {
    id: 'default-male',
    name: 'Standard Male',
    type: 'default',
    thumbnail: '/samples/mannequin/mean_all.obj',
  },
];

const CreateCanvasOverlay: React.FC<CreateCanvasOverlayProps> = ({ 
  isOpen, 
  onClose,
  models = []
}) => {
  const router = useRouter();
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [allModels, setAllModels] = useState<Model[]>([]);

  // Combine default and custom models
  useEffect(() => {
    setAllModels([...defaultModels, ...models]);
  }, [models]);

  // Reset selection when overlay opens
  useEffect(() => {
    if (isOpen) {
      setSelectedModel(null);
      setIsCreating(false);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'Enter' && selectedModel) {
        handleCreate();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedModel, onClose]);

  const handleModelSelect = (modelId: string) => {
    setSelectedModel(modelId);
  };

  const handleCreate = async () => {
    if (!selectedModel) return;
    
    setIsCreating(true);
    // Simulate brief loading for better UX
    await new Promise(resolve => setTimeout(resolve, 300));
    router.push(`/canvas/new?model=${selectedModel}`);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={handleBackdropClick}
    >
      {/* Aurora Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-xl">
        {/* Animated Aurora gradients */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-20 animate-pulse"
            style={{
              background: 'radial-gradient(circle, rgba(20, 184, 166, 0.4) 0%, transparent 70%)',
              filter: 'blur(80px)',
              animation: 'float 8s ease-in-out infinite'
            }}
          />
          <div 
            className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-15 animate-pulse"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
              filter: 'blur(80px)',
              animation: 'float 10s ease-in-out infinite reverse'
            }}
          />
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-10"
            style={{
              background: 'radial-gradient(ellipse, rgba(6, 182, 212, 0.3) 0%, transparent 60%)',
              filter: 'blur(60px)'
            }}
          />
        </div>
      </div>

      {/* Modal */}
      <div 
        className="relative w-full max-w-4xl max-h-[85vh] bg-[#0a0f1a]/95 rounded-3xl border border-[rgba(148,163,184,0.15)] shadow-2xl overflow-hidden flex flex-col animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-[rgba(148,163,184,0.1)]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-teal-500/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white tracking-tight">
                Create New Canvas
              </h2>
              <p className="text-sm text-[var(--foreground-muted)] mt-0.5">
                Select a mannequin model to begin designing
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2.5 rounded-xl hover:bg-[rgba(148,163,184,0.1)] transition-all duration-300 group"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-[var(--foreground-muted)] group-hover:text-white transition-colors" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* Section Title */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-[var(--foreground-muted)] uppercase tracking-wider">
              Choose Your Model
            </h3>
          </div>

          {/* Model Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allModels.map((model) => (
              <button
                key={model.id}
                onClick={() => handleModelSelect(model.id)}
                className={`
                  group relative flex flex-col items-center p-5 rounded-2xl border-2 transition-all duration-500
                  ${selectedModel === model.id
                    ? 'border-teal-500/50 bg-gradient-to-b from-teal-500/10 to-cyan-500/5 shadow-[0_0_30px_rgba(20,184,166,0.15)]'
                    : 'border-[rgba(148,163,184,0.1)] bg-[rgba(148,163,184,0.03)] hover:border-[rgba(20,184,166,0.3)] hover:bg-[rgba(20,184,166,0.05)] hover:shadow-[0_0_20px_rgba(20,184,166,0.1)]'
                  }
                `}
              >
                {/* Selection Indicator */}
                <div className={`
                  absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300
                  ${selectedModel === model.id
                    ? 'bg-teal-500 scale-100'
                    : 'bg-[rgba(148,163,184,0.2)] scale-0 group-hover:scale-100'
                  }
                `}>
                  <Check className={`w-3.5 h-3.5 text-white transition-transform duration-300 ${selectedModel === model.id ? 'scale-100' : 'scale-0'}`} />
                </div>

                {/* Model Preview with ThreeDCanvas */}
                <div className={`
                  relative w-24 h-32 mb-4 rounded-xl overflow-hidden transition-all duration-500
                  ${selectedModel === model.id ? 'shadow-lg shadow-teal-500/20' : 'shadow-md'}
                `}>
                  {/* 3D Canvas for model preview */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#1e293b] to-[#0f172a]">
                    <div className="w-full h-full" style={{ minHeight: '128px' }}>
                      <ThreeDCanvas model={model.thumbnail || '/samples/mannequin/mean_all.obj'} />
                    </div>
                  </div>
                  
                  {/* Aurora glow effect on selection */}
                  {selectedModel === model.id && (
                    <div className="absolute inset-0 bg-gradient-to-t from-teal-500/20 to-transparent pointer-events-none" />
                  )}
                </div>


                {/* Model Info */}
                <div className="text-center">
                  <h4 className="text-sm font-medium text-white mb-1 group-hover:text-teal-100 transition-colors">
                    {model.name}
                  </h4>
                  <span className={`
                    inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors
                    ${model.type === 'default'
                      ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                    }
                  `}>
                    {model.type === 'default' ? 'Default' : 'Custom'}
                  </span>
                </div>

                {/* Hover glow */}
                <div className={`
                  absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none
                  ${selectedModel === model.id ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}
                `}
                style={{
                  background: 'radial-gradient(circle at center, rgba(20, 184, 166, 0.08) 0%, transparent 70%)'
                }}
                />
              </button>
            ))}

            {/* Add New Model Card */}
            <button
              onClick={() => {
                onClose();
                // Trigger mannequin editor - this would need to be passed as a prop or use context
                window.dispatchEvent(new CustomEvent('openMannequinEditor'));
              }}
              className="group relative flex flex-col items-center justify-center p-5 rounded-2xl border-2 border-dashed border-[rgba(148,163,184,0.2)] bg-[rgba(148,163,184,0.02)] hover:border-[rgba(20,184,166,0.4)] hover:bg-[rgba(20,184,166,0.05)] transition-all duration-500 min-h-[200px]"
            >
              <div className="w-14 h-14 rounded-2xl bg-[rgba(148,163,184,0.1)] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                <Plus className="w-6 h-6 text-[var(--foreground-muted)] group-hover:text-teal-400 transition-colors" />
              </div>
              <span className="text-sm font-medium text-[var(--foreground-muted)] group-hover:text-teal-300 transition-colors">
                Create Model
              </span>
            </button>
          </div>

          {/* Help Text */}
          <div className="mt-8 p-4 rounded-xl bg-[rgba(20,184,166,0.05)] border border-[rgba(20,184,166,0.1)]">
            <p className="text-sm text-[var(--foreground-muted)] text-center">
              <span className="text-teal-400 font-medium">Tip:</span> You can customize measurements later in the editor. 
              Select a model that closest matches your target body type.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-8 py-5 border-t border-[rgba(148,163,184,0.1)] bg-[rgba(148,163,184,0.02)]">
          <div className="text-xs text-[var(--foreground-muted)]">
            {selectedModel 
              ? `Selected: ${allModels.find(m => m.id === selectedModel)?.name}`
              : 'Select a model to continue'
            }
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-[var(--foreground-muted)] hover:text-white hover:bg-[rgba(148,163,184,0.1)] transition-all duration-300"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              disabled={!selectedModel || isCreating}
              className={`
                flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-300
                ${selectedModel && !isCreating
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-105'
                  : 'bg-[rgba(148,163,184,0.2)] cursor-not-allowed opacity-50'
                }
              `}
            >
              {isCreating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  Create Canvas
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -20px); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
};

export default CreateCanvasOverlay;
