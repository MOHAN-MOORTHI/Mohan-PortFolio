import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float } from '@react-three/drei';

function FloatingCube({ position, color }) {
    const mesh = useRef();

    useFrame((state, delta) => {
        if (mesh.current) {
            mesh.current.rotation.x += delta * 0.2;
            mesh.current.rotation.y += delta * 0.3;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <mesh ref={mesh} position={position}>
                <boxGeometry args={[1.5, 1.5, 1.5]} />
                <meshStandardMaterial color={color} roughness={0.3} metalness={0.8} />
            </mesh>
        </Float>
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
        <div className="h-screen w-full relative bg-dark-bg overflow-hidden">
            {/* 3D Scene */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                    <color attach="background" args={['#0f172a']} />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1.5} />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} color="#38bdf8" />

                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                    <FloatingCube position={[-3, 2, -2]} color="#a855f7" />
                    <FloatingCube position={[3, -2, -1]} color="#38bdf8" />
                    <FloatingCube position={[-2, -3, 0]} color="#ef4444" />
                    <FloatingCube position={[2, 3, -3]} color="#10b981" />
                    <FloatingCube position={[0, 0, -5]} color="#fbbf24" />

                    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
                </Canvas>
            </div>

            {/* Overlay Content */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10 w-full px-4">
                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-br from-white via-gray-200 to-gray-500 bg-clip-text text-transparent mb-6 drop-shadow-2xl tracking-tight">
                    {title}
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-10 font-light tracking-wide max-w-2xl mx-auto">
                    {subtitle}
                </p>
                <div className="perspective-1000">
                    <button
                        onClick={scrollToProjects}
                        className="bg-gradient-to-r from-secondary to-accent px-8 py-4 rounded-full font-bold text-white shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/80 transform hover:-translate-y-1 transition-all duration-300"
                    >
                        {ctaText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Hero3D;
