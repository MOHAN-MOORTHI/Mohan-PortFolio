import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";

import CanvasLoader from "../Loader"; // Check if this import path is correct relative to where this file will be

const Ball = ({ icon }) => {
    return (
        <mesh castShadow receiveShadow scale={2.75}>
            <icosahedronGeometry args={[1, 1]} />
            <meshStandardMaterial
                color='#fff8eb'
                polygonOffset
                polygonOffsetFactor={-5}
                flatShading
            />
            {/* Decal needed for icon, simpler to use basic color mapping or just an abstraction */}
            <meshStandardMaterial color="#fff" />
        </mesh>
    );
};

const BallCanvas = ({ icon }) => {
    return (
        // Simple placeholder for BallCanvas
        <div className="w-28 h-28 flex justify-center items-center bg-white-100 rounded-full">
            <img src={icon} alt="tech" className="w-16 h-16" />
        </div>
        //     <Canvas
        //       frameloop='demand'
        //       dpr={[1, 2]}
        //       gl={{ preserveDrawingBuffer: true }}
        //     >
        //       <Suspense fallback={<CanvasLoader />}>
        //         <OrbitControls enableZoom={false} />
        //         <Ball icon={icon} />
        //       </Suspense>

        //       <Preload all />
        //     </Canvas>
    );
};

export default BallCanvas;
