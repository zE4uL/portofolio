import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';

// ============ CONFIG ============
const MODES = {
  desk: {
    num: '01', label: 'Desk View', nav: 'Desk',
    cam: { pos: [4.2, 2.8, 5.8], look: [0.2, 1.6, -0.5] },
    accent: '#5eead4',
    ambient: 0x241a3a,
    kicker: 'The Studio — 2026',
    title: 'I\'m <em>Ziaul</em> — a senior product designer at the intersection of craft and code.',
    body: 'I design calm, confident product surfaces and I build the tools that make me ship faster — agents, plugins, and prototypes. This is my studio. Poke around.',
    chips: ['Senior Product Designer', 'Design Systems', 'AI Tooling', 'Prototyping'],
    hint: { title: 'CLICK ANY OBJECT', action: 'explore' }
  },
  design: {
    num: '02', label: 'Design Work', nav: 'Design',
    cam: { pos: [-0.55, 2.1, 2.2], look: [-0.55, 1.9, -1.5] },
    accent: '#ec4899',
    ambient: 0x2a1030,
    kicker: 'Case Studies',
    title: 'Work that <em>actually ships</em>.',
    body: 'Zooming into the tablet — each project is a deep dive with the messy middle intact: decisions, tradeoffs, and the thing we cut at the eleventh hour.',
    rows: [
      ['Now Studio', 'Personal platform · 2025'],
      ['Ledger', 'Fintech rebuild · 0→1'],
      ['Orbit', 'B2B design system · 180+ tokens'],
      ['Echo', 'Voice AI · in flight']
    ],
    hint: { title: 'PRESS TO WAKE', action: 'open case' }
  },
  ai: {
    num: '03', label: 'AI Lab', nav: 'AI Lab',
    cam: { pos: [0.95, 2.05, 2.1], look: [0.95, 1.95, -1.5] },
    accent: '#5eead4',
    ambient: 0x0a1a2e,
    kicker: 'Terminal // ai_lab',
    title: 'Agents, skills, plugins — <em>vibe coding, with taste</em>.',
    body: 'My workflow is a stack of custom agents. Figma auditors, crit bots, spec→PR pipelines. When the primitives are right, vibe coding is real.',
    chips: ['Claude', 'Agents', 'MCP', 'Skills'],
    rows: [
      ['figma-auditor', 'MCP plugin'],
      ['design-crit', 'Local agent · taste'],
      ['spec→pr', 'Design spec → PR'],
      ['brand-brain', 'System-aware agent']
    ],
    hint: { title: 'RUN AGENT', action: 'deploy' }
  },
  gaming: {
    num: '04', label: 'Arcade', nav: 'Arcade',
    cam: { pos: [2.8, 1.7, 2.3], look: [2.6, 1.5, -1.2] },
    accent: '#a78bfa',
    ambient: 0x2a1450,
    kicker: 'Player 1 // ready',
    title: 'Off the clock, I\'m <em>grinding rank</em>.',
    body: 'I play games the way I design — systems first, aesthetics second, story welded to both.',
    chips: ['RPGs', 'Fighting', 'Roguelikes', 'Mecha'],
    hint: { title: 'PICK UP', action: 'play' }
  },
  shelf: {
    num: '05', label: 'Collection', nav: 'About',
    cam: { pos: [-1.4, 2.9, 2.4], look: [-3.8, 2.9, 0] },
    accent: '#a3e635',
    ambient: 0x152a1a,
    kicker: 'Who / What / Why',
    title: 'Designer by trade, <em>builder by compulsion</em>.',
    body: 'I sketch, I prototype, I ship. I collect figures, read too much sci-fi, and drink too much coffee.',
    stats: [['10y','designing'],['100+','projects'],['3','cats'],['∞','tabs']],
    hint: { title: 'INSPECT', action: 'pick up' }
  },
  contact: {
    num: '06', label: 'Signal', nav: 'Contact',
    cam: { pos: [3.6, 2.1, 2.5], look: [2.4, 1.8, -2.5] },
    accent: '#f472b6',
    ambient: 0x2a1030,
    kicker: 'Signal // incoming',
    title: 'Let\'s <em>build</em> something.',
    body: 'Open for senior IC and design-lead roles, AI-first product teams, and consulting.',
    rows: [
      ['ziaulislam.framer.website', 'portfolio'],
      ['hello@ziaulislam.dev', 'email'],
      ['@ziaulislam', 'github'],
      ['LinkedIn', 'formal intros']
    ],
    hint: { title: 'SEND SIGNAL', action: 'message' }
  }
};
const MODE_ORDER = ['desk','design','ai','gaming','shelf','contact'];

let currentMode = 'desk';
let scene, camera, renderer, clock, composer, bloomPass;
let camPos = new THREE.Vector3(), camTarget = new THREE.Vector3();
let camPosDest = new THREE.Vector3(), camTargetDest = new THREE.Vector3();
let mouseX = 0, mouseY = 0;
let raycaster, pointer;
let interactables = {};
let accentLight, ambientLight, rimLight, kbGlow, monitorGlow1, monitorGlow2, lampLight;
let particles, sparkles, screenParticles;
let godrayMesh;
let animatedMaterials = [];
let keyboardKeys = [];
let mugSteam;
let character;

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x05040a);
  scene.fog = new THREE.FogExp2(0x05040a, 0.055);

  const canvas = document.getElementById('canvas');
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 100);
  camPos.set(8, 5, 10); camTarget.set(0, 1.6, 0);
  camera.position.copy(camPos);
  camera.lookAt(camTarget);

  clock = new THREE.Clock();
  raycaster = new THREE.Raycaster();
  pointer = new THREE.Vector2();

  buildLights();
  buildWorld();
  buildParticles();
  buildPostFX();
  buildNav();
  bindEvents();

  setMode('desk', true);
  setTimeout(() => document.getElementById('loader').classList.add('hide'), 400);
  animate();
}

// ============ POSTFX ============
function buildPostFX() {
  composer = new EffectComposer(renderer);
  composer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  composer.setSize(window.innerWidth, window.innerHeight);
  composer.addPass(new RenderPass(scene, camera));

  bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.9, // strength
    0.6, // radius
    0.2  // threshold
  );
  composer.addPass(bloomPass);

  // Custom vignette + chromatic aberration + grain
  const finalShader = {
    uniforms: {
      tDiffuse: { value: null },
      uTime: { value: 0 },
      uVignette: { value: 1.2 },
      uCA: { value: 0.0022 },
      uGrain: { value: 0.05 }
    },
    vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `
      uniform sampler2D tDiffuse;
      uniform float uTime, uVignette, uCA, uGrain;
      varying vec2 vUv;
      float rand(vec2 co){ return fract(sin(dot(co, vec2(12.9898,78.233)))*43758.5453); }
      void main(){
        vec2 uv = vUv;
        vec2 c = uv - 0.5;
        float d = length(c);
        // Chromatic aberration (strongest at edges)
        float caAmt = uCA * d * 2.0;
        vec2 dir = normalize(c + 1e-6);
        vec3 col;
        col.r = texture2D(tDiffuse, uv - dir * caAmt).r;
        col.g = texture2D(tDiffuse, uv).g;
        col.b = texture2D(tDiffuse, uv + dir * caAmt).b;
        // Vignette
        float vig = smoothstep(0.95, 0.35, d * uVignette);
        col *= vig;
        // Film grain
        float g = (rand(uv + fract(uTime)) - 0.5) * uGrain;
        col += g;
        gl_FragColor = vec4(col, 1.0);
      }
    `
  };
  const finalPass = new ShaderPass(finalShader);
  composer.addPass(finalPass);
  composer.finalPass = finalPass;
  composer.addPass(new OutputPass());
}

// ============ LIGHTS ============
function buildLights() {
  ambientLight = new THREE.AmbientLight(0x241a3a, 0.35);
  scene.add(ambientLight);

  // Moonlight through window
  rimLight = new THREE.DirectionalLight(0x8a6ab0, 1.4);
  rimLight.position.set(-6, 8, -4);
  rimLight.target.position.set(0, 1.5, 0);
  rimLight.castShadow = true;
  rimLight.shadow.mapSize.set(2048, 2048);
  rimLight.shadow.camera.left = -8;
  rimLight.shadow.camera.right = 8;
  rimLight.shadow.camera.top = 8;
  rimLight.shadow.camera.bottom = -2;
  rimLight.shadow.camera.near = 0.5;
  rimLight.shadow.camera.far = 25;
  rimLight.shadow.bias = -0.0005;
  rimLight.shadow.radius = 4;
  scene.add(rimLight);
  scene.add(rimLight.target);

  // Colored accent (mode-dependent)
  accentLight = new THREE.PointLight(0x5eead4, 3, 7, 2);
  accentLight.position.set(0.3, 2.8, 0.5);
  scene.add(accentLight);

  // Warm fill from right
  const fill = new THREE.PointLight(0xf472b6, 1.6, 8, 2);
  fill.position.set(3.5, 3, 2);
  scene.add(fill);

  // Monitor screen emissive glow
  monitorGlow1 = new THREE.PointLight(0x5eead4, 2.5, 2.5, 2);
  monitorGlow1.position.set(0.95, 2.0, -1.0);
  scene.add(monitorGlow1);

  monitorGlow2 = new THREE.PointLight(0xec4899, 2.0, 2.2, 2);
  monitorGlow2.position.set(-0.55, 1.9, -1.0);
  scene.add(monitorGlow2);

  // Desk lamp spot
  lampLight = new THREE.SpotLight(0xfbbf24, 14, 4, Math.PI/4.5, 0.5, 1.8);
  lampLight.position.set(1.42, 2.37, -1.05);
  lampLight.target.position.set(0.3, 1.4, -0.9);
  lampLight.castShadow = true;
  lampLight.shadow.mapSize.set(1024, 1024);
  lampLight.shadow.bias = -0.0005;
  scene.add(lampLight);
  scene.add(lampLight.target);

  // Keyboard RGB underglow
  kbGlow = new THREE.PointLight(0xec4899, 1.8, 1.2, 2);
  kbGlow.position.set(0.2, 1.36, -0.75);
  scene.add(kbGlow);

  // Hemisphere for soft ambience
  const hemi = new THREE.HemisphereLight(0x8a6ab0, 0x1a0a2a, 0.35);
  scene.add(hemi);
}

