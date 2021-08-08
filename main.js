import "./style.css";
import * as THREE from "three";
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const loader = new STLLoader();

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(50);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
// const torus = new THREE.Mesh(geometry, material);

// scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(100, 50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const position = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(...position);

  scene.add(star);
  return star;
}

// const stars = Array(200).fill().map(addStar);

// const forestTexture = new THREE.TextureLoader().load("wallpaper.jpg");
// scene.background = forestTexture;

const Line = () => {
  const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

  const points = [];
  points.push(new THREE.Vector3(-13, 0, 0));
  points.push(new THREE.Vector3(0, 13, 0));
  points.push(new THREE.Vector3(0, 0, 13));
  points.push(new THREE.Vector3(-13, 0, 0));
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  
  return new THREE.Line(geometry, material);
};

// scene.add(Line());


loader.load(
  './Geometric_Heart_Key_Ring.stl',
  function (geometry) {
      const mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)
  },
  (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
  },
  (error) => {
      console.log(error)
  }
)

function animate() {
  requestAnimationFrame(animate);

  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;

  // stars.forEach(star => star.position.y -= 0.02)

  controls.update();

  renderer.render(scene, camera);
}

animate();
