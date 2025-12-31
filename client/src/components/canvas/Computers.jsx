import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

// Since we don't have a guaranteed external model URL, 
// let's create a cool "Laptop-like" composition using primitive shapes
// or try to load a model if we had one.
// For robustness, I'll use a simple conceptual 3D object representation.

const Computers = ({ isMobile }) => {
    // Abstract computer representation
    return (
        <group dispose={null} position={[0, -2, 0]} rotation={[0, -0.2, -0.1]}>
            {/* Screen */}
            <mesh position={[0, 1.5, -1.5]} rotation={[0.2, 0, 0]}>
                <boxGeometry args={[3.6, 2.4, 0.1]} />
                <meshStandardMaterial color="black" roughness={0.5} metalness={0.8} />
            </mesh>
            {/* Screen glow (content) */}
            <mesh position={[0, 1.5, -1.44]} rotation={[0.2, 0, 0]}>
                <planeGeometry args={[3.4, 2.2]} />
                <meshStandardMaterial color="#915eff" emissive="#915eff" emissiveIntensity={0.5} />
            </mesh>

            {/* Base */}
            <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
                <boxGeometry args={[3.6, 0.1, 2.4]} />
                <meshStandardMaterial color="#222" roughness={0.5} metalness={0.8} />
            </mesh>

            {/* Simple Light to make it look 3D */}
            <spotLight
                position={[-20, 50, 10]}
                angle={0.12}
                penumbra={1}
                intensity={1}
                castShadow
                shadow-mapSize={1024}
            />
            <pointLight intensity={1} />
        </group>
    );
};

const ComputersCanvas = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Add a listener for changes to the screen size
        const mediaQuery = window.matchMedia("(max-width: 500px)");

        // Set the initial value of the `isMobile` state variable
        setIsMobile(mediaQuery.matches);

        // Define a callback function to handle changes to the media query
        const handleMediaQueryChange = (event) => {
            setIsMobile(event.matches);
        };

        // Add the callback function as a listener for changes to the media query
        mediaQuery.addEventListener("change", handleMediaQueryChange);

        // Remove the listener when the component is unmounted
        return () => {
            mediaQuery.removeEventListener("change", handleMediaQueryChange);
        };
    }, []);

    return (
        <Canvas
            frameloop='demand'
            shadows
            dpr={[1, 2]}
            camera={{ position: [20, 3, 5], fov: 25 }}
            gl={{ preserveDrawingBuffer: true }}
        >
            <Suspense fallback={<CanvasLoader />}>
                <OrbitControls
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
                <Computers isMobile={isMobile} />
            </Suspense>

            <Preload all />
        </Canvas>
    );
};

export default ComputersCanvas;
