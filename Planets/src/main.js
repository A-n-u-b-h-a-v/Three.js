import * as THREE from 'three';
import "./style.css"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 100);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('canvas'),
  antialias:true

});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00];

const starTexture = new THREE.TextureLoader().load('./stars.jpg');
starTexture.colorSpace=THREE.SRGBColorSpace
const starGeometry = new THREE.SphereGeometry(50, 64, 64);
const starMaterial = new THREE.MeshStandardMaterial({ map: starTexture, side: THREE.BackSide });

const star = new THREE.Mesh(starGeometry, starMaterial);
scene.add(star);


const textures= ["./csilla/color.png","./earth/map.jpg","./venus/map.jpg","./volcanic/color.png"] 
let planet=[]
const radius=1.3
const segments=64 
const orbitradius=5
const spheres =new THREE.Group()
for (let i = 0; i < 4; i++) {
  const textureLoader= new THREE.TextureLoader()
  const texture= textureLoader.load(textures[i]);
  texture.colorSpace=THREE.SRGBColorSpace
  const geometry = new THREE.SphereGeometry(radius, segments, segments);
  const material = new THREE.MeshStandardMaterial({map:texture});
  const sphere = new THREE.Mesh(geometry, material);
  planet.push(sphere)
  const angle=i*Math.PI/2
  sphere.position.z=orbitradius*Math.sin(angle)
  sphere.position.x=orbitradius*Math.cos(angle)
  spheres.add(sphere);
}
spheres.rotation.x=.1
spheres.position.y=-0.55
scene.add(spheres)

// HDRI Lighting
const loader = new RGBELoader();
loader.load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/moonlit_golf_1k.hdr', function(Texture) {
  Texture.mapping=THREE.EquirectangularRefractionMapping
  
  scene.environment = Texture;
});

let scrollCount=0
let lastWheelEvent = 0;


document.addEventListener('wheel', (event) => {
  const now = Date.now();
  if (now - lastWheelEvent < 2000) return;
  lastWheelEvent = now;
  const deltaY = event.deltaY;

  console.log(scrollCount)
  const heading=document.querySelectorAll(".heading")

  if (deltaY > 0) {
    scrollCount=(scrollCount + 1) % 4

   gsap.to(spheres.rotation,{
     y:`+=${(Math.PI)/2}`,
     duration:2,
     ease:"expo.easeinOut"
   }) 
    gsap.to(heading,{
      y:`-=${100}%`
     })
   if(scrollCount==0){
    gsap.to(heading,{
      y:0
     })
   }
  } 

});




// Ambient Lighting
const ambientLight = new THREE.AmbientLight(0x333333, 0.5);
scene.add(ambientLight);

// Directional Lighting
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 10, 0);
scene.add(directionalLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom=false

camera.position.z = 10;

let clock =new THREE.Clock()
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  for(let i=0;i<planet.length;i++){
    const spherePlanet=planet[i]
    spherePlanet.rotation.y=clock.getElapsedTime()*.02
  }
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
