import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { HeroCanvas } from "./HeroCanvas";
import { Particles } from "./Particles";
import { MagneticButton } from "./MagneticButton";

export function Hero() {
  const scroll = () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  return (
    <section
      id="home"
      className="scanlines relative flex min-h-screen w-full items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-70" />
      <div className="absolute inset-0">
        <HeroCanvas />
      </div>
      <Particles />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#000_85%)]" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-3 border border-[var(--neon-red)]/40 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--neon-red)] clip-corner"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--neon-red)]" />
          System Online — Portfolio v1.0
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-5xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-7xl lg:text-8xl"
        >
          <span data-text="Philip Neel" className="glitch text-glow-red">Philip Neel</span>
          <br />
          <span data-text="Babagonio" className="glitch text-[var(--neon-red)] text-glow-red">Babagonio</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 max-w-2xl font-mono text-sm uppercase tracking-[0.2em] text-white/70 md:text-base"
        >
          Computer Science Student · University of Southern Mindanao
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <MagneticButton onClick={scroll} variant="primary">
            Explore Work <ArrowDown className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton href="#contact" variant="ghost">
            Contact Me
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40"
      >
        Scroll ↓
      </motion.div>
    </section>
  );
}