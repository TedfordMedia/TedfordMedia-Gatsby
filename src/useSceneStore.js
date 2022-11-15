import create from "zustand";

let useSceneStore = create((set) => ({
  settingsOpen: false,
  lastToken: null,
  thismytest: null,
  isMobile: false,
  ambientLightIntensity: 0.8,
  dirLightIntensity: 1.8,
  dirRadius: 4,
  dirBias: 0.39,
  amLightIntensity: 0.3,
  deviceLevelHeight: 0,
  dlPosX: 30,
  dlPosY: 48,
  dlPosZ: 50,
  clickedPosX: 0,
  clickedPosY: 0,
  scene: null,
  floorModelGltf: null,
  theScene: false,
  floorNodelName: "floor",
  cameraFOV: 30,
  camera: null,
  cameraInitPos: null,
  cameraInitRot: null,
  controlsTarget: null,
  physicallyCorrectLighting: true,
  floorModelOpacity: 1,
  floorWallColor: [0, 0, 0],
  floorWallWantColor: false,
  lidarY: 13,
  lidarOpacity: 1,
  wallsToSave: [],
  controls: null,
}));

export default useSceneStore;
