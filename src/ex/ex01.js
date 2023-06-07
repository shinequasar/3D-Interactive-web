import * as THREE from 'three';

export function example() {

//방법 1. 동적으로 캔버스 조립하기
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth,window.innerHeight);
// document.body.appendChild(renderer.domElement);

//방법 2. html 에 미리 canvas를 만들고 가져와 쓰기
//-> 이게 좋을 듯. 다른 html 요소들과도 더 편하게 상호작용할 수 있으니까
    const canvas = document.querySelector('#three-canvas');
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true //깨지는거 보정
    });
    renderer.setSize(window.innerWidth,window.innerHeight);

    const scene = new THREE.Scene();

//원근카메라
// const camera = new THREE.PerspectiveCamera(
// 	75, //시야각(field of view)
// 	window.innerWidth / window.innerHeight, //종횡비(aspect)
// 	0.1, //near
// 	1000 //far
// );
// camera.position.x = 1;
// camera.position.y = 0;
// camera.position.z = 5;
// scene.add(camera);

//직교카메라(위에서 바라본 st)
    const camera = new THREE.OrthographicCamera(
        -(window.innerWidth / window.innerHeight), //left
        window.innerWidth / window.innerHeight, //right
        1, //top
        -1, //bottom
        0.1,
        1000
    );
    camera.position.x = 1;
    camera.position.y = 2;
    camera.position.z = 5;
    camera.lookAt(0,0,0);
    camera.zoom = 0.5;
    camera.updateProjectionMatrix();
    scene.add(camera);



//Mesh
    const geometry = new THREE.BoxGeometry(1,1,1);
    const material = new THREE.MeshBasicMaterial({
        color: 'blue'
    });
    const mesh = new THREE.Mesh(geometry,material);
    scene.add(mesh)

    renderer.render(scene, camera);

}