import * as THREE from 'three'
import {OrbitControls} from './jsm/controls/OrbitControls.js'
import { OBJLoader } from './jsm/loaders/OBJLoader.js';
import { MTLLoader } from './jsm/loaders/MTLLoader.js';

// se crea la escena 
const scene = new THREE.Scene()

// se crea la camara 
const camera =  new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 100)
camera.position.z = 35

// creando y seteando el renderizador de escena
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement)

// creando los controles 
const controls = new OrbitControls(camera, renderer.domElement)

// luces  
const pointlight = new THREE.AmbientLight( 0xeeeeee ); // soft white light

scene.add( pointlight );

const light = new THREE.AmbientLight( 0x404040, 15); // soft white light
scene.add( light );



// instantiate a loader

const mtlLoader = new MTLLoader()

mtlLoader.load(
    'models/toalla/13519_Beach_Towels_v2_L2.mtl',
    (materials) => {
        materials.preload()
        console.log(materials)
        const objLoader = new OBJLoader()
        objLoader.setMaterials(materials)
        objLoader.load(
             'models/toalla/13519_Beach_Towels_v2_L2.obj',
             (object) => {
				 object.rotation.x = Math.PI / 2;
				 object.scale.set(0.05, 0.05, 0.05);
                 scene.add(object)
             },
             (xhr) => {
                 console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
             },
             (error) => {
                 console.log('An error happened')
             }
        )
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log('An error happened')
    }
)

window.addEventListener(
    'resize',
    () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        render()
    }, 
    false
)


// crear la animacion 
function animate(){
    requestAnimationFrame(animate);
    controls.update();
    render();
}

// creando el render 
function render(){
    renderer.render( scene, camera );
}

animate()