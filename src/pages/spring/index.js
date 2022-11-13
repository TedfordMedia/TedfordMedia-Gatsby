import React , {useRef, Suspense, useState} from 'react';
import Layout from "../../components/layoutwide"  
import { Canvas } from "@react-three/fiber"
import { Html, OrbitControls,   useTexture } from '@react-three/drei';
import * as THREE from 'three'  
import { useSpring } from '@react-spring/core'
import { a } from '@react-spring/three'

function TheFollowCube(){ 
    const ref = useRef()   
    const myytexture = useTexture('./images/tedmedlogos/square_logo.png')   
  
    const curve = new THREE.CatmullRomCurve3( [
        new THREE.Vector3( -10, 2, 10 ),
        new THREE.Vector3( -10, 2, 0 ), 
        new THREE.Vector3( -5, 4, -10 ),    
        new THREE.Vector3( 5, 4, -10 ),
        new THREE.Vector3( 10, 2, 0 ),
        new THREE.Vector3( 10, 2, 10 )
    ] );
    curve.curveType = 'catmullrom';
    curve.closed = true;
 
    return (
        <> 
        <group position={[0, 0, 0]} ref={ref}>  
    
            <mesh castShadow receiveShadow position={[0, 0, 0]}>
                <boxBufferGeometry args={[1, 1, 1]} />
                <meshStandardMaterial    map={myytexture}   roughness={1}   /> 
            </mesh> 
        </group> 
        </>
    )
}
  
 const TheBoxbricks = (props) => {
   const groupRef = useRef();

  return (

    <group ref={groupRef}> 
        <mesh  {...props} castShadow receiveShadow position={[-5, 4, 0]} >
            <boxBufferGeometry args={[2, 8, 2]}  attach="geometry" />
            <meshPhongMaterial color={'#4e7ea4'} attach="material" />
        </mesh> 
        <mesh castShadow receiveShadow position={[0, -6, -30]} rotation={[Math.PI/2, 0, 0]} >
            <boxBufferGeometry args={[100, 75, 10]}  attach="geometry" />
            <meshPhongMaterial color={'#4e7ea4'} attach="material" />
        </mesh>  

        <mesh castShadow receiveShadow position={[0, -6, 45]} rotation={[Math.PI/2, 0, 0]} >
            <boxBufferGeometry args={[100, 75, 10]}  attach="geometry" />
            <meshPhongMaterial color={'#b1d049'} attach="material" />
        </mesh>   
    </group>

  );
};
 
 
function Dolighting({ brightness, color }) {

  return (
    <group name="lighting">
        <hemisphereLight intensity={.1} />
        <ambientLight intensity={.1} /> 
 
        <pointLight castShadow 
            shadow-mapSize-height={512}
            shadow-mapSize-width={512} 
            position={[10, 20, 50]} intensity={1}/> 
    </group>
  );
}
 
 function Box(props) {
  const [active, setActive] = useState(0)

  const { spring } = useSpring({
    spring: active,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 }
  })

  // interpolate values from commong spring
  const scale = spring.to([0, 1], [1, 5])
  const rotation = spring.to([0, 1], [0, Math.PI])
  const color = spring.to([0, 1], ['#6246ea', '#e45858'])

  return (
    <a.group position-y={scale}>
      <a.mesh castShadow rotation-y={rotation} scale-x={scale} scale-z={scale} onClick={() => setActive(Number(!active))}>
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <a.meshStandardMaterial roughness={0.5} attach="material" color={color} />
      </a.mesh>
    </a.group>
  )
}

const MyPage = (props) => (   
  <Layout displayHero={false}>    
      <div  style={{ height: "100vh", width: "100%",background:"#a0a0a0" }}>  
        <Canvas  
            shadowMap
            shadows
            gl={{ alpha: false }}
            camera={{ 
            position: [-3, 20, 80], 
            fov: 30 ,  
            near: 0.01,
            far: 1100
            }}
            onCreated={({ gl, camera, scene }) => {  
                gl.outputEncoding = THREE.sRGBEncoding
                gl.shadowMap.enabled = true;
                gl.shadowMap.type = THREE.PCFSoftShadowMap;  
                scene.background = new THREE.Color( 0xa0a0a0 ); 
            }}
            style={{ height: "100%", width: "100%" }}
        >
          <Dolighting/>
  
          <TheBoxbricks/> 
            <Box/>
    
          <Suspense fallback={<Html><h1 style={{color:'#99e600'}}>Loading...</h1></Html>}>   
              <TheFollowCube/>    
          </Suspense> 
   
          <OrbitControls  maxDistance={650} maxPolarAngle={Math.PI / 2}/>
        </Canvas>
      </div> 
  </Layout> 
)
  
export default MyPage  