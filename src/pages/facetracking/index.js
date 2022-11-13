
import styled from '@emotion/styled'  
 
import * as THREE from 'three'
import React, { Suspense, useRef, useMemo , useState,useEffect} from 'react'
import { Canvas, useThree, useLoader, useFrame } from '@react-three/fiber'
import { OrbitControls, useTexture, Html } from '@react-three/drei' 
import { css } from '@emotion/core'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Layout from "../../components/layoutwidellh"   
 
// import main script and neural network model from Jeeliz FaceFilter NPM package
import { JEELIZFACEFILTER, NN_4EXPR } from 'facefilter'
 
//move this into it's own file
//move this into it's own file
//move this into it's own file
const superThat = (function(){
  // internal settings:
  const _settings = {
    rotationOffsetX: 0.0, // negative -> look upper. in radians
    pivotOffsetYZ: [0.2, 0.6],// YZ of the distance between the center of the cube and the pivot. enable _settings.isDebugPivotPoint to set this value
    
    detectionThreshold: 0.8, // sensibility, between 0 and 1. Less -> more sensitive
    detectionHysteresis: 0.02,

    //tweakMoveYRotateX: 0,//0.5, // tweak value: move detection window along Y axis when rotate the face around X (look up <-> down)
    
    cameraMinVideoDimFov: 35 // Field of View for the smallest dimension of the video in degrees
  };
 
  let _threeFiberCompositeObjects = null, _threeProjMatrix = null;
  const _previousSizing = {
    width: 1, height: -1
  };

  let _threeTranslation = null,
      _maxFaces = -1,
      _detectCallback = null,
      _videoElement = null,
      _scaleW = 1,
      _canvasAspectRatio = -1;
  
  function detect(detectState){
    _threeFiberCompositeObjects.forEach(function(threeFiberCompositeObject, i){
      const threeCompositeObject = threeFiberCompositeObject;
      if (!threeCompositeObject) return;

      const isDetected = threeCompositeObject.visible;
      const ds = detectState[i];
      if (isDetected && ds.detected < _settings.detectionThreshold-_settings.detectionHysteresis){
        
        // DETECTION LOST
        if (_detectCallback) _detectCallback(i, false);
        threeCompositeObject.visible = false;
      } else if (!isDetected && ds.detected > _settings.detectionThreshold+_settings.detectionHysteresis){
        
        // FACE DETECTED
        if (_detectCallback) _detectCallback(i, true);
        threeCompositeObject.visible = true;
      }
    }); //end loop on all detection slots
  }

  function update_poses(ds, threeCamera){
    // tan( <horizontal FoV> / 2 ):
    const halfTanFOVX = Math.tan(threeCamera.aspect * threeCamera.fov * Math.PI/360); //tan(<horizontal FoV>/2), in radians (threeCamera.fov is vertical FoV)

    _threeFiberCompositeObjects.forEach(function(threeFiberCompositeObject, i){
      const threeCompositeObject = threeFiberCompositeObject;
      if (!threeCompositeObject) return;
      if (!threeCompositeObject.visible) return;
      const detectState = ds[i];

      // tweak Y position depending on rx:
      //const tweak = _settings.tweakMoveYRotateX * Math.tan(detectState.rx);
      const cz = Math.cos(detectState.rz), sz = Math.sin(detectState.rz);
      
      // relative width of the detection window (1-> whole width of the detection window):
      const W = detectState.s * _scaleW;

      // distance between the front face of the cube and the camera:
      const DFront = 1 / ( 2 * W * halfTanFOVX );
      
      // D is the distance between the center of the unit cube and the camera:
      const D = DFront + 0.5;

      // coords in 2D of the center of the detection window in the viewport:
      const xv = detectState.x * _scaleW;
      const yv = detectState.y * _scaleW;

      // coords in 3D of the center of the cube (in the view coordinates system):
      const z = -D;   // minus because view coordinate system Z goes backward
      const x = xv * D * halfTanFOVX;
      const y = yv * D * halfTanFOVX / _canvasAspectRatio;

      // set position before pivot:
      threeCompositeObject.position.set(-sz*_settings.pivotOffsetYZ[0], -cz*_settings.pivotOffsetYZ[0], -_settings.pivotOffsetYZ[1]);

      // set rotation and apply it to position:
      threeCompositeObject.rotation.set(detectState.rx+_settings.rotationOffsetX, detectState.ry, detectState.rz, "ZYX");
      threeCompositeObject.position.applyEuler(threeCompositeObject.rotation);

      // add translation part:
      _threeTranslation.set(x, y+_settings.pivotOffsetYZ[0], z+_settings.pivotOffsetYZ[1]);
      threeCompositeObject.position.add(_threeTranslation);
    }); //end loop on composite objects
  }

  // public methods:
  const that = {
    init: function(spec, threeObjects, detectCallback){
      _maxFaces = spec.maxFacesDetected;
      _videoElement = spec.videoElement;

      _threeFiberCompositeObjects = threeObjects;

      if (typeof(detectCallback) !== 'undefined'){
        _detectCallback = detectCallback;
      }

      _threeTranslation = new THREE.Vector3();
      _threeProjMatrix = new THREE.Matrix4();
    },

    update: function(detectStates, threeCamera){
      // update detection states then poses:
      detect(detectStates);
      update_poses(detectStates, threeCamera);
    }, 

    // create an occluder, IE a transparent object which writes on the depth buffer:
    create_occluder: function(occluderGeometry){
      const occluderMaterial = new THREE.ShaderMaterial({
          vertexShader: THREE.ShaderLib.basic.vertexShader,
          fragmentShader: "precision lowp float;\n void main(void){\n gl_FragColor=vec4(1.,0.,0.,1.);\n }",
          uniforms: THREE.ShaderLib.basic.uniforms,
          colorWrite: false
        });
      const occluderMesh = new THREE.Mesh(occluderGeometry, occluderMaterial);        
      occluderMesh.renderOrder = -1; // render first
      return occluderMesh;
    },
    
    update_camera: function(sizing, threeCamera){
      if (_maxFaces === -1) return; // not initialized

      // reset camera position:
      if (threeCamera.matrixAutoUpdate){
        threeCamera.matrixAutoUpdate = false;
        threeCamera.position.set(0, 0, 0);
        threeCamera.updateMatrix();
      }

      // compute aspectRatio:
      const cvw = sizing.width;
      const cvh = sizing.height;
      _canvasAspectRatio = cvw / cvh;

      // compute vertical field of view:
      const vw = _videoElement.videoWidth;
      const vh = _videoElement.videoHeight;
      const videoAspectRatio = vw / vh;
      const fovFactor = (vh > vw) ? (1.0 / videoAspectRatio) : 1.0;
      const fov = _settings.cameraMinVideoDimFov * fovFactor;
            
      // compute X and Y offsets in pixels:
      let scale = 1.0;
      if (_canvasAspectRatio > videoAspectRatio) {
        // the canvas is more in landscape format than the video, so we crop top and bottom margins:
        scale = cvw / vw;
      } else {
        // the canvas is more in portrait format than the video, so we crop right and left margins:
        scale = cvh / vh;
      }
      const cvws = vw * scale, cvhs = vh * scale;
      const offsetX = (cvws - cvw) / 2.0;
      const offsetY = (cvhs - cvh) / 2.0;
      _scaleW = cvw / cvws;

      if (_previousSizing.width === sizing.width && _previousSizing.height === sizing.height
        && threeCamera.fov === fov
        && threeCamera.view.offsetX === offsetX && threeCamera.view.offsetY === offsetY
        && threeCamera.projectionMatrix.equals(_threeProjMatrix) ){
       
        return; // nothing changed
      }
      Object.assign(_previousSizing, sizing);
      
      // apply parameters:
      threeCamera.aspect = _canvasAspectRatio;
      threeCamera.fov = fov;
      threeCamera.view = null;
      console.log('INFO in JeelizThreeFiberHelper.update_camera(): camera vertical estimated FoV is', fov, 'deg');
      threeCamera.setViewOffset(cvws, cvhs, offsetX, offsetY, cvw, cvh);
      threeCamera.updateProjectionMatrix();      
      _threeProjMatrix.copy(threeCamera.projectionMatrix);
    }
  }
  return that;
})();

