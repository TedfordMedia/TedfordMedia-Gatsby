import * as THREE from 'three'
import * as CANNON from 'cannon'
import React, { useState, useEffect, useContext, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

// Cannon-world context provider
const context = React.createContext()
export function Physics({ children }) {
  // Set up physics
  const [world] = useState(() => new CANNON.World())
  useEffect(() => {
    world.broadphase = new CANNON.SAPBroadphase(world)
    world.gravity.set(0, -9.8, 0)
  }, [world])

  // Run world stepper every frame
  useFrame(() => world.step(1 / 60))
  // Distribute world via context
  return <context.Provider value={world} children={children} />
}

// Custom hook to maintain a world physics body
export function useCannon({ ...props }, fn, deps = []) {
  const ref = useRef()
  // Get cannon world object
  const world = useContext(context)
  // Instanciate a physics body
  const [body] = useState(() => new CANNON.Body(props))
  useEffect(() => {
    // Call function so the user can add shapes
    fn(body)
    // Add body to world on mount
    world.addBody(body)
    // Remove body on unmount
    return () => world.removeBody(body)
  }, deps)

  useFrame(() => {
    // Transport cannon physics into the referenced threejs object
    ref.current.position.copy(body.position)
    ref.current.quaternion.copy(body.quaternion)
  })
  return ref
}

// Custom hook to maintain instanced world physics bodies
const _object = new THREE.Object3D()
export function useCannonInstanced(ref, props, fn, deps = []) {
  const world = useContext(context)
  const bodies = useRef([])
  useEffect(() => {
    if (ref.current && ref.current.count) {
      ref.current.instanceMatrix.setUsage(35048)
      for (let i = 0; i < ref.current.count; i++) {
        let body = new CANNON.Body(props)
        fn(body, i)
        world.addBody(body)
        bodies.current.push(body)
      }
    }
    return () => bodies.current.forEach(body => world.removeBody(body))
  }, deps)
  useFrame(() => {
    for (let i = 0; i < ref.current.count; i++) {
      _object.position.copy(bodies.current[i].position)
      _object.quaternion.copy(bodies.current[i].quaternion)
      _object.updateMatrix()
      ref.current.setMatrixAt(i, _object.matrix)
    }
    ref.current.instanceMatrix.needsUpdate = true
  })
  return bodies
}
