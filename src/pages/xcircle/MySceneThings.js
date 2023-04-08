

import React, {useRef} from "react";
import { Box } from "@react-three/drei";

 import LogoTedfordMedia from "@helpers/Tedmedialogosilver"; 

const MySceneThings = (props) => { 
  const webcamRef = useRef(null);

return (   
    <Box
    receiveShadow
    args={[30, 30, 100]}
    rotation={[-Math.PI / 2, 0, 0]}
    position={[0, -5.01, 1.6]}
  >
    <meshStandardMaterial attach="material" color={"#888845"} />
  </Box>
)
}
  
export default MySceneThings  

// import React, { useRef, useLayoutEffect, useMemo } from "react";
// ///import three
// import * as THREE from "three";
// import Bird from "./Phoenix_bird";

// function Line() {
//   // const ref = useRef()

//   const speed = .05;

//   const curve = useMemo(() => {
//     const radius = 8; // radius of the circle
//     const angleStep = (2 * Math.PI) / 8; // angle between adjacent control points

//     const points = [];
//     for (let i = 0; i < 8; i++) {
//       const angle = i * angleStep;
//       const x = Math.cos(angle) * radius;
//       const y = 0;
//       const z = Math.sin(angle) * radius;
//       points.push(new THREE.Vector3(x, y, z));
//     }
//     return new THREE.CatmullRomCurve3(points, true);
//   }, [])

//   // useLayoutEffect(() => {
//   //   curve.closed = true;
//   //   const points = curve.getPoints(50);
//   //   ref.current.geometry = new THREE.BufferGeometry().setFromPoints(points);
//   // }, [])

//   return (
//     <>
//       <group position={[0, 1.5, 0]}>
//         {/* <Suspense fallback={null}>
//           <Bird curve={curve} speed={speed} scale={[.002, .002, .002]} position={[0, 0, .1]} />
//         </Suspense> */}
//       </group >
//       {/* <line ref={ref}>
//         <bufferGeometry />
//         <lineBasicMaterial color="hotpink" />
//       </line>  */}
//     </>
//   )
// }

// const MySceneThings = () => {

//   return (
//     <group name="lighting">
//       <directionalLight position={[7, 59, 7]}
//         shadow-mapSize-height={1024}
//         shadow-mapSize-width={1024}
//         shadow-radius={4}
//         intensity={.2} castShadow
//         shadow-camera-top={20}
//         shadow-camera-bottom={-20}
//         shadow-camera-left={-20}
//         shadow-camera-right={20} />
//       <Line />
//     </group>
//   );
// };

// export default MySceneThings;

