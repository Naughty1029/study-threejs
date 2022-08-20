let scene,
    camera,
    renderer,
    pointLight,
    controls,
    ballMesh,
    winW = window.innerWidth,
    winH = window.innerHeight;

window.addEventListener('load',init);
window.addEventListener('resize',onWindowResize);

function init() {
  //シーン追加
  scene = new THREE.Scene();
  //カメラ追加
  camera = new THREE.PerspectiveCamera(
    50,//視野角
    winW / winH,//アスペクト比
    0.1,//開始距離
    3000//終了距離
  );

  // レンダラー追加
  renderer = new THREE.WebGLRenderer({alpha:true});
  renderer.setSize(winW,winH);
  //画像をきれいにする
  renderer.setPixelRatio(window.devicePixelRatio);
  //ブラウザにレンダラー追加
  document.body.appendChild(renderer.domElement);

  // ジオメトリー作成
  let ballGeometry = new THREE.SphereGeometry(100,64,32);
  // マテリアル作成
  const texture = new THREE.TextureLoader().load( "/section04/images/earth.jpg" );
  let ballMaterial = new THREE.MeshPhysicalMaterial({
    map:texture
  });
  //メッシュ化
  ballMesh = new THREE.Mesh(ballGeometry,ballMaterial);
  //シーンに追加
  scene.add(ballMesh);

  //平行光源を追加
  let directionalLight = new THREE.DirectionalLight(0xffffff,2);
  directionalLight.position.set(1,1,1);
  scene.add(directionalLight);

  //ポイント光源を追加
  pointLight = new THREE.PointLight(0xffffff,1);
  scene.add(pointLight);

  //ポイント光源のヘルパー追加
  let pointLightHelper = new THREE.PointLightHelper(pointLight,30);
  scene.add(pointLightHelper);

  //マウス操作ができるようにする
  controls = new THREE.OrbitControls(camera,renderer.domElement); 

  animate();
}

//リサイズに対応
function onWindowResize() {
  winW = window.innerWidth;
  winH = window.innerHeight;
  renderer.setSize(winW,winH);
  camera.aspect = winW / winH;
  //カメラのアスペクト比を変更したら必ず呼び出す
  camera.updateProjectionMatrix();
}

let rot = 0;

function animate() {
  //ポイント光源を動かす
  pointLight.position.set(
    200 * Math.sin(Date.now() / 500),  
    200 * Math.sin(Date.now() / 1000),  
    200 * Math.cos(Date.now() / 500),  
  );

  //カメラを回転させる
  rot += 0.5;
  //ラジアン変換
  let radian = rot * (Math.PI / 180);
  camera.position.x = Math.sin(radian) * 500;
  camera.position.z = Math.cos(radian) * 500;
  camera.lookAt(ballMesh.position);

  //レンダリング
  renderer.render(scene,camera);
  requestAnimationFrame(animate);
}