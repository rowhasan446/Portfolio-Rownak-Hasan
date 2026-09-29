"use client";
import React, { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";

const parseHexColor = (hex) => {
  if (!hex) return [1, 1, 1];
  let cleanHex = hex.replace("#", "");
  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split("")
      .map((char) => char + char)
      .join("");
  }
  const num = parseInt(cleanHex, 16);
  return [
    ((num >> 16) & 255) / 255,
    ((num >> 8) & 255) / 255,
    (num & 255) / 255,
  ];
};

const getOriginCoordinates = (originStr) => {
  switch (originStr) {
    case "top-left":
      return [0.0, 1.0];
    case "top-right":
      return [1.0, 1.0];
    case "center":
      return [0.5, 0.5];
    case "left":
      return [0.0, 0.5];
    case "right":
      return [1.0, 0.5];
    case "bottom-center":
      return [0.5, 0.0];
    case "bottom-left":
      return [0.0, 0.0];
    case "bottom-right":
      return [1.0, 0.0];
    case "top-center":
    default:
      return [0.5, 1.0];
  }
};

const vertexShader = /* glsl */ `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uRayOrigin;
  uniform vec3 uRaysColor;
  uniform float uRaysSpeed;
  uniform float uLightSpread;
  uniform float uRayLength;
  uniform vec2 uMouse;
  uniform float uMouseInfluence;
  uniform float uNoiseAmount;
  uniform float uDistortion;
  uniform bool uPulsating;
  uniform float uFadeDistance;
  uniform float uSaturation;

  varying vec2 vUv;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    vec2 st = gl_FragCoord.xy / uResolution.xy;
    vec2 origin = uRayOrigin;

    if (uMouseInfluence > 0.0) {
      origin += (uMouse - vec2(0.5)) * uMouseInfluence;
    }

    vec2 dir = st - origin;
    float dist = length(dir);
    float angle = atan(dir.y, dir.x);

    float speed = uTime * uRaysSpeed * 0.8;

    float rayPattern1 = sin(angle * 16.0 + speed) * 0.5 + 0.5;
    float rayPattern2 = cos(angle * 24.0 - speed * 1.5) * 0.5 + 0.5;
    float rayPattern = mix(rayPattern1, rayPattern2, 0.5);

    if (uNoiseAmount > 0.0) {
      rayPattern += (noise(vec2(angle * 10.0, speed)) - 0.5) * uNoiseAmount;
    }

    if (uDistortion > 0.0) {
      dist += sin(angle * 10.0 + uTime) * 0.05 * uDistortion;
    }

    float spread = pow(clamp(1.0 - dist * (1.0 / uRayLength), 0.0, 1.0), clamp(uLightSpread * 2.0, 0.1, 10.0));
    float fade = pow(clamp(1.0 - dist / uFadeDistance, 0.0, 1.0), 1.2);

    float pulse = 1.0;
    if (uPulsating) {
      pulse = 0.85 + 0.15 * sin(uTime * 3.0);
    }

    float intensity = clamp(rayPattern * spread * fade * pulse, 0.0, 1.0);

    vec3 color = uRaysColor * intensity;

    float gray = dot(color, vec3(0.299, 0.587, 0.114));
    color = mix(vec3(gray), color, uSaturation);

    gl_FragColor = vec4(color, intensity * 0.65);
  }
`;

const LightRays = ({
  raysOrigin = "top-center",
  raysColor = "#ffffff",
  raysSpeed = 1,
  lightSpread = 0.5,
  rayLength = 3,
  followMouse = true,
  mouseInfluence = 0.1,
  noiseAmount = 0,
  distortion = 0,
  className = "",
  pulsating = false,
  fadeDistance = 1,
  saturation = 1,
}) => {
  const containerRef = useRef(null);
  const mouseRef = useRef([0.5, 0.5]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ alpha: true, dpr: Math.min(window.devicePixelRatio, 2) });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);

    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    gl.canvas.style.display = "block";
    gl.canvas.style.pointerEvents = "none";

    const geometry = new Triangle(gl);

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: [container.clientWidth || 1, container.clientHeight || 1] },
      uRayOrigin: { value: getOriginCoordinates(raysOrigin) },
      uRaysColor: { value: parseHexColor(raysColor) },
      uRaysSpeed: { value: raysSpeed },
      uLightSpread: { value: lightSpread },
      uRayLength: { value: rayLength },
      uMouse: { value: [0.5, 0.5] },
      uMouseInfluence: { value: followMouse ? mouseInfluence : 0.0 },
      uNoiseAmount: { value: noiseAmount },
      uDistortion: { value: distortion },
      uPulsating: { value: pulsating },
      uFadeDistance: { value: fadeDistance },
      uSaturation: { value: saturation },
    };

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms,
      transparent: true,
    });

    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      uniforms.uResolution.value = [width, height];
    };

    window.addEventListener("resize", resize);
    resize();

    const handleMouseMove = (e) => {
      if (!followMouse) return;
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height; // gl coordinates flipped Y
      mouseRef.current = [x, y];
    };

    if (followMouse) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    let animationFrameId;
    let startTime = performance.now();

    const update = (t) => {
      animationFrameId = requestAnimationFrame(update);
      const elapsed = (t - startTime) * 0.001;
      uniforms.uTime.value = elapsed;

      // Smooth mouse lerp
      uniforms.uMouse.value[0] += (mouseRef.current[0] - uniforms.uMouse.value[0]) * 0.05;
      uniforms.uMouse.value[1] += (mouseRef.current[1] - uniforms.uMouse.value[1]) * 0.05;

      renderer.render({ scene: mesh });
    };

    animationFrameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      if (followMouse) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
      if (gl.canvas && container.contains(gl.canvas)) {
        container.removeChild(gl.canvas);
      }
    };
  }, [
    raysOrigin,
    raysColor,
    raysSpeed,
    lightSpread,
    rayLength,
    followMouse,
    mouseInfluence,
    noiseAmount,
    distortion,
    pulsating,
    fadeDistance,
    saturation,
  ]);

  return <div ref={containerRef} className={`w-full h-full ${className}`} />;
};

export default LightRays;
