import React, {Component} from 'react';
import ReactDom from "react-dom";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import Controls from "./utils/controls"
import logo from './logo.svg';
import './App.css';

const style = {
  height: '100vh'
};

class App extends Component {
  constructor(props) {
    super(props);
    this.loader = new GLTFLoader();
    this.dracoLoader = new DRACOLoader();
    this.dracoLoader.setDecoderPath('three/examples/js/libs/draco/');
    this.loader.setDRACOLoader(this.dracoLoader);
  }

  componentDidMount() {
    this.sceneSetup();
    this.addCustomSceneObjects();
    this.startAnimationLoop();
    window.addEventListener("resize", this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID);
    this.controls.dispose();
  }

  sceneSetup = () => {
    // get container dimensions and use them for scene sizing
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;
    
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75, // fov = field of view
      width / height, // aspect ratio
      0.1, // near plane
      1000 // far plane
    );
    this.camera.position.set(10, 20, 10);
    // this.controls = new OrbitControls(this.camera, this.el);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.el.appendChild(this.renderer.domElement); // mount using React ref
  };

  addCustomSceneObjects = () => {
    /*
      Models
    */
    const planeSize = 1000;
    const seaColor = 0x4db8ff
    const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
    const planeMat = new THREE.MeshLambertMaterial({color: seaColor});
    const planeMesh = new THREE.Mesh(planeGeo, planeMat);
    planeMesh.rotateX(-Math.PI / 2.0);
    this.scene.add(planeMesh);

    // load model
    this.loader.load(
      './resources/models/Tugboat.gltf', 
      this.loadModels,
      (xhr)=> {
        console.log( "loading progess", xhr.loaded, xhr.total);
      },
      (error) => {console.log("model loading error");
      });

    
    /*
      Lights
    */
    const skyColor = 0x87CEFA;
    const hemiLight = new THREE.HemisphereLight(skyColor, seaColor, 1);
    this.scene.add(hemiLight);

    /*
      Other
    */
    const axesHelper = new THREE.AxesHelper(10);
    this.scene.add(axesHelper);
  };

  loadModels = (gltf) => {
    gltf.scene.name = "boat";
    this.scene.add(gltf.scene);
    this.controls = new Controls(this.scene.getObjectByName("boat"), this.camera, this.el);
  }

  startAnimationLoop = () => {
    if (this.controls) {
      this.controls.update();
    }
    this.renderer.render(this.scene, this.camera);

    // The window.requestAnimationFrame() method tells the browser that you wish to perform
    // an animation and requests that the browser call a specified function
    // to update an animation before the next repaint
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
  };

  handleWindowResize = () => {
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;

    // Note that after making changes to most of camera properties you have to call
    // .updateProjectionMatrix for the changes to take effect.
    this.camera.updateProjectionMatrix();
  };

  render() {
    return <div style={style} ref={ref => (this.el = ref)} tabIndex="-1"/>;
  }
}


export default App;
