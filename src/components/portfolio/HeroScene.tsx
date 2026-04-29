import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function WireCore({ isMobile, paused }: { isMobile: boolean; paused: boolean }) {
  const group = useRef<THREE.Group>(null!);
  const inner = useRef<THREE.Mesh>(null!);
  useFrame((_, dt) => {
    if (paused) return;
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

/**
 * Drives camera + renderer resize manually using a debounced
 * ResizeObserver. r3f's built-in resize listener is disabled
 * (resize.scroll/debounce on Canvas) so we fully control re-layout
 * during rapid orientation changes.
 */
function ResponsiveResizer({
  containerRef,
  onResizingChange,
}: {
  containerRef: React.RefObject<HTMLElement | null>;
  onResizingChange: (resizing: boolean) => void;
}) {
  const { gl, camera, size, setSize, setDpr, invalidate } = useThree();
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let debounceId: number | null = null;
    let settleId: number | null = null;
    let rafId: number | null = null;
    let lastW = size.width;
    let lastH = size.height;

    const apply = (w: number, h: number) => {
      if (w === lastW && h === lastH) return;
      lastW = w;
      lastH = h;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      setDpr(dpr);
      setSize(w, h);
      gl.setSize(w, h, false);
      if ((camera as THREE.PerspectiveCamera).isPerspectiveCamera) {
        const cam = camera as THREE.PerspectiveCamera;
        cam.aspect = w / h;
        cam.updateProjectionMatrix();
      }
      invalidate();
    };

    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const cr = entry.contentRect;
      const w = Math.max(1, Math.round(cr.width));
      const h = Math.max(1, Math.round(cr.height));

      // Mark as resizing → pause animation work briefly.
      onResizingChange(true);

      // Throttle: coalesce bursts via rAF, then commit after debounce.
      if (rafId != null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (debounceId != null) window.clearTimeout(debounceId);
        debounceId = window.setTimeout(() => apply(w, h), 80);
      });

      // Settle: re-enable rendering shortly after the last event.
      if (settleId != null) window.clearTimeout(settleId);
      settleId = window.setTimeout(() => onResizingChange(false), 180);
    });

    ro.observe(el);
    // Orientation change is its own beast — force a recompute once it fires.
    const onOrient = () => {
      const rect = el.getBoundingClientRect();
      apply(Math.max(1, Math.round(rect.width)), Math.max(1, Math.round(rect.height)));
    };
    window.addEventListener("orientationchange", onOrient);

    return () => {
      ro.disconnect();
      window.removeEventListener("orientationchange", onOrient);
      if (debounceId != null) window.clearTimeout(debounceId);
      if (settleId != null) window.clearTimeout(settleId);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, [containerRef, gl, camera, setSize, setDpr, invalidate, onResizingChange, size.width, size.height]);

  return null;
}

export default function HeroScene() {
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [resizing, setResizing] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

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
    <div
      ref={wrapRef}
      className="h-full w-full"
      style={{ opacity: isMobile ? 0.7 : 1, transition: "opacity 400ms ease" }}
    >
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
        // Disable r3f's built-in window resize listener; we manage it.
        resize={{ scroll: false, debounce: { scroll: 0, resize: 0 }, offsetSize: true }}
      >
        <ResponsiveResizer containerRef={wrapRef} onResizingChange={setResizing} />
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#ff0000" />
        <WireCore isMobile={isMobile} paused={resizing} />
      </Canvas>
    </div>
  );
}