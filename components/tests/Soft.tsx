'use client'

import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'

import { useMemo } from 'react'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'

function Soft() {
  const gltf = useLoader(GLTFLoader, '/dress/dress_pencil_boxmesh.gltf')
  const mesh = gltf.scene.children[0] as THREE.Mesh
  const geometry = mesh.geometry as THREE.BufferGeometry

  // ---- 1️⃣ Pick "middle" vertices once ----
  const waist = useMemo(() => {
    const pos = geometry.attributes.position as THREE.BufferAttribute
    const ids: number[] = []

    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i)
      if (y > 0.2 && y < 0.6) ids.push(i)
    }

    return ids
  }, [geometry])

  // ---- 2️⃣ Pull them inward every frame ----
  useFrame(() => {
    const pos = geometry.attributes.position as THREE.BufferAttribute

    waist.forEach(i => {
      const x = pos.getX(i)
      const z = pos.getZ(i)

      const r = Math.sqrt(x * x + z * z)
      if (r === 0) return

      const pull = 0.002
      pos.setX(i, x - (x / r) * pull)
      pos.setZ(i, z - (z / r) * pull)
    })

    pos.needsUpdate = true
  })

  return <primitive object={mesh} />
}

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 1.2, 2.5] }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[2, 2, 2]} />
      <Soft/>
    </Canvas>
  )
}
