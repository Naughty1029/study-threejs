import './style.css';
import * as THREE from "three";
import Stats from "./node_modules/three/examples/jsm/libs/stats.module.js";
import { GLTFLoader } from "./node_modules/three/examples/jsm/loaders/GLTFLoader.js";

let camera,scene,renderer;
const mixers = [];
let stats;

const clock = new THREE.Clock();

init();
animate();

//初期設定
function init() {
  const container = document.getElementById('container');
  camera = new THREE.PerspectiveCamera(30,window.innerWidth / window.innerHeight,1,5000);
  camera.position.set(0,0,250);

  scene = new THREE.Scene();

  //レンダラー
  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth,window.innerHeight);
  container.appendChild(renderer.domElement);
  renderer.outputEncoding = THREE.sRGBEncoding;//読み込んだシーンが暗いので、明るくする
  renderer.shadowMap.enabled = true;//レンダラーのシャドウを有効にする

  //リサイズイベント発火
  window.addEventListener('resize',onWindowResize);
}

//リサイズ処理用
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth,window.innerHeight);
}

//アニメーション
function animate() {
  requestAnimationFrame(animate);
  render();
}

// レンダー
function render() {
  renderer.render( scene, camera );
}