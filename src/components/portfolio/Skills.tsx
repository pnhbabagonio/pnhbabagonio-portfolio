import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

const groups = [
  { title: "Frontend", items: ["React", "TypeScript", "Three.js", "Tailwind", "Framer Motion"] },
  { title: "Backend", items: ["Node.js", "Express", "Python", "PostgreSQL", "REST"] },
  { title: "Tools", items: ["Git", "Vite", "Docker", "VS Code", "Linux"] },
  { title: "Design", items: ["Figma", "UI/UX", "Motion", "Prototyping", "WebGL"] },
];

export function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-7xl px-6 py-28">
      <SectionHeading index="03" title="Skills" subtitle="Tools and disciplines I use to ship." />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((g, gi) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: gi * 0.08 }}
            className="relative border border-white/15 bg-black/40 p-6 clip-corner hover:border-[var(--neon-red)]/60 transition-colors"
          >
            <div className="mb-5 flex items-center gap-2">
              <span className="h-2 w-2 rotate-45 bg-[var(--neon-red)]" />
              <h3 className="font-display text-sm font-bold uppercase tracking-[0.22em] text-white">{g.title}</h3>
            </div>
            <ul className="flex flex-wrap gap-2">
              {g.items.map((it) => (
                <li
                  key={it}
                  className="cursor-default border border-white/20 bg-white/5 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.15em] text-white/80 transition-all duration-300 hover:bg-[var(--neon-red)] hover:text-white hover:shadow-[0_0_14px_rgba(255,0,0,0.6)] hover:border-[var(--neon-red)]"
                  style={{ clipPath: "polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%)" }}
                >
                  {it}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}