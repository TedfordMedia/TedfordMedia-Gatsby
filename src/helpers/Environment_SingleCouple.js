
import React, { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import {  useThree } from "@react-three/fiber"
import * as THREE from 'three'

function setupLightmapShader(node, origMaterial) { 

    let baseColour = new THREE.Vector4(origMaterial.color.r, origMaterial.color.g, origMaterial.color.b, origMaterial.color.a);

    var uniforms = {
        "colorTexture": {value: origMaterial.map},
        "mainColor": {value: baseColour},
        "lightmapTexture": {value: origMaterial.emissiveMap},
        "lightmapOffset": {value: origMaterial.emissiveMap.offset},
        "lightmapScale": {value: origMaterial.emissiveMap.repeat},
        "glow": {value: 0.0},
        "glowColour": {value: {x: 0.0, y: 1.0, z: 0.0, w: 1.0}}
    };

    var mat = new THREE.ShaderMaterial({

        uniforms: uniforms,
        vertexShader: getVertexShader(),
        fragmentShader: getFragmentShader(),
        transparent: origMaterial.transparent,
        alphaTest: origMaterial.alphaTest

    });

    node.material = mat;

    setTextureSettingBase(origMaterial.map);
    setTextureSettingLightmap(origMaterial.emissiveMap);
}

function setupUnlitMaterial(node, origMaterial) {

    var mat = new THREE.MeshBasicMaterial({map: origMaterial.map,
        color: origMaterial.color,
        transparent: origMaterial.transparent,
        alphaTest: origMaterial.alphaTest});

    node.material = mat;

    setTextureSettingBase(origMaterial.map);
}

function setTextureSettingBase(map) {
    map.anisotropy = 8;
    map.minFilter = THREE.LinearMipmapLinearFilter;
    map.encoding = THREE.LinearEncoding;
}

function setTextureSettingLightmap(map) {
    map.encoding = THREE.LinearEncoding;
}
            
function getVertexShader() {
    return `
        varying vec2 vUv;
        varying vec2 vUv2;
        attribute vec2 uv2;
        uniform vec2 lightmapOffset;
        uniform vec2 lightmapScale;

        void main()
        {
        vUv = uv;
        vUv2 = uv2;
        vUv2 *= lightmapScale;
        vUv2.x += lightmapOffset.x;
        vUv2.y -= lightmapOffset.y;
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        gl_Position = projectionMatrix * mvPosition;
    }
    `;
}

function getFragmentShader() {
    return `
        uniform sampler2D colorTexture;
        uniform sampler2D lightmapTexture;
        uniform vec4 mainColor;
        uniform float glow;
        uniform vec4 glowColour;  
        varying vec2 vUv;
        varying vec2 vUv2;

        void main( void ) {

                vec4 c = texture2D( colorTexture, vUv );
                vec4 l = texture2D( lightmapTexture, vUv2 );
                c.rgb *= mainColor.rgb;
                c.rgb *= l.rgb;
                c.rgb = mix(c.rgb, glowColour.rgb, glow);
                gl_FragColor = c;
                gl_FragColor.a = c.a;
        }
    `;
}

export default function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/singlelivingroom/Environment_SingleCouple.gltf')
  const { scene } = useThree() 
 
  useEffect(() => { 

    scene.traverse((child) => {

        if (child.isMesh === true) {
        
            //aTed's note:  here is a simple fix to stop objects being clipped in/out of view incorrectly  ....
            child.frustumCulled = false;

            if (child.material.emissiveMap != null && child.material.map != null) {
                // With lightmap
                // T.B.D handle cutout
                console.log('emissiveMap on: '+child.name)
                 setupLightmapShader(child, child.material);
            } else if (child.material.map != null) {
                // No lightmap (maybe for self illuminated things such as lamp shades!
                setupUnlitMaterial(child, child.material);
            } else {
                // No texture. This isn't handled very well but really we should not have any surfaces without textures
            }
        }

    });

  }, [scene])


  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Environment_SingleCouple">
        <group name="Environment_SingleCouple_1">
          <group name="ENV_SingleCouple_(1)">
            <group name="ENV3_DUM" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Walls01">
                <mesh name="Walls01_1" geometry={nodes.Walls01_1.geometry} material={nodes.Walls01_1.material} />
                <mesh
                  name="Walls01_2"
                  geometry={nodes.Walls01_2.geometry}
                  material={materials['ENV_SingleCouple-ENV2_Wall2']}
                />
                <mesh
                  name="Walls01_3"
                  geometry={nodes.Walls01_3.geometry}
                  material={materials['ENV_SingleCouple-ENV2_Wall']}
                />
                <mesh
                  name="Walls01_4"
                  geometry={nodes.Walls01_4.geometry}
                  material={materials['ENV_SingleCouple-ENV_Wall']}
                />
                <mesh
                  name="Walls01_5"
                  geometry={nodes.Walls01_5.geometry}
                  material={materials['ENV_SingleCouple-ENV2_Floor']}
                />
                <mesh name="Walls01_6" geometry={nodes.Walls01_6.geometry} material={nodes.Walls01_6.material} />
              </group>
            </group>
            <group
              name="Soderhamn_Pillows009"
              position={[0.23, 0.59, 0.86]}
              rotation={[Math.PI / 2, 0, -1.31]}
              scale={[0, 0, 0]}
            />
            <mesh
              name="Bar_Mesa"
              geometry={nodes.Bar_Mesa.geometry}
              material={nodes.Bar_Mesa.material}
              position={[-2.65, 0.88, -1.22]}
              rotation={[-0.09, 0, 0]}
              scale={[0.01, 0.01, 0.01]}
            />
            <mesh
              name="Bar_Metal"
              geometry={nodes.Bar_Metal.geometry}
              material={nodes.Bar_Metal.material}
              position={[-2.65, 0.43, -1.22]}
              rotation={[-0.09, 0, 0]}
              scale={[0.01, 0.01, 0.01]}
            />
            <mesh
              name="BarChair_Leatherwear_01"
              geometry={nodes.BarChair_Leatherwear_01.geometry}
              material={nodes.BarChair_Leatherwear_01.material}
              position={[-2.21, 0.77, -1.62]}
              rotation={[0, 0, 0]}
              scale={[0.01, 0.01, 0.01]}
            />
            <mesh
              name="BarChair_Leatherwear_002"
              geometry={nodes.BarChair_Leatherwear_002.geometry}
              material={nodes.BarChair_Leatherwear_002.material}
              position={[-2.21, 0.77, -0.73]}
              rotation={[0, 0, 0]}
              scale={[0.01, 0.01, 0.01]}
            />
            <mesh
              name="BarChair_Wood_01"
              geometry={nodes.BarChair_Wood_01.geometry}
              material={nodes.BarChair_Wood_01.material}
              position={[-2.21, 0.44, -1.62]}
              rotation={[0, 0, 0]}
              scale={[0.01, 0.01, 0.01]}
            />
            <mesh
              name="BarChair_Wood_002"
              geometry={nodes.BarChair_Wood_002.geometry}
              material={nodes.BarChair_Wood_002.material}
              position={[-2.21, 0.44, -0.73]}
              rotation={[0, 0, 0]}
              scale={[0.01, 0.01, 0.01]}
            />
            <mesh
              name="BFW180123_Book_01"
              geometry={nodes.BFW180123_Book_01.geometry}
              material={nodes.BFW180123_Book_01.material}
              position={[1.62, 0.31, 2.09]}
              rotation={[-Math.PI, 0, Math.PI]}
              scale={[0.01, 0.01, 0.01]}
            />
            <mesh
              name="BFW180123_Book_02"
              geometry={nodes.BFW180123_Book_02.geometry}
              material={nodes.BFW180123_Book_02.material}
              position={[1.99, 0.31, 2.1]}
              rotation={[-Math.PI, 0, Math.PI]}
              scale={[0.01, 0.01, 0.01]}
            />
            <mesh
              name="BFW180123_Book_03"
              geometry={nodes.BFW180123_Book_03.geometry}
              material={nodes.BFW180123_Book_03.material}
              position={[1.6, 1.09, 2.1]}
              rotation={[-Math.PI, 0, Math.PI]}
              scale={[0.01, 0.01, 0.01]}
            />
            <mesh
              name="BFW180123_Book_04"
              geometry={nodes.BFW180123_Book_04.geometry}
              material={nodes.BFW180123_Book_04.material}
              position={[1.6, 1.49, 2.12]}
              rotation={[-Math.PI, 0, Math.PI]}
              scale={[0.01, 0.01, 0.01]}
            />
            <mesh
              name="BFW180123_Book_05"
              geometry={nodes.BFW180123_Book_05.geometry}
              material={nodes.BFW180123_Book_05.material}
              position={[2.01, 1.09, 2.11]}
              rotation={[-Math.PI, 0, Math.PI]}
              scale={[0.01, 0.01, 0.01]}
            />
            <mesh
              name="BFW180123_Book_06"
              geometry={nodes.BFW180123_Book_06.geometry}
              material={nodes.BFW180123_Book_06.material}
              position={[1.66, 0.68, 2.12]}
              rotation={[-Math.PI, 0, Math.PI]}
              scale={[0.01, 0.01, 0.01]}
            />
            <mesh
              name="BFW180123_Book_07"
              geometry={nodes.BFW180123_Book_07.geometry}
              material={nodes.BFW180123_Book_07.material}
              position={[2.12, 0.69, 2.12]}
              rotation={[-Math.PI, 0, Math.PI]}
              scale={[0.01, 0.01, 0.01]}
            />
            <mesh
              name="BFW180123_Book_08"
              geometry={nodes.BFW180123_Book_08.geometry}
              material={nodes.BFW180123_Book_08.material}
              position={[1.18, 0.47, 2.14]}
              rotation={[-Math.PI, 0, Math.PI]}
              scale={[0.01, 0.01, 0.01]}
            />
            <mesh
              name="BFW180123_Book_10"
              geometry={nodes.BFW180123_Book_10.geometry}
              material={nodes.BFW180123_Book_10.material}
              position={[1.02, 1.48, 2.14]}
              rotation={[-Math.PI, 0, Math.PI]}
              scale={[0.01, 0.01, 0.01]}
            />
            <mesh
              name="BFW180123_Book_11"
              geometry={nodes.BFW180123_Book_11.geometry}
              material={nodes.BFW180123_Book_11.material}
              position={[1.06, 1.09, 2.04]}
              rotation={[-Math.PI, 0, Math.PI]}
              scale={[0.01, 0.01, 0.01]}
            />
            <group name="Brunsta" position={[-2.65, 1.65, -0.55]} rotation={[Math.PI / 2, 0, 0]} scale={[0, 0, 0]}>
              <mesh name="Brunsta_1" geometry={nodes.Brunsta_1.geometry} material={nodes.Brunsta_1.material} />
              <mesh name="Brunsta_2" geometry={nodes.Brunsta_2.geometry} material={materials['ENV_SingleCouple-Red']} />
              <mesh name="Brunsta_3" geometry={nodes.Brunsta_3.geometry} material={nodes.Brunsta_3.material} />
            </group>
            <mesh
              name="Cabinet_Light"
              geometry={nodes.Cabinet_Light.geometry}
              material={nodes.Cabinet_Light.material}
              position={[-4.4, 1.41, 1.25]}
              rotation={[-Math.PI, 0, Math.PI]}
              scale={[0.01, 0.01, 0.01]}
            />
            <mesh
              name="Cooker"
              geometry={nodes.Cooker.geometry}
              material={materials['ENV_SingleCouple-ENV2_Cooker']}
              position={[-4.18, 0.9, 0.55]}
              rotation={[-Math.PI, 0, Math.PI]}
              scale={[0.01, 0.01, 0.01]}
            />
            <mesh
              name="Cooker_Metal"
              geometry={nodes.Cooker_Metal.geometry}
              material={nodes.Cooker_Metal.material}
              position={[-4.18, 0.91, 0.55]}
              rotation={[-Math.PI, 0, Math.PI]}
              scale={[0.01, 0.01, 0.01]}
            />
            <mesh
              name="Corridor_Cabinet"
              geometry={nodes.Corridor_Cabinet.geometry}
              material={nodes.Corridor_Cabinet.material}
              position={[-4.21, 1.23, -0.26]}
              rotation={[0, -Math.PI / 2, 0]}
              scale={[0.01, 0.01, 0.01]}
            />
            <mesh
              name="Corridor_Cabinet_Occlusion"
              geometry={nodes.Corridor_Cabinet_Occlusion.geometry}
              material={materials['ENV_SingleCouple-BFW180123_NoBake_Black']}
              position={[-4.02, 0.85, -1.25]}
              rotation={[0, -Math.PI / 2, 0]}
              scale={[0.01, 0.01, 0.01]}
            />
            <mesh
              name="Corridor_CabinetDoor"
              geometry={nodes.Corridor_CabinetDoor.geometry}
              material={nodes.Corridor_CabinetDoor.material}
              position={[-3.9, 1.27, -0.26]}
              rotation={[0, -Math.PI / 2, 0]}
              scale={[0.01, 0.01, 0.01]}
            />
            <group name="DownLights" position={[2.51, 2.58, 1.3]} rotation={[Math.PI / 2, 0, 0]}>
              <mesh name="DownLights_1" geometry={nodes.DownLights_1.geometry} material={nodes.DownLights_1.material} />
              <mesh name="DownLights_2" geometry={nodes.DownLights_2.geometry} material={nodes.DownLights_2.material} />
            </group>
            <mesh
              name="ENV2_MetalCabinet"
              geometry={nodes.ENV2_MetalCabinet.geometry}
              material={nodes.ENV2_MetalCabinet.material}
              position={[3.32, 0, -0.12]}
              rotation={[Math.PI / 2, 0, -Math.PI]}
              scale={[0.01, 0.01, 0.01]}
            />
            <mesh
              name="Hemmes"
              geometry={nodes.Hemmes.geometry}
              material={nodes.Hemmes.material}
              position={[3.72, 0.86, 1.45]}
              rotation={[Math.PI / 2, 0, Math.PI]}
              scale={[0.01, 0.01, 0.01]}
            />
            <group
              name="JalousieBig_C"
              position={[1.16, 2.18, -2.45]}
              rotation={[-Math.PI, 0, Math.PI]}
              scale={[0.02, 0.01, 0.01]}>
              <mesh
                name="JalousieBig_C_1"
                geometry={nodes.JalousieBig_C_1.geometry}
                material={nodes.JalousieBig_C_1.material}
              />
              <mesh
                name="JalousieBig_C_2"
                geometry={nodes.JalousieBig_C_2.geometry}
                material={nodes.JalousieBig_C_2.material}
              />
            </group>
            <mesh
              name="Jorid"
              geometry={nodes.Jorid.geometry}
              material={nodes.Jorid.material}
              position={[1.59, 0, 0]}
              rotation={[Math.PI / 2, 0, 0]}
              scale={[0, 0, 0]}
            />
            <mesh
              name="Jorid_Tray"
              geometry={nodes.Jorid_Tray.geometry}
              material={nodes.Jorid_Tray.material}
              position={[1.6, 0.29, 0]}
              rotation={[Math.PI / 2, 0, 0]}
              scale={[0, 0, 0]}
            />
            <mesh
              name="Kitchen_Basin"
              geometry={nodes.Kitchen_Basin.geometry}
              material={nodes.Kitchen_Basin.material}
              position={[-4.18, 0.93, 2.03]}
              rotation={[-Math.PI, 0, Math.PI]}
              scale={[0.01, 0.01, 0.01]}
            />
            <mesh
              name="Kitchen_Cabinet"
              geometry={nodes.Kitchen_Cabinet.geometry}
              material={nodes.Kitchen_Cabinet.material}
              position={[-4.18, 1.22, 1.24]}
              rotation={[-Math.PI, 0, Math.PI]}
              scale={[0.01, 0.01, 0.01]}
            />
            <mesh
              name="Kitchen_CabinetDoor"
              geometry={nodes.Kitchen_CabinetDoor.geometry}
              material={nodes.Kitchen_CabinetDoor.material}
              position={[-3.9, 0.47, 1.24]}
              rotation={[-Math.PI, 0, Math.PI]}
              scale={[0.01, 0.01, 0.01]}
            />
            <mesh
              name="Kitchen_Mesa"
              geometry={nodes.Kitchen_Mesa.geometry}
              material={nodes.Kitchen_Mesa.material}
              position={[-4.17, 0.88, 1.24]}
              rotation={[-Math.PI, 0, Math.PI]}
              scale={[0.01, 0.01, 0.01]}
            />
            <mesh
              name="Light_White_001"
              geometry={nodes.Light_White_001.geometry}
              material={nodes.Light_White_001.material}
              position={[-4.4, 1.38, 1.25]}
              rotation={[Math.PI / 2, 0, -Math.PI]}
              scale={[0, 0, 0]}
            />
            <mesh
              name="Microwave_Control"
              geometry={nodes.Microwave_Control.geometry}
              material={materials['ENV_SingleCouple-BFW180123_Microwave_Control_Albedo']}
              position={[-3.9, 1.12, -1.25]}
              rotation={[0, -Math.PI / 2, 0]}
              scale={[0.01, 0.01, 0.01]}
            />
            <mesh
              name="Microwave_Metal"
              geometry={nodes.Microwave_Metal.geometry}
              material={materials['ENV_SingleCouple-BFW180123_Metal']}
              position={[-3.89, 0.9, -1.25]}
              rotation={[0, -Math.PI / 2, 0]}
              scale={[0.01, 0.01, 0.01]}
            />
            <mesh
              name="Microwave_Metal_Black"
              geometry={nodes.Microwave_Metal_Black.geometry}
              material={materials['ENV_SingleCouple-BFW180123_Microwave_Metal_Black']}
              position={[-3.91, 0.88, -1.25]}
              rotation={[0, -Math.PI / 2, 0]}
              scale={[0.01, 0.01, 0.01]}
            />
            <group name="Monstera" position={[3.56, 0, -1.82]} rotation={[Math.PI / 2, 0, 0]}>
              <mesh name="Monstera_1" geometry={nodes.Monstera_1.geometry} material={nodes.Monstera_1.material} />
              <mesh
                name="Monstera_2"
                geometry={nodes.Monstera_2.geometry}
                material={materials['ENV_SingleCouple-Tea']}
              />
              <mesh
                name="Monstera_3"
                geometry={nodes.Monstera_3.geometry}
                material={materials['ENV_SingleCouple-plantleaf']}
              />
            </group>
            <mesh
              name="PatternRug"
              geometry={nodes.PatternRug.geometry}
              material={materials['ENV_SingleCouple-ENV2_Rug']}
              position={[1.75, 0.02, -0.08]}
              rotation={[Math.PI / 2, 0, -Math.PI / 2]}
              scale={[1.14, 1.14, 1.14]}
            />
            <group name="Picture" position={[3.93, 1.34, 1.45]} rotation={[-Math.PI, 0, -3.05]}>
              <mesh name="Picture_1" geometry={nodes.Picture_1.geometry} material={nodes.Picture_1.material} />
              <mesh name="Picture_2" geometry={nodes.Picture_2.geometry} material={nodes.Picture_2.material} />
            </group>
            <group name="Shelf01" position={[2.23, 0.9, 2.06]} rotation={[0, -Math.PI / 2, 0]} scale={[0.2, 0.9, 3.67]}>
              <mesh name="Shelf01_1" geometry={nodes.Shelf01_1.geometry} material={nodes.Shelf01_1.material} />
              <mesh name="Shelf01_2" geometry={nodes.Shelf01_2.geometry} material={nodes.Shelf01_2.material} />
            </group>
            <group name="Shelf02" position={[1.33, 0.9, 2.06]} rotation={[0, -Math.PI / 2, 0]} scale={[0.2, 0.9, 3.67]}>
              <mesh name="Shelf02_1" geometry={nodes.Shelf02_1.geometry} material={nodes.Shelf02_1.material} />
              <mesh name="Shelf02_2" geometry={nodes.Shelf02_2.geometry} material={nodes.Shelf02_2.material} />
            </group>
            <group
              name="Soderhamn"
              position={[0.15, 0, -0.06]}
              rotation={[Math.PI / 2, 0, Math.PI / 2]}
              scale={[0, 0, 0]}>
              <mesh
                name="Soderhamn_1"
                geometry={nodes.Soderhamn_1.geometry}
                material={materials['ENV_SingleCouple-Soderhamn']}
              />
              <mesh name="Soderhamn_2" geometry={nodes.Soderhamn_2.geometry} material={nodes.Soderhamn_2.material} />
            </group>
            <mesh
              name="Soderhamn_Pillows1"
              geometry={nodes.Soderhamn_Pillows1.geometry}
              material={nodes.Soderhamn_Pillows1.material}
              position={[0.31, 0.58, 0.89]}
              rotation={[Math.PI / 2, 0, Math.PI / 2]}
              scale={[0, 0, 0]}
            />
            <mesh
              name="Soderhamn_Pillows2"
              geometry={nodes.Soderhamn_Pillows2.geometry}
              material={nodes.Soderhamn_Pillows2.material}
              position={[0.3, 0.61, 0.79]}
              rotation={[Math.PI / 2, 0, Math.PI / 2]}
              scale={[0, 0, 0]}
            />
            <mesh
              name="Soderhamn_Pillows3"
              geometry={nodes.Soderhamn_Pillows3.geometry}
              material={nodes.Soderhamn_Pillows3.material}
              position={[0.19, 0.7, 0.49]}
              rotation={[Math.PI / 2, 0, Math.PI / 2]}
              scale={[0, 0, 0]}
            />
            <mesh
              name="Soderhamn_Pillows4"
              geometry={nodes.Soderhamn_Pillows4.geometry}
              material={nodes.Soderhamn_Pillows4.material}
              position={[0.09, 0.66, 0.03]}
              rotation={[Math.PI / 2, 0, Math.PI / 2]}
              scale={[0, 0, 0]}
            />
            <mesh
              name="Soderhamn_Pillows5"
              geometry={nodes.Soderhamn_Pillows5.geometry}
              material={nodes.Soderhamn_Pillows5.material}
              position={[0.2, 0.67, -0.79]}
              rotation={[Math.PI / 2, 0, Math.PI / 2]}
              scale={[0, 0, 0]}
            />
            <mesh
              name="Soderhamn_Pillows6"
              geometry={nodes.Soderhamn_Pillows6.geometry}
              material={nodes.Soderhamn_Pillows6.material}
              position={[0.31, 0.59, -1.11]}
              rotation={[Math.PI / 2, 0, Math.PI / 2]}
              scale={[0, 0, 0]}
            />
            <mesh
              name="Soderhamn_Pillows010"
              geometry={nodes.Soderhamn_Pillows010.geometry}
              material={nodes.Soderhamn_Pillows010.material}
              position={[0.24, 0.56, 0.96]}
              rotation={[Math.PI / 2, 0, -1.22]}
              scale={[0, 0, 0]}
            />
            <group
              name="TVStand001"
              position={[3.3, 1.04, -0.13]}
              rotation={[Math.PI / 2, 0, Math.PI / 2]}
              scale={[1.61, 1.61, 1.61]}>
              <mesh name="TVStand001_1" geometry={nodes.TVStand001_1.geometry} material={nodes.TVStand001_1.material} />
              <mesh name="TVStand001_2" geometry={nodes.TVStand001_2.geometry} material={nodes.TVStand001_2.material} />
            </group>
            <group     scale={[.66,.8,.9]} name="WindowsDoorFireplaceStone001" position={[-4.79, 0.26, .3]} rotation={[Math.PI / 2, 0, 0]}>
              {/* <mesh 
                name="WindowsDoorFireplaceStone001_1"
                geometry={nodes.WindowsDoorFireplaceStone001_1.geometry}
                material={nodes.WindowsDoorFireplaceStone001_1.material}
              /> */}
              {/* <mesh
                name="WindowsDoorFireplaceStone001_2"
                geometry={nodes.WindowsDoorFireplaceStone001_2.geometry}
                material={nodes.WindowsDoorFireplaceStone001_2.material}
              />
              <mesh
                name="WindowsDoorFireplaceStone001_3"
                geometry={nodes.WindowsDoorFireplaceStone001_3.geometry}
                material={nodes.WindowsDoorFireplaceStone001_3.material}
              /> */}
            </group>
          </group>
          <group name="InteractiveObjects">
            <group
              name="ENV1_Phone"
              position={[1.57, 0.28, 0.16]}
              rotation={[-Math.PI, 0.24, -Math.PI]}
              scale={[1.3, 1.3, 1.3]}
            />
            <group name="GetwellsoonCard" position={[1.65, 0.38, 0.17]} rotation={[Math.PI / 2, 0, 0.54]} />
            <group name="EN2_BusinessCard" position={[3.2, 0.63, 0.3]} rotation={[Math.PI / 2, 0, -0.79]} />
            <group name="ENV2_AccountancyCertificate" position={[2.75, 1.48, 2.3]} />
            <group name="Newspaper" position={[1.53, 0.29, -0.01]} rotation={[Math.PI / 2, 0, -2.44]} />
            <group name="FuneralLetter" position={[0.94, 0.56, 2.08]} rotation={[1.58, 0.01, 2.34]} />
            <mesh
              name="ENV1_Phone_1"
              geometry={nodes.ENV1_Phone_1.geometry}
              material={materials.ENV1_MobilePhoneBlank_MAT}
              position={[1.68, 0.28, 0.21]}
              rotation={[0, 1.36, 0]}
              scale={[1.3, 1.3, 1.3]}
            />
            <mesh
              name="Notepad"
              geometry={nodes.Notepad.geometry}
              material={materials['No Name']}
              position={[0.99, 0.57, 2.03]}
              rotation={[0, 0.57, Math.PI / 2]}
            />
            <mesh
              name="Keys_Keyring"
              geometry={nodes.Keys_Keyring.geometry}
              material={materials.Keys_MAT}
              position={[3.2, 0.64, 0.41]}
              rotation={[0.8, -0.53, 1.87]}
            />
            <mesh
              name="ENV3_Letter"
              geometry={nodes.ENV3_Letter.geometry}
              material={materials.ENV3_Letter}
              position={[1.65, 0.27, -0.07]}
              rotation={[Math.PI / 2, 0, 1.09]}
            />
          </group>
          <group name="Characters">
            <mesh
              name="RobAndSindu"
              geometry={nodes.RobAndSindu.geometry}
              material={materials.RobAndSindu}
              position={[0.71, 0.69, -0.09]}
              rotation={[0, Math.PI / 2, 0]}
              scale={[1.6, 1.49, 1.06]}
            />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/singlelivingroom/Environment_SingleCouple.gltf')