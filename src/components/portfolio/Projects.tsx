import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { type MouseEvent, useRef } from "react";
import { SectionHeading } from "./SectionHeading";

const projects = [
  { title: "Neon Grid OS", desc: "A web-based operating system concept with a fully animated cyberpunk UI and modular widgets.", tech: ["React", "Three.js", "Zustand"] },
  { title: "PulseChat", desc: "Realtime chat platform with voice rooms, presence indicators and adaptive theming.", tech: ["Next.js", "WebRTC", "Supabase"] },
  { title: "Vector Lab", desc: "Generative art playground exploring shaders, noise fields and audio-reactive visuals.", tech: ["WebGL", "GLSL", "TypeScript"] },
  { title: "USM Course Map", desc: "Interactive curriculum visualizer for fellow CS students at University of Southern Mindanao.", tech: ["React", "D3", "TailwindCSS"] },
];

function TiltCard({ p, i }: { p: (typeof projects)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 18 });

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: i * 0.08 }}
      whileHover={{ y: -6 }}
      className="group relative cursor-pointer"
    >
      <div className="relative h-full border border-white/15 bg-[#0a0000]/60 p-6 backdrop-blur-sm transition-all duration-300 group-hover:border-[var(--neon-red)] group-hover:shadow-[0_0_30px_rgba(255,0,0,0.45)] clip-corner">
        <span className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-[var(--neon-red)]" />
        <span className="absolute right-0 bottom-0 h-3 w-3 border-r-2 border-b-2 border-[var(--neon-red)]" />
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--neon-red)]">
            // Project_{String(i + 1).padStart(2, "0")}
          </span>
          <span className="font-mono text-[10px] text-white/30">2025</span>
        </div>
        <h3 className="mt-4 font-display text-2xl font-bold uppercase text-white">{p.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-white/60">{p.desc}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {p.tech.map((t) => (
            <span key={t} className="border border-white/20 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white/70">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-4 border-t border-white/10 pt-4">
          <a href="#" className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-white/80 transition-colors hover:text-[var(--neon-red)]">
            <ExternalLink className="h-3.5 w-3.5" /> Live
          </a>
          <a href="https://github.com/philipneel" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-white/80 transition-colors hover:text-[var(--neon-red)]">
            <Github className="h-3.5 w-3.5" /> Code
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-6 py-28">
      <SectionHeading index="02" title="Selected Work" subtitle="A few experiments and builds at the edge of the web." />
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => <TiltCard key={p.title} p={p} i={i} />)}
      </div>
    </section>
  );
}