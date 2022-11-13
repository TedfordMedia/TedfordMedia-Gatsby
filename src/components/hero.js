import { Canvas, useFrame } from "@react-three/fiber"
import React, { useRef, useState } from "react"
 
const Box = props => {
  // This reference will give us direct access to the mesh
  const mesh = useRef()

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
 
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1, 4.5] : [2, 2, 2]}
      onClick={e => setActive(!active)}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}
    >
      <boxBufferGeometry attach="geometry" args={[1, 2, 1]} />
      <meshStandardMaterial
        attach="material"
        color={hovered ? "yellow" : "blue"}
      />
    </mesh>
  )
}

const Hero = props => {
  // const isSSR = typeof window === "undefined"

  return ( 
    <section>
      <div>  
        <h1>{props.title}</h1>
        <p>{props.description}</p>
        <Canvas id="aaaa">
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} />
        </Canvas>
      </div>
    </section>
  )
}

export default Hero

