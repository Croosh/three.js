import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const speed = 0.01;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector(".canvas"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const geometry = new THREE.TorusGeometry(10, 4, 40, 40);
const mesh = new THREE.MeshStandardMaterial({
  color: 0xf332f2,
  wireframe: true,
});
const torus = new THREE.Mesh(geometry, mesh);
scene.add(torus);

const gltfLoader = new GLTFLoader();
gltfLoader.load("./model/scene.gltf", (gltf) => {
  const mesh = gltf.scene;
  mesh.position.set;
  scene.add(mesh);
});

const controls = new OrbitControls(camera, renderer.domElement);

function animation() {
  requestAnimationFrame(animation);
  torus.rotation.x += speed;
  torus.rotation.y += 0.005;
  torus.rotation.z += speed;
  controls.update();
  renderer.render(scene, camera);
}

animation();
