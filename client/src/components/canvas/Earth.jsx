import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Earth = () => {
    return (
        // Abstract Earth globe using wireframe/points
        <group rotation={[-Math.PI / 2, 0, Math.PI / 4]} scale={2.5}>
            <points>
                <sphereGeometry args={[1, 64, 64]} />
                <pointsMaterial color="#915EFF" size={0.02} sizeAttenuation={true} />
            </points>
            <mesh>
                <sphereGeometry args={[0.95, 32, 32]} />
                <meshStandardMaterial color="#050816" transparent opacity={0.9} />
            </mesh>
        </group>
    );
};

const EarthCanvas = () => {
    return (
        <Canvas
            shadows
            frameloop='demand'
            dpr={[1, 2]}
            gl={{ preserveDrawingBuffer: true }}
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [-4, 3, 6],
            }}
        >
            <Suspense fallback={<CanvasLoader />}>
                <OrbitControls
                    autoRotate
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
                <Earth />

                <Preload all />
            </Suspense>
        </Canvas>
    );
};

export default EarthCanvas;
