import './style.css'
import * as THREE from 'three'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera
//nearとfarの値を大きすぎたり、小さすぎたりさせるとz-fightingというバグが起きるので注意
const camera = new THREE.PerspectiveCamera(
    75, //FOV 角度
    sizes.width / sizes.height, //Aspect比
    0.1,//near
    100//far
)

//遠近感がないカメラ
// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(
//     - 1 * aspectRatio,//left
//     1 * aspectRatio,//right
//     1,//top
//     - 1,//bottom
//     0.1,//near
//     100 //far
// )

camera.position.x = 2
camera.position.y = 2
camera.position.z = 2
camera.lookAt(mesh.position)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    mesh.rotation.y = elapsedTime;

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()