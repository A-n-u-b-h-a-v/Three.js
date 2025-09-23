import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import gsap from 'gsap';

let scene, camera, renderer, controls, composer;

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha:true,
  canvas: document.getElementById("canvas"),
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputEncoding = THREE.sRGBEncoding;

// Setup post processing
composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const rgbShiftPass = new ShaderPass(RGBShiftShader);
rgbShiftPass.uniforms['amount'].value = 0.005;
// rgbShiftPass.uniforms['angle'].value = 1;
composer.addPass(rgbShiftPass);

const pmremGenerator = new THREE.PMREMGenerator(renderer);
pmremGenerator.compileEquirectangularShader();

camera.position.z = 3.5;

window.addEventListener('mousemove', (event) => {
  const mouseX = (event.clientX / window.innerWidth) -.5;
  const mouseY = (event.clientY / window.innerHeight) -.5;
  
  const targetRotationX = (mouseY * Math.PI)*.15 / 2;
  const targetRotationY = (mouseX * Math.PI)*.15 / 2;
  
  gsap.to(scene.rotation, {
    x: targetRotationX,
    y: targetRotationY,
    duration: 1,
    ease: "power2.out"
  });
});

controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.02; // Reduced for smoother damping
controls.enableZoom = false;


const rgbeLoader = new RGBELoader();
rgbeLoader.load(
  "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/pond_bridge_night_1k.hdr",
  (texture) => {
    const envMap = pmremGenerator.fromEquirectangular(texture).texture;
    pmremGenerator.dispose();
    scene.environment = envMap;
    texture.dispose();
    const gltfLoader = new GLTFLoader();
    gltfLoader.load("/DamagedHelmet.gltf", (gltf) => {
        scene.add(gltf.scene);
    },undefined,(error)=>{
      console.error("an error",error)
    });
  },
  
);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  composer.render();
}

animate();

