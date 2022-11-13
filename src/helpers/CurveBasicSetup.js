import React, { useRef, useEffect } from 'react'
import { useFrame, useLoaderm,  CurveModifier, CurveModifierRef } from '@react-three/drei'
import { CurveModifier, CurveModifierRef } from '../../src'
import * as THREE from 'three'
import { Flow } from "three/examples/jsm/modifiers/CurveModifier.js";


function CurveModifierSceneBit() {
    var objectToCurve = 
    
    flow = new Flow( objectToCurve );
    flow.updateCurve( 0, curve );
    scene.add( flow.object3D );


    return (
      <>
       
      </>
    )
  }







export default CurveModifierSceneBit        
