import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import LightTools from "./LightMapper";
// LightTools.helloWorld();
console.log(LightTools)
function setupLightmapShader(node, origMaterial) {
  let baseColour = new THREE.Vector4(
    origMaterial.color.r,
    origMaterial.color.g,
    origMaterial.color.b,
    origMaterial.color.a
  );

  var uniforms = {
    colorTexture: { value: origMaterial.map },
    mainColor: { value: baseColour },
    lightmapTexture: { value: origMaterial.emissiveMap },
    lightmapOffset: { value: origMaterial.emissiveMap.offset },
    lightmapScale: { value: origMaterial.emissiveMap.repeat },
    glow: { value: 0.0 },
    glowColour: { value: { x: 0.0, y: 1.0, z: 0.0, w: 1.0 } },
  };

  var mat = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: getVertexShader(),
    fragmentShader: getFragmentShader(),
    transparent: origMaterial.transparent,
    alphaTest: origMaterial.alphaTest,
  });

  node.material = mat;

  setTextureSettingBase(origMaterial.map);
  setTextureSettingLightmap(origMaterial.emissiveMap);
}

function setupUnlitMaterial(node, origMaterial) {
  var mat = new THREE.MeshBasicMaterial({
    map: origMaterial.map,
    color: origMaterial.color,
    transparent: origMaterial.transparent,
    alphaTest: origMaterial.alphaTest,
  });

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
  const group = useRef();
  const { nodes, materials } = useGLTF(
    "/models/Env_SwankyOffice5/Env_SwankyOffice.glb"
  );

  const { scene } = useThree();

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh === true) {
        child.frustumCulled = false;

        if (child.material.emissiveMap != null && child.material.map != null) {
          setupLightmapShader(child, child.material);
        } else if (child.material.map != null) {
          // No lightmap (maybe for self illuminated things such as lamp shades!
          setupUnlitMaterial(child, child.material);
        }
      }
    });
  }, [scene]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Env_SwankyOffice">
        <group
          name="Env_SwankyOffice_1"
          position={[0, 1, 0]}
          rotation={[0, -Math.PI / 2, 0]}
        >
          <group name="InteractiveObjects" position={[-1, -1, 1]}>
            <mesh
              name="Keys"
              geometry={nodes.Keys.geometry}
              material={materials.Keys_MAT}
              position={[-0.38, 1.76, -3.74]}
              rotation={[2.32, -0.51, -2.2]}
            >
              <group name="Hotspot" position={[0.13, 0.02, -0.11]} />
            </mesh>
            <mesh
              name="ENV4_Letter"
              geometry={nodes.ENV4_Letter.geometry}
              material={materials.ENV4_Letter}
              position={[2.09, 1.48, -1.65]}
              rotation={[Math.PI / 2, 0, -0.65]}
            >
              <group name="Hotspot_1" position={[0, 0, -0.27]} />
            </mesh>
            <mesh
              name="ENV1_Phone"
              geometry={nodes.ENV1_Phone.geometry}
              material={materials.ENV1_MobilePhoneBlank_MAT}
              position={[-0.58, 1.75, -2.36]}
              rotation={[-Math.PI, -0.91, -Math.PI]}
              scale={[1.3, 1.3, 1.3]}
            >
              <group name="Hotspot_2" position={[0, 0.18, 0]} />
            </mesh>
            <mesh
              name="Letterholder"
              geometry={nodes.Letterholder.geometry}
              material={materials.Letterholder_MAT}
              position={[2.74, 2.47, -2.85]}
              rotation={[Math.PI / 2, 0, -Math.PI]}
            >
              <group name="Hotspot_3" position={[0, 0, -0.32]} />
            </mesh>
          </group>

          <mesh
            name="Amoena"
            geometry={nodes.Amoena.geometry}
            material={nodes.Amoena.material}
            position={[-1.08, 0.37, 0]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="ArtFrames"
            geometry={nodes.ArtFrames.geometry}
            material={nodes.ArtFrames.material}
            position={[-2.23, 1.4, -1.86]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="Books"
            geometry={nodes.Books.geometry}
            material={nodes.Books.material}
            position={[1.99, 1.81, -2.64]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={[0.39, 0.39, 0.39]}
          />
          <mesh
            name="Branches"
            geometry={nodes.Branches.geometry}
            material={nodes.Branches.material}
            position={[-2.01, 1.02, -1.31]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="Bulb"
            geometry={nodes.Bulb.geometry}
            material={nodes.Bulb.material}
            position={[-1.7, 1.74, -0.36]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="Ceiling_"
            geometry={nodes.Ceiling_.geometry}
            material={nodes.Ceiling_.material}
            position={[-0.36, 2.96, -1.83]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[1.05, 1.05, 1.05]}
          />
          <mesh
            name="ChamferBox081"
            geometry={nodes.ChamferBox081.geometry}
            material={nodes.ChamferBox081.material}
            position={[-0.58, 0.01, -1.76]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="Curtain"
            geometry={nodes.Curtain.geometry}
            material={materials.Curtain_MAT}
            position={[1.21, 0, 0.16]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="Desk"
            geometry={nodes.Desk.geometry}
            material={nodes.Desk.material}
            position={[-1.75, 0, -1.91]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="DeskBooks"
            geometry={nodes.DeskBooks.geometry}
            material={nodes.DeskBooks.material}
            position={[2, 1.81, -2.64]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="Floor"
            geometry={nodes.Floor.geometry}
            material={materials.Env_So_WoodenFloot_MAT}
            position={[-0.17, 0, -1.88]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="Lamp"
            geometry={nodes.Lamp.geometry}
            material={nodes.Lamp.material}
            position={[-1.78, 0, -0.22]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="Laptop"
            geometry={nodes.Laptop.geometry}
            material={materials.Laptop_MAT}
            position={[-1.59, 0.75, -1.93]}
            rotation={[Math.PI / 2, 0, 1.3]}
            scale={[0.39, 0.39, 0.39]}
          />
          <mesh
            name="Loungechair"
            geometry={nodes.Loungechair.geometry}
            material={nodes.Loungechair.material}
            position={[1.24, 0.35, -0.53]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="OfficeChair"
            geometry={nodes.OfficeChair.geometry}
            material={nodes.OfficeChair.material}
            position={[-1.01, 0.01, -2.07]}
            rotation={[Math.PI / 2, 0, -Math.PI]}
          />
          <mesh
            name="Pot"
            geometry={nodes.Pot.geometry}
            material={nodes.Pot.material}
            position={[-1.78, 0, -0.22]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="Separè"
            geometry={nodes.Separè.geometry}
            material={materials.Separe_MAT}
            position={[-0.45, 0, -3.85]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="StylishLight"
            geometry={nodes.StylishLight.geometry}
            material={nodes.StylishLight.material}
            position={[-1.65, 1.7, -2.21]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="Walls"
            geometry={nodes.Walls.geometry}
            material={nodes.Walls.material}
            position={[-1.65, 0, 0.35]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <group
            name="WoodWallBase"
            position={[-1.65, 0, 0.35]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="WoodWallBase_1"
              geometry={nodes.WoodWallBase_1.geometry}
              material={materials.WhitewoodGrain_MAT}
            />
            <mesh
              name="WoodWallBase_2"
              geometry={nodes.WoodWallBase_2.geometry}
              material={nodes.WoodWallBase_2.material}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/Env_SwankyOffice5/Env_SwankyOffice.glb");
