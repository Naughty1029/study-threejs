import './style.css'
import * as THREE from "three";

/**
オブジェクトを変形する4つのプロパティ
- position (オブジェクトを移動させる)
- scale (オブジェクトのサイズを変更)
- rotation (オブジェクトを回転させる)
- quaternion (オブジェクトを回転させる。詳細は後述)

上記については、three.jsの基礎クラスであるObject3Dクラスのプロパティ
 */

/**
 * Scene
 * */
 const scene = new THREE.Scene();

 /**
  * Mesh
  * */
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({color:'0xff0000'});
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);
 
 /**
  * Sizes
  * */
 const sizes = {
   width: 800,
   height: 600
 }
 
 
 /**
  * Camera
  * */
 const camera = new THREE.PerspectiveCamera(
   75,
   sizes.width / sizes.height 
 );
 camera.position.z = 4;
 scene.add(camera);

/**
 * positionプロパティ
 */
//positionプロパティはrenderの前に指定すること
//1という単位は自分で定義していいが、プロジェクトに相応しいものにしておく
mesh.position.x = 0.7
mesh.position.y = - 0.6
mesh.position.z = 1
//positionプロパティはオブジェクトではなく、Vector3クラスのインスタンスなので、さまざまなメソッドが用意されている
console.log(mesh.position.length())//中心との距離
console.log(mesh.position.distanceTo(camera.position))//カメラとの距離
console.log(mesh.position.normalize())//中心との距離が1になるように調整してくれる
console.log(mesh.position.length())// >> 1
console.log(mesh.position.random())//x,y,zに0-1のランダムな数値をいれる
mesh.position.set(0,2,0)
 
/**
 * Scaleプロパティ(Vector3クラスのインスタンス)
 */
//マイナス値を使うとバグの元になるので使わない。
mesh.scale.x = 0.5;
mesh.scale.y = 1.5;
mesh.scale.z = 0.7;
mesh.scale.set(1,1,1);

/**
 * Rotateプロパティ(2つある。Eulerクラスのインスタンス)
 */
//回転の角度はラジアン角で表現する
//three.js の演算順はデフォルトでX-Y-Z の順番で演算
//下記のように計算順序を変更できるが、思わぬ回転を生むことがあるので注意（ジンバルロック）
mesh.rotation.reorder("YXZ");
mesh.rotation.x = Math.PI / 4
mesh.rotation.y = Math.PI / 4

//ほとんどのエンジンや3Dソフトでは、クオータニオンという別の方法が使われる
//難しいのここでは割愛

/**
 * lookAt(...)
 * オブジェクトに何かを見るように指示できる
 */
//パラメータはVector3が必要（positionとか）
camera.lookAt(new THREE.Vector3(0, 0, 0))
// camera.lookAt(mesh.position)

/**
 * グループ化（Object3D classを継承している）
 * グループ化したものに対して、同時に変更が可能
 */
const group = new THREE.Group()
group.scale.y = 2
group.rotation.y = 0.2
scene.add(group);//groupをsceneに追加する

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
cube1.position.x = - 1.5
group.add(cube1)

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
cube2.position.x = 0
group.add(cube2)

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
cube3.position.x = 1.5
group.add(cube3)

/**
 * Axes Helper
 */
const axesHelper = new THREE.AxesHelper(2);//引数は線の長さ
scene.add(axesHelper);

 /**
  * Renderer
  */
 const canvas = document.querySelector('canvas.webgl');
 const renderer = new THREE.WebGLRenderer({
   canvas
 })
 renderer.setSize(sizes.width,sizes.height);
 renderer.render(scene,camera);