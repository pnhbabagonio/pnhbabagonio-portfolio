import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "ghost";
  className?: string;
};

/** Button that subtly follows the cursor (magnetic effect). */
export function MagneticButton({ children, onClick, href, variant = "primary", className = "" }: Props) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });
  const tx = useTransform(sx, (v) => `${v}px`);
  const ty = useTransform(sy, (v) => `${v}px`);

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.25);
    y.set((e.clientY - cy) * 0.25);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  const base =
    "relative inline-flex items-center justify-center gap-2 px-7 py-3 font-display text-sm uppercase tracking-[0.2em] transition-colors clip-corner select-none cursor-pointer";
  const variants = {
    primary: "bg-[var(--neon-red)] text-white hover:bg-[#ff2424] glow-red",
    ghost: "border border-white/40 text-white hover:border-[var(--neon-red)] hover:text-[var(--neon-red)]",
  } as const;

  const content = (
    <motion.span style={{ x: tx, y: ty }} className="inline-flex items-center gap-2">
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={`${base} ${variants[variant]} ${className}`}
      >
        {content}
      </motion.a>
    );
  }
  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {content}
    </motion.button>
  );
}