// ============ WORLD ============
function buildWorld() {
  const wallMat = new THREE.MeshStandardMaterial({ color: 0x161024, roughness: 0.95, metalness: 0.0 });
  const wallMatDark = new THREE.MeshStandardMaterial({ color: 0x0f0a1d, roughness: 0.95, metalness: 0.0 });
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x0a0714, roughness: 0.6, metalness: 0.35
  });

  // Floor (reflective)
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  // Wood plank pattern on floor - subtle
  const floorPlankMat = new THREE.MeshStandardMaterial({
    color: 0x1a0f26, roughness: 0.85, metalness: 0.05,
    transparent: true, opacity: 0.35
  });
  for (let i = 0; i < 10; i++) {
    const plank = new THREE.Mesh(new THREE.PlaneGeometry(20, 0.03), floorPlankMat);
    plank.rotation.x = -Math.PI / 2;
    plank.position.set(0, 0.003, -10 + i * 2);
    scene.add(plank);
  }

  // Back wall
  const back = new THREE.Mesh(new THREE.PlaneGeometry(16, 8), wallMat);
  back.position.set(0, 4, -3);
  back.receiveShadow = true;
  scene.add(back);

  // Wall trim
  const trimMat = new THREE.MeshStandardMaterial({ color: 0x0a0714, roughness: 0.7 });
  const trim = new THREE.Mesh(new THREE.BoxGeometry(16, 0.15, 0.05), trimMat);
  trim.position.set(0, 0.075, -2.97);
  scene.add(trim);

  // Left / right walls
  const left = new THREE.Mesh(new THREE.PlaneGeometry(6, 8), wallMatDark);
  left.position.set(-4, 4, 0); left.rotation.y = Math.PI/2; left.receiveShadow = true;
  scene.add(left);
  const right = new THREE.Mesh(new THREE.PlaneGeometry(6, 8), wallMatDark);
  right.position.set(4, 4, 0); right.rotation.y = -Math.PI/2; right.receiveShadow = true;
  scene.add(right);

  // ========== WINDOW ==========
  const windowFrame = new THREE.Mesh(
    new THREE.BoxGeometry(3.4, 2.6, 0.12),
    new THREE.MeshStandardMaterial({ color: 0x050510, roughness: 0.3, metalness: 0.6 })
  );
  windowFrame.position.set(-2.2, 3.6, -2.94);
  scene.add(windowFrame);

  // Glowing sky behind window (canvas texture)
  const skyCanvas = document.createElement('canvas');
  skyCanvas.width = 512; skyCanvas.height = 512;
  const sctx = skyCanvas.getContext('2d');
  const grad = sctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#1a0e2e');
  grad.addColorStop(0.5, '#4a2a6e');
  grad.addColorStop(0.85, '#b85a8a');
  grad.addColorStop(1, '#ff8a5a');
  sctx.fillStyle = grad;
  sctx.fillRect(0, 0, 512, 512);
  // stars
  for (let i = 0; i < 80; i++) {
    sctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.9})`;
    sctx.fillRect(Math.random() * 512, Math.random() * 280, 1 + Math.random(), 1 + Math.random());
  }
  // moon
  sctx.fillStyle = 'rgba(255,240,200,0.95)';
  sctx.beginPath(); sctx.arc(380, 110, 28, 0, Math.PI*2); sctx.fill();
  sctx.fillStyle = 'rgba(255,240,200,0.25)';
  sctx.beginPath(); sctx.arc(380, 110, 50, 0, Math.PI*2); sctx.fill();
  // mountains
  sctx.fillStyle = '#0a0818';
  sctx.beginPath();
  sctx.moveTo(0, 380);
  sctx.lineTo(80, 320); sctx.lineTo(160, 360); sctx.lineTo(240, 300);
  sctx.lineTo(320, 340); sctx.lineTo(400, 310); sctx.lineTo(512, 350);
  sctx.lineTo(512, 512); sctx.lineTo(0, 512); sctx.closePath(); sctx.fill();

  const skyTex = new THREE.CanvasTexture(skyCanvas);
  skyTex.colorSpace = THREE.SRGBColorSpace;
  const windowGlow = new THREE.Mesh(
    new THREE.PlaneGeometry(3.2, 2.4),
    new THREE.MeshBasicMaterial({ map: skyTex })
  );
  windowGlow.position.set(-2.2, 3.6, -2.87);
  scene.add(windowGlow);

  // Mullions
  const mullionMat = new THREE.MeshStandardMaterial({ color: 0x050510, roughness: 0.4, metalness: 0.5 });
  const mh = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.08, 0.06), mullionMat);
  mh.position.set(-2.2, 3.6, -2.85); scene.add(mh);
  const mv = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.4, 0.06), mullionMat);
  mv.position.set(-2.2, 3.6, -2.85); scene.add(mv);

  // Volumetric light shaft (god-ray) — cone from window
  const godrayGeom = new THREE.ConeGeometry(2.2, 5, 32, 1, true);
  const godrayMat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color(0x8a6ab0) } },
    vertexShader: `varying vec2 vUv; varying float vY; void main(){ vUv=uv; vY=position.y; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `
      uniform float uTime; uniform vec3 uColor;
      varying vec2 vUv; varying float vY;
      void main(){
        float t = smoothstep(-2.5, 2.5, vY);
        float edge = smoothstep(0.0, 0.5, 1.0 - abs(vUv.x - 0.5) * 2.0);
        float noise = sin(vY*4.0 + uTime*1.2) * 0.1 + sin(vY*9.0 - uTime*0.7)*0.05;
        float a = (1.0 - t) * edge * (0.18 + noise);
        gl_FragColor = vec4(uColor, a);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide
  });
  godrayMesh = new THREE.Mesh(godrayGeom, godrayMat);
  godrayMesh.position.set(-1.2, 2.0, -1.2);
  godrayMesh.rotation.set(-0.5, 0.6, 0.3);
  scene.add(godrayMesh);
  animatedMaterials.push(godrayMat);

  // ========== DESK ==========
  const deskGroup = new THREE.Group();
  const deskTopMat = new THREE.MeshStandardMaterial({
    color: 0x3a2a1c,
    roughness: 0.65,
    metalness: 0.08
  });
  // Wood grain procedural via canvas
  const woodCanvas = document.createElement('canvas');
  woodCanvas.width = 1024; woodCanvas.height = 256;
  const wctx = woodCanvas.getContext('2d');
  wctx.fillStyle = '#3a2a1c'; wctx.fillRect(0,0,1024,256);
  for (let i = 0; i < 30; i++) {
    wctx.strokeStyle = `rgba(${20+Math.random()*30},${10+Math.random()*20},${5+Math.random()*10},${0.2+Math.random()*0.4})`;
    wctx.lineWidth = 0.5 + Math.random()*1.5;
    wctx.beginPath();
    wctx.moveTo(0, Math.random()*256);
    for (let x = 0; x < 1024; x += 20) {
      wctx.lineTo(x, Math.random()*256);
    }
    wctx.stroke();
  }
  const woodTex = new THREE.CanvasTexture(woodCanvas);
  woodTex.colorSpace = THREE.SRGBColorSpace;
  woodTex.wrapS = woodTex.wrapT = THREE.RepeatWrapping;
  deskTopMat.map = woodTex;

  const deskTop = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.1, 1.5), deskTopMat);
  deskTop.position.set(0, 1.38, -1.2);
  deskTop.castShadow = true; deskTop.receiveShadow = true;
  deskGroup.add(deskTop);

  // Desk edge beveling (additional thin plate on top edge)
  const edgeMat = new THREE.MeshStandardMaterial({ color: 0x2a1f12, roughness: 0.6, metalness: 0.15 });
  const edge = new THREE.Mesh(new THREE.BoxGeometry(5.22, 0.02, 1.52), edgeMat);
  edge.position.set(0, 1.44, -1.2);
  deskGroup.add(edge);

  // Drawer pedestals
  const drawerMat = new THREE.MeshStandardMaterial({ color: 0x22180e, roughness: 0.8 });
  [-2.2, 2.2].forEach(x => {
    const drawer = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.33, 1.35), drawerMat);
    drawer.position.set(x, 0.67, -1.2);
    drawer.castShadow = true; drawer.receiveShadow = true;
    deskGroup.add(drawer);
    // drawer seams
    [0.2, -0.2].forEach(y => {
      const seam = new THREE.Mesh(new THREE.BoxGeometry(0.71, 0.005, 1.355), new THREE.MeshBasicMaterial({ color: 0x0a0510 }));
      seam.position.set(x, 0.67 + y, -1.2);
      deskGroup.add(seam);
    });
    // pulls
    [0.2, -0.2].forEach(y => {
      const pull = new THREE.Mesh(
        new THREE.CylinderGeometry(0.025, 0.025, 0.14, 16),
        new THREE.MeshStandardMaterial({ color: 0xb0a89c, metalness: 0.9, roughness: 0.25 })
      );
      pull.rotation.z = Math.PI/2;
      pull.position.set(x + (x < 0 ? 0.355 : -0.355), 0.67 + y, -0.58);
      deskGroup.add(pull);
    });
  });
  scene.add(deskGroup);

  // ========== MAIN MONITOR — detailed ==========
  const monitor1 = createDetailedMonitor(1.7, 1.05, 'ai');
  monitor1.position.set(0.95, 2.05, -1.5);
  monitor1.userData.mode = 'ai';
  scene.add(monitor1);
  interactables.ai = monitor1;

  // Secondary monitor
  const monitor2 = createDetailedMonitor(1.15, 0.75, 'design');
  monitor2.position.set(-0.55, 1.95, -1.5);
  monitor2.rotation.y = 0.28;
  monitor2.userData.mode = 'design';
  scene.add(monitor2);
  interactables.design = monitor2;

  // ========== MECHANICAL KEYBOARD ==========
  const kb = new THREE.Group();
  const kbBase = new THREE.Mesh(
    new THREE.BoxGeometry(1.05, 0.05, 0.38),
    new THREE.MeshStandardMaterial({ color: 0x0f0a1a, roughness: 0.5, metalness: 0.4 })
  );
  kbBase.position.set(0.2, 1.455, -0.75);
  kbBase.castShadow = true;
  kb.add(kbBase);
  // aluminum bottom strip (for rgb reflection visual)
  const kbStrip = new THREE.Mesh(
    new THREE.BoxGeometry(1.05, 0.005, 0.38),
    new THREE.MeshStandardMaterial({ color: 0xec4899, emissive: 0xec4899, emissiveIntensity: 2.0 })
  );
  kbStrip.position.set(0.2, 1.428, -0.75);
  kb.add(kbStrip);

  // Keycaps — mechanical with proper height & bevel
  const keyMat = new THREE.MeshStandardMaterial({ color: 0x1a1530, roughness: 0.45, metalness: 0.05 });
  const keyMatAccent = new THREE.MeshStandardMaterial({ color: 0xec4899, emissive: 0xec4899, emissiveIntensity: 0.4, roughness: 0.4 });
  const specialKeys = { '0,0': true, '0,13': true, '3,0': true, '3,13': true, '2,5': true };
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 14; c++) {
      const isAccent = specialKeys[`${r},${c}`];
      const key = new THREE.Mesh(
        new THREE.BoxGeometry(0.058, 0.025, 0.058),
        isAccent ? keyMatAccent : keyMat
      );
      key.position.set(-0.25 + c * 0.07, 1.495, -0.89 + r * 0.072);
      key.castShadow = true;
      kb.add(key);
      keyboardKeys.push(key);
    }
  }
  // Spacebar
  const space = new THREE.Mesh(
    new THREE.BoxGeometry(0.34, 0.025, 0.058),
    keyMat
  );
  space.position.set(0.24, 1.495, 1.495-0.89+3*0.072-2.125);
  space.position.set(0.22, 1.495, -0.89 + 4 * 0.072);
  space.castShadow = true;
  kb.add(space);
  keyboardKeys.push(space);
  scene.add(kb);

  // ========== MOUSE (better shape) ==========
  const mouseGeom = new THREE.SphereGeometry(0.08, 24, 20);
  mouseGeom.scale(1.0, 0.55, 1.4);
  const mouseMat = new THREE.MeshStandardMaterial({ color: 0x1a1428, roughness: 0.25, metalness: 0.5 });
  const mouse = new THREE.Mesh(mouseGeom, mouseMat);
  mouse.position.set(1.1, 1.49, -0.75);
  mouse.castShadow = true;
  scene.add(mouse);
  // mouse wheel
  const wheel = new THREE.Mesh(
    new THREE.CylinderGeometry(0.015, 0.015, 0.035, 16),
    new THREE.MeshStandardMaterial({ color: 0x5eead4, emissive: 0x5eead4, emissiveIntensity: 0.6 })
  );
  wheel.rotation.x = Math.PI / 2;
  wheel.rotation.z = Math.PI / 2;
  wheel.position.set(1.1, 1.52, -0.85);
  scene.add(wheel);

  // ========== MUG with steam ==========
  const mug = new THREE.Mesh(
    new THREE.CylinderGeometry(0.115, 0.1, 0.24, 28),
    new THREE.MeshStandardMaterial({ color: 0xf5f1e8, roughness: 0.55, metalness: 0.05 })
  );
  mug.position.set(-1.85, 1.55, -0.85);
  mug.castShadow = true;
  scene.add(mug);
  // mug rim
  const mugRim = new THREE.Mesh(
    new THREE.TorusGeometry(0.115, 0.012, 8, 28),
    new THREE.MeshStandardMaterial({ color: 0xe5dcc8, roughness: 0.5 })
  );
  mugRim.rotation.x = Math.PI / 2;
  mugRim.position.set(-1.85, 1.67, -0.85);
  scene.add(mugRim);
  // coffee
  const coffee = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.095, 0.015, 24),
    new THREE.MeshStandardMaterial({ color: 0x2a1a0a, roughness: 0.15, metalness: 0.5 })
  );
  coffee.position.set(-1.85, 1.665, -0.85);
  scene.add(coffee);
  // handle
  const handle = new THREE.Mesh(
    new THREE.TorusGeometry(0.065, 0.016, 10, 20, Math.PI),
    new THREE.MeshStandardMaterial({ color: 0xf5f1e8, roughness: 0.5 })
  );
  handle.position.set(-1.73, 1.55, -0.85);
  handle.rotation.y = Math.PI / 2;
  scene.add(handle);
  // logo on mug
  const mugLogoCanvas = document.createElement('canvas');
  mugLogoCanvas.width = 256; mugLogoCanvas.height = 128;
  const mlctx = mugLogoCanvas.getContext('2d');
  mlctx.fillStyle = '#f5f1e8'; mlctx.fillRect(0,0,256,128);
  mlctx.fillStyle = '#1a1530';
  mlctx.font = '700 28px "JetBrains Mono", monospace';
  mlctx.textAlign = 'center';
  mlctx.fillText('ø', 128, 76);
  mlctx.font = '500 12px "JetBrains Mono", monospace';
  mlctx.fillText('NOW STUDIO', 128, 100);
  const mugLogoTex = new THREE.CanvasTexture(mugLogoCanvas);
  mugLogoTex.colorSpace = THREE.SRGBColorSpace;
  const mugLogo = new THREE.Mesh(
    new THREE.PlaneGeometry(0.16, 0.08),
    new THREE.MeshStandardMaterial({ map: mugLogoTex, transparent: true, roughness: 0.7 })
  );
  mugLogo.position.set(-1.85, 1.55, -0.735);
  scene.add(mugLogo);

  // steam particle system (point cloud)
  const steamGeom = new THREE.BufferGeometry();
  const steamCount = 40;
  const steamPos = new Float32Array(steamCount * 3);
  const steamPhase = new Float32Array(steamCount);
  for (let i = 0; i < steamCount; i++) {
    steamPos[i*3]   = -1.85 + (Math.random()-0.5)*0.08;
    steamPos[i*3+1] = 1.7 + Math.random()*0.4;
    steamPos[i*3+2] = -0.85 + (Math.random()-0.5)*0.08;
    steamPhase[i] = Math.random() * Math.PI * 2;
  }
  steamGeom.setAttribute('position', new THREE.BufferAttribute(steamPos, 3));
  steamGeom.userData = { phase: steamPhase };
  const steamMat = new THREE.PointsMaterial({
    color: 0xffffff, size: 0.06, transparent: true, opacity: 0.25,
    blending: THREE.AdditiveBlending, sizeAttenuation: true, depthWrite: false
  });
  mugSteam = new THREE.Points(steamGeom, steamMat);
  scene.add(mugSteam);

  // ========== DESK LAMP ==========
  const lamp = new THREE.Group();
  const lampBase = new THREE.Mesh(
    new THREE.CylinderGeometry(0.14, 0.16, 0.04, 24),
    new THREE.MeshStandardMaterial({ color: 0x1a1428, roughness: 0.3, metalness: 0.7 })
  );
  lampBase.position.set(1.85, 1.45, -1.1);
  lampBase.castShadow = true;
  lamp.add(lampBase);
  // Arm with joints
  const arm1 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.022, 0.022, 0.95, 12),
    new THREE.MeshStandardMaterial({ color: 0x3a3450, metalness: 0.6, roughness: 0.4 })
  );
  arm1.position.set(1.85, 1.93, -1.1);
  arm1.castShadow = true;
  lamp.add(arm1);
  const joint1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.035, 16, 16),
    new THREE.MeshStandardMaterial({ color: 0x1a1428, metalness: 0.8, roughness: 0.3 })
  );
  joint1.position.set(1.85, 2.4, -1.1);
  lamp.add(joint1);
  const arm2 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.02, 0.02, 0.55, 12),
    new THREE.MeshStandardMaterial({ color: 0x3a3450, metalness: 0.6, roughness: 0.4 })
  );
  arm2.position.set(1.6, 2.35, -1.05);
  arm2.rotation.z = Math.PI / 3;
  arm2.castShadow = true;
  lamp.add(arm2);
  // Head
  const lampHead = new THREE.Mesh(
    new THREE.ConeGeometry(0.18, 0.3, 20, 1, true),
    new THREE.MeshStandardMaterial({ color: 0x1a1428, side: THREE.DoubleSide, roughness: 0.3, metalness: 0.7 })
  );
  lampHead.position.set(1.38, 2.4, -1.05);
  lampHead.rotation.z = Math.PI / 2.5;
  lampHead.castShadow = true;
  lamp.add(lampHead);
  // Bulb
  const bulb = new THREE.Mesh(
    new THREE.SphereGeometry(0.07, 16, 16),
    new THREE.MeshStandardMaterial({ color: 0xffe0a0, emissive: 0xfbbf24, emissiveIntensity: 4 })
  );
  bulb.position.set(1.42, 2.37, -1.05);
  lamp.add(bulb);
  scene.add(lamp);

  // ========== CONTROLLER ==========
  const controller = new THREE.Group();
  const ctrlBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.42, 0.09, 0.24),
    new THREE.MeshStandardMaterial({ color: 0x0f0a1a, roughness: 0.3, metalness: 0.4 })
  );
  // round corners via instancing is complex — fake with spheres
  ctrlBody.position.set(2.65, 1.48, -0.7);
  ctrlBody.castShadow = true;
  controller.add(ctrlBody);
  // Grips
  [-0.14, 0.14].forEach(x => {
    const grip = new THREE.Mesh(
      new THREE.SphereGeometry(0.085, 20, 20),
      new THREE.MeshStandardMaterial({ color: 0x0f0a1a, roughness: 0.3, metalness: 0.4 })
    );
    grip.scale.set(1, 0.7, 1.3);
    grip.position.set(2.65 + x, 1.465, -0.6);
    grip.castShadow = true;
    controller.add(grip);
  });
  // Sticks
  [[-0.09, 0x5eead4], [0.09, 0xa78bfa]].forEach(([x, c]) => {
    const stickBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.03, 0.02, 16),
      new THREE.MeshStandardMaterial({ color: 0x2a2340 })
    );
    stickBase.position.set(2.65 + x, 1.525, -0.68);
    controller.add(stickBase);
    const stick = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.028, 0.03, 16),
      new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 0.5 })
    );
    stick.position.set(2.65 + x, 1.54, -0.68);
    controller.add(stick);
  });
  // D-pad
  const dpadMat = new THREE.MeshStandardMaterial({ color: 0x2a2340, roughness: 0.5 });
  ['h','v'].forEach(orient => {
    const dp = new THREE.Mesh(
      new THREE.BoxGeometry(orient === 'h' ? 0.055 : 0.018, 0.01, orient === 'h' ? 0.018 : 0.055),
      dpadMat
    );
    dp.position.set(2.55, 1.535, -0.78);
    controller.add(dp);
  });
  // ABXY buttons
  const btnColors = [0xa3e635, 0xec4899, 0x5eead4, 0xfbbf24];
  const btnPositions = [[0, -0.024], [0.024, 0], [0, 0.024], [-0.024, 0]];
  btnPositions.forEach(([dx, dz], i) => {
    const btn = new THREE.Mesh(
      new THREE.CylinderGeometry(0.012, 0.012, 0.01, 16),
      new THREE.MeshStandardMaterial({ color: btnColors[i], emissive: btnColors[i], emissiveIntensity: 0.3 })
    );
    btn.position.set(2.77 + dx, 1.535, -0.78 + dz);
    controller.add(btn);
  });
  controller.userData.mode = 'gaming';
  scene.add(controller);
  interactables.gaming = controller;

  // ========== TABLET (design interaction target) ==========
  const tablet = new THREE.Group();
  const tabletBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 0.02, 0.5),
    new THREE.MeshStandardMaterial({ color: 0x0a0610, roughness: 0.3, metalness: 0.6 })
  );
  tabletBody.position.set(-1.7, 1.45, -0.55);
  tabletBody.rotation.y = -0.3;
  tabletBody.castShadow = true;
  tablet.add(tabletBody);
  // active surface
  const tabletSurf = new THREE.Mesh(
    new THREE.PlaneGeometry(0.55, 0.38),
    new THREE.MeshStandardMaterial({ color: 0x1a0a2a, emissive: 0xec4899, emissiveIntensity: 0.12, roughness: 0.2 })
  );
  tabletSurf.rotation.x = -Math.PI / 2;
  tabletSurf.position.set(-1.7, 1.461, -0.55);
  tabletSurf.rotation.z = -0.3;
  tablet.add(tabletSurf);
  // stylus
  const stylus = new THREE.Mesh(
    new THREE.CylinderGeometry(0.008, 0.005, 0.22, 12),
    new THREE.MeshStandardMaterial({ color: 0x2a2340, metalness: 0.6, roughness: 0.3 })
  );
  stylus.rotation.z = Math.PI / 2.2;
  stylus.rotation.y = -0.3;
  stylus.position.set(-1.55, 1.47, -0.42);
  tablet.add(stylus);
  scene.add(tablet);

  // ========== CONSOLE UNDER DESK ==========
  const consoleBox = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 0.1, 0.45),
    new THREE.MeshStandardMaterial({ color: 0x0a0712, roughness: 0.2, metalness: 0.5 })
  );
  consoleBox.position.set(2.4, 0.2, -1.15);
  consoleBox.castShadow = true;
  scene.add(consoleBox);
  // LED strip
  const consoleLED = new THREE.Mesh(
    new THREE.BoxGeometry(0.4, 0.008, 0.008),
    new THREE.MeshBasicMaterial({ color: 0xa78bfa })
  );
  consoleLED.position.set(2.4, 0.26, -0.93);
  scene.add(consoleLED);
  // ventilation slits
  for (let i = 0; i < 6; i++) {
    const slit = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, 0.005, 0.3),
      new THREE.MeshBasicMaterial({ color: 0x050208 })
    );
    slit.position.set(2.2 + i * 0.08, 0.255, -1.15);
    scene.add(slit);
  }

  // ========== SHELVES + COLLECTIBLES ==========
  const shelfMat = new THREE.MeshStandardMaterial({ color: 0x2a2140, roughness: 0.7 });
  [2.3, 2.85, 3.4].forEach((y, i) => {
    const shelf = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 1.8), shelfMat);
    shelf.position.set(-3.95, y, 0);
    shelf.castShadow = true; shelf.receiveShadow = true;
    scene.add(shelf);
    // LED under shelf
    const shelfLED = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.004, 1.6), new THREE.MeshBasicMaterial({ color: 0x5eead4 }));
    shelfLED.position.set(-3.92, y - 0.025, 0);
    scene.add(shelfLED);
  });
  const shelfGroup = new THREE.Group();
  const chibi1 = createChibi(0xec4899, 0x2a1f44);
  chibi1.position.set(-3.9, 2.35, -0.5);
  chibi1.rotation.y = 0.3;
  shelfGroup.add(chibi1);
  const chibi2 = createChibi(0xa78bfa, 0x4a2a5a);
  chibi2.position.set(-3.9, 2.35, 0.2);
  chibi2.rotation.y = -0.2;
  shelfGroup.add(chibi2);
  const mecha = createMecha();
  mecha.position.set(-3.9, 2.9, 0);
  shelfGroup.add(mecha);
  const books = createBooks();
  books.position.set(-3.9, 3.45, -0.3);
  shelfGroup.add(books);
  const trophy = createTrophy();
  trophy.position.set(-3.9, 3.45, 0.4);
  shelfGroup.add(trophy);
  shelfGroup.userData.mode = 'shelf';
  scene.add(shelfGroup);
  interactables.shelf = shelfGroup;

  // ========== PLANT ==========
  const plant = createPlant();
  plant.position.set(3.2, 0, 1.2);
  scene.add(plant);

  // ========== WALL POSTER ==========
  const poster = createPoster();
  poster.position.set(2.0, 4.2, -2.93);
  poster.userData.mode = 'contact';
  scene.add(poster);
  interactables.contact = poster;

  // Second poster
  const poster2 = createPoster2();
  poster2.position.set(3.1, 3.8, -2.94);
  scene.add(poster2);

  // ========== CHAIR ==========
  const chair = createChair();
  scene.add(chair);

  // ========== CHARACTER (back of head + hands) ==========
  character = createCharacter();
  scene.add(character);

  // ========== PAPERS / NOTES on desk ==========
  const notes = createNotes();
  notes.position.set(1.5, 1.44, -0.9);
  scene.add(notes);

  // ========== BOOKS on desk ==========
  const deskBooks = createBooks();
  deskBooks.position.set(-1.5, 1.44, -1.6);
  deskBooks.scale.set(0.9, 0.9, 0.9);
  deskBooks.rotation.y = 0.3;
  scene.add(deskBooks);

  // ========== CABLE MANAGEMENT ==========
  const cableMat = new THREE.MeshStandardMaterial({ color: 0x0a0510, roughness: 0.8 });
  // Cable from monitor to desk, hanging
  const cableCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.95, 1.55, -1.6),
    new THREE.Vector3(1.0, 1.0, -1.65),
    new THREE.Vector3(1.1, 0.5, -1.5),
    new THREE.Vector3(2.2, 0.25, -1.2)
  ]);
  const cableGeom = new THREE.TubeGeometry(cableCurve, 30, 0.012, 8, false);
  const cable = new THREE.Mesh(cableGeom, cableMat);
  cable.castShadow = true;
  scene.add(cable);

  // ========== FLOOR TRIM GRID (subtle emissive) ==========
  const gridMat = new THREE.MeshBasicMaterial({ color: 0x5eead4, transparent: true, opacity: 0.08 });
  for (let i = -6; i <= 6; i += 2) {
    const line = new THREE.Mesh(new THREE.BoxGeometry(0.005, 0.001, 10), gridMat);
    line.position.set(i, 0.005, 0);
    scene.add(line);
  }
}

function createDetailedMonitor(w, h, mode) {
  const group = new THREE.Group();
  // Back / chassis
  const chassis = new THREE.Mesh(
    new THREE.BoxGeometry(w + 0.04, h + 0.04, 0.05),
    new THREE.MeshStandardMaterial({ color: 0x0a0714, roughness: 0.3, metalness: 0.7 })
  );
  chassis.position.z = -0.02;
  chassis.castShadow = true;
  group.add(chassis);
  // Bezel (thin frame)
  const bezel = new THREE.Mesh(
    new THREE.BoxGeometry(w + 0.015, h + 0.015, 0.02),
    new THREE.MeshStandardMaterial({ color: 0x050208, roughness: 0.3, metalness: 0.8 })
  );
  bezel.position.z = 0.01;
  group.add(bezel);
  // Screen emissive with texture
  const { texture } = createScreenTexture(mode);
  const screenMat = new THREE.MeshStandardMaterial({
    color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 1.1,
    emissiveMap: texture, map: texture, roughness: 0.15
  });
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(w, h), screenMat);
  screen.position.z = 0.022;
  group.add(screen);
  group.userData.screenMat = screenMat;
  // Screen gloss (specular highlight)
  const glossGeom = new THREE.PlaneGeometry(w, h);
  const glossMat = new THREE.MeshBasicMaterial({
    color: 0xffffff, transparent: true, opacity: 0.04, blending: THREE.AdditiveBlending
  });
  const gloss = new THREE.Mesh(glossGeom, glossMat);
  gloss.position.z = 0.023;
  group.add(gloss);
  // Bottom chin / brand
  const chin = new THREE.Mesh(
    new THREE.BoxGeometry(w + 0.01, 0.04, 0.025),
    new THREE.MeshStandardMaterial({ color: 0x0a0714, roughness: 0.4, metalness: 0.5 })
  );
  chin.position.set(0, -h/2 - 0.03, 0.01);
  group.add(chin);
  // LED on chin
  const led = new THREE.Mesh(
    new THREE.BoxGeometry(0.01, 0.004, 0.002),
    new THREE.MeshBasicMaterial({ color: mode === 'ai' ? 0x5eead4 : 0xec4899 })
  );
  led.position.set(w/2 - 0.05, -h/2 - 0.03, 0.015);
  group.add(led);
  // Stand — articulated
  const standCol = new THREE.Mesh(
    new THREE.BoxGeometry(0.08, 0.45, 0.06),
    new THREE.MeshStandardMaterial({ color: 0x0a0714, metalness: 0.6, roughness: 0.4 })
  );
  standCol.position.set(0, -h/2 - 0.25, -0.02);
  standCol.castShadow = true;
  group.add(standCol);
  const standBase = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.2, 0.025, 24),
    new THREE.MeshStandardMaterial({ color: 0x0a0714, metalness: 0.7, roughness: 0.3 })
  );
  standBase.position.set(0, -h/2 - 0.47, -0.02);
  standBase.castShadow = true;
  group.add(standBase);

  return group;
}

function createScreenTexture(mode) {
  const canvas = document.createElement('canvas');
  canvas.width = 1280; canvas.height = 800;
  const ctx = canvas.getContext('2d');

  if (mode === 'ai') {
    ctx.fillStyle = '#050810'; ctx.fillRect(0,0,1280,800);
    ctx.fillStyle = '#0a0f18'; ctx.fillRect(0,0,1280,44);
    ['#ec4899','#fbbf24','#5eead4'].forEach((c,i) => { ctx.fillStyle=c; ctx.beginPath(); ctx.arc(26+i*24,22,7,0,Math.PI*2); ctx.fill(); });
    ctx.fillStyle = '#8a82a0'; ctx.font='15px "JetBrains Mono", monospace'; ctx.textAlign='center';
    ctx.fillText('zia@studio ~/ai-lab — zsh — 100×40', 640, 26); ctx.textAlign='left';
    const lines = [
      ['$ claude --agent design-crit portfolio.tsx', '#5eead4'],
      ['  ▸ loading 14 design heuristics', '#8a82a0'],
      ['  ▸ mounting screenshots (24 frames)', '#8a82a0'],
      ['  ▸ context primed. reviewing…', '#8a82a0'],
      ['', null],
      ['❯ hero.cta — contrast: 3.8:1 (AA fail)', '#fbbf24'],
      ['  → suggest #f472b6 on #0a0714 (7.1:1)', '#c9c1d9'],
      ['❯ nav.link — hit target 32px (< 44px)', '#fbbf24'],
      ['  → bump padding 12px → 14px y', '#c9c1d9'],
      ['❯ h1.hero — hierarchy visually weak', '#fbbf24'],
      ['  → weight 500 → 600, tracking -2%', '#c9c1d9'],
      ['', null],
      ['$ claude-skill spec→pr --design=ledger.md', '#5eead4'],
      ['  reading design_spec.md  [✓]', '#8a82a0'],
      ['  generating TSX components  [✓]', '#8a82a0'],
      ['  running tests  [████████████░░] 78%', '#a78bfa'],
      ['  ✓ PR #412 opened — 14 files changed', '#a3e635'],
      ['', null],
      ['$ █', '#5eead4']
    ];
    ctx.font = '17px "JetBrains Mono", monospace';
    lines.forEach((l, i) => {
      if (l[0]) { ctx.fillStyle = l[1]; ctx.fillText(l[0], 40, 88 + i * 32); }
    });
    // Side panel — agent network
    ctx.strokeStyle = '#1a2a3a'; ctx.lineWidth = 1;
    ctx.strokeRect(880, 80, 360, 680);
    ctx.fillStyle = '#5eead4'; ctx.font = '12px "JetBrains Mono", monospace';
    ctx.fillText('AGENT NETWORK / 4 ACTIVE', 900, 110);
    const nodes = [[1000, 180], [1100, 260], [930, 300], [1160, 360], [1020, 450], [920, 540], [1110, 560]];
    nodes.forEach(n => { nodes.forEach(m => { if (Math.random() > 0.65) { ctx.strokeStyle='rgba(94,234,212,0.3)'; ctx.beginPath(); ctx.moveTo(n[0],n[1]); ctx.lineTo(m[0],m[1]); ctx.stroke(); } }); });
    nodes.forEach((n, i) => {
      ctx.fillStyle = i % 2 ? '#5eead4' : '#ec4899';
      ctx.beginPath(); ctx.arc(n[0], n[1], 5 + (i % 3) * 2, 0, Math.PI*2); ctx.fill();
    });
  } else if (mode === 'design') {
    ctx.fillStyle = '#16122a'; ctx.fillRect(0,0,1280,800);
    ctx.fillStyle = '#0a0818'; ctx.fillRect(0,0,1280,48);
    ctx.fillStyle = '#ec4899'; ctx.beginPath(); ctx.arc(24,24,6,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(44,24,6,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#5eead4'; ctx.beginPath(); ctx.arc(64,24,6,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#f5f1e8'; ctx.font = '14px "Space Grotesk", sans-serif'; ctx.textAlign='center';
    ctx.fillText('Now Studio — Case Studies', 640, 28); ctx.textAlign='left';
    // Left panel
    ctx.fillStyle = '#1a1530'; ctx.fillRect(0,48,120,752);
    ctx.fillStyle = '#534c66';
    for (let i = 0; i < 12; i++) ctx.fillRect(16, 70 + i*26, 80 - i*3, 5);
    // Right inspector
    ctx.fillStyle = '#1a1530'; ctx.fillRect(1160,48,120,752);
    // Canvas — 3 polished frames
    const frames = [
      { x: 160, y: 80, w: 280, h: 480, primary: '#ec4899', title: 'LEDGER' },
      { x: 480, y: 80, w: 280, h: 480, primary: '#5eead4', title: 'ORBIT' },
      { x: 800, y: 80, w: 280, h: 480, primary: '#a78bfa', title: 'ECHO' }
    ];
    frames.forEach(f => {
      ctx.fillStyle = '#f5f1e8'; ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.fillStyle = '#8a82a0'; ctx.font='11px "JetBrains Mono", monospace';
      ctx.fillText(f.title + ' / hero frame', f.x, f.y - 8);
      // hero image area
      ctx.fillStyle = f.primary; ctx.fillRect(f.x + 16, f.y + 16, f.w - 32, 180);
      ctx.fillStyle = 'rgba(255,255,255,0.2)'; ctx.beginPath(); ctx.arc(f.x + f.w/2, f.y + 106, 50, 0, Math.PI*2); ctx.fill();
      // text lines
      ctx.fillStyle = '#1a1530';
      ctx.fillRect(f.x + 16, f.y + 216, 160, 14);
      ctx.fillStyle = '#8a82a0';
      ctx.fillRect(f.x + 16, f.y + 240, f.w - 80, 7);
      ctx.fillRect(f.x + 16, f.y + 256, f.w - 50, 7);
      ctx.fillRect(f.x + 16, f.y + 272, f.w - 100, 7);
      // card
      ctx.fillStyle = '#16122a'; ctx.fillRect(f.x + 16, f.y + 300, f.w - 32, 110);
      ctx.fillStyle = f.primary;
      ctx.beginPath(); ctx.arc(f.x + 52, f.y + 340, 18, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = '#f5f1e8';
      ctx.fillRect(f.x + 82, f.y + 326, 140, 8);
      ctx.fillRect(f.x + 82, f.y + 344, 100, 6);
      ctx.fillRect(f.x + 16, f.y + 380, f.w - 32, 6);
      // CTA
      ctx.fillStyle = f.primary; ctx.fillRect(f.x + 16, f.y + f.h - 60, f.w - 32, 40);
      ctx.fillStyle = '#fff'; ctx.font='13px "JetBrains Mono", monospace'; ctx.textAlign='center';
      ctx.fillText('VIEW CASE STUDY  →', f.x + f.w/2, f.y + f.h - 35); ctx.textAlign='left';
    });
    // Cursor
    ctx.fillStyle = '#fff'; ctx.strokeStyle='#000'; ctx.lineWidth=1.5;
    ctx.beginPath();
    ctx.moveTo(560, 320); ctx.lineTo(560, 350); ctx.lineTo(570, 344); ctx.lineTo(578, 358); ctx.lineTo(584, 354); ctx.lineTo(576, 340); ctx.lineTo(586, 336); ctx.closePath();
    ctx.fill(); ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return { texture: tex };
}

function createChibi(bodyColor, hairColor) {
  const g = new THREE.Group();
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.13, 24, 20),
    new THREE.MeshStandardMaterial({ color: 0xf0d4ae, roughness: 0.7 })
  );
  head.position.y = 0.24; head.castShadow = true;
  g.add(head);
  // Hair
  const hair = new THREE.Mesh(
    new THREE.SphereGeometry(0.136, 20, 18, 0, Math.PI*2, 0, Math.PI/1.7),
    new THREE.MeshStandardMaterial({ color: hairColor, roughness: 0.8 })
  );
  hair.position.y = 0.24;
  g.add(hair);
  // Body
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.085, 0.1, 0.18, 16),
    new THREE.MeshStandardMaterial({ color: bodyColor, roughness: 0.5, metalness: 0.1 })
  );
  body.position.y = 0.06; body.castShadow = true;
  g.add(body);
  // Eyes
  [-0.04, 0.04].forEach(x => {
    const eye = new THREE.Mesh(
      new THREE.SphereGeometry(0.013, 10, 10),
      new THREE.MeshBasicMaterial({ color: 0x0a0818 })
    );
    eye.position.set(x, 0.25, 0.115);
    g.add(eye);
    const glint = new THREE.Mesh(
      new THREE.SphereGeometry(0.004, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    glint.position.set(x + 0.004, 0.254, 0.124);
    g.add(glint);
  });
  // Base
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.11, 0.015, 16),
    new THREE.MeshStandardMaterial({ color: 0x0a0818, roughness: 0.5 })
  );
  base.position.y = -0.04;
  g.add(base);
  return g;
}

function createMecha() {
  const g = new THREE.Group();
  const torso = new THREE.Mesh(
    new THREE.BoxGeometry(0.16, 0.2, 0.12),
    new THREE.MeshStandardMaterial({ color: 0x5eead4, metalness: 0.6, roughness: 0.2 })
  );
  torso.position.y = 0.12; torso.castShadow = true;
  g.add(torso);
  // chest detail
  const chest = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.08, 0.005),
    new THREE.MeshStandardMaterial({ color: 0x0a0714, emissive: 0xec4899, emissiveIntensity: 0.8 })
  );
  chest.position.set(0, 0.14, 0.063);
  g.add(chest);
  const head = new THREE.Mesh(
    new THREE.BoxGeometry(0.11, 0.09, 0.09),
    new THREE.MeshStandardMaterial({ color: 0x2a2440, metalness: 0.7, roughness: 0.25 })
  );
  head.position.y = 0.26; head.castShadow = true;
  g.add(head);
  // Visor
  const visor = new THREE.Mesh(
    new THREE.BoxGeometry(0.07, 0.015, 0.005),
    new THREE.MeshStandardMaterial({ color: 0x0a0818, emissive: 0xfbbf24, emissiveIntensity: 1.2 })
  );
  visor.position.set(0, 0.265, 0.048);
  g.add(visor);
  // Arms
  [-0.11, 0.11].forEach(x => {
    const arm = new THREE.Mesh(
      new THREE.BoxGeometry(0.045, 0.18, 0.045),
      new THREE.MeshStandardMaterial({ color: 0x5eead4, metalness: 0.6, roughness: 0.2 })
    );
    arm.position.set(x, 0.1, 0);
    g.add(arm);
  });
  // Legs
  [-0.04, 0.04].forEach(x => {
    const leg = new THREE.Mesh(
      new THREE.BoxGeometry(0.055, 0.13, 0.055),
      new THREE.MeshStandardMaterial({ color: 0x2a2440, metalness: 0.5, roughness: 0.3 })
    );
    leg.position.set(x, -0.05, 0); leg.castShadow = true;
    g.add(leg);
  });
  // Shoulders
  [-0.11, 0.11].forEach(x => {
    const sh = new THREE.Mesh(
      new THREE.SphereGeometry(0.035, 12, 12),
      new THREE.MeshStandardMaterial({ color: 0x2a2440, metalness: 0.7, roughness: 0.2 })
    );
    sh.position.set(x, 0.2, 0);
    g.add(sh);
  });
  return g;
}

function createBooks() {
  const g = new THREE.Group();
  const colors = [0xa78bfa, 0xa3e635, 0xfbbf24, 0xec4899, 0x5eead4];
  const titles = ['REFACTOR','TYPE','TAOP','SHAPE','ORBIT'];
  colors.forEach((c, i) => {
    const book = new THREE.Mesh(
      new THREE.BoxGeometry(0.28, 0.055, 0.2),
      new THREE.MeshStandardMaterial({ color: c, roughness: 0.6 })
    );
    book.position.y = 0.028 + i * 0.056;
    book.rotation.y = (Math.random() - 0.5) * 0.06;
    book.castShadow = true;
    g.add(book);
    // title text as canvas decal — too noisy at this scale. skip.
  });
  return g;
}

function createTrophy() {
  const g = new THREE.Group();
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(0.07, 0.08, 0.04, 16),
    new THREE.MeshStandardMaterial({ color: 0x2a2040, roughness: 0.5 })
  );
  base.position.y = 0.02;
  g.add(base);
  const cup = new THREE.Mesh(
    new THREE.ConeGeometry(0.05, 0.18, 16),
    new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 0.9, roughness: 0.15, emissive: 0x331a00, emissiveIntensity: 0.4 })
  );
  cup.position.y = 0.13; cup.castShadow = true;
  g.add(cup);
  const star = new THREE.Mesh(
    new THREE.SphereGeometry(0.025, 12, 12),
    new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 0.9, roughness: 0.1, emissive: 0xfbbf24, emissiveIntensity: 0.6 })
  );
  star.position.y = 0.235;
  g.add(star);
  return g;
}

function createPlant() {
  const g = new THREE.Group();
  const pot = new THREE.Mesh(
    new THREE.CylinderGeometry(0.24, 0.2, 0.4, 24),
    new THREE.MeshStandardMaterial({ color: 0x3a2a1c, roughness: 0.85 })
  );
  pot.position.y = 0.2; pot.castShadow = true;
  g.add(pot);
  const soil = new THREE.Mesh(
    new THREE.CylinderGeometry(0.22, 0.22, 0.02, 24),
    new THREE.MeshStandardMaterial({ color: 0x1a0e04, roughness: 1 })
  );
  soil.position.y = 0.41;
  g.add(soil);
  // Monstera-ish leaves
  for (let i = 0; i < 18; i++) {
    const leafShape = new THREE.Shape();
    leafShape.moveTo(0, 0);
    leafShape.quadraticCurveTo(0.08, 0.15, 0, 0.35);
    leafShape.quadraticCurveTo(-0.08, 0.15, 0, 0);
    const leafGeom = new THREE.ShapeGeometry(leafShape);
    const leaf = new THREE.Mesh(leafGeom, new THREE.MeshStandardMaterial({
      color: i % 2 ? 0x2a6e3a : 0x4fae6f,
      roughness: 0.8, side: THREE.DoubleSide, metalness: 0.05
    }));
    const angle = (i / 18) * Math.PI * 2;
    const r = 0.1 + Math.random() * 0.15;
    leaf.position.set(Math.cos(angle) * r, 0.45 + Math.random() * 0.3, Math.sin(angle) * r);
    leaf.rotation.set(
      Math.cos(angle) * 0.6 - 0.2,
      angle + Math.PI/2,
      Math.sin(angle) * 0.4 - 0.3 + (Math.random()-0.5)*0.3
    );
    leaf.scale.setScalar(0.8 + Math.random() * 0.5);
    leaf.castShadow = true;
    g.add(leaf);
  }
  return g;
}

function createPoster() {
  const g = new THREE.Group();
  const frame = new THREE.Mesh(
    new THREE.BoxGeometry(1.3, 1.7, 0.06),
    new THREE.MeshStandardMaterial({ color: 0x1a1428, roughness: 0.7, metalness: 0.1 })
  );
  g.add(frame);
  // art
  const c = document.createElement('canvas');
  c.width = 512; c.height = 680;
  const x = c.getContext('2d');
  // Background
  const grad = x.createLinearGradient(0, 0, 0, 680);
  grad.addColorStop(0, '#1a0e2a'); grad.addColorStop(1, '#3a1a4a');
  x.fillStyle = grad; x.fillRect(0,0,512,680);
  // Abstract forms
  x.fillStyle = '#ec4899'; x.beginPath(); x.arc(180, 240, 130, 0, Math.PI*2); x.fill();
  x.globalCompositeOperation = 'lighter';
  x.fillStyle = '#fbbf24'; x.beginPath(); x.arc(340, 320, 100, 0, Math.PI*2); x.fill();
  x.globalCompositeOperation = 'source-over';
  x.strokeStyle = '#5eead4'; x.lineWidth = 18;
  x.beginPath(); x.moveTo(60, 440); x.quadraticCurveTo(256, 280, 450, 440); x.stroke();
  x.fillStyle = '#f5f1e8'; x.fillRect(60, 490, 392, 6);
  x.font = '700 42px "Instrument Serif", serif'; x.textAlign = 'center';
  x.fillText('ZIAUL', 256, 560);
  x.font = '400 16px "JetBrains Mono", monospace';
  x.fillStyle = '#a3a0b0'; x.fillText('NOW STUDIO / 2026', 256, 590);
  // Frame crop
  x.strokeStyle = '#5a4870'; x.lineWidth = 2;
  x.strokeRect(40, 40, 432, 600);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const art = new THREE.Mesh(
    new THREE.PlaneGeometry(1.2, 1.6),
    new THREE.MeshStandardMaterial({ map: tex, roughness: 0.9 })
  );
  art.position.z = 0.032;
  g.add(art);
  return g;
}

function createPoster2() {
  const g = new THREE.Group();
  const frame = new THREE.Mesh(
    new THREE.BoxGeometry(0.9, 1.1, 0.04),
    new THREE.MeshStandardMaterial({ color: 0x0a0714, roughness: 0.7 })
  );
  g.add(frame);
  const c = document.createElement('canvas');
  c.width = 400; c.height = 500;
  const x = c.getContext('2d');
  x.fillStyle = '#0a0714'; x.fillRect(0,0,400,500);
  // retro grid
  x.strokeStyle = 'rgba(94,234,212,0.3)';
  x.lineWidth = 1;
  for (let i = 0; i <= 20; i++) {
    x.beginPath(); x.moveTo(0, 250 + i*25); x.lineTo(400, 250 + i*25); x.stroke();
    x.beginPath(); x.moveTo(i*20, 250); x.lineTo(200 - i*50, 500); x.stroke();
    x.beginPath(); x.moveTo(400 - i*20, 250); x.lineTo(200 + i*50, 500); x.stroke();
  }
  // Sun
  const sunGrad = x.createLinearGradient(0, 80, 0, 260);
  sunGrad.addColorStop(0, '#fbbf24'); sunGrad.addColorStop(1, '#ec4899');
  x.fillStyle = sunGrad;
  x.beginPath(); x.arc(200, 200, 120, 0, Math.PI*2); x.fill();
  // bars
  x.fillStyle = '#0a0714';
  for (let i = 0; i < 5; i++) x.fillRect(80, 180 + i*14, 240, 5);
  // title
  x.fillStyle = '#5eead4';
  x.font = '700 28px "JetBrains Mono", monospace';
  x.textAlign = 'center';
  x.fillText('RUN//TIME', 200, 430);
  x.font = '400 12px "JetBrains Mono", monospace';
  x.fillStyle = '#8a82a0';
  x.fillText('A COMPUTATIONAL EXHIBITION', 200, 455);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  const art = new THREE.Mesh(
    new THREE.PlaneGeometry(0.82, 1.02),
    new THREE.MeshStandardMaterial({ map: tex, roughness: 0.9, emissive: 0xffffff, emissiveIntensity: 0.15, emissiveMap: tex })
  );
  art.position.z = 0.022;
  g.add(art);
  return g;
}

function createChair() {
  const g = new THREE.Group();
  const seat = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.1, 0.7),
    new THREE.MeshStandardMaterial({ color: 0x1a1428, roughness: 0.8 })
  );
  seat.position.set(0.2, 0.95, 0.4);
  seat.castShadow = true; seat.receiveShadow = true;
  g.add(seat);
  // Cushion top
  const cushion = new THREE.Mesh(
    new THREE.BoxGeometry(0.73, 0.04, 0.68),
    new THREE.MeshStandardMaterial({ color: 0x2a2040, roughness: 0.85 })
  );
  cushion.position.set(0.2, 1.0, 0.4);
  g.add(cushion);
  // backrest
  const back = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 1.05, 0.08),
    new THREE.MeshStandardMaterial({ color: 0x0f0a1d, roughness: 0.8 })
  );
  back.position.set(0.2, 1.5, 0.72);
  back.rotation.x = -0.1;
  back.castShadow = true;
  g.add(back);
  // backrest cushion
  const backCushion = new THREE.Mesh(
    new THREE.BoxGeometry(0.65, 0.95, 0.06),
    new THREE.MeshStandardMaterial({ color: 0x2a2040, roughness: 0.85 })
  );
  backCushion.position.set(0.2, 1.52, 0.68);
  backCushion.rotation.x = -0.1;
  g.add(backCushion);
  // headrest pillow
  const pillow = new THREE.Mesh(
    new THREE.BoxGeometry(0.4, 0.15, 0.1),
    new THREE.MeshStandardMaterial({ color: 0xec4899, roughness: 0.7 })
  );
  pillow.position.set(0.2, 1.95, 0.67);
  pillow.rotation.x = -0.1;
  g.add(pillow);
  // Armrests
  [-0.37, 0.37].forEach(x => {
    const arm = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.3, 0.4),
      new THREE.MeshStandardMaterial({ color: 0x0f0a1d, roughness: 0.7 })
    );
    arm.position.set(0.2 + x, 1.15, 0.4);
    arm.castShadow = true;
    g.add(arm);
    const armTop = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.04, 0.42),
      new THREE.MeshStandardMaterial({ color: 0x1a1428, roughness: 0.6 })
    );
    armTop.position.set(0.2 + x, 1.31, 0.4);
    g.add(armTop);
  });
  // Column
  const col = new THREE.Mesh(
    new THREE.CylinderGeometry(0.045, 0.05, 0.55, 16),
    new THREE.MeshStandardMaterial({ color: 0x1a1428, metalness: 0.6, roughness: 0.4 })
  );
  col.position.set(0.2, 0.62, 0.4);
  col.castShadow = true;
  g.add(col);
  // Piston ring
  const piston = new THREE.Mesh(
    new THREE.CylinderGeometry(0.035, 0.035, 0.05, 16),
    new THREE.MeshStandardMaterial({ color: 0x8a82a0, metalness: 0.9, roughness: 0.2 })
  );
  piston.position.set(0.2, 0.88, 0.4);
  g.add(piston);
  // Base (5 legs)
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    const leg = new THREE.Mesh(
      new THREE.BoxGeometry(0.45, 0.04, 0.06),
      new THREE.MeshStandardMaterial({ color: 0x0f0a1d, roughness: 0.5, metalness: 0.3 })
    );
    leg.position.set(0.2 + Math.cos(a) * 0.22, 0.32, 0.4 + Math.sin(a) * 0.22);
    leg.rotation.y = a;
    leg.castShadow = true;
    g.add(leg);
    // wheel
    const wheel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 0.04, 12),
      new THREE.MeshStandardMaterial({ color: 0x2a2040, roughness: 0.5 })
    );
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(0.2 + Math.cos(a) * 0.42, 0.3, 0.4 + Math.sin(a) * 0.42);
    g.add(wheel);
  }
  return g;
}

function createCharacter() {
  const g = new THREE.Group();
  // Back of head / hoodie (seen from the camera's back-ish angle)
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.14, 24, 20),
    new THREE.MeshStandardMaterial({ color: 0x3a2418, roughness: 0.85 })
  );
  head.position.set(0.2, 2.0, 0.55);
  head.scale.set(1, 1.05, 0.95);
  head.castShadow = true;
  g.add(head);
  // Hair
  const hair = new THREE.Mesh(
    new THREE.SphereGeometry(0.145, 20, 18, 0, Math.PI*2, 0, Math.PI/1.5),
    new THREE.MeshStandardMaterial({ color: 0x0f0708, roughness: 0.9 })
  );
  hair.position.set(0.2, 2.0, 0.55);
  g.add(hair);
  // Ear (just one hint)
  const ear = new THREE.Mesh(
    new THREE.SphereGeometry(0.025, 10, 10),
    new THREE.MeshStandardMaterial({ color: 0xe5b58c, roughness: 0.7 })
  );
  ear.position.set(0.35, 2.0, 0.53);
  ear.scale.set(0.6, 1.2, 0.4);
  g.add(ear);
  // Hoodie shoulders visible above chair
  const hoodie = new THREE.Mesh(
    new THREE.SphereGeometry(0.4, 24, 20, 0, Math.PI * 2, 0, Math.PI / 2.2),
    new THREE.MeshStandardMaterial({ color: 0x1a1530, roughness: 0.9 })
  );
  hoodie.position.set(0.2, 1.6, 0.55);
  hoodie.scale.set(1.1, 1.2, 0.9);
  hoodie.rotation.x = Math.PI;
  hoodie.castShadow = true;
  g.add(hoodie);
  // Hoodie accent stripe down back
  const stripe = new THREE.Mesh(
    new THREE.BoxGeometry(0.04, 0.4, 0.02),
    new THREE.MeshStandardMaterial({ color: 0x5eead4, emissive: 0x5eead4, emissiveIntensity: 0.5 })
  );
  stripe.position.set(0.2, 1.7, 0.96);
  g.add(stripe);
  // Right arm (resting on mouse) — simple capsule
  const rArm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.065, 0.055, 0.75, 14),
    new THREE.MeshStandardMaterial({ color: 0x1a1530, roughness: 0.9 })
  );
  rArm.rotation.z = Math.PI / 2.2;
  rArm.rotation.y = 0.2;
  rArm.position.set(0.7, 1.58, 0.1);
  rArm.castShadow = true;
  g.add(rArm);
  // Right hand
  const rHand = new THREE.Mesh(
    new THREE.SphereGeometry(0.07, 16, 14),
    new THREE.MeshStandardMaterial({ color: 0xe5b58c, roughness: 0.7 })
  );
  rHand.scale.set(1.1, 0.7, 1.3);
  rHand.position.set(1.05, 1.52, -0.7);
  rHand.castShadow = true;
  g.add(rHand);
  // Left arm (on keyboard)
  const lArm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.065, 0.055, 0.7, 14),
    new THREE.MeshStandardMaterial({ color: 0x1a1530, roughness: 0.9 })
  );
  lArm.rotation.z = -Math.PI / 2.3;
  lArm.rotation.y = -0.1;
  lArm.position.set(-0.25, 1.58, 0.1);
  lArm.castShadow = true;
  g.add(lArm);
  const lHand = new THREE.Mesh(
    new THREE.SphereGeometry(0.075, 16, 14),
    new THREE.MeshStandardMaterial({ color: 0xe5b58c, roughness: 0.7 })
  );
  lHand.scale.set(1.2, 0.7, 1.3);
  lHand.position.set(-0.0, 1.52, -0.68);
  lHand.castShadow = true;
  g.add(lHand);
  // Headphones
  const hpBand = new THREE.Mesh(
    new THREE.TorusGeometry(0.16, 0.015, 8, 24, Math.PI),
    new THREE.MeshStandardMaterial({ color: 0xec4899, roughness: 0.3, metalness: 0.4, emissive: 0xec4899, emissiveIntensity: 0.2 })
  );
  hpBand.rotation.x = -0.1;
  hpBand.position.set(0.2, 2.15, 0.55);
  g.add(hpBand);
  [-0.15, 0.15].forEach(x => {
    const cup = new THREE.Mesh(
      new THREE.CylinderGeometry(0.055, 0.055, 0.05, 20),
      new THREE.MeshStandardMaterial({ color: 0xec4899, emissive: 0xec4899, emissiveIntensity: 0.3, roughness: 0.3 })
    );
    cup.rotation.z = Math.PI / 2;
    cup.position.set(0.2 + x, 2.0, 0.55);
    g.add(cup);
  });

  g.userData.lHand = lHand;
  g.userData.rHand = rHand;
  return g;
}

function createNotes() {
  const g = new THREE.Group();
  // Stack of 3 paper sheets
  const colors = [0xf5f1e8, 0xfff8e8, 0xf0ebde];
  colors.forEach((c, i) => {
    const sheet = new THREE.Mesh(
      new THREE.BoxGeometry(0.36, 0.002, 0.26),
      new THREE.MeshStandardMaterial({ color: c, roughness: 0.9 })
    );
    sheet.position.y = 0.018 + i * 0.003;
    sheet.rotation.y = (Math.random() - 0.5) * 0.08;
    sheet.castShadow = true;
    g.add(sheet);
  });
  // Ink lines on top sheet via decal-like canvas
  const c = document.createElement('canvas');
  c.width = 256; c.height = 192;
  const x = c.getContext('2d');
  x.strokeStyle = '#3a3450'; x.lineWidth = 2.5;
  x.beginPath(); x.moveTo(30,30); x.lineTo(200,30); x.stroke();
  x.lineWidth = 1.5;
  for (let i = 0; i < 6; i++) {
    x.beginPath(); x.moveTo(30, 60 + i*18); x.lineTo(30 + 180 * Math.random() + 20, 60 + i*18); x.stroke();
  }
  // doodle — arrow flow
  x.strokeStyle = '#ec4899'; x.lineWidth = 2;
  x.beginPath(); x.arc(210, 100, 18, 0, Math.PI*2); x.stroke();
  x.beginPath(); x.moveTo(190, 100); x.lineTo(150, 140); x.lineTo(160, 130); x.moveTo(150,140); x.lineTo(160,145); x.stroke();
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  const doodle = new THREE.Mesh(
    new THREE.PlaneGeometry(0.35, 0.25),
    new THREE.MeshStandardMaterial({ map: tex, transparent: true, roughness: 0.9 })
  );
  doodle.rotation.x = -Math.PI/2;
  doodle.position.y = 0.028;
  g.add(doodle);
  // Pen
  const pen = new THREE.Mesh(
    new THREE.CylinderGeometry(0.008, 0.006, 0.18, 12),
    new THREE.MeshStandardMaterial({ color: 0x0a0714, metalness: 0.4, roughness: 0.4 })
  );
  pen.rotation.z = Math.PI / 2.3;
  pen.position.set(0.05, 0.028, -0.05);
  g.add(pen);
  return g;
}

// ============ PARTICLES ============
function buildParticles() {
  // Dust motes — light-catching
  const count = 400;
  const geom = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  const speeds = new Float32Array(count);
  const phases = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    pos[i*3] = (Math.random() - 0.5) * 10;
    pos[i*3+1] = Math.random() * 6;
    pos[i*3+2] = (Math.random() - 0.5) * 5;
    speeds[i] = 0.03 + Math.random() * 0.08;
    phases[i] = Math.random() * Math.PI * 2;
  }
  geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const dustCanvas = document.createElement('canvas');
  dustCanvas.width = 64; dustCanvas.height = 64;
  const dctx = dustCanvas.getContext('2d');
  const dg = dctx.createRadialGradient(32,32,0,32,32,32);
  dg.addColorStop(0, 'rgba(255,240,220,1)');
  dg.addColorStop(0.4, 'rgba(255,230,200,0.4)');
  dg.addColorStop(1, 'rgba(255,230,200,0)');
  dctx.fillStyle = dg; dctx.fillRect(0,0,64,64);
  const dustTex = new THREE.CanvasTexture(dustCanvas);
  const mat = new THREE.PointsMaterial({
    map: dustTex,
    color: 0xffe8c0,
    size: 0.05,
    transparent: true,
    opacity: 0.6,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  particles = new THREE.Points(geom, mat);
  particles.userData = { speeds, phases };
  scene.add(particles);

  // Sparkle layer (faster, colorful, smaller)
  const sCount = 120;
  const sGeom = new THREE.BufferGeometry();
  const sPos = new Float32Array(sCount * 3);
  const sCol = new Float32Array(sCount * 3);
  const sSpeed = new Float32Array(sCount);
  const sPhase = new Float32Array(sCount);
  const palette = [[0.37,0.92,0.83],[0.65,0.55,0.98],[0.93,0.28,0.6],[0.98,0.75,0.14]];
  for (let i = 0; i < sCount; i++) {
    sPos[i*3] = (Math.random() - 0.5) * 8;
    sPos[i*3+1] = 0.5 + Math.random() * 4;
    sPos[i*3+2] = (Math.random() - 0.5) * 4;
    const col = palette[Math.floor(Math.random() * palette.length)];
    sCol[i*3] = col[0]; sCol[i*3+1] = col[1]; sCol[i*3+2] = col[2];
    sSpeed[i] = 0.1 + Math.random() * 0.2;
    sPhase[i] = Math.random() * Math.PI * 2;
  }
  sGeom.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
  sGeom.setAttribute('color', new THREE.BufferAttribute(sCol, 3));
  const sMat = new THREE.PointsMaterial({
    size: 0.04,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    map: dustTex,
    depthWrite: false,
    sizeAttenuation: true
  });
  sparkles = new THREE.Points(sGeom, sMat);
  sparkles.userData = { speeds: sSpeed, phases: sPhase };
  scene.add(sparkles);

  // Holographic screen particles (drifting upward in front of monitors)
  const sp = new THREE.BufferGeometry();
  const spCount = 60;
  const spPos = new Float32Array(spCount * 3);
  const spPhase = new Float32Array(spCount);
  for (let i = 0; i < spCount; i++) {
    spPos[i*3] = 0.95 + (Math.random() - 0.5) * 1.8;
    spPos[i*3+1] = 1.4 + Math.random() * 1.3;
    spPos[i*3+2] = -1.4;
    spPhase[i] = Math.random() * Math.PI * 2;
  }
  sp.setAttribute('position', new THREE.BufferAttribute(spPos, 3));
  const spMat = new THREE.PointsMaterial({
    color: 0x5eead4,
    size: 0.03,
    map: dustTex,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  screenParticles = new THREE.Points(sp, spMat);
  screenParticles.userData = { phases: spPhase };
  scene.add(screenParticles);
}

// ============ MODE / CAMERA ============
function setMode(mode, instant = false) {
  if (!MODES[mode]) return;
  currentMode = mode;
  const m = MODES[mode];
  camPosDest.set(...m.cam.pos);
  camTargetDest.set(...m.cam.look);
  if (instant) { camPos.copy(camPosDest); camTarget.copy(camTargetDest); }

  const accentColor = new THREE.Color(m.accent);
  document.documentElement.style.setProperty('--accent', m.accent);
  if (accentLight) accentLight.color.copy(accentColor);
  if (ambientLight) ambientLight.color.setHex(m.ambient);

  document.getElementById('mode-label').textContent = m.label.toUpperCase();
  document.querySelectorAll('.nav button').forEach(b => b.classList.toggle('active', b.dataset.mode === mode));

  renderPanel(m);
  document.getElementById('panel').classList.add('visible');
  const hint = document.getElementById('hint');
  if (m.hint) {
    document.getElementById('hint-title').textContent = m.hint.title;
    document.getElementById('hint-action-label').textContent = m.hint.action;
    hint.classList.add('visible');
  } else hint.classList.remove('visible');

  // Bloom strength per mode
  if (bloomPass) {
    bloomPass.strength = mode === 'gaming' ? 1.2 : mode === 'ai' ? 1.1 : 0.85;
  }
}

function renderPanel(m) {
  const p = document.getElementById('panel');
  let h = `<div class="kicker">${m.num} · ${m.kicker}</div>`;
  h += `<h1>${m.title}</h1>`;
  h += `<p>${m.body}</p>`;
  if (m.chips) { h += `<div class="chips">`; m.chips.forEach((c,i) => h += `<span class="chip${i===0?' hot':''}">${c}</span>`); h += `</div>`; }
  if (m.stats) { h += `<div class="stats">`; m.stats.forEach(([v,l]) => h += `<div class="stat"><div class="stat-v">${v}</div><div class="stat-l">${l}</div></div>`); h += `</div>`; }
  if (m.rows) { h += `<div class="rows">`; m.rows.forEach(([t,meta]) => h += `<div class="row"><div><div class="title">${t}</div><div class="meta">${meta}</div></div><div class="arr">→</div></div>`); h += `</div>`; }
  p.innerHTML = h;
}

function buildNav() {
  const nav = document.getElementById('nav');
  nav.innerHTML = MODE_ORDER.map(id => { const m = MODES[id]; return `<button data-mode="${id}"><span class="num">${m.num}</span> ${m.nav}</button>`; }).join('');
  nav.querySelectorAll('button').forEach(b => b.addEventListener('click', () => setMode(b.dataset.mode)));
}

function bindEvents() {
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
  });
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    pointer.set(mouseX, mouseY);
  });
  renderer.domElement.addEventListener('click', (e) => {
    pointer.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(Object.values(interactables), true);
    if (hits.length) {
      let obj = hits[0].object;
      while (obj && !obj.userData.mode) obj = obj.parent;
      if (obj && obj.userData.mode) setMode(obj.userData.mode);
    }
  });
  let scrollLock = false;
  window.addEventListener('wheel', (e) => {
    if (scrollLock) return;
    scrollLock = true; setTimeout(() => scrollLock = false, 900);
    const i = MODE_ORDER.indexOf(currentMode);
    if (e.deltaY > 0) setMode(MODE_ORDER[(i+1) % MODE_ORDER.length]);
    else setMode(MODE_ORDER[(i-1+MODE_ORDER.length) % MODE_ORDER.length]);
  }, { passive: true });
  window.addEventListener('keydown', (e) => {
    if (e.key >= '1' && e.key <= '6') setMode(MODE_ORDER[parseInt(e.key)-1]);
    else if (e.key === 'ArrowRight') { const i = MODE_ORDER.indexOf(currentMode); setMode(MODE_ORDER[(i+1)%MODE_ORDER.length]); }
    else if (e.key === 'ArrowLeft') { const i = MODE_ORDER.indexOf(currentMode); setMode(MODE_ORDER[(i-1+MODE_ORDER.length)%MODE_ORDER.length]); }
    else if (e.key === 'Escape') document.getElementById('panel').classList.remove('visible');
  });
  let hovered = null;
  window.addEventListener('mousemove', () => {
    if (!raycaster || !camera) return;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(Object.values(interactables), true);
    if (hits.length) {
      let obj = hits[0].object;
      while (obj && !obj.userData.mode) obj = obj.parent;
      if (obj !== hovered) { hovered = obj; document.body.style.cursor = 'pointer'; }
    } else { if (hovered) { hovered = null; document.body.style.cursor = 'default'; } }
  });
}

function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();
  const dt = clock.getDelta();

  // Camera lerp
  camPos.lerp(camPosDest, 0.045);
  camTarget.lerp(camTargetDest, 0.045);
  const parX = mouseX * 0.18;
  const parY = mouseY * 0.13;
  camera.position.copy(camPos);
  camera.position.x += parX;
  camera.position.y += parY;
  camera.lookAt(camTarget);

  // Dust motes
  if (particles) {
    const pos = particles.geometry.attributes.position.array;
    const { speeds, phases } = particles.userData;
    for (let i = 0; i < speeds.length; i++) {
      pos[i*3+1] += speeds[i] * dt;
      pos[i*3] += Math.sin(t * 0.5 + phases[i]) * 0.003;
      pos[i*3+2] += Math.cos(t * 0.4 + phases[i]) * 0.002;
      if (pos[i*3+1] > 6) { pos[i*3+1] = 0; pos[i*3] = (Math.random()-0.5)*10; pos[i*3+2] = (Math.random()-0.5)*5; }
    }
    particles.geometry.attributes.position.needsUpdate = true;
  }

  // Sparkles
  if (sparkles) {
    const pos = sparkles.geometry.attributes.position.array;
    const { speeds, phases } = sparkles.userData;
    for (let i = 0; i < speeds.length; i++) {
      pos[i*3+1] += speeds[i] * dt * 0.3;
      pos[i*3]   += Math.sin(t * 1.2 + phases[i]) * 0.005;
      if (pos[i*3+1] > 5) { pos[i*3+1] = 0.5; }
    }
    sparkles.geometry.attributes.position.needsUpdate = true;
    sparkles.material.opacity = 0.6 + Math.sin(t * 3) * 0.2;
  }

  // Screen particles
  if (screenParticles) {
    const pos = screenParticles.geometry.attributes.position.array;
    const { phases } = screenParticles.userData;
    for (let i = 0; i < phases.length; i++) {
      pos[i*3+1] += 0.003;
      if (pos[i*3+1] > 2.7) pos[i*3+1] = 1.4;
    }
    screenParticles.geometry.attributes.position.needsUpdate = true;
  }

  // Steam
  if (mugSteam) {
    const pos = mugSteam.geometry.attributes.position.array;
    const phase = mugSteam.geometry.userData.phase;
    for (let i = 0; i < phase.length; i++) {
      pos[i*3+1] += 0.004;
      pos[i*3]   = -1.85 + Math.sin(t * 0.8 + phase[i]) * 0.06;
      pos[i*3+2] = -0.85 + Math.cos(t * 0.6 + phase[i]) * 0.05;
      if (pos[i*3+1] > 2.2) pos[i*3+1] = 1.7;
    }
    mugSteam.geometry.attributes.position.needsUpdate = true;
  }

  // Animated shader materials
  animatedMaterials.forEach(m => { if (m.uniforms?.uTime) m.uniforms.uTime.value = t; });
  if (composer.finalPass) composer.finalPass.uniforms.uTime.value = t;

  // Keyboard RGB wave
  keyboardKeys.forEach((k, i) => {
    if (k.material.emissive) {
      const intensity = 0.1 + Math.max(0, Math.sin(t * 2 + i * 0.3)) * 0.25;
      if (k.material.emissiveIntensity !== undefined && k.material.color.r === 0.925) {
        k.material.emissiveIntensity = intensity + 0.3;
      }
    }
  });

  // Accent light pulse
  if (accentLight) accentLight.intensity = 2.6 + Math.sin(t * 2.2) * 0.4;
  // Monitor glow flicker
  if (monitorGlow1) monitorGlow1.intensity = 2.3 + Math.sin(t * 6) * 0.15;
  // Lamp subtle flicker
  if (lampLight) lampLight.intensity = 13.5 + Math.sin(t * 12) * 0.4 + Math.sin(t * 31) * 0.2;

  // Character head subtle sway
  if (character) {
    character.rotation.y = Math.sin(t * 0.3) * 0.02;
    character.position.y = Math.sin(t * 0.6) * 0.003;
  }

  // Bloom oscillation for cinema
  if (bloomPass) bloomPass.strength = bloomPass.strength * 0.995 + (0.85 + Math.sin(t * 0.5) * 0.05) * 0.005;

  // Update coord display
  document.getElementById('coords').textContent = `x:${camera.position.x.toFixed(1)} y:${camera.position.y.toFixed(1)} z:${camera.position.z.toFixed(1)}`;

  composer.render();
}

init();
