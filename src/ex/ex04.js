import * as THREE from 'three';
import {func} from "three/nodes";

export function example() {
    const canvas = document.querySelector('#three-canvas');
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true, //깨지는거 보정
        alpha: true
    });
    renderer.setSize(window.innerWidth,window.innerHeight);
    //고해상도 디스플레이(크게 늘렸다가 맞춰 출력)
    renderer.setPixelRatio(window.devicePixelRatio > 1? 2:1);
    // renderer.setClearColor('#000') //색 조절 | scene color보다는 우선순위 낮음
    // renderer.setClearAlpha(0.5); //투명도 조절

    const scene = new THREE.Scene();
    // scene.background = new THREE.Color('skyblue');

    const camera = new THREE.PerspectiveCamera(
        75, //시야각(field of view)
        window.innerWidth / window.innerHeight, //종횡비(aspect)
        0.1, //near
        1000 //far
    );
    // camera.position.x = 2;
    // camera.position.y = 2;
    camera.position.z = 5;
    scene.add(camera);

    const light = new THREE.DirectionalLight(0xffffff,0.5);
    light.position.x = 1;
    light.position.z = 2;

    scene.add(light);

    //Mesh (geometry + material)
    const geometry = new THREE.BoxGeometry(1,1,1);
    const material = new THREE.MeshStandardMaterial({
        color: 'blue'
    });

    const mesh = new THREE.Mesh(geometry,material);
    scene.add(mesh);

    renderer.render(scene, camera);

    function draw(){
        //각도는 Radian을 사용
        //360도는 2파이
        // mesh.rotation.y += 0.1;
        //만약 우리가 흔히 쓰는 1도, 2도 같은 단위를 사용하고 싶다면 이렇게!
        mesh.rotation.y += THREE.MathUtils.degToRad(5);
        mesh.position.y += 0.01;
        if(mesh.position.y > 3){
            mesh.position.y = 0;
        }
        renderer.render(scene, camera);
        window.requestAnimationFrame(draw);
        //VR이나 AR같은 컨텐츠는 이 함수를 사용해야함
        // renderer.setAnimationLoop(draw);
    }
    function setSize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
    }
    window.addEventListener('resize', setSize);
    draw();
}
