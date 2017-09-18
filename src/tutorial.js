//http://synergyseeker.com/learning-webgl-3d-getting-started-with-threejs/
var scene = new THREE.Scene();
var fieldOfView= 45;
var aspect = window.innerWidth / window.innerHeight;
var nearClippingPlane = .1;
var farClippingPlane = 1000;
var camera = new THREE.PerspectiveCamera( fieldOfView, aspect, nearClippingPlane, farClippingPlane );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );



var geometry = new THREE.CubeGeometry( .1, 4,2 );
var material = new THREE.MeshNormalMaterial()
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );
camera.position.z = 5;

cube.rotation.x += 0.01;
cube.rotation.z -= 0.01;
var render = function () {
requestAnimationFrame( render );
cube.rotation.x += 0.01;
cube.rotation.z -= 0.01;
renderer.render( scene, camera );
};
 
render();
