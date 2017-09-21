if (!Detector.webgl) {
    Detector.addGetWebGLMessage();
}

var container;

var camera, controls, scene, renderer;
var ambient;
var arteries = "valor inicial";

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var gui = new dat.GUI();

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
  createDatGui();

}

function createCameras() {
  camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 3;
}

function createLights() {
  ambient = new THREE.AmbientLight(0xffffff, 1.0);
  scene.add(ambient);

  var light = new THREE.DirectionalLight( 0xffffff, 1 );
  //light.position.set( 0, 1, 0 );
  scene.add( light );

}


function createObjects() {
  var objLoader = new THREE.OBJLoader();
  var texture = new THREE.TextureLoader().load('assets/textures/veins.jpg');
  var color = new THREE.Color('#ff0000');
  //texture.wrapS = THREE.RepeatWrapping;
  //texture.wrapT = THREE.RepetaWrapping;
  //texture.repeat.set(4,4);

  var material = new THREE.MeshPhongMaterial({//color: color.getHex(),
                                              specular: 0x999999,
                                              shininess: 10,
                                              map: texture
                                            });


  var name = 'arteries'
  objLoader.setPath('assets/models/');
  objLoader.load(name.concat('.obj'), function (object) {
    object.name = name;
    object.traverse(function (child) {

      if (child instanceof THREE.Mesh) {
        child.material = material;
      }
    });
    scene.add(object);
    arteries = object;

    var objectGui = gui.addFolder("object position");
    objectGui.add(arteries, 'name');
    objectGui.add(arteries.position, 'x');
    objectGui.add(arteries.position, 'y');
    objectGui.add(arteries.position, 'z');
    objectGui.open();

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

function createDatGui() {
  var cameraGui = gui.addFolder("camera position");
  cameraGui.add(camera.position, 'x');
  cameraGui.add(camera.position, 'y');
  cameraGui.add(camera.position, 'z');
  cameraGui.open();
}

function animate() {
  requestAnimationFrame(animate);

  controls.update();
  render();
}

function render() {
  renderer.render(scene, camera);
}
