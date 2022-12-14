import * as THREE from "three";

export var uniforms = {
  iGlobalTime: { type: "f", value: 1.0 },
  iResolution: { type: "v1", value: new THREE.Vector2() },
};

export const fragmentShader = `
      
    uniform vec2 iResolution;
    uniform float iGlobalTime;

    varying vec2 vUv; 

    void main(void)
    {
        float time=iGlobalTime*0.6;
        vec2 uv = (-1.0 + 2.0 *vUv)* 2.0;
    
        vec2 uv0=uv;
        float i0=1.4;
        float i1=1.9;
        float i2=1.4;
        float i4=0.6;
        for(int s=0;s<20;s++) {
            vec2 r;
            r=vec2(cos(uv.y*i0-i4+time/i1),sin(uv.x*i0-i4+time/i1))/i2;
            r+=vec2(-r.y,r.x)*0.3;
            uv.xy+=r-0.5;
            i0*=1.93;
            i1*=1.15;
            i2*=1.7;
            i4+=0.65+0.1*time*i1;
        }
        float r=sin(uv.x-time)*0.4+0.6;
        float b=sin(uv.y+time)*0.4+0.6;
        float g=0.0; 
        gl_FragColor = vec4(r,g,b,1.0);
    }`;

export const vertexShader = `
    varying vec2 vUv; 
    void main() {
        vUv = uv;
    
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0 );
        gl_Position = projectionMatrix * mvPosition;
    }
  `;
