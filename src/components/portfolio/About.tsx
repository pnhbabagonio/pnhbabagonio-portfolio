import { motion } from "framer-motion";
import { User } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const stack = ["React", "TypeScript", "Three.js", "Node.js", "Python", "Tailwind", "Git", "Figma"];

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-28">
      <SectionHeading index="01" title="About" subtitle="A passionate developer engineering the next generation of digital experiences." />
      <div className="grid items-center gap-12 md:grid-cols-[280px_1fr]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto"
        >
          <div className="absolute -inset-3 rounded-full border border-[var(--neon-red)]/40 animate-pulse-border" />
          <div className="relative flex h-56 w-56 items-center justify-center overflow-hidden rounded-full border-2 border-[var(--neon-red)] bg-black glow-red">
            <div className="absolute inset-0 grid-bg opacity-40" />
            <User className="relative h-24 w-24 text-white/80" strokeWidth={1.2} />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="text-base leading-relaxed text-white/80 md:text-lg">
            I'm a Computer Science student at the{" "}
            <span className="text-[var(--neon-red)]">University of Southern Mindanao</span>, fascinated
            by the intersection of code, design, and motion. I build futuristic web experiences that feel alive —
            blending real-time 3D, fluid animation, and clean architecture.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Currently exploring WebGL, generative interfaces, and shipping projects that push what a browser can do.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {stack.map((s) => (
              <span
                key={s}
                className="border border-white/20 bg-white/5 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-white/80 transition-all hover:border-[var(--neon-red)] hover:text-[var(--neon-red)] hover:shadow-[0_0_12px_rgba(255,0,0,0.4)] clip-corner"
              >
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}