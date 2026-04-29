import { Suspense } from "react";
import HeroScene from "./HeroScene";

export function HeroCanvas() {
  return (
    <div
      className="absolute inset-0 h-full w-full"
      style={{ willChange: "transform" }}
      aria-hidden
    >
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>
    </div>
  );
}