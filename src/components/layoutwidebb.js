import React , {  Suspense} from 'react';
import { useTexture, Html } from '@react-three/drei';

const LogoFloor = props => { 
  const myytexture = useTexture('./images/tedmedlogos/square_logo.png')   
  return (
    <Suspense fallback={<Html>Loading...</Html>}>    
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.9, 5]}>
          <planeBufferGeometry   attach="geometry" args={[20, 20]} />
          <meshStandardMaterial   attach="material" map={myytexture}   />
      </mesh>
      {/* <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[50, -1, 0]}>
          <planeBufferGeometry  attach="geometry" args={[50, 50]} />
          <meshStandardMaterial  attach="material" map={myytexture}  />
      </mesh> */}
      {/* <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[250, -1, 0]}>
          <planeBufferGeometry attach="geometry" args={[100, 100]} />
          <meshStandardMaterial attach="material" map={myytexture}  />
      </mesh>  */}
    </Suspense>
  )
}

export default   LogoFloor   