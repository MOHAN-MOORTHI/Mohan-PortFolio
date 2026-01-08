import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics, useBox, usePlane } from '@react-three/cannon';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
import * as THREE from 'three';

function Plane(props) {
    const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
    return (
        <mesh ref={ref} receiveShadow>
            <planeGeometry args={[100, 100]} />
            <shadowMaterial color="#171717" transparent opacity={0.4} />
        </mesh>
    );
}

function Cube({ position, color, ...props }) {
    const [ref] = useBox(() => ({ mass: 1, position, args: [1, 1, 1], ...props }));
    return (
        <mesh ref={ref} castShadow receiveShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={color} roughness={0.5} metalness={0.1} />
        </mesh>
    );
}



const Hero3D = ({ title = "Mohan Portfolio", subtitle = "MERN Stack Developer | UI/UX Enthusiast", ctaText = "View Projects" }) => {

    const scrollToProjects = () => {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="h-screen w-full relative">
            {/* 3D Scene */}
            <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
                <color attach="background" args={['#020617']} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={1} castShadow />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <Physics>
                    <Plane position={[0, -2.5, 0]} />
                    <Cube position={[0.1, 5, 0]} color="#a855f7" />
                    <Cube position={[-1, 8, 1]} color="#38bdf8" />
                    <Cube position={[2, 6, -1]} color="#ef4444" />
                    <Cube position={[-2, 10, -2]} color="#10b981" />
                    <Cube position={[1.5, 12, 1.5]} color="#fbbf24" />
                </Physics>
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                <Environment preset="city" />
            </Canvas>

            {/* Overlay Content */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-10 w-full px-4">
                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-br from-white via-gray-200 to-gray-500 bg-clip-text text-transparent mb-4 drop-shadow-2xl">
                    {title}
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light">
                    {subtitle}
                </p>
                <button onClick={scrollToProjects} className="pointer-events-auto bg-gradient-to-r from-secondary to-accent px-8 py-3 rounded-full font-bold text-white hover:scale-105 transition-transform shadow-lg shadow-cyan-500/50">
                    {ctaText}
                </button>
            </div>
        </div>
    );
};

export default Hero3D;
