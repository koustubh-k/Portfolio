"use client";
import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

export const WebGLRendererConfig = () => {
  const { gl } = useThree();

  useEffect(() => {
    gl.setPixelRatio(window.devicePixelRatio);
  }, [gl]);

  return null;
};
