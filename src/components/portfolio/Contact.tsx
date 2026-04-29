import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { SectionHeading } from "./SectionHeading";
import { MagneticButton } from "./MagneticButton";

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">{label}</label>
      <input
        name={name}
        type={type}
        required
        className="w-full border border-white/20 bg-black/60 p-3 font-mono text-sm text-white outline-none transition-all focus:border-[var(--neon-red)] focus:shadow-[0_0_14px_rgba(255,0,0,0.35)]"
      />
    </div>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };
  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-6 py-28">
      <SectionHeading index="04" title="Contact" subtitle="Let's build something on the edge of the web." />
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4"
        >
          <a href="mailto:philip.babagonio@usm.edu.ph" className="group flex items-center gap-4 border border-white/15 p-5 clip-corner transition-all hover:border-[var(--neon-red)] hover:shadow-[0_0_18px_rgba(255,0,0,0.35)]">
            <Mail className="h-5 w-5 text-[var(--neon-red)]" />
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">Email</div>
              <div className="font-mono text-sm text-white group-hover:text-[var(--neon-red)]">philip.babagonio@usm.edu.ph</div>
            </div>
          </a>
          <a href="https://github.com/philipneel" target="_blank" rel="noreferrer" className="group flex items-center gap-4 border border-white/15 p-5 clip-corner transition-all hover:border-[var(--neon-red)] hover:shadow-[0_0_18px_rgba(255,0,0,0.35)]">
            <Github className="h-5 w-5 text-[var(--neon-red)]" />
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">GitHub</div>
              <div className="font-mono text-sm text-white group-hover:text-[var(--neon-red)]">github.com/philipneel</div>
            </div>
          </a>
          <a href="https://linkedin.com/in/philipneel" target="_blank" rel="noreferrer" className="group flex items-center gap-4 border border-white/15 p-5 clip-corner transition-all hover:border-[var(--neon-red)] hover:shadow-[0_0_18px_rgba(255,0,0,0.35)]">
            <Linkedin className="h-5 w-5 text-[var(--neon-red)]" />
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">LinkedIn</div>
              <div className="font-mono text-sm text-white group-hover:text-[var(--neon-red)]">linkedin.com/in/philipneel</div>
            </div>
          </a>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative border border-white/15 bg-black/50 p-8 clip-corner"
        >
          <span className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-[var(--neon-red)]" />
          <span className="absolute right-0 bottom-0 h-3 w-3 border-r-2 border-b-2 border-[var(--neon-red)]" />
          <div className="space-y-5">
            <Field label="Name" name="name" />
            <Field label="Email" name="email" type="email" />
            <div>
              <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">Message</label>
              <textarea
                rows={5}
                required
                className="w-full resize-none border border-white/20 bg-black/60 p-3 font-mono text-sm text-white outline-none transition-all focus:border-[var(--neon-red)] focus:shadow-[0_0_14px_rgba(255,0,0,0.35)]"
              />
            </div>
            <div className="pt-2">
              <MagneticButton variant="primary">
                <Send className="h-4 w-4" />
                {sent ? "Transmitted" : "Send Signal"}
              </MagneticButton>
            </div>
          </div>
        </motion.form>
      </div>
    </section>
  );
}