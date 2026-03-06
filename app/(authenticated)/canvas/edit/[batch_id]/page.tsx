'use client';

import React, { useEffect, useState } from 'react';
import DesignEditorSidebar from '@/components/DesignEditorSidebar';
import Image from 'next/image';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useAuth } from '@/components/AuthProvider';
import ThreeDCanvas from '@/components/sections/ThreeDCanvas';
import { Button } from '@/components/ui/Button';
import { RequestMannequin, RequestPattern } from '@/lib/models/fetchdata/FetchData';
import { RequestType } from '@/lib/models/fetchdata/type';
import { useCanvas } from '@/hooks/useCanvas';
import { PanelLeftClose, PanelRightClose, Settings, Save, Play } from 'lucide-react';
import { useParams } from 'next/navigation';
import { BUCKETNAME, FILETYPE } from '@/lib/constants/files';

export default function EditCanvasPage() {
    const params = useParams();
    const batch_id = params.batch_id as string;
    const { user, token } = useAuth();
    const { patternURL, modelURL, loading, setPatternURL, setModelURL } = useCanvas();
    const [pattern, setPattern] = useState('');
    const [cloth, setCloth] = useState('');
    const [texture, setTexture] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [is3DPaneVisible, setIs3DPaneVisible] = useState(true);
    const [paneRatio, setPaneRatio] = useState(70); // 2D pattern width percentage

    const [defaultMannequin, setDefaultMannequin] = useState({ config_path: '', model_path: '' });

    useEffect(() => {
        if (!token || !batch_id) return;

        async function fetchPattern() {
            try {
                const url = `/api/file?batch=${'8b608735-6187-45cc-a688-0d5aaa1412f1'}&filename=${'pattern.png'}&bucket=${'garments'}`;
                setPattern(url);

                const clothURL = `/api/file?batch=${batch_id}&filename=${FILETYPE.SIMULATED_CLOTH}&bucket=${BUCKETNAME.GARMENTS}`;
                const textureURL = `/api/file?batch=${batch_id}&filename=${FILETYPE.TEXTURE}&bucket=${BUCKETNAME.GARMENTS}`;
                setCloth(clothURL);
                setTexture(textureURL);
            } catch (error) {
                console.error('Failed to fetch pattern:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchPattern();
    }, [token, batch_id, setPatternURL, setModelURL]);


    useEffect(() => {
        if (!token) return;
        async function GetMannequin() {
            const default_mannequin = await new RequestMannequin(RequestType.FRONT).getDefault(token!);
            setDefaultMannequin(await default_mannequin || { config_path: '', model_path: '' });
        }
        GetMannequin();
    }, [token]);

    const toggle3DPane = () => {
        setIs3DPaneVisible(!is3DPaneVisible);
        setPaneRatio(is3DPaneVisible ? 95 : 70);
    };

    if (isLoading) {
        return (
            <div className="h-screen bg-[#0a0f1a] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-8 h-8 border-2 border-teal-500/30 border-t-teal-500 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-[var(--foreground-muted)]">Loading canvas...</p>
                </div>
            </div>
        );
    }

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

            {/* Top Command Bar - Pattern Actions Only */}
            <div className="relative z-20 bg-[#0a0f1a]/80 backdrop-blur-xl border-b border-[rgba(148,163,184,0.1)] flex-shrink-0">
                <div className="flex items-center justify-between px-6 py-3">
                    {/* Left side - Pattern actions */}
                    <div className="flex items-center gap-3">
                        <Button variant="glow" size="sm" className="flex items-center gap-2">
                            <Play className="w-4 h-4" />
                            Render Pattern
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                            <Save className="w-4 h-4" />
                            Save Changes
                        </Button>
                    </div>

                    {/* Right side - Controls */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-xs text-[var(--foreground-muted)]">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            Auto-saved
                        </div>

                        {/* 3D Pane Toggle */}
                        <button
                            onClick={toggle3DPane}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[rgba(148,163,184,0.1)] border border-[rgba(148,163,184,0.2)] hover:border-teal-500/40 transition-all duration-300"
                        >
                            {is3DPaneVisible ? <PanelRightClose className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
                            <span className="text-xs text-[var(--foreground-muted)]">
                                {is3DPaneVisible ? 'Hide 3D' : 'Show 3D'}
                            </span>
                        </button>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="flex items-center gap-2"
                        >
                            <Settings className="w-4 h-4" />
                            Measurements
                        </Button>
                    </div>
                </div>
            </div>

            {/* Adaptive Split Workspace */}
            <div className="flex-1 flex overflow-hidden relative">
                {/* Measurement Sidebar */}
                <DesignEditorSidebar
                    isOpen={isSidebarOpen}
                    onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
                    sessionToken={token!}
                />

                {/* 2D Garment Pattern - Primary Workspace */}
                <div
                    className="relative transition-all duration-500 ease-out"
                    style={{ width: `${paneRatio}%` }}
                >
                    {/* Canvas Grid Background */}
                    <div
                        className="absolute inset-0 opacity-15"
                        style={{
                            backgroundImage: 'linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)',
                            backgroundSize: '40px 40px'
                        }}
                    />

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
                                        src={pattern}
                                        width={500}
                                        height={500}
                                        alt="2D Garment Pattern"
                                        unoptimized
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
                {is3DPaneVisible && (
                    <div className="w-1 bg-[rgba(148,163,184,0.1)] hover:bg-teal-500/30 transition-colors cursor-col-resize flex-shrink-0" />
                )}

                {/* 3D Model Preview Pane - Secondary */}
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

                            <ThreeDCanvas model={defaultMannequin.model_path} cloth={cloth} texture={''} />
                        </div>
                    </div>
                </div>
            </div>

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
