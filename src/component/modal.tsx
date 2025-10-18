"use client"
import React, { useLayoutEffect } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three-stdlib';

export default function Modal() {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    useLayoutEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        let object: THREE.Group;
        let MouseX = window.innerWidth / 2;
        let MouseY = window.innerHeight / 2;

        document.addEventListener('mousemove', (event) => {
            MouseX = (event.clientX - window.innerWidth / 2) / 100;
            MouseY = (event.clientY - window.innerHeight / 2) / 100;
        });

        const loader = new GLTFLoader();

        loader.load('/scene.gltf',
            (gltf) => {
                object = gltf.scene;
                object.lookAt(2, 1, 0);
                scene.add(object);
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            (error) => {
                console.error('An error happened', error);
            });

        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current!, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        camera.position.z = 5;

        const toplight = new THREE.DirectionalLight(0xffffff, 1);
        toplight.position.set(500, 500, 500);
        toplight.castShadow = true;
        scene.add(toplight);

        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);



        function animate() {
            requestAnimationFrame(animate);

            // Clamp rotation to 0-180 degrees (0 to Math.PI radians)
            const targetRotationY = MouseX / 2;
            const targetRotationX = MouseY / 4;

            object.rotation.y = Math.max(-0.9, Math.min(0, targetRotationY));
            object.rotation.x = Math.max(-4, Math.min(0, targetRotationX));
            renderer.render(scene, camera);
        }
        animate();

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
        window.addEventListener('resize', onWindowResize);

    })

    return (
        <div className='min-h-screen'>
            <canvas className='fixed h-screen w-screen inset-0 ' ref={canvasRef} />
        </div>
    )
}
