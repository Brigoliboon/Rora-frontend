'use client';

import React, { useState, useCallback } from 'react';
import { 
  X, 
  Save, 
  RotateCcw, 
  User,
  ChevronDown,
  ChevronRight,
  Ruler
} from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamic import for ThreeDCanvas to avoid SSR issues
const ThreeDCanvas = dynamic(() => import('@/components/sections/ThreeDCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-teal-500/30 border-t-teal-500 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-slate-400">Loading 3D Preview...</p>
      </div>
    </div>
  )
});

// Body measurement structure based on the provided YAML
interface BodyMeasurements {
  // General
  height: number;
  head_l: number;
  
  // Upper Body
  bust: number;
  underbust: number;
  bust_line: number;
  vert_bust_line: number;
  bust_points: number;
  waist_over_bust_line: number;
  back_width: number;
  shoulder_w: number;
  shoulder_incl: number;
  armscye_depth: number;
  neck_w: number;
  
  // Lower Body
  waist: number;
  waist_line: number;
  waist_back_width: number;
  hips: number;
  hips_line: number;
  hip_back_width: number;
  hip_inclination: number;
  bum_points: number;
  crotch_hip_diff: number;
  
  // Arms
  arm_length: number;
  arm_pose_angle: number;
  leg_circ: number;
  wrist: number;
}

const defaultMeasurements: BodyMeasurements = {
  height: 178.873,
  head_l: 27.2653,
  bust: 102.787,
  underbust: 93.0277,
  bust_line: 25.9217,
  vert_bust_line: 21.5796,
  bust_points: 17.8195,
  waist_over_bust_line: 41.6141,
  back_width: 50.7175,
  shoulder_w: 38.5276,
  shoulder_incl: 22.5059,
  armscye_depth: 13.1301,
  neck_w: 20.3361,
  waist: 89.003,
  waist_line: 38.3492,
  waist_back_width: 40.7068,
  hips: 102.85,
  hips_line: 24.4948,
  hip_back_width: 53.9145,
  hip_inclination: 6.7451,
  bum_points: 17.736,
  crotch_hip_diff: 9.92969,
  arm_length: 56.8064,
  arm_pose_angle: 45.4775,
  leg_circ: 59.9882,
  wrist: 17.4648
};

// Convert snake_case to human-friendly labels
const measurementLabels: Record<string, string> = {
  height: 'Height',
  head_l: 'Head Length',
  bust: 'Bust',
  underbust: 'Underbust',
  bust_line: 'Bust Line',
  vert_bust_line: 'Vertical Bust Line',
  bust_points: 'Bust Points',
  waist_over_bust_line: 'Waist Over Bust Line',
  back_width: 'Back Width',
  shoulder_w: 'Shoulder Width',
  shoulder_incl: 'Shoulder Inclination',
  armscye_depth: 'Armscye Depth',
  neck_w: 'Neck Width',
  waist: 'Waist',
  waist_line: 'Waist Line',
  waist_back_width: 'Waist Back Width',
  hips: 'Hips',
  hips_line: 'Hips Line',
  hip_back_width: 'Hip Back Width',
  hip_inclination: 'Hip Inclination',
  bum_points: 'Bum Points',
  crotch_hip_diff: 'Crotch-Hip Difference',
  arm_length: 'Arm Length',
  arm_pose_angle: 'Arm Pose Angle',
  leg_circ: 'Leg Circumference',
  wrist: 'Wrist'
};

// Group measurements by category
const measurementGroups = {
  general: ['height', 'head_l'],
  upperBody: ['bust', 'underbust', 'bust_line', 'vert_bust_line', 'bust_points', 'waist_over_bust_line', 'back_width', 'shoulder_w', 'shoulder_incl', 'armscye_depth', 'neck_w'],
  lowerBody: ['waist', 'waist_line', 'waist_back_width', 'hips', 'hips_line', 'hip_back_width', 'hip_inclination', 'bum_points', 'crotch_hip_diff'],
  arms: ['arm_length', 'arm_pose_angle', 'leg_circ', 'wrist']
};

const groupLabels: Record<string, string> = {
  general: 'General',
  upperBody: 'Upper Body',
  lowerBody: 'Lower Body & Waist',
  arms: 'Arms'
};

interface MannequinEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, measurements: BodyMeasurements) => void;
  initialData?: { name: string; measurements: BodyMeasurements };
  isEditing?: boolean;
}

