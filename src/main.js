import * as THREE from 'three';

//방법 1. 동적으로 캔버스 조립하기
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth,window.innerHeight);
// document.body.appendChild(renderer.domElement);

//방법 2. html 에 미리 canvas를 만들고 가져와 쓰기
//-> 이게 좋을 듯. 다른 html 요소들과도 더 편하게 상호작용할 수 있으니까
const canvas = document.querySelector('#three-canvas');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth,window.innerHeight);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
	75, //시야각(field of view)
	window.innerWidth / window.innerHeight, //종횡비(aspect)
	0.1, //near
	1000 //far
);
camera.position.z = 5;
scene.add(camera);