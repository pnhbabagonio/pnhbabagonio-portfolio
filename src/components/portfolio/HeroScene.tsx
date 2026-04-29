import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function WireCore({ isMobile }: { isMobile: boolean }) {
  const group = useRef<THREE.Group>(null!);
  const inner = useRef<THREE.Mesh>(null!);
  useFrame((_, dt) => {
    if (group.current) {
      group.current.rotation.x += dt * 0.15;
      group.current.rotation.y += dt * 0.22;
    }
    if (inner.current) {
      inner.current.rotation.x -= dt * 0.3;
      inner.current.rotation.z += dt * 0.2;
    }
  });
  // Tone down opacity on mobile so the wireframe reads softer
  // against the smaller viewport without losing presence.
  const mainOpacity = isMobile ? 0.55 : 0.85;
  const haloOpacity = isMobile ? 0.1 : 0.18;
  const knotOpacity = isMobile ? 0.35 : 0.55;
  const detail = isMobile ? 0 : 1;
  const knotSegs: [number, number, number, number] = isMobile
    ? [0.7, 0.15, 64, 8]
    : [0.7, 0.15, 128, 16];
  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[2.2, detail]} />
        <meshBasicMaterial color="#ff0000" wireframe transparent opacity={mainOpacity} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[2.6, 0]} />
        <meshBasicMaterial color="#ff0000" wireframe transparent opacity={haloOpacity} />
      </mesh>
      <mesh ref={inner}>
        <torusKnotGeometry args={knotSegs} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={knotOpacity} />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setIsMobile(mq.matches);
      setReducedMotion(rm.matches);
    };
    update();
    mq.addEventListener("change", update);
    rm.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      rm.removeEventListener("change", update);
    };
  }, []);

  return (
    <Canvas
      dpr={isMobile ? [1, 1.25] : [1, 1.75]}
      frameloop={reducedMotion ? "demand" : "always"}
      camera={{ position: [0, 0, isMobile ? 7 : 6], fov: isMobile ? 60 : 55 }}
      gl={{
        antialias: !isMobile,
        alpha: true,
        powerPreference: isMobile ? "low-power" : "high-performance",
        premultipliedAlpha: true,
      }}
      style={{ opacity: isMobile ? 0.7 : 1, transition: "opacity 400ms ease" }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#ff0000" />
      <WireCore isMobile={isMobile} />
    </Canvas>
  );
}