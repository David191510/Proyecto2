import * as THREE from 'three'
import { OrbitControls } from './jsm/controls/OrbitControls.js'
import { FBXLoader } from './jsm/loaders/FBXLoader.js'
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
import { EffectComposer } from './jsm/postprocessing/EffectComposer.js';
import { RenderPass } from './jsm/postprocessing/RenderPass.js';
import { SMAAPass } from './jsm/postprocessing/SMAAPass.js';

const scene = new THREE.Scene()

const camera =  new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
camera.position.set(-5,10,5)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.target.set(0, 1, 0)


const ambientLight = new THREE.AmbientLight(0x0C090A)
ambientLight.intensity = 50
scene.add(ambientLight)

//luna
var moonGeometry = new THREE.SphereGeometry(20, 32, 32);

var moonTexture = new THREE.TextureLoader().load('models/moon.jpg');

var moonMaterial = new THREE.MeshStandardMaterial({
  emissive: 0xffffff, 
  emissiveMap: moonTexture
});

var moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);

var moonLight = new THREE.PointLight(0xffffff, 1, 10); 

scene.add(moonMesh);
scene.add(moonLight);

moonMesh.position.set(100, 120, 55); 
moonLight.position.copy(moonMesh.position); 

//luciernagas
var pointLights = [];

for (var i = 0; i < 50; i++) {
  var color = new THREE.Color(0xffff00); // 
  var intensity = Math.random() * 1 + 1;
  var distance = Math.random() * 5 + 5;

  var pointLight = new THREE.PointLight(color, intensity, distance);

    //posicion
  var rangeX = 100;
  var rangeY = -30;
  var rangeZ = 100;
  pointLight.position.set(
    Math.random() * rangeX - rangeX / 2,
    Math.random() * rangeY,
    Math.random() * rangeZ - rangeZ / 2
  );

  //agregar luciernagas
  scene.add(pointLight);
  pointLights.push(pointLight);
}

//skybox
let materialArray = [];
let texture_ft = new THREE.TextureLoader().load( 'models/skybox/0b2447.png');
let texture_bk = new THREE.TextureLoader().load( 'models/skybox/0b2447.png');
let texture_up = new THREE.TextureLoader().load( 'models/skybox/0b2447.png');
let texture_dn = new THREE.TextureLoader().load( 'models/skybox/0b2447.png');
let texture_rt = new THREE.TextureLoader().load( 'models/skybox/0b2447.png');
let texture_lf = new THREE.TextureLoader().load( 'models/skybox/0b2447.png');
  
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf })); 
for (let i = 0; i < 6; i++)
  materialArray[i].side = THREE.BackSide;
   
let skyboxGeo = new THREE.BoxGeometry( 500, 500, 500);
let skybox = new THREE.Mesh( skyboxGeo, materialArray );
scene.add( skybox );

//angulos de rotacion

const angleInRadians = THREE.MathUtils.degToRad(180);
const angle = THREE.MathUtils.degToRad(135);

const gl = new GLTFLoader();

gl.load(
    'models/master sword/scene.gltf',
    (gltf) => {
        const model = gltf.scene;
        model.position.set(0,-28,0)
        scene.add(model);
    }
);

gl.load(
    'models/casa 1/scene.gltf',
    (gltf) => {
        const model = gltf.scene;
        model.position.set(20,-28,0)
        model.rotation.y = angleInRadians
        scene.add(model);
    }
);

gl.load(
    'models/casa 2/scene.gltf',
    (gltf) => {
        const model = gltf.scene;
        model.position.set(0, -27,-30)
        model.scale.set(1.5,1.5,1.5)
        model.rotation.y = angleInRadians
        scene.add(model);
    }
);

gl.load(
    'models/casa 1/scene.gltf',
    (gltf) => {
        const model = gltf.scene;
        model.position.set(-20, -28,0)
        scene.add(model);
    }
);

gl.load(
    'models/casa 3/scene.gltf',
    (gltf) => {
        const model = gltf.scene;
        model.rotation.y = angleInRadians
        model.position.set(0, -29,20)
        scene.add(model);
    }
);

gl.load(
    'models/montana/scene.gltf',
    (gltf) => {
        const model = gltf.scene;
        model.position.set(0, 0,0)
        scene.add(model);
    }
);


gl.load(
    'models/uploads_files_2901103_Eren(Titan).glb',
    (gltf) => {
        const model = gltf.scene;
        model.rotation.y = angle
        model.position.set(-25, -29,25)
        scene.add(model);
    }
);

const fbx = new FBXLoader()
fbx.load(
    'models/Cloud_Polygon_Blender_1.fbx',
    (object) => {
        object.position.set(0,50,0)
        scene.add(object)
    }
)

const composer = new EffectComposer(renderer);
const renderPass = new RenderPass( scene, camera );
composer.addPass( renderPass );

const smaapass = new SMAAPass();
composer.addPass( smaapass );


window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

function animate() {
    requestAnimationFrame(animate)

    pointLights.forEach(function (pointLight) {
        var range = 1; // Maximum range of movement in each axis
        var speed = 0.2; // Speed of movement
    
        // Generate random displacements within the defined range
        var dx = Math.random() * range - range / 2;
        var dy = Math.random() * range - range / 2;
        var dz = Math.random() * range - range / 2;
    
        // Update the position of the point light
        pointLight.position.x += dx * speed;
        pointLight.position.y += dy * speed;
        pointLight.position.z += dz * speed;
      });
    
    controls.update()

    render()

   
}

function render() {
    composer.render()

}

animate()