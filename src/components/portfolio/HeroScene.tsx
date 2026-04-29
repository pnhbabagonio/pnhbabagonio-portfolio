import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function WireCore() {
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
  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[2.2, 1]} />
        <meshBasicMaterial color="#ff0000" wireframe transparent opacity={0.85} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[2.6, 0]} />
        <meshBasicMaterial color="#ff0000" wireframe transparent opacity={0.18} />
      </mesh>
      <mesh ref={inner}>
        <torusKnotGeometry args={[0.7, 0.15, 128, 16]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.55} />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6], fov: 55 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#ff0000" />
      <WireCore />
    </Canvas>
  );
}