const MannequinEditor: React.FC<MannequinEditorProps> = ({ 
  isOpen, 
  onClose, 
  onSave,
  initialData,
  isEditing = false
}) => {
  const [modelName, setModelName] = useState(initialData?.name || 'New Mannequin');
  const [measurements, setMeasurements] = useState<BodyMeasurements>(
    initialData?.measurements || defaultMeasurements
  );
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    general: true,
    upperBody: true,
    lowerBody: false,
    arms: false
  });
  const [isSaving, setIsSaving] = useState(false);

  const toggleGroup = (group: string) => {
    setExpandedGroups(prev => ({ ...prev, [group]: !prev[group] }));
  };

  const updateMeasurement = (key: keyof BodyMeasurements, value: number) => {
    setMeasurements(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save delay
    await new Promise(resolve => setTimeout(resolve, 500));
    onSave(modelName, measurements);
    setIsSaving(false);
    onClose();
  };

  const handleReset = () => {
    setMeasurements(defaultMeasurements);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-6xl h-[90vh] bg-[#0a0f1a] rounded-2xl border border-[rgba(148,163,184,0.2)] shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(148,163,184,0.1)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">
                {isEditing ? 'Edit Mannequin' : 'Create Mannequin Model'}
              </h2>
              <p className="text-xs text-[var(--foreground-muted)]">
                Adjust measurements to customize your model
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[var(--foreground-muted)] hover:text-white hover:bg-[rgba(148,163,184,0.1)] transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset to Default
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-[rgba(148,163,184,0.1)] transition-colors"
            >
              <X className="w-5 h-5 text-[var(--foreground-muted)]" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - 3D Preview with ThreeDCanvas */}
          <div className="w-1/2 border-r border-[rgba(148,163,184,0.1)] relative bg-gradient-to-b from-[#0f172a] to-[#0a0f1a]">
            {/* Aurora backdrop effect */}
            <div className="absolute inset-0 opacity-30">
              <div 
                className="absolute inset-0"
                style={{
                  background: `
                    radial-gradient(ellipse 80% 60% at 50% 40%, rgba(20, 184, 166, 0.15) 0%, transparent 60%),
                    radial-gradient(ellipse 60% 40% at 30% 70%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)
                  `
                }}
              />
            </div>
            
            {/* 3D Canvas */}
            <div className="absolute inset-0">
              <ThreeDCanvas model="/samples/mannequin/mean_all.obj" />
            </div>
            
            {/* Quick stats overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-6 text-xs z-10">
              <div className="px-3 py-1.5 rounded-lg bg-[rgba(10,15,26,0.8)] border border-[rgba(148,163,184,0.2)] backdrop-blur-sm">
                <span className="text-[var(--foreground-muted)]">Height: </span>
                <span className="text-teal-400 font-medium">{measurements.height.toFixed(1)}cm</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-[rgba(10,15,26,0.8)] border border-[rgba(148,163,184,0.2)] backdrop-blur-sm">
                <span className="text-[var(--foreground-muted)]">Bust: </span>
                <span className="text-cyan-400 font-medium">{measurements.bust.toFixed(1)}cm</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-[rgba(10,15,26,0.8)] border border-[rgba(148,163,184,0.2)] backdrop-blur-sm">
                <span className="text-[var(--foreground-muted)]">Waist: </span>
                <span className="text-purple-400 font-medium">{measurements.waist.toFixed(1)}cm</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-[rgba(10,15,26,0.8)] border border-[rgba(148,163,184,0.2)] backdrop-blur-sm">
                <span className="text-[var(--foreground-muted)]">Hips: </span>
                <span className="text-pink-400 font-medium">{measurements.hips.toFixed(1)}cm</span>
              </div>
            </div>
          </div>

          {/* Right Panel - Measurements */}
          <div className="w-1/2 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Model Name Input */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Model Name
                </label>
                <input
                  type="text"
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-[rgba(148,163,184,0.1)] border border-[rgba(148,163,184,0.2)] text-white placeholder-[var(--foreground-muted)] focus:border-teal-500/50 focus:outline-none transition-colors"
                  placeholder="Enter model name..."
                />
              </div>

              {/* Measurement Groups */}
              {Object.entries(measurementGroups).map(([groupKey, keys]) => (
                <div key={groupKey} className="border border-[rgba(148,163,184,0.1)] rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleGroup(groupKey)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-[rgba(148,163,184,0.05)] hover:bg-[rgba(148,163,184,0.1)] transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Ruler className="w-4 h-4 text-teal-400" />
                      <span className="text-sm font-medium text-white">
                        {groupLabels[groupKey]}
                      </span>
                      <span className="text-xs text-[var(--foreground-muted)]">
                        ({keys.length} measurements)
                      </span>
                    </div>
                    {expandedGroups[groupKey] ? (
                      <ChevronDown className="w-4 h-4 text-[var(--foreground-muted)]" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-[var(--foreground-muted)]" />
                    )}
                  </button>
                  
                  {expandedGroups[groupKey] && (
                    <div className="p-4 space-y-3">
                      {keys.map((key) => (
                        <div key={key} className="flex items-center justify-between gap-4">
                          <label className="text-sm text-[var(--foreground-muted)] flex-1">
                            {measurementLabels[key]}
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={measurements[key as keyof BodyMeasurements].toFixed(2)}
                              onChange={(e) => updateMeasurement(key as keyof BodyMeasurements, parseFloat(e.target.value))}
                              step="0.1"
                              className="w-24 px-3 py-1.5 rounded-lg bg-[rgba(148,163,184,0.1)] border border-[rgba(148,163,184,0.2)] text-white text-sm text-right focus:border-teal-500/50 focus:outline-none transition-colors"
                            />
                            <span className="text-xs text-[var(--foreground-muted)] w-8">
                              {key.includes('angle') || key.includes('incl') ? '°' : 'cm'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[rgba(148,163,184,0.1)] bg-[rgba(148,163,184,0.02)]">
          <div className="text-xs text-[var(--foreground-muted)]">
            All measurements are in centimeters unless specified
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm text-[var(--foreground-muted)] hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving || !modelName.trim()}
              className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Saving...' : (isEditing ? 'Save Changes' : 'Save Model')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MannequinEditor;
export type { BodyMeasurements };
