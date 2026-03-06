declare namespace Ammo {
  /* ───────────── Math ───────────── */

  class btVector3 {
    constructor(x: number, y: number, z: number)
    x(): number
    y(): number
    z(): number
    setValue(x: number, y: number, z: number): void
  }

  // ───── Basic Vector ─────
  class btVector3 {
    constructor(x: number, y: number, z: number)
    x(): number
    y(): number
    z(): number
    setValue(x: number, y: number, z: number): void
  }

  // ───── Collision / World ─────
  class btCollisionShape {
    setMargin(margin: number): void
  }

  class btCollisionObject {
    getCollisionShape(): btCollisionShape
  }

  class btSoftBodyRigidBodyCollisionConfiguration {}
  class btCollisionDispatcher {
    constructor(collisionConfig: btSoftBodyRigidBodyCollisionConfiguration)
  }
  class btDbvtBroadphase {}
  class btSequentialImpulseConstraintSolver {}
  class btDefaultSoftBodySolver {}

  class btSoftRigidDynamicsWorld {
    constructor(
      dispatcher: btCollisionDispatcher,
      broadphase: btDbvtBroadphase,
      solver: btSequentialImpulseConstraintSolver,
      collisionConfig: btSoftBodyRigidBodyCollisionConfiguration,
      softBodySolver: btDefaultSoftBodySolver
    )
    setGravity(gravity: btVector3): void
    addSoftBody(body: btSoftBody): void
    addRigidBody(body: btCollisionObject): void
    stepSimulation(deltaTime: number, maxSubSteps?: number): void
  }

  class btSoftBodyWorldInfo {
    set_m_broadphase(bp: btDbvtBroadphase): void
    set_m_dispatcher(dispatcher: btCollisionDispatcher): void
    set_m_sparsesdf(sdf: btSparseSdf3): void
    set_m_gravity(gravity: btVector3): void
  }

  class btSparseSdf3 {}


  /* ───────────── Soft Body ───────────── */

  class btSoftBodyNode {
    get_m_x(): btVector3
  }

  class btSoftBodyNodeArray {
    size(): number
    at(index: number): btSoftBodyNode
  }

  class btSoftBodyConfig {
    set_viterations(n: number): void
    set_piterations(n: number): void
    set_kDP(v: number): void
    set_kPR(v: number): void
  }

  class btSoftBodyMaterial {
    set_m_kLST(v: number): void
  }

  class btSoftBodyMaterialArray {
    at(index: number): btSoftBodyMaterial
  }

  class btSoftBody extends btCollisionObject {
    get_m_nodes(): btSoftBodyNodeArray
    get_m_cfg(): btSoftBodyConfig
    get_m_materials(): btSoftBodyMaterialArray
    setTotalMass(mass: number, fromFaces: boolean): void
  }

  class btSoftBodyWorldInfo {}

  /* ───────────── Helpers ───────────── */

  const btSoftBodyHelpers: {
    CreateFromTriMesh(
      worldInfo: btSoftBodyWorldInfo,
      vertices: number,
      indices: number,
      triangles: number,
      randomizeConstraints: boolean
    ): btSoftBody
  }

  /* ───────────── Memory ───────────── */

  const HEAPF32: Float32Array
  const HEAPU32: Uint32Array

  function _malloc(size: number): number
  function _free(ptr: number): void
  function destroy(obj: any): void

  function castObject<T>(obj: any, type: new (...args: any[]) => T): T
}
