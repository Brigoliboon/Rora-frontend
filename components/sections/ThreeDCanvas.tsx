// components/sections/ThreeDCanvas.tsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useProgress, Html, Stage } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { useLoader } from '@react-three/fiber';
import { PLYLoader } from 'three/examples/jsm/Addons.js';
import { Physics, RigidBody } from '@react-three/rapier';
import * as THREE from 'three';

interface ModelProps {
  loader: typeof OBJLoader | typeof PLYLoader;
  path: string;
  scale?: number;
}

function Loader() {
  const { progress } = useProgress();
  return <Html center className="text-teal-500 font-medium">{progress.toFixed(0)} % loaded</Html>;
}

function Model({ path, scale = 1, loader = OBJLoader }: ModelProps) {
  const obj = useLoader(loader as any, path);
  return (
    <RigidBody type="fixed" scale={0.9}>
      <primitive object={obj} scale={scale} />
    </RigidBody>
  );
}

function Cloth({ path, scale = 0.01 }: { path: string; scale?: number }) {
  const geometry = useLoader(PLYLoader, path);
  return (
    <RigidBody type="fixed" >
      <mesh geometry={geometry} scale={scale}>
        <meshStandardMaterial color="#8b5cf6" roughness={0.3} metalness={0.2} />
      </mesh>
    </RigidBody>
  );
}

interface ThreeDCanvasProps {
  model?: string;
  cloth?: string;
}

export default function ThreeDCanvas({ model, cloth }: ThreeDCanvasProps) {
  return (
    <div className="w-full h-full min-h-[500px] relative">
      <Canvas shadows camera={{ position: [0, 1, 5], fov: 45 }}>
        <Suspense fallback={<Loader />}>
          <Stage environment="city" intensity={0.6} shadows={{ type: 'contact', opacity: 0.5, blur: 2 }}>
            <Physics debug={false}>
              <Model

                loader={OBJLoader}
                path={model || '/mean_all.obj'}
              />
              {cloth && <Cloth path={cloth} />}
              {!cloth && (
                <Cloth path="/samples/dress/sample_dress.ply" />
              )}
            </Physics>
          </Stage>
        </Suspense>

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          minDistance={2}
          maxDistance={10}
        />
      </Canvas>
    </div>
  );
}

