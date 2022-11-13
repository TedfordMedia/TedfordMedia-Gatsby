import * as THREE from 'three'

var masterTool = function () {
    // var sceneScreenName = '123not set yet!!!';
   
    this.setupMainCamera = function (camera) {
        this.camera = camera;
    };
    
    this.start = function () {
        console.log('masterTool start');
    };

}

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

function sceneSetUnityLightMapShader(scene){
    scene.traverse((child) => {

        if (child.isMesh === true) {
        
            //aTed's note:  here is a simple fix to stop objects being clipped in/out of view incorrectly  ....
            child.frustumCulled = false;

            if (child.material.emissiveMap != null && child.material.map != null) {
                // With lightmap 
                console.log('emissiveMap on: '+child.name)
                setupLightmapShader(child, child.material);
            } else if (child.material.map != null) {
                // No lightmap (maybe for self illuminated things such as lamp shades!
                setupUnlitMaterial(child, child.material);
            } else {
               console.log('No texture. This isn\'t handled very well but really we should not have any surfaces without textures') 
            }
        }

    });
}

export {    
    sceneSetUnityLightMapShader,
    setupLightmapShader,
    setupUnlitMaterial,
    setTextureSettingBase,
    setTextureSettingLightmap,
    getVertexShader,
    getFragmentShader, 
    masterTool
};