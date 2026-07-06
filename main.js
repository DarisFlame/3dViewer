import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

//declaring width and height
const w= innerWidth;
const h= innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w/h, 0.1, 100);
camera.position.z = 4; //move camera back

const newRenderer = new THREE.WebGLRenderer();
newRenderer.setSize(w,h);
document.body.appendChild(newRenderer.domElement);

const loader = new OBJLoader();
loader.load(
    'character.obj',
    function (object) {
        scene.add(object);
        newRenderer.render(scene, camera); // render after model loads
    },
    undefined,
    function (error) {
        console.error('Error loading model:', error);
    }
);

//adding lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
directionalLight2.position.set(5, 5, -5);
scene.add(directionalLight);
scene.add(directionalLight2);

//controls to orbit around the model
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const controls = new OrbitControls(camera, newRenderer.domElement);
controls.enableDamping = true; // smoother movement

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    newRenderer.render(scene, camera);
}
animate();