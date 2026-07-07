import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

//updating changes to appear only in main
const container = document.getElementById('viewer-area');

//declaring width and height
const w= container.clientWidth;
const h= container.clientHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w/h, 0.1, 100);
camera.position.z = 4; //move camera back

// scene.background = new THREE.Color(0x0a0a0a);

const newRenderer = new THREE.WebGLRenderer({alpha:true});
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
const ambientLight = new THREE.AmbientLight(0x6472f9, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1.5);
const directionalLight3 = new THREE.DirectionalLight(0xf54927, 2);
directionalLight.position.set(5, 5, 5);
directionalLight2.position.set(5, 10, -5);
directionalLight3.position.set(-2,6,10);
scene.add(directionalLight);
scene.add(directionalLight2);
scene.add(directionalLight3);

//controls to orbit around the model
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { contain } from 'three/src/extras/TextureUtils.js';

const controls = new OrbitControls(camera, newRenderer.domElement);
controls.enableDamping = true; // smoother movement

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    newRenderer.render(scene, camera);
}
animate();

//construct a new layer
//to create make meshes and assign them layers property

loader.load(
    'Nothing4APro.obj',
    function(object){
        object.traverse(function(child){
            if(child.isMesh){
                child.layers.set(1);
            }
        });
        scene.add(object);
    },
    undefined,
    function(error){
        console.error("mesh is unavailable!!", error);
    }
);

camera.layers.enable(1);

let showEcorche = false;

window.addEventListener('keydown', function(event){
    if(event.key==='9'){
        showEcorche = !showEcorche;

        if(showEcorche){
            camera.layers.enable(1);
        }else{
            camera.layers.disable(1);
        }
    }
});

//to detect different parts a raycaster must be developed

const rc = new THREE.Raycaster();
//to add a 2d mouse
const mouse = new THREE.Vector2();

window.addEventListener('click', function(event){
    //normalization
    mouse.x = (event.clientX/window.innerWidth)*2-1;
    mouse.y = -(event.clientY/window.innerHeight)*2+1;

    rc.setFromCamera(mouse, camera);

    const intersects = rc.intersectObjects(scene.children, true);

    if(intersects.length>0){
        const clickedMesh = intersects[0].object;
        console.log('clicked', clickedMesh.name);
        showInfoBox(clickedMesh.name);
    }
});

window.addEventListener('resize', ()=>{
    const newW = container.clientWidth;
    const newH = container.clientHeight;
    camera.aspect = newW/newH;
    camera.updateProjectionMatrix;
    newRenderer.setSize(newW, newH);
})

function showInfoBox(meshName) {
    const infoBox = document.getElementById('info-box');
    const description = meshDescriptions[meshName];

    if (description) {
        infoBox.textContent = description;
        infoBox.style.display = 'block';
    } else {
        infoBox.textContent = `No description available for "${meshName}"`;
        infoBox.style.display = 'block';
    }
}

const descriptions = {
    //insert descriptions for muscles here!!!!
}