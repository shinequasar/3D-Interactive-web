import * as THREE from 'three';

export function example() {
    const canvas = document.querySelector('#three-canvas');
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true //깨지는거 보정
    });
    renderer.setSize(window.innerWidth,window.innerHeight);
    //고해상도 디스플레이(크게 늘렸다가 맞춰 출력)
    renderer.setPixelRatio(window.devicePixelRatio > 1? 2:1);
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        75, //시야각(field of view)
        window.innerWidth / window.innerHeight, //종횡비(aspect)
        0.1, //near
        1000 //far
    );
    camera.position.x = 1;
    camera.position.y = 0;
    camera.position.z = 5;
    scene.add(camera);


    //Mesh (geometry + material)
    const geometry = new THREE.BoxGeometry(1,1,1);
    const material = new THREE.MeshBasicMaterial({
        color: 'blue'
    });
    const mesh = new THREE.Mesh(geometry,material);
    scene.add(mesh)

    renderer.render(scene, camera);

    function setSize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
    }
    window.addEventListener('resize', setSize);
}
