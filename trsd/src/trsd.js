/*TODO
hash table for textures and objects name
update when the window changes the dimensions
isolate in a funcion the code witch create a object
loading progress bar...
https://github.com/mrdoob/three.js/blob/master/examples/webgl_loader_nrrd.html
*/

if (!Detector.webgl) {
    Detector.addGetWebGLMessage();
}

var container;

var camera, controls, scene, renderer;
var ambient;
var arteries;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var axis;

var gui = new dat.GUI();

var stats;

init();
animate();

function init() {

  container = document.createElement('div');
  document.body.appendChild(container);
  stats = new Stats();
	container.appendChild( stats.dom );

  //create the scene
  scene = new THREE.Scene();

  createCameras();
  createLights();
  createObjects();
  createRender();
  createControls();
  createDatGui();

  axis = new THREE.AxisHelper(50);
  scene.add(axis);
  console.log(axis.position)

}

function createCameras() {
  camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight, 1, 2000);
  camera.position.z = 300;
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

  var material = new THREE.MeshPhongMaterial({color: color.getHex(),
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
        console.log(child.geometry.position);
      }
    });
    //****************************************


    //object.position.x = 30;
    //object.position.y = 0;
    //object.position.z = 770;
    scene.add(object);
    arteries = object;

    bbHelper = new THREE.BoxHelper( object, 0xff0000 );
    console.log(bbHelper.max);
    //bbHelper.center();
    scene.add( bbHelper )

    var objectGui = gui.addFolder("object position");
    objectGui.add(arteries, 'name');
    objectGui.add(arteries.position, 'x');
    objectGui.add(arteries.position, 'y');
    objectGui.add(arteries.position, 'z');
    objectGui.open();

    //object.geometry.center();
    console.log(arteries.position);

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
  stats.update();

  render();
}

function render() {
  renderer.render(scene, camera);
}
