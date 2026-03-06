"use client"

import { Box, Environment, OrbitControls, useEnvironment, PerspectiveCamera, BakeShadows, SpotLight, PresentationControls, useTexture } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { ColladaLoader, OBJLoader, PLYLoader } from "three/examples/jsm/Addons.js";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";

export function LightSource() {
  return (
    <SpotLight
      position={[10, 10, 10]}
      intensity={1}
      castShadow
    />
  )
}

interface GarmentProps {
  clothURL: string;
  ClothTexture: string;
}

interface RenderModelProps {
  cloth: GarmentProps;

}

export default function RenderModel({ cloth }: RenderModelProps) {
  const [loadError, setLoadError] = useState<string | null>(null);

  // Guard: Don't initialize loaders if the URL is empty

  // Load the mannequin always as it's the base
  const mannequin = useLoader(OBJLoader, '/mean_all.obj');

  // Guarded load for the cloth geometry - use a safe path if empty
  // Note: if clothURL is empty, this might still trigger a load attempt if not handled.
  // We should ideally only load if we have a URL, but useLoader can't be conditional.
  // Using a small existing file or handled empty string if PLYLoader allows it.
  const dress = useLoader(PLYLoader, cloth.clothURL || '/mean_all.obj'); // Using mean_all as a neutral placeholder if empty

  // Load texture - use provided one or default sample
  const texturePath = cloth.ClothTexture || '/sample.jpg';
  const texture = useTexture(texturePath);

  // Side effect: Move property mutations to useEffect to avoid render-time updates
  useEffect(() => {
    if (texture) {
      texture.flipY = false;
    }
  }, [texture]);
  const groupRef = useRef<THREE.Group>(null);

  // Handle loading errors
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('3D Loading Error:', event.error);
      setLoadError(event.message);
    };
    
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);



  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 60, 50]} fov={75} />
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 10, 10]}
        intensity={1}
        castShadow />
      {/* Outer wrapper handles the distance from camera */}
      <group position={[0, -10, -200]}>
        <PresentationControls
          global
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Infinity, Infinity]}
        >
          {/* Inner group is at 0,0,0 relative to parent, so it spins in place */}
          <group scale={100} receiveShadow>
            <RigidBody position={[0, 0, 0]} type="fixed">
              <primitive object={mannequin} />
            </RigidBody>

            {cloth.clothURL && (
              <RigidBody position={[0, 0, 0]} type={'fixed'}>
                <mesh geometry={dress} scale={0.01}>
                  <meshStandardMaterial map={texture}/>
                </mesh>
              </RigidBody>
            )}
          </group>
        </PresentationControls>
      </group>

      <Environment
        ground={{ height: 150, radius: 180, scale: 1000 }}
        background
        files={['/scene/px.png', '/scene/nx.png', '/scene/py.png', '/scene/ny.png', '/scene/pz.png', '/scene/nz.png']}
      />
      <LightSource />
    </>
  );
}
