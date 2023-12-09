import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { RenderPixelatedPass } from "three/addons/postprocessing/RenderPixelatedPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  5,
  window.innerWidth / innerHeight,
  0.1,
  50
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector(".canvas"),
});

renderer.setPixelRatio(2);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ReinhardToneMapping;
camera.position.set(100, 100, 100);

// LIGHT
const pointLight = new THREE.PointLight(0xffffff, 1000);
pointLight.position.set(0, 10, 0);

const pointLH = new THREE.PointLightHelper(pointLight);
scene.add(pointLH);

scene.background = new THREE.Color(0xa3a3a3);

// const ambientLight = new THREE.AmbientLight(0xffffff);
// scene.add(ambientLight);

// const hemiSphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 100);
// scene.add(hemiSphereLight);

// POINTERS;
const gridHelper = new THREE.GridHelper(200, 200);
const planeHelper = new THREE.AxesHelper(3);
const cameraHelper = new THREE.CameraHelper(camera);
scene.add(cameraHelper);
scene.add(gridHelper, planeHelper);

//TORUS
const geometry = new THREE.SphereGeometry(10, 64, 64);
const mesh = new THREE.MeshStandardMaterial({
  color: 0xf332f2,
});
const torus = new THREE.Mesh(geometry, mesh);
scene.add(torus);

// LOADER
// CONTROLES
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.01;
controls.enablePan = true;
controls.enableZoom = true;
// controls.minPolarAngle = Math.PI / 2;
// controls.maxPolarAngle = Math.PI / 2;

// WINDOW RESIZE

window.addEventListener("resize", onWindowResize);

function onWindowResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  composer.setSize(width, height);
}

// LOOP RENDER
function animation() {
  requestAnimationFrame(animation);
  controls.update();
  renderer.render(scene, camera);
}

animation();
