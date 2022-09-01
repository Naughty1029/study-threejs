import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { DoubleSide } from 'three'
import * as dat from 'lil-gui'

const gui = new dat.GUI()

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */

//texture loader
const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('/textures/matcaps/1.png')
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')

/** 
 * MeshBasicMaterial
 * 一番基本のマテリアル
 */
// const material = new THREE.MeshBasicMaterial({
//     // map:doorColorTexture,
//     // alphaMap: doorAlphaTexture
// });
// material.color = new THREE.Color("red");//色の変更
// material.wireframe = true;//ワイヤーフレームの表示

//opacityプロパティを動作させるにはtransparentプロパティをtrueに設定する
// material.transparent = true;
// material.opacity = 0.5;
// material.side = DoubleSide;//レンダリングに負荷がかかるのでDoubleSideにする必要がなければ、使わない。

/** 
 * MeshNormalMaterial
 * 法線テクスチャのような、紫、青、緑がかった素敵な色を表示 //法線のデバッグに便利
 */
// const material = new THREE.MeshNormalMaterial();
// material.flatShading = true//面を平らにする


/**
 * MeshMatcapMaterial
 * テカリを再現するマテリアル
 * 球体のように見えるテクスチャを用意する必要がある
 * 法線の方向に従ってテクスチャ上の色を選択してくれる
 * テカリの位置にカメラに向きは関係ない
 */
// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture;

/**
 * MeshDepthMaterial
 * ジオメトリがカメラのnearの値に近い場合は白で、farの値に近い場合は黒で単純に色付けされる
 */
// const material = new THREE.MeshDepthMaterial()

/**
 * MeshLambertMaterial
 * ライトが必要
 * ライトを使用するマテリアルの中で最もパフォーマンスが高いマテリアル
 */
// const material = new THREE.MeshLambertMaterial();

/**
 * MeshPhongMaterial
 * MeshLambertMaterialと非常によく似ていますが、奇妙な模様はあまり見られず、ジオメトリの表面での光の反射も見ることができます。
 */
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100 //光沢度の変更
// material.specular = new THREE.Color(0x1188ff)//光沢の色変更

/**
 * MeshToonMaterial
 * 漫画的なスタイル
 */
// const material = new THREE.MeshToonMaterial();

/**
 * MeshStandardMaterial
 * 物理ベースのレンダリング原則を使用(PBR)
 * ライトをサポート
 * より現実的なアルゴリズムと、粗さや金属度などのより良いパラメータを使用
 */
 const material = new THREE.MeshStandardMaterial()
 material.metalness = 0.7
 material.roughness = 0.2
 gui.add(material, 'metalness').min(0).max(1).step(0.0001)
 gui.add(material, 'roughness').min(0).max(1).step(0.0001)

gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)

const cubeTextureLoader = new THREE.CubeTextureLoader()

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.jpg',
    '/textures/environmentMaps/0/nx.jpg',
    '/textures/environmentMaps/0/py.jpg',
    '/textures/environmentMaps/0/ny.jpg',
    '/textures/environmentMaps/0/pz.jpg',
    '/textures/environmentMaps/0/nz.jpg'
])

material.envMap = environmentMapTexture

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5,16,16),
    material
)
sphere.position.x = -1.5;

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1,1),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 16, 32),
    material
)
torus.position.x = 1.5;

scene.add(sphere,plane,torus);

/**
 * Light
 */

 const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
 scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    //update objects
    sphere.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    plane.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()