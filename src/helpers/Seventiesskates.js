 
import React, { useRef, useMemo, useEffect } from 'react'
import { useGLTF, PerspectiveCamera } from '@react-three/drei'
import {    } from "@react-three/fiber"
export default function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/seventiesskates.glb')
 
 
  return (
    <group ref={group} {...props} receiveShadow castShadow dispose={null}>
      <group receiveShadow castShadow position={[0, 0, 0]}>
        <mesh receiveShadow castShadow geometry={nodes.rollerSkates_rightBase.geometry} material={nodes.rollerSkates_rightBase.material} />
        <mesh receiveShadow castShadow geometry={nodes.rollerSkates_rightSole.geometry} material={nodes.rollerSkates_rightSole.material} />
        <mesh receiveShadow castShadow geometry={nodes.rollerSkates_leftBase.geometry} material={nodes.rollerSkates_leftBase.material} />
        <mesh  receiveShadow castShadow geometry={nodes.rollerSkates_leftSole.geometry} material={nodes.rollerSkates_leftSole.material} />
        <mesh  receiveShadow castShadow geometry={nodes.rollerSkates_rightChassis.geometry} material={nodes.rollerSkates_rightChassis.material} />
        <mesh  receiveShadow castShadow geometry={nodes.rollerSkates_leftChassis.geometry} material={nodes.rollerSkates_leftChassis.material} />
        <mesh  receiveShadow castShadow geometry={nodes.rollerSkates_rightChrome.geometry} material={nodes.rollerSkates_rightChrome.material} />
        <mesh  receiveShadow castShadow geometry={nodes.rollerSkates_leftChrome.geometry} material={nodes.rollerSkates_leftChrome.material} />
        <mesh receiveShadow castShadow
          geometry={nodes.rollerSkates_rightTiesHolesBlue.geometry}
          material={nodes.rollerSkates_rightTiesHolesBlue.material}
        />
        <mesh receiveShadow castShadow
          geometry={nodes.rollerSkates_leftTiesHolesBlue.geometry}
          material={nodes.rollerSkates_leftTiesHolesBlue.material}
        />
        <mesh receiveShadow castShadow
          geometry={nodes.rollerSkates_rightTiesHolesRed.geometry}
          material={nodes.rollerSkates_rightTiesHolesRed.material}
        />
        <mesh receiveShadow castShadow
          geometry={nodes.rollerSkates_leftTiesHolesRed.geometry}
          material={nodes.rollerSkates_leftTiesHolesRed.material}
        />
        <mesh receiveShadow castShadow 
          geometry={nodes.rollerSkates_rightTiesHolesYellow.geometry}
          material={nodes.rollerSkates_rightTiesHolesYellow.material}
        />
        <mesh receiveShadow castShadow 
          geometry={nodes.rollerSkates_leftTiesHolesYellow.geometry}
          material={nodes.rollerSkates_leftTiesHolesYellow.material}
        />
        <mesh receiveShadow castShadow 
          geometry={nodes.rollerSkates_rightLeatherBlue.geometry}
          material={nodes.rollerSkates_rightLeatherBlue.material}
        />
        <mesh receiveShadow castShadow 
          geometry={nodes.rollerSkates_leftLeatherBlue.geometry}
          material={nodes.rollerSkates_leftLeatherBlue.material}
        />
        <mesh receiveShadow castShadow 
          geometry={nodes.rollerSkates_rightLeatherYellow.geometry}
          material={nodes.rollerSkates_rightLeatherYellow.material}
        />
        <mesh receiveShadow castShadow 
          geometry={nodes.rollerSkates_rightLeatherOrange.geometry}
          material={nodes.rollerSkates_rightLeatherOrange.material}
        />
        <mesh receiveShadow castShadow 
          geometry={nodes.rollerSkates_rightLeatherRed.geometry}
          material={nodes.rollerSkates_rightLeatherRed.material}
        />
        <mesh receiveShadow castShadow 
          geometry={nodes.rollerSkates_leftLeatherYellow.geometry}
          material={nodes.rollerSkates_leftLeatherYellow.material}
        />
        <mesh receiveShadow castShadow 
          geometry={nodes.rollerSkates_leftLeatherOrange.geometry}
          material={nodes.rollerSkates_leftLeatherOrange.material}
        />
        <mesh receiveShadow castShadow 
          geometry={nodes.rollerSkates_leftLeatherRed.geometry}
          material={nodes.rollerSkates_leftLeatherRed.material}
        />
        <mesh receiveShadow castShadow 
          geometry={nodes.rollerSkates_rightSlipsole.geometry}
          material={nodes.rollerSkates_rightSlipsole.material}
        />
        <mesh  receiveShadow castShadow geometry={nodes.rollerSkates_leftSlipsole.geometry} material={nodes.rollerSkates_leftSlipsole.material} />
        <mesh  receiveShadow castShadow geometry={nodes.rollerSkates_rightTies.geometry} material={nodes.rollerSkates_rightTies.material} />
        <mesh  receiveShadow castShadow geometry={nodes.rollerSkates_leftTies.geometry} material={nodes.rollerSkates_leftTies.material} />
        <mesh  receiveShadow castShadow geometry={nodes.rollerSkates_rightHanger.geometry} material={nodes.rollerSkates_rightHanger.material} />
        <mesh  receiveShadow castShadow geometry={nodes.rollerSkates_leftHanger.geometry} material={nodes.rollerSkates_leftHanger.material} />
        <mesh receiveShadow castShadow 
          geometry={nodes.rollerSkates_rightTextilesInside.geometry}
          material={nodes.rollerSkates_rightTextilesInside.material}
        />
        <mesh receiveShadow castShadow 
          geometry={nodes.rollerSkates_leftTextilesInside.geometry}
          material={nodes.rollerSkates_leftTextilesInside.material}
        />
        <mesh receiveShadow castShadow 
          geometry={nodes.rollerSkates_rightTextiles.geometry}
          material={nodes.rollerSkates_rightTextiles.material}
        />
        <mesh  receiveShadow castShadow geometry={nodes.rollerSkates_leftTextiles.geometry} material={nodes.rollerSkates_leftTextiles.material} />
        <mesh  receiveShadow castShadow geometry={nodes.rollerSkates_rightStop.geometry} material={nodes.rollerSkates_rightStop.material} />
        <mesh  receiveShadow castShadow geometry={nodes.rollerSkates_leftStop.geometry} material={nodes.rollerSkates_leftStop.material} />
        <mesh receiveShadow castShadow 
          geometry={nodes.rollerSkates_rightFrontRightWheel.geometry}
          material={nodes.rollerSkates_rightFrontRightWheel.material}
        />
        <mesh receiveShadow castShadow 
          geometry={nodes.rollerSkates_rightBehindRightWheel.geometry}
          material={nodes.rollerSkates_rightBehindRightWheel.material}
        />
        <mesh receiveShadow castShadow 
          geometry={nodes.rollerSkates_rightFrontLeftWheel.geometry}
          material={nodes.rollerSkates_rightFrontLeftWheel.material}
        />
        <mesh receiveShadow castShadow 
          geometry={nodes.rollerSkates_rightBehindLeftWheel.geometry}
          material={nodes.rollerSkates_rightBehindLeftWheel.material}
        />
        <mesh receiveShadow castShadow 
          geometry={nodes.rollerSkates_leftFrontRightWheel.geometry}
          material={nodes.rollerSkates_leftFrontRightWheel.material}
        />
        <mesh receiveShadow castShadow
          geometry={nodes.rollerSkates_leftBehindRightWheel.geometry}
          material={nodes.rollerSkates_leftBehindRightWheel.material}
        />
        <mesh receiveShadow castShadow
          geometry={nodes.rollerSkates_leftFrontLeftWheel.geometry}
          material={nodes.rollerSkates_leftFrontLeftWheel.material}
        />
        <mesh receiveShadow castShadow
          geometry={nodes.rollerSkates_leftBehindLeftWheel.geometry}
          material={nodes.rollerSkates_leftBehindLeftWheel.material}
        />
      </group> 
    </group>
  )
}

useGLTF.preload('/models/seventiesskates.glb')
