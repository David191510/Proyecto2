import * as THREE from 'three'
import { OrbitControls } from './jsm/controls/OrbitControls.js'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 50


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;

const dirLight = new THREE.AmbientLight( 0xffffff );
dirLight.position.set( -10, 10, 10 );
scene.add( dirLight );

const cubegeometry = new THREE.BoxGeometry( 50, 10, 50 ); 
const cubematerial = new THREE.MeshPhongMaterial(); 
const texture = new THREE.TextureLoader().load('models/aguacolor.jpg');
cubematerial.map = texture

const aguac = new THREE.TextureLoader().load('models/aguanormal.jpg')
cubematerial.normalMap = aguac
cubematerial.normalScale.set(1,1)

const cube = new THREE.Mesh( cubegeometry, cubematerial ); 
scene.add( cube );
cube.position.y = -5.2;



function animate(){
  requestAnimationFrame(animate)
  controls.update()
  render()
}

function render(){
  renderer.render(scene,camera)
}

animate()