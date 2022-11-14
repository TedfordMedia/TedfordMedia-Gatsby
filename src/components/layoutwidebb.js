import React , {  Suspense} from 'react';
import { useTexture, Html } from '@react-three/drei';

const LogoFloor = props => { 
  const myytexture = useTexture('./images/tedmedlogos/square_logo.png')   
  return (
    <Suspense fallback={<Html>Loading...</Html>}>    
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.9, 5]}>
          <planeGeometry   attach="geometry" args={[20, 20]} />
          <meshStandardMaterial   attach="material" map={myytexture}   />
      </mesh>
    </Suspense>
  )
}

export default   LogoFloor   