// components/ObjScene.tsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useProgress, Html, Center, Stage } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { useLoader } from '@react-three/fiber';

interface ModelProps {
  path: string;
  scale?: number;
}

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(0)} % loaded</Html>;
}

function Model({ path, scale = 1 }: ModelProps) {
  const obj = useLoader(OBJLoader as any, path);
  return <primitive object={obj} scale={scale} />;
}

interface ThreeDCanvasProps {
  model?: string;
}

export default function ThreeDCanvas({model}: ThreeDCanvasProps) {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas shadows camera={{ position: [0, 1, 5], fov: 60 }}>
        {/* Lights */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        {/* Suspense for loading */}
        <Suspense fallback={<Loader />}>
          {/* Stage auto-centers and adds soft shadows */}
          <Stage environment="city" intensity={0.6}>
            <Model path={model?model:'/mean_all.obj'} scale={0.5} />
          </Stage>
        </Suspense>

        {/* Camera controls */}
        <OrbitControls enablePan={true} enableZoom={true} />
      </Canvas>
    </div>
  );
}
