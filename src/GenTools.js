import gsap from "gsap";
import useSceneStore from "./useSceneStore";
import * as THREE from "three";
import { ENV_URLS } from "/static/env";
import { Text } from "troika-three-text";

function GenTools() {
  this.indexDB = null;
  this.blob = null;
  this.isMobile = false;
  this.request = null;
  this.BLOBS_DB_NAME = "DT_BLOBS_DB";
  this.BLOBS_DB_VERSION = 1;
  this.BLOBS_OBJECT_STORE_NAME = "DT_BLOBS_STORE";
  this.AZURE_BLOB_API_VERSION = "2019-12-12";
  this.blobSubtype = null;
  this.blobDescription = null;
  this.requests = [];
  this.envMap = false;
  var zthis = false;

  this.addLightMatLighting = function(scene) {
    scene.traverse((child) => {
      if (child.isMesh === true) {
        // a simple fix to stop objects being clipped in/out of view incorrectly  ....
        child.frustumCulled = false;

        if (child.material.emissiveMap != null && child.material.map != null) {
          this.setupLightmapShader(child, child.material);
        } else if (child.material.map != null) {
          // No lightmap (maybe for self illuminated things such as lamp shades!
          this.setupUnlitMaterial(child, child.material);
        }
      }
    });
  };
  this.setupUnlitMaterial = function(node, origMaterial) {
    var mat = new THREE.MeshBasicMaterial({
      map: origMaterial.map,
      color: origMaterial.color,
      transparent: origMaterial.transparent,
      alphaTest: origMaterial.alphaTest,
    });

    node.material = mat;

    this.setTextureSettingBase(origMaterial.map);
  };
  this.getVertexShader = function() {
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
  };
  this.getFragmentShader = function() {
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
  };
  this.addLightMatLighting = function(scene) {
    scene.traverse((child) => {
      if (child.isMesh === true) {
        if (!child.material.emissiveMap) {
          console.log("no emissive map");
        }

        if (child.material.emissiveMap != null && child.material.map != null) {
          console.log("YES hello emissive map");
          this.setupLightmapShader(child, child.material);
        } else if (child.material.map != null) {
          this.setupUnlitMaterial(child, child.material);
        }
      }
    });
  };
  this.setupLightmapShader = function(node, origMaterial) {
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
      vertexShader: this.getVertexShader(),
      fragmentShader: this.getFragmentShader(),
      transparent: origMaterial.transparent,
      alphaTest: origMaterial.alphaTest,
    });

    node.material = mat;

    this.setTextureSettingBase(origMaterial.map);
    this.setTextureSettingLightmap(origMaterial.emissiveMap);
  };
  this.setTextureSettingBase = function(map) {
    map.anisotropy = 8;
    map.minFilter = THREE.LinearMipmapLinearFilter;
    map.encoding = THREE.LinearEncoding;
  };

  this.setTextureSettingLightmap = function(map) {
    map.encoding = THREE.LinearEncoding;
  };
  this.init = function() {
    // this.setEnvMap();
    zthis = this;
  };
  this.keepCameraSettings = function(origPosition) {
    const camera = useSceneStore.getState().camera;
    const controls = useSceneStore.getState().controls;
    useSceneStore.setState({ cameraInitPos: camera.position.clone() });
    useSceneStore.setState({ cameraInitRot: camera.rotation.clone() });
    useSceneStore.setState({ controlsTarget: controls.target.clone() });
  };
  this.cameraToBegin = function() {
    const origPosition = useSceneStore.getState().cameraInitPos;
    const camera = useSceneStore.getState().camera;
    const cameraInitRot = useSceneStore.getState().cameraInitRot;
    const controls = useSceneStore.getState().controls;
    var controlTarget = useSceneStore.getState().controlsTarget;

    gsap.to(controls.target, {
      duration: 0.2,
      x: controlTarget.x,
      y: controlTarget.y,
      z: controlTarget.z,
      ease: "power4.out",
      onUpdate: function() {
        camera.updateProjectionMatrix();
      },
    });

    gsap.to(camera.rotation, {
      duration: 0.2,
      x: cameraInitRot.x,
      y: cameraInitRot.y,
      z: cameraInitRot.z,
      ease: "power4.out",
      onUpdate: function() {
        camera.updateProjectionMatrix();
      },
    });
    gsap.to(camera.position, {
      duration: 0.2,
      x: origPosition.x,
      y: origPosition.y,
      z: origPosition.z,
      ease: "power4.out",
      onUpdate: function() {
        camera.updateProjectionMatrix();
      },
    });
    this.easeZoom(1);
  };
  this.easeZoom = function(newzoom) {
    const camera = useSceneStore.getState().camera;
    gsap.to(camera, {
      duration: 0.3,
      zoom: newzoom,
      ease: "power4.out",
      onUpdate: function() {
        camera.updateProjectionMatrix();
      },
    });
  };

  this.findWallMaterials = function(thegltf) {
    console.log("findWallMaterials thegltf", thegltf);
    var wallsToSave = [];
    thegltf.traverse((child) => {
      if (child.isMesh === true) {
        if (child.material instanceof THREE.MeshStandardMaterial) {
          if (child.material.name.toLowerCase().includes("wall")) {
            var myarray = child.material.color.toArray();
            useSceneStore.setState({ floorWallColor: myarray });
            if (!child.material.map) {
              wallsToSave.push(child);
              if (useSceneStore.getState().floorWallWantColor) {
                var x = useSceneStore.getState().floorWallWantColor;
                child.material.color = new THREE.Color(
                  `rgb(${x[0] * 255}, ${x[1] * 255}, ${x[2] * 255})`
                );
              }
            }
          }
        }
      }
    });
    useSceneStore.setState({ wallsToSave: wallsToSave });
  };
  this.simpleGround = function(parent) {
    const planeGeometry = new THREE.PlaneGeometry(200, 200);
    const planeMaterial = new THREE.MeshPhongMaterial({
      color: 0x999999,
      shininess: 0,
      specular: 0x111111,
    });
    const ground = new THREE.Mesh(planeGeometry, planeMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.scale.multiplyScalar(3);
    ground.castShadow = true;
    ground.receiveShadow = true;
    parent.add(ground);
    return ground;
  };
  this.makeBasicRenderer = function() {
    var renderer = new THREE.WebGLRenderer({ antialias: true, autoSize: true });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    return renderer;
  };

  this.makeLoadingText = function(scene) {
    let myText = new Text();

    // Set properties to configure:
    myText.text = "Loading";
    myText.fontSize = 0.6;
    myText.color = 0x00ff00;
    myText.position.x = -0.8;

    // Update the rendering:
    myText.sync();
    scene.add(myText);
    return myText;
  };

  this.basicDirLight = function(scene) {
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    scene.add(directionalLight);
    directionalLight.castShadow = true;
    directionalLight.position.set(40, 200, -40);
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 500;
    directionalLight.shadow.camera.right = 17;
    directionalLight.shadow.camera.left = -17;
    directionalLight.shadow.camera.top = 17;
    directionalLight.shadow.camera.bottom = -17;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.radius = 4;
    directionalLight.shadow.bias = -0.0005;
  };
  this.getVectorFromInput = function(myvalue, addHeight) {
    var vector = new THREE.Vector3(
      myvalue.position.x,
      myvalue.position.y + addHeight,
      myvalue.position.z
    );
    return vector;
  };
  this.seekAllDevices = function(thegltf) {
    var devicesList = [];
    thegltf.traverse((child) => {
      if (child.userData && child.userData.isDevice) {
        console.log("child.rotation:", child.rotation);
        var mydata = {
          name: child.name,
          id: child.id,
          userData: child.userData,
          scale: child.scale,
          position: child.position,
          rotation: child.rotation,
          rotationx: child.rotation.x,
          rotationy: child.rotation.y.toString(),
          rotationz: child.rotation.z,
        };
        devicesList.push(mydata);
      }
    });
    return devicesList;
  };
  this.materialAndShadowsFix = function(child, withEnvMap) {
    if (child.isMesh === true) {
      zthis.standardiseTheMaterial(child.material, withEnvMap);

      child.castShadow = true;
      child.receiveShadow = true;
    }
  };
  this.WholesetModelOpacity = function(gltf, floorModelOpacity) {
    gltf.traverse((child) => {
      zthis.setModelOpacity(child, floorModelOpacity);
    });
  };
  this.setModelOpacity = function(child, opacity) {
    if (child.isMesh === true) {
      if (child.material instanceof THREE.MeshStandardMaterial) {
        if (!child.material.name.toLowerCase().includes("glass")) {
          child.material.transparent = true;
          child.material.opacity = opacity;
        }
      }
    }
  };
  this.standardiseTheMaterial = function(material, withEnvMap) {
    if (material instanceof THREE.MeshStandardMaterial) {
      if (withEnvMap) {
        // material.envMap = zthis.envMap;
      }
      material.needsUpdate = true;
      material.side = THREE.DoubleSide;
      material.emissive = new THREE.Color(0x000000);
    }
  };
  this.makeDoubleSided = function(child) {
    if (child.isMesh === true) {
      child.material.needsUpdate = true;
      child.material.side = THREE.DoubleSide;
    }
  };
  this.setEnvMap = function() {
    var envMap = new THREE.CubeTextureLoader().load(ENV_URLS);
    envMap.format = THREE.RGBFormat;
    envMap.mapping = THREE.CubeReflectionMapping;
    envMap.encoding = THREE.sRGBEncoding;
    return envMap;
  };
  this.applyGlass = function(gltf) {
    const envMap = this.setEnvMap();

    let glassMaterialExterior = new THREE.MeshPhysicalMaterial({
      metalness: .11,
      roughness: 0,
      clearcoat: 1,
      transmission: 1,
      specularIntensity: 1,
      envMap: envMap,
      sheen:1,
      clearcoatRoughness: 0,
      // color: "#7990e8",
      color: "#ffffff",
      reflectivity: .9,
      ior: 1,
      // side: THREE.DoubleSide,
      thickness: 0.5, // Add refraction!
    });
    let glassMaterialInterior = new THREE.MeshPhysicalMaterial({
      metalness: 0,
      roughness: 0.4,
      clearcoat: 0.5,
      transmission: 1,
      specularIntensity: 0.5,
      // envMap: envMap,
      sheen: 0.5,
      clearcoatRoughness: 0.1,
      color: "#5565a0",
      reflectivity: 0.2,
      ior: 1,
      // side: THREE.DoubleSide,
      // thickness: 0.5, // Add refraction!
    });
    gltf.traverse((child) => {
      if (child.isMesh === true) {
        if (child.material?.name.toLowerCase().includes("glass")) {
          let matName = child.material?.name.toLowerCase();
          console.log("child.material.name:", child.material.name);

          if (child.material?.name.toLowerCase().includes("internal")) {
            child.material = glassMaterialInterior;
          } else {
            child.material = glassMaterialExterior;
          }
          child.material.name = matName;
        }
      }
    });
  };
  this.basicTraverse = function(gltf) {
    gltf.traverse((child) => {
      if (child.isMesh === true) {
        child.frustumCulled = false;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  };

  this.init();
}
export default new GenTools();
