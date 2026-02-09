"use client"

import { Box, OrbitControls } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OBJLoader } from "three/examples/jsm/Addons.js";
import * as THREE from "three";
import { useEffect, useRef } from "react";

export default function Canv() {
  const dress = useLoader(GLTFLoader, "dress/dress_pencil_boxmesh.gltf");
  dress.scene.scale.setScalar(0.01);
  const dressRef = useRef<THREE.Mesh>(null!);

  const mannequin = useLoader(OBJLoader, "mean_all.obj");
  const mannequinRef = useRef<THREE.Mesh>(null!);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[-10, 10, 0]} intensity={0.4} />
      <OrbitControls />

      <RigidBody position={[0, 0.5, 0]} type="fixed" colliders={"trimesh"}>
        <primitive object={mannequin} ref={mannequinRef} />
      </RigidBody>

      <RigidBody position={[0, 0.6, 0]} 
        type="dynamic"               // let physics move it
        colliders="trimesh"
        mass={0.1}                   // very light
        linearDamping={0.9}          // strong translational damping
        angularDamping={0.9}         // strong rotational damping
        friction={0.2}               // low surface friction
        restitution={0.3}   
      >
        <primitive object={dress.scene} ref={dressRef} />
      </RigidBody>

      <RigidBody type="fixed">
        <Box position={[0, 0, 0]} args={[10, 1, 10]}>
          <meshStandardMaterial color={"springgreen"} />
        </Box>
      </RigidBody>
    </>
  );
}