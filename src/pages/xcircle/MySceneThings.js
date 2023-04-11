
import React, { useRef, useLayoutEffect, useMemo, Suspense } from "react";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import Bird from "@helpers/Phoenix_bird";


// function Line() {
//   // const ref = useRef()

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

//   return (
//     <>
//       <group position={[0, 1.5, 0]}>
//         <Suspense fallback={<Html>loading</Html>}>
//           <Bird curve={curve} speed={.05} scale={[.002, .002, .002]} position={[0, 0, .1]} />
//         </Suspense>
//       </group >
//     </>
//   )
// }


const MySceneThings = (props) => {

  return (
    <group name="lighting">
      <directionalLight position={[7, 59, 7]}
        shadow-mapSize-height={1024}
        shadow-mapSize-width={1024}
        shadow-radius={4}
        intensity={.2} castShadow
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-camera-left={-20}
        shadow-camera-right={20} />
      {/* <Line /> */}
    </group>
  )
}

export default MySceneThings