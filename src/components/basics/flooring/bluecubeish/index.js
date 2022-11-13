import React from 'react'  

const MyFloor = ({  author, noSubscribeForm }) => (
   
    <mesh castShadow receiveShadow position={[0, -.5, -1]} >
        <boxBufferGeometry args={[20, 1, 3]}  attach="geometry" />
        <meshStandardMaterial color={'#4e7ea4'} attach="material" />
    </mesh>   
 
)

export default MyFloor 