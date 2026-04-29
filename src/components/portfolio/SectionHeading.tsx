import { motion } from "framer-motion";

export function SectionHeading({ index, title, subtitle }: { index: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-12 flex flex-col gap-3">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-[var(--neon-red)]"
      >
        <span>{index}</span>
        <span className="h-px w-12 bg-[var(--neon-red)]" />
        <span className="text-white/60">SECTION</span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="font-display text-4xl font-bold uppercase tracking-wide text-white md:text-5xl"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="max-w-2xl text-sm text-white/60 md:text-base"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}