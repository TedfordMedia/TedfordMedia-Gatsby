import React, { Suspense,  useRef, useState, useEffect} from 'react'  
import { Html } from '@react-three/drei';

const TedmediaCube = props => {

  // This reference will give us direct access to the mesh
  const mesh = useRef() 

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // const theColor = useState('#f56f42');
  const [theHovColor] = useState('white');
 
  useEffect(() => void (document.body.style.cursor = hovered ? 'pointer' : 'auto'), [hovered])

 // useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.001))

 
  return (
    <Suspense fallback={<Html>Loading....</Html>}>    
      <mesh
        {...props}
        ref={mesh}
        scale={active ? [1.5, 1, 4.5] : [2, 2, 2]}
        onClick={e => setActive(!active)}

        onPointerOver={e => setHover(true)}
        onPointerOut={e => setHover(false)}
      >
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <meshStandardMaterial
          roughness={1}     
          attach="material"
          color={hovered ? theHovColor : props.color}
        />
      </mesh>
    </Suspense> 
  )
}


export default TedmediaCube
 