const JeelizThreeFiberHelper = superThat;
  
const _maxFacesDetected = 1 // max number of detected faces
const _faceFollowers = new Array(_maxFacesDetected)
let _expressions = null

function Box() {
  const myytexture = useTexture('./images/tedmedlogos/square_logo_flipx.png')   
 
  const ref = useRef() 
  return (
    <mesh position={[0,0,0]} ref={ref} scale={1}>
      <boxGeometry />
      <meshBasicMaterial  color={"white"} map={myytexture} />
    </mesh>
  )
}

// This mesh follows the face. put stuffs in it.
// Its position and orientation is controlled by Jeeliz THREE.js helper
const FaceFollower = (props) => {
  // This reference will give us direct access to the mesh
  const objRef = useRef()

  useEffect(() => {
    const threeObject3D = objRef.current
    _faceFollowers[props.faceIndex] = threeObject3D  
  })
  
  const mouthOpenRef = useRef()
  const mouthSmileRef = useRef()

  useFrame(() => {
    if (mouthOpenRef.current){
      const s0 = props.expression.mouthOpen
      mouthOpenRef.current.scale.set(s0, 1, s0)
    }

    if (mouthSmileRef.current){
      const s1 = props.expression.mouthSmile
      mouthSmileRef.current.scale.set(s1, 1, s1)
    }
  })

  return (
    <object3D ref={objRef}>
      <Suspense fallback={<Html><h1 style={{color:'blue'}}>Loading...</h1></Html>}>   
          <Box /> 
      </Suspense>
 
      <mesh ref={mouthOpenRef} rotation={[Math.PI/2,0,0]} position={[0, -0.2, 0.2]}>
        <cylinderGeometry args={[0.3,0.3, 1, 32]} />
        <meshBasicMaterial color={0xff0000} />
      </mesh>

      <mesh ref={mouthSmileRef} rotation={[Math.PI/2,0,0]} position={[0, -0.2, 0.2]}>
        <cylinderGeometry args={[0.5,0.5, 1, 32, 1, false, -Math.PI/2, Math.PI]} />
        <meshBasicMaterial color={0xff0000} />
      </mesh>
    </object3D>
  )
}
 
