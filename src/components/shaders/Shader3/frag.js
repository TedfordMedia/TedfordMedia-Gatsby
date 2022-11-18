export default /* glsl */ `
varying vec2 vUv;
varying float vDistort;

uniform float uTime;
uniform float uIntensity;

vec3 cosPalette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
  return a + b * cos(16.28318 * (c * t + d));
}     

void main() {
  float distort = vDistort * uIntensity;
  
  vec3 brightness = vec3(0.25, 0.55, 0.45);
  vec3 contrast = vec3(0.95, 0.95, 0.95);
  vec3 oscilation = vec3(.20, .950, .25);
  vec3 phase = vec3(1.0, 0.1, 0.1);

  vec3 red = vec3(1.0, 0.95, 0.5);
  vec3 blue = vec3(0.0, 0.5, 1.0);
  vec3 green = vec3(1.0, 1.0, 0.5);
  // vec3 color = cosPalette(distort, red, blue, oscilation, phase);
  vec3 color = cosPalette(distort,brightness, contrast, oscilation,phase);
  gl_FragColor = vec4(color, 1.0);
}  
`;
