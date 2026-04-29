import { Suspense, lazy } from "react";

// Lazy-load Three.js scene to keep initial bundle light
const Scene = lazy(() => import("./HeroScene"));

export function HeroCanvas() {
  return (
    <div
      className="absolute inset-0 h-full w-full"
      style={{ willChange: "transform" }}
      aria-hidden
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </div>
  );
}