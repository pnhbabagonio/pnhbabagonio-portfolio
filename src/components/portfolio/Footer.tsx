export function Footer() {
  return (
    <footer className="relative border-t border-white/10 px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center font-mono text-xs uppercase tracking-[0.25em] text-white/50 md:flex-row md:text-left">
        <span>© {new Date().getFullYear()} Philip Neel Babagonio</span>
        <span>
          Built with <span className="text-[var(--neon-red)]">React</span> +{" "}
          <span className="text-[var(--neon-red)]">Three.js</span>
        </span>
      </div>
    </footer>
  );
}