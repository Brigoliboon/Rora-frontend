"use client"

import { Canv } from "@/components/sections/RenderModel";
import Scene from "@/components/tests/Soft";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";



export default function Testing() {
    const sample1 = (
        <Canvas shadows camera={{ position: [0, 0, 0], fov: 30 }}>
            <Suspense>
                <Physics >
                    <Canv />
                </Physics>
            </Suspense>

            <OrbitControls
                target={[0, 1, 5]}
                enablePan={true}
                enableZoom={true}
                minDistance={2}
                maxDistance={100}
            />
        </Canvas>
    )

    return <div className="h-screen">
        {sample1}
    </div>
}