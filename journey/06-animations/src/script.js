import './style.css'
import * as THREE from 'three'
import gsap from "gsap";

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

/**
 * Animate
 */
//フレームレートの高いコンピュータだと、キューブが早く回転してしまうので対処が必要
//1.「あるフレームと次のフレームの間にかかる時間」を計算して、 その時間を元に「画面に表示される物体をどれくらい動かすか」を計算する
//2. Clockを使う

let time = Date.now();
const clock = new THREE.Clock()

//ライブラリを使う 内部でrequestAnimationFrameが使われている
gsap.to(mesh.position,{
    duration:1,
    delay:1,
    x:2
})

const tick = () =>
{
    //前回のフレームとの時間差を計算
    // const currentTime = Date.now();
    // const deltaTime = currentTime - time;
    // time = currentTime;

    //フレームレートが遅ければ、その分deltaTimeが大きくなるので、採算が取れる
    // mesh.rotation.y += 0.001 * deltaTime

    //Clock が作成されてから何秒経過したかを返す
    // const elapsedTime = clock.getElapsedTime();

    // mesh.position.x = Math.cos(elapsedTime)
    // mesh.position.y = Math.sin(elapsedTime)
    // camera.lookAt(mesh.position);
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()
