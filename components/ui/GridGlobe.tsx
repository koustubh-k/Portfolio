"use client";
import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const World = dynamic(() => import("./Globe").then((m) => m.World), {
  ssr: false,
});

const startLat = 20.5937;
const startLng = 78.9629;

const sampleArcs = [
  {
    order: Math.random(),
    startLat: startLat,
    startLng: startLng,
    endLat: 40.7128,
    endLng: -74.006,
    arcAlt: 0.3,
    color: "#06b6d4",
  },
  {
    order: Math.random(),
    startLat: startLat,
    startLng: startLng,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.3,
    color: "#06b6d4",
  },
  {
    order: Math.random(),
    startLat: startLat,
    startLng: startLng,
    endLat: 51.5074,
    endLng: -0.1278,
    arcAlt: 0.3,
    color: "#06b6d4",
  },
  {
    order: Math.random(),
    startLat: startLat,
    startLng: startLng,
    endLat: 48.8566,
    endLng: 2.3522,
    arcAlt: 0.3,
    color: "#06b6d4",
  },
  {
    order: Math.random(),
    startLat: startLat,
    startLng: startLng,
    endLat: -33.8688,
    endLng: 151.2093,
    arcAlt: 0.3,
    color: "#06b6d4",
  },
  {
    order: Math.random(),
    startLat: startLat,
    startLng: startLng,
    endLat: -23.5505,
    endLng: -46.6333,
    arcAlt: 0.3,
    color: "#06b6d4",
  },
  {
    order: Math.random(),
    startLat: startLat,
    startLng: startLng,
    endLat: 1.3521,
    endLng: 103.8198,
    arcAlt: 0.3,
    color: "#06b6d4",
  },
  {
    order: Math.random(),
    startLat: startLat,
    startLng: startLng,
    endLat: 31.2304,
    endLng: 121.4737,
    arcAlt: 0.3,
    color: "#06b6d4",
  },
  {
    order: Math.random(),
    startLat: startLat,
    startLng: startLng,
    endLat: 52.52,
    endLng: 13.405,
    arcAlt: 0.3,
    color: "#06b6d4",
  },
  {
    order: Math.random(),
    startLat: startLat,
    startLng: startLng,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.3,
    color: "#06b6d4",
  },
  {
    order: Math.random(),
    startLat: startLat,
    startLng: startLng,
    endLat: 22.3964,
    endLng: 114.1095,
    arcAlt: 0.3,
    color: "#06b6d4",
  },
  {
    order: Math.random(),
    startLat: startLat,
    startLng: startLng,
    endLat: -33.8688,
    endLng: 151.2093,
    arcAlt: 0.3,
    color: "#06b6d4",
  },
  {
    order: Math.random(),
    startLat: startLat,
    startLng: startLng,
    endLat: 52.52,
    endLng: 13.405,
    arcAlt: 0.3,
    color: "#06b6d4",
  },
  {
    order: Math.random(),
    startLat: startLat,
    startLng: startLng,
    endLat: -23.5505,
    endLng: -46.6333,
    arcAlt: 0.3,
    color: "#06b6d4",
  },
  {
    order: Math.random(),
    startLat: startLat,
    startLng: startLng,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.3,
    color: "#06b6d4",
  },
  {
    order: Math.random(),
    startLat: startLat,
    startLng: startLng,
    endLat: 1.3521,
    endLng: 103.8198,
    arcAlt: 0.3,
    color: "#06b6d4",
  },
  {
    order: Math.random(),
    startLat: startLat,
    startLng: startLng,
    endLat: 31.2304,
    endLng: 121.4737,
    arcAlt: 0.3,
    color: "#06b6d4",
  },
  {
    order: Math.random(),
    startLat: startLat,
    startLng: startLng,
    endLat: 22.3964,
    endLng: 114.1095,
    arcAlt: 0.3,
    color: "#06b6d4",
  },
  {
    order: Math.random(),
    startLat: startLat,
    startLng: startLng,
    endLat: -33.8688,
    endLng: 151.2093,
    arcAlt: 0.3,
    color: "#06b6d4",
  },
  {
    order: Math.random(),
    startLat: startLat,
    startLng: startLng,
    endLat: 52.52,
    endLng: 13.405,
    arcAlt: 0.3,
    color: "#06b6d4",
  },
  {
    order: Math.random(),
    startLat: startLat,
    startLng: startLng,
    endLat: -23.5505,
    endLng: -46.6333,
    arcAlt: 0.3,
    color: "#06b6d4",
  },
  {
    order: Math.random(),
    startLat: startLat,
    startLng: startLng,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.3,
    color: "#06b6d4",
  },
  {
    order: Math.random(),
    startLat: startLat,
    startLng: startLng,
    endLat: 1.3521,
    endLng: 103.8198,
    arcAlt: 0.3,
    color: "#06b6d4",
  },
  {
    order: Math.random(),
    startLat: startLat,
    startLng: startLng,
    endLat: 31.2304,
    endLng: 121.4737,
    arcAlt: 0.3,
    color: "#06b6d4",
  },
];

const globeConfig = {
  pointSize: 4,
  globeColor: "#062056",
  showAtmosphere: true,
  atmosphereColor: "#FFFFFF",
  atmosphereAltitude: 0.1,
  emissive: "#062056",
  emissiveIntensity: 0.1,
  shininess: 0.9,
  polygonColor: "rgba(255,255,255,0.7)",
  ambientLight: "#38bdf8",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#ffffff",
  pointLight: "#ffffff",
  arcTime: 1000,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
};

const GridGlobe = () => {
  return (
    <div className="flex items-center justify-center absolute -left-5 top-36 md:top-40 w-full h-full">
      <div className="max-w-7xl mx-auto w-full relative overflow-hidden h-96 px-4">
        <div className="absolute w-full bottom-0 inset-x-0 h-40 bg-gradient-to-b pointer-events-none select-none from-transparent dark:to-black to-white z-40" />
        <div className="absolute w-full h-72 md:h-full z-10">
          <World data={sampleArcs} globeConfig={globeConfig} />
        </div>
      </div>
    </div>
  );
};

export default GridGlobe;
