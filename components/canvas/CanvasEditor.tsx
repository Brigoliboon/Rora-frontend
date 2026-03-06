'use client';

import React, { useState } from 'react';
import DesignEditorSidebar from '@/components/DesignEditorSidebar';
import Image from 'next/image';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import ThreeDCanvas from '@/components/sections/ThreeDCanvas';
import { Button } from '@/components/ui/Button';
import { PanelLeftClose, PanelRightClose, Settings, Save, Play, FileDown, Ruler } from 'lucide-react';
import MannequinEditor from './MannequinEditor';
import { useCanvas } from '@/hooks/useCanvas';
import { useAuth } from '@/components/AuthProvider';

interface MeasurementData {
    body_type: string;
    measurements: {
        body: Record<string, number>;
    };
}

interface CanvasEditorProps {
    patternURL: string | null;
    modelPath?: string;
    loading?: boolean;
    token?: string | null;
    isMeasurementsEnabled?: boolean;
    is3DEnabled?: boolean;
    isEditable?: boolean;
    measurementData?: MeasurementData | null;
    mannequinData?: any;
    onRender?: () => void;
    onSave?: () => void;
}

export default function CanvasEditor({
    patternURL,
    modelPath,
    loading,
    token,
    isMeasurementsEnabled = true,
    is3DEnabled = true,
    isEditable = true,
    measurementData = null,
    mannequinData,
    onRender,
    onSave,
}: CanvasEditorProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [is3DPaneVisible, setIs3DPaneVisible] = useState(is3DEnabled);
    const [paneRatio, setPaneRatio] = useState(70); // 2D pattern width percentage
    const [isMannequinEditorOpen, setIsMannequinEditorOpen] = useState(false);

    const { savePattern } = useCanvas();
    const { token: authToken } = useAuth();

    const toggle3DPane = () => {
        if (!is3DEnabled) return;
        setIs3DPaneVisible(!is3DPaneVisible);
        setPaneRatio(is3DPaneVisible ? 95 : 70);
    };

    const handleSave = async () => {
        if (!authToken) {
            console.error('No auth token available');
            return;
        }
        
        // Generate a default name based on current timestamp
        const patternName = `Pattern_${new Date().toISOString().slice(0, 10)}`;
        
        try {
            const result = await savePattern(patternName, authToken);
            if (result && result.status === 'success') {
                console.log('Pattern saved successfully:', result);
                // Call the onSave callback if provided
                if (onSave) {
                    onSave();
                }
            }
        } catch (error) {
            console.error('Error saving pattern:', error);
        }
    };

    return (
        <div className="h-screen bg-[#0a0f1a] relative overflow-hidden flex flex-col">
            {/* Aurora Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-10"
                    style={{
                        background: 'radial-gradient(circle, rgba(20, 184, 166, 0.3) 0%, transparent 70%)',
                        filter: 'blur(80px)',
                        animation: 'float 8s ease-in-out infinite'
                    }} />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-8"
                    style={{
                        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
                        filter: 'blur(80px)',
                        animation: 'float 10s ease-in-out infinite reverse'
                    }} />
            </div>

            {/* Top Command Bar - Minimal header */}
            <div className="relative z-20 bg-[#0a0f1a]/80 backdrop-blur-xl border-b border-[rgba(148,163,184,0.1)] flex-shrink-0">
                <div className="flex items-center justify-end px-6 py-3 gap-4">
                    {/* Auto-saved indicator */}
                    <div className="flex items-center gap-2 text-xs text-[var(--foreground-muted)]">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        Auto-saved
                    </div>
                    {/* Export to PDF - stays in header */}
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <FileDown className="w-4 h-4" />
                        Export to PDF
                    </Button>
                </div>
            </div>

            {/* Adaptive Split Workspace */}
            <div className="flex-1 flex overflow-hidden relative">
                {/* Measurement Sidebar */}
                {isMeasurementsEnabled && (
                    <DesignEditorSidebar
                        isOpen={isSidebarOpen}
                        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
                        sessionToken={token || ''}
                        mannequinData={mannequinData}
                    />
                )}

                {/* 2D Garment Pattern - Primary Workspace */}
                <div
                    className="relative transition-all duration-500 ease-out"
                    style={{ width: is3DPaneVisible && is3DEnabled ? `${paneRatio}%` : '100%' }}
                >
                    {/* Canvas Grid Background */}
                    <div
                        className="absolute inset-0 opacity-15"
                        style={{
                            backgroundImage: 'linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)',
                            backgroundSize: '40px 40px'
                        }}
                    />

                    {/* Right Side Controls Panel */}
                    <div className="absolute top-4 right-4 z-30 flex flex-col gap-3">
                        {/* 3D Pane Toggle */}
                        {is3DEnabled && (
                            <button
                                onClick={toggle3DPane}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0a0f1a]/80 backdrop-blur-sm border border-[rgba(148,163,184,0.2)] hover:border-teal-500/40 transition-all duration-300"
                            >
                                {is3DPaneVisible ? <PanelRightClose className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
                                <span className="text-xs text-[var(--foreground-muted)]">
                                    {is3DPaneVisible ? 'Hide 3D' : 'Show 3D'}
                                </span>
                            </button>
                        )}

                        {isMeasurementsEnabled && (
                            <>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                    className="flex items-center gap-2 bg-[#0a0f1a]/80 backdrop-blur-sm"
                                >
                                    <Settings className="w-4 h-4" />
                                    Garment Design
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setIsMannequinEditorOpen(true)}
                                    className="flex items-center gap-2 bg-[#0a0f1a]/80 backdrop-blur-sm"
                                >
                                    <Ruler className="w-4 h-4" />
                                    View Measurements
                                </Button>
                            </>
                        )}
                    </div>

                    {/* Floating Bottom Controls - Centered */}
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex items-center gap-3">
                        <Button variant="glow" size="sm" className="flex items-center gap-2" onClick={onRender}>
                            <Play className="w-4 h-4" />
                            Render Pattern
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={handleSave}>
                            <Save className="w-4 h-4" />
                            Save Pattern
                        </Button>
                    </div>

                    <TransformWrapper
                        initialScale={1}
                        initialPositionX={0}
                        initialPositionY={0}
                        minScale={0.2}
                        maxScale={8}
                        wheel={{ step: 0.1 }}
                        centerOnInit={true}
                    >
                        <TransformComponent
                            wrapperStyle={{ width: '100%', height: '100%' }}
                            contentStyle={{ width: '100%', height: '100%' }}
                        >
                            <div className="w-full h-full flex justify-center relative p-8">
                                {/* Model Outline - subtle reference */}
                                {/* <Image
                                    className="absolute opacity-15 pointer-events-none max-w-[90%] max-h-[90%] object-contain"
                                    src="/model_outline.svg"
                                    width={500}
                                    height={500}
                                    alt="model outline"
                                /> */}

                                {/* 2D Garment Pattern - Primary Focus */}
                                {patternURL && (
                                    <Image
                                        className="z-10 ml-65 mt-22 object-contain object-top drop-shadow-2xl"
                                        src={patternURL}
                                        width={500}
                                        height={500}
                                        alt="2D Garment Pattern"
                                        priority
                                    />
                                )}

                                {loading && (
                                    <div className="absolute z-11 inset-0 flex items-center justify-center bg-[#0a0f1a]/50 backdrop-blur-sm">
                                        <div className="text-center">
                                            <div className="w-10 h-10 border-2 border-teal-500/30 border-t-teal-500 rounded-full animate-spin mx-auto mb-4" />
                                            <p className="text-[var(--foreground-muted)]">Updating pattern...</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </TransformComponent>
                    </TransformWrapper>
                </div>

                {/* Resizer Handle */}
                {is3DPaneVisible && is3DEnabled && (
                    <div className="w-1 bg-[rgba(148,163,184,0.1)] hover:bg-teal-500/30 transition-colors cursor-col-resize flex-shrink-0" />
                )}

                {/* 3D Model Preview Pane - Secondary */}
                {is3DEnabled && (
                    <div
                        className={`
              relative transition-all duration-500 ease-out overflow-hidden
              ${is3DPaneVisible ? 'opacity-100' : 'w-0 opacity-0'}
            `}
                        style={{ width: is3DPaneVisible ? `${100 - paneRatio}%` : '0%' }}
                    >
                        {/* Aurora accent for 3D pane */}
                        <div className="absolute inset-0 bg-gradient-to-l from-teal-500/5 to-transparent pointer-events-none" />

                        {/* 3D Canvas Container */}
                        <div className="w-full h-full p-4">
                            <div className="w-full h-full rounded-2xl border border-[rgba(148,163,184,0.15)] bg-[#0a0f1a]/50 backdrop-blur-sm overflow-hidden relative">
                                {/* Pane Label */}
                                <div className="absolute top-4 left-4 z-10">
                                    <span className="text-xs font-medium text-[var(--foreground-muted)] uppercase tracking-wider bg-[#0a0f1a]/80 px-3 py-1.5 rounded-lg border border-[rgba(148,163,184,0.1)]">
                                        3D Preview
                                    </span>
                                </div>

                                <ThreeDCanvas model={modelPath} />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Mannequin Editor Modal */}
            <MannequinEditor
                isOpen={isMannequinEditorOpen}
                onClose={() => setIsMannequinEditorOpen(false)}
                onSave={() => {}}
                isEditable={isEditable}
                mannequinData={mannequinData}
            />

            {/* Custom Animations */}
            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -20px); }
        }
      `}</style>
        </div>
    );
}
