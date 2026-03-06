// components/sections/ThreeDCanvas.tsx
import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useProgress, Html, Stage } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { useLoader } from '@react-three/fiber';
import { PLYLoader } from 'three/examples/jsm/Addons.js';
import { Physics, RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import RenderModel from './RenderModel';

// Check if WebGL is available
function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
}

interface ModelProps {
  loader: typeof OBJLoader | typeof PLYLoader;
  path: string;
  scale?: number;
}

function Loader() {
  const { progress } = useProgress();
  // Using a local state or just ensuring we don't return null while loading might help.
  return (
    <Html center>
      <div className="text-teal-500 font-medium whitespace-nowrap">
        {Math.round(progress)} % loaded
      </div>
    </Html>
  );
}

// Fallback component when WebGL is not available
function WebGLFallback() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#0a0f1a] p-8">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/20 flex items-center justify-center">
          <svg className="w-8 h-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">3D Preview Unavailable</h3>
        <p className="text-sm text-slate-400 mb-4">
          Your browser or device doesn't support WebGL, which is required for the 3D preview.
        </p>
        <div className="text-xs text-slate-500">
          <p className="mb-2">Try these solutions:</p>
          <ul className="list-disc list-inside text-left space-y-1">
            <li>Enable hardware acceleration in your browser settings</li>
            <li>Update your graphics drivers</li>
            <li>Try a different browser (Chrome or Firefox recommended)</li>
            <li>Disable browser extensions that may interfere</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function Model({ path, scale = 1, loader = OBJLoader }: ModelProps) {
  const obj = useLoader(loader as any, path);
  return (
    <RigidBody type="fixed">
      <primitive object={obj} />
    </RigidBody>
  );
}

function Cloth({ path, scale = 0.01 }: { path: string; scale?: number }) {
  const geometry = useLoader(PLYLoader, path);
  return (
    <RigidBody type="fixed">
      <mesh geometry={geometry} scale={0.01}>
        <meshStandardMaterial color="#8b5cf6" />
      </mesh>
    </RigidBody>
  );
}

interface ThreeDCanvasProps {
  model?: string;
  cloth?: string;
  texture?: string;
}


export default function ThreeDCanvas({ model, cloth, texture }: ThreeDCanvasProps) {
  const [webglAvailable, setWebglAvailable] = useState<boolean | null>(null);
  const [webglError, setWebglError] = useState<string | null>(null);

  useEffect(() => {
    // Check WebGL availability on mount
    setWebglAvailable(isWebGLAvailable());
  }, []);

  // Handle WebGL context creation error
  const handleCanvasCreated = (gl: THREE.WebGLRenderer) => {
    // WebGL context was created successfully
    setWebglError(null);
  };

  const handleError = (error: Error) => {
    console.error('WebGL Error:', error);
    setWebglError(error.message);
    setWebglAvailable(false);
  };

  // Show loading state while checking WebGL
  if (webglAvailable === null) {
    return (
      <div className="w-full h-full min-h-[500px] relative flex items-center justify-center">
        <div className="text-teal-500">Checking WebGL support...</div>
      </div>
    );
  }

  // Show fallback if WebGL is not available or had an error
  if (!webglAvailable || webglError) {
    return <WebGLFallback />;
  }

  // console.log('Canvas props:', { model, cloth, texture });
  return (
    <div className="w-full h-full min-h-[500px] relative">
      <Canvas 
        shadows 
        camera={{ position: [0, 1, 5], fov: 45 }}
        onCreated={handleCanvasCreated}
        onContextMenu={(e) => e.preventDefault()}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          failIfMajorPerformanceCaveat: false
        }}
        style={{ background: '#0a0f1a' }}
      >
        <Suspense fallback={<Loader />}>
          <Physics debug={false}>
            <RenderModel cloth={{ clothURL: cloth || '', ClothTexture: texture || '' }} />
          </Physics>
        </Suspense>

        <OrbitControls
          target={[0, 60, 40]}
          enablePan={true}
          enableZoom={true}
          enableRotate={false} // Locks the perspective
          minDistance={2}
          maxDistance={20}
        />
      </Canvas>
    </div>
  );
}

