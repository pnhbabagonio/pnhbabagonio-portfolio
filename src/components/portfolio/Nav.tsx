import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-md">
      <div className="absolute inset-0 bg-black/40 border-b border-white/5" />
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <button onClick={() => go("home")} className="font-display text-sm font-bold uppercase tracking-[0.25em] text-white">
          <span className="text-[var(--neon-red)]">P/</span>NEEL
        </button>
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => go(l.id)}
                className="group relative font-mono text-xs uppercase tracking-[0.25em] text-white/70 transition-colors hover:text-white"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--neon-red)] transition-all duration-300 group-hover:w-full" />
              </button>
            </li>
          ))}
        </ul>
        <button className="md:hidden text-white" aria-label="Toggle menu" onClick={() => setOpen((o) => !o)}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative overflow-hidden border-t border-white/10 bg-black/90 md:hidden"
          >
            <ul className="flex flex-col px-6 py-4">
              {links.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => go(l.id)}
                    className="block w-full py-3 text-left font-mono text-sm uppercase tracking-[0.25em] text-white/80"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}