import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
//光の反射を表現するのに便利なライト
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight);
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)

//DirectionalLight デフォルトだと真上から光が当たる
const directionalLight = new THREE.DirectionalLight(0x00fffc,0.3);
directionalLight.position.set(1,0.25,0);
// const helper = new THREE.DirectionalLightHelper(directionalLight);
scene.add(directionalLight);

//HemisphereLight 上と下からくる光の色を変えることができる
const hemisphereLight = new THREE.HemisphereLight(0xff0000,0x0000ff,0.3)
scene.add(hemisphereLight)

//PointLight 小さいライトが全方向を照らすライト
const pointLight = new THREE.PointLight(
    0xff9000,//色
    0.5,//intensity
    10,//distance
    2//decay
);
pointLight.position.set(1,-0.5,1)
scene.add(pointLight);

//RectAreaLight 写真撮影のセットで見ることができる大きな長方形のライト
//MeshStandardMaterialとMeshPhysicalMaterialでのみ機能する
const rectAreaLight = new THREE.RectAreaLight(
    0x4e00ff,//色
    2,//intensity
    1,//width
    1//height
);
rectAreaLight.position.set(- 1.5, 0, 1.5)
rectAreaLight.lookAt(new THREE.Vector3())//default is x,y and z to 0
scene.add(rectAreaLight)

//SpotLight works like a flashlight
const spotLight = new THREE.SpotLight(
    0x78ff00,// color: the color
    0.5,// intensity: the strength
    10,// distance: the distance at which the intensity drops to 0
    Math.PI * 0.1,// angle: how large is the beam
    0.25,// penumbra: how diffused is the contour of the beam
    1// decay: how fast the light dims
);
spotLight.position.set(0, 2, 3)

spotLight.target.position.x = - 0.75
scene.add(spotLight.target)

//helpers
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2)
scene.add(hemisphereLightHelper)

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
scene.add(directionalLightHelper)

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2)
scene.add(pointLightHelper)

const spotLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(spotLightHelper)
window.requestAnimationFrame(() =>
{
    spotLightHelper.update()
})

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight)
scene.add(rectAreaLightHelper)

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

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

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()