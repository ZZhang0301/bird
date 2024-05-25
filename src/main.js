import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import Stats from 'three/addons/libs/stats.module.js';
import model from './demo/sphere'
import sprite from './demo/sprite';
import cube from './demo/cube';
import plane  from './demo/plane';
import points from './demo/points';
import PM from './demo/PM'
import birds from './demo/bird'
import cylinder from './demo/Cylinder'
import ground from './demo/ground'
const clock=new THREE.Clock();


let camera, scene, renderer, stats,gui,settings={};
function init() {
  // 场景
  scene = new THREE.Scene();
  //添加物体

   scene.add(...birds,ground);
  // 相机
  camera = new THREE.PerspectiveCamera(
    75, // 视野角度
    window.innerWidth / window.innerHeight, // 长宽比
    0.1, // 近截面（near）
    1000 // 远截面（far）
  );
  camera.position.set(150, 200, 300);
  camera.lookAt(0, 0, 0);

  // 光源
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);


  // 渲染器
  renderer = new THREE.WebGLRenderer({antialias: true});
  // 获取屏幕对应的设备像素比.devicePixelRatio告诉threejs,以免渲染模糊问题
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  //renderer.render(scene, camera);
  //阴影  渲染器打开阴影的渲染

  renderer.shadowMap.enabled=true;
  //背景颜色
  renderer.setClearColor(0xa98800, 2);
  document.body.appendChild(renderer.domElement);
  
  // window.addEventListener('resize', onWindowResize);
  window.onresize = onWindowResize;
  initHelper();
  initGUI(ambientLight);
}

function animate() {
  // 浏览器刷新的时候渲染器重新渲染
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
  const delta=clock.getDelta();
  birds.forEach(bird=>bird.tick(delta))
  stats.update();
}

function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
  camera.updateProjectionMatrix();
}

function initHelper() {
  //辅助线
  const axesHelper = new THREE.AxesHelper(50);
  scene.add(axesHelper);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change', () => {
    renderer.render(scene, camera);
  });

  //网格
  // const gridHelper = new THREE.GridHelper(1000, 100);
  // scene.add(gridHelper);

  //创建stats对象
  stats = new Stats();
  //stats.domElement:web页面上输出计算结果,一个div元素，
  document.body.appendChild(stats.domElement);
}
function initGUI(ambientLight){
  const gui = new GUI();
  const obj = {
    x: 1,
    intensity: 1
  }
  //各种控件，plane专用
  // gui.add(obj, 'x', -10, 10, 2).name('x的值')
  // gui.add(ambientLight,'intensity',0,4).name('环境光强度')


}

init();
animate();