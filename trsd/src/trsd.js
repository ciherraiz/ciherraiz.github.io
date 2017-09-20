if (!Detector.webgl) {
    Detector.addGetWebGLMessage();
}

var container;

var camera, controls, scene, renderer;
var ambient;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {

  container = document.createElement('div');
  document.body.appendChild(container);

  //create the scene
  scene = new THREE.Scene();

  createCameras();
  createLights();
  createObjects();
  createRender();
  createControls();

}

function createCameras() {
  camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 3;
}

function createLights() {
  ambient = new THREE.AmbientLight(0xffffff, 1.0);
  scene.add(ambient);
}

function createObjectsFull() {
  var mtlLoader = new THREE.MTLLoader();
  mtlLoader.setBaseUrl('assets/');
  mtlLoader.setPath('assets/');
  mtlLoader.load('female-croupier-2013-03-26.mtl', function (materials) {
    materials.preload();
    materials.materials.default.map.magFilter = THREE.NearestFilter;
    materials.materials.default.map.minFilter = THREE.LinearFilter;
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('assets/');
    objLoader.load('female-croupier-2013-03-26.obj', function (object) {
                    scene.add(object);
    });
  });
}

function createObjects() {

  var objLoader = new THREE.OBJLoader();
  //objLoader.setMaterials(materials);
  objLoader.setPath('assets/');
  objLoader.load('female-croupier-2013-03-26.obj', function (object) {
                    scene.add(object);
  });
}


function createRender() {
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(new THREE.Color("hsl(0, 0%, 10%)"));

  container.appendChild(renderer.domElement);
}

function createControls() {
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = false;
}

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  render();
}

function render() {
  renderer.render(scene, camera);
}
