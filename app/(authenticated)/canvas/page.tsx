'use client';

import React, { useState } from 'react';
import CanvasSidebar from '@/components/canvas/CanvasSidebar';
import CanvasHeader from '@/components/canvas/CanvasHeader';
import QuickActions from '@/components/canvas/QuickActions';
import CommunityPresets from '@/components/canvas/CommunityPresets';
import RecentDesigns from '@/components/canvas/RecentDesigns';

import ModelsView from '@/components/canvas/ModelsView';
import MannequinEditor, { BodyMeasurements } from '@/components/canvas/MannequinEditor';
import CreateCanvasOverlay from '@/components/canvas/CreateCanvasOverlay';
import { useAuth } from '@/components/AuthProvider';


export default function Page() {
  const { token } = useAuth();
  const [activeCategory, setActiveCategory] = useState('for-you');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isCreateOverlayOpen, setIsCreateOverlayOpen] = useState(false);
  const [editingModel, setEditingModel] = useState<{ name: string; gender: 'woman' | 'man'; measurements: BodyMeasurements } | undefined>(undefined);

  const handleCreateNew = () => {
    setEditingModel(undefined);
    setIsEditorOpen(true);
  };

  const handleOpenCreateCanvas = () => {
    setIsCreateOverlayOpen(true);
  };


  const handleEditModel = (model: any) => {
    setEditingModel({
      name: model.name,
      gender: model.gender || 'woman',
      measurements: model.measurements
    });
    setIsEditorOpen(true);
  };

  const handleSaveModel = (name: string, gender: 'woman' | 'man', measurements: BodyMeasurements) => {
    console.log('Saving model:', { name, gender, measurements });
    // TODO: Implement save functionality
  };

  const handleSelectModel = (model: any) => {
    console.log('Selected model:', model);
    // TODO: Implement model selection for garment design
  };

  if (!token) return;
  return (

    <div className="min-h-screen bg-[var(--background)] aurora-bg">
      {/* Sidebar */}
      <CanvasSidebar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Main Content */}
      <main className="ml-64 min-h-screen">
        <div className="max-w-6xl mx-auto px-8 pb-12">
          {/* Header with Search */}
          <CanvasHeader />

          {/* Quick Actions */}
          <QuickActions onCreateCanvas={handleOpenCreateCanvas} />


          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[rgba(148,163,184,0.2)] to-transparent my-8" />

          {/* Community Presets Section */}
          <CommunityPresets token={token} />


          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[rgba(148,163,184,0.2)] to-transparent my-8" />

          {/* Recent Designs */}
          <RecentDesigns />
        </div>
      </main>

      {/* Models View - Shown when My Models is selected */}
      {activeCategory === 'my-models' && (
        <main className="ml-64 min-h-screen">
          <div className="max-w-6xl mx-auto px-8 py-12">
            <ModelsView
              onCreateNew={handleCreateNew}
              onEditModel={handleEditModel}
              onSelectModel={handleSelectModel}
            />
          </div>
        </main>
      )}

      {/* Create Canvas Overlay */}
      <CreateCanvasOverlay
        isOpen={isCreateOverlayOpen}
        onClose={() => setIsCreateOverlayOpen(false)}
        onCreateModel={handleCreateNew}
      />

      {/* Mannequin Editor Overlay */}
      <MannequinEditor
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onSave={handleSaveModel}
        initialData={editingModel}
        isEditing={!!editingModel}
      />
    </div>
  );
}
