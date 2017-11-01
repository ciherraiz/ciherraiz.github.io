console.log("Hello OBJ");

var httpDataAccess = vtk.IO.Core.DataAccessHelper.HttpDataAccessHelper;

var urlExtract = vtk.Common.Core.vtkURLExtract.extractURLParameters;
var fullScreenRenderer = vtk.Rendering.Misc.vtkFullScreenRenderWindow.newInstance({ background: [0, 0, 0] });

var objReader = vtk.IO.Misc.vtkOBJReader.newInstance();
var mtlReader = vtk.IO.Misc.vtkMTLReader.newInstance();
var mapper = vtk.Rendering.Core.vtkMapper.newInstance();
var actor = vtk.Rendering.Core.vtkActor.newInstance();


const iOS = /iPad|iPhone|iPod/.test(window.navigator.platform);
let autoInit = true;

if (iOS) {
  document.querySelector('body').classList.add('is-ios-device');
}


function emptyContainer(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function loadOBJ(container, options) {
  emptyContainer(container);
  const renderer = fullScreenRenderer.getRenderer();
  const renderWindow = fullScreenRenderer.getRenderWindow();

  const reader = new FileReader();
  reader.onload = function onLoad(e) {
  objReader.parse(reader.result);
  const nbOutputs = objReader.getNumberOfOutputPorts();
    for (let idx = 0; idx < nbOutputs; idx++) {
      const source = objReader.getOutputData(idx);
      actor.setMapper(mapper);
      mapper.setInputData(source);
      renderer.addActor(actor);
    }
    renderer.resetCamera();
    renderWindow.render();
  };
  console.log(options.objfile);
  reader.readAsText(options.objfile);

}


function loadOBJ2(obj, container, options) {
  emptyContainer(container);
  const renderer = fullScreenRenderer.getRenderer();
  const renderWindow = fullScreenRenderer.getRenderWindow();

  const reader = new FileReader();
  reader.onload = function onLoad(e) {
    objReader.parse(obj);
    const nbOutputs = objReader.getNumberOfOutputPorts();
    for (let idx = 0; idx < nbOutputs; idx++) {
      const source = objReader.getOutputData(idx);
      actor.setMapper(mapper);
      mapper.setInputData(source);
      renderer.addActor(actor);
    }
    renderer.resetCamera();
    renderWindow.render();
  };
  console.log(options.objfile);
  reader.readAsText(obj);

}




function fetchOBJ(url, container, options){
  const request = new XMLHttpRequest();
  //True=asyncronous
  request.open('GET', url, true);
  request.onload = function() {
    console.log(request.response);
    loadOBJ2(request.response, container, options)
  }
  //request.responseType = 'arraybuffer';
  request.responseType = 'blob';
  request.send();
}

function foo (url) {
    const renderer = fullScreenRenderer.getRenderer();
    const renderWindow = fullScreenRenderer.getRenderWindow();
    objReader.setUrl(url);
    const size = objReader.getNumberOfOutputPorts();
    console.log(size);

    for (let i = 0; i < size; i++) {
      const polydata = objReader.getOutputData(i);
      //const name = polydata.get('name').name;
      const source = objReader.getOutputData(i);
      const name = 'puf'
      actor.setMapper(mapper);
      mapper.setInputData(source);
      mapper.setInputData(polydata);

      //materialsReader.applyMaterialToActor(name, actor);
      renderer.addActor(actor);

      //scene.push({ name, polydata, mapper, actor });
    }

    renderer.resetCamera();
    renderWindow.render();
    console('hey');
}

const userParams = urlExtract();
console.log(userParams);

//httpHelper = new httpDataAccess()
//httpHelper.fetchBinary('cilindro.obj')
//getOBJ('tumor.obj')
const rootBody = document.querySelector('body');
//fetchOBJ('tumor.obj', rootBody, userParams)
foo('tumor.obj')

//if (userParams.objfile) {
//  const rootBody = document.querySelector('body');
//  loadOBJ(rootBody, userParams);
//}




function getOBJ(url){
  var request = new XMLHttpRequest();
  //True=asyncronous
  request.open('GET', url, true);
  request.responseType = 'blob';
  request.onload = function() {
    var reader = new FileReader();
    //reader.readAsDataURL(request.response);
    reader.readAsText(request.response);
    reader.onload =  function(e){
    console.log('DataURL:', e.target.result);
    };
  };
  request.send();
}

global.objReader = objReader;
global.fullScreenRenderer = fullScreenRenderer;
