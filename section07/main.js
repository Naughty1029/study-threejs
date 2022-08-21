
let scene, camera, renderer, pointLight, controls,sphere,plane,octahedron;

window.addEventListener("load", init);

function init() {
  //シーン
  scene = new THREE.Scene();

  //カメラ
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(1, 1, 2);

  //レンダラー
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  document.body.appendChild(renderer.domElement);

  /**
   * マテリアルセクション
   */

  //ジオメトリ
  const sphereGeometry = new THREE.SphereGeometry(0.5,16,16);
  const planeGeometry = new THREE.PlaneGeometry(1,1);
  const octahedronGeometry = new THREE.OctahedronGeometry(0.5);

  //テキスチャ
  const texture = new THREE.TextureLoader().load("/section07/textures/wood.jpg");
  //マテリアル
  // const material = new THREE.MeshBasicMaterial({
  //   map:texture
  // });
  // const material = new THREE.MeshNormalMaterial();
  // const material = new THREE.MeshStandardMaterial();
  const material = new THREE.MeshPhongMaterial();
  //planeの裏側も確認できるようにする
  material.side = THREE.DoubleSide;
  // material.flatShading = true;
  // material.roughness = 0.1;
  // material.metalness = 0.5;

  //ライトを追加
  const ambientLight = new THREE.AmbientLight(0xffffff,0.3);
  const pointLight = new THREE.PointLight(0xffffff,0.7);
  pointLight.position.set(1,2,3);

  const pointLightHelper = new THREE.PointLightHelper( pointLight, 1 );
  scene.add(ambientLight,pointLight,pointLightHelper);

  //メッシュ
  sphere = new THREE.Mesh(sphereGeometry,material);
  plane = new THREE.Mesh(planeGeometry,material);
  octahedron = new THREE.Mesh(octahedronGeometry,material);

  sphere.position.x = -1.5;
  octahedron.position.x = 1.5;

  scene.add(sphere,plane,octahedron);

  //マウス操作
  const controls = new THREE.OrbitControls(camera, renderer.domElement);

  window.addEventListener("resize", onWindowResize);

  animate();
}

const clock = new THREE.Clock();
function animate() {
  const elapsedTime = clock.getElapsedTime();
  //オブジェクトの回転
  sphere.rotation.x = elapsedTime;
  plane.rotation.x = elapsedTime;
  octahedron.rotation.x = elapsedTime;
  sphere.rotation.y = elapsedTime;
  plane.rotation.y = elapsedTime;
  octahedron.rotation.y = elapsedTime;
  //レンダリング
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

//ブラウザのリサイズに対応
function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}
