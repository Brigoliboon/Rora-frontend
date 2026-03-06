'use client';

import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useProgress, Html } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { useLoader } from '@react-three/fiber';
// Physics engine imports
import { Physics, useBox, usePlane } from '@react-three/cannon';

// Editable physics parameters – change these values to experiment
const DEFAULT_GRAVITY = -9.81; // m/s² (negative = downwards)
const DEFAULT_MASS = 1; // kg
const DEFAULT_INITIAL_HEIGHT = 5; // meters

interface ModelProps {
  path: string;
  scale?: number;
}

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(0)} % loaded</Html>;
}

// Physics-enabled model wrapper - must be inside Physics provider
function PhysicsModel({ 
  path, 
  scale = 1, 
  position = [0, 0, 0],
  mass = DEFAULT_MASS 
}: ModelProps & { position?: [number, number, number]; mass?: number }) {
  const obj = useLoader(OBJLoader as any, path);
  
  // Create a physics box that will drive the model's position
  const [ref] = useBox(() => ({ 
    mass, 
    position,
    args: [1, 1, 1], // Box dimensions for collision detection
  }));
  
  return <primitive ref={ref} object={obj} scale={scale} />;
}

// Ground plane component - must be inside Physics provider
function Ground() {
  const [planeRef] = usePlane(() => ({
    position: [0, 0, 0],
    rotation: [-Math.PI / 2, 0, 0],
  }));

  return (
    <mesh ref={planeRef} receiveShadow>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial color="#444" />
    </mesh>
  );
}

/**
 * Simple physics simulation for a single sphere (representing a garment).
 * The sphere falls under constant gravity and stops when it hits the ground plane.
 */
function PhysicsSimulator({
  mass = DEFAULT_MASS,
  initialHeight = DEFAULT_INITIAL_HEIGHT,
}: {
  mass?: number;
  initialHeight?: number;
}) {
  return (
    <>
      {/* Visual ground plane with physics */}
      <Ground />
      {/* The model with physics – starts at initialHeight */}
      {/* <PhysicsModel 
        path="/mean_all.obj" 
        scale={0.5} 
        position={[0, initialHeight, 0]}
        mass={mass}
      /> */}

      <PhysicsModel 
        path="samples\pencil_skirt\dress_pencil_boxmesh.obj" 
        scale={0.002} 
        position={[0, initialHeight, 0]}
        mass={mass}
      />
    </>
  );
}

export default function PhysicsPage() {
  // Local state for editable parameters – expose simple inputs for quick tweaking
  const [gravity, setGravity] = useState(DEFAULT_GRAVITY);
  const [mass, setMass] = useState(DEFAULT_MASS);
  const [height, setHeight] = useState(DEFAULT_INITIAL_HEIGHT);
  const [key, setKey] = useState(0); // Key to reset physics simulation

  const resetSimulation = () => {
    setKey(prev => prev + 1);
  };

  return (
    <div className="flex h-screen flex-col bg-gray-950 text-white">
      <header className="p-4 bg-gray-800 flex justify-between items-center">
        <h1 className="text-xl font-bold">Garment Physics Playground</h1>
        <div className="space-x-4 flex items-center">
          <label>
            Gravity (m/s²):
            <input
              type="number"
              step="0.1"
              value={gravity}
              onChange={e => setGravity(parseFloat(e.target.value) || 0)}
              className="ml-2 w-20 rounded bg-gray-700 p-1 text-white"
            />
          </label>
          <label>
            Mass (kg):
            <input
              type="number"
              step="0.1"
              value={mass}
              onChange={e => setMass(parseFloat(e.target.value) || 1)}
              className="ml-2 w-20 rounded bg-gray-700 p-1 text-white"
            />
          </label>
          <label>
            Height (m):
            <input
              type="number"
              step="0.1"
              value={height}
              onChange={e => setHeight(parseFloat(e.target.value) || 0)}
              className="ml-2 w-20 rounded bg-gray-700 p-1 text-white"
            />
          </label>
          <button
            onClick={resetSimulation}
            className="px-4 py-1 bg-blue-600 hover:bg-blue-700 rounded"
          >
            Reset
          </button>
        </div>
      </header>
      <main className="flex-1">
        <Canvas key={key} shadows camera={{ position: [0, 2, 8], fov: 60 }}>
          <Physics gravity={[0, gravity, 0]}>
            <ambientLight intensity={0.5} />
            <directionalLight
              position={[5, 10, 5]}
              intensity={1}
              castShadow
            />
            <OrbitControls />
            <PhysicsSimulator mass={mass} initialHeight={height} />
          </Physics>
        </Canvas>
      </main>
    </div>
  );
}