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
//PerspectiveCamera - 遠近法を表現できるカメラ（近くのものは大きく、遠いものは小さくみえる）
const camera = new THREE.PerspectiveCamera(
  75,//視野角 度数で表す 度数が小さいほど拡大されて見える
  sizes.width / sizes.height //アスペクト比
);
camera.position.z = 3;//カメラはデフォルトでシーンの中心に位置しているのでz軸に移動させる
scene.add(camera);//カメラをシーンに追加しなくても、すべて動作するが、後でバグが発生する可能性あり


/**
 * Renderer
 */
const canvas = document.querySelector('canvas.webgl');
const renderer = new THREE.WebGLRenderer({
  canvas
})
renderer.setSize(sizes.width,sizes.height);//ここで設定したサイズがcanvasに反映される
renderer.render(scene,camera);//レンダラーにsceneとcameraを渡す