export const VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const NOISE = /* glsl */ `
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
`;

export const FLOW_FRAG = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;
  ${NOISE}
  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    float n = snoise(p * 1.5 + vec2(uTime * 0.05, uTime * 0.03));
    float n2 = snoise(p * 3.0 - vec2(uTime * 0.08, 0.0));
    float v = smoothstep(-0.6, 0.8, n + n2 * 0.4);
    vec3 a = vec3(0.02, 0.03, 0.08);
    vec3 b = vec3(0.18, 0.22, 0.46);
    vec3 c = vec3(0.52, 0.18, 0.72);
    vec3 col = mix(a, b, v);
    col = mix(col, c, pow(v, 3.0) * 0.6);
    gl_FragColor = vec4(col, 1.0);
  }
`;

export const NOISE_FRAG = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;
  ${NOISE}
  void main() {
    vec2 p = vUv;
    float t = uTime * 0.1;
    float n = snoise(p * 4.0 + vec2(t, -t));
    n += snoise(p * 8.0 + vec2(-t, t)) * 0.5;
    n += snoise(p * 16.0) * 0.25;
    n *= 0.6;
    vec3 col = vec3(0.04, 0.04, 0.06) + vec3(n * 0.35, n * 0.22, n * 0.48);
    gl_FragColor = vec4(col, 1.0);
  }
`;

export const GRID_WARP_FRAG = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;
  ${NOISE}
  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    float warp = snoise(p * 1.5 + vec2(uTime * 0.1, 0.0)) * 0.1;
    vec2 g = (p + warp) * 10.0;
    vec2 grid = abs(fract(g) - 0.5);
    float line = smoothstep(0.48, 0.5, max(grid.x, grid.y));
    vec3 bg = vec3(0.02, 0.02, 0.05);
    vec3 fg = vec3(0.35, 0.6, 0.9);
    vec3 col = mix(bg, fg, line * 0.45);
    gl_FragColor = vec4(col, 1.0);
  }
`;

export const PARTICLES_FRAG = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;
  ${NOISE}
  float particle(vec2 uv, vec2 seed) {
    vec2 d = uv - seed;
    return smoothstep(0.02, 0.0, length(d));
  }
  void main() {
    vec2 p = vUv;
    float t = uTime * 0.15;
    float acc = 0.0;
    for (int i = 0; i < 24; i++) {
      float fi = float(i);
      vec2 seed = vec2(
        fract(sin(fi * 12.9898) * 43758.5453 + t * 0.3),
        fract(sin(fi * 78.233) * 43758.5453 - t * 0.2)
      );
      acc += particle(p, seed);
    }
    vec3 bg = vec3(0.015, 0.015, 0.04);
    vec3 fg = vec3(0.7, 0.85, 1.0);
    vec3 col = mix(bg, fg, clamp(acc, 0.0, 1.0));
    gl_FragColor = vec4(col, 1.0);
  }
`;

export const SHADER_VARIANTS = {
  flow: FLOW_FRAG,
  noise: NOISE_FRAG,
  "grid-warp": GRID_WARP_FRAG,
  particles: PARTICLES_FRAG,
} as const;

export type ShaderVariant = keyof typeof SHADER_VARIANTS;
