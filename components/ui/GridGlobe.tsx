"use client";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const Globe = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={meshRef}>
      <Sphere args={[1, 64, 64]}>
        <meshStandardMaterial
          color="#062056"
          metalness={0.5}
          roughness={0.7}
          emissive="#062056"
          emissiveIntensity={0.1}
        />
      </Sphere>
    </mesh>
  );
};

const GridGlobe = () => {
  return (
    <div className="flex items-center justify-center absolute -left-5 top-36 md:top-40 w-full h-full">
      <div className="max-w-7xl mx-auto w-full relative overflow-hidden h-96 px-4">
        <div className="absolute w-full h-72 md:h-full z-10">
          <Canvas camera={{ position: [0, 0, 2.5] }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[-2, 0, 2]} intensity={1} />
            <Globe />
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              minPolarAngle={Math.PI / 2}
              maxPolarAngle={Math.PI / 2}
              rotateSpeed={0.4}
            />
          </Canvas>
        </div>
        <div className="absolute w-full bottom-0 inset-x-0 h-40 bg-gradient-to-b pointer-events-none select-none from-transparent dark:to-black to-white z-40" />
      </div>
    </div>
  );
};

export default GridGlobe;
