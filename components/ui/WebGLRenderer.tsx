"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

export function WebGLRendererConfig() {
  const { gl, size } = useThree();

  useEffect(() => {
    if (typeof window !== "undefined") {
      gl.setPixelRatio(window.devicePixelRatio);
      gl.setSize(size.width, size.height);
      gl.setClearColor(0xffaaff, 0);
    }
  }, [gl, size.width, size.height]);

  return null;
}