// fake component, display nothing
// just used to get the Camera and the renderer used by React-fiber:
let _threeFiber = null
const DirtyHook = (props) => {
  _threeFiber = useThree()
  useFrame(JeelizThreeFiberHelper.update_camera.bind(null, props.sizing, _threeFiber.camera))
  return null
}
 
const compute_sizing = () => {
  // compute  size of the canvas:
  var height =500// window.innerHeight
  var wWidth = 500//window.innerWidth

  if (typeof window === `undefined`) {
    //
  } else {
      height = window.innerHeight
      wWidth = window.innerWidth;
      console.log('window.innerWidth:'+window.innerWidth)
      console.log('window.innerHeight:'+window.innerHeight)
  }
  
  const width = Math.min(wWidth, wWidth)

  // compute position of the canvas:
  const top = 0
  const left = (wWidth - width ) / 2
  return {width, height, top, left}
}
 
const MyPage = (props) => {

  // init state:
  _expressions = []
  for (let i = 0; i<_maxFacesDetected; ++i){
    _expressions.push({
      mouthOpen: 0,
      mouthSmile: 0,
      eyebrowFrown: 0,
      eyebrowRaised: 0
    })
  }  
  const [sizing, setSizing] = useState(compute_sizing())
  const [isInitialized] = useState(true)

  let _timerResize = null
  const handle_resize = () => {
    // do not resize too often:
    if (_timerResize){
      clearTimeout(_timerResize)
    }
    _timerResize = setTimeout(do_resize, 200)
  }
 
  const do_resize = () => {
    _timerResize = null
    const newSizing = compute_sizing()
    setSizing(newSizing)
  }
 
  useEffect(() => {
    if (!_timerResize) {
      JEELIZFACEFILTER.resize()
    }    
  }, [sizing])
 
  const callbackReady = (errCode, spec) => {
    if (errCode){
      console.log('AN ERROR HAPPENS. ERR =', errCode)
      return
    }

    console.log('INFO: JEELIZFACEFILTER IS READY')
    // there is only 1 face to track, so 1 face follower:
    JeelizThreeFiberHelper.init(spec, _faceFollowers, callbackDetect)    
  }
 
  const callbackTrack = (detectStatesArg) => {
    // if 1 face detection, wrap in an array:
    const detectStates = (detectStatesArg.length) ? detectStatesArg : [detectStatesArg]

    // update video and THREE faceFollowers poses:
    JeelizThreeFiberHelper.update(detectStates, _threeFiber.camera)

    // render the video texture on the faceFilter canvas:
    JEELIZFACEFILTER.render_video()

    // get expressions factors:
    detectStates.forEach((detectState, faceIndex) => {
      const exprIn = detectState.expressions
      const expression = _expressions[faceIndex]
      expression.mouthOpen = exprIn[0]
      expression.mouthSmile = exprIn[1]
      expression.eyebrowFrown = exprIn[2] // not used here
      expression.eyebrowRaised = exprIn[3] // not used here
    })    
  }
 
  const callbackDetect = (faceIndex, isDetected) => {
    if (isDetected) {
      console.log('DETECTED')
    } else {
      console.log('LOST')
    }
  }

  const faceFilterCanvasRef = useRef(null)
  useEffect(() => {
    window.addEventListener('resize', handle_resize)
    window.addEventListener('orientationchange', handle_resize)

    JEELIZFACEFILTER.init({
      canvas: faceFilterCanvasRef.current,
      NNC: NN_4EXPR,
      maxFacesDetected: 1,
      followZRot: true,
      callbackReady,
      callbackTrack
    })
    return JEELIZFACEFILTER.destroy
  }, [isInitialized])

  console.log('RENDER')

  return (
    <div>
      {/* Canvas managed by three fiber, for AR: */}
      <Canvas className='mirrorX' style={{
        position: 'fixed',
        zIndex: 2,
        ...sizing
      }}
      gl={{
        preserveDrawingBuffer: true // allow image capture
      }}
      updateDefaultCamera = {false}
      >
        <DirtyHook sizing={sizing} />
        <FaceFollower faceIndex={0} expression={_expressions[0]} />
      </Canvas>

    {/* Canvas managed by FaceFilter, just displaying the video (and used for WebGL computations) */}
      <canvas className='mirrorX' ref={faceFilterCanvasRef} style={{
        position: 'fixed',
        zIndex: 1,
        ...sizing
      }} width = {sizing.width} height = {sizing.height} />
    </div>
  )  
} 
 
export default MyPage  