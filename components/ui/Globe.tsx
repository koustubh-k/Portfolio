"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Color, Scene, Fog, PerspectiveCamera, Vector3 } from "three";
import ThreeGlobe from "three-globe";
import { Object3DNode, Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { WebGLRendererConfig } from "./WebGLRenderer";
import countries from "@/data/globe.json";

declare module "@react-three/fiber" {
  interface ThreeElements {
    threeGlobe: Object3DNode<ThreeGlobe, typeof ThreeGlobe>;
  }
}

extend({ ThreeGlobe });

const RING_PROPAGATION_SPEED = 3;
const aspect = 1.2;
const cameraZ = 300;

type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
};

export interface WorldProps {
  data: Position[];
  globeConfig: GlobeConfig;
}

// Function to generate random numbers array with unique values
function genRandomNumbers(min: number, max: number, count: number): number[] {
  const arr = Array.from({ length: max - min }, (_, i) => min + i);
  return Array.from({ length: count }, () => {
    const rand = Math.floor(Math.random() * arr.length);
    return arr.splice(rand, 1)[0];
  });
}

let numbersOfRings: number[] = [];

export function Globe({ globeConfig, data }: WorldProps) {
  const [globeData, setGlobeData] = useState<
    | {
        size: number;
        order: number;
        color: (t: number) => string;
        lat: number;
        lng: number;
      }[]
    | null
  >(null);
  const [isMounted, setIsMounted] = useState(false);

  const globeRef = useRef<ThreeGlobe | null>(null);

  const defaultProps = useMemo(
    () => ({
      pointSize: 1,
      atmosphereColor: "#ffffff",
      showAtmosphere: true,
      atmosphereAltitude: 0.1,
      polygonColor: "rgba(255,255,255,0.7)",
      globeColor: "#1d072e",
      emissive: "#000000",
      emissiveIntensity: 0.1,
      shininess: 0.9,
      arcTime: 2000,
      arcLength: 0.9,
      rings: 1,
      maxRings: 3,
      ...globeConfig,
    }),
    [globeConfig]
  );

  const _buildMaterial = useCallback(() => {
    if (!isMounted || !globeRef.current) return;

    const globeMaterial = globeRef.current.globeMaterial() as unknown as {
      color: Color;
      emissive: Color;
      emissiveIntensity: number;
      shininess: number;
    };
    globeMaterial.color = new Color(globeConfig.globeColor);
    globeMaterial.emissive = new Color(globeConfig.emissive);
    globeMaterial.emissiveIntensity = globeConfig.emissiveIntensity || 0.1;
    globeMaterial.shininess = globeConfig.shininess || 0.9;
  }, [isMounted, globeConfig]);

  const _buildData = useCallback(() => {
    if (!isMounted || !globeRef.current) return;

    const arcs = data;
    const points = arcs.flatMap((arc) => [
      {
        size: defaultProps.pointSize,
        order: arc.order,
        color: (_t: number) => arc.color,
        lat: arc.startLat,
        lng: arc.startLng,
      },
      {
        size: defaultProps.pointSize,
        order: arc.order,
        color: (_t: number) => arc.color,
        lat: arc.endLat,
        lng: arc.endLng,
      },
    ]);

    setGlobeData(points);
  }, [isMounted, data, defaultProps.pointSize]);

  const startAnimation = useCallback(() => {
    if (!isMounted || !globeRef.current || !globeData) return;

    const globe = globeRef.current as any;

    globe
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(defaultProps.showAtmosphere)
      .atmosphereColor(defaultProps.atmosphereColor)
      .atmosphereAltitude(defaultProps.atmosphereAltitude)
      .hexPolygonColor(() => defaultProps.polygonColor);

    globe
      .arcsData(data)
      .arcStartLat((d: Position) => d.startLat)
      .arcStartLng((d: Position) => d.startLng)
      .arcEndLat((d: Position) => d.endLat)
      .arcEndLng((d: Position) => d.endLng)
      .arcAlt((d: Position) => d.arcAlt)
      .arcStroke(1)
      .arcDashLength(defaultProps.arcLength)
      .arcDashGap(2)
      .arcDashInitialGap(1)
      .arcColor((e: Position) => e.color)
      .arcDashAnimateTime(defaultProps.arcTime);

    globe
      .pointsData(globeData)
      .pointColor((e: { color: (t: number) => string }) => e.color(0))
      .pointsMerge(true)
      .pointAltitude(0.0)
      .pointRadius(2);

    globe
      .ringsData([])
      .ringColor((e: any) => (t: number) => e.color(t))
      .ringMaxRadius(defaultProps.maxRings)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod(
        (defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings
      );
  }, [isMounted, globeData, data, defaultProps]);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (isMounted && globeRef.current) {
      _buildData();
      _buildMaterial();
      startAnimation();
    }
  }, [_buildData, _buildMaterial, startAnimation, isMounted]);

  return <threeGlobe ref={globeRef} args={[]} />;
}

export function World(props: WorldProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) {
    return null;
  }

  const { globeConfig } = props;
  const scene = new Scene();
  scene.fog = new Fog(0xffffff, 400, 2000);

  return (
    <Canvas scene={scene} camera={new PerspectiveCamera(50, aspect, 180, 1800)}>
      <WebGLRendererConfig />
      <ambientLight color={globeConfig.ambientLight} intensity={0.6} />
      <directionalLight
        color={globeConfig.directionalLeftLight}
        position={new Vector3(-400, 100, 400)}
      />
      <directionalLight
        color={globeConfig.directionalTopLight}
        position={new Vector3(-200, 500, 200)}
      />
      <pointLight
        color={globeConfig.pointLight}
        position={new Vector3(-200, 500, 200)}
        intensity={0.8}
      />
      <Globe {...props} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 2.5}
      />
    </Canvas>
  );
}
